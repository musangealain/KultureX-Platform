import type { Metadata } from "next";
import Link from "next/link";
import { Space_Mono, Syne } from "next/font/google";
import { NAV_ITEMS } from "@/lib/navigation";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-copy",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "KultureX",
  description: "KultureX: youth culture platform for skate, fashion, events, and creators"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${spaceMono.variable}`}>
        <div className="ambient-bg">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
        </div>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand-mark">
              <span className="brand-k">KX</span>
              <span className="brand-name">KultureX</span>
            </Link>
            <nav className="site-nav" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="page-shell">{children}</main>
          <footer className="site-footer">
            <p>KultureX digital culture system: stories, skate scenes, drops, live events, and creator identity.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
