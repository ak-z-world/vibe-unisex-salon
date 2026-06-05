"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const testimonials = [
  {
    name: "Priya Krishnamurthy",
    location: "Anna Nagar, Chennai",
    rating: 5,
    text: "Vibe Salon transformed my hair completely. The keratin treatment they did was flawless — I've tried three other salons in Chennai, but the quality here is unmatched. The ambiance feels premium and the staff is exceptionally professional.",
    initials: "PK",
    service: "Keratin Treatment",
  },
  {
    name: "Arun Selvam",
    location: "T. Nagar, Chennai",
    rating: 5,
    text: "Best men's grooming experience in Chennai. The hair cut styling and beard grooming was executed perfectly. I've been visiting Vibe for over two years and the consistency is remarkable every single time.",
    initials: "AS",
    service: "Men's Grooming",
  },
  {
    name: "Deepika Ramesh",
    location: "Velachery, Chennai",
    rating: 5,
    text: "I had my bridal makeup done at Vibe and received so many compliments. The artists understand what looks natural yet stunning on camera. They gave me exactly the look I envisioned, if not better.",
    initials: "DR",
    service: "Bridal Makeup",
  },
  {
    name: "Karthik Sundar",
    location: "OMR, Chennai",
    rating: 5,
    text: "The hair coloring service at Vibe is exceptional. They used Wella professional products and the balayage turned out perfect. Very clean salon, hygienic tools, and a team that genuinely listens to what you want.",
    initials: "KS",
    service: "Hair Coloring",
  },
  {
    name: "Lakshmi Venkat",
    location: "Adyar, Chennai",
    rating: 5,
    text: "The hair spa treatment at Vibe is the most relaxing and effective one I've experienced. My hair has never felt healthier. The staff is knowledgeable and recommends exactly what your hair needs without overselling.",
    initials: "LV",
    service: "Hair Spa",
  },
  {
    name: "Rahul Menon",
    location: "Porur, Chennai",
    rating: 5,
    text: "I've been to many salons across Chennai, and Vibe stands a class apart. The premium feel, the products they use, and the attention to detail make every visit worth every rupee. My go-to salon for years.",
    initials: "RM",
    service: "Hair Cut & Styling",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#C9A84C] text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback(
    (next: number) => {
      setDirection(next > active ? 1 : -1);
      setActive(next);
    },
    [active]
  );

  const prev = () => navigate(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () => navigate(active === testimonials.length - 1 ? 0 : active + 1);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#FAF8F5] py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

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
              Client Stories
            </span>
            <span className="block h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl md:text-5xl text-[#1A1410] leading-tight mb-4"
          >
            What Chennai Says
            <br />
            <span className="text-[#C9A84C] italic">About Vibe Salon</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main testimonial */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#1A1410] p-10 md:p-14"
              >
                {/* Ambient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

                {/* Quote mark */}
                <div className="font-display text-8xl text-[#C9A84C]/10 leading-none absolute top-6 left-10 select-none pointer-events-none">
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <div className="mb-2">
                    <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light">
                      {testimonials[active].service}
                    </span>
                  </div>

                  <StarRating count={testimonials[active].rating} />

                  <blockquote className="mt-6 mb-8">
                    <p className="text-[#E7D8B1]/85 text-lg md:text-xl font-light leading-relaxed italic">
                      {testimonials[active].text}
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
                      <span className="text-[#C9A84C] text-sm font-semibold">
                        {testimonials[active].initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-[#FAF8F5] font-semibold text-sm">
                        {testimonials[active].name}
                      </div>
                      <div className="text-[#6B5F55] text-xs tracking-wider">
                        {testimonials[active].location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-px transition-all duration-300 ${
                    i === active ? "w-10 bg-[#C9A84C]" : "w-4 bg-[#6B5F55]"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 border border-[#1A1410]/20 flex items-center justify-center text-[#1A1410] hover:bg-[#1A1410] hover:text-[#C9A84C] hover:border-[#1A1410] transition-all duration-300"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-11 h-11 border border-[#1A1410]/20 flex items-center justify-center text-[#1A1410] hover:bg-[#1A1410] hover:text-[#C9A84C] hover:border-[#1A1410] transition-all duration-300"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-6 gap-2 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`View testimonial from ${t.name}`}
                className={`p-3 text-center border transition-all duration-300 ${
                  i === active
                    ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
                    : "border-[#E7D8B1]/40 hover:border-[#C9A84C]/30"
                }`}
              >
                <div
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    i === active ? "text-[#C9A84C]" : "text-[#6B5F55]"
                  }`}
                >
                  {t.initials}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}