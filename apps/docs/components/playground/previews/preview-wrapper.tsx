"use client";

import { type ReactNode } from "react";
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  SimpleImageAttachmentAdapter,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import {
  ComposerActionStatus,
  MessageActionBar,
  MessageStatus,
  BranchNavigation,
} from "@assistant-ui/chords";
import { createPlaygroundAdapter } from "@/lib/playground/mock-runtime";
import { useRef } from "react";

export function PlaygroundRuntime({ children }: { children: ReactNode }) {
  const adapter = useRef(createPlaygroundAdapter());

  const runtime = useLocalRuntime(adapter.current, {
    adapters: {
      attachments: new SimpleImageAttachmentAdapter(),
      suggestion: {
        async generate() {
          return [
            { prompt: "Tell me more about this" },
            { prompt: "Can you give an example?" },
            { prompt: "What are the alternatives?" },
          ];
        },
      },
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}

export function PreviewThread({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ThreadPrimitive.Root
      className={
        className ??
        "flex h-full flex-col rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
      }
    >
      {children}
    </ThreadPrimitive.Root>
  );
}

export function PreviewViewport({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-0 flex-1">
      <ThreadPrimitive.Viewport className="flex h-full flex-col gap-4 overflow-y-auto px-4 pt-4 pb-4">
        {children}
      </ThreadPrimitive.Viewport>
    </div>
  );
}

export function PreviewComposer() {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
      <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
        <ComposerPrimitive.Input
          placeholder="Type a message..."
          className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
        />
        <ComposerActionStatus />
      </ComposerPrimitive.Root>
    </div>
  );
}

export const PreviewUserMessage = () => (
  <MessagePrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
    <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

export const PreviewAssistantMessage = () => (
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
        <BranchNavigation />
      </div>
    </div>
  </MessagePrimitive.Root>
);
