"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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

const tabs: { key: Tab; label: string }[] = [
  { key: "preview", label: "Preview" },
  { key: "code", label: "Code" },
];

export function PreviewPanel({ chordId, config }: PreviewPanelProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const Preview = previewMap[chordId];
  const code = useMemo(() => generateCode(chordId, config), [chordId, config]);
  const activeIndex = tabs.findIndex((t) => t.key === tab);

  const syncActiveIndicator = useCallback((index: number) => {
    const el = tabRefs.current[index];
    if (el) {
      setActiveStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
    }
  }, []);

  // Sync active indicator on tab change & initial mount
  useEffect(() => {
    requestAnimationFrame(() => syncActiveIndicator(activeIndex));
  }, [activeIndex, syncActiveIndicator]);

  // Sync hover indicator
  useEffect(() => {
    if (hoveredIndex !== null) {
      const el = tabRefs.current[hoveredIndex];
      if (el) {
        setHoverStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
      }
    }
  }, [hoveredIndex]);

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
        <div className="relative flex items-center">
          {/* Hover indicator */}
          {hoveredIndex !== null && (
            <div
              className="absolute h-[30px] rounded-md bg-fd-foreground/8 transition-all duration-300 ease-out"
              style={hoverStyle}
            />
          )}
          {/* Active underline indicator */}
          <div
            className="absolute bottom-0 h-[2px] bg-fd-primary transition-all duration-300 ease-out"
            style={{ left: `calc(${activeStyle.left} + ${activeStyle.width} * 0.2)`, width: `calc(${activeStyle.width} * 0.6)` }}
          />
          {tabs.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => setTab(t.key)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative z-10 px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
                tab === t.key
                  ? "text-fd-foreground"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
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
      <div key={tab} className="animate-fade-in flex-1 overflow-auto">
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
