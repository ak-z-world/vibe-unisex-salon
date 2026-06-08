"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/lib/branches";
import BranchCTA from "./BranchCTA";
import BranchFAQ from "./BranchFAQ";
import BranchSEOContent from "./BranchSEOContent";

// ─── Service list ────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "✂", label: "Hair Cut & Styling" },
  { icon: "◎", label: "Hair Coloring" },
  { icon: "❋", label: "Hair Spa" },
  { icon: "⟁", label: "Keratin Treatment" },
  { icon: "∿", label: "Hair Smoothening" },
  { icon: "✦", label: "Bridal Makeup" },
  { icon: "◈", label: "Facial Treatments" },
  { icon: "◇", label: "Men's Grooming" },
];

// ─── Shared animation variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.9, 
      delay, 
      ease: [0.22, 1, 0.36, 1] as const // <-- Add 'as const' right here
    },
  }),
};

// ─── Gold gradient text style ────────────────────────────────────────────────
const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg,#B8922E 0%,#E2C97E 50%,#B8922E 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function BranchDetailPage({ branch }: { branch: Branch }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="font-body bg-[#FDFAF6] antialiased" id="main-content">

      {/* ════════════════════════════════════════════
          BREADCRUMB NAV
      ════════════════════════════════════════════ */}
      <nav
        className="relative z-50 bg-white border-b border-[#EDE5D8] px-6 lg:px-16"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto max-w-screen-xl py-3 flex items-center gap-2 text-xs text-[#9A8878] tracking-wide">
          <Link href="/" className="hover:text-[#9A7840] transition-colors duration-200">
            Home
          </Link>
          <span className="text-[#D4C4B0]">/</span>
          <Link href="/branches" className="hover:text-[#9A7840] transition-colors duration-200">
            Branches
          </Link>
          <span className="text-[#D4C4B0]">/</span>
          <span className="text-[#4A3D33] font-medium">
            {branch.name}
          </span>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: "90svh" }}
        aria-label={`Vibe Unisex Salon ${branch.name} — ${branch.city}`}
      >
        {/* Background texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018] z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px",
          }}
        />

        {/* Parallax image — right column */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-y-0 right-0 w-full lg:w-[54%] will-change-transform"
        >
          <div className="relative w-full h-full min-h-[90svh]">
            <Image
              src={branch.featuredImageUrl}
              alt={`Vibe Unisex Salon ${branch.name}, ${branch.neighborhood}, ${branch.city}`}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 54vw"
            />
            {/* Cinematic overlay — left fade into content area */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFAF6] via-[#FDFAF6]/70 to-transparent lg:via-[#FDFAF6]/40" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FDFAF6] to-transparent" />
          </div>
        </motion.div>

        {/* Gold corner frames on image area */}
        <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-[#C9A84C]/35 z-20 hidden lg:block" aria-hidden="true" />
        <div className="absolute bottom-12 right-8 w-14 h-14 border-b-2 border-r-2 border-[#C9A84C]/25 z-20 hidden lg:block" aria-hidden="true" />

        {/* Gold rule — top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent z-20" />

        {/* Content area — left */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 container mx-auto max-w-screen-xl px-6 lg:px-16 flex items-center min-h-[90svh]"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-xl lg:max-w-[52%] xl:max-w-[46%] py-32"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium whitespace-nowrap">
                {branch.neighborhood} · {branch.city}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              custom={0.18}
              className="font-display text-[#2C2117] leading-[1.0] tracking-tight"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
                Vibe Unisex Salon
              </span>
              <span
                className="block text-4xl sm:text-5xl md:text-6xl italic mt-1"
                style={goldText}
              >
                {branch.name}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={0.26}
              className="mt-6 text-[#7A6A58] text-lg font-light leading-relaxed"
            >
              Premium hair, beauty &amp; grooming in{" "}
              <strong className="font-medium text-[#4A3D33]">
                {branch.neighborhood}
              </strong>
              , {branch.city}. Expert stylists, international-grade products,
              and a luxurious experience every visit.
            </motion.p>

            {/* Quick info pills */}
            <motion.div
              variants={fadeUp}
              custom={0.34}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { icon: "◉", text: branch.hours },
                { icon: "◈", text: branch.city },
                { icon: "✦", text: "4.9 ★ Rating" },
              ].map((pill) => (
                <div
                  key={pill.text}
                  className="flex items-center gap-2 border border-[#EDE5D8] bg-white/80 backdrop-blur-sm px-4 py-2 text-xs text-[#4A3D33]"
                >
                  <span style={goldText} className="text-sm">
                    {pill.icon}
                  </span>
                  {pill.text}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={0.42}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href={`tel:${branch.phone.replace(/\s/g, "")}`}
                className="group relative inline-flex items-center gap-3 overflow-hidden px-9 py-4 text-sm tracking-[0.16em] uppercase font-semibold text-[#2C2117]"
                style={{
                  background:
                    "linear-gradient(135deg,#D4A840 0%,#EDD58A 50%,#C9A030 100%)",
                  boxShadow: "0 4px 24px rgba(201,168,76,0.22)",
                }}
                aria-label={`Call Vibe Salon ${branch.name}`}
              >
                <span className="relative z-10">Book Now</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </a>

              <a
                href={branch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#9A7840] px-9 py-4 text-sm tracking-[0.16em] uppercase font-light hover:bg-[#FFF8EE] hover:border-[#C9A84C] transition-all duration-300"
                aria-label={`Get directions to Vibe Salon ${branch.name}`}
              >
                Get Directions →
              </a>
            </motion.div>

            {/* Address block */}
            <motion.div
              variants={fadeUp}
              custom={0.5}
              className="mt-10 flex gap-3 border-l-2 border-[#C9A84C]/40 pl-5"
            >
              <div>
                <div className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] mb-1 font-medium">
                  Address
                </div>
                <address className="text-[#4A3D33] text-sm font-light not-italic leading-relaxed">
                  {branch.address}
                  <br />
                  {branch.neighborhood}, {branch.city} — {branch.pincode}
                </address>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          BRANCH INFO STRIP
      ════════════════════════════════════════════ */}
      <BranchInfoStrip branch={branch} />

      {/* ════════════════════════════════════════════
          SERVICES GRID
      ════════════════════════════════════════════ */}
      <BranchServicesGrid branch={branch} />

      {/* ════════════════════════════════════════════
          MAP + CONTACT PANEL
      ════════════════════════════════════════════ */}
      <BranchMapPanel branch={branch} />

      {/* ════════════════════════════════════════════
          BRANCH CTA
      ════════════════════════════════════════════ */}
      <BranchCTA branch={branch} />

      {/* ════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <BranchFAQ branch={branch} />

      {/* ════════════════════════════════════════════
          SEO CONTENT
      ════════════════════════════════════════════ */}
      <BranchSEOContent branch={branch} />
    </main>
  );
}

// ─── Info Strip ──────────────────────────────────────────────────────────────
function BranchInfoStrip({ branch }: { branch: Branch }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  const items = [
    { label: "Location", value: `${branch.neighborhood}, ${branch.city}` },
    { label: "Hours", value: branch.hours },
    { label: "Phone", value: branch.phone, isPhone: true },
    { label: "Rating", value: "4.9 ★ — Luxury Certified" },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-white border-y border-[#EDE5D8]"
      aria-label="Branch quick information"
    >
      <div className="container mx-auto max-w-screen-xl px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#EDE5D8]">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="py-8 px-6 flex flex-col gap-1 hover:bg-[#FFF8EE]/60 transition-colors duration-300"
            >
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#9A8060] font-medium">
                {item.label}
              </span>
              {item.isPhone ? (
                <a
                  href={`tel:${item.value.replace(/\s/g, "")}`}
                  className="text-[#2C2117] text-sm font-medium hover:text-[#9A7840] transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-[#2C2117] text-sm font-medium">{item.value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Grid ────────────────────────────────────────────────────────────
function BranchServicesGrid({ branch }: { branch: Branch }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#FAF6F0 0%,#FFF8EE 50%,#F5EFE6 100%)",
      }}
      aria-labelledby="services-heading"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FFF3DA]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#F5EAD4]/50 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-screen-xl px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              What We Offer
            </span>
          </div>
          <h2
            id="services-heading"
            className="font-display text-3xl md:text-4xl text-[#2C2117] leading-tight"
          >
            Services at{" "}
            <span style={goldText} className="italic">
              {branch.name}
            </span>
            , {branch.city}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.label}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-white border border-[#EDE5D8] p-6 hover:border-[#C9A84C]/50 hover:shadow-[0_6px_28px_rgba(201,168,76,0.10)] transition-all duration-500"
            >
              {/* Gold top hairline */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />

              <div
                className="text-xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block"
                style={goldText}
              >
                {svc.icon}
              </div>
              <h3 className="text-[#2C2117] text-sm font-semibold leading-snug tracking-tight">
                {svc.label}
              </h3>
              <div className="mt-3 text-[8px] tracking-[0.22em] uppercase text-[#9A8060]">
                {branch.neighborhood} · {branch.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Map + Contact Panel ─────────────────────────────────────────────────────
function BranchMapPanel({ branch }: { branch: Branch }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${branch.latitude},${branch.longitude}&z=15&output=embed`;

  return (
    <section
      ref={ref}
      className="relative bg-[#FDFAF6] py-24 overflow-hidden"
      aria-labelledby="location-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FFF3DA]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-screen-xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
                Find Us
              </span>
            </div>

            <h2
              id="location-heading"
              className="font-display text-3xl md:text-4xl text-[#2C2117] leading-tight mb-8"
            >
              Visit{" "}
              <span style={goldText} className="italic">
                {branch.name}
              </span>
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 p-5 bg-white border border-[#EDE5D8] hover:border-[#C9A84C]/40 hover:shadow-[0_4px_16px_rgba(201,168,76,0.08)] transition-all duration-300">
                <span className="text-base mt-0.5 shrink-0" style={goldText}>◈</span>
                <div>
                  <div className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] mb-1.5 font-medium">
                    Address
                  </div>
                  <address className="text-[#4A3D33] text-sm font-light not-italic leading-relaxed">
                    {branch.address}
                    <br />
                    {branch.neighborhood}, {branch.city}
                    <br />
                    {branch.state} — {branch.pincode}
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-5 bg-white border border-[#EDE5D8] hover:border-[#C9A84C]/40 hover:shadow-[0_4px_16px_rgba(201,168,76,0.08)] transition-all duration-300">
                <span className="text-base mt-0.5 shrink-0" style={goldText}>◉</span>
                <div>
                  <div className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] mb-1.5 font-medium">
                    Phone
                  </div>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="text-[#4A3D33] text-sm font-medium hover:text-[#9A7840] transition-colors duration-200"
                    aria-label={`Call Vibe Salon ${branch.name}`}
                  >
                    {branch.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-5 bg-white border border-[#EDE5D8] hover:border-[#C9A84C]/40 hover:shadow-[0_4px_16px_rgba(201,168,76,0.08)] transition-all duration-300">
                <span className="text-base mt-0.5 shrink-0" style={goldText}>✧</span>
                <div>
                  <div className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] mb-1.5 font-medium">
                    Hours
                  </div>
                  <div className="text-[#4A3D33] text-sm font-light">{branch.hours}</div>
                </div>
              </div>
            </div>

            {/* Directions CTA */}
            <div className="mt-8">
              <a
                href={branch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#9A7840] px-8 py-4 text-sm tracking-[0.16em] uppercase font-light hover:bg-[#FFF8EE] hover:border-[#C9A84C] transition-all duration-300"
                aria-label={`Open Google Maps for Vibe Salon ${branch.name}`}
              >
                Open in Google Maps
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

          {/* Right — embedded map */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Gold corner frames */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#C9A84C]/45 z-10" aria-hidden="true" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#C9A84C]/35 z-10" aria-hidden="true" />

            <div className="relative w-full aspect-[4/3] border border-[#EDE5D8] overflow-hidden shadow-[0_8px_40px_rgba(201,168,76,0.10)]">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full"
                style={{ border: 0, filter: "contrast(1.02) saturate(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing Vibe Salon ${branch.name} location at ${branch.address}`}
              />
            </div>

            {/* Floating coordinates badge */}
            <div className="absolute -bottom-5 left-6 bg-white border border-[#EDE5D8] shadow-md px-5 py-3 z-10">
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#9A8060] mb-0.5">
                Coordinates
              </div>
              <div className="text-[#4A3D33] text-xs font-light">
                {branch.latitude.toFixed(4)}°N, {branch.longitude.toFixed(4)}°E
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── useInViewOnce hook ───────────────────────────────────────────────────────
import { useInView } from "framer-motion";

function useInViewOnce(ref: React.RefObject<Element | null>) {
  return useInView(ref, { once: true, margin: "-60px" });
}