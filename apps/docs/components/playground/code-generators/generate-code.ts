import type { ChordId, ChordConfig } from "@/lib/playground/types";
import { chordRegistry } from "@/lib/playground/chord-registry";

type CodeGenResult = {
  imports: string;
  jsx: string;
};

function serializeProp(key: string, value: unknown): string {
  if (typeof value === "string") return `${key}="${value}"`;
  if (typeof value === "boolean") return value ? key : `${key}={false}`;
  if (typeof value === "number") return `${key}={${value}}`;
  if (Array.isArray(value))
    return `${key}={${JSON.stringify(value)}}`;
  return `${key}={${JSON.stringify(value)}}`;
}

function buildPropsString(config: ChordConfig, defaults: ChordConfig): string {
  const props: string[] = [];
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value === null) continue;
    if (JSON.stringify(value) === JSON.stringify(defaults[key])) continue;
    props.push(serializeProp(key, value));
  }
  return props.length > 0 ? " " + props.join(" ") : "";
}

const generators: Record<ChordId, (config: ChordConfig) => CodeGenResult> = {
  "composer-action-status": (config) => {
    const defaults = chordRegistry["composer-action-status"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { ComposerActionStatus } from "@assistant-ui/chords";`,
      jsx: `<ComposerActionStatus${props} />`,
    };
  },
  "message-action-bar": (config) => {
    const defaults = chordRegistry["message-action-bar"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { MessageActionBar } from "@assistant-ui/chords";`,
      jsx: `<MessageActionBar${props} />`,
    };
  },
  "branch-navigation": (config) => {
    const defaults = chordRegistry["branch-navigation"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { BranchNavigation } from "@assistant-ui/chords";`,
      jsx: `<BranchNavigation${props} />`,
    };
  },
  "message-status": (config) => {
    const defaults = chordRegistry["message-status"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { MessageStatus } from "@assistant-ui/chords";`,
      jsx: `<MessageStatus${props} />`,
    };
  },
  "edit-composer": (config) => {
    const defaults = chordRegistry["edit-composer"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { EditComposer } from "@assistant-ui/chords";`,
      jsx: `<EditComposer${props} />`,
    };
  },
  "follow-up-suggestions": (config) => {
    const defaults = chordRegistry["follow-up-suggestions"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { FollowUpSuggestions } from "@assistant-ui/chords";`,
      jsx: `<FollowUpSuggestions${props} />`,
    };
  },
  "tool-call-renderer": () => ({
    imports: `import { ToolCallRenderer } from "@assistant-ui/chords";`,
    jsx: `<MessagePrimitive.Parts
  components={{
    Text: ({ text }) => <span>{text}</span>,
    tools: { Fallback: ToolCallRenderer },
  }}
/>`,
  }),
  attachment: (config) => {
    const defaults = chordRegistry["attachment"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import {
  Attachment,
  ComposerAddAttachment,
  ComposerAttachments,
  MessageAttachments,
} from "@assistant-ui/chords";`,
      jsx: `<Attachment${props} />

{/* In composer: */}
<ComposerAttachments />
<ComposerAddAttachment />

{/* In user message: */}
<MessageAttachments />`,
    };
  },
  "copy-button": (config) => {
    const defaults = chordRegistry["copy-button"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { CopyButton } from "@assistant-ui/chords";`,
      jsx: `<CopyButton${props} />`,
    };
  },
  "suggestion-chips": (config) => {
    const defaults = chordRegistry["suggestion-chips"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { SuggestionChips } from "@assistant-ui/chords";`,
      jsx: `<SuggestionChips
  suggestions={[
    { prompt: "Tell me a joke", label: "Tell me a joke" },
    { prompt: "Write a poem", label: "Write a poem" },
  ]}${props}
/>`,
    };
  },
  "thread-empty": (config) => {
    const defaults = chordRegistry["thread-empty"].defaultConfig;
    const filteredConfig = { ...config };
    delete filteredConfig.showSuggestions;
    const props = buildPropsString(filteredConfig, defaults);
    const hasSuggestions = (config.showSuggestions as boolean) ?? true;
    const suggestionsStr = hasSuggestions
      ? `\n  suggestions={[\n    { prompt: "Tell me more", label: "Tell me more" },\n    { prompt: "Give an example", label: "Give an example" },\n  ]}`
      : "";
    return {
      imports: `import { ThreadEmpty } from "@assistant-ui/chords";`,
      jsx: `<ThreadPrimitive.Empty>
  <ThreadEmpty${props}${suggestionsStr} />
</ThreadPrimitive.Empty>`,
    };
  },
  "scroll-to-bottom": (config) => {
    const defaults = chordRegistry["scroll-to-bottom"].defaultConfig;
    const props = buildPropsString(config, defaults);
    return {
      imports: `import { ScrollToBottom } from "@assistant-ui/chords";`,
      jsx: `{/* Inside a positioned container around ThreadPrimitive.Viewport */}
<ScrollToBottom${props} />`,
    };
  },
};

export function generateCode(chordId: ChordId, config: ChordConfig): string {
  const gen = generators[chordId];
  const result = gen(config);
  return `${result.imports}\n\n// Usage:\n${result.jsx}`;
}
