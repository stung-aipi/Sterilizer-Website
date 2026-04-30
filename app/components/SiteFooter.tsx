import Link from "next/link";
import { BRAND } from "../lib/brand";
import { Logomark } from "./Logomark";

const COLS: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: "Shop",
    items: [
      { href: "/shop", label: "Product" },
      { href: "/shop", label: "Accessories" },
      { href: "/shop", label: "Multi-packs" },
      { href: "/shop", label: "Gift cards" },
    ],
  },
  {
    title: "Learn",
    items: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/technology", label: "The Technology" },
      { href: "/compare", label: "Compare" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/press", label: "Press" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/help", label: "Help" },
      { href: "/help", label: "Shipping" },
      { href: "/help", label: "Returns" },
      { href: "/help", label: "Warranty" },
    ],
  },
];

export function SiteFooter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <footer
      className={`${
        isDark
          ? "bg-b-bg text-b-ink ring-1 ring-white/10"
          : "bg-neutral-50 text-neutral-900 ring-1 ring-black/5"
      } mt-24`}
    >
      <div className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <Logomark className="h-5 w-5" />
              <span className="text-[15px] font-medium tracking-tight">{BRAND}</span>
            </div>
            <p className={`mt-4 max-w-sm text-[13.5px] leading-relaxed ${isDark ? "text-b-mute" : "text-neutral-600"}`}>
              A submersible UV-C water sterilizer. Drops into any bottle and disinfects in 60 seconds. Patent-pending technology, designed in the UK.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <input
                placeholder="Email for early access"
                className={`flex-1 rounded-full px-4 py-2 text-[13px] outline-none ${
                  isDark
                    ? "bg-white/5 text-b-ink ring-1 ring-white/15 placeholder:text-b-mute"
                    : "bg-white text-neutral-900 ring-1 ring-black/10 placeholder:text-neutral-400"
                }`}
              />
              <button
                className={`rounded-full px-4 py-2 text-[13px] ${
                  isDark ? "bg-white text-black" : "bg-neutral-900 text-white"
                }`}
              >
                Join
              </button>
            </form>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className={`text-[12px] uppercase tracking-[0.14em] ${isDark ? "text-b-mute" : "text-neutral-500"}`}>
                {col.title}
              </div>
              <ul className="mt-4 space-y-2">
                {col.items.map((it, i) => (
                  <li key={`${col.title}-${i}`}>
                    <Link href={it.href} className="text-[13.5px] hover:opacity-60">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className={`mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[12px] ${
            isDark ? "border-white/10 text-b-mute" : "border-black/10 text-neutral-500"
          }`}
        >
          <div>© {new Date().getFullYear()} {BRAND}, Ltd. · Patent-pending</div>
          <div className="flex gap-5">
            <Link href="#" className="hover:opacity-60">Terms</Link>
            <Link href="#" className="hover:opacity-60">Privacy</Link>
            <Link href="#" className="hover:opacity-60">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
