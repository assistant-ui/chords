import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ActionBarPrimitive: {
    FeedbackPositive: ({ children, className, "aria-label": ariaLabel, ...rest }: any) => (
      <button
        data-testid="feedback-positive"
        className={className}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </button>
    ),
    FeedbackNegative: ({ children, className, "aria-label": ariaLabel, ...rest }: any) => (
      <button
        data-testid="feedback-negative"
        className={className}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </button>
    ),
  },
}));

import { FeedbackButtons } from "../FeedbackButtons";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "../defaults";

describe("FeedbackButtons", () => {
  it("renders both buttons", () => {
    render(<FeedbackButtons />);
    expect(screen.getByTestId("feedback-positive")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-negative")).toBeInTheDocument();
  });

  it("uses default root class", () => {
    const { container } = render(<FeedbackButtons />);
    expect(container.firstChild).toHaveClass(...DEFAULT_ROOT_CLASSNAME.split(" "));
  });

  it("uses default button class on both buttons", () => {
    render(<FeedbackButtons />);
    expect(screen.getByTestId("feedback-positive").className).toBe(
      DEFAULT_BUTTON_CLASSNAME,
    );
    expect(screen.getByTestId("feedback-negative").className).toBe(
      DEFAULT_BUTTON_CLASSNAME,
    );
  });

  it("uses custom className", () => {
    const { container } = render(<FeedbackButtons className="custom-root" />);
    expect(container.firstChild).toHaveClass("custom-root");
  });

  it("uses custom positiveClassName", () => {
    render(<FeedbackButtons positiveClassName="custom-pos" />);
    expect(screen.getByTestId("feedback-positive").className).toBe("custom-pos");
  });

  it("uses custom negativeClassName", () => {
    render(<FeedbackButtons negativeClassName="custom-neg" />);
    expect(screen.getByTestId("feedback-negative").className).toBe("custom-neg");
  });

  it("renders default aria-labels", () => {
    render(<FeedbackButtons />);
    expect(screen.getByTestId("feedback-positive")).toHaveAttribute(
      "aria-label",
      "Good response",
    );
    expect(screen.getByTestId("feedback-negative")).toHaveAttribute(
      "aria-label",
      "Bad response",
    );
  });

  it("uses custom labels", () => {
    render(
      <FeedbackButtons positiveLabel="Helpful" negativeLabel="Not helpful" />,
    );
    expect(screen.getByTestId("feedback-positive")).toHaveAttribute(
      "aria-label",
      "Helpful",
    );
    expect(screen.getByTestId("feedback-negative")).toHaveAttribute(
      "aria-label",
      "Not helpful",
    );
  });

  it("renders default SVG icons", () => {
    render(<FeedbackButtons />);
    const posBtn = screen.getByTestId("feedback-positive");
    const negBtn = screen.getByTestId("feedback-negative");
    expect(posBtn.querySelector("svg")).toBeInTheDocument();
    expect(negBtn.querySelector("svg")).toBeInTheDocument();
  });

  it("applies default icon class to icon wrapper", () => {
    render(<FeedbackButtons />);
    const posWrapper = screen.getByTestId("feedback-positive").querySelector("span");
    const negWrapper = screen.getByTestId("feedback-negative").querySelector("span");
    expect(posWrapper).toHaveClass(...DEFAULT_ICON_CLASSNAME.split(" "));
    expect(negWrapper).toHaveClass(...DEFAULT_ICON_CLASSNAME.split(" "));
  });

  it("applies custom iconClassName to icon wrapper", () => {
    render(<FeedbackButtons iconClassName="size-6" />);
    const posWrapper = screen.getByTestId("feedback-positive").querySelector("span");
    expect(posWrapper).toHaveClass("size-6");
  });

  it("renders custom positive icon", () => {
    render(
      <FeedbackButtons
        renderPositiveIcon={() => <span data-testid="custom-pos-icon">+</span>}
      />,
    );
    expect(screen.getByTestId("custom-pos-icon")).toBeInTheDocument();
  });

  it("renders custom negative icon", () => {
    render(
      <FeedbackButtons
        renderNegativeIcon={() => <span data-testid="custom-neg-icon">-</span>}
      />,
    );
    expect(screen.getByTestId("custom-neg-icon")).toBeInTheDocument();
  });
});
