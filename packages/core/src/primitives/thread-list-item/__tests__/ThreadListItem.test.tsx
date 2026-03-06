import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ThreadListItemPrimitive: {
    Root: ({ children, className }: any) => (
      <div data-testid="item-root" className={className}>
        {children}
      </div>
    ),
    Trigger: ({ children, className }: any) => (
      <button data-testid="item-trigger" className={className}>
        {children}
      </button>
    ),
    Title: ({ fallback }: any) => (
      <span data-testid="item-title">{fallback}</span>
    ),
    Archive: ({ children, asChild }: any) => (
      <div data-testid="action-archive">{children}</div>
    ),
    Unarchive: ({ children, asChild }: any) => (
      <div data-testid="action-unarchive">{children}</div>
    ),
    Delete: ({ children, asChild }: any) => (
      <div data-testid="action-delete">{children}</div>
    ),
  },
  ThreadListItemMorePrimitive: {
    Root: ({ children }: any) => (
      <div data-testid="more-root">{children}</div>
    ),
    Trigger: ({ children, className }: any) => (
      <button data-testid="more-trigger" className={className}>
        {children}
      </button>
    ),
    Content: ({ children, className }: any) => (
      <div data-testid="more-content" className={className}>
        {children}
      </div>
    ),
    Item: ({ children, className }: any) => (
      <div data-testid="more-item" className={className}>
        {children}
      </div>
    ),
  },
}));

import { ThreadListItem } from "../ThreadListItem";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_MORE_BUTTON_CLASSNAME,
  DEFAULT_MENU_CLASSNAME,
} from "../defaults";

describe("ThreadListItem", () => {
  it("renders root with default class", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("item-root")).toHaveClass(
      ...DEFAULT_ROOT_CLASSNAME.split(" "),
    );
  });

  it("renders root with custom class", () => {
    render(<ThreadListItem className="custom" />);
    expect(screen.getByTestId("item-root")).toHaveClass("custom");
  });

  it("renders trigger with default class", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("item-trigger")).toHaveClass(
      ...DEFAULT_TRIGGER_CLASSNAME.split(" "),
    );
  });

  it("renders title with default fallback", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("item-title")).toHaveTextContent("New Chat");
  });

  it("renders title with custom fallback", () => {
    render(<ThreadListItem titleFallback="Untitled" />);
    expect(screen.getByTestId("item-title")).toHaveTextContent("Untitled");
  });

  it("renders custom title via renderTitle", () => {
    render(
      <ThreadListItem
        renderTitle={() => <span data-testid="custom-title">My Title</span>}
      />,
    );
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
  });

  it("renders archive and delete actions by default", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("action-archive")).toBeInTheDocument();
    expect(screen.getByTestId("action-delete")).toBeInTheDocument();
  });

  it("does not render unarchive by default", () => {
    render(<ThreadListItem />);
    expect(screen.queryByTestId("action-unarchive")).not.toBeInTheDocument();
  });

  it("renders unarchive when in actions", () => {
    render(<ThreadListItem actions={["unarchive"]} />);
    expect(screen.getByTestId("action-unarchive")).toBeInTheDocument();
  });

  it("hides more menu when actions is empty", () => {
    render(<ThreadListItem actions={[]} />);
    expect(screen.queryByTestId("more-root")).not.toBeInTheDocument();
  });

  it("renders custom more menu via renderMore", () => {
    render(
      <ThreadListItem
        renderMore={() => <div data-testid="custom-more">Custom</div>}
      />,
    );
    expect(screen.getByTestId("custom-more")).toBeInTheDocument();
  });

  it("uses default more button class", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("more-trigger")).toHaveClass(
      ...DEFAULT_MORE_BUTTON_CLASSNAME.split(" "),
    );
  });

  it("uses default menu class", () => {
    render(<ThreadListItem />);
    expect(screen.getByTestId("more-content")).toHaveClass(
      ...DEFAULT_MENU_CLASSNAME.split(" "),
    );
  });

  it("renders SVG icons", () => {
    render(<ThreadListItem />);
    const trigger = screen.getByTestId("more-trigger");
    expect(trigger.querySelector("svg")).toBeInTheDocument();
  });
});
