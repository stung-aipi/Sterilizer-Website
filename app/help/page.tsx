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

      <section className="grid grid-cols-12 gap-10">
        <aside className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-3">Topics</div>
          <div className="flex flex-wrap gap-2 md:flex-col md:gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                className={`rounded-full px-4 py-2 text-[13px] tracking-tight transition-colors text-left ${
                  i === 0
                    ? "bg-a-ink text-a-bg"
                    : "bg-a-rule/60 text-neutral-700 hover:bg-a-rule"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <div className="divide-y divide-black/10 rounded-3xl bg-white/60 ring-1 ring-black/5">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-serif text-[20px] leading-snug">{f.q}</span>
                  <span className="shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.65] text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}