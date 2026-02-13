import type { ChatModelAdapter } from "@assistant-ui/react";

const RESPONSES = [
  "Hello! I'm a demo assistant. This response shows how the message actions and copy button work.",
  "That's a great question! Here are some thoughts:\n\n1. **First** — aui Chords handle state logic for you\n2. **Second** — you keep full control over styling\n3. **Third** — each component replaces 20-60 lines of boilerplate",
  "Try scrolling up to see the ScrollToBottom button appear. Send a few more messages to fill the thread!",
];

let responseIndex = 0;

export const mockModelAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const text = RESPONSES[responseIndex % RESPONSES.length]!;
    responseIndex++;

    for (let i = 0; i < text.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 12));
      yield {
        content: [{ type: "text" as const, text: text.slice(0, i + 1) }],
      };
    }
  },
};
