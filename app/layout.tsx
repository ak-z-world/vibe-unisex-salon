import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-unisex-salon.vercel.app"),
  title: {
    default: "Vibe Unisex Salon | Premium Hair & Beauty Care in India",
    template: "%s | Vibe Unisex Salon",
  },
  description:
    "Vibe Unisex Salon offers premium hair styling, skincare, makeup, and grooming services across 5 cities in India. Book your appointment today at T. Nagar, Indiranagar, Banjara Hills, Andheri, and Connaught Place.",
  keywords: [
    "unisex salon india",
    "premium salon chennai",
    "best hair salon bengaluru",
    "beauty salon hyderabad",
    "hair styling mumbai",
    "unisex salon delhi",
    "haircut near me",
    "salon near me",
  ],
  authors: [{ name: "Vibe Unisex Salon" }],
  creator: "Vibe Unisex Salon",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vibe-unisex-salon.vercel.app",
    siteName: "Vibe Unisex Salon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Unisex Salon – Premium Hair & Beauty Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vibeunisexsalon",
    creator: "@vibeunisexsalon",
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
      suppressHydrationWarning
    >
      <body className="bg-[#FAF8F5] text-[#1A1410] antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}