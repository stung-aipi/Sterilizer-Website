import Link from "next/link";
import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { DeviceVisual } from "../components/DeviceVisual";

export const metadata = { title: "Shop — Lumen" };

const PRODUCTS = [
  { handle: "lumen-1", title: "Lumen", subtitle: "The original sterilizer", price: "$39", body: "#1A2433", dome: "#C8D4DC" },
  { handle: "lumen-1-coral", title: "Lumen — Coral", subtitle: "Limited release", price: "$44", body: "#3F2424", dome: "#E89B7C" },
  { handle: "lumen-multi", title: "Lumen × 2", subtitle: "Family pack", price: "$72", body: "#1A2433", dome: "#A6C7B6" },
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

      <section className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link
            key={p.handle}
            href={`/shop/${p.handle}`}
            className="group rounded-3xl bg-neutral-50 p-6 ring-1 ring-black/5 transition hover:bg-white hover:shadow-lg"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-100 to-white">
              <div className="grid h-full place-items-center">
                <DeviceVisual className="h-[260px] w-auto" body={p.body} dome={p.dome} ink="#0F1B2D" glow={p.dome} />
              </div>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="font-serif text-[20px] tracking-tight">{p.title}</div>
                <div className="text-[13px] text-neutral-500">{p.subtitle}</div>
              </div>
              <div className="text-[14px] font-medium">{p.price}</div>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
