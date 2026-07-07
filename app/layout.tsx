import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import JsonLd from "@/app/components/SEO/JsonLd";
import WebSiteSchema from "@/app/components/SEO/WebSiteSchema";
import { buildOrganizationSchema } from "@/lib/schema-generators";
import { SALON_BRANCHES } from "@/lib/branches";
import {
  SITE_URL,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  THEME_COLOR,
  BACKGROUND_COLOR,
  DEFAULT_KEYWORDS,
} from "@/lib/seo-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: THEME_COLOR,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} | Premium Hair & Beauty Care in Chennai`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Beauty & Personal Care",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_SHORT_NAME,
  },
  openGraph: {
    title: `Best Premium Unisex Salon in Chennai | ${SITE_SHORT_NAME}`,
    description:
      "Experience luxury hair, beauty & grooming at Vibe Unisex Salon — 5 branches across Chennai.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Best Premium Unisex Salon in Chennai | ${SITE_SHORT_NAME}`,
    description: "Luxury hair, beauty & grooming across 5 Chennai branches.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
  other: {
    "theme-color": THEME_COLOR,
    "msapplication-TileColor": BACKGROUND_COLOR,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning>
      <body className="bg-[#FAF8F5] text-[#1A1410] antialiased font-sans">
        {/* Site-wide structured data — emitted once, referenced by @id from
            every page-level schema (Organization, WebSite). */}
        <JsonLd
          id="organization-schema"
          data={buildOrganizationSchema(SALON_BRANCHES)}
        />
        <WebSiteSchema />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}