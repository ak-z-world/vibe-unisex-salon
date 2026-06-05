"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: "haircut",
    title: "Hair Cut & Styling",
    description:
      "Precision cuts crafted to complement your face shape, hair texture, and personal style — for men, women, and children.",
    keywords: "Hair Cut Chennai, Professional Hairstylist Chennai",
    icon: "✂",
    gradient: "from-[#C9A84C]/10 to-transparent",
  },
  {
    id: "coloring",
    title: "Hair Coloring",
    description:
      "From subtle highlights to bold balayage and full transformations — executed with globally premium color brands.",
    keywords: "Hair Coloring Chennai, Best hair salon for coloring Chennai",
    icon: "◎",
    gradient: "from-[#C9A84C]/8 to-transparent",
  },
  {
    id: "hairspa",
    title: "Hair Spa",
    description:
      "Restorative hair spa rituals that nourish, strengthen, and bring life back to damaged or dull hair.",
    keywords: "Hair Spa Chennai, Hair Care Chennai",
    icon: "❋",
    gradient: "from-[#C9A84C]/10 to-transparent",
  },
  {
    id: "keratin",
    title: "Keratin Treatment",
    description:
      "Professional keratin smoothing treatments that eliminate frizz and deliver salon-quality results lasting months.",
    keywords: "Keratin Treatment Chennai, Best keratin treatment salon Chennai",
    icon: "⟁",
    gradient: "from-[#C9A84C]/8 to-transparent",
  },
  {
    id: "smoothening",
    title: "Hair Smoothening",
    description:
      "Advanced smoothening services that tame unruly hair and deliver mirror-like shine with lasting softness.",
    keywords: "Hair Smoothening Chennai, Professional hair treatment Chennai",
    icon: "∿",
    gradient: "from-[#C9A84C]/10 to-transparent",
  },
  {
    id: "bridal",
    title: "Bridal Makeup",
    description:
      "Bespoke bridal makeup by our certified artists — timeless, camera-ready looks for your most cherished day.",
    keywords: "Bridal Makeup Chennai, Best bridal makeup artist Chennai",
    icon: "✦",
    gradient: "from-[#C9A84C]/8 to-transparent",
  },
  {
    id: "facial",
    title: "Facial Treatments",
    description:
      "Clinical and luxury facial protocols targeting hydration, brightening, anti-aging, and skin rejuvenation.",
    keywords: "Facial Treatment Chennai, Women beauty services Chennai",
    icon: "◈",
    gradient: "from-[#C9A84C]/10 to-transparent",
  },
  {
    id: "mens",
    title: "Men's Grooming",
    description:
      "Complete grooming suite for modern men — haircuts, beard shaping, skin treatments, and scalp services.",
    keywords: "Men's Grooming Chennai, Hair Cut Chennai for men",
    icon: "◇",
    gradient: "from-[#C9A84C]/8 to-transparent",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-[#1A1410] py-28 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
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
              Our Services
            </span>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2
            id="services-heading"
            className="font-display text-4xl md:text-5xl text-[#FAF8F5] leading-tight mb-4"
          >
            Premium Salon Services
            <br />
            <span className="text-[#C9A84C] italic">in Chennai</span>
          </h2>
          <p className="text-[#6B5F55] text-lg max-w-xl mx-auto font-light">
            A complete menu of luxury beauty and grooming services — curated for discerning
            clients across all of Chennai.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border border-[#C9A84C]/10 bg-[#FAF8F5]/[0.03] p-7 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-all duration-500 cursor-default"
              aria-label={service.title}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(201,168,76,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="text-[#C9A84C] text-2xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                {service.icon}
              </div>
              <h3 className="text-[#FAF8F5] text-base font-semibold mb-3 tracking-tight leading-snug">
                {service.title}
              </h3>
              <p className="text-[#6B5F55] text-sm leading-relaxed font-light mb-6">
                {service.description}
              </p>

              {/* Hidden SEO keywords */}
              <span className="sr-only">{service.keywords}</span>

              <Link
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300"
                aria-label={`Book ${service.title} at Vibe Salon Chennai`}
              >
                Book Now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}