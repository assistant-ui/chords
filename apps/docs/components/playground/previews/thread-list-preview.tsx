"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import {
  ThreadList,
  ThreadListItem,
  ComposerActionStatus,
} from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { createPlaygroundAdapter } from "@/lib/playground/mock-runtime";
import { useRef } from "react";

export function ThreadListPreview({ config }: { config: ChordConfig }) {
  const adapter = useRef(createPlaygroundAdapter());
  const runtime = useLocalRuntime(adapter.current);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-80 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800">
        {/* Sidebar */}
        <div className="w-48 shrink-0 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <ThreadList
            className={(config.className as string) || undefined}
            newThreadLabel={(config.newThreadLabel as string) || undefined}
            newThreadClassName={
              (config.newThreadClassName as string) || undefined
            }
            skeletonCount={
              config.skeletonCount !== undefined
                ? (config.skeletonCount as number)
                : undefined
            }
            ThreadListItem={() => (
              <ThreadListItem
                titleFallback={
                  (config.titleFallback as string) || undefined
                }
                actions={
                  (config.actions as Array<
                    "archive" | "delete" | "unarchive"
                  >) || undefined
                }
              />
            )}
          />
        </div>

        {/* Thread */}
        <div className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
          <ThreadPrimitive.Root className="flex flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-3 pt-3 pb-3">
                <ThreadPrimitive.Messages
                  components={{
                    UserMessage: () => (
                      <MessagePrimitive.Root className="flex w-full flex-col items-end">
                        <div className="max-w-[80%] rounded-2xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900 dark:bg-white/10 dark:text-white/90">
                          <MessagePrimitive.Content />
                        </div>
                      </MessagePrimitive.Root>
                    ),
                    AssistantMessage: () => (
                      <MessagePrimitive.Root className="flex w-full gap-2">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[9px] dark:border-white/15">
                          A
                        </div>
                        <div className="flex-1">
                          <MessagePrimitive.Parts
                            components={{
                              Text: ({ text }) => (
                                <span className="text-xs text-zinc-900 dark:text-white/90">
                                  {text}
                                </span>
                              ),
                            }}
                          />
                        </div>
                      </MessagePrimitive.Root>
                    ),
                  }}
                />
              </ThreadPrimitive.Viewport>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800">
              <ComposerPrimitive.Root className="flex items-center gap-1 px-2">
                <ComposerPrimitive.Input
                  placeholder="Type a message..."
                  className="h-8 flex-1 resize-none bg-transparent px-1 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
                />
                <ComposerActionStatus />
              </ComposerPrimitive.Root>
            </div>
          </ThreadPrimitive.Root>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
