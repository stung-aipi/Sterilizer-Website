import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";

export const metadata = { title: "Contact — Lumen" };

export default function Contact() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Contact</Eyebrow>
        <H1>How to reach us.</H1>
        <Lead>
          Customer support: support@lumen.co · Press: press@lumen.co · Wholesale: wholesale@lumen.co · Mail: 11 East Crosscauseway, Edinburgh EH8 9HE.
        </Lead>
      </header>

      <section className="mt-16 max-w-2xl">
        <form className="grid gap-5">
          <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" placeholder="Your name" />
          <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" placeholder="Email address" />
          <textarea
            rows={6}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]"
            placeholder="What can we help with?"
          />
          <button className="w-fit rounded-full bg-neutral-900 px-6 py-3 text-[14px] text-white">Send message</button>
        </form>
      </section>
    </PageShell>
  );
}
