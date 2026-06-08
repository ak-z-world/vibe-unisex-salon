"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const metrics = [
  { value: 15000, suffix: "+", label: "Satisfied Clients" },
  { value: 6, suffix: "+", label: "Years in Chennai" },
  { value: 5, suffix: "", label: "Salon Branches" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const count = useMotionValue(0);

  const spring = useSpring(count, {
    stiffness: 55,
    damping: 14,
    restDelta: 0.5,
  });

  const display = useTransform(spring, (v) => {
    const r = Math.round(v);
    return r >= 1000
      ? `${(r / 1000).toFixed(r % 1000 === 0 ? 0 : 1)}K`
      : `${r}`;
  });

  const [displayValue, setDisplayValue] = useState("0");

  useMotionValueEvent(display, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    if (inView) count.set(value);
  }, [inView, value, count]);

  return (
    <motion.span
      className="font-display text-3xl md:text-4xl font-light tabular-nums"
      style={{
        background:
          "linear-gradient(135deg,#B8922E 0%,#E2C97E 55%,#B8922E 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#FDFAF6] py-28 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient warmth */}
      <div className="pointer-events-none absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full bg-[#FFF3DA]/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#F5EAD4]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT — Images panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Primary image — facial treatment (image 3) — cinematic */}
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              {/* Gold corner frames */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#C9A84C]/50" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#C9A84C]/50" />
              </div>
              <Image
                src="/images/about-facial.jpg"
                alt="Professional facial treatment at Vibe Unisex Salon Chennai"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 44vw"
              />
              {/* Warm vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF6]/20 to-transparent" />
            </div>

            {/* Secondary inset image — post-facial relaxation (image 4) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-6 lg:-right-10 w-40 h-40 md:w-52 md:h-52 overflow-hidden border-4 border-[#FDFAF6] shadow-xl shadow-[#9A8060]/15 z-20"
            >
              <Image
                src="/images/about-facial-relax.jpg"
                alt="Client relaxing after luxury facial at Vibe Salon Chennai"
                fill
                className="object-cover object-center"
                sizes="208px"
              />
            </motion.div>

            {/* Stat pill floating */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="absolute top-8 -right-5 lg:-right-8 z-20 bg-white border border-[#EDE5D8] shadow-lg shadow-[#C9A84C]/08 px-6 py-4"
            >
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] mb-1">
                Premium Certified
              </p>
              <p className="text-[#2C2117] text-xs font-medium">
                L&apos;Oréal · Wella · Kérastase
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Copy + metrics ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
                About Vibe Salon
              </span>
            </div>

            <h2
              id="about-heading"
              className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight mb-6"
            >
              Chennai&apos;s Premier
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
                Beauty Destination
              </span>
            </h2>

            <div className="space-y-4 text-[#7A6A58] font-light leading-relaxed text-[15px]">
              <p>
                Founded with a singular vision — to bring internationally
                acclaimed salon standards to Chennai — Vibe Unisex Salon has
                grown into the city&apos;s most trusted name in premium beauty
                and grooming since 2018.
              </p>
              <p>
                Every stylist in our team undergoes rigorous training under
                global mentors, ensuring that the craft behind every cut, color,
                and treatment meets the highest benchmarks of excellence. We
                don&apos;t just follow trends; we help our clients set them.
              </p>
              <p>
                With five thoughtfully designed branches across Chennai, Vibe is
                built for discerning clients who believe beauty is an experience
                — not just a service.
              </p>
            </div>

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap gap-5">
              {[
                "L'Oréal Authorized Salon",
                "Wella Certified Stylists",
                "ISO 9001 Hygiene Standards",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span
                    className="text-base"
                    style={{
                      background:
                        "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ◈
                  </span>
                  <span className="text-[#2C2117] text-xs font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* Animated metrics grid */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.65, ease: "easeOut" }}
                  className="bg-white border border-[#EDE5D8] p-5 text-center hover:border-[#C9A84C]/40 hover:shadow-[0_4px_18px_rgba(201,168,76,0.09)] transition-all duration-300"
                >
                  <AnimatedNumber
                    value={m.value}
                    suffix={m.suffix}
                    inView={inView}
                  />
                  <div className="text-[9px] tracking-[0.22em] uppercase text-[#9A8878] mt-1 font-light">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}