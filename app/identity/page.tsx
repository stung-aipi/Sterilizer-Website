"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Logomark } from "../components/Logomark";
import { CylinderMono } from "../components/CylinderMono";
import { DeviceVisual } from "../components/DeviceVisual";
import { HorizontalDeviceMark } from "../components/HorizontalDeviceMark";

// Names are sourced directly from PRD §5.3.
// Direction A and B are recommended for shortlisting; C only if heritage
// becomes a core brand pillar.
const DIRECTIONS = [
  {
    id: "A",
    label: "Elemental / scientific",
    note: "Recommended. Credibility, ownability, trademark potential.",
    names: ["Lume", "Solen", "Aurex", "Nivar", "Quanta", "Ionis"],
  },
  {
    id: "B",
    label: "Action / experiential",
    note: "Recommended. Memorable, brandable; trademark difficulty for short common words.",
    names: ["Drop", "Shake", "Swirl", "Plunge", "Dip"],
  },
  {
    id: "C",
    label: "Geographic / heritage",
    note: "Avoid unless committing to heritage as a core pillar (PRD §5.3).",
    names: ["Tay", "Forth", "Cairn", "Glen"],
  },
] as const;

const TYPEFACES = [
  { id: "serif", label: "Editorial serif (Fraunces)", className: "font-serif" },
  { id: "sans", label: "Modern sans (Inter)", className: "font-sans font-medium" },
  { id: "display", label: "Display sans (Space Grotesk)", className: "font-display font-medium" },
] as const;

const CONCEPTS = [
  { id: "1", label: "Mark + wordmark", sub: "Geometric symbol referencing the geodesic dome." },
  { id: "2", label: "Wordmark only", sub: "Custom wordmark with a single distinctive letterform detail." },
  { id: "3", label: "Monogram + wordmark", sub: "Letter monogram in the device's cylindrical silhouette." },
  { id: "4", label: "Horizontal device", sub: "Flat side view of the device with the name set inside its body." },
] as const;

const PALETTES = [
  { id: "paper", label: "Paper", bg: "#F7F4EE", ink: "#0F1B2D", muted: "#0F1B2D80" },
  { id: "ink", label: "Near-black", bg: "#0A0B0D", ink: "#F5F2EC", muted: "#F5F2EC80" },
  { id: "sage", label: "Sage", bg: "#889E81", ink: "#0F1B2D", muted: "#0F1B2D90" },
  { id: "coral", label: "Coral", bg: "#E89B7C", ink: "#1A0F0A", muted: "#1A0F0AB0" },
  { id: "sun", label: "Sunbeam", bg: "#F4D35E", ink: "#1A2332", muted: "#1A233290" },
] as const;

type ConceptId = (typeof CONCEPTS)[number]["id"];
type FontId = (typeof TYPEFACES)[number]["id"];
type PaletteId = (typeof PALETTES)[number]["id"];

// ---- Lockup primitives ----

function Lockup({
  name,
  concept,
  font,
  color,
  size = "md",
}: {
  name: string;
  concept: ConceptId;
  font: FontId;
  color: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const fontClass = TYPEFACES.find((t) => t.id === font)?.className ?? "font-sans";

  // Per-size scale tokens
  const t = {
    xs: { text: "text-[15px]", mark: "h-3.5 w-3.5", mono: "h-4 w-[10px]", horiz: "h-5", gap: "gap-1.5", track: "tracking-tight" },
    sm: { text: "text-[20px]", mark: "h-5 w-5", mono: "h-6 w-4", horiz: "h-7", gap: "gap-2", track: "tracking-tight" },
    md: { text: "text-[34px]", mark: "h-7 w-7", mono: "h-9 w-6", horiz: "h-12", gap: "gap-3", track: "tracking-tight" },
    lg: { text: "text-[64px]", mark: "h-12 w-12", mono: "h-16 w-11", horiz: "h-20", gap: "gap-5", track: "tracking-tight" },
    xl: { text: "text-[120px]", mark: "h-24 w-24", mono: "h-32 w-[88px]", horiz: "h-40", gap: "gap-8", track: "tracking-tightx" },
  }[size];

  if (concept === "1") {
    return (
      <div className={`flex items-center ${t.gap}`} style={{ color }}>
        <Logomark className={t.mark} color={color} />
        <span className={`${fontClass} ${t.text} ${t.track}`}>{name}</span>
      </div>
    );
  }

  if (concept === "2") {
    // The "single distinctive letterform detail" per PRD §5.4 — last letter
    // rendered with a contrasting style (italic for serif/sans, low-case for display).
    const head = name.slice(0, -1);
    const tail = name.slice(-1);
    const detail = font === "display" ? "lowercase" : "italic";
    return (
      <span className={`${fontClass} ${t.text} ${t.track}`} style={{ color }}>
        {head}
        <span className={detail === "italic" ? "italic" : "lowercase"}>{tail}</span>
      </span>
    );
  }

  if (concept === "3") {
    return (
      <div className={`flex items-center ${t.gap}`} style={{ color }}>
        <CylinderMono letter={name[0] ?? ""} color={color} className={t.mono} />
        <span className={`${fontClass} ${t.text} ${t.track}`}>{name}</span>
      </div>
    );
  }

  // concept 4 — horizontal device silhouette with the name set inside the body
  // Pull the actual loaded font family off the CSS variable that next/font wired up
  // so the SVG <text> renders in the same face as the rest of the lockups.
  const fontVar =
    font === "serif" ? "var(--font-fraunces), Georgia, serif"
    : font === "display" ? "var(--font-grotesk), Inter, sans-serif"
    : "var(--font-inter), system-ui, sans-serif";
  return (
    <HorizontalDeviceMark
      name={name || "—"}
      color={color}
      fontFamily={fontVar}
      fontWeight={font === "serif" ? 500 : 600}
      className={t.horiz}
    />
  );
}

// ---- Page ----

export default function IdentityLab() {
  const [name, setName] = useState("Lumen");
  const [concept, setConcept] = useState<ConceptId>("1");
  const [font, setFont] = useState<FontId>("serif");
  const [paletteId, setPaletteId] = useState<PaletteId>("paper");
  const [customMode, setCustomMode] = useState(false);

  const palette = useMemo(
    () => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0],
    [paletteId],
  );

  // The device illustration body color shifts with palette so the deboss reads.
  const deviceColors = useMemo(() => {
    if (paletteId === "ink") return { body: "#13151A", dome: "#86A6BC", ink: "#0A0B0D", glow: "#E89B7C" };
    if (paletteId === "sage") return { body: "#1F2A28", dome: "#C5D4C0", ink: "#0F1B2D", glow: "#A6C7B6" };
    if (paletteId === "coral") return { body: "#3F2424", dome: "#FFD3C2", ink: "#1A0F0A", glow: "#E89B7C" };
    if (paletteId === "sun") return { body: "#1F2A36", dome: "#FFE6A1", ink: "#1A2332", glow: "#F4D35E" };
    return { body: "#1A2433", dome: "#C8D4DC", ink: "#0F1B2D", glow: "#7FB3FF" };
  }, [paletteId]);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[13px] text-neutral-500 hover:text-neutral-900">
              ← Back to homepage variants
            </Link>
            <span className="hidden text-neutral-300 md:inline">·</span>
            <div className="hidden items-center gap-2 md:flex">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Identity Lab
              </span>
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-white">
                Concept stage
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            <span>{name || "—"}</span>
            <span className="text-neutral-300">·</span>
            <span>Concept {concept}</span>
            <span className="text-neutral-300">·</span>
            <span className="capitalize">{font}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-6 px-6 py-8">
        {/* Controls */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-20 space-y-6">
            {/* Name */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                  Name
                </h2>
                <button
                  onClick={() => setCustomMode((v) => !v)}
                  className="text-[11.5px] text-neutral-500 hover:text-neutral-900"
                >
                  {customMode ? "← back to candidates" : "+ custom"}
                </button>
              </div>

              {customMode ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type a candidate"
                  className="mt-3 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-neutral-900"
                />
              ) : (
                <div className="mt-3 space-y-4">
                  {DIRECTIONS.map((d) => (
                    <div key={d.id}>
                      <div className="flex items-baseline justify-between">
                        <div className="text-[12px] font-medium">Dir. {d.id} — {d.label}</div>
                      </div>
                      <p className="mt-1 text-[11.5px] leading-snug text-neutral-500">{d.note}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {d.names.map((n) => {
                          const active = name === n;
                          return (
                            <button
                              key={n}
                              onClick={() => setName(n)}
                              className={`rounded-full px-2.5 py-1 text-[12.5px] tracking-tight transition ${
                                active
                                  ? "bg-neutral-900 text-white"
                                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Logo concept */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Logo concept
              </h2>
              <div className="mt-3 space-y-2">
                {CONCEPTS.map((c) => {
                  const active = concept === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setConcept(c.id as ConceptId)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-black/10 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium">Concept {c.id} — {c.label}</span>
                      </div>
                      <p className={`mt-1 text-[11.5px] leading-snug ${active ? "text-white/70" : "text-neutral-500"}`}>
                        {c.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Typeface */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Wordmark typeface
              </h2>
              <div className="mt-3 space-y-1.5">
                {TYPEFACES.map((tf) => {
                  const active = font === tf.id;
                  return (
                    <button
                      key={tf.id}
                      onClick={() => setFont(tf.id as FontId)}
                      className={`flex w-full items-baseline justify-between rounded-lg px-3 py-2 text-left ${
                        active ? "bg-neutral-100" : "hover:bg-neutral-50"
                      }`}
                    >
                      <span className="text-[12.5px]">{tf.label}</span>
                      <span className={`${tf.className} text-[18px] tracking-tight`}>{name || "Aa"}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Palette */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Background
              </h2>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {PALETTES.map((p) => {
                  const active = paletteId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPaletteId(p.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition ${
                        active ? "ring-2 ring-neutral-900" : "ring-1 ring-black/5 hover:ring-black/15"
                      }`}
                      title={p.label}
                    >
                      <span
                        className="h-8 w-full rounded-md ring-1 ring-black/10"
                        style={{ backgroundColor: p.bg }}
                      />
                      <span className="text-[10.5px]">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <p className="text-[11.5px] leading-snug text-neutral-500">
              Per PRD §5.4, the logo must work at favicon, debossed-on-device, and large packaging sizes
              — and in single colour. All four contexts are previewed on the right.
            </p>
          </div>
        </aside>

        {/* Previews */}
        <main className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
          {/* Hero — full-bleed in chosen palette */}
          <section
            className="rounded-3xl ring-1 ring-black/10 bg-grain"
            style={{ backgroundColor: palette.bg }}
          >
            <div className="flex min-h-[420px] items-center justify-center px-8 py-20">
              <Lockup name={name || "—"} concept={concept} font={font} color={palette.ink} size="xl" />
            </div>
            <div
              className="flex items-center justify-between border-t px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
              style={{ borderColor: palette.muted, color: palette.muted }}
            >
              <span>Primary lockup · {palette.label}</span>
              <span>Concept {concept} / {font}</span>
            </div>
          </section>

          {/* 4-up preview grid */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Header bar mockup */}
            <div className="rounded-3xl bg-white ring-1 ring-black/5">
              <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                In a header
              </div>
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: palette.bg }}
              >
                <Lockup name={name || "—"} concept={concept} font={font} color={palette.ink} size="sm" />
                <div className="flex items-center gap-5 text-[11.5px]" style={{ color: palette.ink, opacity: 0.7 }}>
                  <span>Shop</span>
                  <span>How It Works</span>
                  <span>About</span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px]"
                    style={{ backgroundColor: palette.ink, color: palette.bg }}
                  >
                    Buy
                  </span>
                </div>
              </div>
              <div className="border-t border-black/5 p-3 text-[12px] text-neutral-500">
                Reads at 20 px nav scale on desktop.
              </div>
            </div>

            {/* Favicon / app icon */}
            <div className="rounded-3xl bg-white ring-1 ring-black/5">
              <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                App icon · Favicon · 64 / 32 / 16 px
              </div>
              <div className="flex items-end gap-6 p-8">
                {[64, 32, 16].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div
                      className="grid place-items-center rounded-[18%] ring-1 ring-black/10"
                      style={{ backgroundColor: palette.bg, width: s * 1.6, height: s * 1.6 }}
                    >
                      {concept === "1" && <Logomark color={palette.ink} className="h-[55%] w-[55%]" />}
                      {concept === "2" && (
                        <span
                          className={`${TYPEFACES.find((t) => t.id === font)?.className ?? "font-sans"} font-semibold`}
                          style={{ color: palette.ink, fontSize: s * 0.7 }}
                        >
                          {(name || "—")[0]}
                        </span>
                      )}
                      {concept === "3" && <CylinderMono letter={name[0] ?? "—"} color={palette.ink} className="h-[70%] w-[44%]" />}
                      {concept === "4" && (
                        // The full horizontal mark crushes at favicon scale, so we
                        // show the horizontal capsule holding just the initial letter.
                        // Same family of forms, legible at 16 px.
                        <svg viewBox="0 0 36 20" className="h-[44%] w-[70%]" aria-hidden>
                          <rect x="1" y="1" width="34" height="18" rx="9" fill="none" stroke={palette.ink} strokeWidth="1.6" />
                          <text
                            x="18"
                            y="14.5"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                            fontSize="11"
                            fontWeight="600"
                            fill={palette.ink}
                          >
                            {(name[0] ?? "—").toUpperCase()}
                          </text>
                        </svg>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500">{s}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Single-colour treatments */}
            <div className="rounded-3xl bg-white ring-1 ring-black/5">
              <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Single colour · for print, packaging, deboss
              </div>
              <div className="grid grid-cols-2">
                <div className="flex items-center justify-center bg-white p-10">
                  <Lockup name={name || "—"} concept={concept} font={font} color="#0A0B0D" size="md" />
                </div>
                <div className="flex items-center justify-center bg-neutral-900 p-10">
                  <Lockup name={name || "—"} concept={concept} font={font} color="#F5F2EC" size="md" />
                </div>
              </div>
              <div className="border-t border-black/5 p-3 text-[12px] text-neutral-500">
                Both reversals must hold up. PRD §5.4.
              </div>
            </div>

            {/* On-device deboss */}
            <div className="rounded-3xl bg-white ring-1 ring-black/5">
              <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Embossed on the device body
              </div>
              <div
                className="flex items-center justify-center p-6"
                style={{ backgroundColor: palette.bg }}
              >
                <DeviceVisual
                  className="h-[300px] w-auto"
                  body={deviceColors.body}
                  dome={deviceColors.dome}
                  ink={deviceColors.ink}
                  glow={deviceColors.glow}
                  wordmark={(name || "—").toUpperCase()}
                />
              </div>
              <div className="border-t border-black/5 p-3 text-[12px] text-neutral-500">
                Wordmark scales to ~5 mm tall on the cylinder.
              </div>
            </div>
          </section>

          {/* Business-card / collateral hint */}
          <section className="rounded-3xl bg-white ring-1 ring-black/5">
            <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
              Stationery · 85 × 55 mm
            </div>
            <div className="flex items-center justify-center p-10">
              <div
                className="grid h-[280px] w-[420px] grid-rows-[1fr_auto] rounded-md p-6 shadow-xl ring-1 ring-black/10"
                style={{ backgroundColor: palette.bg, color: palette.ink }}
              >
                <Lockup name={name || "—"} concept={concept} font={font} color={palette.ink} size="md" />
                <div className="flex items-end justify-between text-[11.5px]" style={{ color: palette.muted }}>
                  <div>
                    <div className="font-medium" style={{ color: palette.ink }}>Nicolas Luvisutto</div>
                    <div>Founder</div>
                  </div>
                  <div className="text-right">
                    <div>hello@{(name || "brand").toLowerCase().replace(/[^a-z]/g, "")}.co</div>
                    <div>11 East Crosscauseway, Edinburgh</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-3xl bg-white p-6 ring-1 ring-black/5 text-[13.5px] leading-relaxed text-neutral-700">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
              Notes from the PRD
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li><strong>Concepts to develop in parallel:</strong> 1 (geometric mark) and 3 (monogram + wordmark) per PRD §5.4. Concept 2 (wordmark only) only if naming lands on a particularly distinctive word. Concept 4 (horizontal device) is product-specific — strong for packaging and the device itself, weaker as a standalone brand mark and less flexible at favicon sizes.</li>
              <li><strong>Type guidance:</strong> editorial serif (Tiempos/Fraunces) or confident geometric/contemporary serif. Avoid rounded friendly sans (Nunito, Quicksand) and Helvetica/Roboto defaults.</li>
              <li><strong>Direction C names</strong> are unlikely to travel to the US market — only proceed if heritage becomes a core brand pillar.</li>
              <li><strong>Sweep before commit:</strong> domain & USPTO/UKIPO check on shortlist before any logo finalization.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
