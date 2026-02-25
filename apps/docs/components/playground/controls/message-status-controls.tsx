"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder } from "./shared";

export function MessageStatusControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "text", "rounded", "p"]}
      />
      <StyleBuilder
        label="runningClassName"
        value={(config.runningClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, runningClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
      <StyleBuilder
        label="errorClassName"
        value={(config.errorClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, errorClassName: v || undefined })
        }
        controls={["bg", "text"]}
      />
    </div>
  );
}
