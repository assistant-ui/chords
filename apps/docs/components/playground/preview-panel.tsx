"use client";

import { useState, useMemo } from "react";
import { ShikiHighlighter } from "react-shiki";
import type { ChordId, ChordConfig } from "@/lib/playground/types";
import { generateCode } from "./code-generators/generate-code";
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
};

type Tab = "preview" | "code";

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
      {/* Tab bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-fd-border/50 bg-fd-card/30 px-4 mx-4 rounded-md">
        <div className="flex">
          <button
            onClick={() => setTab("preview")}
            className={`border-b-2 px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              tab === "preview"
                ? "border-fd-primary text-fd-foreground"
                : "border-transparent text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`border-b-2 px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              tab === "code"
                ? "border-fd-primary text-fd-foreground"
                : "border-transparent text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            Code
          </button>
        </div>

        {tab === "code" && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {tab === "preview" ? (
          <div className="h-full p-4">
            <Preview config={config} />
          </div>
        ) : (
          <ShikiHighlighter
            language="tsx"
            theme={{ light: "github-light", dark: "github-dark" }}
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
