import axios from "axios";

import { apiClient } from "./api";
import type {
  AnalyzePromptRequest,
  AnalyzePromptResponse,
  AnalysisHistoryResponse,
  CriterionName,
  CriterionScore,
  PromptRecommendation,
  PromptWeakness,
} from "../types/analysis";

const criterionNames: CriterionName[] = [
  "clarity",
  "specificity",
  "context",
  "completeness",
  "constraints",
  "expected_output",
];

const criterionMaximums: Record<CriterionName, number> = {
  clarity: 15,
  specificity: 15,
  context: 20,
  completeness: 20,
  constraints: 15,
  expected_output: 15,
};

export class AnalysisApiError extends Error {
  constructor(
    message: string,
    public readonly kind: "network" | "server" | "malformed" | "unknown",
  ) {
    super(message);
    this.name = "AnalysisApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseCriterion(value: unknown): value is CriterionScore {
  if (!isRecord(value)) return false;
  return (
    typeof value.name === "string" &&
    criterionNames.includes(value.name as CriterionName) &&
    typeof value.score === "number" &&
    Number.isInteger(value.score) &&
    typeof value.max_score === "number" &&
    Number.isInteger(value.max_score) &&
    isNonEmptyString(value.assessment)
  );
}

function parseWeakness(value: unknown): value is string {
  return isNonEmptyString(value);
}

function parseWeaknessObject(value: unknown): value is { description: string; severity?: "high" | "medium" | "low" } {
  if (!isRecord(value) || !isNonEmptyString(value.description)) return false;
  return value.severity === undefined || value.severity === "high" || value.severity === "medium" || value.severity === "low";
}

function normalizeWeakness(value: string | { description: string; severity?: "high" | "medium" | "low" }): PromptWeakness {
  if (typeof value !== "string") return { title: "Identified weakness", description: value.description, severity: value.severity };
  return {
    title: "Identified weakness",
    description: value,
  };
}

function parseRecommendation(value: unknown): value is { recommendation: string; reason: string } {
  if (!isRecord(value)) return false;
  return isNonEmptyString(value.recommendation) && isNonEmptyString(value.reason);
}

function normalizeRecommendation(value: { recommendation: string; reason: string }): PromptRecommendation {
  return {
    title: value.recommendation,
    description: value.reason,
    reason: value.reason,
  };
}

export function validateAnalysisResponse(value: unknown): AnalyzePromptResponse {
  if (!isRecord(value)) throw new AnalysisApiError("The analysis response was not an object.", "malformed");

  const dimensions = value.dimensions;
  const weaknesses = value.weaknesses;
  const recommendations = value.recommendations;
  const validDimensions = Array.isArray(dimensions) && dimensions.length === criterionNames.length && dimensions.every(parseCriterion);
  const validWeaknesses = Array.isArray(weaknesses) && weaknesses.every((weakness) => parseWeakness(weakness) || parseWeaknessObject(weakness));
  const validRecommendations = Array.isArray(recommendations) && recommendations.every(parseRecommendation);
  const missingRequirements = value.missing_requirements;
  const validMissingRequirements = Array.isArray(missingRequirements) && missingRequirements.every(isNonEmptyString);
  const hasValidBaseFields =
    typeof value.id === "number" &&
    isNonEmptyString(value.original_prompt) &&
    isNonEmptyString(value.improved_prompt) &&
    typeof value.total_score === "number" &&
    Number.isInteger(value.total_score) &&
    value.total_score >= 0 &&
    value.total_score <= 100 &&
    isNonEmptyString(value.score_interpretation) &&
    isNonEmptyString(value.rubric_version) &&
    isNonEmptyString(value.model_name) &&
    isNonEmptyString(value.created_at);

  if (!hasValidBaseFields || !validDimensions || !validWeaknesses || !validRecommendations || !validMissingRequirements) {
    throw new AnalysisApiError("The analysis response did not match the expected API contract.", "malformed");
  }

  const typedDimensions = dimensions as CriterionScore[];
  const hasExpectedDimensions = typedDimensions.every(
    (dimension) => dimension.max_score === criterionMaximums[dimension.name] && dimension.score >= 0 && dimension.score <= dimension.max_score,
  );
  const calculatedTotal = typedDimensions.reduce((total, dimension) => total + dimension.score, 0);
  if (!hasExpectedDimensions || calculatedTotal !== value.total_score) {
    throw new AnalysisApiError("The analysis score was inconsistent with the documented rubric.", "malformed");
  }

  return {
    id: value.id as number,
    original_prompt: value.original_prompt as string,
    improved_prompt: value.improved_prompt as string,
    total_score: value.total_score as number,
    score_interpretation: value.score_interpretation as string,
    dimensions: typedDimensions,
    weaknesses: (weaknesses as Array<string | { description: string; severity?: "high" | "medium" | "low" }>).map(normalizeWeakness),
    missing_requirements: missingRequirements as string[],
    recommendations: (recommendations as Array<{ recommendation: string; reason: string }>).map(normalizeRecommendation),
    rubric_version: value.rubric_version as string,
    model_name: value.model_name as string,
    created_at: value.created_at as string,
  };
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "The PromptLab API could not be reached. Check that the backend is running.";
    const detail = error.response.data?.detail;
    if (typeof detail?.message === "string") return detail.message;
    if (typeof error.response.data?.error?.message === "string") return error.response.data.error.message;
    return `The PromptLab API returned an error (${error.response.status}).`;
  }
  if (error instanceof AnalysisApiError) return error.message;
  return "The analysis could not be completed. Please try again.";
}

export async function analyzePrompt(
  request: AnalyzePromptRequest,
  signal?: AbortSignal,
): Promise<AnalyzePromptResponse> {
  try {
    const response = await apiClient.post("/api/v1/analyses", request, { signal });
    return validateAnalysisResponse(response.data);
  } catch (error) {
    if (axios.isCancel(error) || (error instanceof DOMException && error.name === "AbortError")) throw error;
    if (error instanceof AnalysisApiError) throw error;
    const kind = axios.isAxiosError(error) && error.response ? "server" : "network";
    throw new AnalysisApiError(getErrorMessage(error), kind);
  }
}

function parseHistoryResponse(value: unknown): AnalysisHistoryResponse {
  if (!isRecord(value) || !Array.isArray(value.items) || !value.items.every(isRecord)) {
    throw new AnalysisApiError("The history response did not match the expected API contract.", "malformed");
  }
  const items = value.items;
  const validItems = items.every(
    (item) =>
      typeof item.id === "number" &&
      isNonEmptyString(item.original_prompt_preview) &&
      typeof item.total_score === "number" &&
      Number.isInteger(item.total_score) &&
      item.total_score >= 0 &&
      item.total_score <= 100 &&
      isNonEmptyString(item.score_interpretation) &&
      isNonEmptyString(item.created_at),
  );
  if (
    !validItems ||
    typeof value.total !== "number" ||
    typeof value.limit !== "number" ||
    typeof value.offset !== "number"
  ) {
    throw new AnalysisApiError("The history response did not match the expected API contract.", "malformed");
  }
  return {
    items: items as AnalysisHistoryResponse["items"],
    total: value.total as number,
    limit: value.limit as number,
    offset: value.offset as number,
  };
}

async function requestApi<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (axios.isCancel(error) || (error instanceof DOMException && error.name === "AbortError")) throw error;
    if (error instanceof AnalysisApiError) throw error;
    const kind = axios.isAxiosError(error) && error.response ? "server" : "network";
    throw new AnalysisApiError(getErrorMessage(error), kind);
  }
}

export async function getAnalysisHistory(
  limit = 20,
  offset = 0,
  signal?: AbortSignal,
): Promise<AnalysisHistoryResponse> {
  return requestApi(async () => {
    const response = await apiClient.get("/api/v1/analyses", { params: { limit, offset }, signal });
    return parseHistoryResponse(response.data);
  });
}

export async function getAnalysis(analysisId: string, signal?: AbortSignal): Promise<AnalyzePromptResponse> {
  return requestApi(async () => {
    const response = await apiClient.get(`/api/v1/analyses/${encodeURIComponent(analysisId)}`, { signal });
    return validateAnalysisResponse(response.data);
  });
}
