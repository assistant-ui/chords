"use client";

import { Suspense, useState } from "react";
import { ChordSelector } from "@/components/playground/chord-selector";
import { ControlsPanel } from "@/components/playground/controls-panel";
import { PreviewPanel } from "@/components/playground/preview-panel";
import { ShareButton } from "@/components/playground/share-button";
import { usePlaygroundState } from "@/lib/playground/url-state";

function SidebarToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  );
}

function PlaygroundContent() {
  const state = usePlaygroundState();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <SidebarToggle
            open={sidebarOpen}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <div>
            <h1 className="text-lg font-bold text-fd-foreground">Playground</h1>
            <p className="text-xs text-fd-muted-foreground">
              Configure, preview, and copy code for any chord
            </p>
          </div>
        </div>
        <ShareButton />
      </div>

      {/* Main layout */}
      <div
        className={`grid min-h-0 flex-1 grid-rows-[auto_1fr] transition-[grid-template-columns,grid-template-rows] duration-300 ease-out ${
          sidebarOpen
            ? "lg:grid-cols-[340px_1fr] lg:grid-rows-none"
            : "lg:grid-cols-[0px_1fr] lg:grid-rows-none"
        }`}
      >
        {/* Left panel — controls (scrollable) */}
        <div
          className={`playground-scroll flex flex-col gap-4 overflow-hidden border-fd-border px-3 pb-4 transition-all duration-300 ease-out ${
            sidebarOpen
              ? "max-h-[40vh] border-b opacity-100 lg:max-h-none lg:border-b-0 lg:border-r lg:mb-4 lg:rounded-md"
              : "max-h-0 border-b-0 opacity-0 lg:max-h-none lg:border-r-0"
          }`}
        >
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
