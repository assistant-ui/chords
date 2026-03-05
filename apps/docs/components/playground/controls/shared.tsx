"use client";

import { useState, useRef, useEffect } from "react";

// --- Row-based layout primitives ---

export function Row({
  label,
  control,
}: {
  label: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex h-8 items-center justify-between">
      <span className="text-sm text-fd-foreground">{label}</span>
      {control}
    </div>
  );
}

// --- Reusable custom dropdown ---

function Dropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-7 items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2 text-sm text-fd-foreground outline-none transition-colors hover:bg-fd-accent/50 focus:ring-2 focus:ring-fd-primary/30"
      >
        <span>{selected?.label ?? value ?? "—"}</span>
        <svg
          className={`size-3 text-fd-muted-foreground transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[var(--trigger-width)] rounded-lg border border-fd-border bg-fd-popover py-1 shadow-lg"
          style={{ "--trigger-width": `${ref.current?.offsetWidth ?? 80}px` } as React.CSSProperties}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`flex w-full items-center px-2.5 py-1 text-sm transition-colors ${
                o.value === value
                  ? "bg-fd-accent text-fd-accent-foreground font-medium"
                  : "text-fd-foreground hover:bg-fd-accent/50"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Basic inputs ---

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
    <Row
      label={label}
      control={
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-7 w-28 rounded-md border border-fd-border bg-fd-background px-2 text-right text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground/50 focus:ring-2 focus:ring-fd-primary/30"
        />
      }
    />
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
    <Row
      label={label}
      control={<Dropdown value={value} onChange={onChange} options={options} />}
    />
  );
}

export function CheckboxInput({
  label,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Row
      label={label}
      control={
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative h-5 w-9 rounded-full transition-colors ${
            checked ? "bg-fd-primary" : "bg-fd-border"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform shadow-sm ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      }
    />
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
      <div className="mb-1.5 text-sm text-fd-foreground">{label}</div>
      <div className="flex flex-wrap gap-1.5">
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
        <span className="text-sm text-fd-foreground">{label}</span>
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

// --- Visual Style Controls ---

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

// --- Compact Color Picker (popover-based) ---

function getSwatchColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const name = value.replace(/^(bg|text)-/, "");
  if (name === "black") return "#000";
  if (name === "white") return "#fff";
  if (name === "transparent") return undefined;
  return COLOR_HEX[name];
}

function ColorPickerPopover({
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const swatchColor = getSwatchColor(value);
  const isTransparent = value === `${prefix}-transparent`;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <Row
      label={label}
      control={
        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`size-6 rounded-md border transition-all hover:scale-110 ${
              value
                ? "border-fd-border ring-1 ring-fd-primary/30"
                : "border-fd-border"
            }`}
            style={{
              backgroundColor: swatchColor,
              ...(isTransparent
                ? {
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)",
                    backgroundSize: "6px 6px",
                    backgroundPosition: "0 0, 3px 3px",
                  }
                : {}),
              ...(!value && !isTransparent
                ? {
                    backgroundImage:
                      "linear-gradient(135deg, #e5e7eb 50%, #d1d5db 50%)",
                  }
                : {}),
            }}
          />

          {open && (
            <div className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-fd-border bg-fd-popover p-3 shadow-lg">
              {/* Extra colors row */}
              <div className="mb-2 flex gap-1">
                {EXTRA_COLORS.filter(
                  (c) => !(prefix === "text" && c === "transparent"),
                ).map((color) => {
                  const cls = `${prefix}-${color}`;
                  const isSelected = value === cls;
                  const bg =
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
                      onClick={() => {
                        onChange(isSelected ? undefined : cls);
                        setOpen(false);
                      }}
                      className={`size-5 rounded border transition-all ${
                        isSelected
                          ? "ring-2 ring-fd-primary ring-offset-1 ring-offset-fd-background"
                          : "border-fd-border hover:scale-110"
                      }`}
                      style={{
                        backgroundColor: bg,
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
                {/* Clear button */}
                {value && (
                  <button
                    type="button"
                    title="Clear"
                    onClick={() => {
                      onChange(undefined);
                      setOpen(false);
                    }}
                    className="flex size-5 items-center justify-center rounded border border-fd-border text-[10px] text-fd-muted-foreground hover:bg-fd-accent"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Color grid */}
              <div className="grid grid-cols-5 gap-1">
                {Object.entries(COLOR_PALETTE).map(([, shades]) =>
                  shades.map((shade) => {
                    const cls = `${prefix}-${shade}`;
                    const isSelected = value === cls;
                    return (
                      <button
                        key={shade}
                        type="button"
                        title={shade}
                        onClick={() => {
                          onChange(isSelected ? undefined : cls);
                          setOpen(false);
                        }}
                        className={`size-5 rounded transition-all ${
                          isSelected
                            ? "ring-2 ring-fd-primary ring-offset-1 ring-offset-fd-background"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: COLOR_HEX[shade] }}
                      />
                    );
                  }),
                )}
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// --- Compact controls for StyleBuilder ---

function SizeSelect({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const current = value?.replace("size-", "") ?? "";

  return (
    <Row
      label="size"
      control={
        <Dropdown
          value={current}
          onChange={(v) => onChange(v ? `size-${v}` : undefined)}
          options={[
            { label: "—", value: "" },
            ...SIZE_OPTIONS.map((s) => ({ label: s, value: s })),
          ]}
        />
      }
    />
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
    <Row
      label="rounded"
      control={
        <Dropdown
          value={current}
          onChange={(v) => onChange(v || undefined)}
          options={[
            { label: "—", value: "" },
            ...ROUNDED_OPTIONS.map((opt) => ({
              label: opt.label,
              value: opt.value === "none" ? "rounded-none" : `rounded-${opt.value}`,
            })),
          ]}
        />
      }
    />
  );
}

function PaddingSelect({
  axis,
  value,
  onChange,
}: {
  axis: "p" | "px" | "py";
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const current = value?.replace(`${axis}-`, "") ?? "";

  return (
    <Row
      label={axis}
      control={
        <Dropdown
          value={current}
          onChange={(v) => onChange(v ? `${axis}-${v}` : undefined)}
          options={[
            { label: "—", value: "" },
            ...PADDING_OPTIONS.map((p) => ({ label: p, value: p })),
          ]}
        />
      }
    />
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
    const current = parseTokens(value || defaultValue);
    const next = { ...current.tokens, ...patch };
    const r = newRest !== undefined ? newRest : current.rest;
    onChange(buildClassName(next, r));
  };

  const isDefault = !value;

  return (
    <div className="space-y-1 border-t border-fd-border/50 pt-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-fd-muted-foreground">
          {label}
        </span>
        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-fd-muted-foreground hover:text-fd-foreground"
          >
            Reset
          </button>
        )}
      </div>

      {controls.includes("bg") && (
        <ColorPickerPopover
          label="Background"
          prefix="bg"
          value={tokens.bg}
          onChange={(v) => update({ bg: v })}
        />
      )}

      {controls.includes("text") && (
        <ColorPickerPopover
          label="Text color"
          prefix="text"
          value={tokens.text}
          onChange={(v) => update({ text: v })}
        />
      )}

      {controls.includes("size") && (
        <SizeSelect
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
          <PaddingSelect
            axis="px"
            value={tokens.px}
            onChange={(v) => update({ px: v })}
          />
          <PaddingSelect
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
  );
}
