import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getBranchBySlug,
} from "@/lib/branches";

const SITE_URL = "https://vibeunisexsalon.in";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {

  const { slug } = await params;

  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found",
    };
  }

  const title = `${branch.name} | Best Unisex Salon in ${branch.neighborhood}, ${branch.city}`;

  const description =
    `Visit ${branch.name} in ${branch.neighborhood}, ${branch.city}. Professional haircuts, hair spa, keratin treatment, beard styling, bridal makeup, facials and premium beauty services.`;

  return {
    title,
    description,

    keywords: [
      branch.name,
      `${branch.neighborhood} salon`,
      `${branch.city} salon`,
      `best salon in ${branch.neighborhood}`,
      `best salon in ${branch.city}`,
      `unisex salon ${branch.neighborhood}`,
      `hair spa ${branch.neighborhood}`,
      `haircut ${branch.neighborhood}`,
      `facial ${branch.neighborhood}`,
      `bridal makeup ${branch.city}`,
      `beauty parlour ${branch.neighborhood}`,
      `salon near me`,
      `hair salon near me`,
      `${branch.city} beauty services`,
    ],

    alternates: {
      canonical: `${SITE_URL}/branches/${branch.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/branches/${branch.slug}`,
      type: "website",
      siteName: "Vibe Unisex Salon",
      images: [
        {
          url: branch.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: branch.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [branch.featuredImageUrl],
    },
  };
}

export default async function BranchLayout({
  children,
  params,
}: LayoutProps) {

  const { slug } = await params;

  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  return <>{children}</>;
}