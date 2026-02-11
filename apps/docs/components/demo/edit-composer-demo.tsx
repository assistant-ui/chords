"use client";

import { MessagePrimitive, ThreadPrimitive } from "@assistant-ui/react";
import { EditComposer } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";

export function EditComposerDemo() {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="flex h-[350px] flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{
                UserMessage: DemoUserMessage,
                UserEditComposer: DemoEditComposer,
                AssistantMessage: DemoUserMessage,
              }}
            />
          </ThreadPrimitive.Viewport>
        </div>
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
}

function DemoUserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[70%] rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function DemoEditComposer() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[70%] w-full">
        <EditComposer />
      </div>
    </MessagePrimitive.Root>
  );
}
