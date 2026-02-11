"use client";

import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import {
  ComposerAttachments,
  ComposerAddAttachment,
  ComposerActionStatus,
  MessageAttachments,
} from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";

export function AttachmentDemo() {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="flex h-[400px] flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{
                UserMessage: DemoUserMessage,
                AssistantMessage: DemoAssistantMessage,
              }}
            />
          </ThreadPrimitive.Viewport>
        </div>
        <DemoComposer />
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
}

function DemoUserMessage() {
  return (
    <MessagePrimitive.Root className="flex flex-col items-end gap-1">
      <MessageAttachments />
      <div className="max-w-[70%] rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function DemoAssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex gap-2">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px]">
        A
      </div>
      <div className="flex-1">
        <div className="text-sm text-white/90">
          <MessagePrimitive.Content />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}

function DemoComposer() {
  return (
    <ComposerPrimitive.Root className="flex flex-col rounded-t-xl border-t border-zinc-800 bg-zinc-900 px-3">
      <ComposerAttachments />
      <div className="flex items-center">
        <ComposerAddAttachment />
        <ComposerPrimitive.Input
          placeholder="Type a message..."
          className="h-10 flex-1 resize-none bg-transparent p-2 text-sm text-white outline-none placeholder:text-white/50"
        />
        <ComposerActionStatus />
      </div>
    </ComposerPrimitive.Root>
  );
}
