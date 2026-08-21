"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { SALON_BRANCHES } from "@/lib/branches";

const stats = [
  { value: "15,000+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "6", label: "Chennai Locations" },
  { value: "6+", label: "Years of Excellence" },
];

// Utility to generate dynamic WhatsApp links
const getWhatsAppLink = (phone: string, branchName: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const message = `Hello Vibe Salon, I would like to book an appointment at the ${branchName} branch.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.16, delayChildren: 0.2 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#120E0C]"
      style={{ minHeight: "100svh" }}
      aria-label="Vibe Unisex Salon — Best Premium Unisex Salon in Chennai"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-80"
        >
          <source src="/images/video1.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center opacity-80"
        >
          <source src="/images/video4.mp4" type="video/mp4" />
        </video>

        {/* ───────── Luxury Floating Badge ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="hidden md:block absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-20 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[120px] sm:w-[140px] lg:w-[160px] rounded-2xl border border-[#C9A84C]/30 bg-black/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] px-4 py-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/20 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]">
                Premium
              </span>
              <span className="mt-1 text-base sm:text-lg text-[#C9A84C]">
                ★★★★★
              </span>
              <span className="mt-1 text-[10px] sm:text-xs text-white font-medium tracking-wide">
                4.9 Rating
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/60 tracking-wider mt-1">
                Since 2018
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── GRADIENT OVERLAYS FOR TEXT LEGIBILITY ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/40 md:to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-transparent to-transparent md:hidden" />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent z-[2]" />

      {/* ── MAIN HERO CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-14 xl:px-20 pt-22 sm:pt-30 pb-20 flex flex-col lg:flex-row items-center min-h-[100svh]">
        
        <motion.div
          style={{ y: contentY }}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex-1 w-full lg:pr-16 xl:pr-24 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className="h-[1px] w-8 sm:w-12 bg-[#C9A84C]" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] font-semibold">
              Since 2018 · Chennai&apos;s Finest
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-[1.05] tracking-tight text-white drop-shadow-xl"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] mb-2">
              Best Premium
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] italic font-light"
              style={{
                background: "linear-gradient(135deg, #F7D774 0%, #FFD95C 40%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Unisex Salon
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] mt-2">
              in Chennai
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 text-[#E2D9CC] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-lg drop-shadow-md"
          >
            Luxury hair, beauty & grooming experiences crafted by expert stylists — where every visit is a transformation.
          </motion.p>

          {/* ── REDESIGNED COMPACT BOOKING SECTION ── */}
          <motion.div variants={fadeUp} className="mt-10 sm:mt-12">
            {/* ── REDESIGNED COMPACT BOOKING SECTION ── */}
          <motion.div variants={fadeUp} className="mt-3 sm:mt-2">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <MapPin size={14} className="text-[#C9A84C]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E2D9CC] font-bold">
                Select sanctuary to book via WhatsApp
              </p>
            </div>
            
            {/* High-Intent Luxury Action Pills */}
            <div className="flex flex-wrap gap-3 sm:gap-4 max-w-3xl">
              {SALON_BRANCHES.map((branch) => (
                <Link
                  key={branch.name}
                  href={branch.status === "coming_soon" ? `/branches/${branch.slug}` : getWhatsAppLink(branch.phone, branch.name)}
                  target={branch.status === "coming_soon" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md transition-all duration-400 ease-out hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:shadow-[0_8px_30px_rgba(201,168,76,0.25)] overflow-hidden"
                  aria-label={branch.status === "coming_soon" ? `View upcoming ${branch.name} branch` : `Book appointment at ${branch.name} via WhatsApp`}
                >
                  <span className="relative z-10 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-white group-hover:text-[#120E0C] transition-colors duration-300">
                    {branch.status === "coming_soon" ? `${branch.name} (Opening Soon)` : branch.name}
                  </span>
                  
                  {/* Right Arrow Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C] group-hover:text-[#120E0C] group-hover:translate-x-1 transition-all duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_ease-out_infinite]" />
                </Link>
              ))}
            </div>

            {/* Explore Services Link */}
            <div className="mt-10 sm:mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white font-medium group pb-2 border-b border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
              >
                Explore All Services
                <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/10 bg-black/20 backdrop-blur-sm rounded-sm"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-5 sm:py-6 px-2 sm:px-4 border-r border-white/10 last:border-r-0"
              >
                <span
                  className="font-display text-xl sm:text-2xl md:text-3xl font-light"
                  style={{
                    background: "linear-gradient(135deg, #F7D774 0%, #FFD95C 50%, #C9A84C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="mt-1 sm:mt-2 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#9A8E85] text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM SCROLL CUE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true"
      >
        <span className="text-[8px] sm:text-[9px] text-[#9A8E85] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#C9A84C] to-transparent"
        />
      </motion.div>
    </section>
  );
}