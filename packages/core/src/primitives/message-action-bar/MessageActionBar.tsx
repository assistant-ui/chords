"use client";

import { ActionBarPrimitive } from "@assistant-ui/react";
import { CopyButton } from "../copy-button";
import { ReloadAction, EditAction, SpeakAction } from "./actions";
import { DEFAULT_ROOT_CLASSNAME } from "./defaults";

/**
 * Supported action types for the action bar.
 */
export type MessageAction = "copy" | "reload" | "edit" | "speak";

/**
 * A single-component replacement for the message action bar pattern.
 *
 * Wraps `ActionBarPrimitive.Root` with standard visibility config
 * (hideWhenRunning, autohide, autohideFloat) and renders a configurable
 * set of action buttons.
 *
 * Must be rendered inside a message context (e.g. within MessagePrimitive.Root).
 *
 * Common usage:
 * - Assistant messages: `<MessageActionBar actions={["copy", "reload"]} />`
 * - User messages: `<MessageActionBar actions={["edit"]} />`
 *
 * ---
 * TODO: migrate to store
 */
export function MessageActionBar({
  /**
   * Which actions to render, in order.
   * @default ["copy", "reload"]
   */
  actions = ["copy", "reload"],
  /**
   * Class applied to the root container (ActionBarPrimitive.Root).
   */
  className,
  /**
   * Class applied to each action button (except CopyButton which has its own prop).
   */
  buttonClassName,
  /**
   * Class applied to each action icon.
   */
  iconClassName,
  /**
   * Class applied to the CopyButton's icon.
   */
  copyIconClassName,
  /**
   * Whether to hide the action bar when the thread is running.
   * @default true
   */
  hideWhenRunning = true,
  /**
   * Controls when the action bar should automatically hide.
   * @default "not-last"
   */
  autohide = "not-last",
  /**
   * Controls floating behavior when auto-hidden.
   * @default "single-branch"
   */
  autohideFloat = "single-branch",
}: {
  actions?: MessageAction[];
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  copyIconClassName?: string;
  hideWhenRunning?: boolean;
  autohide?: "always" | "not-last" | "never";
  autohideFloat?: "always" | "single-branch" | "never";
}) {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning={hideWhenRunning}
      autohide={autohide}
      autohideFloat={autohideFloat}
      className={className ?? DEFAULT_ROOT_CLASSNAME}
    >
      {actions.map((action) => {
        switch (action) {
          case "copy":
            return (
              <CopyButton
                key="copy"
                buttonClassName={buttonClassName}
                className={copyIconClassName ?? iconClassName}
              />
            );
          case "reload":
            return (
              <ReloadAction
                key="reload"
                buttonClassName={buttonClassName}
                iconClassName={iconClassName}
              />
            );
          case "edit":
            return (
              <EditAction
                key="edit"
                buttonClassName={buttonClassName}
                iconClassName={iconClassName}
              />
            );
          case "speak":
            return (
              <SpeakAction
                key="speak"
                buttonClassName={buttonClassName}
                iconClassName={iconClassName}
              />
            );
        }
      })}
    </ActionBarPrimitive.Root>
  );
}
