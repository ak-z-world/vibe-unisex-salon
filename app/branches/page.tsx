import type { Metadata } from "next";
import BranchListingPage from "@/app/components/branch/BranchListingPage";
import { SALON_BRANCHES } from "@/lib/branches";

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: "Best Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
  description:
    "Vibe Unisex Salon has 5 premium branches across Chennai — Anna Nagar, T Nagar, Ekkatuthangal, Porur & Velachery. Luxury hair salon, bridal makeup, hair spa, keratin & more. Book today!",
  keywords: [
    "Best Unisex Salon Chennai",
    "Premium Salon Chennai",
    "Hair Salon Chennai",
    "Luxury Salon Chennai",
    "Bridal Makeup Chennai",
    "Hair Spa Chennai",
    "Hair Color Chennai",
    "Keratin Treatment Chennai",
    "Beauty Salon Chennai",
    "Vibe Unisex Salon Chennai",
    "Unisex Salon Branches Chennai",
    "Best Hair Salon Chennai",
  ],
  alternates: {
    canonical: "https://www.vibeunisexsalon.in/branches",
  },
  openGraph: {
    title: "Best Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
    description:
      "5 luxury salon branches across Chennai — expert stylists, premium products, bridal specialists. Visit Vibe Unisex Salon at Anna Nagar, T Nagar, Ekkatuthangal, Porur or Velachery.",
    url: "https://www.vibeunisexsalon.in/branches",
    siteName: "Vibe Unisex Salon Chennai",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
    description:
      "5 luxury salon branches across Chennai. Hair cuts, colour, keratin, bridal makeup, hair spa & more. Book at Vibe Unisex Salon today.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/* ─── Structured Data ─── */
function generateStructuredData() {
  const localBusinesses = SALON_BRANCHES.map((branch) => ({
    "@type": ["LocalBusiness", "BeautySalon", "HairSalon"],
    "@id": `https://www.vibeunisexsalon.in/branches/${branch.slug}`,
    name: `Vibe Unisex Salon ${branch.name}`,
    url: `https://www.vibeunisexsalon.in/branches/${branch.slug}`,
    telephone: branch.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: branch.address.match(/\d{6}/)?.[0] || "600001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    openingHours: ["Mo-Sa 10:00-21:00", "Su 10:00-21:00"],
    priceRange: "₹₹",
    image: branch.featuredImageUrl,
    hasMap: branch.mapsLink,
    servesCuisine: [],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Hair Cutting", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hair Colouring", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bridal Makeup", value: true },
      { "@type": "LocationFeatureSpecification", name: "Keratin Treatment", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hair Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Men's Grooming", value: true },
    ],
  }));

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vibeunisexsalon.in" },
      { "@type": "ListItem", position: 2, name: "Branches", item: "https://www.vibeunisexsalon.in/branches" },
    ],
  };

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many Vibe Unisex Salon branches are there in Chennai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vibe Unisex Salon has 5 premium branches in Chennai — Anna Nagar, T Nagar, Ekkatuthangal, Porur, and Velachery.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Vibe Unisex Salon offer in Chennai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vibe Unisex Salon offers hair cutting and styling, hair colour, keratin treatment, hair spa, bridal makeup, facial treatments, and men's grooming across all Chennai branches.",
        },
      },
      {
        "@type": "Question",
        name: "Is Vibe Salon suitable for bridal makeup in Chennai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Vibe Unisex Salon is one of the best bridal makeup studios in Chennai, with a dedicated team experienced in South Indian, North Indian, Christian, and fusion wedding looks.",
        },
      },
    ],
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [...localBusinesses, breadcrumb, faqSchema],
  });
}

/* ─── Page ─── */
export default function BranchesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />
      <BranchListingPage />
    </>
  );
}