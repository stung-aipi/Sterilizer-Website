import Link from "next/link";
import { BRAND } from "../lib/brand";
import { HorizontalDeviceMark } from "./HorizontalDeviceMark";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <header
      className={`sticky top-0 z-30 w-full ${
        isDark ? "bg-b-bg/80 text-b-ink ring-1 ring-white/10" : "bg-white/80 text-neutral-900 ring-1 ring-black/5"
      } backdrop-blur`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" aria-label={BRAND}>
          <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[13.5px] tracking-tight hover:opacity-60">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-[12.5px]">
          <span className={`hidden rounded-full px-2 py-1 sm:inline ${isDark ? "ring-1 ring-white/15" : "ring-1 ring-black/10"}`}>
            US · USD
          </span>
          <Link
            href="/shop"
            className={`rounded-full px-3.5 py-1.5 ${
              isDark ? "bg-white text-black" : "bg-neutral-900 text-white"
            }`}
          >
            Buy
          </Link>
        </div>
      </div>
    </header>
  );
}
