import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ThreadPrimitive: {
    Suggestion: ({ children, className, prompt }: any) => (
      <button data-testid={`chip-${prompt}`} className={className}>
        {children}
      </button>
    ),
  },
}));

import { SuggestionChips } from "../SuggestionChips";

describe("SuggestionChips", () => {
  it("renders string suggestions", () => {
    render(<SuggestionChips suggestions={["Hello", "World"]} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders object suggestions with label", () => {
    render(
      <SuggestionChips
        suggestions={[{ prompt: "write a poem", label: "Write a poem" }]}
      />,
    );
    expect(screen.getByText("Write a poem")).toBeInTheDocument();
  });

  it("falls back to prompt when label is not provided", () => {
    render(
      <SuggestionChips suggestions={[{ prompt: "do something" }]} />,
    );
    expect(screen.getByText("do something")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <SuggestionChips
        suggestions={[
          {
            prompt: "write a poem",
            label: "Write a poem",
            description: "about the ocean",
          },
        ]}
      />,
    );
    expect(screen.getByText("about the ocean")).toBeInTheDocument();
  });

  it("does not render description for string suggestions", () => {
    const { container } = render(
      <SuggestionChips suggestions={["Hello"]} />,
    );
    // Only the title span should exist, no description span
    const button = container.querySelector('[data-testid="chip-Hello"]');
    expect(button?.children).toHaveLength(1);
  });

  it("uses custom className", () => {
    const { container } = render(
      <SuggestionChips
        suggestions={["Test"]}
        className="custom-grid"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-grid");
  });

  it("uses custom chipClassName", () => {
    render(
      <SuggestionChips
        suggestions={["Test"]}
        chipClassName="custom-chip"
      />,
    );
    expect(screen.getByTestId("chip-Test").className).toBe("custom-chip");
  });
});
