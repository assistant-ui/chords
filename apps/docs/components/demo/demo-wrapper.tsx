"use client";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  SimpleImageAttachmentAdapter,
} from "@assistant-ui/react";
import { mockModelAdapter } from "./mock-model-adapter";
import type { ReactNode } from "react";

/**
 * Wraps demo components with a runtime provider.
 * Provides the message/thread context needed by primitives.
 */
export function DemoWrapper({ children }: { children: ReactNode }) {
  const runtime = useLocalRuntime(mockModelAdapter, {
    adapters: {
      attachments: new SimpleImageAttachmentAdapter(),
      suggestion: {
        async generate() {
          return [
            { prompt: "Tell me more about this" },
            { prompt: "Can you give an example?" },
            { prompt: "What are the alternatives?" },
          ];
        },
      },
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
