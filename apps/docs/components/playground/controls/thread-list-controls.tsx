"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput, StyleBuilder } from "./shared";

export function ThreadListControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="newThreadLabel"
        value={(config.newThreadLabel as string) ?? "New Thread"}
        onChange={(v) =>
          onChange({ ...config, newThreadLabel: v || undefined })
        }
        placeholder="New Thread"
      />
      <TextInput
        label="titleFallback"
        value={(config.titleFallback as string) ?? "New Chat"}
        onChange={(v) =>
          onChange({ ...config, titleFallback: v || undefined })
        }
        placeholder="New Chat"
      />
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
      />
      <StyleBuilder
        label="newThreadClassName"
        value={(config.newThreadClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, newThreadClassName: v || undefined })
        }
        controls={["bg", "text", "rounded"]}
      />
    </div>
  );
}
