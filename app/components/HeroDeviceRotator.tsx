"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_WEBM = "/renderings/forth-device-rotation.webm";
const VIDEO_MP4 = "/renderings/forth-device-rotation.mp4";
const POSTER_SRC = "/renderings/forth-device-frame-00.png";

const FULL_ROTATION_MS = 1000;

type Props = { alt: string };
type Direction = "forward" | "reverse" | "idle";

/** Sine ease-in-out — gentle slow→fast→slow without dead time at the start. */
const easeInOut = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

/**
 * Single video element. RAF-driven currentTime scrubbing in either direction.
 * The all-keyframe WebM (-g 1) makes every seek O(1), so reverse scrubbing is
 * just as smooth as forward. No two-video swap, no visibility transitions, no
 * decode-pipeline races — the source of all the previous glitches.
 */
export function HeroDeviceRotator({ alt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRafRef = useRef<number | null>(null);
  const dirRef = useRef<Direction>("idle");
  const lastScrollY = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const check = () => {
      if (v.duration > 0) setReady(true);
    };
    v.addEventListener("loadedmetadata", check);
    v.load();
    check();
    return () => v.removeEventListener("loadedmetadata", check);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const v = videoRef.current;
    if (!v) return;

    // Pin the video paused at frame 0 — we'll drive frames manually
    try { v.currentTime = 0; } catch {}
    try { v.pause(); } catch {}

    const cancelAnim = () => {
      if (animRafRef.current != null) {
        cancelAnimationFrame(animRafRef.current);
        animRafRef.current = null;
      }
    };

    /** Animate currentTime from current → toTime with sine ease-in-out. */
    const animateTo = (toTime: number) => {
      cancelAnim();
      const totalDur = v.duration || 1.7;
      const fromTime = v.currentTime;
      const distance = Math.abs(toTime - fromTime);
      if (distance < 0.005) return;

      const animMs = (distance / totalDur) * FULL_ROTATION_MS;
      const startWall = performance.now();

      const tick = () => {
        const elapsed = performance.now() - startWall;
        const linear = Math.min(1, elapsed / animMs);
        const eased = easeInOut(linear);
        const newTime = fromTime + (toTime - fromTime) * eased;
        try { v.currentTime = newTime; } catch {}
        if (linear < 1) {
          animRafRef.current = requestAnimationFrame(tick);
        } else {
          animRafRef.current = null;
        }
      };

      animRafRef.current = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      const cy = window.scrollY;
      const dy = cy - lastScrollY.current;
      lastScrollY.current = cy;
      if (Math.abs(dy) < 1) return;

      const rect = v.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const dur = v.duration || 1.7;
      const animating = animRafRef.current != null;

      if (dy > 0) {
        // Already at end? No-op.
        if (v.currentTime >= dur - 0.01) return;
        // Already animating forward? Don't restart.
        if (animating && dirRef.current === "forward") return;
        dirRef.current = "forward";
        animateTo(dur);
      } else {
        if (v.currentTime <= 0.01) return;
        if (animating && dirRef.current === "reverse") return;
        dirRef.current = "reverse";
        animateTo(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnim();
    };
  }, [ready]);

  return (
    <div
      className="relative h-[460px] w-auto md:h-[560px]"
      style={{ aspectRatio: "1600 / 2400", backgroundColor: "transparent" }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={POSTER_SRC}
        aria-label={alt}
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          inset: 0,
          margin: "auto",
          height: "100%",
          width: "auto",
          objectFit: "contain",
        }}
      >
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4} type="video/mp4" />
      </video>
    </div>
  );
}
