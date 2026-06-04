import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Scissors,
  Sparkles,
  Heart,
  UserRound,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { SALON_BRANCHES } from "@/lib/branches";
import { OrganizationSchema } from "./components/SEO/StructuredData";

const SITE_URL = "https://vibeunisexsalon.in";

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Premium Hair & Beauty Care | Vibe Unisex Salon India",
  description:
    "Experience premium hair styling, skincare, makeup artistry, and grooming at Vibe Unisex Salon — 5 locations across Chennai, Bengaluru, Hyderabad, Mumbai & Delhi. Walk in or book your appointment today.",
  keywords: [
    "best unisex salon india",
    "premium hair salon near me",
    "hair cut and styling india",
    "bridal makeup salon",
    "men grooming salon india",
    "skincare facial salon",
    "hair colour salon near me",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Vibe Unisex Salon | Premium Hair & Beauty Care Across India",
    description:
      "5 premium salon locations in Chennai, Bengaluru, Hyderabad, Mumbai & Delhi. Expert stylists. Luxury experience. Every visit, every time.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Vibe Unisex Salon – Premium Hair & Beauty Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Unisex Salon | Premium Hair & Beauty Care",
    description:
      "5 premium salon locations across India. Expert stylists, luxury treatments.",
    images: [`${SITE_URL}/og-home.jpg`],
  },
};

// ─── Services Data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "hair",
    icon: Scissors,
    title: "Hair Styling & Cuts",
    description:
      "From precision cuts to bold transformations — our master stylists craft looks that complement your personality, texture, and lifestyle.",
    tags: ["Cuts & Trims", "Blow-dry", "Hair Spa", "Keratin"],
  },
  {
    id: "skin",
    icon: Sparkles,
    title: "Skin & Facial Treatments",
    description:
      "Clinically-informed facials, deep cleansing, anti-ageing, and brightening therapies tailored to your skin type and goals.",
    tags: ["Deep Cleanse", "Anti-Ageing", "Brightening", "Hydration"],
  },
  {
    id: "makeup",
    icon: Heart,
    title: "Makeup & Bridal",
    description:
      "Flawless everyday looks to show-stopping bridal artistry — our makeup artists work with premium international brands.",
    tags: ["Bridal", "Party Makeup", "HD Makeup", "Airbrush"],
  },
  {
    id: "grooming",
    icon: UserRound,
    title: "Men's Grooming",
    description:
      "Dedicated grooming services for the modern man — haircuts, beard sculpting, skin treatments, and relaxation therapies.",
    tags: ["Haircuts", "Beard Styling", "Cleanup", "Head Massage"],
  },
];

// ─── Page Component (RSC) ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <OrganizationSchema siteUrl={SITE_URL} branches={SALON_BRANCHES} />

      <main id="main-content">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1410]"
          aria-labelledby="hero-heading"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85"
              alt="Vibe Unisex Salon interior — premium hair and beauty care"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1410] via-[#1A1410]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-transparent to-transparent" />
          </div>

          {/* Decorative gold vertical rule */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent opacity-60" />

          {/* Hero content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-2xl">
              <p className="section-label animate-fade-up-delay-1">
                Est. 2018 · Five Cities · One Standard
              </p>

              <h1
                id="hero-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 leading-[1.05] tracking-tight animate-fade-up-delay-2"
              >
                Premium Hair &amp;{" "}
                <span className="gold-shimmer">Beauty Care</span>{" "}
                <br className="hidden sm:block" />
                Across India
              </h1>

              <p className="font-body text-lg text-[#B0A89E] mt-6 leading-relaxed max-w-xl animate-fade-up-delay-3">
                Where expert stylists, luxury treatments, and a warm atmosphere
                come together to deliver an experience that&apos;s unmistakably
                Vibe — at 5 premier locations nationwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up-delay-4">
                <Link href="/branches" className="btn-primary">
                  Find Your Salon
                  <ArrowRight size={16} />
                </Link>
                <Link href="/#services" className="btn-outline text-white border-white/30 hover:bg-white/10 hover:border-white">
                  Explore Services
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex flex-wrap items-center gap-8 mt-14 animate-fade-up-delay-5">
                {[
                  { value: "5+", label: "Premium Locations" },
                  { value: "15K+", label: "Happy Clients" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-bold text-[#C9A84C]">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-[#9A8E85] tracking-wide mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent" />
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────────── */}
        <section
          id="services"
          className="py-24 lg:py-32 bg-[#FAF8F5]"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="section-label">What We Offer</p>
              <h2
                id="services-heading"
                className="font-display text-4xl lg:text-5xl font-bold text-[#1A1410] mt-3 leading-tight"
              >
                Curated Services for{" "}
                <span className="text-[#C9A84C]">Every Look</span>
              </h2>
              <div className="divider-gold mx-auto" />
              <p className="font-body text-[#6B5F55] max-w-2xl mx-auto mt-4 leading-relaxed">
                From everyday grooming to milestone transformations — our full
                suite of services is designed to meet you exactly where you are.
              </p>
            </div>

            {/* Service cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.id}
                    className={`group bg-white border border-[#E2D9CC] p-8 hover:border-[#C9A84C] hover:shadow-xl transition-all duration-500 cursor-default animate-fade-up-delay-${index + 1}`}
                    aria-labelledby={`service-title-${service.id}`}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 border border-[#C9A84C]/30 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-all duration-300">
                      <Icon
                        size={20}
                        className="text-[#C9A84C] group-hover:text-white transition-colors duration-300"
                      />
                    </div>

                    <h3
                      id={`service-title-${service.id}`}
                      className="font-display text-xl font-semibold text-[#1A1410] leading-snug"
                    >
                      {service.title}
                    </h3>

                    <p className="font-body text-sm text-[#6B5F55] mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <ul
                      className="flex flex-wrap gap-2 mt-5"
                      role="list"
                      aria-label={`${service.title} offerings`}
                    >
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-body text-xs text-[#9A7A28] bg-[#C9A84C]/10 px-2.5 py-1"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ABOUT / BRAND STORY ──────────────────────────────────────── */}
        <section
          id="about"
          className="py-24 lg:py-32 bg-[#1A1410] overflow-hidden"
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image mosaic */}
              <div className="relative h-[480px] hidden lg:block">
                <div className="absolute top-0 left-0 w-3/4 h-3/4 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
                    alt="Skilled stylist at work in Vibe Unisex Salon"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden border-4 border-[#1A1410]">
                  <Image
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80"
                    alt="Luxury salon interior at Vibe Unisex Salon"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                {/* Gold accent square */}
                <div className="absolute bottom-8 left-1/2 w-20 h-20 bg-[#C9A84C] -translate-x-8 z-10 flex items-center justify-center">
                  <p className="font-display text-3xl font-bold text-white">6+</p>
                </div>
                <p className="absolute bottom-6 left-1/2 translate-x-8 font-body text-xs text-[#9A8E85] z-10">
                  Years of<br />Excellence
                </p>
              </div>

              {/* Copy */}
              <div>
                <p className="section-label">Our Story</p>
                <h2
                  id="about-heading"
                  className="font-display text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight"
                >
                  Beauty That Feels Like{" "}
                  <span className="text-[#C9A84C]">You</span>
                </h2>
                <div className="divider-gold" />
                <p className="font-body text-[#9A8E85] leading-relaxed mt-4">
                  Founded with a belief that great hair and skin care shouldn&apos;t
                  be limited by gender, Vibe Unisex Salon has grown from a
                  single chair in Chennai&apos;s T. Nagar to a five-city presence
                  — each branch upholding the same meticulous standards of
                  craft, hygiene, and hospitality.
                </p>
                <p className="font-body text-[#9A8E85] leading-relaxed mt-4">
                  Our team of internationally trained stylists, skin therapists,
                  and grooming specialists are passionate about making every
                  client feel seen, heard, and genuinely transformed — not just
                  serviced.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  {[
                    { label: "Expert Stylists", value: "50+" },
                    { label: "Services Offered", value: "80+" },
                    { label: "5-Star Reviews", value: "3K+" },
                    { label: "Cities Covered", value: "5" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-l-2 border-[#C9A84C] pl-4"
                    >
                      <p className="font-display text-3xl font-bold text-[#C9A84C]">
                        {item.value}
                      </p>
                      <p className="font-body text-xs text-[#6B5F55] mt-1 tracking-wide uppercase">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BRANCH LOCATOR ───────────────────────────────────────────── */}
        <section
          id="locations"
          className="py-24 lg:py-32 bg-[#F0EBE3]"
          aria-labelledby="locations-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="section-label">Find Us Near You</p>
                <h2
                  id="locations-heading"
                  className="font-display text-4xl lg:text-5xl font-bold text-[#1A1410] mt-3 leading-tight"
                >
                  Our <span className="text-[#C9A84C]">5 Locations</span>
                </h2>
                <div className="divider-gold" />
              </div>
              <Link
                href="/branches"
                className="btn-outline self-start md:self-auto shrink-0"
              >
                View All Branches
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Branch cards — dynamically rendered from SALON_BRANCHES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SALON_BRANCHES.map((branch, index) => (
                <article
                  key={branch.id}
                  className={`group bg-white border border-[#E2D9CC] overflow-hidden hover:shadow-xl hover:border-[#C9A84C] transition-all duration-500 animate-fade-up-delay-${Math.min(index + 1, 5)}`}
                  aria-labelledby={`branch-title-${branch.id}`}
                >
                  {/* Branch image */}
                  <div className="relative h-52 overflow-hidden bg-[#E2D9CC]">
                    <Image
                      src={branch.featuredImageUrl}
                      alt={`${branch.name} — salon interior and exterior`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* City badge */}
                    <div className="absolute top-4 left-4 bg-[#1A1410]/90 backdrop-blur-sm px-3 py-1.5">
                      <span className="font-body text-xs text-[#C9A84C] tracking-widest uppercase font-medium">
                        {branch.city}
                      </span>
                    </div>
                  </div>

                  {/* Branch info */}
                  <div className="p-6">
                    <h3
                      id={`branch-title-${branch.id}`}
                      className="font-display text-xl font-semibold text-[#1A1410] leading-snug"
                    >
                      {branch.neighborhood}
                    </h3>

                    <address className="not-italic mt-3 space-y-2">
                      <p className="font-body text-sm text-[#6B5F55] flex items-start gap-2">
                        <MapPin size={14} className="shrink-0 text-[#C9A84C] mt-0.5" />
                        {branch.address}
                      </p>
                      <p className="font-body text-sm text-[#6B5F55] flex items-center gap-2">
                        <Phone size={14} className="shrink-0 text-[#C9A84C]" />
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, "")}`}
                          className="hover:text-[#C9A84C] transition-colors"
                          aria-label={`Call ${branch.name}`}
                        >
                          {branch.phone}
                        </a>
                      </p>
                      <p className="font-body text-sm text-[#6B5F55] flex items-center gap-2">
                        <Clock size={14} className="shrink-0 text-[#C9A84C]" />
                        {branch.hours}
                      </p>
                    </address>

                    {/* CTA */}
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#E2D9CC]">
                      <Link
                        href={`/branches/${branch.slug}`}
                        className="font-body text-sm font-medium text-[#C9A84C] hover:text-[#9A7A28] transition-colors flex items-center gap-1.5 group/link"
                        aria-label={`View details for ${branch.name}`}
                      >
                        View Branch Details
                        <ChevronRight
                          size={14}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>
                      <span className="text-[#E2D9CC]">·</span>
                      <a
                        href={branch.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-[#9A8E85] hover:text-[#6B5F55] transition-colors flex items-center gap-1.5"
                        aria-label={`Get directions to ${branch.name}`}
                      >
                        Directions
                        <MapPin size={12} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────────── */}
        <section
          className="py-20 bg-[#C9A84C] relative overflow-hidden"
          aria-labelledby="cta-heading"
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-white/70 font-medium">
              Ready to Transform?
            </p>
            <h2
              id="cta-heading"
              className="font-display text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight"
            >
              Your Best Look Awaits
            </h2>
            <p className="font-body text-white/80 mt-4 max-w-xl mx-auto leading-relaxed">
              Walk in or book an appointment at any of our five locations across
              India. Our stylists are ready for you.
            </p>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-[#1A1410] text-white font-body font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#2D2520] hover:shadow-lg hover:-translate-y-0.5"
            >
              Book an Appointment
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}