import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PromptEditor } from "./PromptEditor";

describe("PromptEditor", () => {
  it("keeps Analyze Prompt disabled for empty and whitespace input", () => {
    const onSubmit = vi.fn();
    const { rerender } = render(<PromptEditor prompt="" loading={false} validationError={null} onPromptChange={vi.fn()} onSubmit={onSubmit} />);
    expect(screen.getByRole("button", { name: "Analyze Prompt" })).toBeDisabled();
    rerender(<PromptEditor prompt="   " loading={false} validationError={null} onPromptChange={vi.fn()} onSubmit={onSubmit} />);
    expect(screen.getByRole("button", { name: "Analyze Prompt" })).toBeDisabled();
  });

  it("shows the loading state and prevents submission", () => {
    render(<PromptEditor prompt="Build a page." loading validationError={null} onPromptChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Analyzing Prompt..." })).toBeDisabled();
  });

  it("submits a non-empty prompt", () => {
    const onSubmit = vi.fn();
    render(<PromptEditor prompt="Build a page." loading={false} validationError={null} onPromptChange={vi.fn()} onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole("button", { name: "Analyze Prompt" }).closest("form")!);
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
