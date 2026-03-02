"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput, StyleBuilder } from "./shared";

export function CopyButtonControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="copiedDuration (ms)"
        value={String((config.copiedDuration as number) ?? 2000)}
        onChange={(v) => {
          const n = parseInt(v, 10);
          onChange({ ...config, copiedDuration: isNaN(n) ? undefined : n });
        }}
        placeholder="2000"
      />
      <StyleBuilder
        label="buttonClassName"
        value={(config.buttonClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, buttonClassName: v || undefined })}
        controls={["bg", "text", "size", "rounded", "p"]}
      />
    </div>
  );
}
