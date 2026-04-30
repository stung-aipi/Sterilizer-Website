import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { PRESS_QUOTES } from "../lib/brand";

export const metadata = { title: "Press — Lumen" };

export default function Press() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Press</Eyebrow>
        <H1>For media and editorial.</H1>
        <Lead>
          High-resolution photography, founder bio, fact sheet, and brand guidelines — all in one zip. For interview requests, email press@lumen.co.
        </Lead>
        <div className="mt-8 flex gap-3">
          <a href="#" className="rounded-full bg-neutral-900 px-5 py-3 text-[14px] text-white">Download press kit (.zip)</a>
          <a href="mailto:press@lumen.co" className="rounded-full bg-white px-5 py-3 text-[14px] ring-1 ring-black/10">press@lumen.co</a>
        </div>
      </header>

      <section className="mt-20">
        <Eyebrow>In the media</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {PRESS_QUOTES.map((p) => (
            <figure key={p.source} className="rounded-2xl bg-neutral-50 p-6 ring-1 ring-black/5">
              <div className="text-[12px] uppercase tracking-[0.16em] text-neutral-500">{p.source}</div>
              <blockquote className="mt-3 font-serif text-[18px] leading-snug">"{p.text}"</blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Eyebrow>Press releases</Eyebrow>
        <ul className="mt-6 divide-y divide-black/10">
          {[
            { date: "Mar 2026", h: "Lumen opens UK and US pre-orders" },
            { date: "Feb 2026", h: "Lumen closes seed round led by Founders Fund" },
            { date: "Jan 2026", h: "Lumen unveils submersible UV-C sterilizer at CES" },
          ].map((r) => (
            <li key={r.h} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <div className="text-[12px] uppercase tracking-[0.16em] text-neutral-500">{r.date}</div>
                <div className="mt-1 font-serif text-[20px]">{r.h}</div>
              </div>
              <a href="#" className="text-[14px] underline-offset-4 hover:underline">Read →</a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
