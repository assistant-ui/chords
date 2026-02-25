import type { ChatModelAdapter } from "@assistant-ui/react";

const RESPONSES = [
  "Hello! I'm a demo assistant. This is a playground preview showing how this chord works in context.",
  "That's a great question! Here are some thoughts:\n\n1. **First** — Chords handle state logic for you\n2. **Second** — You keep full control over styling\n3. **Third** — Each component replaces 20-60 lines of boilerplate",
  "Try interacting with the chord in this preview. Send a few messages, hover over them, and explore the different states!",
];

let responseIndex = 0;

export function createPlaygroundAdapter(): ChatModelAdapter {
  return {
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
}

export function createToolCallAdapter(): ChatModelAdapter {
  let callCount = 0;
  return {
    async *run({ abortSignal }) {
      callCount++;
      const toolCallId = `call_${callCount}`;

      yield {
        content: [
          {
            type: "tool-call" as const,
            toolCallId,
            toolName: "get_weather",
            args: { location: "Paris, France", units: "celsius" },
            argsText: JSON.stringify({
              location: "Paris, France",
              units: "celsius",
            }),
          },
        ],
      };

      await new Promise((r) => setTimeout(r, 1500));
      if (abortSignal.aborted) return;

      yield {
        content: [
          {
            type: "tool-call" as const,
            toolCallId,
            toolName: "get_weather",
            args: { location: "Paris, France", units: "celsius" },
            argsText: JSON.stringify({
              location: "Paris, France",
              units: "celsius",
            }),
            result: { temperature: 22, condition: "Sunny", humidity: "45%" },
          },
          {
            type: "text" as const,
            text: "The weather in Paris is 22°C and sunny with 45% humidity.",
          },
        ],
      };
    },
  };
}
