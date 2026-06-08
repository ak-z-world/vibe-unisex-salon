"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
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
        <span
          key={i}
          className="text-sm"
          style={{
            background:
              "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback(
    (next: number) => {
      setDirection(next > active ? 1 : -1);
      setActive(next);
    },
    [active]
  );

  const prev = () =>
    navigate(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () =>
    navigate(active === testimonials.length - 1 ? 0 : active + 1);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -50 }),
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#FDFAF6] py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#FFF3DA]/40 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.38em] uppercase text-[#9A8060] font-medium">
              Client Stories
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl md:text-5xl text-[#2C2117] leading-tight"
          >
            What Chennai Says{" "}
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
              About Vibe
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main card */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white border border-[#EDE5D8] p-10 md:p-14 shadow-[0_4px_40px_rgba(201,168,76,0.07)]"
              >
                {/* Gold top hairline */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

                {/* Decorative quote mark */}
                <div className="font-display text-9xl text-[#C9A84C]/[0.06] leading-none absolute top-4 left-8 select-none pointer-events-none">
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <div className="mb-2">
                    <span className="text-[9px] tracking-[0.28em] uppercase text-[#9A8060] font-medium">
                      {testimonials[active].service}
                    </span>
                  </div>

                  <StarRating count={testimonials[active].rating} />

                  <blockquote className="mt-6 mb-8">
                    <p className="text-[#4A3D33] text-lg md:text-xl font-light leading-relaxed italic">
                      {testimonials[active].text}
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center text-sm font-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg,#B8922E 0%,#E2C97E 50%,#C9A030 100%)",
                      }}
                    >
                      {testimonials[active].initials}
                    </div>
                    <div>
                      <div className="text-[#2C2117] font-semibold text-sm">
                        {testimonials[active].name}
                      </div>
                      <div className="text-[#9A8878] text-xs tracking-wide">
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
            {/* Progress dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="h-px transition-all duration-400"
                  style={{
                    width: i === active ? "40px" : "16px",
                    background:
                      i === active
                        ? "linear-gradient(90deg,#B8922E,#E2C97E)"
                        : "#D4C4B0",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 border border-[#EDE5D8] flex items-center justify-center text-[#7A6A58] hover:bg-[#FFF8EE] hover:border-[#C9A84C]/50 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-11 h-11 border border-[#EDE5D8] flex items-center justify-center text-[#7A6A58] hover:bg-[#FFF8EE] hover:border-[#C9A84C]/50 transition-all duration-300"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-6 gap-2 mt-7">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`View testimonial from ${t.name}`}
                className="py-3 text-center border transition-all duration-300"
                style={{
                  borderColor:
                    i === active ? "rgba(201,168,76,0.6)" : "#EDE5D8",
                  background: i === active ? "#FFF8EE" : "transparent",
                }}
              >
                <div
                  className="text-xs font-semibold"
                  style={{
                    background:
                      i === active
                        ? "linear-gradient(135deg,#B8922E 0%,#E2C97E 60%,#B8922E 100%)"
                        : "none",
                    WebkitBackgroundClip: i === active ? "text" : "unset",
                    WebkitTextFillColor:
                      i === active ? "transparent" : "#9A8878",
                    backgroundClip: i === active ? "text" : "unset",
                    color: i === active ? undefined : "#9A8878",
                  }}
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