import { describe, expect, it, vi } from "vitest";

import { AnalysisApiError, analyzePrompt, validateAnalysisResponse } from "./analysisService";
import { apiClient } from "./api";

const validResponse = {
  id: 4,
  original_prompt: "Build a React settings page.",
  improved_prompt: "Build a React settings page with accessible form states.",
  total_score: 70,
  score_interpretation: "Good",
  dimensions: [
    { name: "clarity", score: 11, max_score: 15, assessment: "Clear." },
    { name: "specificity", score: 11, max_score: 15, assessment: "Specific." },
    { name: "context", score: 14, max_score: 20, assessment: "Some context." },
    { name: "completeness", score: 14, max_score: 20, assessment: "Mostly complete." },
    { name: "constraints", score: 10, max_score: 15, assessment: "Some constraints." },
    { name: "expected_output", score: 10, max_score: 15, assessment: "Output is clear." },
  ],
  weaknesses: ["Acceptance criteria are not explicit."],
  missing_requirements: ["Testing requirements"],
  recommendations: [{ recommendation: "Add acceptance criteria.", reason: "They make completion verifiable." }],
  rubric_version: "1.0",
  model_name: "test-model",
  created_at: "2026-10-27T12:00:00Z",
};

describe("analysis service", () => {
  it("accepts a valid response and normalizes backend fields", () => {
    const result = validateAnalysisResponse(validResponse);
    expect(result.total_score).toBe(70);
    expect(result.weaknesses[0].description).toContain("Acceptance");
    expect(result.recommendations[0].title).toContain("acceptance");
  });

  it("rejects malformed responses and inconsistent totals", () => {
    expect(() => validateAnalysisResponse({ ...validResponse, total_score: 71 })).toThrow(AnalysisApiError);
    expect(() => validateAnalysisResponse({ ...validResponse, dimensions: [] })).toThrow(AnalysisApiError);
  });

  it("submits a prompt and preserves the API request shape", async () => {
    const post = vi.spyOn(apiClient, "post").mockResolvedValueOnce({ data: validResponse });
    const result = await analyzePrompt({ prompt: "Build a React settings page." });
    expect(post).toHaveBeenCalledWith("/api/v1/analyses", { prompt: "Build a React settings page." }, { signal: undefined });
    expect(result.id).toBe(4);
    post.mockRestore();
  });

  it("turns network failures into a user-safe error", async () => {
    const get = vi.spyOn(apiClient, "post").mockRejectedValueOnce(new Error("offline"));
    await expect(analyzePrompt({ prompt: "Build a page." })).rejects.toMatchObject({ kind: "network" });
    get.mockRestore();
  });
});
