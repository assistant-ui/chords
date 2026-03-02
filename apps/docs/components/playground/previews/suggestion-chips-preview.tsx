"use client";

import { ThreadPrimitive, ComposerPrimitive } from "@assistant-ui/react";
import { SuggestionChips, ComposerActionStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { PlaygroundRuntime, PreviewThread, PreviewViewport } from "./preview-wrapper";

const defaultSuggestions = [
  { prompt: "Tell me a joke", label: "Tell me a joke", description: "Something funny" },
  { prompt: "Write a poem", label: "Write a poem", description: "Be creative" },
  { prompt: "Explain quantum computing", label: "Explain quantum computing" },
  { prompt: "Help me debug", label: "Help me debug", description: "Fix my code" },
];

export function SuggestionChipsPreview({
  config,
}: {
  config: ChordConfig;
}) {
  const send = (config.send as boolean) ?? true;
  const chipClassName = (config.chipClassName as string) || undefined;

  return (
    <PlaygroundRuntime>
      <PreviewThread>
        <PreviewViewport>
          <ThreadPrimitive.Empty>
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <p className="mb-4 text-lg text-zinc-800 dark:text-white/80">
                Pick a suggestion
              </p>
              <div className="w-full max-w-md">
                <SuggestionChips
                  suggestions={defaultSuggestions}
                  send={send}
                  chipClassName={chipClassName}
                />
              </div>
            </div>
          </ThreadPrimitive.Empty>
          <ThreadPrimitive.Messages
            components={{
              UserMessage: () => null,
              AssistantMessage: () => null,
            }}
          />
        </PreviewViewport>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
            <ComposerPrimitive.Input
              placeholder="Type a message..."
              className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
            />
            <ComposerActionStatus />
          </ComposerPrimitive.Root>
        </div>
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
