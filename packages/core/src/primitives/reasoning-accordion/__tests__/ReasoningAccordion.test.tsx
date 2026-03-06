import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Track the selector passed to useAuiState so tests can control the return value
let mockIsActive = false;

vi.mock("@assistant-ui/react", () => ({
  useAuiState: (selector: any) => mockIsActive,
  useScrollLock: () => vi.fn(),
}));

import { ReasoningAccordion } from "../ReasoningAccordion";
import { DEFAULT_ROOT_CLASSNAME, DEFAULT_TRIGGER_CLASSNAME } from "../defaults";

describe("ReasoningAccordion", () => {
  beforeEach(() => {
    mockIsActive = false;
  });

  it("renders with default classes", () => {
    const { container } = render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Thinking...</p>
      </ReasoningAccordion>,
    );
    const root = container.firstElementChild;
    expect(root?.className).toContain("mb-4");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <ReasoningAccordion startIndex={0} endIndex={0} className="custom-root">
        <p>Thinking...</p>
      </ReasoningAccordion>,
    );
    const root = container.firstElementChild;
    expect(root?.className).toBe("custom-root");
  });

  it("hides children when closed", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Thinking content</p>
      </ReasoningAccordion>,
    );
    expect(screen.queryByText("Thinking content")).not.toBeVisible();
  });

  it("shows children when toggled open", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Thinking content</p>
      </ReasoningAccordion>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Thinking content")).toBeVisible();
  });

  it("toggles on trigger click", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("shows default label", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    expect(screen.getByText("Reasoning")).toBeInTheDocument();
  });

  it("shows custom label", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0} label="Thinking">
        <p>Content</p>
      </ReasoningAccordion>,
    );
    expect(screen.getByText("Thinking")).toBeInTheDocument();
  });

  it("sets aria-busy when active", () => {
    mockIsActive = true;
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-busy", "true");
  });

  it("does not set aria-busy when inactive", () => {
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-busy", "false");
  });

  it("shows shimmer when active", () => {
    mockIsActive = true;
    const { container } = render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    const shimmer = container.querySelector("[aria-hidden]");
    expect(shimmer).toBeInTheDocument();
  });

  it("does not show shimmer when inactive", () => {
    const { container } = render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    const shimmer = container.querySelector("[aria-hidden]");
    expect(shimmer).not.toBeInTheDocument();
  });

  it("uses custom renderTrigger", () => {
    render(
      <ReasoningAccordion
        startIndex={0}
        endIndex={0}
        renderTrigger={({ active, label }) => (
          <span data-testid="custom-trigger">
            {label} - {active ? "active" : "idle"}
          </span>
        )}
      >
        <p>Content</p>
      </ReasoningAccordion>,
    );
    expect(screen.getByTestId("custom-trigger")).toHaveTextContent(
      "Reasoning - idle",
    );
  });

  it("uses custom renderIcon", () => {
    render(
      <ReasoningAccordion
        startIndex={0}
        endIndex={0}
        renderIcon={() => <span data-testid="custom-icon">🧠</span>}
      >
        <p>Content</p>
      </ReasoningAccordion>,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("auto-opens when streaming starts", () => {
    mockIsActive = true;
    render(
      <ReasoningAccordion startIndex={0} endIndex={0}>
        <p>Content</p>
      </ReasoningAccordion>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content")).toBeVisible();
  });
});
