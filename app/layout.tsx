import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/lib/constants";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} ${EVENT.year} — ${EVENT.theme}`,
    description: EVENT.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070718",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-charcoal-950 text-cream">
        {children}
      </body>
    </html>
  );
}
