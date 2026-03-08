"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { StyleBuilder } from "./shared";

export function ActionBarMoreControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400">side</label>
        <select
          value={(config.side as string) ?? "bottom"}
          onChange={(e) => onChange({ ...config, side: e.target.value })}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white"
        >
          <option value="top">top</option>
          <option value="right">right</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400">align</label>
        <select
          value={(config.align as string) ?? "start"}
          onChange={(e) => onChange({ ...config, align: e.target.value })}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white"
        >
          <option value="start">start</option>
          <option value="center">center</option>
          <option value="end">end</option>
        </select>
      </div>
      <StyleBuilder
        label="className"
        value={(config.className as string) ?? ""}
        defaultValue=""
        onChange={(v) => onChange({ ...config, className: v || undefined })}
        controls={["bg", "rounded", "p"]}
      />
      <StyleBuilder
        label="menuClassName"
        value={(config.menuClassName as string) ?? ""}
        defaultValue=""
        onChange={(v) =>
          onChange({ ...config, menuClassName: v || undefined })
        }
        controls={["bg", "rounded", "p"]}
      />
    </div>
  );
}
