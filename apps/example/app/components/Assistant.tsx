"use client";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import {
  BranchNavigation,
  ComposerActionStatus,
  MessageActionBar,
  ScrollToBottom,
  ThreadEmpty,
} from "@assistant-ui/ux-primitives";
import { mockModelAdapter } from "../lib/mock-model-adapter";
import type { FC } from "react";

export const Assistant: FC = () => {
  const runtime = useLocalRuntime(mockModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
};

const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root className="flex h-screen flex-col bg-zinc-950 text-white">
      <div className="relative min-h-0 flex-1">
        <ThreadPrimitive.Viewport className="flex h-full flex-col gap-6 overflow-y-auto px-4 pt-16 pb-4">
          {/*
            ThreadEmpty replaces ~30+ lines of:

              <ThreadPrimitive.Empty>
                <div className="...centered layout...">
                  <div className="...avatar...">U</div>
                  <p>How can I help you today?</p>
                  <SuggestionChips suggestions={[...]} />
                </div>
              </ThreadPrimitive.Empty>
          */}
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
              AssistantMessage,
            }}
          />
        </ThreadPrimitive.Viewport>

        {/*
          ScrollToBottom replaces ~10-15 lines of:

            <ThreadPrimitive.ScrollToBottom asChild>
              <button className="absolute bottom-4 ...">
                <ArrowDownIcon />
              </button>
            </ThreadPrimitive.ScrollToBottom>
        */}
        <ScrollToBottom />
      </div>

      <Composer />

      <p className="pb-2 text-center text-xs text-zinc-500">
        UX Primitives — testing ComposerActionStatus + MessageActionBar + ThreadEmpty + ScrollToBottom + BranchNavigation
      </p>
    </ThreadPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
      <div className="max-w-[80%] rounded-3xl bg-white/10 px-5 py-2.5 text-white/90">
        <MessagePrimitive.Content />
      </div>
      {/*
        MessageActionBar with actions={["edit"]} replaces:

          <ActionBarPrimitive.Root hideWhenRunning autohide="not-last">
            <ActionBarPrimitive.Edit asChild>
              <button><Pencil1Icon /></button>
            </ActionBarPrimitive.Edit>
          </ActionBarPrimitive.Root>
      */}
      <div className="opacity-0 transition-opacity group-hover/message:opacity-100">
        <MessageActionBar actions={["edit"]} />
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs shadow">
        A
      </div>
      <div className="flex-1 pt-1">
        <div className="text-white/90">
          <MessagePrimitive.Content />
        </div>
        {/*
          MessageActionBar replaces ~40-60 lines of:

            <ActionBarPrimitive.Root hideWhenRunning autohide="not-last" autohideFloat="single-branch">
              <ActionBarPrimitive.Copy asChild>
                <button>
                  <AuiIf condition={...}><CheckIcon /></AuiIf>
                  <AuiIf condition={...}><CopyIcon /></AuiIf>
                </button>
              </ActionBarPrimitive.Copy>
              <ActionBarPrimitive.Reload asChild>
                <button><ReloadIcon /></button>
              </ActionBarPrimitive.Reload>
            </ActionBarPrimitive.Root>
        */}
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
    <ComposerPrimitive.Root className="mx-auto flex w-full max-w-3xl items-center rounded-3xl bg-white/5 px-2 justify-center">
      <ComposerPrimitive.Input
        placeholder="Type a message..."
        className="h-12 max-h-40 flex-1 resize-none  p-3.5 text-sm text-white outline-none placeholder:text-white/50 "
        autoFocus
      />
      {/*
        This single component replaces the typical pattern of:

          <AuiIf condition={({ thread }) => !thread.isRunning}>
            <ComposerPrimitive.Send>
              <ArrowUpIcon />
            </ComposerPrimitive.Send>
          </AuiIf>
          <AuiIf condition={({ thread }) => thread.isRunning}>
            <ComposerPrimitive.Cancel>
              <StopIcon />
            </ComposerPrimitive.Cancel>
          </AuiIf>
      */}
      <ComposerActionStatus />
    </ComposerPrimitive.Root>
  );
};
