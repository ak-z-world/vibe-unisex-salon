import type { Metadata } from "next";
import { getBranchBySlug, SALON_BRANCHES, nearbyAreas } from "@/lib/branches";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo-config";

// ─── Static params for all branch slugs ────────────────────────────────────
export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
}

// ─── Per-branch metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found | Vibe Unisex Salon",
      description: "This salon branch could not be found.",
    };
  }

  const title = `Vibe Unisex Salon ${branch.name} | Premium Salon in ${branch.neighborhood}, ${branch.city}`;
  const description = `Experience luxury hair, beauty & grooming at Vibe Unisex Salon ${branch.name}, ${branch.neighborhood}, ${branch.city}. Certified stylists, premium products, easy appointment booking. Call ${branch.phone}.`;
  const canonicalUrl = `${SITE_URL}/branches/${branch.slug}`;
  const extendedAreas = nearbyAreas[branch.slug] ?? [];

  return {
    title,
    description,
    keywords: [
      `Best salon in ${branch.neighborhood} ${branch.city}`,
      `Premium salon ${branch.city}`,
      `Luxury unisex salon ${branch.neighborhood}`,
      `Hair salon ${branch.neighborhood} ${branch.city}`,
      `Beauty salon ${branch.city}`,
      `Hair cut ${branch.neighborhood}`,
      `Hair spa ${branch.neighborhood}`,
      `Keratin treatment ${branch.neighborhood}`,
      `Hair coloring ${branch.neighborhood}`,
      `Bridal makeup ${branch.neighborhood}`,
      `Salon near me ${branch.neighborhood}`,
      `Vibe salon ${branch.city}`,
      ...extendedAreas.map((area) => `Salon near ${area} ${branch.city}`),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Vibe Unisex Salon",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: branch.featuredImageUrl || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `Vibe Unisex Salon — ${branch.name}, ${branch.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [branch.featuredImageUrl || DEFAULT_OG_IMAGE],
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
    other: {
      "geo.region": `IN-${branch.state === "Tamil Nadu" ? "TN" : branch.state}`,
      "geo.placename": `${branch.neighborhood}, ${branch.city}`,
      "geo.position": `${branch.latitude};${branch.longitude}`,
      ICBM: `${branch.latitude}, ${branch.longitude}`,
    },
  };
}

// ─── Layout shell ────────────────────────────────────────────────────────────
export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No additional wrapper needed — inherits RootLayout fonts/globals.
    // Keep it transparent so the branch page controls its own background.
    <>{children}</>
  );
}