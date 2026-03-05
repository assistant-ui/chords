"use client";

import { useState, useMemo } from "react";
import { ShikiHighlighter } from "react-shiki";
import type { ChordId, ChordConfig } from "@/lib/playground/types";
import { generateCode } from "./code-generators/generate-code";
import { TabBar, type Tab } from "./tab-bar";
import { ComposerActionStatusPreview } from "./previews/composer-action-status-preview";
import { MessageActionBarPreview } from "./previews/message-action-bar-preview";
import { BranchNavigationPreview } from "./previews/branch-navigation-preview";
import { MessageStatusPreview } from "./previews/message-status-preview";
import { EditComposerPreview } from "./previews/edit-composer-preview";
import { FollowUpSuggestionsPreview } from "./previews/follow-up-suggestions-preview";
import { ToolCallRendererPreview } from "./previews/tool-call-renderer-preview";
import { AttachmentPreview } from "./previews/attachment-preview";
import { CopyButtonPreview } from "./previews/copy-button-preview";
import { SuggestionChipsPreview } from "./previews/suggestion-chips-preview";
import { ThreadEmptyPreview } from "./previews/thread-empty-preview";
import { ScrollToBottomPreview } from "./previews/scroll-to-bottom-preview";
import { ReasoningAccordionPreview } from "./previews/reasoning-accordion-preview";

type PreviewPanelProps = {
  chordId: ChordId;
  config: ChordConfig;
};

const previewMap: Record<ChordId, React.FC<{ config: ChordConfig }>> = {
  "composer-action-status": ComposerActionStatusPreview,
  "message-action-bar": MessageActionBarPreview,
  "branch-navigation": BranchNavigationPreview,
  "message-status": MessageStatusPreview,
  "edit-composer": EditComposerPreview,
  "follow-up-suggestions": FollowUpSuggestionsPreview,
  "tool-call-renderer": ToolCallRendererPreview,
  attachment: AttachmentPreview,
  "copy-button": CopyButtonPreview,
  "suggestion-chips": SuggestionChipsPreview,
  "thread-empty": ThreadEmptyPreview,
  "scroll-to-bottom": ScrollToBottomPreview,
  "reasoning-accordion": ReasoningAccordionPreview,
};

export function PreviewPanel({ chordId, config }: PreviewPanelProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const Preview = previewMap[chordId];
  const code = useMemo(() => generateCode(chordId, config), [chordId, config]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context)
    }
  };

  return (
    <div className="flex min-h-0 flex-col overflow-hidden">
      <TabBar
        tab={tab}
        onTabChange={setTab}
        trailing={
          tab === "code" ? (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          ) : undefined
        }
      />

      <div key={tab} className="animate-fade-in flex-1 overflow-auto">
        {tab === "preview" ? (
          <div className="h-full p-4">
            <Preview config={config} />
          </div>
        ) : (
          <ShikiHighlighter
            language="tsx"
            theme={{ light: "github-light", dark: "vitesse-dark" }}
            defaultColor="light-dark()"
            showLanguage={false}
            className="!bg-transparent !p-4 !text-sm [&_code]:whitespace-pre-wrap [&_code]:break-words"
          >
            {code}
          </ShikiHighlighter>
        )}
      </div>
    </div>
  );
}
