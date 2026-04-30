import Link from "next/link";
import { BRAND, TAGLINE, SUBLINE, SPECS, COMPARE_ROWS, FAQS, USE_CASES, PRESS_QUOTES } from "./lib/brand";
import { Logomark } from "./components/Logomark";
import { DeviceVisual } from "./components/DeviceVisual";
import { VariantToggle } from "./components/VariantToggle";
import { SiteFooter } from "./components/SiteFooter";

export const metadata = {
  title: `${BRAND} — A — Editorial`,
};

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export default function HomeA() {
  return (
    <div className="min-h-screen bg-a-bg text-a-ink bg-grain">
      {/* Header */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-2">
            <Logomark className="h-5 w-5 text-a-ink" />
            <span className="font-serif text-[20px] tracking-tight">{BRAND}</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-[13.5px] tracking-tight hover:opacity-60">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-[12px] tracking-[0.12em] text-a-ink/60 sm:inline">US · USD</span>
            <Link href="/shop" className="rounded-full bg-a-ink px-4 py-1.5 text-[13px] text-a-bg">
              Buy
            </Link>
          </div>
        </div>
        <div className="mx-auto h-px max-w-[1240px] bg-a-rule" />
      </header>

      {/* Hero — editorial split */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-8 pb-24 pt-20 md:pt-28">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/60">Patent-pending · UV-C</div>
            <h1 className="mt-8 font-serif text-[56px] leading-[0.98] tracking-tightish text-a-ink md:text-[88px]">
              Clean water,
              <br />
              <span className="italic text-a-ink/85">in any bottle,</span>
              <br />
              in seconds.
            </h1>
            <p className="mt-8 max-w-md text-[16px] leading-[1.6] text-a-ink/75">
              {BRAND} is a submersible UV-C sterilizer the size of a marker. It drops into the bottle you already own, activates with a shake, and disinfects 99.9% of bacteria, viruses, and protozoa in 60 seconds.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-a-ink px-6 py-3 text-[14px] tracking-tight text-a-bg hover:bg-a-ink/85"
              >
                Pre-order — from $39
              </Link>
              <Link href="/how-it-works" className="text-[14px] tracking-tight underline-offset-4 hover:underline">
                How it works →
              </Link>
            </div>
          </div>

          <div className="col-span-12 flex justify-center md:col-span-5 md:justify-end">
            <div className="relative">
              <div className="absolute -inset-12 rounded-full bg-a-sage/15 blur-3xl" aria-hidden />
              <DeviceVisual
                className="relative h-[460px] w-auto md:h-[560px]"
                body="#1A2433"
                dome="#C8D4DC"
                glow="#A6C7B6"
                ink="#0F1B2D"
              />
            </div>
          </div>
        </div>

        {/* Marquee strip of credentials */}
        <div className="border-y border-a-rule bg-a-bg/60">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 overflow-hidden px-8 py-5 text-[12px] uppercase tracking-[0.18em] text-a-ink/55">
            <span>UK & US shipping</span>
            <span className="hidden md:inline">EPA log-reduction validated</span>
            <span>30 cycles per charge</span>
            <span className="hidden md:inline">2-year warranty</span>
            <span>Free shipping over $60</span>
          </div>
        </div>
      </section>

      {/* The 30-second story */}
      <section className="mx-auto max-w-[1240px] px-8 py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/55">The thirty-second story</div>
            <h2 className="mt-4 font-serif text-[44px] leading-[1] tracking-tightish md:text-[56px]">
              Drop. Shake.<br /> Drink.
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.65] text-a-ink/70">
              Three motions. Sixty seconds. The smallest gesture in your kit, and the only one that turns any bottle into a self-cleaning one.
            </p>
          </div>
          <ol className="col-span-12 grid grid-cols-1 gap-px bg-a-rule md:col-span-8 md:grid-cols-3">
            {[
              { n: "01", h: "Drop it in", b: "Drops into any bottle with a neck wider than 25 mm. Fully submersible, fully waterproof." },
              { n: "02", h: "Shake to start", b: "A motion-detected handshake fires the standard 60-second cycle. No buttons, no ports, no fuss." },
              { n: "03", h: "Drink", b: "Dual UV-C emitters at 265 nm reach every face of the bottle. Bacteria, viruses, protozoa — handled." },
            ].map((s) => (
              <li key={s.n} className="bg-a-bg p-7">
                <div className="font-serif text-[14px] italic text-a-ink/55">{s.n}</div>
                <div className="mt-6 font-serif text-[24px] leading-tight">{s.h}</div>
                <p className="mt-3 text-[14px] leading-[1.6] text-a-ink/70">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Big product hero shot section */}
      <section className="bg-a-ink text-a-bg">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-8 py-32">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-bg/55">A study in restraint</div>
            <h3 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-tightish md:text-[52px]">
              The first UV purifier we wanted to leave on the counter.
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-a-bg/75">
              Ninety-nine percent of UV pens look like 2008 medical hardware. {BRAND} doesn't. Twin geodesic emitters, an 87 × 22 mm cylinder of recycled aluminum, no buttons, no ports — charged by induction, sealed for life.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-y-5 text-[13px]">
              {[
                ["Size", SPECS.size],
                ["Weight", SPECS.weight],
                ["Cycle", SPECS.cycle],
                ["Battery", SPECS.battery],
                ["Charging", SPECS.charge],
                ["Rating", SPECS.rating],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-a-bg/55 uppercase tracking-[0.16em] text-[11px]">{k}</dt>
                  <dd className="mt-1 text-a-bg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-span-12 flex items-center justify-center md:col-span-7">
            <DeviceVisual
              className="h-[520px] w-auto md:h-[620px]"
              body="#0F1B2D"
              dome="#A9C4D4"
              glow="#7FB3FF"
              ink="#000000"
              glowOn
            />
          </div>
        </div>
      </section>

      {/* Why it's different — small comparison snippet */}
      <section className="mx-auto max-w-[1240px] px-8 py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/55">Why it's different</div>
            <h3 className="mt-4 font-serif text-[40px] leading-tight tracking-tightish">
              Better technology, in a better object, at a fairer price.
            </h3>
            <Link
              href="/compare"
              className="mt-8 inline-block text-[14px] underline-offset-4 hover:underline"
            >
              See the full comparison →
            </Link>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-hidden rounded-2xl ring-1 ring-a-rule">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-a-rule/40">
                  <tr className="text-[11px] uppercase tracking-[0.16em] text-a-ink/60">
                    <th className="px-5 py-4"></th>
                    <th className="px-5 py-4">{BRAND}</th>
                    <th className="px-5 py-4">SteriPen</th>
                    <th className="px-5 py-4">LARQ</th>
                    <th className="px-5 py-4">Tablets</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.slice(0, 5).map((row) => (
                    <tr key={row.label} className="border-t border-a-rule">
                      <td className="px-5 py-4 text-a-ink/65">{row.label}</td>
                      <td className="px-5 py-4 font-medium">{row.lumen}</td>
                      <td className="px-5 py-4 text-a-ink/65">{row.steripen}</td>
                      <td className="px-5 py-4 text-a-ink/65">{row.larq}</td>
                      <td className="px-5 py-4 text-a-ink/65">{row.tabs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Press / social proof */}
      <section className="border-y border-a-rule bg-a-bg/60">
        <div className="mx-auto max-w-[1240px] px-8 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {PRESS_QUOTES.map((p) => (
              <figure key={p.source}>
                <blockquote className="font-serif text-[18px] leading-snug text-a-ink/85">
                  "{p.text}"
                </blockquote>
                <figcaption className="mt-4 text-[11px] uppercase tracking-[0.18em] text-a-ink/55">
                  — {p.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Technology in 60 seconds */}
      <section className="mx-auto max-w-[1240px] px-8 py-28">
        <div className="grid grid-cols-12 items-center gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-square w-full overflow-hidden rounded-3xl bg-a-sage/15 ring-1 ring-a-rule">
              <div className="grid h-full place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-spinslow rounded-full border border-dashed border-a-ink/25" />
                  <Logomark className="h-32 w-32 text-a-ink/80" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/55">The technology, briefly</div>
            <h3 className="mt-4 font-serif text-[40px] leading-tight tracking-tightish">
              UV-C at 265 nanometres. The wavelength microbial DNA cannot survive.
            </h3>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-a-ink/70">
              Twin geodesic emitters refract UV-C at the precise wavelength that breaks down microbial DNA. Multi-directional coverage means there is no shadowed water and no missed surface — independently of bottle shape.
            </p>
            <Link
              href="/technology"
              className="mt-8 inline-block text-[14px] underline-offset-4 hover:underline"
            >
              Read the technology page →
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases — restrained tile grid */}
      <section className="mx-auto max-w-[1240px] px-8 pb-28">
        <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/55">Where it lives</div>
        <h3 className="mt-4 max-w-2xl font-serif text-[40px] leading-tight tracking-tightish">
          Made for travel, but kept on the kitchen counter.
        </h3>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-a-rule md:grid-cols-5">
          {USE_CASES.map((u, i) => (
            <div key={u.tag} className={`bg-a-bg p-6 ${i === 0 ? "md:col-span-1" : ""}`}>
              <div className="aspect-[4/5] w-full rounded-xl bg-gradient-to-br from-a-sage/30 via-a-sage/10 to-a-bg" />
              <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-a-ink/55">{u.tag}</div>
              <p className="mt-2 font-serif text-[18px] leading-snug">{u.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="mx-auto max-w-[1240px] px-8 pb-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/55">Questions, briefly answered</div>
            <h3 className="mt-4 font-serif text-[40px] leading-tight tracking-tightish">
              Things people want to know.
            </h3>
            <Link
              href="/help"
              className="mt-8 inline-block text-[14px] underline-offset-4 hover:underline"
            >
              All questions →
            </Link>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="divide-y divide-a-rule rounded-3xl bg-a-bg ring-1 ring-a-rule">
              {FAQS.slice(0, 4).map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                    <span className="font-serif text-[20px] leading-snug">{f.q}</span>
                    <span className="text-a-ink/40 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.65] text-a-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-a-ink text-a-bg">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-8 py-24">
          <div className="col-span-12 md:col-span-6">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-bg/55">Early access</div>
            <h3 className="mt-4 font-serif text-[44px] leading-[1.05] tracking-tightish">
              Be among the first.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-a-bg/75">
              Pre-orders open in spring. Join the list — no spam, just the launch and the founder's notes from the road.
            </p>
          </div>
          <form className="col-span-12 flex items-end gap-3 md:col-span-6">
            <div className="flex-1">
              <label className="text-[11px] uppercase tracking-[0.18em] text-a-bg/60">Email address</label>
              <input
                placeholder="you@home.com"
                className="mt-2 w-full border-b border-a-bg/30 bg-transparent pb-3 text-[16px] text-a-bg placeholder:text-a-bg/40 focus:border-a-bg focus:outline-none"
              />
            </div>
            <button className="rounded-full bg-a-bg px-6 py-3 text-[14px] text-a-ink hover:bg-a-bg/85">Join</button>
          </form>
        </div>
      </section>

      <SiteFooter tone="light" />
      <VariantToggle active="a" tone="light" />
    </div>
  );
}
