"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { CheckboxInput } from "./shared";

export function FollowUpSuggestionsControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  const autoSend = (config.autoSend as boolean) ?? true;

  return (
    <div className="flex flex-col gap-3">
      <CheckboxInput
        label="autoSend"
        description="Auto-send when suggestion is clicked"
        checked={autoSend}
        onChange={(v) => onChange({ ...config, autoSend: v })}
      />
    </div>
  );
}
