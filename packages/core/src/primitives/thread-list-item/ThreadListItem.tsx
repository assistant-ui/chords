"use client";

import {
  ThreadListItemPrimitive,
  ThreadListItemMorePrimitive,
} from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_TRIGGER_CLASSNAME,
  DEFAULT_TITLE_CLASSNAME,
  DEFAULT_MORE_BUTTON_CLASSNAME,
  DEFAULT_MENU_CLASSNAME,
  DEFAULT_MENU_ITEM_CLASSNAME,
  DEFAULT_MENU_ITEM_DESTRUCTIVE_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

export type ThreadListAction = "archive" | "delete" | "unarchive";

export type ThreadListItemProps = {
  /** Item root class. */
  className?: string;
  /** Trigger/clickable area class. */
  triggerClassName?: string;
  /** Title text class. */
  titleClassName?: string;
  /** Fallback title when thread has no title. @default "New Chat" */
  titleFallback?: string;
  /** Which actions to show in the more menu. @default ["archive", "delete"] */
  actions?: ThreadListAction[];
  /** More button class. */
  moreButtonClassName?: string;
  /** Dropdown menu class. */
  menuClassName?: string;
  /** Menu item class. */
  menuItemClassName?: string;
  /** Custom title renderer. */
  renderTitle?: () => React.ReactNode;
  /** Custom more menu renderer. */
  renderMore?: () => React.ReactNode;
};

/**
 * Renders a single thread in the thread list — title, active state
 * highlighting, and a context menu with archive/delete actions.
 *
 * Uses `ThreadListItemPrimitive` for the item root, trigger, and title.
 * Uses `ThreadListItemMorePrimitive` for the context menu.
 *
 * ```tsx
 * <ThreadList ThreadListItem={ThreadListItem} />
 * ```
 */
export function ThreadListItem({
  className,
  triggerClassName,
  titleClassName,
  titleFallback = "New Chat",
  actions = ["archive", "delete"],
  moreButtonClassName,
  menuClassName,
  menuItemClassName,
  renderTitle,
  renderMore,
}: ThreadListItemProps = {}) {
  return (
    <ThreadListItemPrimitive.Root
      className={className ?? DEFAULT_ROOT_CLASSNAME}
    >
      <ThreadListItemPrimitive.Trigger
        className={triggerClassName ?? DEFAULT_TRIGGER_CLASSNAME}
      >
        <span className={titleClassName ?? DEFAULT_TITLE_CLASSNAME}>
          {renderTitle ? (
            renderTitle()
          ) : (
            <ThreadListItemPrimitive.Title fallback={titleFallback} />
          )}
        </span>
      </ThreadListItemPrimitive.Trigger>

      {actions.length > 0 &&
        (renderMore ? (
          renderMore()
        ) : (
          <ThreadListItemMorePrimitive.Root>
            <ThreadListItemMorePrimitive.Trigger
              className={moreButtonClassName ?? DEFAULT_MORE_BUTTON_CLASSNAME}
            >
              <MoreHorizontalIcon className={DEFAULT_ICON_CLASSNAME} />
              <span className="sr-only">More options</span>
            </ThreadListItemMorePrimitive.Trigger>
            <ThreadListItemMorePrimitive.Content
              side="bottom"
              align="start"
              className={menuClassName ?? DEFAULT_MENU_CLASSNAME}
            >
              {actions.includes("archive") && (
                <ThreadListItemPrimitive.Archive asChild>
                  <ThreadListItemMorePrimitive.Item
                    className={
                      menuItemClassName ?? DEFAULT_MENU_ITEM_CLASSNAME
                    }
                  >
                    <ArchiveIcon className={DEFAULT_ICON_CLASSNAME} />
                    Archive
                  </ThreadListItemMorePrimitive.Item>
                </ThreadListItemPrimitive.Archive>
              )}
              {actions.includes("unarchive") && (
                <ThreadListItemPrimitive.Unarchive asChild>
                  <ThreadListItemMorePrimitive.Item
                    className={
                      menuItemClassName ?? DEFAULT_MENU_ITEM_CLASSNAME
                    }
                  >
                    <ArchiveIcon className={DEFAULT_ICON_CLASSNAME} />
                    Unarchive
                  </ThreadListItemMorePrimitive.Item>
                </ThreadListItemPrimitive.Unarchive>
              )}
              {actions.includes("delete") && (
                <ThreadListItemPrimitive.Delete asChild>
                  <ThreadListItemMorePrimitive.Item
                    className={
                      menuItemClassName ??
                      DEFAULT_MENU_ITEM_DESTRUCTIVE_CLASSNAME
                    }
                  >
                    <TrashIcon className={DEFAULT_ICON_CLASSNAME} />
                    Delete
                  </ThreadListItemMorePrimitive.Item>
                </ThreadListItemPrimitive.Delete>
              )}
            </ThreadListItemMorePrimitive.Content>
          </ThreadListItemMorePrimitive.Root>
        ))}
    </ThreadListItemPrimitive.Root>
  );
}

ThreadListItem.displayName = "ThreadListItem";

// --- Inline SVG icons ---

function MoreHorizontalIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function ArchiveIcon({ className }: { className?: string }) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
