import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { HistoryList } from "./HistoryList";

describe("HistoryList", () => {
  it("renders saved analysis metadata and detail link", () => {
    render(<MemoryRouter><HistoryList items={[{ id: 3, original_prompt_preview: "Build a dashboard", total_score: 82, score_interpretation: "Strong", created_at: "2026-10-27T12:00:00Z" }]} /></MemoryRouter>);
    expect(screen.getByText("Build a dashboard")).toBeInTheDocument();
    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /details/i })).toHaveAttribute("href", "/history/3");
  });
});
