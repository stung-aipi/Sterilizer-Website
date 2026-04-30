import Link from "next/link";
import { PageShell, Eyebrow, H1, H2, Lead } from "../components/PageShell";
import { DeviceVisual } from "../components/DeviceVisual";
import { SPECS, BRAND } from "../lib/brand";

export const metadata = { title: "How It Works — Lumen" };

export default function HowItWorks() {
  return (
    <PageShell>
      <header>
        <Eyebrow>How it works</Eyebrow>
        <H1>Three motions. Sixty seconds. No mystery.</H1>
        <Lead>
          The product is technical. The interface is not. Drop {BRAND} into your bottle, give it a shake, and drink. Everything else is doing its job inside the dome.
        </Lead>
      </header>

      <section className="mt-20 grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-7 space-y-12">
          {[
            { n: "01", h: "Drop it in", b: "The 87 × 22 mm cylinder fits any bottle with a neck wider than 25 mm. That includes the standard Nalgene, Hydro Flask wide-mouth, Owala, Yeti Rambler, most stainless and glass bottles, and many hotel-room glasses." },
            { n: "02", h: "Shake to start", b: "An accelerometer detects the shake gesture and fires the standard 60-second cycle. The device pulses blue while running. No buttons, no ports, no apps required for the basic cycle." },
            { n: "03", h: "Drink", b: "Twin geodesic emitters refract 265 nm UV-C across twelve faces of the bottle. The result is multi-directional dose with no shadowed water. ≥ 99.9% reduction of bacteria, viruses, and protozoa." },
            { n: "04", h: "Charge by induction", b: "Drop the device on the magnetic base when you're not using it. There is no charging port — there is no way for water to get in. A full charge gives you about 30 cycles." },
          ].map((s) => (
            <div key={s.n}>
              <div className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">step {s.n}</div>
              <H2>{s.h}</H2>
              <p className="mt-3 max-w-xl text-[16px] leading-[1.65] text-neutral-700">{s.b}</p>
            </div>
          ))}
        </div>
        <aside className="col-span-12 md:col-span-5">
          <div className="sticky top-24 rounded-3xl bg-neutral-50 p-8 ring-1 ring-black/5">
            <DeviceVisual className="mx-auto h-[420px] w-auto" body="#1A2433" dome="#C8D4DC" glow="#7FB3FF" ink="#0F1B2D" />
            <dl className="mt-6 space-y-3 text-[13.5px]">
              {Object.entries(SPECS).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-t border-black/5 pt-2 first:border-0 first:pt-0">
                  <dt className="text-neutral-500 capitalize">{k}</dt>
                  <dd className="text-right text-neutral-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <section className="mt-24 rounded-3xl bg-neutral-50 p-10 ring-1 ring-black/5">
        <Eyebrow>Honesty section</Eyebrow>
        <H2>What it doesn't do.</H2>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.65] text-neutral-700">
          UV-C disinfects — it doesn't filter. Lumen will not remove sediment, heavy metals, PFAS, or chlorine. For visibly cloudy or chemically contaminated water, pair Lumen with a sediment filter. We build trust by being clear about this.
        </p>
        <Link href="/technology" className="mt-6 inline-block text-[14px] underline-offset-4 hover:underline">
          Read the full technology page →
        </Link>
      </section>
    </PageShell>
  );
}
