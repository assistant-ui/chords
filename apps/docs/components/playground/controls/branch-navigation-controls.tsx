"use client";

import type { ChordConfig } from "@/lib/playground/types";
import { CheckboxInput } from "./shared";

export function BranchNavigationControls({
  config,
  onChange,
}: {
  config: ChordConfig;
  onChange: (c: ChordConfig) => void;
}) {
  const hideWhenSingleBranch =
    (config.hideWhenSingleBranch as boolean) ?? true;

  return (
    <div className="flex flex-col gap-3">
      <CheckboxInput
        label="hideWhenSingleBranch"
        description="Hide when only one branch exists"
        checked={hideWhenSingleBranch}
        onChange={(v) => onChange({ ...config, hideWhenSingleBranch: v })}
      />
    </div>
  );
}
