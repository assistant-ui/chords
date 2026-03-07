"use client";

import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import {
  ToolCallRenderer,
  ToolGroup,
  ComposerActionStatus,
} from "@assistant-ui/chords";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { FC } from "react";

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const toolCallId1 = `call_${Date.now()}_1`;
    const toolCallId2 = `call_${Date.now()}_2`;

    const toolCall1 = {
      type: "tool-call" as const,
      toolCallId: toolCallId1,
      toolName: "get_weather",
      args: { location: "Paris", units: "celsius" },
      argsText: JSON.stringify({ location: "Paris", units: "celsius" }),
    };
    const toolCall2 = {
      type: "tool-call" as const,
      toolCallId: toolCallId2,
      toolName: "get_time",
      args: { timezone: "CET", format: "24h" },
      argsText: JSON.stringify({ timezone: "CET", format: "24h" }),
    };

    // Yield two tool calls running
    yield { content: [toolCall1] };
    yield { content: [toolCall1, toolCall2] };

    await new Promise((r) => setTimeout(r, 1500));
    if (abortSignal.aborted) return;

    // Yield with results + text
    yield {
      content: [
        { ...toolCall1, result: { temperature: 22, condition: "Sunny" } },
        { ...toolCall2, result: { time: "14:30" } },
        {
          type: "text" as const,
          text: "It's 22°C and sunny in Paris. The local time is 14:30 CET.",
        },
      ],
    };
  },
};

export function ToolGroupDemo() {
  const runtime = useLocalRuntime(demoAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="overflow-hidden rounded-xl border border-zinc-400 dark:border-zinc-800">
        <ThreadPrimitive.Root className="flex h-80 flex-col bg-white dark:bg-zinc-950">
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
          <div className="border-t border-zinc-200 dark:border-zinc-800">
            <ComposerPrimitive.Root className="flex items-center gap-1 px-2">
              <ComposerPrimitive.Input
                placeholder="Type a message..."
                className="h-9 flex-1 resize-none bg-transparent px-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
              />
              <ComposerActionStatus />
            </ComposerPrimitive.Root>
          </div>
          <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <ThreadPrimitive.If running={false}>
              <ThreadPrimitive.Suggestion
                prompt="Check the weather and time in Paris"
                send
                className="w-full rounded-lg bg-zinc-100 px-3 py-2 text-left text-xs text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
              >
                Check weather & time in Paris
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}

const DemoUserMessage: FC = () => (
  <MessagePrimitive.Root className="flex w-full flex-col items-end">
    <div className="max-w-[80%] rounded-2xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900 dark:bg-white/10 dark:text-white/90">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

const DemoAssistantMessage: FC = () => (
  <MessagePrimitive.Root className="flex w-full gap-2">
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[10px] shadow dark:border-white/15">
      A
    </div>
    <div className="flex-1 pt-0.5 text-xs text-zinc-900 dark:text-white/90">
      <MessagePrimitive.Parts
        components={{
          Text: ({ text }) => <span>{text}</span>,
          tools: { Fallback: ToolCallRenderer },
          ToolGroup: ToolGroup,
        }}
      />
    </div>
  </MessagePrimitive.Root>
);
