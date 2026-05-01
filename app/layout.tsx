import type { Metadata } from "next";
import { Inter, Fraunces, Space_Grotesk, JetBrains_Mono, Urbanist } from "next/font/google";
import { BRAND } from "./lib/brand";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["100", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND} — Clean water, in any bottle, in seconds`,
  description:
    "A submersible UV-C water sterilizer that drops into any bottle and disinfects in 60 seconds. Drop. Shake. Drink.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${grotesk.variable} ${mono.variable} ${urbanist.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
