import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ActionBarPrimitive: {
    Root: ({ children, className, hideWhenRunning, autohide, autohideFloat }: any) => (
      <div
        data-testid="action-bar"
        className={className}
        data-hide-when-running={String(hideWhenRunning)}
        data-autohide={autohide}
        data-autohide-float={autohideFloat}
      >
        {children}
      </div>
    ),
    Copy: ({ children, className }: any) => (
      <button data-testid="action-copy" className={className}>
        {children}
      </button>
    ),
    Reload: ({ children, className }: any) => (
      <button data-testid="action-reload" className={className}>
        {children}
      </button>
    ),
    Edit: ({ children, className }: any) => (
      <button data-testid="action-edit" className={className}>
        {children}
      </button>
    ),
    Speak: ({ children, className }: any) => (
      <button data-testid="action-speak" className={className}>
        {children}
      </button>
    ),
  },
}));

import { MessageActionBar } from "../MessageActionBar";
import { DEFAULT_ROOT_CLASSNAME } from "../defaults";

describe("MessageActionBar", () => {
  it("renders with default actions (copy, reload)", () => {
    render(<MessageActionBar />);
    expect(screen.getByTestId("action-bar")).toBeInTheDocument();
    // CopyButton wraps ActionBarPrimitive.Copy internally
    expect(screen.getByTestId("action-bar").children.length).toBeGreaterThan(0);
  });

  it("uses default root class", () => {
    render(<MessageActionBar />);
    expect(screen.getByTestId("action-bar").className).toBe(
      DEFAULT_ROOT_CLASSNAME,
    );
  });

  it("uses custom className", () => {
    render(<MessageActionBar className="custom-bar" />);
    expect(screen.getByTestId("action-bar").className).toBe("custom-bar");
  });

  it("passes hideWhenRunning to primitive", () => {
    render(<MessageActionBar hideWhenRunning={false} />);
    expect(screen.getByTestId("action-bar")).toHaveAttribute(
      "data-hide-when-running",
      "false",
    );
  });

  it("passes autohide to primitive", () => {
    render(<MessageActionBar autohide="always" />);
    expect(screen.getByTestId("action-bar")).toHaveAttribute(
      "data-autohide",
      "always",
    );
  });

  it("passes autohideFloat to primitive", () => {
    render(<MessageActionBar autohideFloat="never" />);
    expect(screen.getByTestId("action-bar")).toHaveAttribute(
      "data-autohide-float",
      "never",
    );
  });

  it("renders only specified actions", () => {
    render(<MessageActionBar actions={["edit"]} />);
    const bar = screen.getByTestId("action-bar");
    expect(bar.children).toHaveLength(1);
  });
});
