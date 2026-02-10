"use client";

import { ThreadPrimitive } from "@assistant-ui/react";
import {
  DEFAULT_CONTAINER_CLASSNAME,
  DEFAULT_CHIP_CLASSNAME,
  DEFAULT_TITLE_CLASSNAME,
  DEFAULT_DESCRIPTION_CLASSNAME,
} from "./defaults";

/**
 * A suggestion item — either a plain string or a rich object.
 */
export type SuggestionItem =
  | string
  | { prompt: string; label?: string; description?: string };

/**
 * A single-component replacement for the suggestion chips pattern.
 *
 * Renders a grid of suggestion buttons from a static list.
 * Each chip wraps `ThreadPrimitive.Suggestion` which handles:
 * - Setting composer text or auto-sending on click
 * - Auto-disabling when the thread is disabled/running
 *
 * Does NOT require a message context — works at the thread level.
 * Typically used inside `ThreadPrimitive.Empty` for welcome screens.
 *
 * ---
 * TODO: migrate to store
 */
export function SuggestionChips({
  /**
   * List of suggestions to render.
   * Each item can be a plain string or a rich object with prompt, label, and description.
   */
  suggestions,
  /**
   * Class applied to the grid container.
   */
  className,
  /**
   * Class applied to each chip button.
   */
  chipClassName,
  /**
   * Class applied to the title/label text.
   */
  titleClassName,
  /**
   * Class applied to the description text.
   */
  descriptionClassName,
  /**
   * Whether clicking a chip sends the message immediately.
   * @default true
   */
  send = true,
}: {
  suggestions: SuggestionItem[];
  className?: string;
  chipClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  send?: boolean;
}) {
  return (
    <div className={className ?? DEFAULT_CONTAINER_CLASSNAME}>
      {suggestions.map((item, index) => {
        const prompt = typeof item === "string" ? item : item.prompt;
        const label =
          typeof item === "string" ? item : (item.label ?? item.prompt);
        const description =
          typeof item === "string" ? undefined : item.description;

        return (
          <ThreadPrimitive.Suggestion
            key={index}
            prompt={prompt}
            send={send}
            className={chipClassName ?? DEFAULT_CHIP_CLASSNAME}
          >
            <span className={titleClassName ?? DEFAULT_TITLE_CLASSNAME}>
              {label}
            </span>
            {description && (
              <span
                className={
                  descriptionClassName ?? DEFAULT_DESCRIPTION_CLASSNAME
                }
              >
                {description}
              </span>
            )}
          </ThreadPrimitive.Suggestion>
        );
      })}
    </div>
  );
}
