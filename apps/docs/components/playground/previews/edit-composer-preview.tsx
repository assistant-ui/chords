"use client";

import { ThreadPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { EditComposer, MessageActionBar, MessageStatus } from "@assistant-ui/chords";
import type { ChordConfig } from "@/lib/playground/types";
import {
  PlaygroundRuntime,
  PreviewThread,
  PreviewViewport,
  PreviewComposer,
} from "./preview-wrapper";

function UserMessage() {
  return (
    <MessagePrimitive.Root className="group/message mx-auto flex w-full max-w-3xl justify-end gap-1">
      <div className="flex items-end opacity-0 transition-opacity group-hover/message:opacity-100">
        <MessageActionBar actions={["edit"]} />
      </div>
      <div className="max-w-[80%] rounded-3xl bg-zinc-100 px-5 text-zinc-900 dark:bg-white/10 dark:text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function UserEditComposerWithConfig({ config }: { config: ChordConfig }) {
  const props: Record<string, unknown> = {};
  if (config.inputPlaceholder) props.inputPlaceholder = config.inputPlaceholder;
  if (config.cancelLabel) props.cancelLabel = config.cancelLabel;
  if (config.saveLabel) props.saveLabel = config.saveLabel;

  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="w-full max-w-[70%]">
        <EditComposer {...props} />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
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
        <div className="mt-1 flex items-center gap-2 opacity-0 transition-opacity group-hover/message:opacity-100">
          <MessageActionBar actions={["copy", "reload", "edit"]} />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}

export function EditComposerPreview({
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
              UserMessage,
              UserEditComposer: () => (
                <UserEditComposerWithConfig config={config} />
              ),
              AssistantMessage,
            }}
          />
        </PreviewViewport>
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <p className="text-center text-xs text-zinc-500">
            Send a message, then hover and click Edit
          </p>
        </div>
        <PreviewComposer />
      </PreviewThread>
    </PlaygroundRuntime>
  );
}
