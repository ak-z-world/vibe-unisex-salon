"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SALON_BRANCHES } from "@/lib/branches";
import Link from "next/link";

export default function BranchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="branches"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#FAF6F0 0%,#FFF8EE 50%,#F5EFE6 100%)",
      }}
      aria-labelledby="branches-heading"
    >
      {/* Rule lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-[#FFF3DA]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#F5EAD4]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              Our Locations
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
          <h2
            id="branches-heading"
            className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight mb-4"
          >
            Visit Our Chennai{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg,#B8922E 0%,#E2C97E 50%,#B8922E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Salon Locations
            </span>
          </h2>
          <p className="text-[#7A6A58] text-lg max-w-xl mx-auto font-light leading-relaxed">
            Five premium Vibe Salon branches across Chennai — each designed to
            deliver the same world-class experience, close to where you are.
          </p>
        </motion.div>

        {/* Branch cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SALON_BRANCHES.map((branch, i) => (
            <motion.article
              key={branch.id ?? i}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white border border-[#EDE5D8] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-[0_8px_36px_rgba(201,168,76,0.12)] transition-all duration-500"
              aria-label={`Vibe Salon ${branch.name} branch`}
            >
              {/* Gold top hairline on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/70 transition-all duration-500" />

              {/* Watermark number */}
              <div className="absolute top-4 right-5 font-display text-7xl text-[#C9A84C]/[0.04] font-light select-none pointer-events-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="p-8">
                {/* Branch label + name */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[9px] tracking-[0.32em] uppercase text-[#9A8060] font-medium block mb-1">
                      Vibe Salon
                    </span>
                    <h3 className="text-[#2C2117] text-xl font-semibold tracking-tight">
                      {branch.name}
                    </h3>
                  </div>
                  <span
                    className="text-lg mt-1"
                    style={{
                      background:
                        "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ◉
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 to-transparent mb-6" />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span
                      className="text-xs mt-0.5 shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ◈
                    </span>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[#9A8878] mb-1">
                        Address
                      </div>
                      <address className="text-[#4A3D33] text-sm font-light not-italic leading-relaxed">
                        {branch.address}
                        {branch.city ? `, ${branch.city}` : ", Chennai"}
                      </address>
                    </div>
                  </div>

                  {branch.phone && (
                    <div className="flex gap-3">
                      <span
                        className="text-xs mt-0.5 shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        ◈
                      </span>
                      <div>
                        <div className="text-[9px] tracking-[0.25em] uppercase text-[#9A8878] mb-1">
                          Phone
                        </div>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, "")}`}
                          className="text-[#4A3D33] text-sm font-light hover:text-[#9A7840] transition-colors duration-200"
                          aria-label={`Call Vibe Salon ${branch.name}`}
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {branch.hours && (
                    <div className="flex gap-3">
                      <span
                        className="text-xs mt-0.5 shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        ◈
                      </span>
                      <div>
                        <div className="text-[9px] tracking-[0.25em] uppercase text-[#9A8878] mb-1">
                          Hours
                        </div>
                        <div className="text-[#4A3D33] text-sm font-light">
                          {branch.hours}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-7 flex items-center gap-4">
                  {branch.mapsLink && (
                    <Link
                      href={branch.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#9A7840] border border-[#C9A84C]/40 px-4 py-2 hover:bg-[#FFF8EE] hover:border-[#C9A84C] transition-all duration-300"
                      aria-label={`Get directions to Vibe Salon ${branch.name}`}
                    >
                      Get Directions →
                    </Link>
                  )}
                  <Link
                    href={
                      branch.phone
                        ? `tel:${branch.phone.replace(/\s/g, "")}`
                        : "tel:+919876543210"
                    }
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.22em] uppercase text-[#9A8878] hover:text-[#9A7840] transition-colors duration-300"
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