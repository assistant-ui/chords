"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput, StyleBuilder } from "./shared";

const DEFAULT_BUTTON =
  "group inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 data-[submitted]:text-zinc-900 dark:data-[submitted]:text-zinc-100";

export function FeedbackButtonsControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="positiveLabel"
        value={(config.positiveLabel as string) ?? "Good response"}
        onChange={(v) => onChange({ ...config, positiveLabel: v || undefined })}
        placeholder="Good response"
      />
      <TextInput
        label="negativeLabel"
        value={(config.negativeLabel as string) ?? "Bad response"}
        onChange={(v) => onChange({ ...config, negativeLabel: v || undefined })}
        placeholder="Bad response"
      />
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
      />
      <StyleBuilder
        label="positiveClassName"
        value={(config.positiveClassName as string) ?? ""}
        defaultValue={DEFAULT_BUTTON}
        onChange={(v) =>
          onChange({ ...config, positiveClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
      <StyleBuilder
        label="negativeClassName"
        value={(config.negativeClassName as string) ?? ""}
        defaultValue={DEFAULT_BUTTON}
        onChange={(v) =>
          onChange({ ...config, negativeClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
    </div>
  );
}
