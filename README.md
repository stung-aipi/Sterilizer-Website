# Forth — Sterilizer Marketing Site (Concept Build)

Two home page concepts for the submersible UV-C sterilizer brand, with a switcher and dummy data on the rest of the pages. Built on Next.js 14 + Tailwind. Deploys to Vercel in one click.

The brand name `Forth` is the working candidate. Change it in one place: [`app/lib/brand.ts`](app/lib/brand.ts).

## The two concepts

| Concept | URL | Direction | Notes |
| --- | --- | --- | --- |
| **A — Editorial** | `/` | Aesop / restraint | Off-white, Fraunces serif display, sage accent, generous whitespace. Premium without luxury. |
| **B — Engineered** | `/option-b` | Oura / Eight Sleep | Near-black, Space Grotesk + JetBrains Mono spec callouts, soft coral glow, technical leader-line annotations. |

A pill at the bottom-center of each homepage flips between A and B.

The third concept (Bright Modern / Owala-style) was ruled out and removed.

## The locked logo

Logo direction is set to **Concept 4 — horizontal device with the wordmark inside the body** (PRD §5.4 add-on). The geodesic dome ends are rendered as concentric triangulated rings to match the actual product's faceting. The Identity Lab still exposes Concepts 1, 2, and 3 for comparison.

All three include every section from PRD §8.1: hero, 30-second story, product hero shot, why-it's-different, social proof, technology in 60s, use cases, FAQ, email capture, footer.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

The fastest path:

1. Push this repo to GitHub (the user's existing `Sterilizer-Website` repo works).
   ```bash
   git add -A && git commit -m "Initial concept site"
   git remote add origin git@github.com:cgmor/Sterilizer-Website.git   # if not already
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), pick the repo, accept all defaults — Vercel auto-detects Next.js.
3. Hit **Deploy**. You get a `*.vercel.app` URL in ~60 seconds.

Or via the Vercel CLI from inside this directory:
```bash
npx vercel
```

No environment variables are needed. The site is fully static (every page is prerendered HTML), which is the cheapest tier on Vercel and serves from their edge CDN.

## Where things live

```
app/
  page.tsx                  Home — Concept A (Editorial)
  option-b/page.tsx         Home — Concept B (Engineered)
  option-c/page.tsx         Home — Concept C (Bright Modern)
  how-it-works/             Dummy inner pages —
  technology/               all share a single neutral
  compare/                  shell so the homepages
  shop/                     remain the focus.
  shop/[handle]/
  about/  press/  help/  contact/  journal/
  components/
    VariantToggle.tsx       The A/B/C switcher (fixed, bottom)
    SiteNav.tsx             Header for inner pages
    SiteFooter.tsx
    DeviceVisual.tsx        Inline-SVG device illustration
    Logomark.tsx
    PageShell.tsx           Shared inner-page layout primitives
  lib/
    brand.ts                Brand name, tagline, FAQs,
                            comparison rows, use cases, specs.
                            Edit here to retitle / restock copy.
```

## What to do next

Once you've picked a direction:
1. Lock the brand name and update `BRAND` in `app/lib/brand.ts`.
2. Delete the two unused homepage files and rename the chosen one to `app/page.tsx`. Remove `VariantToggle` from the imports.
3. Replace the SVG `DeviceVisual` with real product photography in `public/`.
4. Wire up the email form to Klaviyo (one fetch handler in a server action — Klaviyo has a public list-subscribe endpoint).
5. If you stay on this stack for launch, consider Sanity or Shopify Hydrogen for content/commerce. The PRD recommends Shopify; this Next site is the right object for the Phase 1 / waitlist period (see PRD §6.1, §12.2).

## Tech notes

- Next.js 14 App Router, fully static export — every route generates as HTML at build time.
- Tailwind CSS for styling. Three palette sets are defined in [`tailwind.config.ts`](tailwind.config.ts) prefixed `a-`, `b-`, `c-`.
- Fonts loaded via `next/font/google`: Inter, Fraunces, Space Grotesk, JetBrains Mono.
- No external image hosting required — the device illustration is rendered as inline SVG.
- Reduced-motion users get static frames automatically.
