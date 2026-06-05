"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

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
  const spring = useSpring(count, { stiffness: 60, damping: 15, restDelta: 0.5 });
  const display = useTransform(spring, (v) => {
    const rounded = Math.round(v);
    return rounded >= 1000
      ? `${(rounded / 1000).toFixed(rounded % 1000 === 0 ? 0 : 1)}K`
      : `${rounded}`;
  });

  useEffect(() => {
    if (inView) count.set(value);
  }, [inView, value, count]);

  return (
    <motion.span className="font-display text-4xl md:text-5xl text-[#C9A84C] font-light tabular-nums">
      {display.get()}
      {suffix}
    </motion.span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#FAF8F5] py-28 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Decorative elements */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#E7D8B1]/30 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-light">
                About Vibe Salon
              </span>
            </div>

            <h2
              id="about-heading"
              className="font-display text-4xl md:text-5xl text-[#1A1410] leading-tight mb-6"
            >
              Chennai&apos;s Premier
              <br />
              <span className="text-[#C9A84C] italic">Beauty Destination</span>
            </h2>

            <div className="space-y-5 text-[#6B5F55] font-light leading-relaxed">
              <p>
                Founded with a singular vision — to bring internationally acclaimed salon standards
                to Chennai — Vibe Unisex Salon has grown into the city&apos;s most trusted name in
                premium beauty and grooming since 2018.
              </p>
              <p>
                Every stylist in our team undergoes rigorous training under global mentors, ensuring
                that the craft behind every cut, color, and treatment meets the highest benchmarks of
                excellence. We don&apos;t just follow trends; we help our clients set them.
              </p>
              <p>
                With five thoughtfully designed branches across Chennai, Vibe is built for
                discerning clients who believe beauty is an experience — not just a service. Our
                promise is consistent luxury, regardless of which location you visit.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[#C9A84C] text-xl">◈</span>
                <span className="text-[#1A1410] text-sm font-medium">L&apos;Oréal Authorized Salon</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9A84C] text-xl">◈</span>
                <span className="text-[#1A1410] text-sm font-medium">Wella Certified Stylists</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C9A84C] text-xl">◈</span>
                <span className="text-[#1A1410] text-sm font-medium">ISO 9001 Hygiene Standards</span>
              </div>
            </div>
          </motion.div>

          {/* Right — metrics + visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Visual card */}
            <div className="relative bg-[#1A1410] p-12 mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

              <blockquote className="relative z-10">
                <p className="font-display text-xl md:text-2xl text-[#FAF8F5] italic leading-relaxed mb-6">
                  &ldquo;Our mission is to make every client in Chennai feel the same elevated
                  experience that a visit to a world-class international salon would deliver.&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-[#C9A84C]/40 flex items-center justify-center">
                    <span className="text-[#C9A84C] text-sm">V</span>
                  </div>
                  <div>
                    <div className="text-[#E7D8B1] text-sm font-semibold">Vibe Salon Team</div>
                    <div className="text-[#6B5F55] text-xs tracking-wider uppercase">
                      Chennai&apos;s Finest
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Animated metrics */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="bg-white border border-[#E7D8B1]/60 p-6 text-center hover:border-[#C9A84C]/40 hover:shadow-[0_4px_20px_rgba(201,168,76,0.08)] transition-all duration-300"
                >
                  <AnimatedNumber
                    value={metric.value}
                    suffix={metric.suffix}
                    inView={inView}
                  />
                  <div className="text-[#6B5F55] text-xs tracking-[0.2em] uppercase mt-1 font-light">
                    {metric.label}
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