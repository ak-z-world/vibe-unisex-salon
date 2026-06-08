"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "haircut",
    title: "Hair Cut & Styling",
    description:
      "Precision cuts crafted to complement your face shape, hair texture, and personal style — for men, women, and children.",
    keywords: "Hair Cut Chennai, Professional Hairstylist Chennai",
    icon: "✂",
    image: "/images/salon2.jpg",
    imagePlaceholder: "bg-gradient-to-br from-[#F5EAD4] to-[#EDD8B8]",
  },
  {
    id: "coloring",
    title: "Hair Coloring",
    description:
      "From subtle highlights to bold balayage and full transformations — executed with globally premium color brands.",
    keywords: "Hair Coloring Chennai, Best hair salon for coloring Chennai",
    icon: "◎",
    image: "/images/salon2.jpg",
    imagePlaceholder: "bg-gradient-to-br from-[#EDE5D8] to-[#DDD0C0]",
  },
  {
    id: "hairspa",
    title: "Hair Spa",
    description:
      "Restorative hair spa rituals that nourish, strengthen, and bring life back to damaged or dull hair.",
    keywords: "Hair Spa Chennai, Hair Care Chennai",
    icon: "❋",
    // Image 2 — steamy luxury hair spa
    image: "/images/salon4.jpg",
    imageAlt: "Luxury hair spa treatment at Vibe Salon Chennai",
    imagePlaceholder: "bg-gradient-to-br from-[#F0E8D8] to-[#E2D4C0]",
  },
  {
    id: "keratin",
    title: "Keratin Treatment",
    description:
      "Professional keratin smoothing treatments that eliminate frizz and deliver salon-quality results lasting months.",
    keywords: "Keratin Treatment Chennai, Best keratin treatment salon Chennai",
    icon: "⟁",
    image: "/images/salon2.jpg",
    imagePlaceholder: "bg-gradient-to-br from-[#F5EAD4] to-[#EDD8B8]",
  },
  {
    id: "smoothening",
    title: "Hair Smoothening",
    description:
      "Advanced smoothening services that tame unruly hair and deliver mirror-like shine with lasting softness.",
    keywords: "Hair Smoothening Chennai, Professional hair treatment Chennai",
    icon: "∿",
    // Image 1 — hair wash / shampoo (cinematic, 1-2 people)
    image: "/images/salon3.jpg",
    imageAlt: "Hair wash and smoothening treatment at Vibe Salon Chennai",
    imagePlaceholder: "bg-gradient-to-br from-[#EDE5D8] to-[#DDD0C0]",
  },
  {
    id: "bridal",
    title: "Bridal Makeup",
    description:
      "Bespoke bridal makeup by our certified artists — timeless, camera-ready looks for your most cherished day.",
    keywords: "Bridal Makeup Chennai, Best bridal makeup artist Chennai",
    icon: "✦",
    image: "/images/salon2.jpg",
    imagePlaceholder: "bg-gradient-to-br from-[#F0E8D8] to-[#E2D4C0]",
  },
  {
    id: "facial",
    title: "Facial Treatments",
    description:
      "Clinical and luxury facial protocols targeting hydration, brightening, anti-aging, and skin rejuvenation.",
    keywords: "Facial Treatment Chennai, Women beauty services Chennai",
    icon: "◈",
    // Image 3 — professional facial (two staff, one client, clinical yet premium)
    image: "/images/salon2.jpg",
    imageAlt: "Professional facial treatment at Vibe Salon Chennai",
    imagePlaceholder: "bg-gradient-to-br from-[#F5EAD4] to-[#EDD8B8]",
  },
  {
    id: "mens",
    title: "Men's Grooming",
    description:
      "Complete grooming suite for modern men — haircuts, beard shaping, skin treatments, and scalp services.",
    keywords: "Men's Grooming Chennai, Hair Cut Chennai for men",
    icon: "◇",
    image: "/images/salon2.jpg",
    imagePlaceholder: "bg-gradient-to-br from-[#EDE5D8] to-[#DDD0C0]",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg,#FAF6F0 0%,#FFF8EE 40%,#F5EFE6 100%)",
      }}
      aria-labelledby="services-heading"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF3DA]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#F5EAD4]/40 blur-3xl" />

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
              Our Services
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
          <h2
            id="services-heading"
            className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight mb-4"
          >
            Premium Salon Services{" "}
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
              in Chennai
            </span>
          </h2>
          <p className="text-[#7A6A58] text-lg max-w-xl mx-auto font-light">
            A complete menu of luxury beauty and grooming services — curated for
            discerning clients across all of Chennai.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <motion.article
              key={svc.id}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white border border-[#EDE5D8] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-[0_8px_36px_rgba(201,168,76,0.12)] transition-all duration-500"
              aria-label={svc.title}
            >
              {/* Image zone — cinematic 16/9 */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                {svc.image ? (
                  <>
                    <Image
                      src={svc.image}
                      alt={svc.imageAlt ?? svc.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    />
                    {/* Warm overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                  </>
                ) : (
                  <div
                    className={`w-full h-full ${svc.imagePlaceholder} flex items-center justify-center`}
                  >
                    <span
                      className="text-4xl opacity-40"
                      style={{
                        background:
                          "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {svc.icon}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[#2C2117] text-[14px] font-semibold tracking-tight leading-snug">
                    {svc.title}
                  </h3>
                  <span
                    className="text-base ml-2 shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {svc.icon}
                  </span>
                </div>
                <p className="text-[#7A6A58] text-xs leading-relaxed font-light mb-5">
                  {svc.description}
                </p>
                <span className="sr-only">{svc.keywords}</span>
                <Link
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-1.5 text-[#9A7840] text-[10px] tracking-[0.22em] uppercase font-medium hover:gap-2.5 transition-all duration-300"
                  aria-label={`Book ${svc.title} at Vibe Salon Chennai`}
                >
                  Book Now →
                </Link>
              </div>

              {/* Gold hairline top */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}