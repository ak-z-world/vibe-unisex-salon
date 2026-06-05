import { notFound } from "next/navigation";
import { SALON_BRANCHES, getBranchBySlug, nearbyAreas } from "@/lib/branches";
import BranchDetailPage from "@/app/components/branch/BranchDetailPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
}

function generateStructuredData(branch: ReturnType<typeof getBranchBySlug>) {
  if (!branch) return "";

  const branchNearbyAreas = nearbyAreas[branch.slug] || [];
  
  const localBusiness = {
    "@type": ["LocalBusiness", "BeautySalon", "HairSalon"],
    "@id": `https://vibe-unisex-salon.vercel.app/branches/${branch.slug}`,
    name: `Vibe Unisex Salon ${branch.name}`,
    url: `https://vibe-unisex-salon.vercel.app/branches/${branch.slug}`,
    telephone: branch.phone,
    image: branch.featuredImageUrl,
    description: `Premium unisex salon in ${branch.neighborhood}, Chennai offering hair cutting, colouring, keratin treatment, bridal makeup, hair spa, facials and men's grooming.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹",
    hasMap: branch.mapsLink,
    areaServed: [
      { "@type": "City", name: "Chennai" },
      ...branchNearbyAreas.map((area: string) => ({
        "@type": "Place",
        name: `${area}, Chennai`,
      })),
    ],
    makesOffer: [
      "Hair Cutting and Styling",
      "Hair Colouring",
      "Balayage",
      "Keratin Smoothening",
      "Hair Spa",
      "Bridal Makeup",
      "Facial Treatments",
      "Men's Grooming",
    ].map((name) => ({
      "@type": "Offer",
      name,
      areaServed: `${branch.neighborhood}, Chennai`,
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vibe-unisex-salon.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Branches",
        item: "https://vibe-unisex-salon.vercel.app/branches",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${branch.name} Branch`,
        item: `https://vibe-unisex-salon.vercel.app/branches/${branch.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where is Vibe Unisex Salon ${branch.neighborhood} located?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Vibe Unisex Salon ${branch.neighborhood} is located at ${branch.address}, Chennai.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the opening hours of Vibe Salon ${branch.neighborhood}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Vibe Salon ${branch.neighborhood} is open Monday to Saturday 9:00 AM to 9:00 PM and Sunday 10:00 AM to 7:00 PM.`,
        },
      },
      {
        "@type": "Question",
        name: `What services does Vibe Salon ${branch.neighborhood} offer?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Vibe Salon ${branch.neighborhood} offers hair cutting, hair colour, keratin treatment, hair spa, bridal makeup, facial treatments, and men's grooming.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I book an appointment at Vibe Salon ${branch.neighborhood}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Call ${branch.phone} or walk in during business hours. Weekend bookings are recommended in advance.`,
        },
      },
    ],
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [localBusiness, breadcrumb, faqSchema],
  });
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData(branch) }}
      />
      <BranchDetailPage branch={branch} />
    </>
  );
}
