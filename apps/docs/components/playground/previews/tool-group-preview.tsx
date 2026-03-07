"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import {
  ToolCallRenderer,
  ToolGroup,
  ComposerActionStatus,
} from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { useRef } from "react";

const toolAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const id1 = `call_${Date.now()}_1`;
    const id2 = `call_${Date.now()}_2`;

    const tc1 = {
      type: "tool-call" as const,
      toolCallId: id1,
      toolName: "search",
      args: { query: "hello" },
      argsText: JSON.stringify({ query: "hello" }),
    };
    const tc2 = {
      type: "tool-call" as const,
      toolCallId: id2,
      toolName: "fetch",
      args: { url: "https://example.com" },
      argsText: JSON.stringify({ url: "https://example.com" }),
    };

    yield { content: [tc1] };
    yield { content: [tc1, tc2] };

    await new Promise((r) => setTimeout(r, 1200));
    if (abortSignal.aborted) return;

    yield {
      content: [
        { ...tc1, result: { hits: 42 } },
        { ...tc2, result: { status: 200 } },
        {
          type: "text" as const,
          text: "Found 42 results. The page returned status 200.",
        },
      ],
    };
  },
};

export function ToolGroupPreview({ config }: { config: ChordConfig }) {
  const adapter = useRef(toolAdapter);
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
                    <MessagePrimitive.Root className="flex w-full gap-2">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[9px] dark:border-white/15">
                        A
                      </div>
                      <div className="flex-1 text-xs text-zinc-900 dark:text-white/90">
                        <MessagePrimitive.Parts
                          components={{
                            Text: ({ text }) => <span>{text}</span>,
                            tools: { Fallback: ToolCallRenderer },
                            ToolGroup: (props) => (
                              <ToolGroup
                                {...props}
                                className={
                                  (config.className as string) || undefined
                                }
                                triggerClassName={
                                  (config.triggerClassName as string) ||
                                  undefined
                                }
                                contentClassName={
                                  (config.contentClassName as string) ||
                                  undefined
                                }
                                defaultOpen={
                                  (config.defaultOpen as boolean) ?? false
                                }
                              />
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
          <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <ThreadPrimitive.If running={false}>
              <ThreadPrimitive.Suggestion
                prompt="Search and fetch something"
                send
                className="w-full rounded-lg bg-zinc-100 px-3 py-1.5 text-left text-xs text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
              >
                Run tool calls
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}
