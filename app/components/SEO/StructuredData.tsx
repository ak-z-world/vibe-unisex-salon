import { Branch } from "@/lib/branches";

interface LocalBusinessSchemaProps {
  branch: Branch;
}

interface OrganizationSchemaProps {
  siteUrl: string;
  branches: Branch[];
}

export function LocalBusinessSchema({ branch }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `https://vibeunisexsalon.in/branches/${branch.slug}#localbusiness`,
    name: branch.name,
    image: branch.featuredImageUrl,
    url: `https://vibeunisexsalon.in/branches/${branch.slug}`,
    telephone: branch.phone,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI",
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
    openingHours: ["Mo-Su 10:00-21:00"],
    sameAs: [branch.mapsLink],
    hasMap: branch.mapsLink,
    servesCuisine: undefined,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: branch.latitude,
        longitude: branch.longitude,
      },
      geoRadius: "5000",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema({
  siteUrl,
  branches,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Vibe Unisex Salon",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: ["https://www.instagram.com/vibe_unisex_salon4"],
    contactPoint: branches.map((b) => ({
      "@type": "ContactPoint",
      telephone: b.phone,
      contactType: "customer service",
      areaServed: b.city,
      availableLanguage: ["English", "Hindi", "Tamil", "Kannada", "Telugu"],
    })),
    location: branches.map((b) => ({
      "@type": "BeautySalon",
      name: b.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: b.city,
        addressCountry: "IN",
      },
      url: `${siteUrl}/branches/${b.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vibeunisexsalon.in/",
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
        name,
        item: `https://vibeunisexsalon.in/branches/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}