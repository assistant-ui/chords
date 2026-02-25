"use client";

import { ComposerPrimitive, ThreadPrimitive } from "@assistant-ui/react";
import { ComposerActionStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import {
  PlaygroundRuntime,
  PreviewThread,
  PreviewViewport,
  PreviewUserMessage,
  PreviewAssistantMessage,
} from "./preview-wrapper";

export function ComposerActionStatusPreview({
  config,
}: {
  config: ChordConfig;
}) {
  const props: Record<string, unknown> = {};
  if (config.buttonClassName) props.buttonClassName = config.buttonClassName;
  if (config.idleButtonClassName)
    props.idleButtonClassName = config.idleButtonClassName;

  return (
    <PlaygroundRuntime>
      <PreviewThread>
        <PreviewViewport>
          <ThreadPrimitive.Messages
            components={{
              UserMessage: PreviewUserMessage,
              AssistantMessage: PreviewAssistantMessage,
            }}
          />
        </PreviewViewport>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-2">
            <ComposerPrimitive.Input
              placeholder="Type to see the button change..."
              className="h-12 max-h-40 flex-1 resize-none p-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/50"
            />
            <ComposerActionStatus {...props} />
          </ComposerPrimitive.Root>
          <p className="mt-2 text-center text-xs text-zinc-500">
            Try typing, sending, and watch the button states change
          </p>
        </div>
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
