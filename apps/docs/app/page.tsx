import Link from "next/link";

const majorChords = [
  {
    name: "ComposerActionStatus",
    description: "Send/cancel button that auto-switches based on thread state.",
    href: "/docs/major-chords/composer-action-status",
  },
  {
    name: "MessageActionBar",
    description:
      "Config-driven action bar for messages — copy, reload, edit, speak.",
    href: "/docs/major-chords/message-action-bar",
  },
  {
    name: "BranchNavigation",
    description: "Navigate between message branches with prev/next controls.",
    href: "/docs/major-chords/branch-navigation",
  },
  {
    name: "MessageStatus",
    description: "Loading spinner during streaming, error message on failure.",
    href: "/docs/major-chords/message-status",
  },
  {
    name: "EditComposer",
    description: "Inline message editor with cancel and save actions.",
    href: "/docs/major-chords/edit-composer",
  },
  {
    name: "FollowUpSuggestions",
    description: "Dynamic suggestion chips after assistant responses.",
    href: "/docs/major-chords/follow-up-suggestions",
  },
  {
    name: "ToolCallRenderer",
    description:
      "Display tool calls with automatic status-aware UI — spinner, result, and error handling.",
    href: "/docs/major-chords/tool-call-renderer",
  },
  {
    name: "Attachment",
    description: "File and image attachments for composer and messages.",
    href: "/docs/major-chords/attachment",
  },
];

const minorChords = [
  {
    name: "CopyButton",
    description: "One-click copy with animated icon toggle.",
    href: "/docs/minor-chords/copy-button",
  },
  {
    name: "SuggestionChips",
    description: "Grid of suggestion buttons for welcome screens.",
    href: "/docs/minor-chords/suggestion-chips",
  },
  {
    name: "ThreadEmpty",
    description: "Welcome state with icon, greeting, and optional suggestions.",
    href: "/docs/minor-chords/thread-empty",
  },
  {
    name: "ScrollToBottom",
    description:
      "Floating button that appears when scrolled away from latest messages.",
    href: "/docs/minor-chords/scroll-to-bottom",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 pt-8 pb-16 bg-fd-background">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Georgia', 'Times New Roman', cursive" }}
        >
          <span className="shimmer italic">Chords</span>
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
          You own the UI. We handle the wiring.
        </p>
        <p className="mt-2 text-sm text-fd-muted-foreground/80 leading-relaxed">
          State-aware, drop-in components for{" "}
          <a
            href="https://www.assistant-ui.com/"
            className="shimmer font-medium text-fd-foreground underline underline-offset-4"
          >
            assistant-ui
          </a>
          .<br />
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-6 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/assistant-ui/ux-primitives"
            className="rounded-lg border border-fd-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* What is a Chord? */}
      <div className="mx-auto mt-16 w-full max-w-3xl">
        <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          What is a Chord?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-fd-border p-4">
            <h3 className="text-sm font-medium">Reads runtime state</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Each chord hooks into thread, composer, or message state — you
              don't think about conditionals.
            </p>
          </div>
          <div className="rounded-lg border border-fd-border p-4">
            <h3 className="text-sm font-medium">Makes rendering decisions</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Running? Show cancel. Empty? Disable send. Error? Show retry. The
              chord handles the logic.
            </p>
          </div>
          <div className="rounded-lg border border-fd-border p-4">
            <h3 className="text-sm font-medium">You own the visuals</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Override any class, swap any icon, or provide a custom render
              function. Zero design lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* Before / After showcase */}
      <div className="mx-auto mt-16 w-full max-w-4xl">
        <h2 className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Before & After
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-fd-border bg-fd-card p-4">
            <p className="mb-3 text-xs font-medium text-fd-muted-foreground">
              Before — 40+ lines
            </p>
            <pre className="overflow-x-auto text-xs leading-relaxed text-fd-muted-foreground">
              {`<ActionBarPrimitive.Root
  hideWhenRunning
  autohide="not-last"
  autohideFloat="single-branch"
>
  <ActionBarPrimitive.Copy asChild>
    <button>
      <AuiIf condition={...}>
        <CheckIcon />
      </AuiIf>
        <AuiIf condition={...}>
        <CopyIcon />
      </AuiIf>
    </button>
  </ActionBarPrimitive.Copy>
  <ActionBarPrimitive.Reload asChild>
    <button><ReloadIcon /></button>
  </ActionBarPrimitive.Reload>
</ActionBarPrimitive.Root>`}
            </pre>
          </div>
          <div className="rounded-lg border border-fd-border bg-fd-card p-4">
            <p className="mb-3 text-xs font-medium text-fd-muted-foreground">
              After — 1 line
            </p>
            <pre className="overflow-x-auto text-xs leading-relaxed text-fd-foreground">
              {`<MessageActionBar
  actions={["copy", "reload"]}
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Major Chords */}
      <div className="mx-auto mt-16 w-full max-w-4xl">
        <h2 className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Major Chords
        </h2>
        <p className="mb-6 text-center text-sm text-fd-muted-foreground/80">
          Read runtime state, make multi-branch rendering decisions, compose
          multiple primitives with logic.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {majorChords.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group rounded-lg border border-fd-border p-4 transition-colors hover:bg-fd-accent"
            >
              <h3 className="font-mono text-sm font-medium">{c.name}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Minor Chords */}
      <div className="mx-auto mt-16 w-full max-w-4xl">
        <h2 className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Minor Chords
        </h2>
        <p className="mb-6 text-center text-sm text-fd-muted-foreground/80">
          Compose 2+ primitives into patterns every app rebuilds — simple state,
          real boilerplate savings.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {minorChords.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group rounded-lg border border-fd-border p-4 transition-colors hover:bg-fd-accent"
            >
              <h3 className="font-mono text-sm font-medium">{c.name}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Install */}
      <div className="mx-auto mt-16 w-full max-w-md text-center">
        <p className="mb-3 text-sm text-fd-muted-foreground">Install</p>
        <pre className="rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm">
          npm install @assistant-ui/chords
        </pre>
      </div>
    </main>
  );
}
