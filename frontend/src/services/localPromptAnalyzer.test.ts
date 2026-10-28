import { describe, expect, it } from "vitest";

import { analyzePromptLocally, DEMO_EXAMPLES, LOCAL_RUBRIC } from "./localPromptAnalyzer";

describe("localPromptAnalyzer", () => {
  it("scores different demo examples through the same rule engine", () => {
    const results = DEMO_EXAMPLES.map((example) => analyzePromptLocally(example.prompt));
    expect(results[0].total_score).toBeLessThan(results[1].total_score);
    expect(results[1].total_score).toBeLessThan(results[2].total_score);
    expect(results.every((result) => result.total_score >= 0 && result.total_score <= 100)).toBe(true);
  });

  it("uses the documented local rubric and produces explainable output", () => {
    const result = analyzePromptLocally("Build a responsive React login page with validation and unit tests.");
    expect(result.dimensions.map((dimension) => dimension.max_score)).toEqual(Object.values(LOCAL_RUBRIC));
    expect(result.model_name).toBe("local-rule-engine");
    expect(result.improved_prompt).toContain("Template-based improved prompt");
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("preserves the original intention and does not invent named technologies", () => {
    const result = analyzePromptLocally("Create a login page.");
    expect(result.improved_prompt).toContain("Create a login page.");
    expect(result.improved_prompt).toContain("[Name the relevant language, framework, or tools");
    expect(result.improved_prompt).not.toContain("React");
  });
});
