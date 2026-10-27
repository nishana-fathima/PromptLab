import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { AnalyzePromptResponse } from "../../types/analysis";
import { AnalysisResults } from "./AnalysisResults";

const analysis: AnalyzePromptResponse = {
  id: 7,
  original_prompt: "Build a dashboard.",
  improved_prompt: "Build a responsive dashboard with loading states.",
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
  weaknesses: [{ title: "Identified weakness", description: "Acceptance criteria are missing." }],
  missing_requirements: [],
  recommendations: [{ title: "Add acceptance criteria", description: "Make completion measurable.", reason: "It makes the result verifiable." }],
  rubric_version: "1.0",
  model_name: "test-model",
  created_at: "2026-10-27T12:00:00Z",
};

describe("AnalysisResults", () => {
  it("renders score, criteria, weaknesses, recommendations, and comparison", () => {
    render(<AnalysisResults analysis={analysis} />);
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("Clarity")).toBeInTheDocument();
    expect(screen.getByText("Acceptance criteria are missing.")).toBeInTheDocument();
    expect(screen.getByText("Add acceptance criteria")).toBeInTheDocument();
    expect(screen.getByText("Build a dashboard.")).toBeInTheDocument();
    expect(screen.getByText("Build a responsive dashboard with loading states.")).toBeInTheDocument();
  });
});
