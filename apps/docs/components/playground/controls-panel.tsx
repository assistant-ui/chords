"use client";

import type { ChordId, ChordConfig } from "@/lib/playground/types";
import { ComposerActionStatusControls } from "./controls/composer-action-status-controls";
import { MessageActionBarControls } from "./controls/message-action-bar-controls";
import { BranchNavigationControls } from "./controls/branch-navigation-controls";
import { MessageStatusControls } from "./controls/message-status-controls";
import { EditComposerControls } from "./controls/edit-composer-controls";
import { FollowUpSuggestionsControls } from "./controls/follow-up-suggestions-controls";
import { CopyButtonControls } from "./controls/copy-button-controls";
import { SuggestionChipsControls } from "./controls/suggestion-chips-controls";
import { ThreadEmptyControls } from "./controls/thread-empty-controls";
import { AttachmentControls } from "./controls/attachment-controls";
import { ScrollToBottomControls } from "./controls/scroll-to-bottom-controls";

type ControlsPanelProps = {
  chordId: ChordId;
  config: ChordConfig;
  onChange: (config: ChordConfig) => void;
};

const controlsMap: Partial<
  Record<ChordId, React.FC<{ config: ChordConfig; onChange: (c: ChordConfig) => void }>>
> = {
  "composer-action-status": ComposerActionStatusControls,
  "message-action-bar": MessageActionBarControls,
  "branch-navigation": BranchNavigationControls,
  "message-status": MessageStatusControls,
  "edit-composer": EditComposerControls,
  "follow-up-suggestions": FollowUpSuggestionsControls,
  "copy-button": CopyButtonControls,
  "suggestion-chips": SuggestionChipsControls,
  "thread-empty": ThreadEmptyControls,
  attachment: AttachmentControls,
  "scroll-to-bottom": ScrollToBottomControls,
};

export function ControlsPanel({ chordId, config, onChange }: ControlsPanelProps) {
  const Controls = controlsMap[chordId];

  if (!Controls) {
    return (
      <div className="rounded-xl border border-fd-border bg-fd-card p-4">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
          Props
        </h3>
        <p className="text-sm text-fd-muted-foreground">
          This chord has no configurable props in the playground.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-4">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        Props
      </h3>
      <Controls config={config} onChange={onChange} />
    </div>
  );
}
