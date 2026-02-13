"use client";

import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import {
  BranchNavigation,
  ComposerActionStatus,
  EditComposer,
  MessageActionBar,
  MessageStatus,
} from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";
import { FC } from "react";
import { ArrowRightIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export const EditComposerDemo: FC = () => {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="flex h-87.5 flex-col rounded-xl border border-zinc-400 dark:border-zinc-800  bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white px-8">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-4 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{
                UserMessage: DemoUserMessage,
                UserEditComposer: DemoEditComposer,
                AssistantMessage: DemoAssistantMessage,
              }}
            />
          </ThreadPrimitive.Viewport>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
            <ComposerPrimitive.Input
              placeholder="How can I help you ?"
              className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
            />
            <ComposerActionStatus />
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
};

const DemoUserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl justify-end gap-1">
      <div className="opacity-0 transition-opacity group-hover/message:opacity-100 flex items-end">
        <MessageActionBar actions={["edit"]} />
      </div>
      <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5  text-zinc-900 dark:bg-white/10 dark:text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
};

const DemoAssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
        A
      </div>
      <div className="flex-1 pt-1">
        <div className="text-zinc-900 dark:text-white/90">
          <MessagePrimitive.Parts
            components={{
              Text: ({ text }) => <span>{text}</span>,
            }}
          />
        </div>
        <MessageStatus />
        <div className="mt-1 flex items-center gap-2 opacity-0 transition-opacity group-hover/message:opacity-100">
          <MessageActionBar actions={["copy", "reload"]} />
          <BranchNavigation />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

function DemoEditComposer() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[70%] w-full">
        <EditComposer />
      </div>
    </MessagePrimitive.Root>
  );
}
