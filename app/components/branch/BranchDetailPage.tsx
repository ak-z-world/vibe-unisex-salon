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
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden bg-[#FDFAF6]"
        aria-label={`Vibe Unisex Salon ${branch.name}`}
      >
        {/* FULL VIDEO BACKGROUND */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
          >
            <source src="/images/video3.mp4" type="video/mp4" />
          </video>

          {/* Responsive Luxury Overlay */}
          {/* Mobile: Uniform fade for readability. Desktop: Left-heavy cinematic fade */}
          <div className="absolute inset-0 md:hidden" />
          <div
            className="hidden md:block absolute inset-0"
            style={{
              background: `
          linear-gradient(
            90deg,
            rgba(253,250,246,0.95) 0%,
            rgba(253,250,246,0.10) 0%,
            rgba(253,250,246,0.30) 0%,
            transparent 10%
          )
        `,
            }}
          />

          {/* Premium Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.06) 100%)",
            }}
          />
        </motion.div>

        {/* Gold Top Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent z-20" />

        {/* CONTENT */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 min-h-[100svh] flex items-center pt-24 pb-16"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-2xl flex flex-col items-start text-left">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-8 md:w-12 h-px bg-[#C9A84C]" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.45em] uppercase text-[#C9A84C] font-semibold md:whitespace-nowrap">
                  {branch.neighborhood} • {branch.city}
                </span>
              </div>

              {/* Heading */}
              <h1 className="leading-[1.1] md:leading-[0.95] flex flex-col gap-2">
                <span className="block text-[#1A1410] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                  Vibe Unisex Salon
                </span>

                <span
                  className="block italic text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] pb-1.5 font-light md:whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C 0%, #E7D8B1 50%, #A8882C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {branch.name}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 md:mt-5 text-base md:text-lg lg:text-xl leading-relaxed text-[#ffffff] max-w-[540px]">
                Premium hair, beauty & grooming in{" "}
                <strong className="text-[#f8e0ab] font-medium">{branch.neighborhood}</strong>,{" "}
                {branch.city}. Expert stylists, international-grade products and
                luxury experiences crafted for modern lifestyles.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                {[branch.hours, branch.city, "4.9 ★ Luxury Rated"].map((item) => (
                  <div
                    key={item}
                    className="bg-white/80 backdrop-blur-md border border-[#E7D8B1]/50 px-4 py-2 md:px-5 md:py-3 rounded-none text-xs md:text-sm text-[#1A1410] font-medium shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mt-10 md:mt-12 w-full sm:w-auto">
                <a
                  href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  className="w-full sm:w-auto text-center px-8 md:px-10 py-4 md:py-5 uppercase tracking-[0.15em] md:tracking-[0.18em] text-xs md:text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #E7D8B1, #C9A84C)",
                    color: "#1A1410",
                    boxShadow: "0 10px 30px rgba(201,168,76,0.25)",
                  }}
                >
                  Book Appointment
                </a>

                <a
                  href={branch.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-8 md:px-10 py-4 md:py-5 border border-[#C9A88C]/40 bg-white/40 backdrop-blur-md uppercase tracking-[0.15em] md:tracking-[0.18em] text-xs md:text-sm text-[#b18305] font-semibold transition-all duration-300 hover:bg-white/70 hover:border-[#C9A84C]"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#FDFAF6] to-transparent z-10" />
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