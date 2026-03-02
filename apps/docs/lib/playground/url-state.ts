"use client";

import { useState, useCallback } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { CHORD_IDS, type ChordId, type ChordConfig } from "./types";
import { chordRegistry } from "./chord-registry";

const defaultChord: ChordId = "composer-action-status";

export function usePlaygroundState() {
  const [chordId, setChordId] = useQueryState(
    "chord",
    parseAsString.withDefault(defaultChord),
  );

  const validChordId = CHORD_IDS.includes(chordId as ChordId)
    ? (chordId as ChordId)
    : defaultChord;

  const [config, setConfig] = useState<ChordConfig>(
    () => chordRegistry[validChordId].defaultConfig,
  );

  const handleChordChange = useCallback(
    (id: ChordId) => {
      setChordId(id);
      setConfig(chordRegistry[id].defaultConfig);
    },
    [setChordId],
  );

  return {
    chordId: validChordId,
    setChordId: handleChordChange,
    config,
    setConfig,
  };
}
