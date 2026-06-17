"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ReelItem {
  id: string;
  reelId: string;       // Extracted from your actual URL shortcodes
  title: string;
}

// Top performing Reel IDs from your Instagram account: vibe_unisex_salon4
const VIBE_LIVE_REELS: ReelItem[] = [
  {
    id: "vibe-embed-1",
    reelId: "DE3PvebS9B3", // Swap with your exact high-performing Reel shortcodes
    title: "Vibe Hair Makeover Chennai",
  },
  {
    id: "vibe-embed-2",
    reelId: "DFX_89GhjK8", 
    title: "Bridal Makeup Transformation Vibe",
  },
  {
    id: "vibe-embed-3",
    reelId: "C_xYz123gHj",
    title: "Premium Keratin Treatment Salon",
  },
];

export default function DirectInstagramReels() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FDFAF6] py-24 overflow-hidden"
      aria-labelledby="live-reels-heading"
    >
      {/* Luxury Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#FFF3DA]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 lg:px-12">
        
        {/* Luxury Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#9A8060] font-medium">
              Live Feed
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
          <h2
            id="live-reels-heading"
            className="font-display text-3xl md:text-5xl text-[#2C2117] leading-tight"
          >
            Trending on{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg,#B8922E 0%,#E2C97E 50%,#B8922E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Instagram
            </span>
          </h2>
          <a 
            href="https://www.instagram.com/vibe_unisex_salon4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs tracking-widest uppercase text-[#9A8060] hover:text-[#B8922E] transition-colors duration-300"
          >
            @vibe_unisex_salon4 →
          </a>
        </motion.div>

        {/* Direct Embed responsive flex/grid ecosystem */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {VIBE_LIVE_REELS.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full bg-white border border-[#EDE5D8] p-3 shadow-[0_4px_30px_rgba(201,168,76,0.04)]"
            >
              {/* Card Accent Top Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
              
              {/* Native Frame Aspect Ratio Container */}
              <div className="relative w-full aspect-[9/16] rounded-sm overflow-hidden bg-black">
                <iframe
                  src={`https://www.instagram.com/reel/${reel.reelId}/embed`}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowTransparency
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  scrolling="no"
                  loading="lazy"
                  title={reel.title}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}