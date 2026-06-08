"use client";

import { motion, useInView } from "framer-motion";
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
      "We use only top-tier professional products from globally acclaimed brands — L'Oréal, Wella, Kérastase, and more.",
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
      "Our salons blend contemporary aesthetics with curated ambiance — a space that elevates you from the moment you arrive.",
  },
];

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#FDFAF6] py-28 overflow-hidden"
      aria-labelledby="why-heading">
      {/* Warm gradient accent blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#F5EAD4]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#FFF3E0]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              Why Vibe Salon
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
          <h2
            id="why-heading"
            className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight mb-4">
            The Vibe Difference
          </h2>
          <p className="text-[#7A6A58] text-lg max-w-xl mx-auto font-light leading-relaxed">
            Precision, artistry, and luxury — three pillars that define every
            experience at Vibe Unisex Salon.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 44 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white border border-[#EDE5D8] p-8 hover:border-[#C9A84C]/50 hover:shadow-[0_8px_32px_rgba(201,168,76,0.10)] transition-all duration-500 cursor-default">
              {/* Top gold hairline on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/70 transition-all duration-500" />

              {/* Icon */}
              <div
                className="mb-5 text-2xl transition-transform duration-300 group-hover:scale-110 inline-block"
                style={{
                  background:
                    "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {feat.icon}
              </div>

              <h3 className="text-[#2C2117] text-[15px] font-semibold mb-3 tracking-tight leading-snug">
                {feat.title}
              </h3>
              <p className="text-[#7A6A58] text-sm leading-relaxed font-light">
                {feat.description}
              </p>

              {/* Bottom-right ornament */}
              <span className="absolute bottom-4 right-5 text-[#EDE5D8] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                ✦
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
