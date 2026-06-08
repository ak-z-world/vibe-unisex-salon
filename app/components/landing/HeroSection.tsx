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
      aria-label="Vibe Unisex Salon — Best Premium Unisex Salon in Chennai">
      {/* ── Background texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* ── Warm gradient wash ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFF8EE]/60 via-[#FDFAF6] to-[#F5EFE6]/40" />

      {/* ── Gold accent line top ── */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

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
          className="flex-1 lg:pr-16 xl:pr-24 pb-16 lg:pb-28">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              Since 2018 · Chennai&apos;s Finest
            </span>
          </motion.div>

          {/* H1 — single line each */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-[1.0] tracking-tight text-[#2C2117]">
            <span className="block text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
              Best Premium
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl italic"
              style={{
                background:
                  "linear-gradient(135deg,#B8922E 0%,#E2C97E 45%,#B8922E 100%)",
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
            className="mt-7 text-[#7A6A58] text-lg md:text-xl font-light leading-relaxed max-w-lg">
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
              href="#services"
              className="inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#9A7840] px-9 py-4 text-sm tracking-[0.16em] uppercase font-light hover:bg-[#C9A84C]/6 hover:border-[#C9A84C] transition-all duration-300"
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
                <span className="text-[9px] mt-1 tracking-[0.22em] uppercase text-[#9A8878]">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Hero images ── */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 lg:flex-none lg:w-[46%] xl:w-[44%] relative self-stretch flex items-end pb-0">
          {/* Primary image — hair spa (image 2 — most cinematic) */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[88vh] overflow-hidden">
            {/* Gold border frame */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C]/60" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/60" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C]/60" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C9A84C]/60" />
            </div>

            {/* Gradient fade — bottom */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#FDFAF6] to-transparent z-10" />
            {/* Gradient fade — left to blend with content */}
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FDFAF6] to-transparent z-10 hidden lg:block" />

            <Image
              src="/images/hero-hair-spa.jpg"
              alt="Luxury hair spa treatment at Vibe Unisex Salon Chennai"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
              sizes="(max-width:1024px) 100vw, 46vw"
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-10 left-6 z-20 bg-white/90 backdrop-blur-sm border border-[#E8DDD0] px-6 py-4 shadow-lg shadow-[#C9A84C]/10">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#9A8060] mb-1">
                Rated
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-[#2C2117] font-light">
                  4.9
                </span>
                <span className="text-[#C9A84C] text-sm">★★★★★</span>
              </div>
              <p className="text-[9px] tracking-[0.2em] text-[#9A8878] mt-0.5">
                Chennai&apos;s #1 Luxury Salon
              </p>
            </motion.div>
          </div>

          {/* Secondary image thumbnail — hair wash (image 1) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -left-8 lg:-left-14 w-36 h-36 md:w-44 md:h-44 overflow-hidden border-4 border-[#FDFAF6] shadow-xl shadow-[#9A8060]/15 z-20 hidden sm:block">
            <Image
              src="/images/hero-hair-wash.jpg"
              alt="Professional hair wash service at Vibe Salon Chennai"
              fill
              className="object-cover object-center"
              sizes="176px"
            />
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
