"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VARIANTS = [
  { id: "a", href: "/", label: "A · Editorial" },
  { id: "b", href: "/option-b", label: "B · Engineered" },
] as const;

type Tone = "light" | "dark";

export function VariantToggle({ active, tone = "light" }: { active: "a" | "b"; tone?: Tone }) {
  // Reads pathname so the active state stays correct if user navigates between variants.
  const path = usePathname();
  const inferred: "a" | "b" = path === "/option-b" ? "b" : "a";
  const current = active ?? inferred;

  const wrap =
    tone === "dark"
      ? "bg-black/70 text-white/90 ring-1 ring-white/15 backdrop-blur"
      : "bg-white/85 text-neutral-900 ring-1 ring-neutral-900/10 backdrop-blur";

  const pill =
    tone === "dark"
      ? "bg-white text-black"
      : "bg-neutral-900 text-white";

  const muted = tone === "dark" ? "text-white/60" : "text-neutral-500";

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
      <div className={`flex items-center gap-1 rounded-full px-1.5 py-1 text-[12px] tracking-wide ${wrap}`}>
        <span className={`px-2.5 py-1 ${muted}`}>Concept</span>
        {VARIANTS.map((v) => {
          const isActive = current === v.id;
          return (
            <Link
              key={v.id}
              href={v.href}
              className={`rounded-full px-3 py-1 transition ${
                isActive ? pill : `hover:${tone === "dark" ? "bg-white/10" : "bg-black/5"}`
              }`}
            >
              {v.label}
            </Link>
          );
        })}
      </div>
      <Link
        href="/identity"
        className={`rounded-full px-3 py-2 text-[12px] tracking-wide ${wrap}`}
        title="Try logo and name combinations"
      >
        Identity Lab →
      </Link>
    </div>
  );
}
