import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  ThreadListPrimitive: {
    Root: ({ children, className }: any) => (
      <div data-testid="thread-list-root" className={className}>
        {children}
      </div>
    ),
    New: ({ children, className }: any) => (
      <button data-testid="new-thread" className={className}>
        {children}
      </button>
    ),
    Items: ({ components }: any) => (
      <div data-testid="thread-list-items">
        {components.ThreadListItem && <components.ThreadListItem />}
      </div>
    ),
  },
  AuiIf: ({ condition, children }: any) => {
    const show = condition({ threads: { isLoading: false } });
    return show ? <>{children}</> : null;
  },
}));

import { ThreadList } from "../ThreadList";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_NEW_THREAD_CLASSNAME,
} from "../defaults";

describe("ThreadList", () => {
  it("renders root with default class", () => {
    render(<ThreadList />);
    expect(screen.getByTestId("thread-list-root")).toHaveClass(
      ...DEFAULT_ROOT_CLASSNAME.split(" "),
    );
  });

  it("renders root with custom class", () => {
    render(<ThreadList className="custom-root" />);
    expect(screen.getByTestId("thread-list-root")).toHaveClass("custom-root");
  });

  it("renders new thread button with default label", () => {
    render(<ThreadList />);
    expect(screen.getByTestId("new-thread")).toHaveTextContent("New Thread");
  });

  it("renders new thread button with custom label", () => {
    render(<ThreadList newThreadLabel="Start Chat" />);
    expect(screen.getByTestId("new-thread")).toHaveTextContent("Start Chat");
  });

  it("uses default new thread class", () => {
    render(<ThreadList />);
    expect(screen.getByTestId("new-thread")).toHaveClass(
      ...DEFAULT_NEW_THREAD_CLASSNAME.split(" "),
    );
  });

  it("uses custom new thread class", () => {
    render(<ThreadList newThreadClassName="custom-btn" />);
    expect(screen.getByTestId("new-thread")).toHaveClass("custom-btn");
  });

  it("renders default plus icon", () => {
    render(<ThreadList />);
    const btn = screen.getByTestId("new-thread");
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("renders custom new thread icon", () => {
    render(
      <ThreadList newThreadIcon={<span data-testid="custom-icon">+</span>} />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders custom new thread button via renderNewThread", () => {
    render(
      <ThreadList
        renderNewThread={() => (
          <button data-testid="custom-new">Custom</button>
        )}
      />,
    );
    expect(screen.getByTestId("custom-new")).toBeInTheDocument();
  });

  it("renders thread list items", () => {
    render(<ThreadList />);
    expect(screen.getByTestId("thread-list-items")).toBeInTheDocument();
  });

  it("renders custom ThreadListItem component", () => {
    function CustomItem() {
      return <div data-testid="custom-item">Custom</div>;
    }
    render(<ThreadList ThreadListItem={CustomItem} />);
    expect(screen.getByTestId("custom-item")).toBeInTheDocument();
  });
});
