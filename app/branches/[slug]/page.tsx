import { notFound } from "next/navigation";
import { getBranchBySlug, SALON_BRANCHES } from "@/lib/branches";
import BranchDetailPage from "@/app/components/branch/BranchDetailPage";

// ─── Pre-render all branch slugs at build time ──────────────────────────────
export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
}

// ─── JSON-LD Structured Data builders ──────────────────────────────────────
function buildLocalBusinessSchema(branch: ReturnType<typeof getBranchBySlug>) {
  if (!branch) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `https://vibeunisexsalon.in/branches/${branch.slug}`,
    name: `Vibe Unisex Salon — ${branch.name}`,
    description: `Premium unisex salon in ${branch.neighborhood}, ${branch.city} offering luxury hair, beauty, and grooming services.`,
    url: `https://vibeunisexsalon.in/branches/${branch.slug}`,
    telephone: branch.phone,
    image: branch.featuredImageUrl,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: branch.state,
      postalCode: branch.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    },
    areaServed: {
      "@type": "Place",
      name: `${branch.neighborhood}, ${branch.city}`,
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
      opens: "10:00",
      closes: "21:00",
      description: branch.hours,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    hasMap: branch.mapsLink,
    parentOrganization: {
      "@type": "Organization",
      name: "Vibe Unisex Salon",
      url: "https://vibeunisexsalon.in",
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
}

function buildBreadcrumbSchema(branch: ReturnType<typeof getBranchBySlug>) {
  if (!branch) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vibeunisexsalon.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Branches",
        item: "https://vibeunisexsalon.in/branches",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${branch.name} — ${branch.city}`,
        item: `https://vibeunisexsalon.in/branches/${branch.slug}`,
      },
    ],
  };
}

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default async function BranchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) notFound();

  const localBusinessSchema = buildLocalBusinessSchema(branch);
  const breadcrumbSchema = buildBreadcrumbSchema(branch);

  return (
    <>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ── Branch Detail UI ── */}
      <BranchDetailPage branch={branch} />
    </>
  );
}