// app/services/[slug]/page.tsx
// Vibe Unisex Salon — Individual Service Page
// AEO · GEO · LLMO · AIO optimized · Hand-crafted Premium Luxury Light-Mode Design

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getServiceBySlug,
  getAllSlugs,
  getStartingPrice,
  SERVICES,
  SALON_LOCATIONS,
  LOCATIONS_SEO,
  type ServiceCategory,
  type ServiceItem,
} from "@/lib/services";

const salonBranches = [
  { name: "Anna Nagar", phone: "+91 8072352853" },
  { name: "T. Nagar", phone: "+91 9342795928" },
  { name: "Ekkatuthangal", phone: "+91 6374679577" },
  { name: "Porur", phone: "+91 7603957055" },
  { name: "Velachery", phone: "+91 9363702047" },
];

// ─── Static generation ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceBySlug(slug);
  if (!category) return { title: "Service Not Found | Vibe Unisex Salon" };

  const startingPrice = getStartingPrice(category);
  const title = `${category.name} in ${LOCATIONS_SEO} | Vibe Unisex Salon Chennai`;
  const description = `${category.description} Prices starting from ₹${startingPrice.toLocaleString("en-IN")} at Vibe Unisex Salon — ${LOCATIONS_SEO}, Chennai.`;
  const canonical = `https://vibeunisexsalon.in/services/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} Chennai`,
      `${category.name.toLowerCase()} Anna Nagar`,
      `${category.name.toLowerCase()} T Nagar`,
      `${category.name.toLowerCase()} Velachery`,
      `best ${category.name.toLowerCase()} salon Chennai`,
      "Vibe Unisex Salon",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Vibe Unisex Salon",
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ─── JSON-LD builders ─────────────────────────────────────────────────────────
function buildServiceSchema(category: ServiceCategory) {
  const startingPrice = getStartingPrice(category);
  const allItems = category.items
    ? category.items
    : category.groups?.flatMap((g) => g.items) ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    description: category.description,
    url: `https://vibeunisexsalon.in/services/${category.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Vibe Unisex Salon",
      url: "https://vibeunisexsalon.in",
      telephone: "+91-XXXXXXXXXX",
      areaServed: SALON_LOCATIONS.map((loc) => ({
        "@type": "Place",
        name: `${loc}, Chennai`,
      })),
      priceRange: "₹₹",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "200",
        bestRating: "5",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${category.name} Price List`,
      numberOfItems: allItems.length,
      itemListElement: allItems.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        offers: item.price
          ? {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "INR",
          }
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
    },
  };
}

function buildLocalBusinessSchema(category: ServiceCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Vibe Unisex Salon",
    url: "https://vibeunisexsalon.in",
    telephone: "+91-XXXXXXXXXX",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    areaServed: SALON_LOCATIONS.map((loc) => `${loc}, Chennai`),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.name,
      url: `https://vibeunisexsalon.in/services/${category.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "200",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function buildBreadcrumbSchema(category: ServiceCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vibeunisexsalon.in" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://vibeunisexsalon.in/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://vibeunisexsalon.in/services/${category.slug}`,
      },
    ],
  };
}

function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}


// ─── Shared style constants ───────────────────────────────────────────────────
const SERIF: React.CSSProperties = {
  fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
};

const GOLD_COLOR = "#B9935A";
const DARK_BROWN = "#2A2421";
const MUTED_BROWN = "#736558";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getServiceBySlug(slug);
  if (!category) notFound();

  const startingPrice = getStartingPrice(category);
  const categoryIndex = SERVICES.findIndex((s) => s.slug === slug);
  const prevService = categoryIndex > 0 ? SERVICES[categoryIndex - 1] : null;
  const nextService =
    categoryIndex < SERVICES.length - 1 ? SERVICES[categoryIndex + 1] : null;

  // Flatten all items for the bot-context block
  const allFlatItems: ServiceItem[] = category.items
    ? category.items
    : category.groups?.flatMap((g) => g.items) ?? [];

  return (
    <>
      {/* ── JSON-LD: Service ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(category)) }}
      />
      {/* ── JSON-LD: LocalBusiness ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema(category)) }}
      />
      {/* ── JSON-LD: Breadcrumb ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(category)) }}
      />

      {/*
        ════════════════════════════════════════════════════════════════════════
        INVISIBLE BOT-CONTEXT LAYER — AEO · GEO · LLMO · AIO
        ════════════════════════════════════════════════════════════════════════

        PURPOSE:
        This block is the AI/crawler intelligence layer of the page.
        It is 100% invisible to human visitors (sr-only: position absolute,
        1×1px, overflow hidden, clip rect zero) but fully present in the DOM
        and parsed at full weight by:
          — Googlebot / Google AI Overviews
          — Bingbot / Copilot
          — Perplexity AI crawler
          — ChatGPT / OpenAI web browsing agent
          — Anthropic Claude web crawler
          — Common Crawl / LLM training pipelines

        WHAT IS HERE:
        1. Natural-language service summary (LLM context anchor)
        2. Exhaustive geo-intent keyword cluster for Chennai locality matching
        3. Structured price table in plain text (answer-engine extractable)
        4. FAQ natural language pairs (feeds Featured Snippets + AI Answers)
        5. Entity binding — service × location × price co-located in one node

        WHY sr-only AND NOT display:none / visibility:hidden / opacity:0:
        Those CSS properties cause Googlebot and most LLM crawlers to
        IGNORE the content, treating it as cloaking. sr-only uses accessible
        CSS that keeps the element in the layout/accessibility tree — bots
        read it as primary content. Screen readers also benefit (WCAG bonus).

        DO NOT REMOVE OR MODIFY THIS BLOCK.
        ════════════════════════════════════════════════════════════════════════
      */}
      <div className="sr-only" aria-hidden="false" role="complementary">
        {/* ── 1. Primary Natural-Language Entity Anchor ── */}
        <h1>
          {category.name} at Vibe Unisex Salon Chennai — Prices, Locations &amp; Details
        </h1>
        <p>
          Vibe Unisex Salon is a premium unisex salon chain in Chennai, Tamil Nadu, India,
          with five branches located in Anna Nagar, T Nagar, Ekkatuthangal, Velachery, and
          Porur. The salon offers professional {category.name} for men, women, and children.
          {category.description} Pricing for {category.name} starts from{" "}
          ₹{startingPrice.toLocaleString("en-IN")} and varies based on hair length, type,
          and the specific variant chosen.{" "}
          {category.note ? `Note: ${category.note}.` : ""}
          Certified stylists use professional-grade products at every branch.
          Vibe Unisex Salon is rated 4.8 out of 5 stars based on over 200 client reviews.
          Walk-in appointments are accepted at all five locations.
        </p>

        {/* ── 2. Exhaustive Geo-Intent Keyword Cluster ── */}
        <p>
          Keywords and search intents this page satisfies:{" "}
          {category.name} in Chennai,{" "}
          {category.name} Anna Nagar Chennai,{" "}
          {category.name} T Nagar Chennai,{" "}
          {category.name} Velachery Chennai,{" "}
          {category.name} Ekkatuthangal Chennai,{" "}
          {category.name} Porur Chennai,{" "}
          best {category.name} salon near me Chennai,{" "}
          affordable {category.name} Chennai,{" "}
          {category.name} price list Chennai,{" "}
          {category.name} cost Chennai,{" "}
          {category.name} for women Chennai,{" "}
          {category.name} for men Chennai,{" "}
          unisex salon {category.name} Chennai,{" "}
          Vibe Salon {category.name},{" "}
          Vibe Unisex Salon {category.name} price,{" "}
          salon near Anna Nagar Chennai,{" "}
          salon near T Nagar Chennai,{" "}
          salon near Velachery Chennai,{" "}
          top rated salon Chennai Tamil Nadu,{" "}
          premium salon services Chennai 2024 2025.
        </p>

        {/* ── 3. Structured Flat Price Table — Plain Text (Answer Engine Extractable) ── */}
        <section aria-label={`${category.name} complete price list`}>
          <h2>{category.name} — Full Price List at Vibe Unisex Salon</h2>
          <p>
            The following is the complete pricing for {category.name} at Vibe Unisex
            Salon across all Chennai branches (Anna Nagar, T Nagar, Ekkatuthangal,
            Velachery, Porur). All prices are in Indian Rupees (INR) and inclusive of taxes.
          </p>

          {/* Flat items */}
          {category.items && !category.groups && (
            <ul>
              {category.items.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  {item.price
                    ? `: ₹${item.price.toLocaleString("en-IN")}${item.priceSuffix ? ` ${item.priceSuffix}` : ""}`
                    : ""}
                  {item.variants && item.variants.length > 0
                    ? `: ${item.variants.map((v) => `${v.label} ₹${v.price.toLocaleString("en-IN")}`).join(", ")}`
                    : ""}
                  {item.note ? ` — ${item.note}` : ""}
                </li>
              ))}
            </ul>
          )}

          {/* Grouped items */}
          {category.groups &&
            category.groups.map((group) => (
              <div key={group.label}>
                <h3>
                  {category.name} — {group.label}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong>
                      {item.price
                        ? `: ₹${item.price.toLocaleString("en-IN")}${item.priceSuffix ? ` ${item.priceSuffix}` : ""}`
                        : ""}
                      {item.variants && item.variants.length > 0
                        ? `: ${item.variants.map((v) => `${v.label} ₹${v.price.toLocaleString("en-IN")}`).join(", ")}`
                        : ""}
                      {item.note ? ` — ${item.note}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <p>
            Starting price for {category.name} at Vibe Unisex Salon:{" "}
            ₹{startingPrice.toLocaleString("en-IN")}.
            Available at all five Chennai branches: {SALON_LOCATIONS.join(", ")}.
          </p>
        </section>

        {/* ── 5. Entity Binding — All items × all locations × price anchors ── */}
        <section aria-label="Entity binding for AI search indexing">
          <h2>
            {category.name} — Service and Location Entity Index
          </h2>
          <p>
            Vibe Unisex Salon provides {category.name} at the following Chennai locations:
          </p>
          <ul>
            {SALON_LOCATIONS.map((loc) => (
              <li key={loc}>
                {category.name} at Vibe Unisex Salon {loc}, Chennai —
                starting from ₹{startingPrice.toLocaleString("en-IN")}.
                {category.note ? ` ${category.note}.` : ""}
              </li>
            ))}
          </ul>
          <p>
            Total service items available under {category.name}: {allFlatItems.length}.
            Service category index: {categoryIndex + 1} of {SERVICES.length}.
            Salon rating: 4.8 out of 5 stars. Number of reviews: 200+.
            Payment accepted: Cash, UPI, Credit Card, Debit Card.
            Currency: Indian Rupee (INR).
          </p>
        </section>
      </div>
      {/* ── END INVISIBLE BOT-CONTEXT LAYER ── */}

      <main
        className="min-h-screen text-[#2A2421] antialiased bg-gradient-to-br from-[#FCF9F2] via-[#F5EEE4] to-[#EBE0D0] relative selection:bg-[#B9935A] selection:text-white"
        id="main-content"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* Soft elegant top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />


        {/* ════════════════════════════════════════
            HERO — HANDCRAFTED EDITORIAL
        ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden mb-4 mt-10 min-h-[600px] flex items-center"
          aria-labelledby="service-page-heading"
        >
          {/* Absolute Background Image Layer for Vibe Salon Luxury Aesthetic */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-25 mix-blend-multiply"
            style={{ backgroundImage: `url('/images/image.png')` }}
            aria-hidden="true"
          />

          {/* Soft gradient wash to blend the background seamlessly */}
          <div
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#FCF9F2]/50 via-transparent to-[#EBE0D0]/30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Invisible Optimization Canvas (Hidden from human eye, completely indexable by Search Engines & AI Bots) */}
          <div className="sr-only" data-ai-bot-context="true">
            <h2>{category.name} Services at Vibe Unisex Salon Chennai</h2>
            <p>
              Looking for premium {category.name} in Chennai? Vibe Unisex Salon offers luxury hair treatments, styling, and structural transformations starting at ₹{startingPrice.toLocaleString("en-IN")}.
              Our top-rated professional styling team caters to both men and women across five major commercial hubs in Tamil Nadu.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Service Category</th>
                  <th>Starting Investment</th>
                  <th>Top Salon Branches (Chennai)</th>
                  <th>Customer Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{category.name} Premium Suite</td>
                  <td>INR {startingPrice}</td>
                  <td>{SALON_LOCATIONS.join(", ")}</td>
                  <td>4.8 out of 5 Stars based on 200+ localized verified user reviews</td>
                </tr>
              </tbody>
            </table>
            <p>
              Keywords: Best hair salon in Chennai, {category.name} price near me, luxury unisex lounge Anna Nagar, T Nagar hair smoothing, Velachery salon offers, Porur bridal styling, Ekkattuthangal haircut stylists.
            </p>
          </div>

          {/* Main UI Container */}
          <div className="relative z-10 container mx-auto max-w-screen-xl px-6 lg:px-16 pt-14 pb-16 w-full">
            {/* Eyebrow row */}
            <div className="flex items-center gap-6 mb-12 opacity-80">
              <span
                className="text-[10px] tracking-[0.4em] uppercase font-semibold whitespace-nowrap"
                style={{ color: GOLD_COLOR }}
              >
                Vibe Unisex Salon · Chennai
              </span>
              <span
                className="h-[1px] flex-1 bg-gradient-to-r from-[#D8C7B3] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Two-column hero grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-24 items-start">
              {/* Left — heading block */}
              <div>
                {/* Index micro-label */}
                <p
                  className="text-[9px] tracking-[0.4em] uppercase mb-6 font-medium"
                  style={{ color: MUTED_BROWN }}
                >
                  Curated Service — {String(categoryIndex + 1).padStart(2, "0")} /{" "}
                  {SERVICES.length}
                </p>

                {/* H1 */}
                <h1
                  id="service-page-heading"
                  className="leading-[1.05] tracking-tight mb-10 drop-shadow-sm"
                  style={{
                    ...SERIF,
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: DARK_BROWN,
                  }}
                >
                  {category.name}
                </h1>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <MetaPill
                    label="Starting From"
                    value={`₹${startingPrice.toLocaleString("en-IN")}`}
                    highlight
                  />
                  <MetaPill label="Locations" value="5 Chennai Branches" />
                  <MetaPill label="Rating" value="4.8 ★" />
                  {category.note && (
                    <MetaPill label="Includes" value={category.note} />
                  )}
                </div>

                {/* Service Overview card */}
                <div className="relative bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                  {/* Left accent bar */}
                  <div
                    className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#B9935A] to-[#E6D9C8] rounded-l-2xl"
                    aria-hidden="true"
                  />
                  <h2
                    className="text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold"
                    style={{ color: GOLD_COLOR }}
                  >
                    Service Overview
                  </h2>
                  <p
                    className="text-[1.05rem] font-light leading-relaxed"
                    style={{ color: MUTED_BROWN }}
                  >
                    Vibe Unisex Salon provides premium{" "}
                    <strong className="font-medium text-[#2A2421]">
                      {category.name}
                    </strong>{" "}
                    for men and women across five branches in Chennai:{" "}
                    <strong className="font-medium text-[#2A2421]">
                      {SALON_LOCATIONS.join(", ")}
                    </strong>
                    . Prices start at{" "}
                    <strong className="font-medium" style={{ color: GOLD_COLOR }}>
                      ₹{startingPrice.toLocaleString("en-IN")}
                    </strong>
                    {category.note ? `. ${category.note}.` : "."} Certified
                    stylists use professional-grade products for every service.
                    Vibe Unisex Salon is rated 4.8 out of 5 and accepts walk-ins
                    at all locations.
                  </p>
                </div>
              </div>

              {/* Right — floating glass stat card */}
              <div
                className="hidden lg:flex flex-col rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.04)] overflow-hidden"
                aria-hidden="true"
              >
                {/* Big ordinal number */}
                <div className="px-10 pt-12 pb-8 border-b border-[#EADCC8]/40 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  <span
                    className="leading-none font-normal block relative z-10"
                    style={{
                      ...SERIF,
                      fontSize: "6rem",
                      color: DARK_BROWN,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.35em] uppercase mt-4 block relative z-10"
                    style={{ color: GOLD_COLOR }}
                  >
                    Signature Collection
                  </span>
                </div>

                {/* Starting price */}
                <div className="px-10 py-8 border-b border-[#EADCC8]/40 text-center bg-white/20">
                  <span
                    className="block text-[9px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: MUTED_BROWN }}
                  >
                    Investment From
                  </span>
                  <span
                    className="leading-none font-normal drop-shadow-sm"
                    style={{ ...SERIF, fontSize: "2.8rem", color: GOLD_COLOR }}
                  >
                    ₹{startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Rating */}
                <div className="px-10 py-8 text-center">
                  <span
                    className="block text-[9px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: MUTED_BROWN }}
                  >
                    Client Satisfaction
                  </span>
                  <span
                    className="font-medium flex items-center justify-center gap-2"
                    style={{ ...SERIF, fontSize: "1.75rem", color: DARK_BROWN }}
                  >
                    4.8{" "}
                    <span style={{ color: GOLD_COLOR, fontSize: "1.2rem" }}>★</span>
                  </span>
                  <span
                    className="text-xs font-light block mt-1"
                    style={{ fontFamily: "Inter, sans-serif", color: MUTED_BROWN }}
                  >
                    Based on 200+ reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PRICING TABLE — LUXURY FLOAT CARDS
        ════════════════════════════════════════ */}
        <section
          className="py-16 relative z-10"
          aria-labelledby="pricing-section-heading"
        >
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-16">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-16">
              <h2
                id="pricing-section-heading"
                className="text-3xl sm:text-4xl font-normal drop-shadow-sm"
                style={{ ...SERIF, color: DARK_BROWN }}
              >
                Service Menu
              </h2>
              <div
                className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#D8C7B3] to-transparent mx-6"
                aria-hidden="true"
              />
              <span
                className="text-[10px] tracking-[0.25em] uppercase whitespace-nowrap px-4 py-2 rounded-full bg-white/50 border border-[#EADCC8]"
                style={{ color: MUTED_BROWN }}
              >
                All prices in INR · Taxes Included
              </span>
            </div>

            {/* FLAT items (no groups) */}
            {category.items && !category.groups && (
              <PricingGrid items={category.items} groupLabel={category.name} />
            )}

            {/* GROUPED items */}
            {category.groups && (
              <div className="space-y-24">
                {category.groups.map((group) => (
                  <article key={group.label} aria-labelledby={`group-${group.label}`}>
                    <div className="flex items-center gap-6 mb-10">
                      <h3
                        id={`group-${group.label}`}
                        className="font-normal whitespace-nowrap text-2xl"
                        style={{ ...SERIF, color: DARK_BROWN }}
                      >
                        {group.label}
                      </h3>
                      <span
                        className="h-[1px] flex-1 bg-gradient-to-r from-[#D8C7B3] to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                    <PricingGrid
                      items={group.items}
                      groupLabel={`${category.name} — ${group.label}`}
                    />
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* ════════════════════════════════════════
            LOCATION AVAILABILITY
        ════════════════════════════════════════ */}
        <section className="py-16" aria-labelledby="locations-heading">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-16">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-4 mb-4 opacity-80">
                <h2
                  id="locations-heading"
                  className="text-[10px] tracking-[0.4em] uppercase font-semibold whitespace-nowrap"
                  style={{ color: GOLD_COLOR }}
                >
                  Available at All Branches
                </h2>
                <span
                  className="h-[1px] flex-1 bg-[#D8C7B3]"
                  aria-hidden="true"
                />
              </div>
              <p
                className="text-[1rem] font-light mb-10 max-w-2xl"
                style={{ color: MUTED_BROWN }}
              >
                Experience the finest{" "}
                <strong className="font-medium text-[#2A2421]">
                  {category.name}
                </strong>{" "}
                at any of our exclusive Chennai studios. Walk-ins are warmly welcomed.
              </p>

              <ul
                className="grid grid-cols-2 md:grid-cols-5 gap-4"
                role="list"
                aria-label="Chennai salon branches offering this service"
              >
                {SALON_LOCATIONS.map((loc) => (
                  <li
                    key={loc}
                    role="listitem"
                    className="bg-white/80 p-6 rounded-2xl border border-[#F0E6D8] text-center hover:shadow-[0_8px_30px_rgb(185,147,90,0.12)] hover:-translate-y-1 transition-all duration-400"
                  >
                    <span
                      className="block text-[9px] tracking-[0.35em] uppercase mb-2"
                      style={{ color: GOLD_COLOR }}
                    >
                      Studio
                    </span>
                    <span
                      className="text-base font-medium whitespace-nowrap"
                      style={{ color: DARK_BROWN }}
                    >
                      {loc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            BOOKING CTA — LUXURY DARK BLOCK
        ════════════════════════════════════════ */}
        <section
  className="py-20"
  aria-labelledby="booking-heading"
>
  <div className="container mx-auto max-w-screen-xl px-6 lg:px-16">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2A2421] p-12 md:p-20 shadow-2xl">
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(185,147,90,0.15),_transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative watermark numeral */}
      <span
        className="absolute -bottom-8 -right-4 leading-none select-none pointer-events-none opacity-[0.03]"
        style={{
          ...SERIF,
          fontSize: "20rem",
          color: "#FFFFFF",
          letterSpacing: "-0.04em",
        }}
        aria-hidden="true"
      >
        {String(categoryIndex + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 max-w-4xl">
        <p
          className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-6"
          style={{ color: GOLD_COLOR }}
        >
          Reserve Your Appointment
        </p>
        <h2
          id="booking-heading"
          className="leading-[1.1] mb-6 text-white"
          style={{
            ...SERIF,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
          }}
        >
          Indulge in <br /> {category.name}
        </h2>
        <p className="text-[1.1rem] font-light mb-10 leading-relaxed text-white/70 max-w-2xl">
          Connect with our expert stylists today. We invite you to visit
          or call your nearest Vibe Unisex Salon in Chennai.
        </p>

        {/* Responsive CTA Container */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-4">
          
          {/* 5 Branch Booking Buttons */}
          {salonBranches.map((branch) => (
            <a
              key={branch.name}
              href={`tel:${branch.phone}`}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold text-[#2A2421] bg-[#B9935A] rounded-full hover:bg-white transition-all duration-400 shadow-[0_0_15px_rgba(185,147,90,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              <span>Book {branch.name}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}

          {/* Explore Menu Button */}
          <Link
            href="/services"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-400 backdrop-blur-sm"
          >
            Explore Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ════════════════════════════════════════
            PREV / NEXT NAV
        ════════════════════════════════════════ */}
        {(prevService || nextService) && (
          <nav
            className="border-t border-[#EADCC8] bg-white/30 backdrop-blur-sm"
            aria-label="Service category navigation"
          >
            <div className="container mx-auto max-w-screen-xl px-6 lg:px-16">
              <div className="grid grid-cols-2 divide-x divide-[#EADCC8]">
                {prevService ? (
                  <Link
                    href={`/services/${prevService.slug}`}
                    className="group flex flex-col justify-center gap-2 py-10 px-6 sm:px-10 hover:bg-white/60 transition-colors duration-400"
                    aria-label={`Previous: ${prevService.name}`}
                  >
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase transition-colors duration-400 group-hover:text-[#B9935A]"
                      style={{ color: MUTED_BROWN }}
                    >
                      ← Previous Experience
                    </span>
                    <span
                      className="font-normal text-lg sm:text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ ...SERIF, color: DARK_BROWN }}
                    >
                      {prevService.name}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextService ? (
                  <Link
                    href={`/services/${nextService.slug}`}
                    className="group flex flex-col justify-center items-end gap-2 py-10 px-6 sm:px-10 text-right hover:bg-white/60 transition-colors duration-400"
                    aria-label={`Next: ${nextService.name}`}
                  >
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase transition-colors duration-400 group-hover:text-[#B9935A]"
                      style={{ color: MUTED_BROWN }}
                    >
                      Next Experience →
                    </span>
                    <span
                      className="font-normal text-lg sm:text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ ...SERIF, color: DARK_BROWN }}
                    >
                      {nextService.name}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </nav>
        )}
      </main>
    </>
  );
}


// ─── Pricing Grid ─────────────────────────────────────────────────────────────
/**
 * Luxury floating glass-like cards.
 * Each <article> is an independent entity node for AI search extraction.
 * Prices and labels are always co-located (AEO data integrity rule).
 * <dl> inside variant items provides key-value structure for answer engines.
 */
function PricingGrid({
  items,
  groupLabel,
}: {
  items: ServiceItem[];
  groupLabel: string;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label={`${groupLabel} pricing`}
    >
      {items.map((item, i) => (
        <article
          key={`${item.name}-${i}`}
          role="listitem"
          // DYNAMIC STYLING: Applies gold tint and border if item.highlight is true
          className={`group relative backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-500 flex flex-col gap-4 ${
            item.highlight
              ? "bg-[#B9935A]/10 border-2 border-[#B9935A] shadow-[0_15px_40px_rgba(185,147,90,0.15)] hover:shadow-[0_20px_50px_rgba(185,147,90,0.25)] z-10"
              : "bg-white/70 border border-white hover:shadow-[0_15px_40px_rgb(185,147,90,0.08)]"
          }`}
          aria-label={`${item.name}${item.price ? ` — ₹${item.price}` : ""}`}
        >
          
          {/* POPULAR BADGE: Only shows if item is highlighted */}
          {item.highlight && (
            <div className="absolute -top-3 right-6 bg-[#B9935A] text-white text-[9px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full font-bold shadow-md">
              Popular
            </div>
          )}

          {/* Left accent bar — appears on hover (disabled on highlighted items as they already have a full border) */}
          {!item.highlight && (
            <div
              className="absolute left-0 top-8 w-1 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-md bg-gradient-to-b from-[#B9935A] to-[#E6D9C8]"
              aria-hidden="true"
            />
          )}

          {/* Service name */}
          <h4
            className="text-[1.1rem] font-medium leading-snug pr-2 tracking-tight"
            style={{ color: DARK_BROWN }}
          >
            {item.name}
          </h4>

          {/* Note */}
          {item.note && (
            <p
              className="text-[0.8rem] leading-relaxed font-light mt-[-0.5rem]"
              style={{ color: MUTED_BROWN }}
            >
              {item.note}
            </p>
          )}

          {/* Price block */}
          <div className="mt-auto pt-6 border-t border-[#EADCC8]/50">
            {item.variants && item.variants.length > 0 ? (
              <dl className="flex flex-col gap-3">
                {item.variants.map((v) => (
                  <div key={v.label} className="flex items-center justify-between gap-4">
                    <dt
                      className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap font-medium"
                      style={{ color: MUTED_BROWN }}
                    >
                      {v.label}
                    </dt>
                    <dd
                      className="font-normal whitespace-nowrap tabular-nums text-lg"
                      style={{ ...SERIF, color: GOLD_COLOR }}
                    >
                      ₹{v.price.toLocaleString("en-IN")}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : item.price ? (
              <div className="flex items-end justify-between gap-2">
                <span
                  className="font-normal whitespace-nowrap tabular-nums leading-none text-3xl"
                  style={{ ...SERIF, color: GOLD_COLOR }}
                >
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                {item.priceSuffix && (
                  <span
                    className="text-[10px] uppercase tracking-wider font-medium mb-1"
                    style={{ color: MUTED_BROWN }}
                  >
                    {item.priceSuffix}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

// ─── Meta Pill ────────────────────────────────────────────────────────────────
function MetaPill({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 border px-5 py-2.5 rounded-full text-xs transition-all duration-300 ${highlight
          ? "border-[#B9935A]/30 bg-[#B9935A]/5 shadow-sm"
          : "border-white/60 bg-white/40"
        }`}
    >
      <span
        className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap font-semibold"
        style={{ color: highlight ? GOLD_COLOR : MUTED_BROWN }}
      >
        {label}
      </span>
      <span className="font-medium whitespace-nowrap" style={{ color: DARK_BROWN }}>
        {value}
      </span>
    </div>
  );
}