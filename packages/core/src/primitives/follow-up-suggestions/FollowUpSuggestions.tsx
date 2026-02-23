"use client";

import { ThreadPrimitive, useAuiState } from "@assistant-ui/react";
import {
  DEFAULT_CONTAINER_CLASSNAME,
  DEFAULT_CHIP_CLASSNAME,
} from "./defaults";

export function FollowUpSuggestions({
  /**
   * Class applied to the container.
   */
  className,
  /**
   * Class applied to each suggestion chip.
   */
  chipClassName,
  /**
   * Whether clicking a chip sends the message immediately.
   * @default true
   */
  autoSend = true,
  /**
   * Optional custom chip renderer.
   * If provided, replaces the default chip rendering.
   */
  renderChip,
}: {
  className?: string;
  chipClassName?: string;
  autoSend?: boolean;
  renderChip?: (prompt: string, index: number) => React.ReactNode;
} = {}) {
  const suggestions = useAuiState((s) => s.thread.suggestions);
  const isRunning = useAuiState((s) => s.thread.isRunning);

  if (!suggestions?.length || isRunning) return null;

  return (
    <div className={className ?? DEFAULT_CONTAINER_CLASSNAME}>
      {suggestions.map((suggestion, index) =>
        renderChip ? (
          renderChip(suggestion.prompt, index)
        ) : (
          <ThreadPrimitive.Suggestion
            key={index}
            prompt={suggestion.prompt}
            method="replace"
            autoSend={autoSend}
            className={chipClassName ?? DEFAULT_CHIP_CLASSNAME}
          >
            {suggestion.prompt}
          </ThreadPrimitive.Suggestion>
        ),
      )}
    </div>
  );
}
