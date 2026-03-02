export const CHORD_IDS = [
  "composer-action-status",
  "message-action-bar",
  "branch-navigation",
  "message-status",
  "edit-composer",
  "follow-up-suggestions",
  "tool-call-renderer",
  "attachment",
  "copy-button",
  "suggestion-chips",
  "thread-empty",
  "scroll-to-bottom",
] as const;

export type ChordId = (typeof CHORD_IDS)[number];

export type ChordCategory = "major" | "minor";

export type ChordConfig = Record<string, unknown>;

export type ChordMeta = {
  id: ChordId;
  name: string;
  category: ChordCategory;
  description: string;
  defaultConfig: ChordConfig;
};
