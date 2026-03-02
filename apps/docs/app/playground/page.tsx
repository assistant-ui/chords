"use client";

import { Suspense } from "react";
import { ChordSelector } from "@/components/playground/chord-selector";
import { ControlsPanel } from "@/components/playground/controls-panel";
import { PreviewPanel } from "@/components/playground/preview-panel";
import { ShareButton } from "@/components/playground/share-button";
import { usePlaygroundState } from "@/lib/playground/url-state";

function PlaygroundContent() {
  const state = usePlaygroundState();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between py-3">
        <div>
          <h1 className="text-lg font-bold text-fd-foreground">Playground</h1>
          <p className="text-xs text-fd-muted-foreground">
            Configure, preview, and copy code for any chord
          </p>
        </div>
        <ShareButton />
      </div>

      {/* Main layout */}
      <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] lg:grid-cols-[340px_1fr] lg:grid-rows-none">
        {/* Left panel — controls (scrollable) */}
        <div className="playground-scroll flex max-h-[40vh] flex-col gap-4 overflow-y-auto border-b border-fd-border px-3 pb-4 lg:max-h-none lg:border-b-0 lg:border-r lg:mb-4 lg:rounded-md">
          <ChordSelector chordId={state.chordId} onChange={state.setChordId} />
          <ControlsPanel
            chordId={state.chordId}
            config={state.config}
            onChange={state.setConfig}
          />
        </div>

        {/* Right panel — preview + code (tabbed) */}
        <PreviewPanel chordId={state.chordId} config={state.config} />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-fd-muted-foreground">
          Loading playground...
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
