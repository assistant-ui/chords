"use client";

import { ThreadPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { FollowUpSuggestions, MessageStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import {
  PlaygroundRuntime,
  PreviewThread,
  PreviewViewport,
  PreviewComposer,
  PreviewUserMessage,
} from "./preview-wrapper";

function AssistantWithSuggestions({ config }: { config: ChordConfig }) {
  const autoSend = (config.autoSend as boolean) ?? true;

  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
        A
      </div>
      <div className="flex-1 pt-1">
        <div className="text-zinc-900 dark:text-white/90">
          <MessagePrimitive.Content />
        </div>
        <MessageStatus />
        <div className="mt-2">
          <FollowUpSuggestions autoSend={autoSend} />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}

export function FollowUpSuggestionsPreview({
  config,
}: {
  config: ChordConfig;
}) {
  return (
    <PlaygroundRuntime>
      <PreviewThread>
        <PreviewViewport>
          <ThreadPrimitive.Messages
            components={{
              UserMessage: PreviewUserMessage,
              AssistantMessage: () => (
                <AssistantWithSuggestions config={config} />
              ),
            }}
          />
        </PreviewViewport>
        <PreviewComposer />
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
