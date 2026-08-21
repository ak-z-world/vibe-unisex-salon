"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Which is the best unisex salon in Chennai?",
    answer:
      "Vibe Unisex Salon is widely regarded as one of the best premium unisex salons in Chennai. With 5 active branches across Anna Nagar, T. Nagar, Ekkatuthangal, Porur, and Velachery — plus our upcoming 6th location in Virugambakkam (opening September 2026) — Vibe delivers a luxury salon experience with certified stylists and premium hair & beauty products.",
  },
  {
    question: "What are your hair spa charges?",
    answer:
      "Our hair spa packages are tailored to your hair type, length, and treatment goals, so prices vary accordingly. We offer basic nourishing spas to advanced restorative treatments. For accurate pricing, we recommend visiting your nearest Vibe Salon branch in Chennai or calling us directly — our consultation is always complimentary.",
  },
  {
    question: "Do you provide bridal makeup services?",
    answer:
      "Yes, Vibe Salon offers comprehensive bridal makeup services in Chennai. Our certified bridal artists specialise in traditional South Indian bridal looks, contemporary styles, and everything in between. We recommend booking bridal consultations and trial sessions well in advance to ensure the perfect look for your special day.",
  },
  {
    question: "Do you offer keratin treatment in Chennai?",
    answer:
      "Yes, keratin treatment is one of our most popular services at Vibe Salon. We use professional-grade keratin solutions that eliminate frizz, add shine, and keep hair smooth for months. Our stylists assess your hair type before recommending the most suitable keratin treatment for lasting results.",
  },
  {
    question: "Which salon is best for hair coloring in Chennai?",
    answer:
      "Vibe Unisex Salon is highly recommended for professional hair coloring in Chennai. We use Wella, L'Oréal Professionnel, and other premium color brands. Our certified colorists are trained in balayage, highlights, ombre, global color, and creative coloring techniques — ensuring vibrant, lasting results with minimal hair damage.",
  },
  {
    question: "Do you provide men's grooming services?",
    answer:
      "Absolutely. Men's grooming is a core part of our offering at Vibe Salon. We provide precision haircuts, beard shaping and sculpting, scalp treatments, facial services, and hair coloring specifically for men. Our unisex salon environment is relaxed, professional, and welcoming for all clients.",
  },
  {
    question: "Do I need an appointment to visit Vibe Salon?",
    answer:
      "Walk-ins are welcome at all Vibe Salon active branches across Chennai, though we strongly recommend booking an appointment — especially for bridal makeup, keratin treatments, and hair coloring — to ensure a dedicated stylist and minimal wait time. You can call your nearest branch or pre-book slots for our upcoming Virugambakkam branch.",
  },
  {
    question: "Which areas in Chennai do Vibe Salon branches serve?",
    answer:
      "Vibe Unisex Salon operates 5 active branches across Chennai — Anna Nagar, T. Nagar, Porur, Velachery, and Ekkatuthangal — and is opening its 6th location in Virugambakkam on September 1, 2026.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#FAF6F0 0%,#FFF8EE 50%,#F5EFE6 100%)",
      }}
      aria-labelledby="faq-heading"
    >
      {/* Rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Blobs */}
      <div className="pointer-events-none absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-[#FFF3DA]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-[#F5EAD4]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left — label + contact nudge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
                FAQ
              </span>
            </div>
            <h2
              id="faq-heading"
              className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight mb-5"
            >
              Frequently
              <br />
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
                Asked
              </span>
              <br />
              Questions
            </h2>
            <p className="text-[#7A6A58] text-[15px] font-light leading-relaxed">
              Everything you need to know about Vibe Salon — Chennai&apos;s
              premium beauty and grooming destination.
            </p>

            <div className="mt-10 border border-[#EDE5D8] bg-white p-6">
              <p className="text-[#7A6A58] text-sm font-light mb-4">
                Have a different question?
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#9A7840] font-medium hover:gap-3 transition-all duration-300"
                aria-label="Call Vibe Salon Chennai"
              >
                Call Us Now →
              </a>
            </div>
          </motion.div>

          {/* Right — Schema-compatible accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div
              itemScope
              itemType="https://schema.org/FAQPage"
              className="space-y-0"
            >
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="border-b border-[#EDE5D8] last:border-b-0"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between py-6 text-left group"
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      itemProp="name"
                      className="text-[15px] font-medium pr-6 transition-colors duration-300 text-[#2C2117] group-hover:text-[#9A7840]"
                      style={
                        open === i
                          ? {
                              background:
                                "linear-gradient(135deg,#B8922E 0%,#C9A030 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }
                          : {}
                      }
                    >
                      {faq.question}
                    </span>
                    <span
                      className="text-lg shrink-0 mt-0.5 transition-all duration-300"
                      style={{
                        transform: open === i ? "rotate(45deg)" : "none",
                        background:
                          "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-10">
                          <p
                            itemProp="text"
                            className="text-[#7A6A58] text-sm leading-relaxed font-light"
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}