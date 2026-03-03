"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type Tab = "preview" | "code";

const tabs: { key: Tab; label: string }[] = [
  { key: "preview", label: "Preview" },
  { key: "code", label: "Code" },
];

type TabBarProps = {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  trailing?: React.ReactNode;
};

export function TabBar({ tab, onTabChange, trailing }: TabBarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((t) => t.key === tab);

  const syncActiveIndicator = useCallback((index: number) => {
    const el = tabRefs.current[index];
    if (el) {
      setActiveStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => syncActiveIndicator(activeIndex));
  }, [activeIndex, syncActiveIndicator]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const el = tabRefs.current[hoveredIndex];
      if (el) {
        setHoverStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
      }
    }
  }, [hoveredIndex]);

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-fd-border/50 bg-fd-card/30 px-4 mx-4 rounded-md">
      <div className="relative flex items-center">
        {hoveredIndex !== null && (
          <div
            className="absolute h-[30px] rounded-md bg-fd-foreground/8 transition-all duration-300 ease-out"
            style={hoverStyle}
          />
        )}
        <div
          className="absolute bottom-0 h-[2px] bg-fd-primary transition-all duration-300 ease-out"
          style={{ left: `calc(${activeStyle.left} + ${activeStyle.width} * 0.2)`, width: `calc(${activeStyle.width} * 0.6)` }}
        />
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => onTabChange(t.key)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative z-10 px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
              tab === t.key
                ? "text-fd-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {trailing}
    </div>
  );
}
