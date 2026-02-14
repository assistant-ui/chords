import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useThread: vi.fn(),
  useComposer: vi.fn(),
  ComposerPrimitive: {
    Send: ({ children, className }: any) => (
      <button data-testid="send" className={className}>
        {children}
      </button>
    ),
    Cancel: ({ children, className }: any) => (
      <button data-testid="cancel" className={className}>
        {children}
      </button>
    ),
  },
}));

import { ComposerActionStatus } from "../ComposerActionStatus";
import { useThread, useComposer } from "@assistant-ui/react";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_IDLE_BUTTON_CLASSNAME,
} from "../defaults";

const mockThread = useThread as ReturnType<typeof vi.fn>;
const mockComposer = useComposer as ReturnType<typeof vi.fn>;

function setMockState(overrides: {
  isRunning?: boolean;
  isEditing?: boolean;
  isEmpty?: boolean;
}) {
  mockThread.mockReturnValue({
    isRunning: overrides.isRunning ?? false,
  });
  mockComposer.mockReturnValue({
    isEditing: overrides.isEditing ?? false,
    isEmpty: overrides.isEmpty ?? true,
  });
}

describe("ComposerActionStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("idle state", () => {
    it("renders a disabled button when composer is empty", () => {
      setMockState({ isEditing: false, isEmpty: true });
      render(<ComposerActionStatus />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("uses default idle class", () => {
      setMockState({ isEmpty: true });
      render(<ComposerActionStatus />);

      const button = screen.getByRole("button");
      expect(button.className).toBe(DEFAULT_IDLE_BUTTON_CLASSNAME);
    });

    it("uses idleButtonClassName when provided", () => {
      setMockState({ isEmpty: true });
      render(<ComposerActionStatus idleButtonClassName="custom-idle" />);

      const button = screen.getByRole("button");
      expect(button.className).toBe("custom-idle");
    });

    it("falls back to buttonClassName when idleButtonClassName is not provided", () => {
      setMockState({ isEmpty: true });
      render(<ComposerActionStatus buttonClassName="custom-btn" />);

      const button = screen.getByRole("button");
      expect(button.className).toBe("custom-btn");
    });
  });

  describe("composing state", () => {
    it("renders a Send button when editing and not empty", () => {
      setMockState({ isEditing: true, isEmpty: false });
      render(<ComposerActionStatus />);

      expect(screen.getByTestId("send")).toBeInTheDocument();
    });

    it("uses default button class", () => {
      setMockState({ isEditing: true, isEmpty: false });
      render(<ComposerActionStatus />);

      expect(screen.getByTestId("send").className).toBe(
        DEFAULT_BUTTON_CLASSNAME,
      );
    });

    it("uses custom buttonClassName", () => {
      setMockState({ isEditing: true, isEmpty: false });
      render(<ComposerActionStatus buttonClassName="custom-btn" />);

      expect(screen.getByTestId("send").className).toBe("custom-btn");
    });
  });

  describe("running state", () => {
    it("renders a Cancel button when thread is running", () => {
      setMockState({ isRunning: true });
      render(<ComposerActionStatus />);

      expect(screen.getByTestId("cancel")).toBeInTheDocument();
    });

    it("uses custom buttonClassName", () => {
      setMockState({ isRunning: true });
      render(<ComposerActionStatus buttonClassName="custom-btn" />);

      expect(screen.getByTestId("cancel").className).toBe("custom-btn");
    });
  });

  describe("renderVisual", () => {
    it("uses custom renderVisual when provided", () => {
      setMockState({ isEditing: true, isEmpty: false });
      render(
        <ComposerActionStatus
          renderVisual={(state) => <span data-testid="custom">{state}</span>}
        />,
      );

      const custom = screen.getByTestId("custom");
      expect(custom).toBeInTheDocument();
      expect(custom.textContent).toBe("composing");
    });

    it("passes running state to renderVisual", () => {
      setMockState({ isRunning: true });
      render(
        <ComposerActionStatus
          renderVisual={(state) => <span data-testid="custom">{state}</span>}
        />,
      );

      expect(screen.getByTestId("custom").textContent).toBe("running");
    });
  });
});
