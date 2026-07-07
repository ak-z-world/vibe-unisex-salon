// lib/schema-generators.ts
// ─────────────────────────────────────────────────────────────────────────
// Typed JSON-LD builders shared by every page. Centralizing these removes
// drift between pages (the previous codebase had three different domains
// and three different phone numbers across duplicated inline schema
// blocks). Import the builder you need and pass it to <JsonLd />.
// ─────────────────────────────────────────────────────────────────────────

import type { Branch } from "@/lib/branches";
import type { ServiceCategory, ServiceItem } from "@/lib/services";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_PHONE,
  LOGO_URL,
  DEFAULT_OG_IMAGE,
  ORG_AGGREGATE_RATING,
  BRANCH_AGGREGATE_RATING,
  SOCIAL_LINKS,
  PRIMARY_CITY,
  PRIMARY_STATE,
} from "@/lib/seo-config";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQPair {
  question: string;
  answer: string;
}

const SALON_SERVICE_CATALOG = [
  "Hair Cut & Styling",
  "Hair Coloring",
  "Keratin Treatment",
  "Hair Spa",
  "Bridal Makeup",
  "Men's Grooming",
  "Facial Treatments",
  "Hair Smoothening",
];

// ─── Organization (site-wide) ───────────────────────────────────────────────
export function buildOrganizationSchema(branches: Branch[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Vibe Salon",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE,
    telephone: DEFAULT_PHONE,
    sameAs: Object.values(SOCIAL_LINKS),
    foundingLocation: {
      "@type": "Place",
      name: `${PRIMARY_CITY}, ${PRIMARY_STATE}, India`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ...ORG_AGGREGATE_RATING,
    },
    contactPoint: branches.map((b) => ({
      "@type": "ContactPoint",
      telephone: b.phone,
      contactType: "customer service",
      areaServed: b.city,
      availableLanguage: ["English", "Tamil", "Hindi", "Kannada", "Telugu"],
    })),
    department: branches.map((b) => ({
      "@type": "BeautySalon",
      "@id": `${SITE_URL}/branches/${b.slug}#localbusiness`,
      name: b.name,
      url: `${SITE_URL}/branches/${b.slug}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: b.city,
        addressRegion: b.state,
        postalCode: b.pincode,
        addressCountry: "IN",
      },
    })),
  };
}

// ─── WebSite + SearchAction (site-wide, put once in root layout) ───────────
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Per-branch LocalBusiness ───────────────────────────────────────────────
export function buildBranchLocalBusinessSchema(branch: Branch) {
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "BeautySalon"],
    "@id": `${SITE_URL}/branches/${branch.slug}#localbusiness`,
    name: `${SITE_NAME} — ${branch.name}`,
    description: `Premium unisex salon in ${branch.neighborhood}, ${branch.city} offering luxury hair, beauty, and grooming services including hair cut, hair coloring, keratin treatment, bridal makeup, and men's grooming.`,
    url: `${SITE_URL}/branches/${branch.slug}`,
    telephone: branch.phone,
    image: branch.featuredImageUrl,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: branch.latitude,
        longitude: branch.longitude,
      },
      geoRadius: "6000",
    },
    hasMap: branch.mapsLink,
    sameAs: [branch.mapsLink],
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
      closes: "21:00",
      description: branch.hours,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ...BRANCH_AGGREGATE_RATING,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${branch.name} Services`,
      itemListElement: SALON_SERVICE_CATALOG.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

// ─── Breadcrumb (any page) ──────────────────────────────────────────────────
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQ (any page) ──────────────────────────────────────────────────────────
export function buildFAQSchema(faqs: FAQPair[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

// ─── Standard FAQ content generator for a branch (AEO) ─────────────────────
export function buildBranchFAQs(branch: Branch): FAQPair[] {
  return [
    {
      question: `Where is Vibe Unisex Salon ${branch.name} located?`,
      answer: `Vibe Unisex Salon ${branch.name} is located at ${branch.address}, ${branch.neighborhood}, ${branch.city}, ${branch.state} ${branch.pincode}.`,
    },
    {
      question: `What are the working hours of the ${branch.neighborhood} branch?`,
      answer: `Our ${branch.neighborhood} branch in ${branch.city} is open ${branch.hours}.`,
    },
    {
      question: `Do I need an appointment at Vibe Salon ${branch.neighborhood}?`,
      answer:
        "Walk-ins are welcome at all times, but booking ahead is recommended for bridal makeup, keratin treatment, and hair spa sessions to avoid waiting during peak hours.",
    },
    {
      question: `Does Vibe Salon ${branch.neighborhood} offer bridal makeup services?`,
      answer:
        "Yes. We offer complete bridal makeup packages including a trial session, HD/airbrush makeup, and bridal hairstyling, available at every branch.",
    },
    {
      question: `Does Vibe Salon ${branch.neighborhood} offer keratin treatment?`,
      answer:
        "Yes, professional keratin smoothening is available at this branch using formulations suited to Indian hair textures, with results lasting several months.",
    },
    {
      question: `What is the contact number for Vibe Salon ${branch.name}?`,
      answer: `You can reach Vibe Unisex Salon ${branch.name} directly at ${branch.phone}.`,
    },
    {
      question: `Is Vibe Salon ${branch.neighborhood} suitable for men and kids?`,
      answer:
        "Yes, Vibe is a true unisex salon offering dedicated services for women, men, and children at every branch, including this one.",
    },
  ];
}

// ─── Service page schema (used by /services/[slug]) ────────────────────────
export function buildServiceCategorySchema(
  category: ServiceCategory,
  startingPrice: number,
  locations: readonly string[],
) {
  const allItems: ServiceItem[] = category.items
    ? category.items
    : (category.groups ?? []).flatMap((g) => g.items);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/services/${category.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: locations.map((loc) => ({
      "@type": "Place",
      name: `${loc}, ${PRIMARY_CITY}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${category.name} Price List`,
      numberOfItems: allItems.length,
      itemListElement: allItems.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        offers: item.price
          ? { "@type": "Offer", price: item.price, priceCurrency: "INR" }
          : item.variants?.map((v) => ({
              "@type": "Offer",
              name: v.label,
              price: v.price,
              priceCurrency: "INR",
            })),
      })),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: startingPrice,
      description: `${category.name} starting from ₹${startingPrice.toLocaleString("en-IN")}`,
      availability: "https://schema.org/InStock",
    },
  };
}
