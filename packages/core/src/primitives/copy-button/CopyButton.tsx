"use client";

import { ActionBarPrimitive } from "@assistant-ui/react";
import { CopyButtonVisual } from "./CopyButtonVisual";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

/**
 * A single-component replacement for the copy-message pattern.
 *
 * Wraps `ActionBarPrimitive.Copy` which handles:
 * - Clipboard API call
 * - `data-copied` attribute (set for `copiedDuration` ms after copy)
 * - Auto-disabled when there's no copyable content
 *
 * The default visual swaps between CopyIcon and CheckIcon
 * using the `data-copied` attribute on the parent button.
 *
 * Must be rendered inside a message context (e.g. within MessagePrimitive.Root).
 *
 * ---
 * TODO: migrate to store — optionally switch CSS-driven state to useAuiState
 */
export function CopyButton({
  /**
   * Class applied to the inner visual (icon).
   */
  className,
  /**
   * Class applied to the button wrapper.
   */
  buttonClassName,
  /**
   * Duration in ms to show the "copied" state.
   * @default 3000
   */
  copiedDuration,
  /**
   * Optional custom visual renderer.
   * Receives the `data-copied` state cannot be read here;
   * use CSS `[data-copied] &` selectors or provide both icons.
   */
  renderVisual,
}: {
  className?: string;
  buttonClassName?: string;
  copiedDuration?: number;
  renderVisual?: () => React.ReactNode;
}) {
  const visual = renderVisual ? (
    renderVisual()
  ) : (
    <CopyButtonVisual className={className ?? DEFAULT_ICON_CLASSNAME} />
  );

  return (
    <ActionBarPrimitive.Copy
      copiedDuration={copiedDuration}
      className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
    >
      {visual}
    </ActionBarPrimitive.Copy>
  );
}
