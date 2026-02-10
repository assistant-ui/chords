import Link from "next/link";

const primitives = [
  {
    name: "ComposerActionStatus",
    description: "Send/cancel button that auto-switches based on thread state.",
    href: "/docs/primitives/composer-action-status",
  },
  {
    name: "CopyButton",
    description: "One-click copy with animated icon toggle.",
    href: "/docs/primitives/copy-button",
  },
  {
    name: "MessageActionBar",
    description:
      "Config-driven action bar for messages — copy, reload, edit, speak.",
    href: "/docs/primitives/message-action-bar",
  },
  {
    name: "SuggestionChips",
    description: "Grid of suggestion buttons for welcome screens.",
    href: "/docs/primitives/suggestion-chips",
  },
  {
    name: "ThreadEmpty",
    description: "Welcome state with icon, greeting, and optional suggestions.",
    href: "/docs/primitives/thread-empty",
  },
  {
    name: "ScrollToBottom",
    description:
      "Floating button that appears when scrolled away from latest messages.",
    href: "/docs/primitives/scroll-to-bottom",
  },
  {
    name: "BranchNavigation",
    description: "Navigate between message branches with prev/next controls.",
    href: "/docs/primitives/branch-navigation",
  },
  {
    name: "MessageStatus",
    description: "Loading spinner during streaming, error message on failure.",
    href: "/docs/primitives/message-status",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Georgia', 'Times New Roman', cursive" }}
        >
          <span className="shimmer italic">UX Primitives</span>
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
          You own the UI. We handle the wiring.
        </p>
        <p className="mt-2 text-sm text-fd-muted-foreground/80 leading-relaxed">
          State-aware, drop-in components for{" "}
          <a
            href="https://github.com/assistant-ui/assistant-ui"
            className="shimmer font-medium text-fd-foreground underline underline-offset-4"
          >
            assistant-ui
          </a>
          .<br />
          Each primitive replaces 20-60 lines of boilerplate with a single
          component.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-6 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/assistant-ui/assistant-ui"
            className="rounded-lg border border-fd-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
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

      {/* Primitives grid */}
      <div className="mx-auto mt-16 w-full max-w-4xl">
        <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Primitives
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primitives.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group rounded-lg border border-fd-border p-4 transition-colors hover:bg-fd-accent"
            >
              <h3 className="font-mono text-sm font-medium">{p.name}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Install */}
      <div className="mx-auto mt-16 w-full max-w-md text-center">
        <p className="mb-3 text-sm text-fd-muted-foreground">Install</p>
        <pre className="rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm">
          npm install @assistant-ui/ux-primitives
        </pre>
      </div>
    </main>
  );
}
