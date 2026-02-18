"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "" : "bg-fd-background"
      }`}
    >
      {scrolled && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-fd-background via-fd-background/70 to-transparent backdrop-blur-xl mask-[linear-gradient(to_bottom,black_50%,transparent)] dark:mask-[linear-gradient(to_bottom,black_40%,transparent)]" />
      )}

      {/* Nav content */}
      <div className="relative flex h-14 items-center justify-between mx-auto max-w-4xl sm:px-6">
        <Link
          href="/"
          className="text-base font-bold italic text-fd-foreground"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          <span className="shimmer">Chords</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/docs"
            className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            Docs
          </Link>
          <a
            href="https://github.com/assistant-ui/ux-primitives/tree/main/apps/example"
            className="hidden text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground sm:block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Examples
          </a>
          <a
            href="https://www.assistant-ui.com/"
            className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            assistant-ui
          </a>
          <a
            href="https://github.com/assistant-ui/ux-primitives"
            className="p-1 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </a>
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="p-1 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
