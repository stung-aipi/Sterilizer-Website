// Lightweight shell used by all dummy inner pages so they share a single skin.

import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { VariantToggle } from "./VariantToggle";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteNav tone="light" />
      <main className="mx-auto max-w-[1240px] px-6 py-16">{children}</main>
      <SiteFooter tone="light" />
      <VariantToggle active="a" tone="light" />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">{children}</div>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-3 font-serif text-[56px] leading-[1] tracking-tight md:text-[80px]">{children}</h1>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-[36px] leading-tight tracking-tight md:text-[44px] ${className}`}>
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 max-w-2xl text-[18px] leading-[1.6] text-neutral-700">{children}</p>
  );
}
