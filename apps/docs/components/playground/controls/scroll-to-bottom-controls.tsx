"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder } from "./shared";

export function ScrollToBottomControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <StyleBuilder
        label="className (button)"
        value={(config.className as string) ?? ""}
        defaultValue="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-lg"
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
      />
      <StyleBuilder
        label="iconClassName"
        value={(config.iconClassName as string) ?? ""}
        defaultValue="size-4 text-zinc-500"
        onChange={(v) => onChange({ ...config, iconClassName: v || undefined })}
        controls={["text", "size"]}
      />
    </div>
  );
}
