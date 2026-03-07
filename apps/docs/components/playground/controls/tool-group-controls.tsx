"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder, CheckboxInput } from "./shared";

export function ToolGroupControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <CheckboxInput
        label="defaultOpen"
        checked={(config.defaultOpen as boolean) ?? false}
        onChange={(v) => onChange({ ...config, defaultOpen: v })}
      />
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
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
