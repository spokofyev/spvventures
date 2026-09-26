import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "./site";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: site.title,
  description: site.description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Train agents for work that unfolds over time.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Train agents for work that unfolds over time.",
    description: site.description,
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
