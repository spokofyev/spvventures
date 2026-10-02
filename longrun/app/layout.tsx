import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { asset, site } from "./site";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(new URL(site.url).origin),
  alternates: { canonical: site.url },
  title: site.title,
  description: site.description,
  icons: { icon: asset("/favicon.svg"), shortcut: asset("/favicon.svg") },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Train agents for work that unfolds over time.",
    description: site.description,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Train agents for work that unfolds over time." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Train agents for work that unfolds over time.",
    description: site.description,
    images: [`${site.url}/og.png`],
  },
};

export const viewport: Viewport = { themeColor: "#05070d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
