"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import { ToolCallRenderer } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { createToolCallAdapter } from "@/lib/playground/mock-runtime";
import { useRef } from "react";

const UserMessage = () => (
  <MessagePrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
    <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

const AssistantMessage = () => (
  <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
    <div className="mt-2.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
      A
    </div>
    <div className="flex-1 pt-0.5">
      <MessagePrimitive.Parts
        components={{
          Text: ({ text }) => (
            <span className="text-sm text-zinc-900 dark:text-white/90">
              {text}
            </span>
          ),
          tools: { Fallback: ToolCallRenderer },
        }}
      />
    </div>
  </MessagePrimitive.Root>
);

export function ToolCallRendererPreview({
  config: _config,
}: {
  config: ChordConfig;
}) {
  const adapter = useRef(createToolCallAdapter());
  const runtime = useLocalRuntime(adapter.current);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadPrimitive.Root className="flex h-80 flex-col rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{
                UserMessage,
                AssistantMessage,
              }}
            />
          </ThreadPrimitive.Viewport>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <ThreadPrimitive.If running={false}>
            <ThreadPrimitive.Suggestion
              prompt="What's the weather in Paris?"
              send
              className="w-full rounded-lg bg-zinc-100 dark:bg-white/5 px-3 py-2 text-left text-sm text-zinc-600 dark:text-white/60 transition-colors hover:bg-zinc-200 dark:hover:bg-white/10"
            >
              Click to trigger tool call demo
            </ThreadPrimitive.Suggestion>
          </ThreadPrimitive.If>
        </div>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
