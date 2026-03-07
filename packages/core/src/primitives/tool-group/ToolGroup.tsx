"use client";

import { useState, useCallback, useRef } from "react";
import { useAuiState, useScrollLock } from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_CONTENT_CLASSNAME,
  DEFAULT_CHEVRON_CLASSNAME,
  DEFAULT_SPINNER_CLASSNAME,
} from "./defaults";

const ANIMATION_DURATION = 200;

export type ToolGroupProps = React.PropsWithChildren<{
  startIndex: number;
  endIndex: number;
  /** Root container class. */
  className?: string;
  /** Trigger row class. */
  triggerClassName?: string;
  /** Collapsible content area class. */
  contentClassName?: string;
  /** Whether the group starts open. @default false */
  defaultOpen?: boolean;
  /** Custom label function. @default (n) => `${n} tool call(s)` */
  label?: (count: number) => string;
  /** Custom trigger renderer. */
  renderTrigger?: (props: {
    count: number;
    active: boolean;
    open: boolean;
  }) => React.ReactNode;
}>;

/**
 * Groups consecutive tool calls into a collapsible container with a
 * count badge and spinner during execution.
 *
 * Used as the `ToolGroup` component in `MessagePrimitive.Parts`:
 *
 * ```tsx
 * <MessagePrimitive.Parts
 *   components={{
 *     tools: { Fallback: ToolCallRenderer },
 *     ToolGroup: ToolGroup,
 *   }}
 * />
 * ```
 *
 * Must be rendered inside a message context.
 */
export function ToolGroup({
  children,
  startIndex,
  endIndex,
  className,
  triggerClassName,
  contentClassName,
  defaultOpen = false,
  label,
  renderTrigger,
}: ToolGroupProps) {
  const toolCount = endIndex - startIndex + 1;

  const isActive = useAuiState((s) => {
    if (s.message.status?.type !== "running") return false;
    for (let i = startIndex; i <= endIndex; i++) {
      const part = s.message.parts[i];
      if (part?.type === "tool-call" && part.status?.type === "running") {
        return true;
      }
    }
    return false;
  });

  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(contentRef, ANIMATION_DURATION);

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      if (prev) lockScroll();
      return !prev;
    });
  }, [lockScroll]);

  const labelText = label
    ? label(toolCount)
    : `${toolCount} tool ${toolCount === 1 ? "call" : "calls"}`;

  const triggerContent = renderTrigger ? (
    renderTrigger({ count: toolCount, active: isActive, open })
  ) : (
    <>
      {isActive && <SpinnerIcon className={DEFAULT_SPINNER_CLASSNAME} />}
      <span className="relative inline-block flex-1 text-left leading-none">
        <span>{labelText}</span>
        {isActive && (
          <span
            aria-hidden
            className="shimmer pointer-events-none absolute inset-0"
          >
            {labelText}
          </span>
        )}
      </span>
      <ChevronIcon
        className={DEFAULT_CHEVRON_CLASSNAME}
        style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
      />
    </>
  );

  return (
    <div className={className ?? DEFAULT_ROOT_CLASSNAME}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-busy={isActive}
        className={triggerClassName ?? DEFAULT_TRIGGER_CLASSNAME}
      >
        {triggerContent}
      </button>
      {open && (
        <div
          ref={contentRef}
          className={contentClassName ?? DEFAULT_CONTENT_CLASSNAME}
        >
          <div className="flex flex-col gap-2">{children}</div>
        </div>
      )}
    </div>
  );
}

ToolGroup.displayName = "ToolGroup";

// --- Inline SVG icons ---

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ChevronIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
