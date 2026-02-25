"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { TextInput } from "./shared";

export function EditComposerControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        label="inputPlaceholder"
        value={(config.inputPlaceholder as string) ?? "Edit your message..."}
        onChange={(v) => onChange({ ...config, inputPlaceholder: v })}
        placeholder="Edit your message..."
      />
      <TextInput
        label="cancelLabel"
        value={(config.cancelLabel as string) ?? "Cancel"}
        onChange={(v) => onChange({ ...config, cancelLabel: v })}
        placeholder="Cancel"
      />
      <TextInput
        label="saveLabel"
        value={(config.saveLabel as string) ?? "Save"}
        onChange={(v) => onChange({ ...config, saveLabel: v })}
        placeholder="Save"
      />
    </div>
  );
}
