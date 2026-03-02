"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder } from "./shared";

export function AttachmentControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <StyleBuilder
        label="className (root)"
        value={(config.className as string) ?? ""}
        defaultValue="relative flex size-14 items-center justify-center overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100 dark:border-white/15 dark:bg-white/5"
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
      />
      <StyleBuilder
        label="removeClassName"
        value={(config.removeClassName as string) ?? ""}
        defaultValue="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-zinc-700 text-white"
        onChange={(v) => onChange({ ...config, removeClassName: v || undefined })}
        controls={["bg", "text", "size", "rounded"]}
      />
    </div>
  );
}
