"use client";

import { ThreadPrimitive } from "@assistant-ui/react";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { DEFAULT_BUTTON_CLASSNAME, DEFAULT_ICON_CLASSNAME } from "./defaults";

/**
 * A single-component replacement for the scroll-to-bottom button.
 *
 * Wraps `ThreadPrimitive.ScrollToBottom` which handles:
 * - Only rendering when the user is not at the bottom of the thread
 * - Smooth-scrolling to the latest message on click
 *
 * Typically placed inside `ThreadPrimitive.Viewport` (or its parent)
 * with relative positioning so the button floats at the bottom-center.
 *
 * ---
 * TODO: migrate to store
 */
export function ScrollToBottom({
  /**
   * Class applied to the button.
   */
  className,
  /**
   * Class applied to the arrow icon.
   */
  iconClassName,
  /**
   * Custom render function to replace the default icon entirely.
   */
  renderIcon,
}: {
  className?: string;
  iconClassName?: string;
  renderIcon?: () => React.ReactNode;
}) {
  return (
    <ThreadPrimitive.ScrollToBottom
      className={className ?? DEFAULT_BUTTON_CLASSNAME}
    >
      {renderIcon ? (
        renderIcon()
      ) : (
        <ArrowDownIcon className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
      )}
    </ThreadPrimitive.ScrollToBottom>
  );
}
