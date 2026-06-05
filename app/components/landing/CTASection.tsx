"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#1A1410] py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,168,76,0.10)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Ornamental corner lines */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#C9A84C]/20" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#C9A84C]/20" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#C9A84C]/20" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#C9A84C]/20" aria-hidden="true" />

      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-light">
              Book Your Visit
            </span>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-display text-4xl md:text-6xl text-[#FAF8F5] leading-tight mb-6"
          >
            Experience Premium
            <br />
            <span className="text-[#C9A84C] italic">Beauty Like Never Before</span>
          </h2>

          {/* Sub */}
          <p className="text-[#6B5F55] text-lg font-light mb-12 leading-relaxed">
            Book your appointment at one of our Chennai locations and discover why over 15,000
            clients trust Vibe for their hair, beauty, and grooming needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="tel:+919876543210"
                className="group relative inline-flex items-center gap-3 bg-[#C9A84C] text-[#1A1410] px-12 py-5 text-sm tracking-[0.2em] uppercase font-semibold overflow-hidden hover:shadow-[0_0_60px_rgba(201,168,76,0.4)] transition-shadow duration-500"
                aria-label="Call to book appointment at Vibe Salon Chennai"
              >
                <span className="relative z-10">Book Appointment</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-[#E7D8B1] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="#branches"
                className="group inline-flex items-center gap-3 border border-[#C9A84C]/40 text-[#C9A84C] px-12 py-5 text-sm tracking-[0.2em] uppercase font-light hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300"
                aria-label="View all Vibe Salon Chennai branches"
              >
                <span>Find a Branch</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 text-[#6B5F55] text-xs tracking-[0.2em] uppercase"
          >
            5 Locations Across Chennai &nbsp;·&nbsp; Open Daily &nbsp;·&nbsp; Walk-ins Welcome
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}