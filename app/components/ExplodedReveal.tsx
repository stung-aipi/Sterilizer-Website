"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "light" | "dark";

interface Props {
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  description?: string;
}

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const sm = (a: number, b: number, t: number) => clamp((t - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Vec2 { x: number; y: number; }

interface Part {
  id: string;
  n: string;
  name: string;
  asm: Vec2;
  exp: Vec2;
  phase: [number, number];
  fadeIn?: [number, number];
  anchor: Vec2;          // local-coord anchor for the leader
  label: Vec2;           // absolute world coords for the label center
}

// Horizontal capsule. Main housing is ONE piece (matches reference schematic).
// Internal parts (Main PCB + Battery) slide out the LEFT end during the explode.
// UV Driver PCB discs live between dome and housing; tucked inside dome silhouette when assembled.

const PARTS: Part[] = [
  {
    id: "left-dome",
    n: "01",
    name: "UV LED cover",
    asm: { x: -160, y: 0 },
    exp: { x: -380, y: 0 },
    phase: [0, 0.55],
    anchor: { x: -28, y: -38 },
    label: { x: -380, y: -110 },
  },
  {
    id: "left-disc",
    n: "02",
    name: "UV driver PCB",
    asm: { x: -166, y: 0 },          // tucked inside left dome
    exp: { x: -300, y: 0 },
    phase: [0.05, 0.55],
    anchor: { x: 0, y: 42 },
    label: { x: -300, y: 110 },
  },
  {
    id: "main-pcb",
    n: "03",
    name: "Main PCB",
    asm: { x: 0, y: 0 },
    exp: { x: -180, y: -32 },
    phase: [0.32, 0.85],
    fadeIn: [0.28, 0.55],
    anchor: { x: 0, y: -14 },
    label: { x: -180, y: -120 },
  },
  {
    id: "battery",
    n: "04",
    name: "Lithium battery",
    asm: { x: 0, y: 0 },
    exp: { x: -180, y: 32 },
    phase: [0.36, 0.9],
    fadeIn: [0.32, 0.6],
    anchor: { x: 0, y: 14 },
    label: { x: -180, y: 130 },
  },
  {
    id: "housing",
    n: "05",
    name: "Main housing",
    asm: { x: 0, y: 0 },
    exp: { x: 80, y: 0 },
    phase: [0.1, 0.55],
    anchor: { x: 0, y: 52 },
    label: { x: 80, y: 115 },
  },
  {
    id: "right-disc",
    n: "06",
    name: "UV driver PCB",
    asm: { x: 166, y: 0 },
    exp: { x: 280, y: 0 },
    phase: [0.05, 0.55],
    anchor: { x: 0, y: -42 },
    label: { x: 280, y: -110 },
  },
  {
    id: "right-dome",
    n: "07",
    name: "UV LED cover",
    asm: { x: 160, y: 0 },
    exp: { x: 360, y: 0 },
    phase: [0, 0.55],
    anchor: { x: 28, y: 38 },
    label: { x: 360, y: 110 },
  },
  {
    id: "button",
    n: "08",
    name: "Charging port",
    asm: { x: 0, y: -51 },        // centered on housing, recessed slightly into hole
    exp: { x: 80, y: -175 },      // tracks housing's exploded x; lifts upward
    phase: [0.18, 0.65],
    anchor: { x: 12, y: 0 },
    label: { x: 175, y: -175 },
  },
];

// Render order: back-to-front. Internals first, housing covers them, caps then domes (which cover caps).
const RENDER_ORDER = [
  "main-pcb",
  "battery",
  "housing",
  "left-disc",
  "right-disc",
  "left-dome",
  "right-dome",
  "button",
];

// =================== SVG sub-shapes ===================

function GeodesicDome({ direction = "left" }: { direction?: "left" | "right" }) {
  // Local: faceted hemisphere with a flat base at x=0 that matches the cylinder's left edge.
  // Dome's right edge stroke and the housing rect's left edge stroke coincide at the joint,
  // so they read as a single vertical line — no curved bulge into the cylinder.
  const flip = direction === "right" ? -1 : 1;
  return (
    <g transform={`scale(${flip}, 1)`}>
      <path
        d="M 0 -52 L -22 -47 L -38 -32 L -46 -12 L -46 12 L -38 32 L -22 47 L 0 52 Z"
        fill="var(--part-fill)"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7">
        <line x1="0" y1="-52" x2="-15" y2="-28" />
        <line x1="0" y1="-52" x2="0" y2="-22" />
        <line x1="0" y1="52" x2="-15" y2="28" />
        <line x1="0" y1="52" x2="0" y2="22" />
        <line x1="-22" y1="-47" x2="-15" y2="-28" />
        <line x1="-38" y1="-32" x2="-15" y2="-28" />
        <line x1="-38" y1="-32" x2="-30" y2="-12" />
        <line x1="-46" y1="-12" x2="-30" y2="-12" />
        <line x1="-46" y1="12" x2="-30" y2="12" />
        <line x1="-38" y1="32" x2="-30" y2="12" />
        <line x1="-38" y1="32" x2="-15" y2="28" />
        <line x1="-22" y1="47" x2="-15" y2="28" />
        <line x1="-15" y1="-28" x2="0" y2="-22" />
        <line x1="-15" y1="-28" x2="-30" y2="-12" />
        <line x1="0" y1="-22" x2="-30" y2="-12" />
        <line x1="-30" y1="-12" x2="-30" y2="12" />
        <line x1="0" y1="-22" x2="0" y2="22" />
        <line x1="-30" y1="-12" x2="0" y2="22" />
        <line x1="-30" y1="12" x2="0" y2="22" />
        <line x1="-30" y1="12" x2="-15" y2="28" />
        <line x1="0" y1="22" x2="-15" y2="28" />
      </g>
    </g>
  );
}

function UVDriverDisc() {
  // Vertical thin ellipse — disc face viewed from cylinder side. ry < dome's silhouette so dome covers it.
  return (
    <g>
      <ellipse cx="0" cy="0" rx="5" ry="40" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="-1.5" cy="0" rx="5" ry="40" fill="none" stroke="currentColor" strokeWidth="1.3" />
      {/* Mounting holes near top/bottom */}
      <circle cx="-1" cy="-30" r="1.6" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      <circle cx="-1" cy="30" r="1.6" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
      {/* Surface-mount components shown as dots */}
      <circle cx="-1" cy="-15" r="1.3" fill="currentColor" opacity="0.5" />
      <circle cx="-1" cy="15" r="1.3" fill="currentColor" opacity="0.5" />
      {/* Center chip */}
      <rect x="-2" y="-5" width="3" height="10" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.65" />
    </g>
  );
}

function MainHousing({ endStrokeOpacity = 1 }: { endStrokeOpacity?: number }) {
  // Single-piece cylinder body, side view. ~3.6:1 aspect to match the reference schematic.
  // End-ellipse stroke fades in with the explode so it doesn't peek through behind the
  // dome's own curved base when the device is assembled.
  return (
    <g>
      <rect x="-160" y="-52" width="320" height="104" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="-160" cy="0" rx="6" ry="52" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.4" strokeOpacity={endStrokeOpacity} />
      <ellipse cx="160" cy="0" rx="6" ry="52" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.4" strokeOpacity={endStrokeOpacity} />
      {/* No flange line — the dome's own curved base reads as the joint */}
      {/* Cylinder curvature highlights — extend to the housing rect edge so the dome covers
          the overlap and the lines visually emerge from the dome's curved base */}
      <line x1="-160" y1="-44" x2="160" y2="-44" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <line x1="-160" y1="44" x2="160" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      {/* Charging-port hole — only the visible (lower) arc of the recess on the housing top */}
      <path
        d="M -13 -52 A 13 3.5 0 0 0 13 -52"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
      />
    </g>
  );
}

function MainPCB() {
  return (
    <g>
      <rect x="-78" y="-13" width="156" height="26" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.1" rx="1" />
      {/* USB / connector at left end */}
      <rect x="-78" y="-7" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <rect x="-76" y="-5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      {/* Surface-mount components */}
      <rect x="-58" y="-9" width="22" height="6" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <rect x="-30" y="-10" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <text x="-22" y="0" fontSize="7" textAnchor="middle" fill="currentColor" opacity="0.65" fontFamily="ui-monospace, monospace">U1</text>
      <circle cx="2" cy="-3" r="4.5" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="2" cy="-3" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="14" y="-7" width="32" height="11" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <line x1="18" y1="-3" x2="44" y2="-3" stroke="currentColor" strokeWidth="0.45" opacity="0.55" />
      {/* Right-side header pins */}
      <rect x="52" y="-5" width="18" height="10" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <line x1="54" y1="-3" x2="68" y2="-3" stroke="currentColor" strokeWidth="0.45" />
      <line x1="54" y1="0" x2="68" y2="0" stroke="currentColor" strokeWidth="0.45" />
      <line x1="54" y1="3" x2="68" y2="3" stroke="currentColor" strokeWidth="0.45" />
      {/* Mounting holes */}
      <circle cx="-72" cy="-10" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="-72" cy="10" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="72" cy="-10" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="72" cy="10" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.6" />
      {/* Solder pads */}
      <circle cx="-46" cy="6" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="-30" cy="6" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="-14" cy="6" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="2" cy="6" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="20" cy="6" r="0.9" fill="currentColor" opacity="0.55" />
    </g>
  );
}

function Battery() {
  // Rounded rectangular brick (matches reference schematic — power-bank cell).
  return (
    <g>
      <rect x="-72" y="-14" width="144" height="28" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.2" rx="3" />
      {/* Internal cell divisions */}
      <line x1="-50" y1="-14" x2="-50" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="-14" x2="50" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Top highlight (subtle) */}
      <line x1="-66" y1="-7" x2="66" y2="-7" stroke="currentColor" strokeWidth="0.4" opacity="0.22" />
      {/* Polarity */}
      <text x="-62" y="3" fontSize="8" textAnchor="middle" fill="currentColor" opacity="0.65" fontFamily="ui-monospace, monospace">−</text>
      <text x="62" y="3" fontSize="8" textAnchor="middle" fill="currentColor" opacity="0.65" fontFamily="ui-monospace, monospace">+</text>
      {/* Label */}
      <text x="0" y="2.5" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.5" fontFamily="ui-monospace, monospace" letterSpacing="1.5">Li-ion · 3.7V</text>
    </g>
  );
}

function ChargingPort() {
  // Slim recessed port — small rectangular plate with three contact dots.
  return (
    <g>
      <rect x="-12" y="-3" width="24" height="6" fill="var(--part-fill)" stroke="currentColor" strokeWidth="1.0" rx="1.2" />
      <circle cx="-6.5" cy="0" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="6.5" cy="0" r="1.4" fill="none" stroke="currentColor" strokeWidth="0.7" />
    </g>
  );
}

const VB = { x: -440, y: -240, w: 880, h: 480 };

export function ExplodedReveal({
  tone = "light",
  eyebrow = "Fig. 04 — Inside the cylinder",
  title = "Six parts. One sealed instrument.",
  description = "Scroll to disassemble. The cylinder resolves into its components — every part engineered to never need replacing.",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = clamp(scrolled / Math.max(total, 1));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const p = progress;

  const isDark = tone === "dark";
  const accentHex = isDark ? "#E89B7C" : "#5F7A57";
  const inkHex = isDark ? "#F5F2EC" : "#0F1B2D";
  const ruleHex = isDark ? "rgba(245,242,236,0.14)" : "rgba(15,27,45,0.14)";
  const gridColor = isDark ? "rgba(245,242,236,0.06)" : "rgba(15,27,45,0.05)";
  const dotColor = isDark ? "rgba(245,242,236,0.16)" : "rgba(15,27,45,0.11)";
  const partFill = isDark ? "#13151A" : "#FAF8F2";
  const surfaceClass = isDark ? "bg-b-surface" : "bg-white/65";
  const wrapClass = isDark ? "bg-b-bg text-b-ink" : "bg-a-bg text-a-ink";
  const muteClass = isDark ? "text-b-mute" : "text-a-ink/55";
  const captionFont = "font-mono";
  const titleFont = isDark ? "font-display" : "font-serif";

  const housingPart = PARTS.find((p) => p.id === "housing")!;
  const housingT = ease(sm(housingPart.phase[0], housingPart.phase[1], p));
  const housingX = lerp(housingPart.asm.x, housingPart.exp.x, housingT);

  const partState = PARTS.map((part) => {
    const t = ease(sm(part.phase[0], part.phase[1], p));
    let x = lerp(part.asm.x, part.exp.x, t);
    const y = lerp(part.asm.y, part.exp.y, t);
    // Button tracks the housing's horizontal motion so it stays directly above the hole.
    // Its own phase still controls the vertical lift.
    if (part.id === "button") {
      x = housingX;
    }
    const opacity = part.fadeIn ? ease(sm(part.fadeIn[0], part.fadeIn[1], p)) : 1;
    return { part, x, y, opacity, t };
  });
  const stateById = Object.fromEntries(partState.map((s) => [s.part.id, s]));
  const calloutOpacity = ease(sm(0.55, 0.95, p));

  const status =
    p < 0.25
      ? "ASSEMBLED"
      : p < 0.55
      ? "DISENGAGING"
      : p < 0.85
      ? "EXPLODING"
      : "COMPONENT VIEW";

  const scanX = ease(sm(0.05, 0.95, p));

  // End-ellipse stroke is hidden while the dome covers them, then fades in as the dome
  // moves away. Tied to the dome's phase window.
  const endStrokeOpacity = ease(sm(0.15, 0.45, p));

  const renderPart = (id: string) => {
    const s = stateById[id];
    if (!s) return null;
    let inner: JSX.Element;
    switch (id) {
      case "left-dome":  inner = <GeodesicDome direction="left" />; break;
      case "right-dome": inner = <GeodesicDome direction="right" />; break;
      case "left-disc":
      case "right-disc": inner = <UVDriverDisc />; break;
      case "housing":    inner = <MainHousing endStrokeOpacity={endStrokeOpacity} />; break;
      case "main-pcb":   inner = <MainPCB />; break;
      case "battery":    inner = <Battery />; break;
      case "button":     inner = <ChargingPort />; break;
      default: return null;
    }
    return (
      <g key={id} transform={`translate(${s.x} ${s.y})`} style={{ opacity: s.opacity }}>
        {inner}
      </g>
    );
  };

  return (
    <section
      ref={wrapRef}
      className={`relative ${wrapClass}`}
      style={{ height: "200vh" }}
      aria-label="Exploded device view"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px),
              radial-gradient(${dotColor} 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px, 80px 80px, 24px 24px",
            backgroundPosition: "center, center, center",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: `radial-gradient(55% 55% at 50% 55%, ${
              isDark ? "rgba(232,155,124,0.10)" : "rgba(136,158,129,0.16)"
            } 0%, transparent 70%)`,
          }}
        />

        {/* Header */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pt-6 md:px-10 md:pt-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className={`${captionFont} text-[11px] uppercase tracking-[0.22em] ${muteClass}`}>
                {eyebrow}
              </div>
              <h2 className={`mt-2 max-w-2xl ${titleFont} text-[26px] leading-[1.05] tracking-tightish md:text-[36px]`}>
                {title}
              </h2>
              <p className={`mt-2 max-w-md text-[13.5px] leading-[1.55] ${muteClass}`}>
                {description}
              </p>
            </div>
            <div className="hidden min-w-[200px] text-right md:block">
              <div className={`${captionFont} text-[10.5px] uppercase tracking-[0.24em] ${muteClass}`}>
                Disassembly
              </div>
              <div className={`mt-2 ${captionFont} text-[24px] leading-none tabular-nums`}>
                {String(Math.round(p * 100)).padStart(3, "0")}%
              </div>
              <div className="mt-2 h-px w-full" style={{ background: ruleHex }}>
                <div
                  className="h-full"
                  style={{ width: `${p * 100}%`, background: accentHex, transition: "width 80ms linear" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 md:px-10">
          <div
            className="relative h-full w-full"
            style={{ "--part-fill": partFill } as React.CSSProperties}
          >
            <svg
              viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              style={{ color: inkHex }}
              aria-hidden
            >
              <defs>
                <linearGradient id="er-axis" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={inkHex} stopOpacity="0" />
                  <stop offset="14%" stopColor={inkHex} stopOpacity="0.18" />
                  <stop offset="86%" stopColor={inkHex} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={inkHex} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="er-scan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentHex} stopOpacity="0" />
                  <stop offset="50%" stopColor={accentHex} stopOpacity="0.85" />
                  <stop offset="100%" stopColor={accentHex} stopOpacity="0" />
                </linearGradient>
              </defs>

              <line x1={VB.x + 30} y1="0" x2={VB.x + VB.w - 30} y2="0" stroke="url(#er-axis)" strokeWidth="0.8" strokeDasharray="2 6" />

              {[
                { x: VB.x + 20,        y: VB.y + 20,        dx: 18,  dy: 18 },
                { x: VB.x + VB.w - 20, y: VB.y + 20,        dx: -18, dy: 18 },
                { x: VB.x + VB.w - 20, y: VB.y + VB.h - 20, dx: -18, dy: -18 },
                { x: VB.x + 20,        y: VB.y + VB.h - 20, dx: 18,  dy: -18 },
              ].map((m, i) => (
                <g key={i} stroke={inkHex} strokeOpacity="0.32" strokeWidth="0.8" fill="none">
                  <line x1={m.x} y1={m.y} x2={m.x + m.dx} y2={m.y} />
                  <line x1={m.x} y1={m.y} x2={m.x} y2={m.y + m.dy} />
                </g>
              ))}

              <line
                x1={lerp(VB.x + 60, VB.x + VB.w - 60, scanX)}
                y1={VB.y + 24}
                x2={lerp(VB.x + 60, VB.x + VB.w - 60, scanX)}
                y2={VB.y + VB.h - 24}
                stroke="url(#er-scan)"
                strokeWidth="1.2"
                opacity="0.6"
              />

              {RENDER_ORDER.map(renderPart)}

              {partState.map((s) => {
                const part = s.part;
                const ax = s.x + part.anchor.x;
                const ay = s.y + part.anchor.y;
                const lx = part.label.x;
                const ly = part.label.y;
                return (
                  <g key={`co-${part.id}`} style={{ opacity: calloutOpacity }}>
                    <polyline
                      points={`${ax},${ay} ${ax},${ly} ${lx},${ly}`}
                      fill="none"
                      stroke={accentHex}
                      strokeOpacity="0.55"
                      strokeWidth="0.8"
                    />
                    <circle cx={ax} cy={ay} r="2.4" fill={accentHex} />
                    <circle cx={ax} cy={ay} r="6" fill={accentHex} fillOpacity="0.18" />
                    <circle cx={lx} cy={ly} r="1.8" fill={accentHex} />
                  </g>
                );
              })}
            </svg>

            <div className="pointer-events-none absolute inset-0">
              {partState.map((s) => {
                const part = s.part;
                const leftPct = ((part.label.x - VB.x) / VB.w) * 100;
                const topPct = ((part.label.y - VB.y) / VB.h) * 100;
                const isTop = part.label.y < 0;
                const slide = (1 - calloutOpacity) * (isTop ? -6 : 6);
                return (
                  <div
                    key={`card-${part.id}`}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: `translate(-50%, ${isTop ? "calc(-100% - 8px)" : "8px"}) translateY(${slide}px)`,
                      opacity: calloutOpacity,
                    }}
                  >
                    <div
                      className={`${surfaceClass} backdrop-blur-sm whitespace-nowrap`}
                      style={{ borderTop: `1px solid ${accentHex}` }}
                    >
                      <div className="flex items-baseline gap-2 px-3 py-1.5">
                        <span
                          className={`${captionFont} text-[10px] uppercase tracking-[0.22em]`}
                          style={{ color: accentHex }}
                        >
                          {part.n}
                        </span>
                        <span
                          className="text-[12.5px] font-medium leading-none tracking-tightish"
                          style={{ color: inkHex }}
                        >
                          {part.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] flex-shrink-0 px-6 pb-6 md:px-10 md:pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <span
                className="er-pulse block h-2 w-2 rounded-full"
                style={{ background: accentHex, boxShadow: `0 0 0 4px ${accentHex}22` }}
              />
              <div>
                <div className={`${captionFont} text-[10px] uppercase tracking-[0.24em] ${muteClass}`}>
                  Status
                </div>
                <div
                  className={`${captionFont} mt-0.5 text-[13px] uppercase tracking-[0.18em]`}
                  style={{ color: inkHex }}
                >
                  {status}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className={`${captionFont} text-[10px] uppercase tracking-[0.24em] ${muteClass}`}>
                Pieces
              </div>
              <div className={`${captionFont} mt-0.5 tabular-nums text-[13px]`} style={{ color: inkHex }}>
                {Math.round(ease(sm(0, 1, p)) * (PARTS.length - 1)) + 1} / {PARTS.length}
              </div>
            </div>
            <div
              className={`${captionFont} text-[10.5px] uppercase tracking-[0.22em] ${muteClass}`}
              style={{ opacity: 1 - ease(sm(0.05, 0.25, p)) }}
            >
              ↓ scroll to disassemble
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes er-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .er-pulse {
            animation: er-pulse 1.6s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
