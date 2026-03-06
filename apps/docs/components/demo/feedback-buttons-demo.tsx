"use client";

import {
  AssistantRuntimeProvider,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import { FeedbackButtons } from "@assistant-ui/chords";
import { DemoWrapper } from "./demo-wrapper";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { FC } from "react";

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const text =
      "Here's a helpful response! Try clicking the thumbs up or thumbs down buttons below to submit feedback.";
    for (let i = 0; i < text.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 12));
      yield {
        content: [{ type: "text" as const, text: text.slice(0, i + 1) }],
      };
    }
  },
};

export function FeedbackButtonsDemo() {
  const runtime = useLocalRuntime(demoAdapter, {
    adapters: {
      feedback: {
        submit: async () => {},
      },
    },
  });

  return (
    <DemoWrapper>
      <AssistantRuntimeProvider runtime={runtime}>
        <ThreadPrimitive.Root className="flex h-87.5 flex-col rounded-xl border border-zinc-400 dark:border-zinc-800 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white px-8">
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
          <div className="border-t border-zinc-300 dark:border-zinc-800 px-4 py-2">
            <ThreadPrimitive.If running={false}>
              <ThreadPrimitive.Suggestion
                prompt="Give me a helpful tip"
                send
                className="w-full rounded-lg dark:bg-white/5 bg-black/10 px-3 py-2 text-left text-sm dark:text-white/60 text-black dark:hover:bg-white/10 hover:bg-black/15 transition-colors"
              >
                Send a message to see feedback buttons
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </AssistantRuntimeProvider>
    </DemoWrapper>
  );
}

const DemoUserMessage: FC = () => (
  <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
    <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

function DemoAssistantMessage() {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
      <div className="mt-2.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
        A
      </div>
      <div className="flex-1 pt-0.5">
        <MessagePrimitive.Parts
          components={{
            Text: ({ text }) => (
              <span className="text-sm dark:text-white/90 text-black">
                {text}
              </span>
            ),
          }}
        />
        <div className="mt-2">
          <FeedbackButtons />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}
