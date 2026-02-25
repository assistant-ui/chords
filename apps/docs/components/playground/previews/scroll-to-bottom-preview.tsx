"use client";

import { ThreadPrimitive, MessagePrimitive, ComposerPrimitive } from "@assistant-ui/react";
import { ScrollToBottom, ComposerActionStatus, MessageStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { PlaygroundRuntime } from "./preview-wrapper";

const UserMessage = () => (
  <MessagePrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
    <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

const AssistantMessage = () => (
  <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
      A
    </div>
    <div className="flex-1 pt-1">
      <div className="text-zinc-900 dark:text-white/90">
        <MessagePrimitive.Content />
      </div>
      <MessageStatus />
    </div>
  </MessagePrimitive.Root>
);

export function ScrollToBottomPreview({
  config: _config,
}: {
  config: ChordConfig;
}) {
  return (
    <PlaygroundRuntime>
      <ThreadPrimitive.Root className="flex h-80 flex-col rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-4 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{ UserMessage, AssistantMessage }}
            />
          </ThreadPrimitive.Viewport>
          <ScrollToBottom />
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
            <ComposerPrimitive.Input
              placeholder="Send a few messages, then scroll up..."
              className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
            />
            <ComposerActionStatus />
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Root>
    </PlaygroundRuntime>
  );
}
