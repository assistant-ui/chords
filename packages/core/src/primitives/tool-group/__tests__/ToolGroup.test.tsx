import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockState = {
  message: {
    status: { type: "complete" },
    parts: [
      { type: "tool-call", status: { type: "complete" } },
      { type: "tool-call", status: { type: "complete" } },
    ],
  },
};

vi.mock("@assistant-ui/react", () => ({
  useAuiState: (selector: any) => selector(mockState),
  useScrollLock: () => () => {},
}));

import { ToolGroup } from "../ToolGroup";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_CONTENT_CLASSNAME,
} from "../defaults";

describe("ToolGroup", () => {
  it("renders with default class", () => {
    const { container } = render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div>tool 1</div>
        <div>tool 2</div>
      </ToolGroup>,
    );
    expect(container.firstChild).toHaveClass(
      ...DEFAULT_ROOT_CLASSNAME.split(" "),
    );
  });

  it("renders with custom class", () => {
    const { container } = render(
      <ToolGroup startIndex={0} endIndex={1} className="custom">
        <div>tool</div>
      </ToolGroup>,
    );
    expect(container.firstChild).toHaveClass("custom");
  });

  it("shows correct count label for multiple tools", () => {
    render(
      <ToolGroup startIndex={0} endIndex={2}>
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("3 tool calls");
  });

  it("shows correct count label for single tool", () => {
    render(
      <ToolGroup startIndex={0} endIndex={0}>
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("1 tool call");
  });

  it("uses custom label function", () => {
    render(
      <ToolGroup
        startIndex={0}
        endIndex={1}
        label={(n) => `${n} functions`}
      >
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("2 functions");
  });

  it("children hidden by default", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div data-testid="child">tool</div>
      </ToolGroup>,
    );
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
  });

  it("children visible when defaultOpen", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1} defaultOpen>
        <div data-testid="child">tool</div>
      </ToolGroup>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("toggles on click", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div data-testid="child">tool</div>
      </ToolGroup>,
    );
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("child")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
  });

  it("has aria-expanded attribute", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div>tool</div>
      </ToolGroup>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("uses default trigger class", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByRole("button")).toHaveClass(
      ...DEFAULT_TRIGGER_CLASSNAME.split(" "),
    );
  });

  it("renders custom trigger via renderTrigger", () => {
    render(
      <ToolGroup
        startIndex={0}
        endIndex={1}
        renderTrigger={({ count }) => (
          <span data-testid="custom-trigger">{count} tools</span>
        )}
      >
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByTestId("custom-trigger")).toHaveTextContent("2 tools");
  });

  it("uses custom triggerClassName", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1} triggerClassName="custom-trigger">
        <div>tool</div>
      </ToolGroup>,
    );
    expect(screen.getByRole("button")).toHaveClass("custom-trigger");
  });

  it("uses custom contentClassName", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1} defaultOpen contentClassName="custom-content">
        <div data-testid="child">tool</div>
      </ToolGroup>,
    );
    // content div wraps an inner flex container that holds children
    const content = screen.getByTestId("child").parentElement!.parentElement;
    expect(content).toHaveClass("custom-content");
  });

  it("uses default content class when open", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1} defaultOpen>
        <div data-testid="child">tool</div>
      </ToolGroup>,
    );
    const content = screen.getByTestId("child").parentElement!.parentElement;
    expect(content).toHaveClass(...DEFAULT_CONTENT_CLASSNAME.split(" "));
  });

  it("renders chevron icon", () => {
    render(
      <ToolGroup startIndex={0} endIndex={1}>
        <div>tool</div>
      </ToolGroup>,
    );
    const btn = screen.getByRole("button");
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });
});
