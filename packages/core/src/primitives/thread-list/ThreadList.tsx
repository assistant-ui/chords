"use client";

import {
  ThreadListPrimitive,
  AuiIf,
} from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_NEW_THREAD_CLASSNAME,
  DEFAULT_NEW_THREAD_ICON_CLASSNAME,
  DEFAULT_SKELETON_WRAPPER_CLASSNAME,
  DEFAULT_SKELETON_CLASSNAME,
} from "./defaults";

export type ThreadListProps = {
  /** Root list container class. */
  className?: string;
  /** "New Thread" button label. @default "New Thread" */
  newThreadLabel?: string;
  /** "New Thread" button class. */
  newThreadClassName?: string;
  /** Custom icon for the new thread button. @default plus SVG */
  newThreadIcon?: React.ReactNode;
  /** Number of skeleton rows during loading. @default 5 */
  skeletonCount?: number;
  /** Skeleton wrapper class. */
  skeletonClassName?: string;
  /** Custom skeleton renderer. */
  renderSkeleton?: () => React.ReactNode;
  /** Custom new thread button renderer. */
  renderNewThread?: () => React.ReactNode;
  /** Custom thread list item component. */
  ThreadListItem?: React.ComponentType;
};

/**
 * Renders a list of conversation threads with a "New Thread" button
 * and loading skeleton.
 *
 * Uses `AuiIf` to toggle between skeleton (loading) and items (loaded).
 * Uses `ThreadListPrimitive.Items` to render thread items.
 *
 * ```tsx
 * <ThreadList />
 * ```
 */
export function ThreadList({
  className,
  newThreadLabel = "New Thread",
  newThreadClassName,
  newThreadIcon,
  skeletonCount = 5,
  skeletonClassName,
  renderSkeleton,
  renderNewThread,
  ThreadListItem,
}: ThreadListProps) {
  return (
    <ThreadListPrimitive.Root className={className ?? DEFAULT_ROOT_CLASSNAME}>
      {renderNewThread ? (
        renderNewThread()
      ) : (
        <ThreadListPrimitive.New
          className={newThreadClassName ?? DEFAULT_NEW_THREAD_CLASSNAME}
        >
          {newThreadIcon ?? (
            <PlusIcon className={DEFAULT_NEW_THREAD_ICON_CLASSNAME} />
          )}
          {newThreadLabel}
        </ThreadListPrimitive.New>
      )}

      <AuiIf condition={(s) => s.threads.isLoading}>
        <div className="flex flex-col gap-1">
          {Array.from({ length: skeletonCount }, (_, i) =>
            renderSkeleton ? (
              <div key={i}>{renderSkeleton()}</div>
            ) : (
              <div
                key={i}
                role="status"
                aria-label="Loading threads"
                className={DEFAULT_SKELETON_WRAPPER_CLASSNAME}
              >
                <div
                  className={skeletonClassName ?? DEFAULT_SKELETON_CLASSNAME}
                />
              </div>
            ),
          )}
        </div>
      </AuiIf>

      <AuiIf condition={(s) => !s.threads.isLoading}>
        <ThreadListPrimitive.Items
          components={{
            ThreadListItem: ThreadListItem ?? DefaultThreadListItem,
          }}
        />
      </AuiIf>
    </ThreadListPrimitive.Root>
  );
}

ThreadList.displayName = "ThreadList";

/**
 * Minimal default thread list item — just a trigger with the title.
 * Import and use `ThreadListItem` from this package for a full-featured item.
 */
function DefaultThreadListItem() {
  return (
    <div className="flex h-9 items-center transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
      <button className="flex h-full min-w-0 flex-1 items-center px-3 text-start text-sm">
        <span className="min-w-0 flex-1 truncate text-zinc-700 dark:text-zinc-300">
          New Chat
        </span>
      </button>
    </div>
  );
}

// --- Inline SVG icon ---

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
