"use client";

import { ThreadPrimitive } from "@assistant-ui/react";
import { SuggestionChips } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";

export function SuggestionChipsDemo() {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-white">
        <div className="mx-auto max-w-md">
          <SuggestionChips
            suggestions={[
              {
                prompt: "Write a poem about the ocean",
                label: "Write a poem",
                description: "about the ocean",
              },
              {
                prompt: "Explain quantum computing",
                label: "Explain quantum",
                description: "in simple terms",
              },
              {
                prompt: "Help me plan a trip",
                label: "Plan a trip",
                description: "for the weekend",
              },
              {
                prompt: "Write a sorting function",
                label: "Write code",
                description: "sort an array",
              },
            ]}
          />
        </div>
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
}

export function SuggestionChipsSimpleDemo() {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-white">
        <div className="mx-auto max-w-md">
          <SuggestionChips
            suggestions={[
              "Tell me a joke",
              "What's the weather?",
              "Write an email",
              "Summarize this article",
            ]}
          />
        </div>
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
}
