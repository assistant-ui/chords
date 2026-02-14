import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ActionBarPrimitive: {
    Copy: ({ children, className, copiedDuration }: any) => (
      <button
        data-testid="copy"
        className={className}
        data-duration={copiedDuration}
      >
        {children}
      </button>
    ),
  },
}));

import { CopyButton } from "../CopyButton";
import { DEFAULT_BUTTON_CLASSNAME } from "../defaults";

describe("CopyButton", () => {
  it("renders with default classes", () => {
    render(<CopyButton />);
    const button = screen.getByTestId("copy");
    expect(button.className).toBe(DEFAULT_BUTTON_CLASSNAME);
  });

  it("uses custom buttonClassName", () => {
    render(<CopyButton buttonClassName="custom-btn" />);
    expect(screen.getByTestId("copy").className).toBe("custom-btn");
  });

  it("passes copiedDuration to primitive", () => {
    render(<CopyButton copiedDuration={5000} />);
    expect(screen.getByTestId("copy")).toHaveAttribute(
      "data-duration",
      "5000",
    );
  });

  it("uses custom renderVisual", () => {
    render(
      <CopyButton renderVisual={() => <span data-testid="custom">X</span>} />,
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });
});
