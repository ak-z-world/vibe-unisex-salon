"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 48,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const lineReveal: Variants = {
    hidden: {
      scaleX: 0,
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.5,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#1A1410]"
      aria-label="Vibe Unisex Salon — Best Premium Unisex Salon in Chennai">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(201,168,76,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(201,168,76,0.07)_0%,transparent_60%)]" />
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-px h-48 bg-gradient-to-t from-transparent via-[#C9A84C]/20 to-transparent" />
      </motion.div>

      {/* Ornamental top bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 lg:px-16 pt-32 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-8">
            <motion.span
              variants={lineReveal}
              className="block h-px w-16 bg-[#C9A84C] origin-left"
            />
            <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-light">
              Since 2018 · Chennai&apos;s Finest
            </span>
            <motion.span
              variants={lineReveal}
              className="block h-px w-16 bg-[#C9A84C] origin-right"
            />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF8F5] leading-[0.95] tracking-tight mb-6">
            Best Premium
            <br />
            <span className="text-[#C9A84C] italic">Unisex Salon</span>
            <br />
            in Chennai
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-[#E7D8B1]/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Luxury Hair, Beauty &amp; Grooming Experiences Crafted By Expert
            Stylists — where every visit is a transformation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="tel:+919876543210"
              className="group relative inline-flex items-center gap-3 bg-[#C9A84C] text-[#1A1410] px-10 py-4 text-sm tracking-[0.15em] uppercase font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.5)]"
              aria-label="Book appointment at Vibe Salon Chennai">
              <span className="relative z-10">Book Appointment</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute inset-0 bg-[#E7D8B1] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
            <Link
              href="#services"
              className="group inline-flex items-center gap-3 border border-[#C9A84C]/40 text-[#C9A84C] px-10 py-4 text-sm tracking-[0.15em] uppercase font-light hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300"
              aria-label="Explore Vibe Salon services">
              <span>Explore Services</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#C9A84C]/10 border border-[#C9A84C]/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2 + i * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="group flex flex-col items-center py-8 px-4 bg-[#1A1410] hover:bg-[#C9A84C]/5 transition-colors duration-300">
                <span className="text-[#C9A84C] text-3xl md:text-4xl font-display font-light mb-1">
                  {stat.value}
                </span>
                <span className="text-[#6B5F55] text-xs tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true">
        <span className="text-[#6B5F55] text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
