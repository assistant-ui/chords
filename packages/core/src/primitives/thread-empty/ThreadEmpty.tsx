"use client";

import { ThreadPrimitive } from "@assistant-ui/react";
import { SuggestionChips } from "../suggestion-chips";
import type { SuggestionItem } from "../suggestion-chips";
import {
  DEFAULT_CONTAINER_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
  DEFAULT_GREETING_CLASSNAME,
  DEFAULT_SUBTITLE_CLASSNAME,
  DEFAULT_SUGGESTIONS_WRAPPER_CLASSNAME,
} from "./defaults";

/**
 * A single-component replacement for the thread empty/welcome state.
 *
 * Wraps `ThreadPrimitive.Empty` which handles:
 * - Only rendering when the thread has zero messages
 *
 * Renders a centered layout with an icon, greeting, optional subtitle,
 * and optional suggestion chips (composing our SuggestionChips primitive).
 *
 * ---
 * TODO: migrate to store
 */
export function ThreadEmpty({
  /**
   * The icon letter or short text displayed in the avatar circle.
   * @default "U"
   */
  icon = "U",
  /**
   * Custom render function to replace the default icon entirely.
   */
  renderIcon,
  /**
   * The main greeting text.
   * @default "How can I help you today?"
   */
  greeting = "How can I help you today?",
  /**
   * Optional subtitle below the greeting.
   */
  subtitle,
  /**
   * Optional list of suggestions to render as chips.
   * If provided, composes the SuggestionChips primitive.
   */
  suggestions,
  /**
   * Whether clicking a suggestion chip sends immediately.
   * @default true
   */
  suggestionSend,
  className,
  iconClassName,
  greetingClassName,
  subtitleClassName,
  suggestionsWrapperClassName,
  suggestionsClassName,
  suggestionChipClassName,
}: {
  icon?: React.ReactNode;
  renderIcon?: () => React.ReactNode;
  greeting?: string;
  subtitle?: string;
  suggestions?: SuggestionItem[];
  suggestionSend?: boolean;
  className?: string;
  iconClassName?: string;
  greetingClassName?: string;
  subtitleClassName?: string;
  suggestionsWrapperClassName?: string;
  suggestionsClassName?: string;
  suggestionChipClassName?: string;
}) {
  return (
    <ThreadPrimitive.Empty>
      <div className={className ?? DEFAULT_CONTAINER_CLASSNAME}>
        {renderIcon ? (
          renderIcon()
        ) : (
          <div className={iconClassName ?? DEFAULT_ICON_CLASSNAME}>{icon}</div>
        )}

        <p className={greetingClassName ?? DEFAULT_GREETING_CLASSNAME}>
          {greeting}
        </p>

        {subtitle && (
          <p className={subtitleClassName ?? DEFAULT_SUBTITLE_CLASSNAME}>
            {subtitle}
          </p>
        )}

        {suggestions && suggestions.length > 0 && (
          <div
            className={
              suggestionsWrapperClassName ??
              DEFAULT_SUGGESTIONS_WRAPPER_CLASSNAME
            }
          >
            <SuggestionChips
              suggestions={suggestions}
              send={suggestionSend}
              className={suggestionsClassName}
              chipClassName={suggestionChipClassName}
            />
          </div>
        )}
      </div>
    </ThreadPrimitive.Empty>
  );
}
