import type { ChordId, ChordMeta } from "./types";

export const chordRegistry: Record<ChordId, ChordMeta> = {
  "composer-action-status": {
    id: "composer-action-status",
    name: "ComposerActionStatus",
    category: "major",
    description: "Send/cancel button that reacts to composer and thread state",
    defaultConfig: {
      buttonClassName: "",
      idleButtonClassName: "",
    },
  },
  "message-action-bar": {
    id: "message-action-bar",
    name: "MessageActionBar",
    category: "major",
    description: "Config-driven action buttons for messages",
    defaultConfig: {
      actions: ["copy", "reload"],
      hideWhenRunning: true,
      autohide: "not-last",
    },
  },
  "branch-navigation": {
    id: "branch-navigation",
    name: "BranchNavigation",
    category: "major",
    description: "Navigate between message branches with prev/next buttons",
    defaultConfig: {
      hideWhenSingleBranch: true,
    },
  },
  "message-status": {
    id: "message-status",
    name: "MessageStatus",
    category: "major",
    description: "Shows running spinner, error state, or nothing when complete",
    defaultConfig: {},
  },
  "edit-composer": {
    id: "edit-composer",
    name: "EditComposer",
    category: "major",
    description: "Inline message editor with cancel/save actions",
    defaultConfig: {
      inputPlaceholder: "Edit your message...",
      cancelLabel: "Cancel",
      saveLabel: "Save",
    },
  },
  "follow-up-suggestions": {
    id: "follow-up-suggestions",
    name: "FollowUpSuggestions",
    category: "major",
    description: "Shows follow-up suggestion chips from the runtime",
    defaultConfig: {
      autoSend: true,
    },
  },
  "tool-call-renderer": {
    id: "tool-call-renderer",
    name: "ToolCallRenderer",
    category: "major",
    description: "Renders tool call with args, result, and status indicator",
    defaultConfig: {},
  },
  attachment: {
    id: "attachment",
    name: "Attachment",
    category: "major",
    description: "Renders image or file attachments in composer and messages",
    defaultConfig: {
      className: "",
      removeClassName: "",
    },
  },
  "copy-button": {
    id: "copy-button",
    name: "CopyButton",
    category: "minor",
    description: "Copy message content with copied/not-copied icon toggle",
    defaultConfig: {
      copiedDuration: 2000,
    },
  },
  "suggestion-chips": {
    id: "suggestion-chips",
    name: "SuggestionChips",
    category: "minor",
    description: "Grid of suggestion buttons that fill the composer or send",
    defaultConfig: {
      send: true,
    },
  },
  "thread-empty": {
    id: "thread-empty",
    name: "ThreadEmpty",
    category: "minor",
    description: "Empty thread greeting with avatar and optional suggestions",
    defaultConfig: {
      greeting: "How can I help you today?",
      icon: "U",
    },
  },
  "feedback-buttons": {
    id: "feedback-buttons",
    name: "FeedbackButtons",
    category: "major",
    description: "Thumbs up/down feedback buttons with automatic state management",
    defaultConfig: {
      positiveLabel: "Good response",
      negativeLabel: "Bad response",
    },
  },
  "reasoning-accordion": {
    id: "reasoning-accordion",
    name: "ReasoningAccordion",
    category: "major",
    description: "Collapsible accordion for AI reasoning/thinking with auto-expand during streaming",
    defaultConfig: {
      label: "Reasoning",
    },
  },
  "thread-list": {
    id: "thread-list",
    name: "ThreadList",
    category: "major",
    description: "Sidebar thread list with new thread button, loading skeletons, and context menus",
    defaultConfig: {
      newThreadLabel: "New Thread",
      titleFallback: "New Chat",
      actions: ["archive", "delete"],
    },
  },
  "tool-group": {
    id: "tool-group",
    name: "ToolGroup",
    category: "major",
    description: "Collapsible container grouping consecutive tool calls with count badge and spinner",
    defaultConfig: {
      defaultOpen: false,
    },
  },
  "action-bar-more": {
    id: "action-bar-more",
    name: "ActionBarMore",
    category: "major",
    description: "Overflow dropdown menu for action bars with export markdown and custom actions",
    defaultConfig: {
      side: "bottom",
      align: "start",
    },
  },
  "scroll-to-bottom": {
    id: "scroll-to-bottom",
    name: "ScrollToBottom",
    category: "minor",
    description: "Floating button to scroll back to the latest message",
    defaultConfig: {
      className: "",
      iconClassName: "",
    },
  },
};

export const majorChords = Object.values(chordRegistry).filter(
  (c) => c.category === "major",
);
export const minorChords = Object.values(chordRegistry).filter(
  (c) => c.category === "minor",
);
