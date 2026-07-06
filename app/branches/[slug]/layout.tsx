import type { Metadata } from "next";
import { getBranchBySlug, SALON_BRANCHES } from "@/lib/branches";

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
  const canonicalUrl = `https://vibeunisexsalon.in/branches/${branch.slug}`;

  return {
    title,
    description,
    keywords: [
      `Best salon in ${branch.neighborhood} ${branch.city}`,
      `Premium salon ${branch.city}`,
      `Luxury unisex salon ${branch.neighborhood}`,
      `Hair salon ${branch.neighborhood} ${branch.city}`,
      `Beauty salon ${branch.city}`,
      `Hair cut ${branch.city}`,
      `Hair spa ${branch.city}`,
      `Keratin treatment ${branch.city}`,
      `Hair coloring ${branch.city}`,
      `Bridal makeup ${branch.city}`,
      `Salon near me ${branch.neighborhood}`,
      `Vibe salon ${branch.city}`,
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
          url: branch.featuredImageUrl,
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
      images: [branch.featuredImageUrl],
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
      "geo.region": `IN-${branch.state}`,
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