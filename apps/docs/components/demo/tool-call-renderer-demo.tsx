"use client";

import {
  AssistantRuntimeProvider,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import { ToolCallRenderer } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { FC } from "react";

let callCount = 0;

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    callCount++;
    const toolCallId = `call_${callCount}`;

    // Phase 1: tool call running
    yield {
      content: [
        {
          type: "tool-call" as const,
          toolCallId,
          toolName: "get_weather",
          args: { location: "Paris, France", units: "celsius" },
          argsText: JSON.stringify({
            location: "Paris, France",
            units: "celsius",
          }),
        },
      ],
    };

    await new Promise((r) => setTimeout(r, 1000));
    if (abortSignal.aborted) return;

    // Phase 2: tool call complete + text
    yield {
      content: [
        {
          type: "tool-call" as const,
          toolCallId,
          toolName: "get_weather",
          args: { location: "Paris, France", units: "celsius" },
          argsText: JSON.stringify({
            location: "Paris, France",
            units: "celsius",
          }),
          result: { temperature: 22, condition: "Sunny", humidity: "45%" },
        },
        {
          type: "text" as const,
          text: "The weather in Paris is 22°C and sunny.",
        },
      ],
    };
  },
};

export function ToolCallRendererDemo() {
  const runtime = useLocalRuntime(demoAdapter);

  return (
    <DemoWrapper>
      <AssistantRuntimeProvider runtime={runtime}>
        {/* <ThreadPrimitive.Root className="flex h-87.5 flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
         */}
        <ThreadPrimitive.Root className="flex h-87.5 flex-col rounded-xl border border-zinc-400 dark:border-zinc-800  bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white px-8">
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
                prompt="What's the weather in Paris?"
                send
                className="w-full rounded-lg dark:bg-white/5 bg-black/10 px-3 py-2 text-left text-sm dark:text-white/60 text-black dark:hover:bg-white/10 hover:bg-black/15 transition-colors"
              >
                Send a message to trigger the tool call demo
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </AssistantRuntimeProvider>
    </DemoWrapper>
  );
}

const DemoUserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl flex-col items-end gap-1">
      <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5  text-zinc-900 dark:bg-white/10 dark:text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
};

function DemoAssistantMessage() {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3 ">
      <div className="flex mt-2.5 size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
        A
      </div>
      <div className="flex-1 pt-0.5 pr-64">
        <MessagePrimitive.Parts
          components={{
            Text: ({ text }) => (
              <span className="text-sm dark:text-white/90 text-black">
                {text}
              </span>
            ),
            tools: { Fallback: ToolCallRenderer },
          }}
        />
      </div>
    </MessagePrimitive.Root>
  );
}
