"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "15,000+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "5", label: "Chennai Locations" },
  { value: "6+", label: "Years of Excellence" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FDFAF6]"
      style={{ minHeight: "100svh" }}
      aria-label="Vibe Unisex Salon — Best Premium Unisex Salon in Chennai"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Desktop / Tablet Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/images/video1.mp4" type="video/mp4" />
        </video>

        {/* Mobile Portrait Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/images/video4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── CLEAN, LIGHT OVERLAY FOR TEXT READABILITY (No Blur/Noise) ── */}
      {/* Mobile gets a uniform light wash; Desktop gets a smooth left-to-right fade */}
      <div className="absolute inset-0 z-[1] md:hidden" />
      <div
        className="hidden md:block absolute inset-0 z-[1]"
        style={{
          background: `
        linear-gradient(
          90deg,
          rgba(253,250,246,0.95) 0%,
          rgba(253,250,246,0.75) 0%,
          rgba(253,250,246,0.15) 5%,
          transparent 10%
        )
      `
        }}
      />

      {/* ── Gold accent line top ── */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent z-[2]" />

      {/* ════════════════════════════════════════
      MAIN HERO GRID
  ════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-14 xl:px-20 pt-32 pb-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 min-h-screen">
        {/* ── LEFT — Copy ── */}
        <motion.div
          style={{ y: contentY }}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex-1 lg:pr-16 xl:pr-24 pb-16 lg:pb-28"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-[#ffffff]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#ffffff] font-semibold">
              Since 2018 · Chennai&apos;s Finest
            </span>
          </motion.div>

          {/* H1 — single line each */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-[1.0] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="block text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
              Best Premium
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl italic"
              style={{
                background:
                  "linear-gradient(135deg,#F7D774 0%,#FFD95C 50%,#D4A63C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Unisex Salon
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
              in Chennai
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="mt-7 text-white text-lg md:text-xl font-light leading-relaxed max-w-lg drop-shadow-lg">
            Luxury hair, beauty &amp; grooming experiences crafted by expert
            stylists — where every visit is a transformation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="tel:+919876543210"
              className="group relative inline-flex items-center gap-3 overflow-hidden px-9 py-4 text-sm tracking-[0.16em] uppercase font-semibold text-[#2C2117]"
              style={{
                background:
                  "linear-gradient(135deg,#D4A840 0%,#EDD58A 50%,#C9A030 100%)",
              }}
              aria-label="Book appointment at Vibe Salon Chennai">
              <span className="relative z-10">Book Appointment</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>

            <Link
              href="/services"
              className="
                inline-flex
                items-center
                gap-3
                border
                border-white/40
                text-white
                px-9
                py-4
                text-sm
                tracking-[0.16em]
                uppercase
                font-light
                hover:bg-white/10
                hover:border-[#FFD95C]
                transition-all
                duration-300
                "
              aria-label="Explore Vibe Salon services">
              Explore Services →
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[#E8DDD0]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-6 px-4 border-r border-[#E8DDD0] last:border-r-0 hover:bg-[#FFF8EE]/70 transition-colors duration-300">
                <span
                  className="font-display text-2xl md:text-3xl font-light"
                  style={{
                    background:
                      "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  {s.value}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/80">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true">
        <span className="text-[9px] text-[#B0A090] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
