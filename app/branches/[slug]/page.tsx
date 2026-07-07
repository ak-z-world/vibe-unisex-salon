import { notFound } from "next/navigation";
import { getBranchBySlug, SALON_BRANCHES } from "@/lib/branches";
import BranchDetailPage from "@/app/components/branch/BranchDetailPage";
import BranchLandmarks from "@/app/components/branch/BranchLandmarks";
import JsonLd from "@/app/components/SEO/JsonLd";
import {
  buildBranchLocalBusinessSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema-generators";
import { SITE_URL } from "@/lib/seo-config";

// ─── Pre-render all branch slugs at build time ──────────────────────────────
export async function generateStaticParams() {
  return SALON_BRANCHES.map((branch) => ({ slug: branch.slug }));
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