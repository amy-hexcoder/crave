import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Crave — Eat Finder",
  description: "Paste a list. Get a plan."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex items-end justify-between">
          <div>
            <h1 className="h1">Crave <span className="text-[var(--primary)] italic">App</span></h1>
            <p className="subtle">Ingestion-to-Itinerary for Michelin and curated lists</p>
          </div>
          <div className="hidden md:block text-xs text-white/70">
            v0.1 · MVP · Palo Alto
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 pb-24">{children}</main>
        <footer className="max-w-6xl mx-auto px-6 pb-10 text-xs text-white/50">
          © {new Date().getFullYear()} Crave
        </footer>
      </body>
    </html>
  );
}