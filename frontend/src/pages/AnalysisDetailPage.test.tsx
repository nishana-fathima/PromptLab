import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { getAnalysis } from "../services/analysisService";
import { AnalysisDetailPage } from "./AnalysisDetailPage";

vi.mock("../services/analysisService", async () => {
  const actual = await vi.importActual<typeof import("../services/analysisService")>("../services/analysisService");
  return { ...actual, getAnalysis: vi.fn() };
});

const mockedGetAnalysis = vi.mocked(getAnalysis);

describe("AnalysisDetailPage", () => {
  it("rejects an invalid persisted analysis ID without making a request", async () => {
    render(<MemoryRouter initialEntries={["/history/nope"]}><Routes><Route path="/history/:id" element={<AnalysisDetailPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByText("That analysis ID is not valid.")).toBeInTheDocument();
    expect(mockedGetAnalysis).not.toHaveBeenCalled();
  });

  it("shows a not-found error from the detail API", async () => {
    mockedGetAnalysis.mockRejectedValue(new Error("Analysis could not be loaded."));
    render(<MemoryRouter initialEntries={["/history/99"]}><Routes><Route path="/history/:id" element={<AnalysisDetailPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByText("Analysis could not be loaded.")).toBeInTheDocument();
  });
});
