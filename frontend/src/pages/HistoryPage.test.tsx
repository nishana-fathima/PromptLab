import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getAnalysisHistory } from "../services/analysisService";
import { HistoryPage } from "./HistoryPage";

vi.mock("../services/analysisService", async () => {
  const actual = await vi.importActual<typeof import("../services/analysisService")>("../services/analysisService");
  return { ...actual, getAnalysisHistory: vi.fn() };
});

const mockedGetHistory = vi.mocked(getAnalysisHistory);

describe("HistoryPage", () => {
  afterEach(() => vi.clearAllMocks());

  it("renders an empty state from an empty API response", async () => {
    mockedGetHistory.mockResolvedValue({ items: [], total: 0, limit: 20, offset: 0 });
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    expect(await screen.findByText("No analyses yet")).toBeInTheDocument();
  });

  it("renders an API error with retry affordance", async () => {
    mockedGetHistory.mockRejectedValue(new Error("offline"));
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByText("History could not be loaded.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
