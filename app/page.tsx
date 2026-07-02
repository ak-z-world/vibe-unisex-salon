import type { Metadata } from "next";
import LandingPage from "./components/landing/LandingPage";
import { OrganizationSchema } from "./components/SEO/StructuredData";
import { SALON_BRANCHES } from "@/lib/branches";
import OfferPopup from "@/app/components/offers/OfferPopup";

export const metadata: Metadata = {
  title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
  description:
    "Vibe Unisex Salon — Chennai's finest premium salon for hair, beauty & grooming. Expert stylists, luxury products, 5 locations across Chennai. Book your appointment today.",
  keywords: [
    "Best Unisex Salon in Chennai",
    "Premium Salon Chennai",
    "Luxury Salon Chennai",
    "Hair Salon Chennai",
    "Beauty Salon Chennai",
    "Hair Cut Chennai",
    "Hair Spa Chennai",
    "Keratin Treatment Chennai",
    "Hair Coloring Chennai",
    "Bridal Makeup Chennai",
    "Facial Treatment Chennai",
    "Mens Grooming Chennai",
    "Professional Hairstylist Chennai",
    "Hair Smoothening Chennai",
    "Hair Care Chennai",
    "Best hair salon near me in Chennai",
    "Luxury unisex salon in Chennai",
    "Premium hair styling salon Chennai",
    "Best bridal makeup artist Chennai",
    "Best keratin treatment salon Chennai",
    "Hair spa and facial packages Chennai",
  ],
  alternates: {
    canonical: "https://www.vibeunisexsalon.in",
  },
  openGraph: {
    title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
    description:
      "Experience luxury hair, beauty & grooming at Vibe Unisex Salon — Chennai's most trusted premium salon with 5 locations, 15,000+ happy clients, and a 4.9 rating.",
    url: "https://www.vibeunisexsalon.in",
    siteName: "Vibe Unisex Salon",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.vibeunisexsalon.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Unisex Salon Chennai — Premium Luxury Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Premium Unisex Salon in Chennai | Vibe Salon",
    description:
      "Luxury hair, beauty & grooming at Vibe Unisex Salon, Chennai. 5 locations · 15,000+ clients · 4.9 rating.",
    images: ["https://www.vibeunisexsalon.in/og-image.png"],
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

// Structured data for FAQ (complements OrganizationSchema)
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best unisex salon in Chennai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vibe Unisex Salon is widely regarded as one of the best premium unisex salons in Chennai, with 5 branches, certified stylists, and a 4.9-star rating from over 15,000 happy clients.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide bridal makeup services in Chennai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Vibe Salon offers comprehensive bridal makeup services in Chennai with certified bridal artists specialising in traditional and contemporary bridal looks.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer keratin treatment in Chennai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, keratin treatment is one of the most popular services at Vibe Salon. We use professional-grade keratin solutions that eliminate frizz and keep hair smooth for months.",
      },
    },
    {
      "@type": "Question",
      name: "Which areas in Chennai do Vibe Salon branches serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vibe Unisex Salon has 5 branches across Chennai. Contact us to find your nearest premium salon location.",
      },
    },
  ],
};

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Vibe Unisex Salon",
  description:
    "Premium unisex salon in Chennai offering luxury hair, beauty, and grooming services including hair cut, hair coloring, keratin treatment, bridal makeup, and men's grooming.",
  url: "https://www.vibeunisexsalon.in",
  telephone: "+919876543210",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
  areaServed: {
    "@type": "City",
    name: "Chennai",
    "@id": "https://www.wikidata.org/wiki/Q1352",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "15000",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "20:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vibe Salon Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Cut & Styling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Coloring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Keratin Treatment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Spa" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridal Makeup" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Men's Grooming" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facial Treatments" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Smoothening" } },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema
        siteUrl="https://www.vibeunisexsalon.in"
        branches={SALON_BRANCHES}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />

      <LandingPage />
      <OfferPopup />
    </>
  );
}