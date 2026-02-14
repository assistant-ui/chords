import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ThreadPrimitive: {
    Empty: ({ children }: any) => <div data-testid="thread-empty">{children}</div>,
    Suggestion: ({ children, className, prompt }: any) => (
      <button data-testid={`chip-${prompt}`} className={className}>
        {children}
      </button>
    ),
  },
}));

import { ThreadEmpty } from "../ThreadEmpty";

describe("ThreadEmpty", () => {
  it("renders with default greeting", () => {
    render(<ThreadEmpty />);
    expect(screen.getByText("How can I help you today?")).toBeInTheDocument();
  });

  it("renders with default icon", () => {
    render(<ThreadEmpty />);
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("renders custom greeting", () => {
    render(<ThreadEmpty greeting="Welcome!" />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });

  it("renders custom icon", () => {
    render(<ThreadEmpty icon="AI" />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders custom renderIcon", () => {
    render(
      <ThreadEmpty renderIcon={() => <span data-testid="custom-icon">X</span>} />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<ThreadEmpty subtitle="I can help with anything" />);
    expect(screen.getByText("I can help with anything")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<ThreadEmpty />);
    const threadEmpty = screen.getByTestId("thread-empty");
    // Should only have icon, greeting - no subtitle paragraph
    expect(threadEmpty.querySelectorAll("p")).toHaveLength(1);
  });

  it("renders suggestions when provided", () => {
    render(
      <ThreadEmpty
        suggestions={[
          { prompt: "Write a poem", label: "Write a poem" },
          { prompt: "Tell a joke", label: "Tell a joke" },
        ]}
      />,
    );
    expect(screen.getByText("Write a poem")).toBeInTheDocument();
    expect(screen.getByText("Tell a joke")).toBeInTheDocument();
  });

  it("does not render suggestions wrapper when suggestions is empty", () => {
    const { container } = render(<ThreadEmpty suggestions={[]} />);
    expect(container.querySelector('[data-testid^="chip-"]')).toBeNull();
  });

  it("uses custom className", () => {
    render(<ThreadEmpty className="custom-root" />);
    const inner = screen.getByTestId("thread-empty").firstChild;
    expect(inner).toHaveClass("custom-root");
  });
});
