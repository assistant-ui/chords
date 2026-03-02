"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder } from "./shared";

const DEFAULTS = {
  buttonClassName:
    "flex size-8 rounded-full items-center justify-center bg-zinc-900 text-white dark:bg-white dark:text-black",
  idleButtonClassName:
    "flex size-8 rounded-full items-center justify-center bg-zinc-200 text-zinc-400 dark:bg-white/20 dark:text-white/40",
};

export function ComposerActionStatusControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <StyleBuilder
        label="buttonClassName"
        value={(config.buttonClassName as string) ?? ""}
        defaultValue={DEFAULTS.buttonClassName}
        onChange={(v) => onChange({ ...config, buttonClassName: v || undefined })}
        controls={["bg", "text", "size", "rounded"]}
      />
      <StyleBuilder
        label="idleButtonClassName"
        value={(config.idleButtonClassName as string) ?? ""}
        defaultValue={DEFAULTS.idleButtonClassName}
        onChange={(v) =>
          onChange({ ...config, idleButtonClassName: v || undefined })
        }
        controls={["bg", "text", "size", "rounded"]}
      />
    </div>
  );
}
