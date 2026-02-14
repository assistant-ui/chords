import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useComposer: vi.fn(),
  ComposerPrimitive: {
    Root: ({ children, className }: any) => (
      <div data-testid="composer-root" className={className}>
        {children}
      </div>
    ),
    Input: ({ placeholder, className }: any) => (
      <input
        data-testid="composer-input"
        placeholder={placeholder}
        className={className}
      />
    ),
    Cancel: ({ children, className, disabled }: any) => (
      <button data-testid="cancel" className={className} disabled={disabled}>
        {children}
      </button>
    ),
    Send: ({ children, className, disabled }: any) => (
      <button data-testid="send" className={className} disabled={disabled}>
        {children}
      </button>
    ),
  },
}));

import { EditComposer } from "../EditComposer";
import { useComposer } from "@assistant-ui/react";

const mockComposer = useComposer as ReturnType<typeof vi.fn>;

describe("EditComposer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockComposer.mockReturnValue({ canCancel: true, isEmpty: false });
  });

  it("renders input with default placeholder", () => {
    render(<EditComposer />);
    expect(screen.getByTestId("composer-input")).toHaveAttribute(
      "placeholder",
      "Edit your message...",
    );
  });

  it("renders custom placeholder", () => {
    render(<EditComposer inputPlaceholder="Custom..." />);
    expect(screen.getByTestId("composer-input")).toHaveAttribute(
      "placeholder",
      "Custom...",
    );
  });

  it("renders default Cancel and Save labels", () => {
    render(<EditComposer />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    render(<EditComposer cancelLabel="Discard" saveLabel="Submit" />);
    expect(screen.getByText("Discard")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("disables cancel when canCancel is false", () => {
    mockComposer.mockReturnValue({ canCancel: false, isEmpty: false });
    render(<EditComposer />);
    expect(screen.getByTestId("cancel")).toBeDisabled();
  });

  it("disables send when isEmpty is true", () => {
    mockComposer.mockReturnValue({ canCancel: true, isEmpty: true });
    render(<EditComposer />);
    expect(screen.getByTestId("send")).toBeDisabled();
  });

  it("enables both buttons in normal state", () => {
    render(<EditComposer />);
    expect(screen.getByTestId("cancel")).not.toBeDisabled();
    expect(screen.getByTestId("send")).not.toBeDisabled();
  });

  it("uses custom className", () => {
    render(<EditComposer className="custom-root" />);
    expect(screen.getByTestId("composer-root").className).toBe("custom-root");
  });
});
