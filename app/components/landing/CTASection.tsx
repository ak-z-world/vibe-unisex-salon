"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(150deg,#FFFDF8 0%,#FFF8EE 35%,#F5EFE6 70%,#FAF6F0 100%)",
      }}
      aria-labelledby="cta-heading"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      {/* Warm ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#FFF3DA]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F5EAD4]/40 blur-3xl" />

      {/* Ornamental corner brackets */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C]/25" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/25" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C]/25" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#C9A84C]/25" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              Book Your Visit
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          {/* Headline — single lines */}
          <h2
            id="cta-heading"
            className="font-display leading-tight text-[#2C2117]"
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
              Experience Premium
            </span>
            <span
              className="block text-4xl md:text-5xl lg:text-6xl italic mt-1 whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg,#B8922E 0%,#E2C97E 45%,#B8922E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Beauty Like Never Before
            </span>
          </h2>

          <p className="mt-6 text-[#7A6A58] text-lg font-light leading-relaxed max-w-xl mx-auto">
            Book your appointment at one of our Chennai locations and discover
            why over 15,000 clients trust Vibe for their hair, beauty, and
            grooming needs.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="tel:+919876543210"
                className="group relative inline-flex items-center gap-3 overflow-hidden px-12 py-5 text-sm tracking-[0.18em] uppercase font-semibold text-[#2C2117]"
                style={{
                  background:
                    "linear-gradient(135deg,#D4A840 0%,#EDD58A 50%,#C9A030 100%)",
                  boxShadow: "0 4px 24px rgba(201,168,76,0.25)",
                }}
                aria-label="Call to book appointment at Vibe Salon Chennai"
              >
                <span className="relative z-10">Book Appointment</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href="#branches"
                className="group inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#9A7840] px-12 py-5 text-sm tracking-[0.18em] uppercase font-light hover:bg-[#FFF8EE] hover:border-[#C9A84C] transition-all duration-300"
                aria-label="View all Vibe Salon Chennai branches"
              >
                Find a Branch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 text-[#B0A090] text-[10px] tracking-[0.25em] uppercase"
          >
            5 Locations Across Chennai &nbsp;·&nbsp; Open Daily &nbsp;·&nbsp; Walk-ins Welcome
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}