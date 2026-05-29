import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";

export const metadata = { title: "Contact — Forth" };

function FloatField({
  id,
  label,
  type = "text",
}: {
  id: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="relative pt-6">
      <input
        id={id}
        type={type}
        placeholder=" "
        className="peer w-full border-b border-neutral-300 bg-transparent pb-2 pt-1 text-[15px] text-neutral-900 placeholder-transparent transition-colors focus:border-neutral-900 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 text-[14px] text-neutral-400 transition-all duration-200
                   peer-focus:-translate-y-5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-neutral-600
                   peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.14em]"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Contact</Eyebrow>
        <H1>How to reach us.</H1>
        <Lead>
          Customer support: support@forth.co · Press: press@forth.co · Wholesale: wholesale@forth.co · Mail: 11 East Crosscauseway, Edinburgh EH8 9HE.
        </Lead>
      </header>

      <section className="max-w-xl">
        <form className="grid gap-8">
          <FloatField id="contact-name" label="Your name" />
          <FloatField id="contact-email" label="Email address" type="email" />

          <div className="relative pt-6">
            <textarea
              id="contact-message"
              rows={5}
              placeholder=" "
              className="peer w-full resize-none border-b border-neutral-300 bg-transparent pb-2 pt-1 text-[15px] text-neutral-900 placeholder-transparent transition-colors focus:border-neutral-900 focus:outline-none"
            />
            <label
              htmlFor="contact-message"
              className="pointer-events-none absolute left-0 top-6 text-[14px] text-neutral-400 transition-all duration-200
                         peer-focus:-translate-y-5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-neutral-600
                         peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.14em]"
            >
              What can we help with?
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-full bg-neutral-900 px-8 py-3 text-[14px] tracking-tight text-white transition-opacity hover:opacity-80"
            >
              Send message
            </button>
          </div>
        </form>
      </section>
    </PageShell>
  );
}