import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ThreadPrimitive: {
    ScrollToBottom: ({ children, className }: any) => (
      <button data-testid="scroll-btn" className={className}>
        {children}
      </button>
    ),
  },
}));

import { ScrollToBottom } from "../ScrollToBottom";
import { DEFAULT_BUTTON_CLASSNAME } from "../defaults";

describe("ScrollToBottom", () => {
  it("renders with default class", () => {
    render(<ScrollToBottom />);
    expect(screen.getByTestId("scroll-btn").className).toBe(
      DEFAULT_BUTTON_CLASSNAME,
    );
  });

  it("uses custom className", () => {
    render(<ScrollToBottom className="custom-btn" />);
    expect(screen.getByTestId("scroll-btn").className).toBe("custom-btn");
  });

  it("renders default arrow icon", () => {
    render(<ScrollToBottom />);
    const btn = screen.getByTestId("scroll-btn");
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("uses custom renderIcon", () => {
    render(
      <ScrollToBottom
        renderIcon={() => <span data-testid="custom-icon">Down</span>}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
