import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PromptComparison } from "./PromptComparison";

describe("PromptComparison", () => {
  it("copies the original and improved prompts", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<PromptComparison originalPrompt="Original prompt" improvedPrompt="Improved prompt" />);
    const buttons = screen.getAllByRole("button", { name: /copy/i });
    await buttons[0].click();
    expect(writeText).toHaveBeenCalledWith("Original prompt");
    await buttons[1].click();
    expect(writeText).toHaveBeenCalledWith("Improved prompt");
  });

  it("does not report success when clipboard access fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("clipboard blocked"));
    Object.assign(navigator, { clipboard: { writeText } });
    render(<PromptComparison originalPrompt="Original prompt" improvedPrompt="Improved prompt" />);
    await screen.getAllByRole("button", { name: /copy/i })[0].click();
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
  });
});
