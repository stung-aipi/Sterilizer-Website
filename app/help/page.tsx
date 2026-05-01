import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { FAQS } from "../lib/brand";

export const metadata = { title: "Help — Forth" };

const CATEGORIES = ["Product", "Shipping", "Returns", "Warranty", "App"];

export default function Help() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Help & FAQ</Eyebrow>
        <H1>Answers, briefly.</H1>
        <Lead>
          Most things people ask, answered in under fifty words. For anything else, email support@forth.co — typical response is under 4 hours.
        </Lead>
      </header>

      <section className="mt-12 grid grid-cols-12 gap-10">
        <aside className="col-span-12 md:col-span-3">
          <div className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">Topics</div>
          <ul className="mt-4 space-y-2 text-[14px]">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <a className="hover:text-neutral-500" href="#">{c}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <div className="divide-y divide-black/10 rounded-3xl bg-neutral-50 ring-1 ring-black/5">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-serif text-[20px] leading-snug">{f.q}</span>
                  <span className="text-neutral-400 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.65] text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
