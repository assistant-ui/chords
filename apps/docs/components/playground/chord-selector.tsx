"use client";

import { useState, useRef, useEffect } from "react";
import type { ChordId } from "@/lib/playground/types";
import {
  chordRegistry,
  majorChords,
  minorChords,
} from "@/lib/playground/chord-registry";

export function ChordSelector({
  chordId,
  onChange,
}: {
  chordId: ChordId;
  onChange: (id: ChordId) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = chordRegistry[chordId];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-4">
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        Chord
      </label>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-left text-sm text-fd-foreground outline-none transition-colors hover:bg-fd-background/50 focus:ring-2 focus:ring-fd-primary/30"
        >
          <span>{selected.name}</span>
          <svg
            className={`size-4 text-fd-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-72 overflow-y-auto rounded-xl border border-fd-border bg-fd-popover shadow-lg"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(127,127,127,0.3) transparent",
            }}
          >
            <ChordGroup
              label="Major Chords"
              chords={majorChords}
              activeId={chordId}
              onSelect={(id) => {
                onChange(id);
                setOpen(false);
              }}
            />
            <div className="mx-3 border-t border-fd-border" />
            <ChordGroup
              label="Minor Chords"
              chords={minorChords}
              activeId={chordId}
              onSelect={(id) => {
                onChange(id);
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-fd-muted-foreground">
        {selected.description}
      </p>
    </div>
  );
}

function ChordGroup({
  label,
  chords,
  activeId,
  onSelect,
}: {
  label: string;
  chords: { id: ChordId; name: string }[];
  activeId: ChordId;
  onSelect: (id: ChordId) => void;
}) {
  return (
    <div className="p-1.5">
      <div className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-fd-muted-foreground">
        {label}
      </div>
      {chords.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onSelect(c.id)}
          className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
            c.id === activeId
              ? "bg-fd-accent text-fd-accent-foreground font-medium"
              : "text-fd-foreground hover:bg-fd-accent/50"
          }`}
        >
          {c.name}
          {c.id === activeId && (
            <svg
              className="ml-auto size-3.5 text-fd-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
