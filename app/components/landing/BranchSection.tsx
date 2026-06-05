"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SALON_BRANCHES } from "@/lib/branches";
import Link from "next/link";

export default function BranchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#1A1410] py-28 overflow-hidden"
      aria-labelledby="branches-heading"
    >
      {/* Ambient decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-light">
              Our Locations
            </span>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2
            id="branches-heading"
            className="font-display text-4xl md:text-5xl text-[#FAF8F5] leading-tight mb-4"
          >
            Visit Our Chennai
            <br />
            <span className="text-[#C9A84C] italic">Salon Locations</span>
          </h2>
          <p className="text-[#6B5F55] text-lg max-w-xl mx-auto font-light">
            Five premium Vibe Salon branches across Chennai — each designed to deliver the same
            world-class experience, close to where you are.
          </p>
        </motion.div>

        {/* Branch cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SALON_BRANCHES.map((branch, i) => (
            <motion.article
              key={branch.id ?? i}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border border-[#C9A84C]/10 bg-[#FAF8F5]/[0.02] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/[0.03] transition-all duration-500 overflow-hidden"
              aria-label={`Vibe Salon ${branch.name} branch`}
            >
              {/* Top gold accent */}
              <div className="h-px bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/0 group-hover:via-[#C9A84C] group-hover:to-[#C9A84C]/0 transition-all duration-500" />

              {/* Branch number watermark */}
              <div className="absolute top-4 right-5 font-display text-6xl text-[#C9A84C]/[0.04] font-light select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="p-8">
                {/* Branch name */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-light block mb-1">
                      Vibe Salon
                    </span>
                    <h3 className="text-[#FAF8F5] text-xl font-semibold tracking-tight">
                      {branch.name}
                    </h3>
                  </div>
                  <span className="text-[#C9A84C] text-lg mt-1">◉</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#C9A84C]/10 mb-6" />

                {/* Details */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <span className="text-[#C9A84C] text-xs mt-0.5 shrink-0">◈</span>
                    <div>
                      <div className="text-[#6B5F55] text-[10px] tracking-[0.25em] uppercase mb-1">
                        Address
                      </div>
                      <address className="text-[#E7D8B1]/80 text-sm font-light not-italic leading-relaxed">
                        {branch.address}
                        {branch.city ? `, ${branch.city}` : ", Chennai"}
                      </address>
                    </div>
                  </div>

                  {/* Phone */}
                  {branch.phone && (
                    <div className="flex gap-3">
                      <span className="text-[#C9A84C] text-xs mt-0.5 shrink-0">◈</span>
                      <div>
                        <div className="text-[#6B5F55] text-[10px] tracking-[0.25em] uppercase mb-1">
                          Phone
                        </div>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, "")}`}
                          className="text-[#E7D8B1]/80 text-sm font-light hover:text-[#C9A84C] transition-colors duration-200"
                          aria-label={`Call Vibe Salon ${branch.name}`}
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Timing */}
                  {branch.hours && (
                    <div className="flex gap-3">
                      <span className="text-[#C9A84C] text-xs mt-0.5 shrink-0">◈</span>
                      <div>
                        <div className="text-[#6B5F55] text-[10px] tracking-[0.25em] uppercase mb-1">
                          Hours
                        </div>
                        <div className="text-[#E7D8B1]/80 text-sm font-light">{branch.hours}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-4">
                  {branch.mapsLink && (
                    <Link
                      href={branch.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.2em] uppercase border border-[#C9A84C]/30 px-4 py-2 hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
                      aria-label={`Get directions to Vibe Salon ${branch.name}`}
                    >
                      Get Directions
                      <span>→</span>
                    </Link>
                  )}
                  <Link
                    href={branch.phone ? `tel:${branch.phone.replace(/\s/g, "")}` : "tel:+919876543210"}
                    className="inline-flex items-center gap-2 text-[#6B5F55] text-xs tracking-[0.2em] uppercase hover:text-[#C9A84C] transition-colors duration-300"
                    aria-label={`Call Vibe Salon ${branch.name}`}
                  >
                    Call Now →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}