"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DeviceVisual } from "../components/DeviceVisual";
import {
  HorizontalDeviceMark,
  LOGO_VARIANTS,
  type LogoVariant,
} from "../components/HorizontalDeviceMark";
import {
  FaviconMark,
  FAVICON_VARIANTS,
  type FaviconVariant,
} from "../components/FaviconMark";

// Names — Direction C only (Scottish geographic / heritage). The original
// four PRD candidates plus six more appended at the user's request.
const C_NAMES = [
  "Tay", "Forth", "Cairn", "Glen",
  "Skye", "Iona", "Nevis", "Brae", "Strath", "Kelvin",
];

// Each typeface entry carries the className for the picker preview, plus
// the SVG-side font-family stack and font-weight so the lockup renders
// in exactly the same face the user sees in the picker row.
const TYPEFACES = [
  {
    id: "serif",
    label: "Editorial serif (Fraunces)",
    className: "font-serif",
    family: "var(--font-fraunces), Georgia, serif",
    weight: 500,
  },
  {
    id: "sans",
    label: "Modern sans (Inter)",
    className: "font-sans font-medium",
    family: "var(--font-inter), system-ui, sans-serif",
    weight: 600,
  },
  {
    id: "display",
    label: "Display sans (Space Grotesk)",
    className: "font-display font-medium",
    family: "var(--font-grotesk), Inter, sans-serif",
    weight: 600,
  },
  {
    id: "urbanist-thin",
    label: "Urbanist Thin",
    className: "font-urbanist font-thin",
    family: "var(--font-urbanist), Inter, sans-serif",
    weight: 100,
  },
  {
    id: "urbanist-regular",
    label: "Urbanist Regular",
    className: "font-urbanist",
    family: "var(--font-urbanist), Inter, sans-serif",
    weight: 400,
  },
  {
    id: "urbanist-medium",
    label: "Urbanist Medium",
    className: "font-urbanist font-medium",
    family: "var(--font-urbanist), Inter, sans-serif",
    weight: 500,
  },
] as const;

const PALETTES = [
  { id: "paper", label: "Paper", bg: "#F7F4EE", ink: "#0F1B2D", muted: "#0F1B2D80" },
  { id: "ink", label: "Near-black", bg: "#0A0B0D", ink: "#F5F2EC", muted: "#F5F2EC80" },
  { id: "sage", label: "Sage", bg: "#889E81", ink: "#0F1B2D", muted: "#0F1B2D90" },
  { id: "coral", label: "Coral", bg: "#E89B7C", ink: "#1A0F0A", muted: "#1A0F0AB0" },
  { id: "sun", label: "Sunbeam", bg: "#F4D35E", ink: "#1A2332", muted: "#1A233290" },
] as const;

type FontId = (typeof TYPEFACES)[number]["id"];
type PaletteId = (typeof PALETTES)[number]["id"];

const tfFor = (id: FontId) => TYPEFACES.find((t) => t.id === id) ?? TYPEFACES[0];

// ---- Page ----

export default function IdentityLab() {
  const [name, setName] = useState("Forth");
  const [logo, setLogo] = useState<LogoVariant>("blocky");
  const [favicon, setFavicon] = useState<FaviconVariant>("geodesic");
  const [font, setFont] = useState<FontId>("serif");
  const [paletteId, setPaletteId] = useState<PaletteId>("paper");
  const [customMode, setCustomMode] = useState(false);

  const palette = useMemo(
    () => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0],
    [paletteId],
  );

  // Body color of the deboss preview shifts with the palette so the wordmark
  // etched on the cylinder remains legible.
  const deviceColors = useMemo(() => {
    if (paletteId === "ink") return { body: "#13151A", dome: "#86A6BC", ink: "#0A0B0D", glow: "#E89B7C" };
    if (paletteId === "sage") return { body: "#1F2A28", dome: "#C5D4C0", ink: "#0F1B2D", glow: "#A6C7B6" };
    if (paletteId === "coral") return { body: "#3F2424", dome: "#FFD3C2", ink: "#1A0F0A", glow: "#E89B7C" };
    if (paletteId === "sun") return { body: "#1F2A36", dome: "#FFE6A1", ink: "#1A2332", glow: "#F4D35E" };
    return { body: "#1A2433", dome: "#C8D4DC", ink: "#0F1B2D", glow: "#7FB3FF" };
  }, [paletteId]);

  const renderLockup = (color: string, heightClass: string) => {
    const tf = tfFor(font);
    return (
      <HorizontalDeviceMark
        name={name || "—"}
        variant={logo}
        color={color}
        fontFamily={tf.family}
        fontWeight={tf.weight}
        className={heightClass}
      />
    );
  };

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
            <span className="font-medium text-neutral-900">{name || "—"}</span>
            <span className="text-neutral-300">·</span>
            <span className="capitalize">{logo}</span>
            <span className="text-neutral-300">·</span>
            <span className="capitalize">{favicon}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-6 px-6 py-8">
        {/* Controls */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-20 space-y-6">
            {/* Name — Direction C only */}
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
                <div className="mt-3">
                  <div className="text-[12px] font-medium">Scottish geographic / heritage</div>
                  <p className="mt-1 text-[11.5px] leading-snug text-neutral-500">
                    River, isle, valley, and place names. Forth is the leading candidate.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {C_NAMES.map((n) => {
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
              )}
            </section>

            {/* Logo variant — five variations of the locked horizontal device */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Logo variant
              </h2>
              <p className="mt-2 text-[11.5px] leading-snug text-neutral-500">
                All five share the locked horizontal-device structure. Only the dome surface differs.
              </p>
              <div className="mt-3 space-y-1.5">
                {LOGO_VARIANTS.map((v) => {
                  const active = logo === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setLogo(v.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${
                        active
                          ? "border-neutral-900 bg-neutral-50"
                          : "border-black/10 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <span className="grid h-10 w-[118px] shrink-0 place-items-center overflow-hidden rounded-md bg-white ring-1 ring-black/5">
                        <HorizontalDeviceMark
                          name={name || "—"}
                          variant={v.id}
                          color="#0F1B2D"
                          className="h-7 w-auto"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-medium leading-tight">{v.label}</span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-neutral-500">
                          {v.sub}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Favicon — six dome / crystalline marks */}
            <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                Favicon mark
              </h2>
              <p className="mt-2 text-[11.5px] leading-snug text-neutral-500">
                The horizontal lockup crushes at 16 px. These are the small-format alternates — every
                one is a dome or crystalline form.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {FAVICON_VARIANTS.map((f) => {
                  const active = favicon === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFavicon(f.id)}
                      title={f.sub}
                      className={`group flex flex-col items-center gap-1.5 rounded-lg p-2 transition ${
                        active ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                      }`}
                    >
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-md ring-1 ${
                          active ? "bg-white ring-white/30" : "bg-white ring-black/5"
                        }`}
                      >
                        <FaviconMark
                          variant={f.id}
                          letter={name[0] ?? "F"}
                          color="#0F1B2D"
                          className="h-7 w-7"
                        />
                      </span>
                      <span className="text-[10.5px] tracking-tight">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Wordmark typeface */}
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

            {/* Background palette */}
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
              Per PRD §5.4 the logo must work at favicon, debossed-on-device, and large packaging
              sizes — and in single colour. Every context is previewed on the right.
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
              {renderLockup(palette.ink, "h-40 w-auto")}
            </div>
            <div
              className="flex items-center justify-between border-t px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
              style={{ borderColor: palette.muted, color: palette.muted }}
            >
              <span>Primary lockup · {palette.label}</span>
              <span>{logo} / {font}</span>
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
                {renderLockup(palette.ink, "h-7 w-auto")}
                <div className="flex items-center gap-5 text-[11.5px]" style={{ color: palette.ink, opacity: 0.7 }}>
                  <span className="hidden sm:inline">Shop</span>
                  <span className="hidden md:inline">How It Works</span>
                  <span className="hidden sm:inline">About</span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px]"
                    style={{ backgroundColor: palette.ink, color: palette.bg }}
                  >
                    Buy
                  </span>
                </div>
              </div>
              <div className="border-t border-black/5 p-3 text-[12px] text-neutral-500">
                Reads at 28 px tall in the nav.
              </div>
            </div>

            {/* Favicon / app icon — uses the selected favicon variant */}
            <div className="rounded-3xl bg-white ring-1 ring-black/5">
              <div className="flex items-center justify-between border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
                <span>App icon · 64 / 32 / 16 px</span>
                <span className="text-neutral-700">{favicon}</span>
              </div>
              <div className="flex items-end gap-6 p-8">
                {[64, 32, 16].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div
                      className="grid place-items-center rounded-[18%] ring-1 ring-black/10"
                      style={{ backgroundColor: palette.bg, width: s * 1.6, height: s * 1.6 }}
                    >
                      <FaviconMark
                        variant={favicon}
                        letter={name[0] ?? "F"}
                        color={palette.ink}
                        className="h-[60%] w-[60%]"
                      />
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
                  <HorizontalDeviceMark
                    name={name || "—"}
                    variant={logo}
                    color="#0A0B0D"
                    fontFamily={tfFor(font).family}
                    fontWeight={tfFor(font).weight}
                    className="h-12 w-auto"
                  />
                </div>
                <div className="flex items-center justify-center bg-neutral-900 p-10">
                  <HorizontalDeviceMark
                    name={name || "—"}
                    variant={logo}
                    color="#F5F2EC"
                    fontFamily={tfFor(font).family}
                    fontWeight={tfFor(font).weight}
                    className="h-12 w-auto"
                  />
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

          {/* Stationery card */}
          <section className="rounded-3xl bg-white ring-1 ring-black/5">
            <div className="border-b border-black/5 p-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
              Stationery · 85 × 55 mm
            </div>
            <div className="flex items-center justify-center p-10">
              <div
                className="grid h-[280px] w-[420px] grid-rows-[auto_1fr_auto] gap-4 rounded-md p-6 shadow-xl ring-1 ring-black/10"
                style={{ backgroundColor: palette.bg, color: palette.ink }}
              >
                <div className="flex items-start justify-between">
                  {renderLockup(palette.ink, "h-9 w-auto")}
                  <FaviconMark
                    variant={favicon}
                    letter={name[0] ?? "F"}
                    color={palette.ink}
                    className="h-7 w-7 opacity-80"
                  />
                </div>
                <div />
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
              Working notes
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Heritage commitment:</strong> picking from Direction C means the brand story has
                to lean into Scottish heritage credibly — origin in Edinburgh, founder bio, materials
                story, packaging copy. Otherwise the name reads as decorative.
              </li>
              <li>
                <strong>Logo variants are a single family.</strong> The capsule + body + name structure
                is locked. Pick the variant that survives best at small sizes and prints cleanest.
              </li>
              <li>
                <strong>Favicon set is independent</strong> from the logo because the horizontal
                lockup is illegible at 16 px. The favicon should still feel like the same brand —
                every option here is a dome or crystalline form.
              </li>
              <li>
                <strong>Sweep before commit:</strong> domain &amp; USPTO/UKIPO check on the shortlisted
                names; trademark availability is the single biggest constraint.
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
