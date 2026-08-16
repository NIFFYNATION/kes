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

const META_TITLE = "KES 2026 | The Sovereign Entrepreneur";
const META_DESCRIPTION =
  "Join KES 2026 in Ibadan for a free gathering of faith-driven entrepreneurs building with purpose, influence and legacy.";

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  const candidate = configuredUrl || vercelHost || EVENT.url;

  try {
    return new URL(
      /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`,
    );
  } catch {
    return new URL(EVENT.url);
  }
}

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: META_TITLE,
    template: `%s | KES ${EVENT.year}`,
  },
  description: META_DESCRIPTION,
  alternates: { canonical: "/" },
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
    url: metadataBase,
    siteName: `${EVENT.name} ${EVENT.year}`,
    title: META_TITLE,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
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
