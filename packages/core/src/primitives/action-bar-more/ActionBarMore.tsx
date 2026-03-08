"use client";

import {
  ActionBarMorePrimitive,
  ActionBarPrimitive,
} from "@assistant-ui/react";
import { DotsHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";
import {
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_CONTENT_CLASSNAME,
  DEFAULT_ITEM_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

/**
 * A custom action rendered in the overflow menu.
 */
export type CustomAction = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

/**
 * An action that can appear in the ActionBarMore dropdown.
 * Use `"export-markdown"` for the built-in export action,
 * or provide a custom action object.
 */
export type ActionBarMoreAction = "export-markdown" | CustomAction;

export type ActionBarMoreProps = {
  /** Which actions to render. @default ["export-markdown"] */
  actions?: ActionBarMoreAction[];
  /** Trigger button class. */
  className?: string;
  /** Dropdown menu container class. */
  menuClassName?: string;
  /** Each menu item class. */
  itemClassName?: string;
  /** Icon class applied to built-in action icons. */
  iconClassName?: string;
  /** Dropdown position side. @default "bottom" */
  side?: "top" | "right" | "bottom" | "left";
  /** Dropdown alignment. @default "start" */
  align?: "start" | "center" | "end";
  /** Custom trigger icon. */
  triggerIcon?: React.ReactNode;
  /** Fully custom trigger renderer. */
  renderTrigger?: () => React.ReactNode;
};

/**
 * Overflow menu for the message action bar. Renders a "..." trigger
 * that opens a dropdown with additional actions like export markdown.
 *
 * Must be rendered inside `ActionBarPrimitive.Root` (i.e. within a message context).
 *
 * ```tsx
 * <ActionBarPrimitive.Root>
 *   <CopyButton />
 *   <ActionBarMore />
 * </ActionBarPrimitive.Root>
 * ```
 */
export function ActionBarMore({
  actions = ["export-markdown"],
  className,
  menuClassName,
  itemClassName,
  iconClassName,
  side = "bottom",
  align = "start",
  triggerIcon,
  renderTrigger,
}: ActionBarMoreProps) {
  const triggerCls = className ?? DEFAULT_TRIGGER_CLASSNAME;
  const contentCls = menuClassName ?? DEFAULT_CONTENT_CLASSNAME;
  const itemCls = itemClassName ?? DEFAULT_ITEM_CLASSNAME;
  const iconCls = iconClassName ?? DEFAULT_ICON_CLASSNAME;

  return (
    <ActionBarMorePrimitive.Root>
      <ActionBarMorePrimitive.Trigger asChild>
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <button type="button" className={triggerCls}>
            {triggerIcon ?? <DotsHorizontalIcon className={iconCls} />}
          </button>
        )}
      </ActionBarMorePrimitive.Trigger>
      <ActionBarMorePrimitive.Content
        side={side}
        align={align}
        className={contentCls}
      >
        {actions.map((action, i) => {
          if (action === "export-markdown") {
            return (
              <ActionBarPrimitive.ExportMarkdown key="export-markdown" asChild>
                <ActionBarMorePrimitive.Item className={itemCls}>
                  <DownloadIcon className={iconCls} />
                  Export as Markdown
                </ActionBarMorePrimitive.Item>
              </ActionBarPrimitive.ExportMarkdown>
            );
          }

          return (
            <ActionBarMorePrimitive.Item
              key={action.label}
              className={itemCls}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </ActionBarMorePrimitive.Item>
          );
        })}
      </ActionBarMorePrimitive.Content>
    </ActionBarMorePrimitive.Root>
  );
}

ActionBarMore.displayName = "ActionBarMore";
