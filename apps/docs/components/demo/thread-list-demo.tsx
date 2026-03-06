"use client";

import {
  ThreadList,
  ThreadListItem,
  ComposerActionStatus,
  MessageActionBar,
} from "@assistant-ui/chords";
import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { FC } from "react";

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const text =
      "Hello! I'm a demo assistant. Try creating new threads, archiving, or deleting them from the sidebar.";
    for (let i = 0; i < text.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 12));
      yield {
        content: [{ type: "text" as const, text: text.slice(0, i + 1) }],
      };
    }
  },
};

export function ThreadListDemo() {
  const runtime = useLocalRuntime(demoAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-96 overflow-hidden rounded-xl border border-zinc-400 dark:border-zinc-800">
        {/* Sidebar */}
        <div className="w-52 shrink-0 border-r border-zinc-300 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <ThreadList
            ThreadListItem={() => (
              <ThreadListItem actions={["archive", "delete"]} />
            )}
          />
        </div>

        {/* Thread */}
        <div className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
          <ThreadPrimitive.Root className="flex flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-3 pt-3 pb-3">
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
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

const DemoUserMessage: FC = () => (
  <MessagePrimitive.Root className="mx-auto flex w-full flex-col items-end gap-1">
    <div className="max-w-[80%] rounded-2xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

const DemoAssistantMessage: FC = () => (
  <MessagePrimitive.Root className="group/message mx-auto flex w-full gap-2">
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[10px] shadow dark:border-white/15">
      A
    </div>
    <div className="flex-1 pt-0.5">
      <MessagePrimitive.Parts
        components={{
          Text: ({ text }) => (
            <span className="text-xs text-zinc-900 dark:text-white/90">
              {text}
            </span>
          ),
        }}
      />
      <div className="mt-1 opacity-0 transition-opacity group-hover/message:opacity-100">
        <MessageActionBar actions={["copy", "reload"]} />
      </div>
    </div>
  </MessagePrimitive.Root>
);

const DemoComposer: FC = () => (
  <div className="border-t border-zinc-200 dark:border-zinc-800">
    <ComposerPrimitive.Root className="flex items-center gap-1 px-2">
      <ComposerPrimitive.Input
        placeholder="Type a message..."
        className="h-9 flex-1 resize-none bg-transparent px-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
      />
      <ComposerActionStatus />
    </ComposerPrimitive.Root>
  </div>
);
