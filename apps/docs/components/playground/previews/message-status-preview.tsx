"use client";

import { ThreadPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { MessageStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import {
  PlaygroundRuntime,
  PreviewThread,
  PreviewViewport,
  PreviewComposer,
  PreviewUserMessage,
} from "./preview-wrapper";

function AssistantWithStatus({ config }: { config: ChordConfig }) {
  const props: Record<string, unknown> = {};
  if (config.className) props.className = config.className;
  if (config.runningClassName) props.runningClassName = config.runningClassName;
  if (config.errorClassName) props.errorClassName = config.errorClassName;

  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs shadow dark:border-white/15">
        A
      </div>
      <div className="flex-1 pt-1">
        <div className="text-zinc-900 dark:text-white/90">
          <MessagePrimitive.Content />
        </div>
        <MessageStatus {...props} />
      </div>
    </MessagePrimitive.Root>
  );
}

export function MessageStatusPreview({
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
              AssistantMessage: () => <AssistantWithStatus config={config} />,
            }}
          />
        </PreviewViewport>
        <PreviewComposer />
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
