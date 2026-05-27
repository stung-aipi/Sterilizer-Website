"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

function FaqItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-6 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-[20px] leading-snug">{q}</span>
        <span
          className="shrink-0 text-a-ink/40 transition-transform duration-300 ease-in-out"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          ＋
        </span>
      </button>

      {/* CSS grid trick: grid-template-rows 0fr → 1fr animates height smoothly */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.65] text-a-ink/70">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="divide-y divide-a-rule rounded-3xl bg-a-bg ring-1 ring-a-rule">
      {faqs.map((f) => (
        <FaqItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}