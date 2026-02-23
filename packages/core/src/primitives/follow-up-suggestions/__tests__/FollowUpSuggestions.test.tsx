import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useAuiState: vi.fn(),
  ThreadPrimitive: {
    Suggestion: ({ children, prompt, className }: any) => (
      <button data-testid={`suggestion-${prompt}`} className={className}>
        {children}
      </button>
    ),
  },
}));

import { FollowUpSuggestions } from "../FollowUpSuggestions";
import { useAuiState } from "@assistant-ui/react";

const mockUseAuiState = useAuiState as ReturnType<typeof vi.fn>;

function setMockState(thread: {
  suggestions?: any[];
  isRunning?: boolean;
}) {
  const state = { thread };
  mockUseAuiState.mockImplementation((selector: (s: any) => any) =>
    selector(state),
  );
}

describe("FollowUpSuggestions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no suggestions", () => {
    setMockState({ suggestions: [], isRunning: false });
    const { container } = render(<FollowUpSuggestions />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when suggestions is undefined", () => {
    setMockState({ isRunning: false });
    const { container } = render(<FollowUpSuggestions />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when thread is running", () => {
    setMockState({
      suggestions: [{ prompt: "Hello" }],
      isRunning: true,
    });
    const { container } = render(<FollowUpSuggestions />);
    expect(container.innerHTML).toBe("");
  });

  it("renders suggestions when available and not running", () => {
    setMockState({
      suggestions: [{ prompt: "Tell me more" }, { prompt: "Give an example" }],
      isRunning: false,
    });
    render(<FollowUpSuggestions />);
    expect(screen.getByText("Tell me more")).toBeInTheDocument();
    expect(screen.getByText("Give an example")).toBeInTheDocument();
  });

  it("uses custom className", () => {
    setMockState({
      suggestions: [{ prompt: "Test" }],
      isRunning: false,
    });
    const { container } = render(
      <FollowUpSuggestions className="custom-container" />,
    );
    expect(container.firstChild).toHaveClass("custom-container");
  });

  it("uses custom renderChip", () => {
    setMockState({
      suggestions: [{ prompt: "Test prompt" }],
      isRunning: false,
    });
    render(
      <FollowUpSuggestions
        renderChip={(prompt, index) => (
          <span key={index} data-testid="custom-chip">
            {prompt}
          </span>
        )}
      />,
    );
    expect(screen.getByTestId("custom-chip").textContent).toBe("Test prompt");
  });
});
