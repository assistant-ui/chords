"use client";

import { ThreadPrimitive, ComposerPrimitive } from "@assistant-ui/react";
import { ThreadEmpty, ComposerActionStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import { PlaygroundRuntime, PreviewThread, PreviewViewport } from "./preview-wrapper";

const defaultSuggestions = [
  { prompt: "Tell me more about this", label: "Tell me more", description: "Get details" },
  { prompt: "Can you give an example?", label: "Give an example" },
  { prompt: "What are the alternatives?", label: "Alternatives", description: "Other options" },
  { prompt: "Summarize this for me", label: "Summarize" },
];

export function ThreadEmptyPreview({
  config,
}: {
  config: ChordConfig;
}) {
  const greeting = (config.greeting as string) ?? "How can I help you today?";
  const icon = (config.icon as string) ?? "U";
  const subtitle = (config.subtitle as string) || undefined;
  const showSuggestions = (config.showSuggestions as boolean) ?? true;

  return (
    <PlaygroundRuntime>
      <PreviewThread>
        <PreviewViewport>
          <ThreadPrimitive.Empty>
            <ThreadEmpty
              greeting={greeting}
              icon={icon}
              subtitle={subtitle}
              suggestions={showSuggestions ? defaultSuggestions : undefined}
            />
          </ThreadPrimitive.Empty>
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
