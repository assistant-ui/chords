import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useMessage: vi.fn(),
}));

import { MessageStatus } from "../MessageStatus";
import { useMessage } from "@assistant-ui/react";
import { DEFAULT_CONTAINER_CLASSNAME } from "../defaults";

const mockMessage = useMessage as ReturnType<typeof vi.fn>;

describe("MessageStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null for complete messages", () => {
    mockMessage.mockReturnValue({
      status: { type: "complete" },
    });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when status is undefined", () => {
    mockMessage.mockReturnValue({});
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).toBe("");
  });

  it("renders for running state", () => {
    mockMessage.mockReturnValue({
      status: { type: "running" },
    });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).not.toBe("");
  });

  it("renders for error state", () => {
    mockMessage.mockReturnValue({
      status: { type: "incomplete", reason: "error", error: "Something failed" },
    });
    const { container } = render(<MessageStatus />);
    expect(container.innerHTML).not.toBe("");
  });

  it("uses default container class", () => {
    mockMessage.mockReturnValue({
      status: { type: "running" },
    });
    const { container } = render(<MessageStatus />);
    expect(container.firstChild).toHaveClass(
      ...DEFAULT_CONTAINER_CLASSNAME.split(" "),
    );
  });

  it("uses custom className", () => {
    mockMessage.mockReturnValue({
      status: { type: "running" },
    });
    const { container } = render(<MessageStatus className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("calls renderVisual with state and error", () => {
    const renderVisual = vi.fn((state, error) => (
      <span data-testid="custom">
        {state}-{String(error)}
      </span>
    ));
    mockMessage.mockReturnValue({
      status: { type: "incomplete", reason: "error", error: "test error" },
    });
    render(<MessageStatus renderVisual={renderVisual} />);

    expect(renderVisual).toHaveBeenCalledWith("error", "test error");
    expect(screen.getByTestId("custom").textContent).toBe(
      "error-test error",
    );
  });
});
