"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SALON_BRANCHES } from "@/lib/branches";

// Utility to generate dynamic WhatsApp links
const getWhatsAppLink = (phone: string, branchName: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const message = `Hello Vibe Salon, I would like to book an appointment at the ${branchName} branch.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-12 lg:py-18 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]"
      style={{
        background: "linear-gradient(180deg, #FAFAF8 0%, #FDFBF7 40%, #FFF8EE 100%)",
      }}
      aria-labelledby="cta-heading"
    >
      {/* Subtle corner framing marks for an editorial feel */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#C9A84C]/30" aria-hidden="true" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#C9A84C]/30" aria-hidden="true" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-[#C9A84C]/30" aria-hidden="true" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#C9A84C]/30" aria-hidden="true" />

      {/* Center ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* Typographic Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#9A8060] font-medium">
              Book Your Visit
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
          </div>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-display text-[#16110E] tracking-tight flex flex-col items-center gap-2"
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-medium">
              Experience Premium
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl italic font-light text-[#C9A84C]">
              Beauty Like Never Before
            </span>
          </h2>

          <p className="mt-8 text-[#6B5F55] text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Select your preferred location below to instantly reserve your appointment via WhatsApp. Over 15,000 clients trust Vibe for their signature look.
          </p>
        </motion.div>

        {/* Branch Selection Grid */}
        <div className="mt-20 w-full flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-[10px] tracking-[0.25em] uppercase text-[#9A8060] mb-8"
          >
            Select a sanctuary to begin
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 w-full max-w-4xl">
            {SALON_BRANCHES.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={getWhatsAppLink(branch.phone, branch.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-center items-center w-[220px] h-[120px] border border-[#E5DFD5] bg-white/60 backdrop-blur-sm transition-all duration-500 hover:border-[#C9A84C] hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(201,168,76,0.15)] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Default State Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 translate-y-0 opacity-100 group-hover:-translate-y-8 group-hover:opacity-0">
                    <span className="text-sm font-semibold tracking-wider text-[#16110E] uppercase mb-1">
                      {branch.name}
                    </span>
                    <span className="text-[10px] tracking-widest text-[#9A8060] uppercase">
                      {branch.neighborhood}
                    </span>
                  </div>

                  {/* Hover State Content (WhatsApp CTA) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-[#FAF6F0]">
                    <div className="flex items-center gap-2 text-[#C9A84C]">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="text-[11px] font-semibold tracking-widest uppercase">
                        Book via WA
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Minimalist Trust Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex items-center gap-6 text-[#9A8060]"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">5 Locations</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C3B3]" />
          <span className="text-[10px] tracking-[0.2em] uppercase">Open Daily</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C3B3]" />
          <span className="text-[10px] tracking-[0.2em] uppercase">Walk-ins Welcome</span>
        </motion.div>

      </div>
    </section>
  );
}