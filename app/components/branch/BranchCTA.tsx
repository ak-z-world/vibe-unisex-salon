// BranchCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Sparkles } from "lucide-react";

type Branch = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  address: string;
  pincode: string;
  state: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  mapsLink: string;
  featuredImageUrl: string;
};

interface BranchCTAProps {
  branch: Branch;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  "Haircut",
  "Hair Spa",
  "Hair Coloring",
  "Keratin",
  "Bridal Makeup",
  "Grooming",
];

export default function BranchCTA({ branch }: BranchCTAProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative w-full overflow-hidden py-20 px-4"
      style={{ background: "linear-gradient(135deg, #FDFAF6 0%, #FAF4E8 100%)" }}
    >
      {/* Ambient decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #D4B896 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #E8D5B0 0%, transparent 60%)" }}
        />
      </div>

      {/* Gold top border accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="rounded-3xl border px-8 py-14 text-center shadow-xl md:px-16"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,252,248,0.95) 0%, rgba(250,246,238,0.92) 100%)",
            borderColor: "rgba(201,168,76,0.25)",
            boxShadow:
              "0 8px 48px rgba(201,168,76,0.12), 0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border"
            style={{
              background: "linear-gradient(135deg, #FAF0D7 0%, #F5E8C0 100%)",
              borderColor: "rgba(201,168,76,0.35)",
            }}
          >
            <Sparkles size={22} style={{ color: "#C9A84C" }} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: "#1A1410" }}
          >
            Book Your Visit at{" "}
            <span style={{ color: "#C9A84C" }}>{branch.name}</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
            className="mx-auto mb-2 max-w-xl text-base leading-relaxed"
            style={{ color: "#6B5F55" }}
          >
            Experience premium salon services tailored for you — from everyday
            elegance to special occasions.
          </motion.p>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mb-10 mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border px-4 py-1 text-xs font-medium tracking-wide"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  borderColor: "rgba(201,168,76,0.28)",
                  color: "#8A6E35",
                }}
              >
                {service}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.38 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={`tel:${branch.phone}`}
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
                color: "#FDFAF6",
                boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
              }}
            >
              <Phone size={16} className="transition-transform duration-300 group-hover:rotate-12" />
              Call Now
            </a>

            <a
              href={branch.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "rgba(201,168,76,0.45)",
                color: "#8A6E35",
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <MapPin size={16} className="transition-transform duration-300 group-hover:scale-110" />
              Get Directions
            </a>
          </motion.div>

          {/* Address footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
            className="mt-7 text-xs tracking-wide"
            style={{ color: "#9E9189" }}
          >
            {branch.address}, {branch.neighborhood}, {branch.city} — {branch.hours}
          </motion.p>
        </motion.div>
      </div>

      {/* Gold bottom border accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent 100%)",
        }}
      />
    </section>
  );
}