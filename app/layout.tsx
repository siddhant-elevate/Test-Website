import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/lib/theme-script";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elevateresearch.com"),
  title: {
    default: "Elevate Research — Independent Equity Research",
    template: "%s — Elevate Research",
  },
  description:
    "Elevate Research is an independent equity research platform publishing rigorous, conflict-free analysis on public companies, sectors, and markets.",
  openGraph: {
    title: "Elevate Research — Independent Equity Research",
    description:
      "Rigorous, conflict-free equity research for investors who read past the headline.",
    siteName: "Elevate Research",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevate Research — Independent Equity Research",
    description:
      "Rigorous, conflict-free equity research for investors who read past the headline.",
  },
  // Favicon / apple-touch-icon / OG image are handled automatically by
  // Next.js's file-convention icons: app/icon.png, app/apple-icon.png,
  // app/favicon.ico, app/opengraph-image.png.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0D14" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
