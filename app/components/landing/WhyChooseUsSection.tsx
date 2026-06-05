"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "✦",
    title: "International Styling Standards",
    description:
      "Our stylists are trained to global benchmarks, bringing world-class techniques to every service we offer in Chennai.",
  },
  {
    icon: "◈",
    title: "Certified Beauty Experts",
    description:
      "Every artist at Vibe holds industry certifications and undergoes continuous skill development workshops.",
  },
  {
    icon: "◉",
    title: "Premium Product Range",
    description:
      "We use only top-tier professional products from globally acclaimed brands — L'Oréal, Wella, Kerastase, and more.",
  },
  {
    icon: "✧",
    title: "Hygienic Environment",
    description:
      "Sterilized tools, sanitized stations, and strict hygiene protocols ensure every client receives a safe experience.",
  },
  {
    icon: "⬡",
    title: "Personalised Consultation",
    description:
      "Every visit begins with a detailed consultation. We craft services that suit your unique hair type and style goals.",
  },
  {
    icon: "◇",
    title: "Modern Salon Experience",
    description:
      "Our salons blend contemporary aesthetics with curated ambiance — a space that makes you feel elevated the moment you enter.",
  },
];

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#FAF8F5] py-28 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#E7D8B1]/20 blur-3xl pointer-events-none" />

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
              Why Vibe Salon
            </span>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2
            id="why-heading"
            className="font-display text-4xl md:text-5xl text-[#1A1410] leading-tight mb-4"
          >
            The Vibe Difference
          </h2>
          <p className="text-[#6B5F55] text-lg max-w-xl mx-auto font-light">
            Precision, artistry, and luxury — three pillars that define every experience at
            Vibe Unisex Salon.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white border border-[#E7D8B1]/60 p-8 hover:border-[#C9A84C]/50 hover:shadow-[0_8px_40px_rgba(201,168,76,0.12)] transition-all duration-500 cursor-default"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C] transition-all duration-500" />

              <div className="text-[#C9A84C] text-3xl mb-6 font-light transition-transform duration-300 group-hover:scale-110 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-[#1A1410] text-lg font-semibold mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#6B5F55] text-sm leading-relaxed font-light">
                {feature.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute bottom-4 right-4 text-[#E7D8B1] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ✦
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}