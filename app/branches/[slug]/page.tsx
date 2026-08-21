import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBranchBySlug, SALON_BRANCHES } from "@/lib/branches";
import BranchDetailPage from "@/app/components/branch/BranchDetailPage";
import BranchLandmarks from "@/app/components/branch/BranchLandmarks";
import JsonLd from "@/app/components/SEO/JsonLd";
import {
  buildBranchLocalBusinessSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema-generators";
import { SITE_URL, SITE_NAME, SITE_LOCALE, DEFAULT_OG_IMAGE } from "@/lib/seo-config";

// ─── Pre-render all branch slugs at build time ──────────────────────────────
export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
}

// ─── Dynamic Metadata Generator ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: `Branch Not Found | ${SITE_NAME}`,
    };
  }

  const isComingSoon = branch.status === "coming_soon";

  const title = isComingSoon
    ? `Vibe Unisex Salon Virugambakkam | Opening September 1, 2026 | Luxury Salon Chennai`
    : `Vibe Unisex Salon ${branch.name} | Best Hair, Beauty & Grooming in ${branch.neighborhood}, ${branch.city}`;

  const description = isComingSoon
    ? `Vibe Unisex Salon is opening in Virugambakkam on September 1, 2026. Premium haircuts, hair spa, keratin treatments, and bridal makeup in Virugambakkam, Chennai. Pre-book your slot today.`
    : `Visit Vibe Unisex Salon in ${branch.neighborhood}, ${branch.city}. Top-rated haircuts, hair coloring, keratin treatments, hair spa, bridal makeup, and men's grooming at ${branch.address}. Call ${branch.phone}.`;

  const canonicalUrl = `${SITE_URL}/branches/${branch.slug}`;

  return {
    title,
    description,
    keywords: [
      `Vibe Salon ${branch.name}`,
      `Unisex Salon in ${branch.neighborhood}`,
      `Hair Salon ${branch.neighborhood}`,
      `Best Salon in ${branch.neighborhood}`,
      `Keratin Treatment ${branch.neighborhood}`,
      `Hair Spa ${branch.neighborhood}`,
      `Bridal Makeup ${branch.neighborhood}`,
      `Salon near ${branch.neighborhood} Chennai`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [
        {
          url: branch.featuredImageUrl || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `Vibe Unisex Salon ${branch.name} ${branch.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [branch.featuredImageUrl || DEFAULT_OG_IMAGE],
    },
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

  const localBusinessSchema = buildBranchLocalBusinessSchema(branch);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Branches", url: `${SITE_URL}/branches` },
    { name: `${branch.name} — ${branch.city}`, url: `${SITE_URL}/branches/${branch.slug}` },
  ]);

  return (
    <>
      {/* ── Structured Data ──
          Note: FAQPage schema is intentionally NOT duplicated here —
          BranchFAQ.tsx (rendered inside BranchDetailPage) already emits
          a FAQPage schema that matches its visible accordion content.
          A second FAQPage block on the same URL is invalid/conflicting
          structured data per Google's guidelines. */}
      <JsonLd id="branch-localbusiness-schema" data={localBusinessSchema} />
      <JsonLd id="branch-breadcrumb-schema" data={breadcrumbSchema} />

      {/* ── Branch Detail UI (unchanged) ── */}
      <BranchDetailPage branch={branch} />

      {/* ── Hidden geo/landmark SEO content (Phase 5 & 10, non-visual) ── */}
      <BranchLandmarks branch={branch} />
    </>
  );
}