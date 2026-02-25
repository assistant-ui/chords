"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { MultiCheckbox, SelectInput, CheckboxInput } from "./shared";

export function MessageActionBarControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  const actions = (config.actions as string[]) ?? ["copy", "reload"];
  const autohide = (config.autohide as string) ?? "not-last";
  const hideWhenRunning = (config.hideWhenRunning as boolean) ?? true;

  return (
    <div className="flex flex-col gap-3">
      <MultiCheckbox
        label="actions"
        options={["copy", "reload", "edit", "speak"]}
        selected={actions}
        onChange={(v) => onChange({ ...config, actions: v })}
      />
      <SelectInput
        label="autohide"
        value={autohide}
        onChange={(v) => onChange({ ...config, autohide: v })}
        options={[
          { label: "always", value: "always" },
          { label: "not-last", value: "not-last" },
          { label: "never", value: "never" },
        ]}
      />
      <CheckboxInput
        label="hideWhenRunning"
        checked={hideWhenRunning}
        onChange={(v) => onChange({ ...config, hideWhenRunning: v })}
      />
    </div>
  );
}
