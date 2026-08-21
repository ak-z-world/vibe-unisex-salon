import type { Metadata } from "next";
import BranchListingPage from "@/app/components/branch/BranchListingPage";
import { SALON_BRANCHES } from "@/lib/branches";

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: "Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
  description:
    "Explore Vibe Unisex Salon branches across Chennai — Anna Nagar, T. Nagar, Ekkatuthangal, Porur, Velachery, and Virugambakkam (opening Sept 1, 2026). Luxury haircuts, hair spa, keratin treatments, and bridal makeup.",
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
    "Unisex Salon Virugambakkam",
  ],
  alternates: {
    canonical: "https://vibeunisexsalon.in/branches",
  },
  openGraph: {
    title: "Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
    description:
      "Luxury salon branches across Chennai — expert stylists, premium products, bridal specialists. Visit Vibe Unisex Salon at Anna Nagar, T. Nagar, Ekkatuthangal, Porur, Velachery, or Virugambakkam.",
    url: "https://vibeunisexsalon.in/branches",
    siteName: "Vibe Unisex Salon Chennai",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Unisex Salon Branches in Chennai | Vibe Unisex Salon",
    description:
      "Luxury salon branches across Chennai. Hair cuts, colour, keratin, bridal makeup, hair spa & more. Book at Vibe Unisex Salon today.",
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
    "@id": `https://vibeunisexsalon.in/branches/${branch.slug}`,
    name: `Vibe Unisex Salon ${branch.name}`,
    url: `https://vibeunisexsalon.in/branches/${branch.slug}`,
    telephone: branch.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: branch.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    },
    openingHours: branch.status === "coming_soon" ? undefined : ["Mo-Sa 10:00-21:00", "Su 10:00-21:00"],
    priceRange: "₹₹",
    image: branch.featuredImageUrl,
    hasMap: branch.mapsLink,
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vibeunisexsalon.in/" },
      { "@type": "ListItem", position: 2, name: "Branches", item: "https://vibeunisexsalon.in/branches" },
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
          text: "Vibe Unisex Salon operates 5 active branches in Chennai (Anna Nagar, T. Nagar, Ekkatuthangal, Porur, and Velachery) and is opening its 6th branch in Virugambakkam on September 1, 2026.",
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