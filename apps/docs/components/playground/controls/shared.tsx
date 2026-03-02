"use client";

import { useState } from "react";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-fd-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground/50 focus:ring-2 focus:ring-fd-primary/30"
      />
    </div>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-fd-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none focus:ring-2 focus:ring-fd-primary/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxInput({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2 py-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 rounded border-fd-border"
      />
      <div>
        <div className="text-sm text-fd-foreground">{label}</div>
        {description && (
          <div className="text-xs text-fd-muted-foreground">{description}</div>
        )}
      </div>
    </label>
  );
}

export function ClassInput({
  label,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  value: string;
  defaultValue: string;
  onChange: (v: string) => void;
}) {
  const isCustom = value.length > 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium text-fd-muted-foreground">
          {label}
        </label>
        {isCustom ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-fd-muted-foreground hover:text-fd-foreground"
          >
            Reset
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onChange(defaultValue)}
            className="text-[10px] text-fd-muted-foreground hover:text-fd-foreground"
          >
            Edit default
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={defaultValue}
        rows={2}
        className="w-full rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none placeholder:text-fd-muted-foreground/40 focus:ring-2 focus:ring-fd-primary/30"
      />
      {!isCustom && (
        <p className="mt-0.5 text-[10px] text-fd-muted-foreground">
          Using default. Click &quot;Edit default&quot; to customize.
        </p>
      )}
    </div>
  );
}

export function MultiCheckbox({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() =>
                onChange(
                  isSelected
                    ? selected.filter((s) => s !== opt)
                    : [...selected, opt],
                )
              }
              className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                isSelected
                  ? "border-fd-primary bg-fd-primary/10 text-fd-primary"
                  : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Visual Style Controls ---

// Tailwind color name → hex for rendering swatches (avoids dynamic class purging)
const COLOR_HEX: Record<string, string> = {
  "zinc-100": "#f4f4f5", "zinc-300": "#d4d4d8", "zinc-500": "#71717a", "zinc-700": "#3f3f46", "zinc-900": "#18181b",
  "blue-100": "#dbeafe", "blue-300": "#93c5fd", "blue-500": "#3b82f6", "blue-700": "#1d4ed8", "blue-900": "#1e3a8a",
  "indigo-100": "#e0e7ff", "indigo-300": "#a5b4fc", "indigo-500": "#6366f1", "indigo-700": "#4338ca", "indigo-900": "#312e81",
  "violet-100": "#ede9fe", "violet-300": "#c4b5fd", "violet-500": "#8b5cf6", "violet-700": "#6d28d9", "violet-900": "#4c1d95",
  "rose-100": "#ffe4e6", "rose-300": "#fda4af", "rose-500": "#f43f5e", "rose-700": "#be123c", "rose-900": "#881337",
  "red-100": "#fee2e2", "red-300": "#fca5a5", "red-500": "#ef4444", "red-700": "#b91c1c", "red-900": "#7f1d1d",
  "green-100": "#dcfce7", "green-300": "#86efac", "green-500": "#22c55e", "green-700": "#15803d", "green-900": "#14532d",
  "amber-100": "#fef3c7", "amber-300": "#fcd34d", "amber-500": "#f59e0b", "amber-700": "#b45309", "amber-900": "#78350f",
};

const COLOR_PALETTE = {
  zinc: ["zinc-100", "zinc-300", "zinc-500", "zinc-700", "zinc-900"],
  blue: ["blue-100", "blue-300", "blue-500", "blue-700", "blue-900"],
  indigo: ["indigo-100", "indigo-300", "indigo-500", "indigo-700", "indigo-900"],
  violet: ["violet-100", "violet-300", "violet-500", "violet-700", "violet-900"],
  rose: ["rose-100", "rose-300", "rose-500", "rose-700", "rose-900"],
  red: ["red-100", "red-300", "red-500", "red-700", "red-900"],
  green: ["green-100", "green-300", "green-500", "green-700", "green-900"],
  amber: ["amber-100", "amber-300", "amber-500", "amber-700", "amber-900"],
} as const;

const EXTRA_COLORS = ["black", "white", "transparent"] as const;

const SIZE_OPTIONS = ["4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;

const ROUNDED_OPTIONS = [
  { label: "none", value: "none" },
  { label: "sm", value: "sm" },
  { label: "md", value: "md" },
  { label: "lg", value: "lg" },
  { label: "xl", value: "xl" },
  { label: "2xl", value: "2xl" },
  { label: "full", value: "full" },
] as const;

const PADDING_OPTIONS = ["0", "1", "2", "3", "4", "5", "6"] as const;

type StyleTokens = {
  bg?: string;
  text?: string;
  size?: string;
  rounded?: string;
  p?: string;
  px?: string;
  py?: string;
};

type ControlType = "bg" | "text" | "size" | "rounded" | "p";

function parseTokens(className: string): { tokens: StyleTokens; rest: string } {
  const tokens: StyleTokens = {};
  const parts = className.split(/\s+/).filter(Boolean);
  const rest: string[] = [];

  for (const part of parts) {
    if (/^bg-(zinc|blue|indigo|violet|rose|red|green|amber)-\d+$/.test(part) || /^bg-(black|white|transparent)$/.test(part)) {
      tokens.bg = part;
    } else if (/^text-(zinc|blue|indigo|violet|rose|red|green|amber)-\d+$/.test(part) || /^text-(black|white)$/.test(part)) {
      tokens.text = part;
    } else if (/^size-\d+$/.test(part)) {
      tokens.size = part;
    } else if (/^rounded(-\w+)?$/.test(part)) {
      tokens.rounded = part;
    } else if (/^px-\d+$/.test(part)) {
      tokens.px = part;
    } else if (/^py-\d+$/.test(part)) {
      tokens.py = part;
    } else if (/^p-\d+$/.test(part)) {
      tokens.p = part;
    } else if (/^dark:(bg|text)-/.test(part)) {
      // Drop dark: variants for bg/text so user's color choice applies in both modes
    } else {
      rest.push(part);
    }
  }

  return { tokens, rest: rest.join(" ") };
}

function buildClassName(tokens: StyleTokens, rest: string): string {
  const parts = [
    tokens.bg,
    tokens.text,
    tokens.size,
    tokens.rounded,
    tokens.p,
    tokens.px,
    tokens.py,
  ].filter(Boolean);
  if (rest.trim()) parts.push(rest.trim());
  return parts.join(" ");
}

function ColorSwatchPicker({
  label,
  prefix,
  value,
  onChange,
}: {
  label: string;
  prefix: "bg" | "text";
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const selected = value?.replace(`${prefix}-`, "") ?? "";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
        {label}
      </label>
      <div className="flex flex-wrap gap-1">
        {/* Extra colors */}
        {EXTRA_COLORS.filter((c) => !(prefix === "text" && c === "transparent")).map((color) => {
          const cls = `${prefix}-${color}`;
          const isSelected = value === cls;
          const bgStyle =
            color === "black"
              ? "#000"
              : color === "white"
                ? "#fff"
                : undefined;
          return (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onChange(isSelected ? undefined : cls)}
              className={`size-5 rounded border transition-all ${
                isSelected
                  ? "ring-2 ring-fd-primary ring-offset-1 ring-offset-fd-background"
                  : "border-fd-border hover:scale-110"
              }`}
              style={{
                backgroundColor: bgStyle,
                ...(color === "transparent"
                  ? {
                      backgroundImage:
                        "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)",
                      backgroundSize: "6px 6px",
                      backgroundPosition: "0 0, 3px 3px",
                    }
                  : {}),
              }}
            />
          );
        })}

        <div className="w-px bg-fd-border mx-0.5" />

        {/* Color palette */}
        {Object.entries(COLOR_PALETTE).map(([, shades]) =>
          shades.map((shade) => {
            const cls = `${prefix}-${shade}`;
            const isSelected = value === cls;
            return (
              <button
                key={shade}
                type="button"
                title={shade}
                onClick={() => onChange(isSelected ? undefined : cls)}
                className={`size-5 rounded border transition-all ${
                  isSelected
                    ? "ring-2 ring-fd-primary ring-offset-1 ring-offset-fd-background"
                    : "border-transparent hover:scale-110"
                }`}
                style={{ backgroundColor: COLOR_HEX[shade] }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

function SizeSlider({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const current = value?.replace("size-", "") ?? "";
  const idx = SIZE_OPTIONS.indexOf(current as (typeof SIZE_OPTIONS)[number]);

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
        size
      </label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={SIZE_OPTIONS.length - 1}
          value={idx >= 0 ? idx : 4}
          onChange={(e) => {
            const i = parseInt(e.target.value, 10);
            onChange(`size-${SIZE_OPTIONS[i]}`);
          }}
          className="flex-1 accent-fd-primary"
        />
        <span className="w-10 text-center text-xs font-mono text-fd-muted-foreground">
          {current ? `size-${current}` : "—"}
        </span>
      </div>
    </div>
  );
}

function RoundedSelect({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const current = value ?? "";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
        rounded
      </label>
      <div className="flex flex-wrap gap-1">
        {ROUNDED_OPTIONS.map((opt) => {
          const cls = opt.value === "none" ? "rounded-none" : `rounded-${opt.value}`;
          const isSelected = current === cls;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(isSelected ? undefined : cls)}
              className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${
                isSelected
                  ? "border-fd-primary bg-fd-primary/10 text-fd-primary"
                  : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PaddingSlider({
  axis,
  value,
  onChange,
}: {
  axis: "p" | "px" | "py";
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const current = value?.replace(`${axis}-`, "") ?? "";
  const idx = PADDING_OPTIONS.indexOf(
    current as (typeof PADDING_OPTIONS)[number],
  );

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
        {axis}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={PADDING_OPTIONS.length - 1}
          value={idx >= 0 ? idx : 0}
          onChange={(e) => {
            const i = parseInt(e.target.value, 10);
            onChange(`${axis}-${PADDING_OPTIONS[i]}`);
          }}
          className="flex-1 accent-fd-primary"
        />
        <span className="w-8 text-center text-xs font-mono text-fd-muted-foreground">
          {current ? `${axis}-${current}` : "—"}
        </span>
      </div>
    </div>
  );
}

function RawClassInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-[10px] text-fd-muted-foreground hover:text-fd-foreground"
      >
        {open ? "▾ Custom classes" : "▸ Custom classes"}
      </button>
      {open && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Extra Tailwind classes..."
          rows={2}
          className="mt-1 w-full rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none placeholder:text-fd-muted-foreground/40 focus:ring-2 focus:ring-fd-primary/30"
        />
      )}
    </div>
  );
}

export function StyleBuilder({
  label,
  value,
  onChange,
  controls,
  defaultValue,
}: {
  label: string;
  value: string;
  onChange: (cls: string) => void;
  controls: ControlType[];
  defaultValue: string;
}) {
  const effectiveValue = value || defaultValue;
  const { tokens, rest } = parseTokens(effectiveValue);

  const update = (patch: Partial<StyleTokens>, newRest?: string) => {
    // Parse fresh from current value to avoid stale closures
    const current = parseTokens(value || defaultValue);
    const next = { ...current.tokens, ...patch };
    const r = newRest !== undefined ? newRest : current.rest;
    onChange(buildClassName(next, r));
  };

  const isDefault = !value;

  return (
    <div className="rounded-lg border border-fd-border p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <label className="text-xs font-semibold text-fd-foreground">
          {label}
        </label>
        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-fd-muted-foreground hover:text-fd-foreground"
          >
            Reset to default
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {controls.includes("bg") && (
          <ColorSwatchPicker
            label="Background"
            prefix="bg"
            value={tokens.bg}
            onChange={(v) => update({ bg: v })}
          />
        )}

        {controls.includes("text") && (
          <ColorSwatchPicker
            label="Text color"
            prefix="text"
            value={tokens.text}
            onChange={(v) => update({ text: v })}
          />
        )}

        {controls.includes("size") && (
          <SizeSlider
            value={tokens.size}
            onChange={(v) => update({ size: v })}
          />
        )}

        {controls.includes("rounded") && (
          <RoundedSelect
            value={tokens.rounded}
            onChange={(v) => update({ rounded: v })}
          />
        )}

        {controls.includes("p") && (
          <>
            <PaddingSlider
              axis="px"
              value={tokens.px}
              onChange={(v) => update({ px: v })}
            />
            <PaddingSlider
              axis="py"
              value={tokens.py}
              onChange={(v) => update({ py: v })}
            />
          </>
        )}

        <RawClassInput
          value={rest}
          onChange={(v) => update({}, v)}
        />
      </div>
    </div>
  );
}
