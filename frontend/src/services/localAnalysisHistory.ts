import type { AnalyzePromptResponse, AnalysisHistoryItem, AnalysisHistoryResponse } from "../types/analysis";

const STORAGE_KEY = "promptlab.local-analysis-history.v1";
const MAX_HISTORY_ITEMS = 50;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredAnalysis(value: unknown): value is AnalyzePromptResponse {
  return isRecord(value) && typeof value.id === "number" && typeof value.original_prompt === "string" && typeof value.improved_prompt === "string" && typeof value.total_score === "number" && Array.isArray(value.dimensions) && Array.isArray(value.weaknesses) && Array.isArray(value.recommendations) && typeof value.created_at === "string";
}

function readHistory(): AnalyzePromptResponse[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Stored history is not an array");
    return parsed.filter(isStoredAnalysis).sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at)).slice(0, MAX_HISTORY_ITEMS);
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable in a restricted browser context.
    }
    return [];
  }
}

function writeHistory(history: AnalyzePromptResponse[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)));
}

export function saveLocalAnalysis(analysis: AnalyzePromptResponse): void {
  const history = readHistory().filter((item) => item.id !== analysis.id);
  writeHistory([analysis, ...history]);
}

export function getLocalAnalysisHistory(limit = 20, offset = 0): AnalysisHistoryResponse {
  const history = readHistory();
  const items: AnalysisHistoryItem[] = history.slice(offset, offset + limit).map((analysis) => ({
    id: analysis.id,
    original_prompt_preview: analysis.original_prompt.slice(0, 160),
    total_score: analysis.total_score,
    score_interpretation: analysis.score_interpretation,
    created_at: analysis.created_at,
  }));
  return { items, total: history.length, limit, offset };
}

export function getLocalAnalysis(id: string): AnalyzePromptResponse | null {
  const numericId = Number(id);
  return readHistory().find((analysis) => analysis.id === numericId) ?? null;
}

export function clearLocalAnalysisHistory(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
