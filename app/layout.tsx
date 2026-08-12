import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { EVENT } from "@/lib/constants";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    {
      path: "./fonts/inter-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/inter-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const montserrat = localFont({
  variable: "--font-montserrat",
  display: "swap",
  src: [
    {
      path: "./fonts/montserrat-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/montserrat-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/montserrat-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/montserrat-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

const anton = localFont({
  variable: "--font-anton",
  display: "swap",
  src: "./fonts/anton-400.woff2",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(EVENT.url),
  title: {
    default: `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
    template: `%s · ${EVENT.name} ${EVENT.year}`,
  },
  description: EVENT.description,
  keywords: [
    "Kingdom Entrepreneurs Summit",
    "Christian business conference",
    "faith-driven entrepreneurs",
    "kingdom business",
    "The Sovereign Entrepreneur",
    "business summit Ibadan",
    "free business conference Nigeria",
    "leadership summit 2026",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: EVENT.url,
    siteName: `${EVENT.name} ${EVENT.year}`,
    title: `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
    description: EVENT.description,
    images: [
      {
        url: new URL("/og.png", EVENT.url).toString(),
        width: 1200,
        height: 630,
        alt: `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
    description: EVENT.description,
    images: [new URL("/og.png", EVENT.url).toString()],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#031633",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${anton.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-charcoal-950 text-cream">
        {children}
      </body>
    </html>
  );
}
