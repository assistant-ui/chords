"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ActionBarPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import {
  ActionBarMore,
  ComposerActionStatus,
  CopyButton,
} from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { useRef } from "react";

const previewAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const text = "This is a message with an action bar. Click the ··· button to see the overflow menu.";
    for (let i = 0; i < text.length; i += 5) {
      if (abortSignal.aborted) return;
      yield { content: [{ type: "text" as const, text: text.slice(0, i + 5) }] };
      await new Promise((r) => setTimeout(r, 20));
    }
    yield { content: [{ type: "text" as const, text }] };
  },
};

export function ActionBarMorePreview({ config }: { config: ChordConfig }) {
  const adapter = useRef(previewAdapter);
  const runtime = useLocalRuntime(adapter.current);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800">
        <ThreadPrimitive.Root className="flex h-72 flex-col bg-white dark:bg-zinc-950">
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
                    <MessagePrimitive.Root className="group flex w-full gap-2">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[9px] dark:border-white/15">
                        A
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-zinc-900 dark:text-white/90">
                          <MessagePrimitive.Content />
                        </div>
                        <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 has-[[data-state=open]]:opacity-100">
                          <ActionBarPrimitive.Root
                            hideWhenRunning
                            autohide="not-last"
                            autohideFloat="single-branch"
                            className="flex items-center gap-1 text-zinc-500 dark:text-white/60"
                          >
                            <CopyButton />
                            <ActionBarMore
                              className={
                                (config.className as string) || undefined
                              }
                              menuClassName={
                                (config.menuClassName as string) || undefined
                              }
                              side={
                                (config.side as
                                  | "top"
                                  | "right"
                                  | "bottom"
                                  | "left") ?? "bottom"
                              }
                              align={
                                (config.align as
                                  | "start"
                                  | "center"
                                  | "end") ?? "start"
                              }
                            />
                          </ActionBarPrimitive.Root>
                        </div>
                      </div>
                    </MessagePrimitive.Root>
                  ),
                }}
              />
            </ThreadPrimitive.Viewport>
          </div>
          <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <ThreadPrimitive.If running={false}>
              <ThreadPrimitive.Suggestion
                prompt="Show me a message"
                send
                className="w-full rounded-lg bg-zinc-100 px-3 py-1.5 text-left text-xs text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
              >
                Send a message
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}
