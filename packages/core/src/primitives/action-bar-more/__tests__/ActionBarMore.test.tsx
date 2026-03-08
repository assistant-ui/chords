import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => {
  const React = require("react");

  const ActionBarMorePrimitive = {
    Root: ({ children }: any) => <div data-testid="more-root">{children}</div>,
    Trigger: ({ children, asChild }: any) => {
      if (asChild) return children;
      return <div>{children}</div>;
    },
    Content: ({ children, side, align, className }: any) => (
      <div data-testid="more-content" data-side={side} data-align={align} className={className}>
        {children}
      </div>
    ),
    Item: React.forwardRef(({ children, className, onClick, ...rest }: any, ref: any) => (
      <div
        ref={ref}
        role="menuitem"
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    )),
  };

  const ActionBarPrimitive = {
    ExportMarkdown: ({ children, asChild }: any) => {
      if (asChild) return children;
      return <div>{children}</div>;
    },
  };

  return { ActionBarMorePrimitive, ActionBarPrimitive };
});

import { ActionBarMore } from "../ActionBarMore";
import {
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_CONTENT_CLASSNAME,
  DEFAULT_ITEM_CLASSNAME,
} from "../defaults";

describe("ActionBarMore", () => {
  it("renders trigger with default icon", () => {
    render(<ActionBarMore />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("uses default trigger class", () => {
    render(<ActionBarMore />);
    expect(screen.getByRole("button")).toHaveClass(
      ...DEFAULT_TRIGGER_CLASSNAME.split(" "),
    );
  });

  it("uses custom trigger class", () => {
    render(<ActionBarMore className="custom-trigger" />);
    expect(screen.getByRole("button")).toHaveClass("custom-trigger");
  });

  it("renders export markdown item by default", () => {
    render(<ActionBarMore />);
    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("Export as Markdown");
  });

  it("uses default content class", () => {
    render(<ActionBarMore />);
    const content = screen.getByTestId("more-content");
    expect(content).toHaveClass(...DEFAULT_CONTENT_CLASSNAME.split(" "));
  });

  it("uses custom menu class", () => {
    render(<ActionBarMore menuClassName="custom-menu" />);
    expect(screen.getByTestId("more-content")).toHaveClass("custom-menu");
  });

  it("uses default item class", () => {
    render(<ActionBarMore />);
    const item = screen.getByRole("menuitem");
    expect(item).toHaveClass(...DEFAULT_ITEM_CLASSNAME.split(" "));
  });

  it("uses custom item class", () => {
    render(<ActionBarMore itemClassName="custom-item" />);
    expect(screen.getByRole("menuitem")).toHaveClass("custom-item");
  });

  it("renders custom actions", () => {
    const onClick = vi.fn();
    render(
      <ActionBarMore
        actions={[
          "export-markdown",
          { label: "Share", onClick },
        ]}
      />,
    );
    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveTextContent("Share");
  });

  it("custom action onClick fires", () => {
    const onClick = vi.fn();
    render(
      <ActionBarMore
        actions={[{ label: "Share", onClick }]}
      />,
    );
    fireEvent.click(screen.getByRole("menuitem"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders custom action icon", () => {
    render(
      <ActionBarMore
        actions={[
          {
            label: "Share",
            icon: <span data-testid="custom-icon">★</span>,
            onClick: () => {},
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("passes side and align to content", () => {
    render(<ActionBarMore side="top" align="end" />);
    const content = screen.getByTestId("more-content");
    expect(content).toHaveAttribute("data-side", "top");
    expect(content).toHaveAttribute("data-align", "end");
  });

  it("renders custom trigger via renderTrigger", () => {
    render(
      <ActionBarMore
        renderTrigger={() => (
          <button type="button" data-testid="custom-trigger">
            More
          </button>
        )}
      />,
    );
    expect(screen.getByTestId("custom-trigger")).toHaveTextContent("More");
  });

  it("renders custom triggerIcon", () => {
    render(
      <ActionBarMore
        triggerIcon={<span data-testid="custom-dots">···</span>}
      />,
    );
    expect(screen.getByTestId("custom-dots")).toBeInTheDocument();
  });
});
