"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput, CheckboxInput } from "./shared";

export function ThreadEmptyControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  const showSuggestions = (config.showSuggestions as boolean) ?? true;

  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="greeting"
        value={(config.greeting as string) ?? "How can I help you today?"}
        onChange={(v) => onChange({ ...config, greeting: v })}
        placeholder="How can I help you today?"
      />
      <TextInput
        label="icon"
        value={(config.icon as string) ?? "U"}
        onChange={(v) => onChange({ ...config, icon: v })}
        placeholder="U"
      />
      <TextInput
        label="subtitle"
        value={(config.subtitle as string) ?? ""}
        onChange={(v) => onChange({ ...config, subtitle: v || undefined })}
        placeholder="Optional subtitle"
      />
      <CheckboxInput
        label="Show suggestions"
        description="Display suggestion chips below greeting"
        checked={showSuggestions}
        onChange={(v) => onChange({ ...config, showSuggestions: v })}
      />
    </div>
  );
}
