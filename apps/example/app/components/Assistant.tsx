"use client";

import { useState } from "react";
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  SimpleImageAttachmentAdapter,
} from "@assistant-ui/react";
import {
  BranchNavigation,
  ComposerActionStatus,
  ComposerAddAttachment,
  ComposerAttachments,
  EditComposer,
  FollowUpSuggestions,
  MessageActionBar,
  MessageAttachments,
  MessageStatus,
  ScrollToBottom,
  ThreadEmpty,
  ToolCallRenderer,
} from "@assistant-ui/ux-primitives";
import { mockModelAdapter } from "../lib/mock-model-adapter";
import type { FC } from "react";

export const Assistant: FC = () => {
  const [isDark, setIsDark] = useState(true);
  const runtime = useLocalRuntime(mockModelAdapter, {
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
    <div className={isDark ? "dark" : ""}>
      <AssistantRuntimeProvider runtime={runtime}>
        <Thread isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      </AssistantRuntimeProvider>
    </div>
  );
};

const Thread: FC<{ isDark: boolean; onToggleTheme: () => void }> = ({
  isDark,
  onToggleTheme,
}) => {
  return (
    <ThreadPrimitive.Root className="flex h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* Theme toggle */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={onToggleTheme}
          className="rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:border-white/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
        >
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <ThreadPrimitive.Viewport className="flex h-full flex-col gap-6 overflow-y-auto px-4 pt-16 pb-4">
          <ThreadEmpty
            suggestions={[
              {
                prompt: "Write a poem about the ocean",
                label: "Write a poem",
                description: "about the ocean",
              },
              {
                prompt: "Explain quantum computing in simple terms",
                label: "Explain quantum computing",
                description: "in simple terms",
              },
              {
                prompt: "Help me plan a weekend trip",
                label: "Plan a trip",
                description: "for the weekend",
              },
              {
                prompt: "Write a JavaScript function to sort an array",
                label: "Write a function",
                description: "to sort an array",
              },
            ]}
          />

          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              UserEditComposer: EditComposer,
              AssistantMessage,
            }}
          />

          <div className="mx-auto w-full max-w-3xl">
            <FollowUpSuggestions />
          </div>
        </ThreadPrimitive.Viewport>

        <ScrollToBottom />
      </div>

      <Composer />

      <p className="pb-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
        Chords — toggle light/dark mode to test theme support
      </p>
    </ThreadPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
      <MessageAttachments />
      <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 py-2.5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
        <MessagePrimitive.Content />
      </div>
      <div className="opacity-0 transition-opacity group-hover/message:opacity-100">
        <MessageActionBar actions={["edit"]} />
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
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
              tools: { Fallback: ToolCallRenderer },
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

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col rounded-3xl bg-zinc-100 dark:bg-white/5 px-2">
      <ComposerAttachments />
      <div className="flex items-center justify-center">
        <ComposerAddAttachment />
        <ComposerPrimitive.Input
          placeholder="Type a message..."
          className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
          autoFocus
        />
        <ComposerActionStatus />
      </div>
    </ComposerPrimitive.Root>
  );
};
