import Link from "next/link";
import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";

export const metadata = { title: "Journal — Forth" };

const POSTS = [
  { slug: "uv-c-explained", title: "UV-C, briefly: the wavelength microbial DNA can't survive", date: "Apr 2026", read: "6 min" },
  { slug: "mexico-city-water-guide", title: "A water guide for Mexico City — what's safe, what's not", date: "Mar 2026", read: "9 min" },
  { slug: "vs-steripen", title: "Why we built Forth instead of buying a SteriPen", date: "Feb 2026", read: "5 min" },
  { slug: "patent-walkthrough", title: "Inside the patent: the geodesic refractor explained", date: "Jan 2026", read: "11 min" },
];

export default function Journal() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Journal</Eyebrow>
        <H1>Notes from the field, the lab, and the road.</H1>
        <Lead>Long-form writing on water, travel, and engineering.</Lead>
      </header>

      <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href="#"
            className="group rounded-3xl bg-neutral-50 p-7 ring-1 ring-black/5 transition hover:bg-white"
          >
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100" />
            <div className="mt-5 flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-neutral-500">
              <span>{p.date}</span><span>·</span><span>{p.read}</span>
            </div>
            <h3 className="mt-2 font-serif text-[24px] leading-tight">{p.title}</h3>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
