import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { COMPARE_ROWS, BRAND } from "../lib/brand";

export const metadata = { title: "Compare — Forth" };

export default function Compare() {
  return (
    <PageShell>
      <header>
        <Eyebrow>Compare</Eyebrow>
        <H1>The category, side by side.</H1>
        <Lead>
          We're transparent about where competitors win on a row. Credibility compounds.
        </Lead>
      </header>

      <section className="mt-16 overflow-hidden rounded-3xl ring-1 ring-black/10">
        <table className="w-full text-left text-[14.5px]">
          <thead className="bg-neutral-50">
            <tr className="text-[11.5px] uppercase tracking-[0.16em] text-neutral-500">
              <th className="px-6 py-5"></th>
              <th className="px-6 py-5 text-neutral-900">{BRAND}</th>
              <th className="px-6 py-5">SteriPen Ultra</th>
              <th className="px-6 py-5">LARQ Bottle</th>
              <th className="px-6 py-5">Aquatabs</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.label} className="border-t border-black/10">
                <td className="px-6 py-5 text-neutral-500">{row.label}</td>
                <td className="px-6 py-5 font-medium">{row.forth}</td>
                <td className="px-6 py-5 text-neutral-700">{row.steripen}</td>
                <td className="px-6 py-5 text-neutral-700">{row.larq}</td>
                <td className="px-6 py-5 text-neutral-700">{row.tabs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
