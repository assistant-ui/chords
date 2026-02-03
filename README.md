# ux primitives

This repo is an experiment to make common Assistant UI interactions simpler by wrapping them into small, smart UI components.

Instead of manually wiring assistant state, send/cancel logic, and visuals in every app, these primitives handle it for you — with sensible defaults and optional customization.

---

## What this simplifies (before → after)

### Before

```tsx
<AuiIf
  condition={({ composer, thread }) => composer.isEditing && !composer.isEmpty}
>
  <AuiIf condition={({ thread }) => !thread.isRunning}>
    <ComposerPrimitive.Send
      className={cn(
        "m-2 flex size-8 items-center justify-center rounded-full bg-white text-black",
        composer.isEmpty && "opacity-30 pointer-events-none",
      )}
    >
      <ArrowUpIcon className="size-5" />
    </ComposerPrimitive.Send>
  </AuiIf>

  <AuiIf condition={({ thread }) => thread.isRunning}>
    <ComposerPrimitive.Cancel className="m-2 flex size-8 items-center justify-center rounded-full bg-white text-black">
      <StopIcon className="size-4" />
    </ComposerPrimitive.Cancel>
  </AuiIf>
</AuiIf>
```

### After (with UX primitives)

```tsx
<ComposerActionStatus />
```

Same behavior. One line.

The component automatically handles:

- idle / composing / running states
- send vs cancel behavior
- sensible default visuals
  (with full customization if needed)
