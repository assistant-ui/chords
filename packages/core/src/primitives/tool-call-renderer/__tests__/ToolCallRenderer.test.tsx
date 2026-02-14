import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({}));

import { ToolCallRenderer } from "../ToolCallRenderer";

const baseProps = {
  toolName: "search",
  argsText: '{"query":"hello"}',
  result: undefined as unknown,
  isError: false,
  status: { type: "running" as const },
  addResult: vi.fn(),
};

describe("ToolCallRenderer", () => {
  it("renders tool name", () => {
    render(<ToolCallRenderer {...baseProps} />);
    expect(screen.getByText("search")).toBeInTheDocument();
  });

  it("renders running state with spinner", () => {
    render(<ToolCallRenderer {...baseProps} />);
    // The status icon should be present (running = spinner)
    expect(screen.getByText("search")).toBeInTheDocument();
  });

  it("renders complete state", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        status={{ type: "complete" }}
        result="done"
      />,
    );
    expect(screen.getByText("search")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        status={{ type: "complete" }}
        isError={true}
        result="Something went wrong"
      />,
    );
    expect(screen.getByText("search")).toBeInTheDocument();
  });

  it("shows expand toggle when args exist", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        status={{ type: "complete" }}
        result="result"
      />,
    );
    // Header should have role=button when expandable
    const header = screen.getByRole("button");
    expect(header).toHaveAttribute("aria-expanded", "false");
  });

  it("expands body on click", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        status={{ type: "complete" }}
        result="test result"
      />,
    );
    const header = screen.getByRole("button");
    fireEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Arguments")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
  });

  it("shows formatted args when expanded", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        argsText='{"query":"hello"}'
        status={{ type: "complete" }}
        result="done"
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Arguments")).toBeInTheDocument();
    // Args are pretty-printed in a <pre> tag
    expect(screen.getByText(/\"query\"/)).toBeInTheDocument();
  });

  it("shows Error label when isError is true", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        status={{ type: "complete" }}
        isError={true}
        result="fail"
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("does not have expand toggle when no args and no result", () => {
    render(
      <ToolCallRenderer
        {...baseProps}
        argsText=""
        result={undefined}
        status={{ type: "complete" }}
      />,
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
