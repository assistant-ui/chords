"use client";

import { ThreadPrimitive, ComposerPrimitive, MessagePrimitive } from "@assistant-ui/react";
import {
  ComposerActionStatus,
  ComposerAddAttachment,
  ComposerAttachments,
  MessageAttachments,
  MessageActionBar,
  MessageStatus,
} from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { PlaygroundRuntime, PreviewThread, PreviewViewport } from "./preview-wrapper";

const UserMessage = () => (
  <MessagePrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
    <MessageAttachments />
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
      <div className="mt-1 flex items-center gap-2 opacity-0 transition-opacity group-hover/message:opacity-100">
        <MessageActionBar actions={["copy", "reload"]} />
      </div>
    </div>
  </MessagePrimitive.Root>
);

export function AttachmentPreview({
  config: _config,
}: {
  config: ChordConfig;
}) {
  return (
    <PlaygroundRuntime>
      <PreviewThread>
        <PreviewViewport>
          <ThreadPrimitive.Messages
            components={{ UserMessage, AssistantMessage }}
          />
        </PreviewViewport>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex flex-col rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
            <ComposerAttachments />
            <div className="flex items-center">
              <ComposerAddAttachment />
              <ComposerPrimitive.Input
                placeholder="Attach a file and send..."
                className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
              />
              <ComposerActionStatus />
            </div>
          </ComposerPrimitive.Root>
        </div>
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
