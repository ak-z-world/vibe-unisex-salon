"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SALON_BRANCHES } from "@/lib/branches";

/* ─── design tokens ─── */
const gold = "#C9A84C";
const charcoal = "#1A1410";
const taupe = "#6B5F55";
const cream = "#FAF8F5";
const pearl = "#FDFAF6";
const champagne = "#FAF4E8";

/* ─── FadeUp helper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Gold divider ─── */
function GoldRule({ className = "w-16" }: { className?: string }) {
  return (
    <div
      className={`mt-5 mx-auto h-px ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
      }}
    />
  );
}

/* ─── data (preserved exactly) ─── */
const SERVICES = [
  {
    number: "01",
    label: "Hair Cut & Styling",
    desc: "Precision cuts tailored to your face shape and lifestyle.",
  },
  {
    number: "02",
    label: "Hair Color",
    desc: "Balayage, highlights, global colour using international techniques.",
  },
  {
    number: "03",
    label: "Hair Spa",
    desc: "Deep nourishing treatments restoring lustre and strength.",
  },
  {
    number: "04",
    label: "Keratin Treatment",
    desc: "Frizz-free, silky smooth hair lasting up to 5 months.",
  },
  {
    number: "05",
    label: "Bridal Makeup",
    desc: "Flawless bridal looks crafted for Chennai traditions.",
  },
  {
    number: "06",
    label: "Facial Treatments",
    desc: "Premium dermatologist-grade facial experiences.",
  },
  {
    number: "07",
    label: "Men's Grooming",
    desc: "Modern cuts, beard sculpting and luxury grooming rituals.",
  },
];

const WHYS = [
  {
    number: "01",
    title: "Certified Stylists",
    desc: "Every artist is internationally trained and regularly upskilled.",
  },
  {
    number: "02",
    title: "Premium Products",
    desc: "Salon-exclusive brands including L'Oréal, Wella and Schwarzkopf.",
  },
  {
    number: "03",
    title: "Hygiene Standards",
    desc: "Strict sterilisation and NABH-aligned sanitation protocols.",
  },
  {
    number: "04",
    title: "Bridal Experts",
    desc: "Dedicated bridal team with 500+ weddings styled.",
  },
  {
    number: "05",
    title: "Hair Specialists",
    desc: "Advanced scalp analysis and treatment planning.",
  },
  {
    number: "06",
    title: "Customer Satisfaction",
    desc: "Trusted by thousands of clients across Chennai.",
  },
];

const FAQS = [
  {
    q: "How many Vibe Unisex Salon branches are there in Chennai?",
    a: "Vibe Unisex Salon has 5 premium branches across Chennai — Anna Nagar, T Nagar, Ekkatuthangal, Porur, and Velachery — making us one of Chennai's most accessible luxury salon chains.",
  },
  {
    q: "Do I need an appointment at Vibe Salon Chennai?",
    a: "Walk-ins are always welcome; however, we recommend booking an appointment online or by phone to guarantee your preferred time slot, especially on weekends.",
  },
  {
    q: "What services does Vibe Unisex Salon offer in Chennai?",
    a: "We offer a comprehensive menu: hair cutting and styling, hair colour (balayage, highlights, global), keratin smoothening, hair spa, bridal makeup, facial treatments, and men's grooming.",
  },
  {
    q: "Is Vibe Salon suitable for men as well?",
    a: "Absolutely. Vibe is a true unisex salon. Our men's grooming menu includes modern hair cuts, beard sculpting, scalp treatments, and skin-care facials.",
  },
  {
    q: "Which is the best salon for bridal makeup in Chennai?",
    a: "Vibe Unisex Salon is widely regarded as one of the best bridal makeup studios in Chennai, with a dedicated bridal team experienced in South Indian, North Indian, Christian, and fusion wedding looks.",
  },
  {
    q: "Does Vibe Salon use premium hair care products?",
    a: "Yes. We exclusively use professional-grade products from internationally recognised brands such as L'Oréal Professionnel, Wella Professionals, Schwarzkopf, and Kérastase.",
  },
  {
    q: "What are the opening hours of Vibe Salon branches in Chennai?",
    a: "All branches are open Monday to Saturday 9:00 AM – 9:00 PM and Sunday 10:00 AM – 7:00 PM.",
  },
];

/* ─── FAQ ACCORDION ─── */
function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.details
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
      className="group border-b last:border-b-0"
      style={{ borderColor: "rgba(201,168,76,0.2)" }}
    >
      <summary
        className="flex items-start justify-between cursor-pointer py-5 gap-4 list-none"
      >
        <span
          className="font-semibold text-base leading-snug transition-colors duration-200"
          style={{ color: charcoal }}
        >
          {faq.q}
        </span>
        <span
          className="text-xl flex-shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-300"
          style={{ color: gold }}
        >
          +
        </span>
      </summary>
      <p className="pb-5 text-sm leading-relaxed" style={{ color: taupe }}>
        {faq.a}
      </p>
    </motion.details>
  );
}

/* ─── BRANCH CARD ─── */
function BranchCard({ branch, index }: { branch: (typeof SALON_BRANCHES)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative overflow-hidden rounded-2xl border transition-all duration-500"
      style={{
        background: pearl,
        borderColor: "rgba(201,168,76,0.2)",
        boxShadow: "0 2px 16px rgba(201,168,76,0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.55)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(201,168,76,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(201,168,76,0.07)";
      }}
    >
      {/* image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={branch.featuredImageUrl}
          alt={`Vibe Unisex Salon ${branch.name} Chennai`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              ", transparent 100%)",
          }}
        />
        <span
          className="absolute top-4 left-4 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
            color: pearl,
            boxShadow: "0 2px 10px rgba(201,168,76,0.3)",
          }}
        >
          {branch.name}
        </span>
      </div>

      {/* content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold tracking-wide" style={{ color: charcoal }}>
          Vibe Unisex Salon {" "}
          <span style={{ color: gold }}>{branch.name}</span>
        </h2>

        <div className="space-y-2 text-sm" style={{ color: taupe }}>
          <div className="flex gap-3 items-start">
            <span style={{ color: gold }}>📍</span>
            <span>{branch.address}</span>
          </div>
          <div className="flex gap-3 items-start">
            <span style={{ color: gold }}>📞</span>
            <a
              href={`tel:${branch.phone}`}
              className="transition-colors duration-200 hover:underline"
              style={{ color: taupe }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = gold)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = taupe)}
            >
              {branch.phone}
            </a>
          </div>
          <div className="flex gap-3 items-start">
            <span style={{ color: gold }}>🕐</span>
            <span>{branch.hours}</span>
          </div>
        </div>

        <Link
          href={`/branches/${branch.slug}`}
          className="inline-flex items-center gap-2 mt-2 text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full w-full justify-center border transition-all duration-300"
          style={{
            borderColor: "rgba(201,168,76,0.4)",
            color: gold,
            background: "rgba(201,168,76,0.06)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)";
            el.style.color = pearl;
            el.style.borderColor = "transparent";
            el.style.boxShadow = "0 4px 18px rgba(201,168,76,0.3)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(201,168,76,0.06)";
            el.style.color = gold;
            el.style.borderColor = "rgba(201,168,76,0.4)";
            el.style.boxShadow = "none";
          }}
        >
          View Branch →
        </Link>
      </div>

      {/* corner decoration */}
      <div
        className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 rounded-tr-2xl transition-colors duration-500"
        style={{ borderColor: "rgba(201,168,76,0.25)" }}
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function BranchListingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main
      className="min-h-screen font-serif"
      style={{ background: cream, color: charcoal }}
    >
      {/* ──────────── HERO ──────────── */}
      <header
        ref={heroRef}
        className="relative h-[92vh] min-h-[700px] flex items-center justify-center overflow-hidden pt-20 md:pt-24"
      >
        {/* parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/video2.mp4" type="video/mp4" />
          </video>

          {/* Premium overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.35) 0%,
        rgba(0,0,0,0.25) 85%,
        rgba(250,248,245,0.75) 100%
      )
    `,
            }}
          />
          {/* ───────── Luxury Floating Badge ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="
    absolute
    bottom-6
    right-4
    sm:bottom-8
    sm:right-6
    lg:bottom-10
    lg:right-10
    z-20
"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
      relative
      w-[120px]
      sm:w-[140px]
      lg:w-[160px]
      rounded-2xl
      border border-[#D4AF37]/25
      bg-black/35
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      px-3
      py-3
      overflow-hidden
    "
            >
              {/* Soft Gold Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">

                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]">
                  Premium
                </span>

                <span className="mt-1 text-base sm:text-lg text-[#D4AF37]">
                  ★★★★★
                </span>

                <span className="mt-1 text-[10px] sm:text-xs text-white font-medium">
                  4.9 Rating
                </span>

                <span className="text-[9px] sm:text-[10px] text-white/70">
                  Since 2018
                </span>

              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ambient gold vertical lines */}
        <div
          className="absolute left-0 top-0 h-full w-px opacity-30"
          style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 h-full w-px opacity-30"
          style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }}
        />

        {/* hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-15 md:pt-15"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-xs font-sans tracking-[0.3em] uppercase mb-6"
            style={{ color: gold }}
          >
            Chennai's Premier Luxury Salon Group
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
            style={{
              color: "#FAF8F5",
              textShadow: "0 4px 30px rgba(0,0,0,0.45)",
            }}
          >
            Best Premium Unisex
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #F4D06F 0%, #FFE7A3 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Salon Branches
            </span>
            <br />
            in Chennai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 2px 15px rgba(0,0,0,0.55)",
            }}
          >
            Five luxury locations across Chennai. One uncompromising standard of beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#branches"
              className="px-8 py-4 text-xs font-bold tracking-widest uppercase font-sans rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
                color: pearl,
                boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
              }}
            >
              Find a Branch
            </a>
            <a
              href="tel:+919876543210"
              className="px-8 py-4 text-xs font-bold tracking-widest uppercase font-sans rounded-full border transition-all duration-300"
              style={{
                borderColor: "rgba(201,168,76,0.5)",
                color: "#8A6E35",
                background: "rgba(201,168,76,0.08)",
              }}
            >
              Book Now
            </a>
          </motion.div>

          {/* branch count strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center justify-center gap-8 flex-wrap"
          >
            {["5 Branches", "10+ Years", "500+ Bridal", "4.9★ Rated"].map((s) => (
              <div key={s} className="text-center">
                <span className="font-bold text-lg" style={{ color: gold }}>
                  {s.split(" ")[0]}
                </span>
                <span className="text-xs font-sans ml-1" style={{ color: taupe }}>
                  {s.split(" ").slice(1).join(" ")}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest font-sans uppercase"
            style={{ color: "rgba(201,168,76,0.6)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-px h-10"
            style={{
              background: `linear-gradient(to bottom, ${gold}, transparent)`,
            }}
          />
        </motion.div>
      </header>

      {/* ──────────── BRANCH GRID ──────────── */}
      <section id="branches" className="py-24 px-6 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-sans mb-4"
            style={{ color: gold }}
          >
            Our Locations
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: charcoal }}
          >
            5 Premium Branches{" "}
            <br className="hidden md:block" />
            <span style={{ color: gold }}>Across Chennai</span>
          </h2>
          <GoldRule />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALON_BRANCHES.map((branch, i) => (
            <BranchCard key={branch.slug} branch={branch} index={i} />
          ))}
        </div>
      </section>

      {/* ──────────── WHY VIBE ──────────── */}
      <section
        className="py-24 px-6"
        style={{
          background: `linear-gradient(180deg, ${champagne} 0%, #F5EDD8 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-sans mb-4"
              style={{ color: gold }}
            >
              Our Promise
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ color: charcoal }}
            >
              Why Chennai Chooses{" "}
              <span style={{ color: gold }}>Vibe</span>
            </h2>
            <GoldRule />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHYS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div
                  className="group p-8 rounded-2xl border transition-all duration-500 relative overflow-hidden h-full"
                  style={{
                    background: pearl,
                    borderColor: "rgba(201,168,76,0.18)",
                    boxShadow: "0 2px 12px rgba(201,168,76,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,168,76,0.45)";
                    el.style.boxShadow = "0 6px 32px rgba(201,168,76,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,168,76,0.18)";
                    el.style.boxShadow = "0 2px 12px rgba(201,168,76,0.06)";
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-4xl font-light tracking-tight"
                      style={{
                        color: "rgba(180,168,76,1)",
                      }}
                    >
                      {item.number}
                    </span>

                    <div
                      className="h-px w-16"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(201,168,76,0.8), transparent)",
                      }}
                    />
                  </div>
                  <h3
                    className="font-bold text-lg mb-3 font-sans"
                    style={{ color: gold }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-sans" style={{ color: taupe }}>
                    {item.desc}
                  </p>
                  {/* subtle hover sheen */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "rgba(201,168,76,0.03)" }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SERVICES ──────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-sans mb-4"
            style={{ color: gold }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: charcoal }}
          >
            Luxury Services at{" "}
            <br className="hidden md:block" />
            <span style={{ color: gold }}>Every Branch</span>
          </h2>
          <GoldRule />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.label} delay={i * 0.07}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="group relative overflow-hidden rounded-3xl h-full p-8 border"
                style={{
                  background:
                    "linear-gradient(180deg,#FFFFFF 0%,#FCF8F1 100%)",
                  borderColor: "rgba(201,168,76,0.18)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
                }}
              >
                {/* Glow Background */}
                <div
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-700"
                  style={{
                    background: "rgba(201,168,76,0.18)",
                  }}
                />

                {/* Top Gold Line */}
                <div
                  className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg,#C9A84C,#F4D06F,#C9A84C)",
                  }}
                />

                {/* Number */}
                <div className="mb-8 flex items-center justify-between">
                  <span
                    className="text-6xl font-bold leading-none"
                    style={{
                      color: "#C9A84C",
                      opacity: 0.80,
                    }}
                  >
                    {svc.number}
                  </span>

                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-xl font-semibold tracking-tight"
                  style={{
                    color: charcoal,
                  }}
                >
                  {svc.label}
                </h3>

                {/* Description */}
                <p
                  className="text-[15px] leading-7"
                  style={{
                    color: taupe,
                  }}
                >
                  {svc.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg,#C9A84C,#E8C96A,#C9A84C)",
                  }}
                />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section
        className="py-24 px-6"
        style={{ background: champagne }}
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p
              className="text-xs tracking-[0.3em] uppercase font-sans mb-4"
              style={{ color: gold }}
            >
              FAQ
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: charcoal }}
            >
              Frequently Asked{" "}
              <span style={{ color: gold }}>Questions</span>
            </h2>
            <GoldRule />
          </FadeUp>

          {/* Schema wrapper preserved exactly */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: pearl,
              borderColor: "rgba(201,168,76,0.2)",
              boxShadow: "0 4px 24px rgba(201,168,76,0.08)",
            }}
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <div className="px-8 py-2">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <FAQItem faq={faq} index={i} />
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="hidden"
                  >
                    <span itemProp="text">{faq.a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SEO CONTENT ──────────── */}
      <section
        aria-hidden="true"
        className="max-w-4xl mx-auto overflow-hidden"
        style={{
          maxHeight: "1px",
          opacity: 0.01,
          pointerEvents: "none",
          userSelect: "none",
          position: "relative",
          zIndex: -1,
        }}
      >
        <FadeUp>
          <article className="prose max-w-none space-y-6 font-sans leading-relaxed text-base">
            <h2
              className="text-2xl md:text-3xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Best Unisex Salon in Chennai — Vibe Salon Across 5 Locations
            </h2>
            <p style={{ color: taupe }}>
              When it comes to finding a{" "}
              <strong style={{ color: gold }}>premium salon in Chennai</strong> that consistently delivers
              internationally inspired results, Vibe Unisex Salon stands in a class of its own. With five
              strategically located branches — Anna Nagar, T Nagar, Ekkatuthangal, Porur, and Velachery —
              Vibe brings luxury hair and beauty experiences to every major neighbourhood in the city.
            </p>
            <p style={{ color: taupe }}>
              Chennai's beauty landscape has evolved dramatically over the last decade. Today's discerning clients
              expect more than a routine haircut; they seek a holistic grooming experience that combines skilled
              artistry, premium products, and an ambiance that transports them far from the everyday. Vibe Unisex
              Salon was founded on this very philosophy, and our five Chennai branches are a testament to our
              unwavering commitment to that standard.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Luxury Hair Salon Chennai — Setting International Benchmarks
            </h3>
            <p style={{ color: taupe }}>
              At every <strong style={{ color: gold }}>hair salon in Chennai</strong> bearing the Vibe name,
              you will find stylists who have trained at leading academies and are conversant with the latest
              global techniques. Our colour specialists are certified in balayage, ombre, foilyage, and vivid
              colour correction — skills that define a{" "}
              <strong style={{ color: gold }}>luxury salon in Chennai</strong>. Whether you walk into our Anna
              Nagar flagship or our busy T Nagar studio, the tools, products, and talent are identical.
            </p>
            <p style={{ color: taupe }}>
              We exclusively use professional-grade product lines from global houses such as L'Oréal Professionnel,
              Wella Professionals, Schwarzkopf Professional, and Kérastase. This commitment to premium products
              ensures that every treatment — from a simple blow-dry to a complex colour correction — delivers
              lasting, healthy results without compromising the integrity of your hair.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Best Bridal Makeup Chennai — A Dedicated Bridal Studio Experience
            </h3>
            <p style={{ color: taupe }}>
              Chennai is a city of grand weddings, and brides deserve nothing less than perfection on their special
              day. Our dedicated bridal team at Vibe Unisex Salon specialises in{" "}
              <strong style={{ color: gold }}>bridal makeup in Chennai</strong> across traditions — South Indian,
              North Indian, Christian, Indo-Western, and fusion styles. Each bridal consultation is personalised,
              incorporating skin type analysis, a full trial session, and a bespoke hair and makeup plan that
              complements the bride's outfit and jewellery. With more than 500 weddings styled across Chennai, our
              bridal experts are trusted by families across the city.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Hair Spa Chennai — Rejuvenation Beyond the Surface
            </h3>
            <p style={{ color: taupe }}>
              Our <strong style={{ color: gold }}>hair spa in Chennai</strong> is not an add-on service — it is
              a cornerstone of the Vibe experience. We offer customised therapeutic spa programmes targeting
              damage-repair, hydration restoration, scalp detox, and anti-breakage strengthening. Each session
              begins with a professional scalp analysis, allowing our trichology-trained staff to prescribe the
              most effective treatment from our curated menu. The result is noticeably healthier, more lustrous
              hair after just one session.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Keratin Treatment Chennai — Frizz-Free Smoothness That Lasts
            </h3>
            <p style={{ color: taupe }}>
              Chennai's humid climate can be relentless on hair, making{" "}
              <strong style={{ color: gold }}>keratin treatment in Chennai</strong> one of our most popular
              services. Vibe Salon offers three tiers of keratin smoothening — express, classic, and Brazilian —
              to suit different hair types, budgets, and lifestyle requirements. Our formaldehyde-free keratin
              options are safe for chemically treated, coloured, and sensitive hair. Results last up to five
              months, keeping hair glossy, manageable, and frizz-free throughout Chennai's monsoon season.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Hair Color Chennai — Precision Colour Artistry
            </h3>
            <p style={{ color: taupe }}>
              Colour is the soul of modern hair styling, and our team of certified colourists at every{" "}
              <strong style={{ color: gold }}>beauty salon in Chennai</strong> that bears the Vibe name are
              artists first. From sun-kissed balayage and dimensional highlights to bold fashion shades and
              seamless grey blending, we handle every colour story with equal mastery. We use Wella Koleston
              Perfect and L'Oréal INOA ammonia-free colour systems to deliver vibrant, long-lasting results
              that also prioritise the health of your hair.
            </p>

            <h3
              className="text-xl font-bold not-prose"
              style={{ color: charcoal }}
            >
              Vibe Unisex Salon — Chennai's Most Trusted Premium Salon Group
            </h3>
            <p style={{ color: taupe }}>
              Across all five branches, Vibe Unisex Salon maintains a 4.9-star average rating on Google, drawn
              from more than 3,000 verified reviews from satisfied clients across Chennai. Our hygiene protocols
              follow NABH-aligned standards — tools are sterilised before every client, stations are sanitised
              between appointments, and all products are stored in controlled conditions. This meticulous
              attention to detail is what distinguishes Vibe as the{" "}
              <strong style={{ color: gold }}>best unisex salon in Chennai</strong>.
            </p>
            <p style={{ color: taupe }}>
              Whether you are seeking a transformative colour experience at our{" "}
              <strong style={{ color: gold }}>hair salon in Anna Nagar</strong>, a pre-wedding makeover at our T
              Nagar studio, a rejuvenating hair spa in Velachery, or precision men's grooming in Porur, the Vibe
              promise is the same: world-class artistry, premium products, and an experience that leaves you
              looking and feeling extraordinary. Book your appointment at the nearest Vibe Unisex Salon branch
              today and discover why thousands of Chennai residents consider Vibe their first and only choice for
              hair and beauty.
            </p>
          </article>
        </FadeUp>
      </section>

      {/* ──────────── CTA ──────────── */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${champagne} 0%, #F5EDD8 50%, ${champagne} 100%)`,
        }}
      >
        {/* ambient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
            style={{ background: `radial-gradient(circle, ${gold} 0%, transparent 70%)` }}
          />
          <div
            className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-15 blur-3xl"
            style={{ background: `radial-gradient(circle, #D4B896 0%, transparent 70%)` }}
          />
        </div>

        {/* top gold rule */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent 100%)",
          }}
        />

        <FadeUp className="relative z-10 text-center max-w-3xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase font-sans mb-4"
            style={{ color: gold }}
          >
            Book Your Experience
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{ color: charcoal }}
          >
            Ready for a Luxury{" "}
            <span style={{ color: gold }}>Transformation?</span>
          </h2>
          <p
            className="font-sans text-lg mb-10 leading-relaxed"
            style={{ color: taupe }}
          >
            Walk in to any of our five Chennai branches or book an appointment to secure your preferred time slot.
          </p>

          <div className="flex flex-wrap gap-5 justify-center">
            <a
              href="tel:+919876543210"
              className="px-10 py-4 text-xs font-bold tracking-widest uppercase font-sans rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #B8942E 100%)",
                color: pearl,
                boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
              }}
            >
              📞 Call Us Now
            </a>
            <a
              href="#branches"
              className="px-10 py-4 text-xs font-bold tracking-widest uppercase font-sans rounded-full border transition-all duration-300"
              style={{
                borderColor: "rgba(201,168,76,0.45)",
                color: "#8A6E35",
                background: "rgba(201,168,76,0.07)",
              }}
            >
              🗺 Find a Branch
            </a>
          </div>
        </FadeUp>

        {/* bottom gold rule */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent 100%)",
          }}
        />
      </section>
    </main>
  );
}