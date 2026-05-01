import Link from "next/link";
import { BRAND, SPECS, COMPARE_ROWS, FAQS, USE_CASES, PRESS_QUOTES } from "../lib/brand";
import { HorizontalDeviceMark } from "../components/HorizontalDeviceMark";
import { DeviceCylinder } from "../components/DeviceCylinder";
import { VariantToggle } from "../components/VariantToggle";
import { SiteFooter } from "../components/SiteFooter";
import { ExplodedReveal } from "../components/ExplodedReveal";

export const metadata = {
  title: `${BRAND} — UV-C sterilization, engineered in Scotland.`,
  description: `${BRAND} is an 87 mm submersible UV-C sterilizer. Designed and assembled in Edinburgh.`,
};

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export default function HomeB() {
  return (
    <div className="min-h-screen bg-b-bg text-b-ink font-display">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-b-line bg-b-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link href="/option-b" className="flex items-center gap-3 text-b-ink" aria-label={BRAND}>
            <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-b-mute md:inline">
              v1.0 · patent-pending
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-[13px] tracking-tight text-b-ink/85 hover:text-b-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-b-mute ring-1 ring-white/15 sm:inline">
              US · USD
            </span>
            <Link href="/shop" className="rounded-full bg-b-ink px-4 py-1.5 text-[13px] text-b-bg">
              Buy
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — full-bleed device, technical callouts */}
      <section className="relative overflow-hidden">
        <div className="bg-grid-faint absolute inset-0" aria-hidden />
        <div className="absolute -left-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-b-coral/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid min-h-[88vh] max-w-[1280px] grid-cols-12 items-center gap-8 px-6 py-24">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-b-coral" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-b-mute">
                Engineered in Edinburgh — Q3 ship
              </span>
            </div>
            <h1 className="mt-7 text-[64px] font-medium leading-[0.96] tracking-tightx md:text-[104px]">
              Sterilization,<br />
              <span className="text-b-mute">at the</span><br />
              <span className="text-b-coral">molecular level.</span>
            </h1>
            <p className="mt-8 max-w-md text-[15.5px] leading-[1.65] text-b-ink/75">
              {BRAND} is an 87 mm submersible UV-C sterilizer. Twin geodesic emitters refract 265 nm light through every face of any bottle. ≥ 3-log reduction. Sixty seconds. No filters, no consumables, no plastic.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-b-ink px-6 py-3 text-[13.5px] font-medium tracking-tight text-b-bg"
              >
                Pre-order — from $39
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/technology" className="text-[13.5px] text-b-ink/80 hover:text-b-ink">
                Read the science
              </Link>
            </div>

            {/* Inline spec strip */}
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-b-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
              {[
                ["λ", SPECS.wavelength],
                ["t", SPECS.cycle],
                ["log₁₀", "≥ 3.0 reduction"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-b-mute">{k}</dt>
                  <dd className="mt-1 text-b-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Device — clean, no hero callouts. Part-level labelling lives in
              the §01.5 assembly diagram (ExplodedReveal) below. */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative mx-auto w-fit">
              <DeviceCylinder
                className="h-[560px] w-auto md:h-[640px]"
                body="#13151A"
                dome="#86A6BC"
                glow="#E89B7C"
                ink="#0A0B0D"
                glowOn
              />
            </div>
          </div>
        </div>

        {/* Press logos / scroll strip */}
        <div className="border-y border-b-line">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">
            <span>Wired</span>
            <span>Outside</span>
            <span className="hidden sm:inline">Monocle</span>
            <span>T3</span>
            <span className="hidden sm:inline">The Verge</span>
            <span>Fast Company</span>
          </div>
        </div>
      </section>

      {/* The 30-second story — engineering diagram feel */}
      <section className="border-b border-b-line">
        <div className="mx-auto max-w-[1280px] px-6 py-28">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">§ 01 — operation</div>
              <h2 className="mt-4 text-[44px] font-medium leading-[1.02] tracking-tightx md:text-[56px]">
                Three motions.<br />
                <span className="text-b-mute">Sixty seconds.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[14.5px] leading-[1.7] text-b-ink/70">
                A motion handshake initiates the cycle. There is no power button, no port, no setup screen. The mechanism is the gesture.
              </p>
            </div>
            <ol className="col-span-12 grid gap-px bg-b-line md:col-span-8 md:grid-cols-3">
              {[
                { n: "01", h: "Drop", b: "Submerges in any bottle. No alignment, no orientation." },
                { n: "02", h: "Shake", b: "Accelerometer-triggered cycle initiates. Solid-blue LED through the dome." },
                { n: "03", h: "Drink", b: "265 nm dose × 60 s. ≥ 3-log reduction across pathogens." },
              ].map((s, i) => (
                <li key={s.n} className="bg-b-bg p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-coral">{s.n}</div>
                  <div className="mt-8 text-[28px] font-medium leading-tight tracking-tightish">{s.h}</div>
                  <p className="mt-3 text-[14px] leading-[1.65] text-b-ink/70">{s.b}</p>
                  {i < 2 && <span className="mt-6 block font-mono text-[11px] text-b-mute">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Scroll-pinned exploded view */}
      <ExplodedReveal
        tone="dark"
        eyebrow="§ 01.5 — assembly diagram"
        title="Six components. Sealed for life."
        description="Scroll to disassemble. The aluminum unibody resolves into its parts — twin emitters, driver PCB, induction-charged battery."
      />

      {/* Technology hero */}
      <section className="relative overflow-hidden border-b border-b-line">
        <div className="bg-grid-faint absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-12 items-center gap-12 px-6 py-32">
          <div className="col-span-12 md:col-span-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">§ 02 — technology</div>
            <h3 className="mt-4 text-[48px] font-medium leading-[1.02] tracking-tightx md:text-[60px]">
              UV-C at 265 nm. The wavelength microbial DNA cannot survive.
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-b-ink/75">
              Twin geodesic emitters refract a 265 nm dose across twelve faces. Multi-directional coverage means there is no shadowed water — independently of bottle geometry.
            </p>
            <Link
              href="/technology"
              className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-b-coral hover:underline"
            >
              <span>Read the white paper</span>
              <span>→</span>
            </Link>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-b-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
              {[
                ["Pathogen", "B / V / P"],
                ["Reduction", "≥ 99.9%"],
                ["Compliance", "EPA · NSF/ANSI 55"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-b-mute">{k}</dt>
                  <dd className="mt-1 text-b-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Wave / dome diagram */}
          <div className="col-span-12 md:col-span-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-b-surface ring-1 ring-b-line">
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 -m-20 animate-glow rounded-full bg-b-coral/20" />
                  <div className="relative h-56 w-56 animate-spinslow">
                    <svg viewBox="0 0 200 200" className="h-full w-full">
                      <g fill="none" stroke="#E89B7C" strokeWidth="0.7" strokeOpacity="0.7">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <circle key={i} cx="100" cy="100" r={20 + i * 6} />
                        ))}
                      </g>
                      <g stroke="#F5F2EC" strokeOpacity="0.85" fill="none" strokeWidth="1">
                        <polygon points="100,12 168,52 168,148 100,188 32,148 32,52" />
                        <line x1="100" y1="12" x2="100" y2="188" />
                        <line x1="32" y1="52" x2="168" y2="148" />
                        <line x1="168" y1="52" x2="32" y2="148" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-b-mute">
                fig. 02 · multi-directional dose
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provenance — Designed in Scotland */}
      <section className="relative border-b border-b-line">
        <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/rocky-peaks.jpg"
            alt="The Old Man of Storr, Isle of Skye — first prototype field site"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-b-bg via-b-bg/40 to-b-bg/20" />
          <div className="bg-grid-faint absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-16 md:pb-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-b-coral">§ 02.5 — provenance</div>
            <h3 className="mt-4 max-w-3xl text-[44px] font-medium leading-[1.02] tracking-tightx md:text-[64px]">
              Designed in the
              <br />
              <span className="text-b-mute italic">Heart of Scotland.</span>
            </h3>
            <p className="mt-5 max-w-lg text-[14.5px] leading-[1.65] text-b-ink/80">
              Engineered and assembled in a workshop above the Firth of Forth. Prototype no. 003 was tested at the foot of the Storr — the first water it ever cleaned came out of a Highland burn.
            </p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-b-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
              <div>
                <dt className="text-b-mute">Workshop</dt>
                <dd className="mt-1 text-b-ink">Edinburgh, UK</dd>
              </div>
              <div>
                <dt className="text-b-mute">Validation</dt>
                <dd className="mt-1 text-b-ink">EPA · NSF/ANSI 55</dd>
              </div>
              <div>
                <dt className="text-b-mute">Field site</dt>
                <dd className="mt-1 text-b-ink">Isle of Skye</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Comparison — spec sheet */}
      <section className="border-b border-b-line">
        <div className="mx-auto max-w-[1280px] px-6 py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">§ 03 — benchmarks</div>
              <h3 className="mt-4 text-[44px] font-medium leading-tight tracking-tightx">
                Tested against the category.
              </h3>
            </div>
            <Link href="/compare" className="text-[13.5px] text-b-coral hover:underline">
              Full benchmark →
            </Link>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-b-line">
            <table className="w-full text-left text-[13.5px]">
              <thead className="bg-b-surface">
                <tr className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-b-mute">
                  <th className="px-5 py-4"></th>
                  <th className="px-5 py-4 text-b-coral">{BRAND}</th>
                  <th className="px-5 py-4">SteriPen</th>
                  <th className="px-5 py-4">LARQ</th>
                  <th className="px-5 py-4">Tablets</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-b-line">
                    <td className="px-5 py-4 text-b-mute">{row.label}</td>
                    <td className="px-5 py-4 font-medium text-b-ink">{row.lumen}</td>
                    <td className="px-5 py-4 text-b-ink/70">{row.steripen}</td>
                    <td className="px-5 py-4 text-b-ink/70">{row.larq}</td>
                    <td className="px-5 py-4 text-b-ink/70">{row.tabs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Field use — Waterfall photo + use case list */}
      <section className="border-b border-b-line">
        <div className="mx-auto max-w-[1280px] px-6 py-28">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-7">
              <div className="aspect-[3/2] w-full overflow-hidden rounded-3xl ring-1 ring-b-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/waterfall.jpg"
                  alt="Highland burn — log-reduction validation site"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-b-mute">
                <span className="block h-px w-6 bg-b-coral/60" />
                <span>fig. 04 · field validation site, Wester Ross</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">§ 04 — field use</div>
              <h3 className="mt-4 text-[40px] font-medium leading-[1.02] tracking-tightx md:text-[48px]">
                Built for everywhere a bottle goes.
              </h3>
              <p className="mt-6 max-w-md text-[14.5px] leading-[1.7] text-b-ink/75">
                Validated against the ten kinds of water our engineers couldn't otherwise drink. From hotel taps to glacial runoff — same cycle, same dose, same sixty seconds.
              </p>
              <ul className="mt-10 divide-y divide-b-line border-y border-b-line">
                {USE_CASES.map((u, i) => (
                  <li key={u.tag} className="flex items-baseline gap-4 py-4">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-b-coral min-w-[28px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-b-mute min-w-[80px]">
                      {u.tag}
                    </span>
                    <p className="text-[14px] leading-snug text-b-ink/85">{u.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Press quotes */}
      <section className="border-b border-b-line">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid gap-10 md:grid-cols-2">
            {PRESS_QUOTES.slice(0, 2).map((p) => (
              <figure key={p.source} className="rounded-3xl bg-b-surface p-8 ring-1 ring-b-line">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-b-coral">{p.source}</div>
                <blockquote className="mt-4 text-[24px] font-medium leading-snug tracking-tightish text-b-ink">
                  "{p.text}"
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-b-line">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-mute">§ 05 — answers</div>
              <h3 className="mt-4 text-[40px] font-medium leading-tight tracking-tightx">
                The short ones.
              </h3>
              <Link href="/help" className="mt-6 inline-block text-[13.5px] text-b-coral hover:underline">
                Full FAQ →
              </Link>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="divide-y divide-b-line rounded-3xl bg-b-surface ring-1 ring-b-line">
                {FAQS.slice(0, 4).map((f) => (
                  <details key={f.q} className="group p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                      <span className="text-[18px] font-medium leading-snug tracking-tightish">{f.q}</span>
                      <span className="font-mono text-b-mute transition group-open:rotate-45">＋</span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-[14px] leading-[1.7] text-b-ink/75">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="relative overflow-hidden">
        <div className="bg-grid-faint absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-12 gap-8 px-6 py-28">
          <div className="col-span-12 md:col-span-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-b-coral">// early access</div>
            <h3 className="mt-4 text-[48px] font-medium leading-[1.02] tracking-tightx">
              First batch ships
              <br />
              <span className="text-b-mute">from Edinburgh.</span>
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-b-ink/70">
              Validation data, engineering notes, and pre-order access — one email when units leave the workshop.
            </p>
          </div>
          <form className="col-span-12 flex items-end gap-3 md:col-span-6">
            <div className="flex-1">
              <label className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-b-mute">Email</label>
              <input
                placeholder="you@home.com"
                className="mt-2 w-full border-b border-b-line bg-transparent pb-3 text-[16px] placeholder:text-b-mute focus:border-b-coral focus:outline-none"
              />
            </div>
            <button className="rounded-full bg-b-coral px-6 py-3 text-[13.5px] font-medium text-b-bg hover:bg-b-coral/90">
              Submit
            </button>
          </form>
        </div>
      </section>

      <SiteFooter tone="dark" />
      <VariantToggle active="b" tone="dark" />
    </div>
  );
}
