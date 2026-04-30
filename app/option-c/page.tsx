import Link from "next/link";
import { BRAND, SPECS, COMPARE_ROWS, FAQS, USE_CASES, PRESS_QUOTES } from "../lib/brand";
import { Logomark } from "../components/Logomark";
import { DeviceVisual } from "../components/DeviceVisual";
import { VariantToggle } from "../components/VariantToggle";
import { SiteFooter } from "../components/SiteFooter";

export const metadata = {
  title: `${BRAND} — C — Bright Modern`,
};

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/technology", label: "Tech" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export default function HomeC() {
  return (
    <div className="min-h-screen bg-c-bg text-c-ink bg-grain">
      {/* Header — chunky, friendly */}
      <header className="sticky top-0 z-30 bg-c-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link href="/option-c" className="flex items-center gap-2">
            <Logomark className="h-5 w-5 text-c-ink" />
            <span className="text-[16px] font-semibold tracking-tight">{BRAND}</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-[14px] font-medium tracking-tight hover:text-c-clay">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-c-rule px-2.5 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] sm:inline">
              US · USD
            </span>
            <Link
              href="/shop"
              className="rounded-full bg-c-ink px-4 py-2 text-[13px] font-medium text-c-bg hover:bg-c-ink/90"
            >
              Shop $39
            </Link>
          </div>
        </div>
        <div className="mx-auto h-px max-w-[1280px] bg-c-rule" />
      </header>

      {/* Hero — bento split with bright color block */}
      <section className="mx-auto max-w-[1280px] px-6 pt-10">
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {/* Left big hero card */}
          <div className="relative col-span-12 overflow-hidden rounded-3xl bg-c-sun p-8 md:col-span-8 md:p-14">
            <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-c-ink/80">
              <span className="h-1.5 w-1.5 rounded-full bg-c-ink" />
              Pre-orders open · Spring 2026
            </div>
            <h1 className="mt-8 font-display text-[64px] font-semibold leading-[0.95] tracking-tightx text-c-ink md:text-[112px]">
              Drop.<br />
              Shake.<br />
              Drink.
            </h1>
            <p className="mt-8 max-w-md text-[16.5px] leading-[1.55] text-c-ink/80">
              Meet {BRAND} — the submersible UV-C purifier that turns any bottle you already own into a self-cleaning one. 60 seconds. 99.9%. From $39.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-c-ink px-6 py-3.5 text-[14.5px] font-medium text-c-bg hover:bg-c-ink/90"
              >
                Pre-order from $39
                <span>→</span>
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-full bg-c-bg px-6 py-3.5 text-[14.5px] font-medium ring-1 ring-c-ink/15 hover:bg-white"
              >
                Watch the 60s demo
              </Link>
            </div>

            {/* Device peeking from card */}
            <div className="pointer-events-none absolute -bottom-12 -right-10 hidden md:block">
              <DeviceVisual
                className="h-[440px] w-auto opacity-95"
                body="#1A2332"
                dome="#FFE6A1"
                glow="#F4D35E"
                ink="#1A2332"
              />
            </div>
          </div>

          {/* Right column small cards */}
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:gap-4">
            <div className="rounded-3xl bg-c-clay p-6 text-c-bg">
              <div className="text-[11px] uppercase tracking-[0.16em] text-c-bg/80">In a hurry?</div>
              <p className="mt-4 font-display text-[32px] font-semibold leading-[1.02] tracking-tightish">
                One bottle. Sixty seconds. Done.
              </p>
            </div>
            <div className="rounded-3xl bg-c-bg p-6 ring-1 ring-c-rule">
              <div className="text-[11px] uppercase tracking-[0.16em] text-c-ink/65">Specs</div>
              <dl className="mt-3 space-y-2 text-[13.5px]">
                <div className="flex justify-between"><dt className="text-c-ink/65">Cycle</dt><dd>60 sec</dd></div>
                <div className="flex justify-between"><dt className="text-c-ink/65">Battery</dt><dd>30 cycles</dd></div>
                <div className="flex justify-between"><dt className="text-c-ink/65">Fits</dt><dd>≥ 25 mm necks</dd></div>
                <div className="flex justify-between"><dt className="text-c-ink/65">Rating</dt><dd>IPX8</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* The 30-second story — three colorful step cards */}
      <section className="mx-auto max-w-[1280px] px-6 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-c-ink/60">Three motions</div>
            <h2 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tightx md:text-[52px]">
              The whole product, in 60 seconds.
            </h2>
          </div>
          <Link href="/how-it-works" className="text-[14px] font-medium hover:text-c-clay">
            Full walkthrough →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { n: "01", h: "Drop it in", b: "Drops into the bottle you already own. Wide-mouth, narrow-neck, glass — anything ≥ 25 mm.", bg: "bg-c-sun" },
            { n: "02", h: "Shake to start", b: "A motion handshake fires the standard cycle. No buttons. No ports.", bg: "bg-c-clay text-c-bg" },
            { n: "03", h: "Drink", b: "Twin UV-C emitters at 265 nm. 99.9% bacteria, viruses, and protozoa — gone.", bg: "bg-c-ink text-c-bg" },
          ].map((s) => (
            <div key={s.n} className={`rounded-3xl ${s.bg} p-7`}>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.2em] opacity-80">step {s.n}</div>
              <div className="mt-10 font-display text-[32px] font-semibold leading-tight tracking-tightish">{s.h}</div>
              <p className="mt-4 text-[14.5px] leading-[1.6] opacity-85">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Big product hero */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="grid grid-cols-12 items-center gap-8 rounded-[40px] bg-c-ink p-10 text-c-bg md:p-16">
          <div className="col-span-12 md:col-span-6">
            <div className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-c-sun">The object</div>
            <h3 className="mt-4 font-display text-[44px] font-semibold leading-[1.02] tracking-tightx md:text-[60px]">
              Smaller than a marker.<br />
              <span className="text-c-sun">Sharper than the rest.</span>
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-c-bg/80">
              Twin geodesic emitters. Recycled aluminum unibody. No buttons, no charging port, no leaks. Drop it in your bag and forget it's there.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-5 border-t border-c-bg/15 pt-6 text-[13px]">
              {[
                ["Size", SPECS.size],
                ["Weight", SPECS.weight],
                ["Charge", SPECS.charge],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10.5px] uppercase tracking-[0.16em] text-c-bg/55">{k}</div>
                  <div className="mt-1.5 font-medium">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 flex justify-center md:col-span-6">
            <DeviceVisual
              className="h-[480px] w-auto md:h-[560px]"
              body="#0F1722"
              dome="#FFE6A1"
              glow="#F4D35E"
              ink="#000000"
              glowOn
            />
          </div>
        </div>
      </section>

      {/* Why it's different — comparison */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-c-ink/60">Why pick {BRAND}</div>
            <h3 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tightx md:text-[52px]">
              Better tech. Half the price.
            </h3>
          </div>
          <Link href="/compare" className="text-[14px] font-medium hover:text-c-clay">
            See full comparison →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { t: BRAND, p: "$39", v: "Drops in any bottle · 60s · App control", hl: true },
            { t: "SteriPen", p: "$50–100", v: "Handheld pen, button UX, dated design" },
            { t: "LARQ", p: "$95–130", v: "Locks you into one bottle" },
            { t: "Tablets", p: "$0.50/dose", v: "Slow, alters taste, single-use" },
          ].map((o) => (
            <div
              key={o.t}
              className={`rounded-3xl p-6 ${
                o.hl ? "bg-c-sun ring-2 ring-c-ink" : "bg-c-bg ring-1 ring-c-rule"
              }`}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-c-ink/65">{o.hl ? "Our pick" : "Alternative"}</div>
              <div className="mt-3 font-display text-[28px] font-semibold leading-tight tracking-tightish">{o.t}</div>
              <div className="mt-1 text-[14px] text-c-ink/75">{o.p}</div>
              <p className="mt-6 text-[14px] leading-snug text-c-ink/85">{o.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press strip */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="rounded-3xl bg-c-bg p-10 ring-1 ring-c-rule">
          <div className="text-center text-[12px] font-medium uppercase tracking-[0.16em] text-c-ink/55">
            As seen in
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRESS_QUOTES.map((p) => (
              <figure key={p.source} className="rounded-2xl bg-c-rule/50 p-5">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-c-clay">{p.source}</div>
                <blockquote className="mt-3 text-[15px] font-medium leading-snug">"{p.text}"</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases — colorful bento */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="font-display text-[40px] font-semibold leading-tight tracking-tightx md:text-[52px]">
            Made for everywhere.
          </h3>
          <p className="max-w-sm text-[14.5px] text-c-ink/70">
            Travel kit one day. School-run cup the next. Festival bottle the day after that.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6 md:grid-rows-2">
          {[
            { ...USE_CASES[0], cls: "md:col-span-3 md:row-span-2 bg-c-clay text-c-bg" },
            { ...USE_CASES[1], cls: "md:col-span-3 bg-c-sun" },
            { ...USE_CASES[2], cls: "md:col-span-2 bg-c-ink text-c-bg" },
            { ...USE_CASES[3], cls: "md:col-span-1 bg-c-bg ring-1 ring-c-rule" },
            { ...USE_CASES[4], cls: "md:col-span-3 bg-c-rule/60" },
          ].map((u) => (
            <div key={u.tag} className={`rounded-3xl p-7 ${u.cls} min-h-[200px]`}>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-75">{u.tag}</div>
              <p className="mt-8 font-display text-[24px] font-semibold leading-tight tracking-tightish md:text-[28px]">
                {u.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech in 60s */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="grid grid-cols-12 items-center gap-8 rounded-[40px] bg-c-rule/50 p-10 md:p-14">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-c-clay">The science</div>
            <h3 className="mt-4 font-display text-[40px] font-semibold leading-tight tracking-tightx md:text-[48px]">
              UV-C at 265 nm. The wavelength microbial DNA cannot survive.
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-c-ink/80">
              Twin geodesic emitters refract a 265 nm dose across twelve faces. Multi-directional coverage means there is no shadowed water — independently of bottle shape.
            </p>
            <Link href="/technology" className="mt-6 inline-block text-[14px] font-medium underline-offset-4 hover:underline">
              The full technology page →
            </Link>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-square w-full rounded-3xl bg-c-bg ring-1 ring-c-rule">
              <div className="grid h-full place-items-center">
                <div className="relative h-48 w-48 animate-spinslow">
                  <Logomark className="h-full w-full text-c-ink/85" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-c-ink/60">Quick answers</div>
            <h3 className="mt-3 font-display text-[40px] font-semibold leading-tight tracking-tightx">
              People often ask.
            </h3>
            <Link href="/help" className="mt-6 inline-block text-[14px] font-medium hover:text-c-clay">
              Read the full FAQ →
            </Link>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="divide-y divide-c-rule rounded-3xl bg-c-bg ring-1 ring-c-rule">
              {FAQS.slice(0, 4).map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="text-[18px] font-semibold tracking-tight">{f.q}</span>
                    <span className="text-c-ink/40 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.65] text-c-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="mx-auto max-w-[1280px] px-6 pt-24">
        <div className="overflow-hidden rounded-[40px] bg-c-ink p-10 text-c-bg md:p-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-c-sun">Save your spot</div>
              <h3 className="mt-3 font-display text-[44px] font-semibold leading-[1.02] tracking-tightx md:text-[64px]">
                First batch, first dibs.
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-c-bg/80">
                Pre-orders open in spring. Early-list members get the launch price and a free travel case.
              </p>
            </div>
            <form className="col-span-12 flex items-end gap-3 md:col-span-5">
              <div className="flex-1">
                <label className="text-[11px] uppercase tracking-[0.18em] text-c-bg/60">Email</label>
                <input
                  placeholder="you@home.com"
                  className="mt-2 w-full border-b border-c-bg/30 bg-transparent pb-3 text-[16px] placeholder:text-c-bg/40 focus:border-c-sun focus:outline-none"
                />
              </div>
              <button className="rounded-full bg-c-sun px-6 py-3 text-[14px] font-semibold text-c-ink hover:bg-c-sun/90">
                Join
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter tone="light" />
      <VariantToggle active="c" tone="light" />
    </div>
  );
}
