"use client";

import { useState, useEffect, useRef, useId } from "react";

interface ChordsLogoProps {
  size?: "sm" | "lg";
  variant?: "simple" | "styled";
  className?: string;
}

const sizes = {
  sm: { height: 24, fontSize: 20 },
  lg: { height: 56, fontSize: 48 },
} as const;

const variants = {
  simple: {
    fontFamily: "'Dancing Script', cursive",
    fontStyle: "normal" as const,
    fontWeight: 600,
    widthFactor: 0.52,
  },
  styled: {
    fontFamily: "'Dancing Script', cursive",
    fontStyle: "normal" as const,
    fontWeight: 700,
    widthFactor: 0.55,
  },
} as const;

export function ChordsLogo({
  size = "lg",
  variant = "simple",
  className,
}: ChordsLogoProps) {
  const { height, fontSize } = sizes[size];
  const v = variants[variant];
  const width = Math.round(fontSize * v.widthFactor * 6.5);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Chords"
    >
      <text
        x="0"
        y={fontSize * 0.82}
        fontFamily={v.fontFamily}
        fontStyle={v.fontStyle}
        fontWeight={v.fontWeight}
        fontSize={fontSize}
      >
        Chords
      </text>
    </svg>
  );
}

export function ChordsLogoAnimated({ className }: { className?: string }) {
  const [done, setDone] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGRadialGradientElement>(null);
  const id = useId();
  const gradientId = `chords-glow-${id}`;

  const { height, fontSize } = sizes.lg;
  const width = Math.round(fontSize * 0.55 * 6.5);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), 100);
    return () => clearTimeout(id);
  }, []);

  const glowRef = useRef<SVGStopElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      const gradient = gradientRef.current;
      const glow = glowRef.current;
      if (!svg || !gradient || !glow) return;

      // Theme-aware glow color
      const isDark = document.documentElement.classList.contains("dark");
      glow.setAttribute("stop-color", isDark ? "#f0c040" : "white");

      // Check if mouse is directly over the logo
      const rect = svg.getBoundingClientRect();
      const overLogo =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (overLogo) {
        // Tight spotlight tracking the cursor on the letters
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        gradient.setAttribute("cx", String(x));
        gradient.setAttribute("cy", String(y));
        gradient.setAttribute("r", "0.2");
      } else {
        // Map full page to logo area
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        gradient.setAttribute("cx", String(x));
        gradient.setAttribute("cy", String(y));
        gradient.setAttribute("r", "0.35");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Chords"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient
          ref={gradientRef}
          id={gradientId}
          cx="0.5"
          cy="0.5"
          r="0.35"
          gradientUnits="objectBoundingBox"
        >
          <stop ref={glowRef} offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </radialGradient>
      </defs>
      <text
        x={width / 2}
        y={fontSize * 0.82}
        textAnchor="middle"
        fontFamily="'Dancing Script', cursive"
        fontSize={fontSize}
        fill={`url(#${gradientId})`}
        style={{
          fontWeight: done ? 700 : 500,
          transform: done ? "skewX(-8deg) scaleX(1)" : "skewX(-3deg) scaleX(0.95)",
          transformOrigin: "center",
          transition:
            "font-weight 1.2s ease-in-out, transform 1.2s ease-in-out",
        }}
      >
        Chords
      </text>
    </svg>
  );
}
