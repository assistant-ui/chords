"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { CheckboxInput, StyleBuilder } from "./shared";

export function SuggestionChipsControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  const send = (config.send as boolean) ?? true;

  return (
    <div className="flex flex-col gap-3">
      <CheckboxInput
        label="send"
        description="Send message immediately on click"
        checked={send}
        onChange={(v) => onChange({ ...config, send: v })}
      />
      <StyleBuilder
        label="chipClassName"
        value={(config.chipClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, chipClassName: v || undefined })}
        controls={["bg", "text", "rounded", "p"]}
      />
    </div>
  );
}
