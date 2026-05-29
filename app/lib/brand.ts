// Working brand name — currently leading candidate from the naming sprint.
// Direction C (geographic / heritage) per PRD §5.3.
// Change this single constant to retitle the entire site.
export const BRAND = "Forth";

export const TAGLINE = "Clean water, in any bottle, in seconds.";
export const SUBLINE = "Drop it in. Shake. Drink.";

export const SPECS = {
  size: "87 × 22 mm",
  weight: "32 g",
  wavelength: "265 nm UV-C",
  cycle: "60 sec standard cycle",
  kill: "99.9% bacteria, viruses, protozoa",
  battery: "30 cycles per charge",
  charge: "Magnetic induction",
  fits: "Any bottle neck ≥ 25 mm",
  rating: "IPX8 fully waterproof",
  app: "Bluetooth LE · iOS & Android",
};

export const COMPARE_ROWS = [
  { label: "Form factor", forth: "Drop-in puck", steripen: "Handheld pen", larq: "Proprietary bottle", tabs: "Tablet" },
  { label: "Use any bottle", forth: "Yes", steripen: "Yes (stir)", larq: "No", tabs: "Yes" },
  { label: "Time to clean", forth: "60 sec", steripen: "90 sec stir", larq: "60 sec", tabs: "30 min" },
  { label: "Kills viruses", forth: "Yes", steripen: "Yes", larq: "Yes", tabs: "Partial" },
  { label: "App control", forth: "Yes", steripen: "No", larq: "Limited", tabs: "—" },
  { label: "Charging", forth: "Induction (waterproof)", steripen: "USB-C", larq: "USB-C", tabs: "—" },
  { label: "Lifetime cost", forth: "Replacement domes only", steripen: "Bulb replacements", larq: "Bottle lock-in", tabs: "Per-use cost" },
  { label: "Price", forth: "From $39", steripen: "$50–100", larq: "$95–130", tabs: "$0.50/dose" },
];

export const FAQS = [
  {
    q: "Does it really work in 60 seconds?",
    a: "Yes. Dual geodesic UV-C emitters at 265 nm deliver multi-directional dose across the bottle. A standard cycle achieves >99.9% reduction of bacteria, viruses, and protozoa — validated against EPA log-reduction protocols.",
  },
  {
    q: "Will it fit my bottle?",
    a: "Anything with a neck wider than about 25 mm. That covers the standard Nalgene, Hydro Flask wide-mouth, Owala, Yeti Rambler, most stainless and glass bottles, and many hotel-room glasses.",
  },
  {
    q: "What about sediment, lead, or PFAS?",
    a: "UV-C disinfects — it doesn't filter. For visibly cloudy water or known chemical contamination, pair Forth with a sediment filter. We're transparent about this on the How It Works page.",
  },
  {
    q: "How is it charged?",
    a: "Magnetic induction. There are no ports, buttons, or seams to leak — the entire device is fully waterproof. One charge is good for around 30 cycles.",
  },
  {
    q: "Is the app required?",
    a: "No. A shake activates the standard cycle. The app is for adjusting dose, intensity, scheduling reminders, and pairing additional units.",
  },
  {
    q: "Where do you ship?",
    a: "United States and United Kingdom at launch. EU and Canada to follow.",
  },
];

export const USE_CASES = [
  { tag: "At home", line: "Tap-to-bottle peace of mind for the morning rush." },
  { tag: "The office", line: "Building tap, communal kitchen, water cooler. Done while the kettle boils." },
  { tag: "The gym", line: "Clean refills at the fountain. No more plastic." },
  { tag: "Hotels", line: "Mini-bar water adds up. Tap water costs nothing." },
  { tag: "Travel", line: "Mexico City to Marrakech — your bottle, your water, no drama." },
  { tag: "Outdoors", line: "Streams, lakes, refill stops — disinfected in sixty seconds." },
];

export const PRESS_QUOTES = [
  { source: "Wired", text: "The first UV purifier that doesn't look like a 2008 medical device." },
  { source: "Outside", text: "Smaller than a marker, sharper than anything in its category." },
  { source: "Monocle", text: "A masterclass in restraint — confident hardware design." },
  { source: "T3", text: "Drop, shake, drink. It's that simple, and that good." },
];
