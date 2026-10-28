import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { HistoryPage } from "./HistoryPage";
import { analyzePromptLocally } from "../services/localPromptAnalyzer";
import { saveLocalAnalysis } from "../services/localAnalysisHistory";

describe("HistoryPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders an empty state from empty local history", async () => {
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    expect(await screen.findByText("No analyses yet")).toBeInTheDocument();
  });

  it("renders saved analyses from localStorage", async () => {
    saveLocalAnalysis(analyzePromptLocally("Build a React login page with validation."));
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    expect(await screen.findByText("Build a React login page with validation.")).toBeInTheDocument();
  });

  it("recovers from invalid stored JSON", async () => {
    window.localStorage.setItem("promptlab.local-analysis-history.v1", "not-json");
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    expect(await screen.findByText("No analyses yet")).toBeInTheDocument();
  });
});
