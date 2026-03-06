"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  useAuiState,
  useScrollLock,
  type ReasoningGroupComponent,
} from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_CONTENT_CLASSNAME,
  DEFAULT_TEXT_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
  DEFAULT_CHEVRON_CLASSNAME,
} from "./defaults";

const ANIMATION_DURATION = 200;

/**
 * Displays AI reasoning/thinking content in a collapsible accordion.
 *
 * Auto-expands while reasoning is streaming, collapses when done.
 * Shows a trigger label with shimmer animation during streaming.
 *
 * Used as a `ReasoningGroupComponent` with `MessagePrimitive.Parts`:
 *
 * ```tsx
 * <MessagePrimitive.Parts
 *   components={{ ReasoningGroup: ReasoningAccordion }}
 * />
 * ```
 *
 * Must be rendered inside a message context.
 */
export const ReasoningAccordion: ReasoningGroupComponent = ({
  children,
  startIndex,
  endIndex,
  className,
  triggerClassName,
  contentClassName,
  textClassName,
  label = "Reasoning",
  renderTrigger,
  renderIcon,
}: React.PropsWithChildren<{
  startIndex: number;
  endIndex: number;
  /** Root container class. */
  className?: string;
  /** Trigger row class. */
  triggerClassName?: string;
  /** Collapsible content area class. */
  contentClassName?: string;
  /** Inner text wrapper class. */
  textClassName?: string;
  /** Trigger label text. @default "Reasoning" */
  label?: string;
  /** Custom trigger renderer. */
  renderTrigger?: (props: { active: boolean; label: string }) => React.ReactNode;
  /** Custom icon renderer. @default brain SVG */
  renderIcon?: () => React.ReactNode;
}>) => {
  const isActive = useAuiState((s) => {
    if (s.message.status?.type !== "running") return false;
    const lastIndex = s.message.parts.length - 1;
    if (lastIndex < 0) return false;
    const lastType = s.message.parts[lastIndex]?.type;
    if (lastType !== "reasoning") return false;
    return lastIndex >= startIndex && lastIndex <= endIndex;
  });

  const [open, setOpen] = useState(isActive);
  const [userToggled, setUserToggled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(contentRef, ANIMATION_DURATION);

  // Auto-open when streaming starts, auto-close when it ends
  // (unless the user has manually toggled)
  useEffect(() => {
    if (isActive) {
      setOpen(true);
      setUserToggled(false);
    } else if (!userToggled) {
      setOpen(false);
    }
  }, [isActive, userToggled]);

  const handleToggle = useCallback(() => {
    setUserToggled(true);
    setOpen((prev) => {
      if (prev) lockScroll();
      return !prev;
    });
  }, [lockScroll]);

  const triggerContent = renderTrigger ? (
    renderTrigger({ active: isActive, label })
  ) : (
    <>
      {renderIcon ? (
        renderIcon()
      ) : (
        <BrainIcon className={DEFAULT_ICON_CLASSNAME} />
      )}
      <span className="relative inline-block leading-none">
        <span>{label}</span>
        {isActive && (
          <span
            aria-hidden
            className="shimmer pointer-events-none absolute inset-0"
          >
            {label}
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
      <div
        ref={contentRef}
        className={contentClassName ?? DEFAULT_CONTENT_CLASSNAME}
        style={{
          display: open ? "block" : "none",
        }}
      >
        <div className={textClassName ?? DEFAULT_TEXT_CLASSNAME}>
          {children}
        </div>
      </div>
    </div>
  );
};

ReasoningAccordion.displayName = "ReasoningAccordion";

// --- Inline SVG icons (no lucide dependency) ---

function BrainIcon({ className }: { className?: string }) {
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
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
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
