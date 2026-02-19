# Chords

State-aware, drop-in components for [assistant-ui](https://github.com/assistant-ui/assistant-ui) that eliminate chat UI boilerplate.

A chord is a pre-composed component that **reads runtime state and makes rendering decisions for you**. You don't think about conditionals or status checks — the chord handles the wiring, you own the UI.

## Quick Example

```tsx
// Before — manual wiring
<ActionBarPrimitive.Root hideWhenRunning autohide="not-last" autohideFloat="single-branch">
  <ActionBarPrimitive.Copy asChild>
    <button>{/* conditional icon toggle logic */}<CopyIcon /></button>
  </ActionBarPrimitive.Copy>
  <ActionBarPrimitive.Reload asChild>
    <button><ReloadIcon /></button>
  </ActionBarPrimitive.Reload>
</ActionBarPrimitive.Root>

// After — one chord
<MessageActionBar actions={["copy", "reload"]} />
```

## Chords

### Major Chords

| Chord | What it wires |
|-------|--------------|
| **ComposerActionStatus** | `isRunning` → Cancel, `isEmpty` → disabled, else → Send |
| **MessageActionBar** | Config-driven actions, copy state feedback, visibility |
| **BranchNavigation** | `branchNumber`, `branchCount`, hideWhenSingleBranch |
| **MessageStatus** | Derives running/error/complete from `message.status` |
| **EditComposer** | `composer.canCancel`, `composer.isEmpty`, wires Cancel/Send |
| **FollowUpSuggestions** | Reads `thread.suggestions`, hides when `isRunning` |
| **ToolCallRenderer** | Derives running/complete/error/incomplete from `status` |
| **Attachment** | Reads type/source/file/content, image vs file, composer vs message |

### Minor Chords

| Chord | What it composes |
|-------|-----------------|
| **CopyButton** | ActionBarPrimitive.Copy + copied/not-copied icon toggle |
| **SuggestionChips** | Maps array → ThreadPrimitive.Suggestion buttons |
| **ThreadEmpty** | ThreadPrimitive.Empty + greeting + avatar + SuggestionChips |
| **ScrollToBottom** | ThreadPrimitive.ScrollToBottom + positioned icon button |

## Install

```bash
npm install @assistant-ui/chords
```

Requires `@assistant-ui/react` >= 0.12.3, React >= 18, and Tailwind CSS v4.

### Tailwind Setup

Add a `@source` directive so Tailwind detects the chord classes:

```css
@import "tailwindcss";
@source "../node_modules/@assistant-ui/chords/dist";
```

### Usage

```tsx
import { ComposerActionStatus, MessageActionBar, CopyButton } from "@assistant-ui/chords";

// Drop in with zero config
<ComposerActionStatus />
<MessageActionBar actions={["copy", "reload", "edit"]} />
<CopyButton />
```

## Styling

Every chord ships with sensible defaults for light and dark themes. Pass `className` to **replace** defaults — no specificity fights.

```tsx
<MessageActionBar
  className="flex gap-2 bg-gray-100"
  buttonClassName="rounded-full p-1"
  actions={["copy", "reload"]}
/>
```

## Design Principles

- **Zero config works** — drop in with no props, get a working component
- **Full override** — `className` replaces defaults, `renderVisual` swaps icons
- **No lock-in** — mix chords with raw primitives freely
- **Lightweight** — minimal dependencies, no design system opinions

## Documentation

[View the full docs →](https://chords.assistant-ui.com)

## License

MIT
