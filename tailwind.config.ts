import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        display: ["var(--font-grotesk)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Variant A — Editorial
        "a-bg": "#F7F4EE",
        "a-ink": "#0F1B2D",
        "a-sage": "#889E81",
        "a-rule": "#E5DFD2",
        // Variant B — Engineered (dark)
        "b-bg": "#0A0B0D",
        "b-surface": "#13151A",
        "b-ink": "#F5F2EC",
        "b-mute": "#7A7F8A",
        "b-coral": "#E89B7C",
        "b-line": "#22252C",
        // Variant C — Bright Modern
        "c-bg": "#FAF6F0",
        "c-ink": "#1A2332",
        "c-sun": "#F4D35E",
        "c-clay": "#E07A5F",
        "c-rule": "#EBE3D5",
      },
      letterSpacing: {
        tightish: "-0.015em",
        tightx: "-0.035em",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.55", filter: "blur(28px)" },
          "50%": { opacity: "0.85", filter: "blur(36px)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spinslow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        glow: "glow 3.4s ease-in-out infinite",
        rise: "rise .6s ease-out both",
        spinslow: "spinslow 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
