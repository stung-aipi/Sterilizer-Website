import { notFound } from "next/navigation";
import { PageShell, Eyebrow } from "../../components/PageShell";
import { DeviceVisual } from "../../components/DeviceVisual";
import { ProductImage } from "../../components/ProductImage";
import { SPECS } from "../../lib/brand";

const PRODUCTS: Record<string, { title: string; subtitle: string; price: string; body: string; dome: string; copy: string; render?: string; renderTwo?: boolean }> = {
  "forth-1": {
    title: "Forth",
    subtitle: "The original submersible UV-C sterilizer",
    price: "$39",
    body: "#1A2433",
    dome: "#C8D4DC",
    copy: "The complete kit: Forth, induction charging base, fabric travel pouch, and two-year warranty.",
    render: "/renderings/forth-device-frame-00.png",
  },
  "forth-1-coral": {
    title: "Forth — Coral",
    subtitle: "Limited colorway, 500 units",
    price: "$44",
    body: "#3F2424",
    dome: "#E89B7C",
    copy: "A warmer take on the original. Same internals, different mood.",
    render: "/renderings/forth-device-coral-frame-00.png",
  },
  "forth-multi": {
    title: "Forth × 2",
    subtitle: "For families, partners, gym bags",
    price: "$72",
    body: "#1A2433",
    dome: "#A6C7B6",
    copy: "Two units. One charging base. Save $6 versus singles.",
    render: "/renderings/forth-device-frame-00.png",
    renderTwo: true,
  },
  "dome-replacement": {
    title: "Replacement domes",
    subtitle: "Pack of 2",
    price: "$12",
    body: "#202020",
    dome: "#FFE6A1",
    copy: "The geodesic domes are the only consumable. Replace once a year for peak optical clarity.",
  },
  "travel-case": {
    title: "Travel case",
    subtitle: "Felt-lined, magnetic",
    price: "$24",
    body: "#262626",
    dome: "#9DB7C6",
    copy: "Slim case for the device, the base, and a spare set of domes.",
  },
  "induction-base": {
    title: "Induction base",
    subtitle: "Spare charger",
    price: "$19",
    body: "#1F1F1F",
    dome: "#C8D4DC",
    copy: "Keep one at home, one at the office. Magnetic alignment.",
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((handle) => ({ handle }));
}

export default function PDP({ params }: { params: { handle: string } }) {
  const p = PRODUCTS[params.handle];
  if (!p) notFound();

  return (
    <PageShell>
      <div className="grid grid-cols-12 gap-10">
        <section className="col-span-12 md:col-span-7">
          {p.render ? (
            <ProductImage src={p.render} alt={p.title} renderTwo={p.renderTwo} />
          ) : (
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-a-rule/40 to-a-bg ring-1 ring-black/5">
              <div className="grid h-full place-items-center">
                <DeviceVisual className="h-[520px] w-auto" body={p.body} dome={p.dome} ink="#0F1B2D" glow={p.dome} />
              </div>
            </div>
          )}
          <div className="mt-3 grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-neutral-100 ring-1 ring-black/5" />
            ))}
          </div>
        </section>

        <aside className="col-span-12 md:col-span-5 md:sticky md:top-24 md:self-start">
          <Eyebrow>{p.subtitle}</Eyebrow>
          <h1 className="mt-2 font-serif text-[44px] leading-tight tracking-tight">{p.title}</h1>
          <div className="mt-4 text-[20px] font-medium">{p.price}</div>
          <p className="mt-6 text-[15px] leading-[1.65] text-neutral-700">{p.copy}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-neutral-900 px-6 py-3 text-[14px] text-white">Add to cart</button>
            <button className="rounded-full bg-white px-6 py-3 text-[14px] ring-1 ring-black/10">Add free dome pack</button>
          </div>

          <div className="mt-10 rounded-2xl bg-neutral-50 p-5 text-[13.5px] ring-1 ring-black/5">
            <div className="grid grid-cols-2 gap-y-2">
              {Object.entries(SPECS).map(([k, v]) => (
                <div key={k} className="contents">
                  <span className="capitalize text-neutral-500">{k}</span>
                  <span className="text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-8 space-y-2 text-[13.5px] text-neutral-600">
            <li>· Free shipping on orders over $60</li>
            <li>· 30-day returns</li>
            <li>· 2-year warranty</li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
