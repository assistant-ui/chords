import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useAuiState: vi.fn(),
}));

import { MessageStatus } from "../MessageStatus";
import { useAuiState } from "@assistant-ui/react";
import { DEFAULT_CONTAINER_CLASSNAME } from "../defaults";

const mockUseAuiState = useAuiState as ReturnType<typeof vi.fn>;

function setMockState(message: { status?: any }) {
  const state = { message };
  mockUseAuiState.mockImplementation((selector: (s: any) => any) =>
    selector(state),
  );
}

describe("MessageStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null for complete messages", () => {
    setMockState({ status: { type: "complete" } });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when status is undefined", () => {
    setMockState({});
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).toBe("");
  });

  it("renders for running state", () => {
    setMockState({ status: { type: "running" } });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).not.toBe("");
  });

  it("renders for error state", () => {
    setMockState({
      status: { type: "incomplete", reason: "error", error: "Something failed" },
    });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).not.toBe("");
  });

  it("uses default container class", () => {
    setMockState({ status: { type: "running" } });
    const { container } = render(<MessageStatus />);
    expect(container.firstChild).toHaveClass(
      ...DEFAULT_CONTAINER_CLASSNAME.split(" "),
    );
  });

  it("uses custom className", () => {
    setMockState({ status: { type: "running" } });
    const { container } = render(<MessageStatus className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("calls renderVisual with state and error", () => {
    const renderVisual = vi.fn((state, error) => (
      <span data-testid="custom">
        {state}-{String(error)}
      </span>
    ));
    setMockState({
      status: { type: "incomplete", reason: "error", error: "test error" },
    });
    render(<MessageStatus renderVisual={renderVisual} />);

    expect(renderVisual).toHaveBeenCalledWith("error", "test error");
    expect(screen.getByTestId("custom").textContent).toBe(
      "error-test error",
    );
  });
});
