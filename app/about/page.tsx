import { PageShell, Eyebrow, H1, H2, Lead } from "../components/PageShell";

export const metadata = { title: "About — Forth" };

export default function About() {
  return (
    <PageShell>
      <header>
        <Eyebrow>About</Eyebrow>
        <H1>A small company solving a small but real problem.</H1>
        <Lead>
          Forth was started in Edinburgh in 2024 after one too many trips spent rationing bottled water. Our mission is straightforward: make safe drinking water available wherever a bottle is.
        </Lead>
      </header>

      <section className="mt-20 grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-7 space-y-10">
          <div>
            <H2>Why we built it.</H2>
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
              The category had two products: a 2008-era pen that looks like a medical device, and a $130 bottle that locks you into one container. Neither felt right. The insight was simple — if the sterilizer is small enough, it can drop into the bottle the user already loves.
            </p>
          </div>
          <div>
            <H2>Where we're going.</H2>
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
              The sterilizer is the first product in a category — not a single SKU. Replacement domes, travel cases, and a B2B offering for hotels and humanitarian distribution are on the roadmap. We are deliberately patient about expansion.
            </p>
          </div>
          <div>
            <H2>Contact.</H2>
            <p className="mt-4 text-[16px] leading-[1.7] text-neutral-700">
              Forth Ltd · 11 East Crosscauseway, Edinburgh EH8 9HE · hello@forth.co
            </p>
          </div>
        </div>
        <aside className="col-span-12 md:col-span-5">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-50 ring-1 ring-black/5" />
          <div className="mt-3 text-[12.5px] uppercase tracking-[0.16em] text-neutral-500">Nicolas Luvisutto · Founder</div>
        </aside>
      </section>
    </PageShell>
  );
}
