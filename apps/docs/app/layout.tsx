import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Chords",
    default: "Chords — assistant-ui",
  },
  description:
    "State-aware, drop-in components for assistant-ui. Each chord reads runtime state and makes rendering decisions — you own the UI, we handle the wiring.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
