import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive playground to explore, configure, and preview all Chords components",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
