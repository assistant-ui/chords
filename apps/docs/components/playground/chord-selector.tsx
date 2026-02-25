"use client";

import type { ChordId } from "@/lib/playground/types";
import {
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
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-4">
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        Chord
      </label>
      <select
        value={chordId}
        onChange={(e) => onChange(e.target.value as ChordId)}
        className="w-full rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground outline-none focus:ring-2 focus:ring-fd-primary/30"
      >
        <optgroup label="Major Chords">
          {majorChords.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Minor Chords">
          {minorChords.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </optgroup>
      </select>
      <p className="mt-2 text-xs text-fd-muted-foreground">
        {majorChords.find((c) => c.id === chordId)?.description ??
          minorChords.find((c) => c.id === chordId)?.description}
      </p>
    </div>
  );
}
