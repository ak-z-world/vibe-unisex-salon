import type { Metadata } from "next";
import { SALON_BRANCHES, getBranchBySlug, nearbyAreas } from "@/lib/branches";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found | Vibe Unisex Salon Chennai",
    };
  }

  const branchNearbyAreas = nearbyAreas[branch.slug] || [];

  return {
    title: `${branch.neighborhood} | Vibe Unisex Salon`,
    description: `Visit Vibe Unisex Salon at ${branch.address}. Expert hair salon, bridal makeup, hair spa, keratin treatment & beauty salon in ${branch.neighborhood}, Chennai. Call ${branch.phone}.`,
    keywords: [
      `Best Salon in ${branch.neighborhood}`,
      `Hair Salon in ${branch.neighborhood}`,
      `Beauty Salon in ${branch.neighborhood}`,
      `Bridal Makeup in ${branch.neighborhood}`,
      `Hair Spa in ${branch.neighborhood}`,
      `Keratin Treatment in ${branch.neighborhood}`,
      `Premium Salon in ${branch.neighborhood}`,
      `Unisex Salon ${branch.neighborhood} Chennai`,
      `Hair Color ${branch.neighborhood}`,
      `Men's Grooming ${branch.neighborhood}`,
      `Luxury Salon ${branch.neighborhood} Chennai`,
      ...branchNearbyAreas.map((a: string) => `Salon near ${a} Chennai`),
    ],
    alternates: {
      canonical: `https://vibe-unisex-salon.vercel.app/branches/${branch.slug}`,
    },
    openGraph: {
      title: `${branch.neighborhood} | Vibe Unisex Salon`,
      description: `Luxury hair & beauty salon in ${branch.neighborhood}, Chennai. Expert stylists, premium products, bridal makeup, keratin & more. ${branch.address}.`,
      url: `https://vibe-unisex-salon.vercel.app/branches/${branch.slug}`,
      siteName: "Vibe Unisex Salon Chennai",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: branch.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: `Vibe Unisex Salon ${branch.neighborhood} Chennai`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${branch.neighborhood} | Vibe Unisex Salon`,
      description: `Visit Vibe Unisex Salon in ${branch.neighborhood} — luxury hair cuts, colour, keratin, bridal makeup & more. ${branch.phone}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
