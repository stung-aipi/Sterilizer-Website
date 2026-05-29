import { PageShell, Eyebrow, H1, H2, Lead } from "../components/PageShell";
import { Logomark } from "../components/Logomark";

export const metadata = { title: "The Technology — Forth" };

export default function Technology() {
  return (
    <PageShell>
      <header>
        <Eyebrow>The Technology</Eyebrow>
        <H1>UV-C, refracted across twelve faces.</H1>
        <Lead>
          Forth is a 12-faceted geodesic UV-C emitter with multi-directional dose distribution. This page covers the science, the engineering, and the patent.
        </Lead>
      </header>

      <section className="mt-20 grid grid-cols-12 items-start gap-10">
        <div className="col-span-12 md:col-span-7">
          <H2>The wavelength: 265 nanometres.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            UV light at 265 nm is the precise wavelength that disrupts microbial DNA. It is the same mechanism municipalities use to treat drinking water at scale, miniaturized into a 32 g cylinder. Independent of bottle material, water clarity, or temperature, the dose-to-kill relationship is well characterized: at &gt; 40 mJ/cm² across the bottle's interior surface, you achieve ≥ 3-log reduction across bacteria, viruses, and protozoa.
          </p>
          <H2 className="mt-12">The engineering.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            Twin geodesic emitters at each end of the device project UV-C through twelve refractive facets. The geometry was optimized in simulation against bottle archetypes (Nalgene, Hydro Flask, soda bottle, hotel glass) to eliminate shadowed water — the failure mode of single-emitter pens.
          </p>
          <H2 className="mt-12">The patent.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            Patent application <span className="font-mono text-[14.5px]">GB 24/00000.0</span> — Multi-directional submersible UV-C disinfection device with geodesic refraction. Filed at the UK IPO; PCT pending.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="aspect-square w-full rounded-3xl bg-neutral-50 ring-1 ring-black/5">
            <div className="grid h-full place-items-center">
              <div className="relative h-48 w-48 animate-spinslow">
                <Logomark className="h-full w-full text-neutral-800" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-center text-[11.5px] uppercase tracking-[0.18em] text-neutral-500">
            fig. 02 · multi-directional dose
          </div>
        </div>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-black/10 md:grid-cols-3">
        {[
          { k: "Dose at center", v: "60 mJ/cm²", note: "with 750 ml clear water at 20 °C" },
          { k: "Log reduction", v: "≥ 3.0", note: "B / V / P (bacteria, viruses, protozoa)" },
          { k: "Cycle time", v: "60 seconds", note: "standard cycle, app-adjustable" },
          { k: "Power draw", v: "0.3 Wh / cycle", note: "induction-charged Li-ion cell" },
          { k: "Materials", v: "Recycled aluminum + PETG dome", note: "domes are user-replaceable" },
          { k: "Compliance", v: "EPA · NSF/ANSI 55", note: "third-party validated" },
        ].map((row) => (
          <div key={row.k} className="bg-white p-7">
            <div className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">{row.k}</div>
            <div className="mt-3 font-serif text-[28px]">{row.v}</div>
            <p className="mt-2 text-[13.5px] text-neutral-600">{row.note}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
