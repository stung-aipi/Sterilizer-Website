import Link from "next/link";
import { BRAND, TAGLINE, SUBLINE, SPECS, COMPARE_ROWS, FAQS, USE_CASES, PRESS_QUOTES } from "./lib/brand";
import { HorizontalDeviceMark } from "./components/HorizontalDeviceMark";
import { Logomark } from "./components/Logomark";
import { DeviceCylinder } from "./components/DeviceCylinder";
import { VariantToggle } from "./components/VariantToggle";
import { SiteFooter } from "./components/SiteFooter";
import { ExplodedReveal } from "./components/ExplodedReveal";
import { HeroDeviceRotator } from "./components/HeroDeviceRotator";

export const metadata = {
  title: `${BRAND} — Clean water, in any bottle, in seconds.`,
  description: `${BRAND} is a submersible UV-C sterilizer the size of a marker. Designed and assembled in Scotland.`,
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
          <Link href="/" className="flex items-center text-a-ink" aria-label={BRAND}>
            <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
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

      {/* Hero — editorial split. */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-8 pb-24 pt-20 md:pt-28">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[12px] uppercase tracking-[0.18em] text-a-ink/60">UV-C · Designed in Scotland</div>
            <h1 className="mt-8 font-serif text-[56px] leading-[0.98] tracking-tightish text-a-ink md:text-[88px]">
              Clean water,
              <br />
              <span className="italic text-a-ink/85">in any bottle,</span>
              <br />
              in seconds.
            </h1>
            <p className="mt-8 max-w-md text-[16px] leading-[1.6] text-a-ink/75">
              {BRAND} is a submersible UV-C sterilizer the size of a marker. It drops into the bottle in your hand, activates on a shake, and neutralises 99.9% of bacteria, viruses, and protozoa in sixty seconds.
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

          <div className="col-span-12 flex justify-center md:col-span-5 md:justify-center">
            <div className="relative">
              <div className="absolute -inset-12 rounded-full bg-a-sage/15 blur-3xl" aria-hidden />
              {/* Cap halos — light with a faint blue hue behind the top and bottom caps */}
              <div
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-sky-200/55 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-sky-200/55 blur-3xl"
                aria-hidden
              />
              <HeroDeviceRotator alt={`${BRAND} sterilizer — 3D rendering`} />
            </div>
          </div>
        </div>

        {/* Quiet credentials strip */}
        <div className="border-y border-a-rule bg-a-bg/60">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 overflow-hidden px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-a-ink/55">
            <span>EPA-validated</span>
            <span className="hidden md:inline">87 × 22 mm · 32 g</span>
            <span>30 cycles / charge</span>
            <span className="hidden md:inline">2-year warranty</span>
            <span>Made in Scotland</span>
          </div>
        </div>
      </section>

      {/* Provenance — Designed in the Heart of Scotland */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/rocky-peaks.png"
            alt="The Old Man of Storr, Isle of Skye"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-[1240px] flex-col justify-end px-8 pb-16 md:pb-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">Provenance</div>
            <h2 className="mt-3 max-w-2xl font-serif text-[40px] leading-[1.05] tracking-tightish text-white md:text-[56px]">
              Designed in the
              <br />
              <span className="italic">Heart of Scotland.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-white/80">
              {BRAND} is engineered and assembled in a workshop above the Firth of Forth — the river it takes its name from, and the first water it ever cleaned.
            </p>
          </div>
        </div>
      </section>

      {/* The 30-second story */}
      <section className="mx-auto max-w-[1240px] px-8 py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/55">The thirty-second story</div>
            <h2 className="mt-4 font-serif text-[44px] leading-[1] tracking-tightish md:text-[56px]">
              Drop. Shake.<br /> Drink.
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.65] text-a-ink/70">
              Three motions. Sixty seconds, start to finish. No filters to change, no cartridges to replace, no plastic between you and the water.
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

      {/* Scroll-pinned exploded view */}
      <ExplodedReveal
        tone="light"
        eyebrow="Fig. 04 — Inside the cylinder"
        title="Six pieces. One sealed instrument."
        description="Scroll to disassemble. The body resolves into its components — every part engineered to never need replacing."
      />

      {/* Big product hero shot section */}
      <section className="bg-a-ink text-a-bg">
        <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-8 px-8 py-32">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-bg/55">The object</div>
            <h3 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-tightish md:text-[52px]">
              An instrument, not a gadget.
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-a-bg/75">
              An 87 × 22 mm cylinder of recycled aluminium, capped at each end by a faceted geodesic emitter. No buttons. No ports. No seams. Charged by induction; sealed for life. Eight components. One sealed instrument.
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
            <DeviceCylinder
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
                  <Logomark className="h-32 w-32 origin-center animate-spinslow text-a-ink/80" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/55">The technology, briefly</div>
            <h3 className="mt-4 font-serif text-[40px] leading-tight tracking-tightish">
              UV-C at 265 nanometres — the wavelength microbial DNA cannot survive.
            </h3>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-a-ink/70">
              Twin geodesic emitters refract dose across every face of the bottle. There is no shadowed water and no missed surface, regardless of bottle shape. Tested against E. coli, rotavirus, and Cryptosporidium. EPA log-reduction methods.
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

      {/* From the literature — peer-reviewed dossier */}
      <section className="border-t border-a-rule">
        <div className="mx-auto max-w-[1240px] px-8 py-28 md:py-32">
          <div className="grid grid-cols-12 gap-x-8 gap-y-14">
            <div className="col-span-12 md:col-span-5 md:pr-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/55">
                From the literature
              </div>
              <h2 className="mt-5 font-serif text-[40px] leading-[1.02] tracking-tightish md:text-[56px]">
                Cited,
                <br />
                <span className="italic text-a-ink/85">on the record.</span>
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-[1.7] text-a-ink/70">
                {BRAND} is built on a wavelength microbiology has been studying for sixty years. Three peer-reviewed papers, independently published, on the same 255–280 nm band the device operates within.
              </p>
              <div className="mt-10 hidden md:block">
                <div className="h-px w-16 bg-a-ink/40" />
                <p className="mt-5 max-w-xs font-serif text-[13.5px] italic leading-[1.55] text-a-ink/55">
                  A short bibliography. Open each paper and read it for yourself — we'd rather you didn't take our word.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <ol className="border-t border-a-ink/20">
                {[
                  {
                    id: "I",
                    finding:
                      "Across environmental and laboratory strains of E. coli and E. faecium, UV-C LEDs delivered up to six log₁₀ inactivation at fluences below 7 mJ/cm². The 265 nm band — the wavelength Forth operates within — produced the highest inactivation rate constant of any tested. No substantial photoreactivation was observed under light or dark conditions over eighteen hours.",
                    authors: "Sério, Santos, Martins et al.",
                    journal: "Scientific Reports — Nature",
                    year: "2026",
                    margin: "6 log₁₀",
                    marginLabel: "< 7 mJ/cm² fluence",
                    url: "https://www.nature.com/articles/s41598-026-44556-8",
                  },
                  {
                    id: "II",
                    finding:
                      "Four clinical strains of Legionella pneumophila — including chlorine-tolerant isolates — were inactivated by more than three log₁₀ across the 255, 265 and 280 nm bands at fluences between 0.5 and 34 mJ/cm². The lowest dose, at 255 nm, did the most work.",
                    authors: "Rasheduzzaman et al.",
                    journal: "Microorganisms (MDPI), 10(2), 352",
                    year: "2022",
                    margin: "> 3 log₁₀",
                    marginLabel: "Legionella, four strains",
                    url: "https://www.mdpi.com/2076-2607/10/2/352",
                  },
                  {
                    id: "III",
                    finding:
                      "Across three weeks of unsupervised operation in active hospital wards, a combined UV-C and ozone protocol delivered between 2.0- and 3.78-log₁₀ reductions across Gram-positive, Gram-negative, fungal and yeast surface pathogens.",
                    authors: "Sci. Total Environ.",
                    journal: "Elsevier",
                    year: "2023",
                    margin: "≥ 2 log₁₀",
                    marginLabel: "hospital pathogens",
                    url: "https://www.sciencedirect.com/science/article/pii/S0048969723025846",
                  },
                ].map((s) => (
                  <li
                    key={s.id}
                    className="grid grid-cols-12 gap-x-5 gap-y-4 border-b border-a-ink/20 py-9 md:py-10"
                  >
                    <div className="col-span-12 flex items-baseline gap-4 md:col-span-2 md:flex-col md:items-start md:gap-0">
                      <div className="font-serif text-[14px] italic text-a-ink/55">§&nbsp;{s.id}</div>
                      <div className="md:mt-5">
                        <div className="font-serif text-[26px] leading-none tracking-tightish text-a-ink md:text-[30px]">
                          {s.margin}
                        </div>
                        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-a-ink/50">
                          {s.marginLabel}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-10">
                      <p className="font-serif text-[19px] leading-[1.5] text-a-ink/90 md:text-[21px]">
                        <span className="font-serif italic text-a-ink/55">“</span>
                        {s.finding}
                        <span className="font-serif italic text-a-ink/55">”</span>
                      </p>
                      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-a-ink/55">
                        <span className="text-a-ink/75">{s.authors}</span>
                        <span aria-hidden className="text-a-ink/30">·</span>
                        <span>{s.journal}</span>
                        <span aria-hidden className="text-a-ink/30">·</span>
                        <span>{s.year}</span>
                      </div>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-baseline gap-2 text-[13.5px] text-a-ink/75 underline-offset-[5px] hover:text-a-ink hover:underline"
                      >
                        Read the paper
                        <span aria-hidden className="text-a-ink/45">↗</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-a-ink/45">
                Citations selected for direct relevance to {BRAND}'s 265 nm operating wavelength. No commercial relationship with any author or publisher.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tested at the source — Waterfall */}
      <section className="mx-auto max-w-[1240px] px-8 pb-28 pt-28">
        <div className="grid grid-cols-12 items-center gap-12">
          <div className="col-span-12 md:col-span-7">
            <div className="aspect-[3/2] w-full overflow-hidden rounded-3xl ring-1 ring-a-rule">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/waterfall.jpg"
                alt="Highland burn — testing site for Forth prototypes"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/55">Tested at the source</div>
            <h3 className="mt-4 font-serif text-[40px] leading-[1.05] tracking-tightish md:text-[44px]">
              Cleared against water that's never seen a tap.
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-a-ink/70">
              Every prototype is validated in burns, lochs, and the splash pools of the Cuillin. Standard EPA log-reduction protocols, applied to the ten kinds of water our engineers couldn't otherwise drink.
            </p>
            <Link
              href="/technology"
              className="mt-8 inline-block text-[14px] underline-offset-4 hover:underline"
            >
              Read the validation data →
            </Link>
          </div>
        </div>
      </section>

      {/* Where it lives — minimal text-only list, no empty placeholders */}
      <section className="border-y border-a-rule bg-a-bg/40">
        <div className="mx-auto max-w-[1240px] px-8 py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/55">Where it lives</div>
              <h3 className="mt-4 font-serif text-[32px] leading-tight tracking-tightish md:text-[36px]">
                Carried, not stored.
              </h3>
            </div>
            <ul className="col-span-12 grid grid-cols-1 gap-y-6 md:col-span-9 md:grid-cols-2 md:gap-x-12">
              {USE_CASES.map((u) => (
                <li key={u.tag} className="flex items-baseline gap-4 border-t border-a-rule pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-a-ink/55 min-w-[64px]">{u.tag}</span>
                  <p className="font-serif text-[18px] leading-snug text-a-ink/85">{u.line}</p>
                </li>
              ))}
            </ul>
          </div>
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
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-bg/55">Early access</div>
            <h3 className="mt-4 font-serif text-[44px] leading-[1.05] tracking-tightish">
              Pre-orders open
              <br />
              <span className="italic text-a-bg/85">this spring.</span>
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-a-bg/75">
              Leave us your address and we'll write once — when the first batch ships from Edinburgh.
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
