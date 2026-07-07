import type { Metadata } from "next";
import LandingPage from "./components/landing/LandingPage";
import OfferPopup from "@/app/components/offers/OfferPopup";
import JsonLd from "@/app/components/SEO/JsonLd";
import { buildFAQSchema } from "@/lib/schema-generators";
import {
  SITE_URL,
  SITE_SHORT_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  ORG_AGGREGATE_RATING,
} from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
  description:
    "Vibe Unisex Salon — Chennai's finest premium salon for hair, beauty & grooming. Expert stylists, luxury products, 5 locations across Chennai. Book your appointment today.",
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
    description:
      "Experience luxury hair, beauty & grooming at Vibe Unisex Salon — Chennai's most trusted premium salon with 5 locations, 15,000+ happy clients, and a 4.9 rating.",
    url: SITE_URL,
    siteName: "Vibe Unisex Salon",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vibe Unisex Salon Chennai — Premium Luxury Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
    description: `Luxury hair, beauty & grooming at Vibe Unisex Salon, Chennai. 5 locations · ${ORG_AGGREGATE_RATING.reviewCount}+ clients · ${ORG_AGGREGATE_RATING.ratingValue} rating.`,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.0827;80.2707",
    ICBM: "13.0827, 80.2707",
  },
};

// Home page FAQ — complements the site-wide Organization schema mounted
// in the root layout. Kept here because it is page-specific content.
const homeFAQs = [
  {
    question: "Which is the best unisex salon in Chennai?",
    answer: `${SITE_SHORT_NAME} is widely regarded as one of the best premium unisex salons in Chennai, with 5 branches, certified stylists, and a ${ORG_AGGREGATE_RATING.ratingValue}-star rating from over ${ORG_AGGREGATE_RATING.reviewCount} happy clients.`,
  },
  {
    question: "Do you provide bridal makeup services in Chennai?",
    answer:
      "Yes, Vibe Salon offers comprehensive bridal makeup services in Chennai with certified bridal artists specialising in traditional and contemporary bridal looks.",
  },
  {
    question: "Do you offer keratin treatment in Chennai?",
    answer:
      "Yes, keratin treatment is one of the most popular services at Vibe Salon. We use professional-grade keratin solutions that eliminate frizz and keep hair smooth for months.",
  },
  {
    question: "Which areas in Chennai do Vibe Salon branches serve?",
    answer:
      "Vibe Unisex Salon has 5 branches across Chennai — Anna Nagar, T Nagar, Porur, Velachery, and Ekkatuthangal. Visit our Branches page to find your nearest location.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd id="home-faq-schema" data={buildFAQSchema(homeFAQs)} />

      <LandingPage />
      <OfferPopup />
    </>
  );
}