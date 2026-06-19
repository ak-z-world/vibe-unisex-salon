"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { useRef } from "react";

const POSTS = [
  {
    id: "1",
    image: "/images/reels/reels1.png",
    url: "https://www.instagram.com/reels/DY9oXQ2JeFS/",
  },
  {
    id: "2",
    image: "/images/reels/reels2.png",
    url: "https://www.instagram.com/reels/DUamoK9EsAY/",
  },
  {
    id: "3",
    image: "/images/reels/reels3.png",
    url: "https://www.instagram.com/reels/DRmW8bpkSlA/",
  },
  {
    id: "4",
    image: "/images/reels/reels4.png",
    url: "https://www.instagram.com/reels/DTfYYOQjQnz/",
  },
  {
    id: "5",
    image: "/images/reels/reels5.png",
    url: "https://www.instagram.com/reels/DX_xZHGyVqh/",
  },
  {
    id: "6",
    image: "/images/reels/reels6.png",
    url: "https://www.instagram.com/reels/DSM7fEnjPB4/",
  },
];

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FDFAF6] py-20 md:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFF3DA]/40 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#9A8060]">
              Live Feed
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl text-[#2C2117]">
            Trending on{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg,#B8922E 0%,#E2C97E 50%,#B8922E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Instagram
            </span>
          </h2>

          <a
            href="https://www.instagram.com/vibe_unisex_salon4/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs uppercase tracking-widest text-[#9A8060] transition-colors duration-300 hover:text-[#C9A84C]"
          >
            @vibe_unisex_salon4 →
          </a>
        </motion.div>

        {/* Reels Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group overflow-hidden rounded-2xl border border-[#EDE5D8] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[420px] md:h-[500px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Instagram Reel"
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Instagram Icon */}
                  <div className="absolute right-3 top-3">
                    <div className="rounded-full bg-white/90 p-1.5 backdrop-blur-sm">
                      <FaInstagram size={14} />
                    </div>
                  </div>

                  {/* View Reel Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[#2C2117] backdrop-blur-sm">
                      <FaInstagram size={12} />
                      View Reel
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}