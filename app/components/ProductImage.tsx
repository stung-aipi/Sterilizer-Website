"use client";
import { useRef, useState, MouseEvent } from "react";

const LENS_W    = 210;
const LENS_H    = 180;
const ZOOM      = 2;
const SCALE_TWO = 1.5;
const IMG_AR    = 2 / 3;  // all renders are 1600×2400
const PAD_Y     = 20;     // internal top/bottom padding inside the card

interface Cursor {
  x: number; y: number;
  w: number; h: number;
  // actual displayed image rect inside object-contain container
  imgW: number; imgH: number; imgX: number; imgY: number;
}

interface Props {
  src: string;
  alt: string;
  renderTwo?: boolean;
}

export function ProductImage({ src, alt, renderTwo }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [cursor, setCursor] = useState<Cursor>({
    x: 0, y: 0, w: 1, h: 1, imgW: 1, imgH: 1, imgX: 0, imgY: 0,
  });

  const track = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    // Content area excludes the vertical padding
    const contentH = height - PAD_Y * 2;
    const containerAR = width / contentH;
    const imgW = containerAR > IMG_AR ? contentH * IMG_AR : width;
    const imgH = containerAR > IMG_AR ? contentH : width / IMG_AR;
    const imgX = (width - imgW) / 2;
    const imgY = PAD_Y + (contentH - imgH) / 2;
    setCursor({ x: e.clientX - left, y: e.clientY - top, w: width, h: height, imgW, imgH, imgX, imgY });
  };

  const indicator = (
    <div
      className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/75 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-200"
      style={{ opacity: active ? 0 : 1 }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-neutral-500">
        <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M5 3.5v3M3.5 5h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Hover to zoom</span>
    </div>
  );

  // ── Single render ─────────────────────────────────────────────────────────
  if (!renderTwo) {
    // Cursor position relative to the image content (not the container)
    const relX = cursor.x - cursor.imgX;
    const relY = cursor.y - cursor.imgY;

    // Clamp so the background never scrolls outside the image bounds
    const cx = Math.min(cursor.imgW - LENS_W / (2 * ZOOM), Math.max(LENS_W / (2 * ZOOM), relX));
    const cy = Math.min(cursor.imgH - LENS_H / (2 * ZOOM), Math.max(LENS_H / (2 * ZOOM), relY));

    // Lens position follows raw cursor, clamped to container
    const lensLeft = Math.min(cursor.w - LENS_W, Math.max(0, cursor.x - LENS_W / 2));
    const lensTop  = Math.min(cursor.h - LENS_H, Math.max(0, cursor.y - LENS_H / 2));

    // Background offset: keep the clamped image point at lens centre
    const bgX = LENS_W / 2 - cx * ZOOM;
    const bgY = LENS_H / 2 - cy * ZOOM;

    return (
      <div
        ref={containerRef}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onMouseMove={track}
        className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-a-rule/40 to-a-bg ring-1 ring-black/5 cursor-crosshair"
        style={{ height: "600px", padding: `${PAD_Y}px 0` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-contain" />

        {active && (
          <div
            className="pointer-events-none absolute overflow-hidden rounded-xl shadow-xl ring-2 ring-black/10"
            style={{
              left: lensLeft,
              top: lensTop,
              width: LENS_W,
              height: LENS_H,
              backgroundColor: "#F7F4EE",
              backgroundImage: `url(${src})`,
              backgroundSize: `${cursor.imgW * ZOOM}px ${cursor.imgH * ZOOM}px`,
              backgroundPosition: `${bgX}px ${bgY}px`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        {indicator}
      </div>
    );
  }

  // ── Two-pack: rectangular magnifier over the two-image composition ────────
  const lensLeft2 = Math.min(cursor.w - LENS_W, Math.max(0, cursor.x - LENS_W / 2));
  const lensTop2  = Math.min(cursor.h - LENS_H, Math.max(0, cursor.y - LENS_H / 2));
  const cx2 = Math.min(cursor.w - LENS_W / (2 * ZOOM), Math.max(LENS_W / (2 * ZOOM), cursor.x));
  const cy2 = Math.min(cursor.h - LENS_H / (2 * ZOOM), Math.max(LENS_H / (2 * ZOOM), cursor.y));

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={track}
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-a-rule/40 to-a-bg ring-1 ring-black/5 cursor-crosshair"
      style={{ height: "600px", padding: `${PAD_Y}px 0` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-contain translate-x-[22%] scale-[0.95]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-contain -translate-x-[12%]" />

      {active && (
        <div
          className="pointer-events-none absolute overflow-hidden rounded-xl shadow-xl ring-2 ring-black/10"
          style={{ left: lensLeft2, top: lensTop2, width: LENS_W, height: LENS_H }}
        >
          {/* Inner div recreates the full container at ZOOM× so the composition is preserved */}
          <div
            style={{
              position: "absolute",
              width: cursor.w || 1,
              height: cursor.h || 1,
              backgroundColor: "#F7F4EE",
              transform: `translate(${LENS_W / 2 - cx2 * ZOOM}px, ${LENS_H / 2 - cy2 * ZOOM}px) scale(${ZOOM})`,
              transformOrigin: "top left",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-contain translate-x-[22%] scale-[0.95]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-contain -translate-x-[12%]" />
          </div>
        </div>
      )}
      {indicator}
    </div>
  );
}