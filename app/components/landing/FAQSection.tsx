"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Which is the best unisex salon in Chennai?",
    answer:
      "Vibe Unisex Salon is widely regarded as one of the best premium unisex salons in Chennai. With 5 branches across the city, certified stylists, and internationally acclaimed products from brands like L'Oréal and Wella, Vibe delivers a luxury salon experience for men, women, and all genders — consistently rated 4.9 stars by over 15,000 happy clients.",
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
      "Walk-ins are welcome at all Vibe Salon branches across Chennai, though we strongly recommend booking an appointment — especially for bridal makeup, keratin treatments, and hair coloring — to ensure a dedicated stylist and minimal wait time. You can call your nearest branch or reach out via our contact details to schedule a visit.",
  },
  {
    question: "Which areas in Chennai do Vibe Salon branches serve?",
    answer:
      "Vibe Unisex Salon has 5 branches across Chennai, making premium salon services accessible throughout the city. All our Chennai locations offer the complete range of hair, beauty, and grooming services. Contact us to find your nearest branch.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section
      ref={ref}
      className="relative bg-[#1A1410] py-28 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-light">
                FAQ
              </span>
            </div>
            <h2
              id="faq-heading"
              className="font-display text-4xl md:text-5xl text-[#FAF8F5] leading-tight mb-6"
            >
              Frequently
              <br />
              <span className="text-[#C9A84C] italic">Asked</span>
              <br />
              Questions
            </h2>
            <p className="text-[#6B5F55] text-base font-light leading-relaxed">
              Everything you need to know about Vibe Salon — Chennai&apos;s premium beauty and
              grooming destination.
            </p>

            <div className="mt-10 border border-[#C9A84C]/15 p-6 bg-[#C9A84C]/[0.02]">
              <p className="text-[#E7D8B1]/70 text-sm font-light mb-4">
                Have a different question?
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm tracking-[0.15em] uppercase hover:gap-3 transition-all duration-300"
                aria-label="Call Vibe Salon Chennai"
              >
                Call Us Now →
              </a>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            {/* Schema-compatible FAQ structure */}
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
                  className="border-b border-[#C9A84C]/10 last:border-b-0"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between py-6 text-left group"
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      itemProp="name"
                      className={`text-base font-medium pr-6 transition-colors duration-300 ${
                        open === i ? "text-[#C9A84C]" : "text-[#FAF8F5] group-hover:text-[#C9A84C]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`text-[#C9A84C] text-lg shrink-0 transition-transform duration-300 mt-0.5 ${
                        open === i ? "rotate-45" : ""
                      }`}
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
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-10">
                          <p
                            itemProp="text"
                            className="text-[#6B5F55] text-sm leading-relaxed font-light"
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