import Link from "next/link";
import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { DeviceVisual } from "../components/DeviceVisual";

export const metadata = { title: "Shop — Forth" };

const PRODUCTS = [
  { handle: "forth-1", title: "Forth", subtitle: "The original sterilizer", price: "$39", body: "#1A2433", dome: "#C8D4DC", render: "/renderings/forth-device-frame-00.png" },
  { handle: "forth-1-coral", title: "Forth — Coral", subtitle: "Limited release", price: "$44", body: "#3F2424", dome: "#E89B7C", render: "/renderings/forth-device-coral-frame-00.png" },
  { handle: "forth-multi", title: "Forth × 2", subtitle: "Family pack", price: "$72", body: "#1A2433", dome: "#A6C7B6", render: "/renderings/forth-device-frame-00.png", renderTwo: true },
  { handle: "dome-replacement", title: "Replacement domes", subtitle: "Pack of 2", price: "$12", body: "#202020", dome: "#FFE6A1" },
  { handle: "travel-case", title: "Travel case", subtitle: "Felt-lined, magnetic", price: "$24", body: "#262626", dome: "#9DB7C6" },
  { handle: "induction-base", title: "Induction base", subtitle: "Spare charger", price: "$19", body: "#1F1F1F", dome: "#C8D4DC" },
];

export default function Shop() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Shop</Eyebrow>
        <H1>The lineup.</H1>
        <Lead>The original sterilizer, the accessories, and the combos people actually buy together.</Lead>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {PRODUCTS.map((p) => (
          <Link
            key={p.handle}
            href={`/shop/${p.handle}`}
            className="group rounded-3xl bg-white/50 p-5 ring-1 ring-black/5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-a-rule/40 to-a-bg">
              <div className="grid h-full place-items-center">
                {p.render && p.renderTwo ? (
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.render} alt="" aria-hidden className="absolute inset-0 h-full w-full object-contain translate-x-[22%] scale-[0.95]" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.render} alt={p.title} className="absolute inset-0 h-full w-full object-contain -translate-x-[12%]" />
                  </div>
                ) : p.render ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.render} alt={p.title} className="h-full w-full object-contain" />
                ) : (
                  <DeviceVisual className="h-[260px] w-auto" body={p.body} dome={p.dome} ink="#0F1B2D" glow={p.dome} />
                )}
              </div>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="font-serif text-[20px] tracking-tight">{p.title}</div>
                <div className="mt-0.5 text-[13px] text-neutral-500">{p.subtitle}</div>
              </div>
              <div className="text-[14px] font-medium text-neutral-900">{p.price}</div>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}