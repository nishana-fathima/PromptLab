import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { analyzePromptLocally } from "../services/localPromptAnalyzer";
import { saveLocalAnalysis } from "../services/localAnalysisHistory";
import { AnalysisDetailPage } from "./AnalysisDetailPage";

describe("AnalysisDetailPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders a persisted analysis by ID", async () => {
    const analysis = analyzePromptLocally("Build a React settings page.");
    saveLocalAnalysis(analysis);
    render(<MemoryRouter initialEntries={[`/history/${analysis.id}`]}><Routes><Route path="/history/:id" element={<AnalysisDetailPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByText(`Analysis #${analysis.id}`)).toBeInTheDocument();
    expect(screen.getByText("Build a React settings page.")).toBeInTheDocument();
  });

  it("handles invalid and missing IDs without external requests", async () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/history/nope"]}><Routes><Route path="/history/:id" element={<AnalysisDetailPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByText("That analysis ID is not valid.")).toBeInTheDocument();
    unmount();
    render(<MemoryRouter initialEntries={["/history/999"]}><Routes><Route path="/history/:id" element={<AnalysisDetailPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByText("This saved analysis could not be found in local history.")).toBeInTheDocument();
  });
});
