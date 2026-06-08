// BranchFAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

interface BranchFAQProps {
  branch: Branch;
}

interface FAQItem {
  question: string;
  answer: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function buildFAQs(branch: Branch): FAQItem[] {
  return [
    {
      question: `Where is Vibe Unisex Salon ${branch.name} located?`,
      answer: `Vibe Unisex Salon ${branch.name} is located at ${branch.address}, ${branch.neighborhood}, ${branch.city} — ${branch.state} ${branch.pincode}. You can use our Get Directions button to navigate directly via Google Maps.`,
    },
    {
      question: "What are the working hours?",
      answer: `Our salon is open ${branch.hours}. We recommend arriving a few minutes early, especially during peak hours on weekends and holidays.`,
    },
    {
      question: "Do I need an appointment?",
      answer:
        "Walk-ins are always welcome, though we strongly recommend booking an appointment to avoid waiting times — especially for services like bridal makeup, keratin treatments, or hair spa sessions that require extended chair time.",
    },
    {
      question: "What services are available?",
      answer:
        "We offer a comprehensive range of luxury salon services including precision haircuts, hair spa & deep conditioning, hair coloring (balayage, global, highlights), keratin smoothing treatments, bridal makeup, grooming for men & women, threading, waxing, and facials.",
    },
    {
      question: `Is parking available near ${branch.neighborhood}?`,
      answer: `Yes, parking is generally available in and around the ${branch.neighborhood} area. Our staff can guide you to the nearest convenient parking when you call us. You can also check street parking options on Google Maps.`,
    },
    {
      question: "Do you offer bridal makeup services?",
      answer:
        "Absolutely. We provide full bridal makeup packages including trial sessions, HD/airbrush makeup, hairstyling, and bridal draping. We recommend booking bridal slots at least 2–4 weeks in advance to ensure availability.",
    },
    {
      question: "Do you provide keratin treatment?",
      answer:
        "Yes, we offer professional keratin smoothing and straightening treatments using premium formulas suited for Indian hair textures. The treatment typically takes 2–3 hours. Post-care advice is provided by our stylists.",
    },
    {
      question: "How can I contact the branch?",
      answer: `You can reach our ${branch.name} branch directly at ${branch.phone}. Our team is available during working hours (${branch.hours}) to answer queries, confirm appointments, or assist with any service-related information.`,
    },
  ];
}

export default function BranchFAQ({ branch }: BranchFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = buildFAQs(branch);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full py-20 px-4"
      style={{ background: "#FDFAF6" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#C9A84C" }}
          >
            Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: "#1A1410" }}
          >
            Everything You Need to Know
          </h2>
          <div
            className="mx-auto mt-5 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            }}
          />
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE, delay: idx * 0.06 }}
              >
                <div
                  className="overflow-hidden rounded-2xl border transition-all duration-300"
                  style={{
                    borderColor: isOpen
                      ? "rgba(201,168,76,0.4)"
                      : "rgba(201,168,76,0.18)",
                    background: isOpen
                      ? "linear-gradient(135deg, #FEF9F0 0%, #FAF4E4 100%)"
                      : "#FDFAF6",
                    boxShadow: isOpen
                      ? "0 4px 24px rgba(201,168,76,0.1)"
                      : "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                  >
                    <span
                      className="text-sm font-medium leading-snug md:text-base"
                      style={{ color: isOpen ? "#1A1410" : "#3D3228" }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex-shrink-0"
                      style={{ color: "#C9A84C" }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-6 pb-5 pt-0 text-sm leading-relaxed"
                          style={{ color: "#6B5F55" }}
                        >
                          <div
                            className="mb-4 h-px w-full"
                            style={{
                              background: "rgba(201,168,76,0.2)",
                            }}
                          />
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}