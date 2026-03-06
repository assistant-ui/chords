"use client";

import {
  AssistantRuntimeProvider,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import { ReasoningAccordion } from "@assistant-ui/chords";
import { DemoWrapper } from "./demo-wrapper";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { FC } from "react";

const REASONING =
  "Let me think about this step by step. First, I need to consider the quantum mechanical principles involved. Entanglement occurs when particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others.";

const TEXT =
  "Quantum entanglement is a phenomenon where two particles become linked, so measuring one instantly affects the other — no matter the distance between them. Einstein famously called it 'spooky action at a distance.'";

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    for (let i = 0; i < REASONING.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 8));
      yield {
        content: [
          { type: "reasoning" as const, text: REASONING.slice(0, i + 1) },
        ],
      };
    }

    for (let i = 0; i < TEXT.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 12));
      yield {
        content: [
          { type: "reasoning" as const, text: REASONING },
          { type: "text" as const, text: TEXT.slice(0, i + 1) },
        ],
      };
    }
  },
};

export function ReasoningAccordionDemo() {
  const runtime = useLocalRuntime(demoAdapter);

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
                prompt="Explain quantum entanglement"
                send
                className="w-full rounded-lg dark:bg-white/5 bg-black/10 px-3 py-2 text-left text-sm dark:text-white/60 text-black dark:hover:bg-white/10 hover:bg-black/15 transition-colors"
              >
                Send a message to trigger the reasoning demo
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
            Reasoning: ({ text }) => <span>{text}</span>,
            ReasoningGroup: ReasoningAccordion,
          }}
        />
      </div>
    </MessagePrimitive.Root>
  );
}
