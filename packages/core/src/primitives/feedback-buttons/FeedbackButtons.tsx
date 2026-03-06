"use client";

import { ActionBarPrimitive } from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

export type FeedbackButtonsProps = {
  /** Root container class. */
  className?: string;
  /** Thumbs up button class. */
  positiveClassName?: string;
  /** Thumbs down button class. */
  negativeClassName?: string;
  /** Icon class applied to both icons. */
  iconClassName?: string;
  /** Aria-label for thumbs up. @default "Good response" */
  positiveLabel?: string;
  /** Aria-label for thumbs down. @default "Bad response" */
  negativeLabel?: string;
  /** Custom thumbs up icon renderer. */
  renderPositiveIcon?: () => React.ReactNode;
  /** Custom thumbs down icon renderer. */
  renderNegativeIcon?: () => React.ReactNode;
};

/**
 * Thumbs up / thumbs down feedback buttons for assistant messages.
 *
 * Wraps `ActionBarPrimitive.FeedbackPositive` and `ActionBarPrimitive.FeedbackNegative`.
 * The primitives handle `submitFeedback` calls and set `data-submitted` automatically.
 *
 * Must be rendered inside a message context (e.g. within `MessagePrimitive.Root`
 * or alongside `ActionBarPrimitive.Root`).
 *
 * ```tsx
 * <FeedbackButtons />
 * ```
 */
export function FeedbackButtons({
  className,
  positiveClassName,
  negativeClassName,
  iconClassName,
  positiveLabel = "Good response",
  negativeLabel = "Bad response",
  renderPositiveIcon,
  renderNegativeIcon,
}: FeedbackButtonsProps) {
  return (
    <div className={className ?? DEFAULT_ROOT_CLASSNAME}>
      <ActionBarPrimitive.FeedbackPositive
        className={positiveClassName ?? DEFAULT_BUTTON_CLASSNAME}
        aria-label={positiveLabel}
      >
        {renderPositiveIcon ? (
          renderPositiveIcon()
        ) : (
          <ThumbsUpIcons className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
        )}
      </ActionBarPrimitive.FeedbackPositive>
      <ActionBarPrimitive.FeedbackNegative
        className={negativeClassName ?? DEFAULT_BUTTON_CLASSNAME}
        aria-label={negativeLabel}
      >
        {renderNegativeIcon ? (
          renderNegativeIcon()
        ) : (
          <ThumbsDownIcons className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
        )}
      </ActionBarPrimitive.FeedbackNegative>
    </div>
  );
}

FeedbackButtons.displayName = "FeedbackButtons";

// --- Inline SVG icons (no lucide dependency) ---
// Each renders an outline icon (hidden when submitted) and a filled icon
// (hidden when not submitted). The parent button's `data-submitted` attribute
// controls visibility via CSS: `group-data-[submitted]` shows/hides.

const OUTLINE_HIDE = "block group-data-[submitted]:hidden";
const FILLED_SHOW = "hidden group-data-[submitted]:block";

function ThumbsUpIcons({ className }: { className?: string }) {
  return (
    <span className={`${className} relative`}>
      {/* Outline (default) */}
      <svg
        className={OUTLINE_HIDE}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
      {/* Filled (submitted) */}
      <svg
        className={FILLED_SHOW}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    </span>
  );
}

function ThumbsDownIcons({ className }: { className?: string }) {
  return (
    <span className={`${className} relative`}>
      {/* Outline (default) */}
      <svg
        className={OUTLINE_HIDE}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 14V2" />
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
      </svg>
      {/* Filled (submitted) */}
      <svg
        className={FILLED_SHOW}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 14V2" />
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
      </svg>
    </span>
  );
}
