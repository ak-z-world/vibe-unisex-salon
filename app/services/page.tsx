// app/services/page.tsx
// Vibe Unisex Salon — Services Index
// AEO/GEO/LLMO optimized · Royal Light Mode · Editorial Luxury Design

import type { Metadata } from "next";
import Link from "next/link";
import {
  SERVICES,
  SALON_LOCATIONS,
  LOCATIONS_SEO,
  getStartingPrice,
  type ServiceCategory,
} from "@/lib/services";


const salonBranches = [
  { name: "Anna Nagar", phone: "+91 8072352853" },
  { name: "T. Nagar", phone: "+91 9342795928" },
  { name: "Ekkatuthangal", phone: "+91 6374679577" },
  { name: "Porur", phone: "+91 7603957055" },
  { name: "Velachery", phone: "+91 9363702047" },
];

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Salon Services & Price List | Vibe Unisex Salon — Anna Nagar, T Nagar, Velachery & More",
  description: `Explore the complete services menu at Vibe Unisex Salon across ${LOCATIONS_SEO}, Chennai. Hair cuts, hair colour, facials, keratin treatments, bridal makeup & more — with transparent pricing starting from ₹100.`,
  keywords: [
    "salon services Chennai",
    "unisex salon price list Chennai",
    "haircut Anna Nagar",
    "hair colour T Nagar",
    "keratin treatment Velachery",
    "facial Ekkatuthangal",
    "bridal makeup Porur Chennai",
    "hair spa Chennai",
    "manicure pedicure Chennai",
    "best salon Anna Nagar Chennai",
    "Vibe Unisex Salon menu",
  ],
  alternates: { canonical: "https://vibeunisexsalon.in/services" },
  openGraph: {
    title: "Services & Pricing | Vibe Unisex Salon Chennai",
    description: `Full salon services with pricing across ${LOCATIONS_SEO}. Haircuts, hair colour, facials, massage, makeup & more.`,
    url: "https://vibeunisexsalon.in/services",
    siteName: "Vibe Unisex Salon",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing | Vibe Unisex Salon Chennai",
    description: `Complete salon menu across ${LOCATIONS_SEO}, Chennai.`,
  },
};

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vibe Unisex Salon — Full Services Menu",
  description: `Complete list of salon services offered at Vibe Unisex Salon across ${LOCATIONS_SEO}, Chennai.`,
  url: "https://vibeunisexsalon.in/services",
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((svc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: svc.name,
    url: `https://vibeunisexsalon.in/services/${svc.slug}`,
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Vibe Unisex Salon",
  url: "https://vibeunisexsalon.in",
  description:
    "Premium unisex salon in Chennai offering haircuts, hair colour, keratin treatments, facials, bridal makeup, and more across Anna Nagar, T Nagar, Ekkatuthangal, Velachery, and Porur.",
  areaServed: SALON_LOCATIONS.map((loc) => ({
    "@type": "Place",
    name: `${loc}, Chennai, Tamil Nadu`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Salon Services Menu",
    url: "https://vibeunisexsalon.in/services",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: svc.name,
        description: svc.description,
        url: `https://vibeunisexsalon.in/services/${svc.slug}`,
      },
      price: getStartingPrice(svc),
      priceCurrency: "INR",
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "200",
    bestRating: "5",
  },
};

// ─── Category Settings ────────────────────────────────────────────────────────
const CATEGORY_ACCENTS: Record<string, string> = {
  haircuts: "#B5955C",
  "hair-styles-hairdo": "#A8884F",
  "hair-colour": "#C6A87C",
  "hair-spa": "#9B7D46",
  "hair-treatments": "#B5955C",
  "skin-care-facials": "#A48F7A",
  "detan-bleach": "#B89F82",
  massage: "#9C826A",
  "hands-foot-spa": "#B09E7B",
  "makeup-saree-draping": "#B5955C",
};

const CATEGORY_TAGLINES: Record<string, string> = {
  haircuts: "Precision cuts · All genders",
  "hair-styles-hairdo": "Event-ready · Occasion styling",
  "hair-colour": "Certified colourists · Premium brands",
  "hair-spa": "Wella · Repair · Nourish",
  "hair-treatments": "Includes complimentary haircut",
  "skin-care-facials": "Hydra · Gold · Korean Glass Skin",
  "detan-bleach": "Face · Body · Full coverage",
  massage: "Oil therapy · Scalp ritual",
  "hands-foot-spa": "Mani · Pedi · Essential to Luxury",
  "makeup-saree-draping": "Bridal · HD · Elite packages",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main
        className="min-h-screen bg-[#FCFBF8] text-[#1A1A1A] antialiased"
        id="main-content"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* ════════════════════════════════════════
            INVISIBLE AEO/GEO/LLMO DATA LAYER
            This semantic article is fully crawled by
            AI but invisible to human users.
        ════════════════════════════════════════ */}
        <article className="sr-only">
          <h1>Vibe Unisex Salon - Complete Service Menu and Pricing</h1>
          <p>
            Vibe Unisex Salon offers {SERVICES.length} premium service categories including
            haircuts, hair colour, hair spa, keratin treatments, skin care facials,
            detan and bleach, massage, hands and foot spa, hair styling, and bridal
            makeup with saree draping.
          </p>
          <h2>Locations</h2>
          <p>
            Services are available at five branches across Chennai:{" "}
            {SALON_LOCATIONS.join(", ")}. All services are available at every branch.
          </p>
          <h2>Pricing and Quality</h2>
          <p>
            Prices start from ₹100. Vibe Unisex Salon is rated 4.8 out of 5 by over 200 clients.
            The salon serves men, women, and kids with a transparent pricing structure.
          </p>
        </article>

        {/* ════════════════════════════════════════
            HERO — CINEMATIC FULL-SCREEN VIDEO
        ════════════════════════════════════════ */}
        <section
          className="relative min-h-[85vh] md:min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#E8E2D2] overflow-hidden"
          aria-labelledby="services-index-heading"
        >
          {/* Background Video Layer */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster="/video-poster-placeholder.jpg"
          >
            {/* Replace with your actual video path */}
            <source src="/images/video5.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay for Text Readability 
              Creates a dark fade from the left to make the white text readable
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0" />

          {/* Content Container */}
          <div className="relative z-10 container mx-auto max-w-screen-2xl px-6 lg:px-12 flex flex-col justify-center h-full">
            <div className="max-w-2xl text-left mt-10 md:mt-0">

              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-white"></span>
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium text-white whitespace-nowrap">
                  Since 2018 · Chennai's Finest
                </span>
              </div>

              {/* Main Heading */}
              <h1
                id="services-index-heading"
                className="leading-[1.1] tracking-[-0.02em] mb-6 text-white"
                style={{
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 400,
                }}
              >
                Best Premium <br />
                <em className="italic" style={{ color: "#D4A840" }}>Unisex Salon</em> <br />
                in Chennai
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg font-light leading-relaxed text-white/90 mb-10 max-w-xl">
                Luxury hair, beauty & grooming experiences crafted by expert stylists — where every visit is a transformation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-3xl">

                {/* 5 Branch Booking Buttons */}
                {salonBranches.map((branch) => (
                  <a
                    key={branch.name}
                    href={`tel:${branch.phone}`}
                    className="group w-full sm:w-auto px-6 py-4 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#1A1A1A] transition-colors duration-300 hover:bg-[#C29835] inline-flex items-center justify-center gap-2 rounded-none"
                    style={{ backgroundColor: "#D4A840" }}
                  >
                    BOOK {branch.name}
                    <span aria-hidden="true" className="font-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                ))}

                {/* Explore Services Button */}
                <Link
                  href="#services"
                  className="group w-full sm:w-auto px-6 py-4 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-white border border-white/50 hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-sm rounded-none"
                >
                  EXPLORE SERVICES
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>

              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SERVICE LEDGER GRID — BESPOKE MENU
        ════════════════════════════════════════ */}
        <section className="py-32 bg-[#FDFBF7]" aria-labelledby="categories-list-heading">
          <div className="container mx-auto max-w-6xl px-6">

            {/* High Contrast Header */}
            <div className="flex flex-col items-center text-center mb-20">
              <h2
                id="categories-list-heading"
                className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#8B7355] mb-6"
              >
                Curated Offerings
              </h2>
              <p
                className="text-4xl md:text-5xl text-[#1A1A1A] max-w-xl leading-[1.2]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Where precision meets artistry in every ritual.
              </p>
            </div>

            {/* Robust Grid Layout */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {SERVICES.map((category, i) => (
                <ServiceLedgerCard
                  key={category.slug}
                  category={category}
                  index={i}
                  accent={CATEGORY_ACCENTS[category.slug] ?? "#8B7355"}
                  tagline={CATEGORY_TAGLINES[category.slug] ?? ""}
                />
              ))}
            </ul>
          </div>
        </section>
        {/* ════════════════════════════════════════
    HIDDEN SEO/AIO SECTION (Bot Readable Only)
════════════════════════════════════════ */}
        <section className="sr-only" aria-hidden="true">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <h2 id="quick-facts-heading">Salon Intelligence</h2>

            <dl>
              {[
                {
                  q: "Service Portfolio",
                  a: `${SERVICES.length} distinct categories, ranging from precision cuts to elite bridal transformations.`,
                },
                {
                  q: "Chennai Locations",
                  a: `Available across five premium studios: ${SALON_LOCATIONS.join(", ")}.`,
                },
                {
                  q: "Pricing Architecture",
                  a: "Transparent pricing starting from ₹100, ensuring luxury is accessible.",
                },
                {
                  q: "Clientele",
                  a: "A dedicated unisex environment providing bespoke treatments for men, women, and children.",
                },
                {
                  q: "Advanced Treatments",
                  a: "Featuring Keratin, Botox, and Nanoplastia—all premium treatments include a complimentary haircut.",
                },
                {
                  q: "Bridal Excellence",
                  a: "Exclusive HD and Luxury bridal packages, extending to comprehensive groom and bridesmaid services.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ════════════════════════════════════════
            LOCATIONS GRID
        ════════════════════════════════════════ */}
        <section
          className="border-t border-[#E8E2D2] py-20 bg-[#FCFBF8]"
          aria-labelledby="locations-index-heading"
        >
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2
                id="locations-index-heading"
                className="text-[11px] tracking-[0.3em] uppercase font-semibold whitespace-nowrap"
                style={{ color: "#B5955C" }}
              >
                Experience Vibe Near You
              </h2>
            </div>

            <ul
              className="flex flex-wrap justify-center gap-4 md:gap-8"
              role="list"
              aria-label="Vibe Salon branch locations in Chennai"
            >
              {SALON_LOCATIONS.map((loc) => (
                <li
                  key={loc}
                  role="listitem"
                  className="bg-white border border-[#E8E2D2] px-8 py-5 text-center transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#B5955C]"
                >
                  <span
                    className="block text-[8px] tracking-[0.4em] uppercase mb-1 whitespace-nowrap"
                    style={{ color: "#B5955C" }}
                  >
                    Studio
                  </span>
                  <span
                    className="text-sm font-medium whitespace-nowrap tracking-wide"
                    style={{ color: "#1A1A1A" }}
                  >
                    {loc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

// ─── Service Ledger Card Component ─────────────────────────────────────────────
function ServiceLedgerCard({ category, index, accent, tagline }: any) {
  const startingPrice = getStartingPrice(category);

  return (
    <li role="listitem" className="group h-full">
      <Link
        href={`/services/${category.slug}`}
        className="block h-full bg-white border border-[#D1C7B7] p-10 hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Accent Line */}
          <div className="w-12 h-[2px] mb-8" style={{ backgroundColor: accent }} />

          {/* Metadata */}
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B7355] mb-4">
            {tagline}
          </span>

          {/* Title - Dark & Bold */}
          <h3
            className="text-2xl font-semibold mb-6 text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {category.name}
          </h3>

          {/* Body - High Legibility */}
          <p className="text-sm leading-relaxed text-[#404040] mb-10 flex-grow">
            {category.description}
          </p>

          {/* Footer - Clear Action */}
          <div className="border-t border-[#D1C7B7] pt-6 flex justify-between items-center">
            <div>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#8B7355] font-bold mb-1">
                Begins at
              </span>
              <span className="text-xl font-bold text-[#1A1A1A]">
                ₹{startingPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">
              Discover →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}