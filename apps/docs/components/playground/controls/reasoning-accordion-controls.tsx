"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput, StyleBuilder } from "./shared";

export function ReasoningAccordionControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="label"
        value={(config.label as string) ?? "Reasoning"}
        onChange={(v) => onChange({ ...config, label: v || undefined })}
        placeholder="Reasoning"
      />
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "text", "rounded", "p"]}
      />
      <StyleBuilder
        label="triggerClassName"
        value={(config.triggerClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, triggerClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
      <StyleBuilder
        label="contentClassName"
        value={(config.contentClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, contentClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
    </div>
  );
}
