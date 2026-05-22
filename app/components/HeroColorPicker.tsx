"use client";

import { useState } from "react";
import { HeroDeviceRotator } from "./HeroDeviceRotator";
import { DeviceVisual } from "./DeviceVisual";

const COLORWAYS: Array<{
  id: string;
  label: string;
  sub?: string;
  body: string;
  dome: string;
  glow: string;
  halo: string;
  image?: string;
}> = [
  { id: "midnight", label: "Midnight",            body: "#1A2433", dome: "#C8D4DC", glow: "#7FB3FF", halo: "#BAE6FD" },
  { id: "coral",    label: "Coral",   sub: "Limited", body: "#3F2424", dome: "#E89B7C", glow: "#E89B7C", halo: "#FDDDD4", image: "/renderings/forth-device-coral-frame-00.png" },
  { id: "sage",     label: "Sage",                body: "#1F2A28", dome: "#A6C7B6", glow: "#A6C7B6", halo: "#D4EDE6", image: "/renderings/forth-device-sage-frame-00.png" },
  { id: "sun",      label: "Sun",                 body: "#2B2210", dome: "#FFE6A1", glow: "#F4D35E", halo: "#FFF3CC", image: "/renderings/forth-device-sun-frame-00.png" },
];

export function HeroColorPicker({ alt }: { alt: string }) {
  const [activeId, setActiveId] = useState("midnight");
  const [coarse, setCoarse] = useState(false);
  const cw = COLORWAYS.find((c) => c.id === activeId) ?? COLORWAYS[0];

  const showCoarse = activeId === "midnight" && coarse;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Device visual — fixed width matches the video's natural size at each height
          so swapping to the SVG variants doesn't reflow the swatch row below. */}
      <div className="relative flex h-[460px] w-[307px] items-center justify-center md:h-[560px] md:w-[373px]">
        {/* Ambient background glow — tints with the active colorway */}
        <div className="pointer-events-none absolute -inset-12 rounded-full bg-a-sage/15 blur-3xl" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: cw.halo, opacity: showCoarse ? 0.40 : 0.55, transition: "background-color 0.6s ease, opacity 0.6s ease" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: cw.halo, opacity: showCoarse ? 0.40 : 0.55, transition: "background-color 0.6s ease, opacity 0.6s ease" }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {showCoarse ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/renderings/forth-device-midnight-coarse-frame-00.png"
              alt={alt}
              className="h-[460px] md:h-[560px] w-auto object-contain"
            />
          ) : activeId === "midnight" ? (
            <HeroDeviceRotator alt={alt} />
          ) : cw.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cw.image}
              alt={alt}
              className="h-[460px] md:h-[560px] w-auto object-contain"
            />
          ) : (
            <DeviceVisual
              className="h-[460px] md:h-[560px] w-auto"
              body={cw.body}
              dome={cw.dome}
              glow={cw.glow}
              ink="#0F1B2D"
              glowOn
            />
          )}
        </div>
      </div>

      {/* Colorway swatches — fixed width matches device container */}
      <div className="flex w-[307px] flex-col items-center gap-2 md:w-[373px]">
        <span className="text-[15px] font-medium tracking-tight text-a-ink">
          {cw.label}
          {cw.sub && (
            <span className="ml-1.5 rounded-full bg-a-ink/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em]">
              {cw.sub}
            </span>
          )}
        </span>
        <div className="flex items-center gap-3">
          {COLORWAYS.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => { setActiveId(c.id); setCoarse(false); }}
                aria-label={c.label}
                title={c.label}
                className={`h-5 w-5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "scale-125 ring-2 ring-a-ink ring-offset-2 ring-offset-a-bg"
                    : "ring-1 ring-black/15 hover:scale-110"
                }`}
                style={{ backgroundColor: c.dome }}
              />
            );
          })}
        </div>

        {/* Texture toggle — only visible for Midnight */}
        {activeId === "midnight" && (
          <div className="flex items-center gap-1 rounded-full bg-a-ink/8 p-0.5 text-[11px] font-medium tracking-wide">
            <button
              onClick={() => setCoarse(false)}
              className={`rounded-full px-3 py-1 transition-all duration-200 ${
                !coarse ? "bg-a-bg text-a-ink shadow-sm" : "text-a-ink/50 hover:text-a-ink/75"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setCoarse(true)}
              className={`rounded-full px-3 py-1 transition-all duration-200 ${
                coarse ? "bg-a-bg text-a-ink shadow-sm" : "text-a-ink/50 hover:text-a-ink/75"
              }`}
            >
              Coarse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
