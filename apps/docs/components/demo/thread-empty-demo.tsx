"use client";

import { ThreadPrimitive } from "@assistant-ui/react";
import { ThreadEmpty } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";

export function ThreadEmptyDemo() {
  return (
    <DemoWrapper>
      {/* <ThreadPrimitive.Root className="flex h-100 flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
       */}
      <ThreadPrimitive.Root className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-white">
        <ThreadPrimitive.Viewport className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
          <ThreadEmpty
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
        </ThreadPrimitive.Viewport>
      </ThreadPrimitive.Root>
    </DemoWrapper>
  );
}
