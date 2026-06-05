"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SALON_BRANCHES } from "@/lib/branches";

/* ─── tiny helpers ─── */
const gold = "#C9A84C";
const charcoal = "#1A1410";
const cream = "#FAF8F5";

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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── services ─── */
const SERVICES = [
  { icon: "✂", label: "Hair Cut & Styling", desc: "Precision cuts tailored to your face shape and lifestyle." },
  { icon: "🎨", label: "Hair Color", desc: "Balayage, highlights, global colour — international techniques." },
  { icon: "💆", label: "Hair Spa", desc: "Deep nourishing treatments to restore lustre and strength." },
  { icon: "✨", label: "Keratin Treatment", desc: "Frizz-free, silky smooth hair lasting up to 5 months." },
  { icon: "💍", label: "Bridal Makeup", desc: "Flawless bridal looks crafted for Chennai's diverse traditions." },
  { icon: "🌸", label: "Facial Treatments", desc: "Customised facials using premium dermatologist-grade products." },
  { icon: "🪒", label: "Men's Grooming", desc: "Modern cuts, beard sculpting and luxury grooming rituals." },
];

const WHYS = [
  { icon: "🏅", title: "Certified Stylists", desc: "Every artist is internationally trained and regularly upskilled." },
  { icon: "💎", title: "Premium Products", desc: "We use only salon-exclusive brands — L'Oréal, Wella, Schwarzkopf." },
  { icon: "🧼", title: "Hygiene Standards", desc: "NABH-aligned sanitation protocols; tools sterilised before every client." },
  { icon: "👰", title: "Bridal Experts", desc: "Dedicated bridal team with 500+ weddings styled across Chennai." },
  { icon: "💇", title: "Hair Specialists", desc: "Trichology-trained team for scalp analysis and treatment planning." },
  { icon: "⭐", title: "Customer Satisfaction", desc: "4.9 ★ average across 3,000+ Google reviews — Chennai trusts Vibe." },
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
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group border-b border-[#C9A84C]/20 last:border-b-0"
    >
      <summary className="flex items-start justify-between cursor-pointer py-5 gap-4 list-none">
        <span className="font-semibold text-[#FAF8F5] text-base leading-snug group-open:text-[#C9A84C] transition-colors">
          {faq.q}
        </span>
        <span className="text-[#C9A84C] text-xl flex-shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-300">
          +
        </span>
      </summary>
      <p className="pb-5 text-[#FAF8F5]/70 text-sm leading-relaxed">{faq.a}</p>
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#1E1814] border border-[#C9A84C]/20 rounded-none overflow-hidden hover:border-[#C9A84C]/60 transition-all duration-500"
    >
      {/* image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={branch.featuredImageUrl}
          alt={`Vibe Unisex Salon ${branch.name} Chennai`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-[#1A1410]/30 to-transparent" />
        <span className="absolute top-4 left-4 bg-[#C9A84C] text-[#1A1410] text-xs font-bold tracking-widest uppercase px-3 py-1">
          Chennai
        </span>
      </div>

      {/* content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-[#FAF8F5] tracking-wide">
          Vibe Salon –{" "}
          <span className="text-[#C9A84C]">{branch.name}</span>
        </h2>

        <div className="space-y-2 text-sm text-[#FAF8F5]/70">
          <div className="flex gap-3">
            <span className="text-[#C9A84C]">📍</span>
            <span>{branch.address}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#C9A84C]">📞</span>
            <a href={`tel:${branch.phone}`} className="hover:text-[#C9A84C] transition-colors">
              {branch.phone}
            </a>
          </div>
          <div className="flex gap-3">
            <span className="text-[#C9A84C]">🕐</span>
            <span>{branch.hours}</span>
          </div>
        </div>

        <Link
          href={`/branches/${branch.slug}`}
          className="inline-flex items-center gap-2 mt-2 border border-[#C9A84C] text-[#C9A84C] text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-[#C9A84C] hover:text-[#1A1410] transition-all duration-300 w-full justify-center"
        >
          View Branch →
        </Link>
      </div>

      {/* corner decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/30 group-hover:border-[#C9A84C] transition-colors duration-500" />
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
      style={{ background: charcoal, color: cream }}
    >
      {/* ──────────── HERO ──────────── */}
      <header
        ref={heroRef}
        className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{ background: charcoal }}
      >
        {/* parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1600&q=80"
            alt="Vibe Unisex Salon Chennai luxury interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410]/80 via-[#1A1410]/60 to-[#1A1410]" />
        </motion.div>

        {/* gold decorative lines */}
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
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-xs font-sans tracking-[0.3em] uppercase text-[#C9A84C] mb-6"
          >
            Chennai's Premier Luxury Salon Group
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#FAF8F5] mb-6"
          >
            Best Premium Unisex
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A8882C 100%)`,
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
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#FAF8F5]/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
          >
            Five luxury locations across Chennai. One uncompromising standard of beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#branches"
              className="bg-[#C9A84C] text-[#1A1410] px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#E8C96A] transition-colors font-sans"
            >
              Find a Branch
            </a>
            <a
              href="tel:+919876543210"
              className="border border-[#C9A84C]/60 text-[#FAF8F5] px-8 py-4 text-xs font-bold tracking-widest uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors font-sans"
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
                <span className="text-[#C9A84C] font-bold text-lg">{s.split(" ")[0]}</span>
                <span className="text-[#FAF8F5]/50 text-xs font-sans ml-1">{s.split(" ").slice(1).join(" ")}</span>
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
          <span className="text-[#C9A84C]/50 text-xs tracking-widest font-sans uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
          />
        </motion.div>
      </header>

      {/* ──────────── BRANCH GRID ──────────── */}
      <section id="branches" className="py-24 px-6 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">Our Locations</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF8F5]">
            5 Premium Branches <br className="hidden md:block" />
            <span className="text-[#C9A84C]">Across Chennai</span>
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
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
        style={{ background: "linear-gradient(180deg, #1E1814 0%, #120F0C 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">Our Promise</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FAF8F5]">
              Why Chennai Chooses <span className="text-[#C9A84C]">Vibe</span>
            </h2>
            <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHYS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="group p-8 border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-all duration-500 relative overflow-hidden">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-[#C9A84C] font-bold text-lg mb-3 font-sans">{item.title}</h3>
                  <p className="text-[#FAF8F5]/60 text-sm leading-relaxed font-sans">{item.desc}</p>
                  <div className="absolute inset-0 bg-[#C9A84C]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SERVICES ──────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF8F5]">
            Luxury Services at <br className="hidden md:block" />
            <span className="text-[#C9A84C]">Every Branch</span>
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.label} delay={i * 0.07}>
              <div className="group relative bg-[#1E1814] p-7 border border-[#C9A84C]/15 hover:border-[#C9A84C]/50 transition-all duration-500 h-full">
                <span className="text-3xl block mb-4">{svc.icon}</span>
                <h3 className="text-[#FAF8F5] font-bold mb-2 font-sans">{svc.label}</h3>
                <p className="text-[#FAF8F5]/50 text-sm leading-relaxed font-sans">{svc.desc}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section
        className="py-24 px-6"
        style={{ background: "#120F0C" }}
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF8F5]">
              Frequently Asked <span className="text-[#C9A84C]">Questions</span>
            </h2>
            <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
          </FadeUp>

          <div itemScope itemType="https://schema.org/FAQPage">
            {FAQS.map((faq, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <FAQItem faq={faq} index={i} />
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="hidden">
                  <span itemProp="text">{faq.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEO CONTENT ──────────── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <FadeUp>
          <article className="prose prose-invert max-w-none space-y-6 text-[#FAF8F5]/75 font-sans leading-relaxed text-base">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF8F5] not-prose">
              Best Unisex Salon in Chennai — Vibe Salon Across 5 Locations
            </h2>
            <p>
              When it comes to finding a <strong className="text-[#C9A84C]">premium salon in Chennai</strong> that
              consistently delivers internationally inspired results, Vibe Unisex Salon stands in a class of its own.
              With five strategically located branches — Anna Nagar, T Nagar, Ekkatuthangal, Porur, and Velachery —
              Vibe brings luxury hair and beauty experiences to every major neighbourhood in the city.
            </p>
            <p>
              Chennai's beauty landscape has evolved dramatically over the last decade. Today's discerning clients
              expect more than a routine haircut; they seek a holistic grooming experience that combines skilled
              artistry, premium products, and an ambiance that transports them far from the everyday. Vibe Unisex
              Salon was founded on this very philosophy, and our five Chennai branches are a testament to our
              unwavering commitment to that standard.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Luxury Hair Salon Chennai — Setting International Benchmarks
            </h3>
            <p>
              At every <strong className="text-[#C9A84C]">hair salon in Chennai</strong> bearing the Vibe name, you
              will find stylists who have trained at leading academies and are conversant with the latest global
              techniques. Our colour specialists are certified in balayage, ombre, foilyage, and vivid colour
              correction — skills that define a{" "}
              <strong className="text-[#C9A84C]">luxury salon in Chennai</strong>. Whether you walk into our Anna
              Nagar flagship or our busy T Nagar studio, the tools, products, and talent are identical.
            </p>
            <p>
              We exclusively use professional-grade product lines from global houses such as L'Oréal Professionnel,
              Wella Professionals, Schwarzkopf Professional, and Kérastase. This commitment to premium products
              ensures that every treatment — from a simple blow-dry to a complex colour correction — delivers
              lasting, healthy results without compromising the integrity of your hair.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Best Bridal Makeup Chennai — A Dedicated Bridal Studio Experience
            </h3>
            <p>
              Chennai is a city of grand weddings, and brides deserve nothing less than perfection on their special
              day. Our dedicated bridal team at Vibe Unisex Salon specialises in{" "}
              <strong className="text-[#C9A84C]">bridal makeup in Chennai</strong> across traditions — South Indian,
              North Indian, Christian, Indo-Western, and fusion styles. Each bridal consultation is personalised,
              incorporating skin type analysis, a full trial session, and a bespoke hair and makeup plan that
              complements the bride's outfit and jewellery. With more than 500 weddings styled across Chennai, our
              bridal experts are trusted by families across the city.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Hair Spa Chennai — Rejuvenation Beyond the Surface
            </h3>
            <p>
              Our{" "}
              <strong className="text-[#C9A84C]">hair spa in Chennai</strong> is not an add-on service — it is a
              cornerstone of the Vibe experience. We offer customised therapeutic spa programmes targeting
              damage-repair, hydration restoration, scalp detox, and anti-breakage strengthening. Each session
              begins with a professional scalp analysis, allowing our trichology-trained staff to prescribe the
              most effective treatment from our curated menu. The result is noticeably healthier, more lustrous
              hair after just one session.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Keratin Treatment Chennai — Frizz-Free Smoothness That Lasts
            </h3>
            <p>
              Chennai's humid climate can be relentless on hair, making{" "}
              <strong className="text-[#C9A84C]">keratin treatment in Chennai</strong> one of our most popular
              services. Vibe Salon offers three tiers of keratin smoothening — express, classic, and Brazilian — to
              suit different hair types, budgets, and lifestyle requirements. Our formaldehyde-free keratin options
              are safe for chemically treated, coloured, and sensitive hair. Results last up to five months,
              keeping hair glossy, manageable, and frizz-free throughout Chennai's monsoon season.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Hair Color Chennai — Precision Colour Artistry
            </h3>
            <p>
              Colour is the soul of modern hair styling, and our team of certified colourists at every{" "}
              <strong className="text-[#C9A84C]">beauty salon in Chennai</strong> that bears the Vibe name are
              artists first. From sun-kissed balayage and dimensional highlights to bold fashion shades and
              seamless grey blending, we handle every colour story with equal mastery. We use Wella Koleston
              Perfect and L'Oréal INOA ammonia-free colour systems to deliver vibrant, long-lasting results that
              also prioritise the health of your hair.
            </p>

            <h3 className="text-xl font-bold text-[#FAF8F5] not-prose">
              Vibe Unisex Salon — Chennai's Most Trusted Premium Salon Group
            </h3>
            <p>
              Across all five branches, Vibe Unisex Salon maintains a 4.9-star average rating on Google, drawn from
              more than 3,000 verified reviews from satisfied clients across Chennai. Our hygiene protocols follow
              NABH-aligned standards — tools are sterilised before every client, stations are sanitised between
              appointments, and all products are stored in controlled conditions. This meticulous attention to
              detail is what distinguishes Vibe as the{" "}
              <strong className="text-[#C9A84C]">best unisex salon in Chennai</strong>.
            </p>
            <p>
              Whether you are seeking a transformative colour experience at our{" "}
              <strong className="text-[#C9A84C]">hair salon in Anna Nagar</strong>, a pre-wedding makeover at our T
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
        style={{ background: "linear-gradient(135deg, #1A1410 0%, #2A1F14 50%, #1A1410 100%)" }}
      >
        {/* decorative */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />

        <FadeUp className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
            Book Your Experience
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF8F5] mb-6">
            Ready for a Luxury <span className="text-[#C9A84C]">Transformation?</span>
          </h2>
          <p className="text-[#FAF8F5]/60 font-sans text-lg mb-10 leading-relaxed">
            Walk in to any of our five Chennai branches or book an appointment to secure your preferred time slot.
          </p>

          <div className="flex flex-wrap gap-5 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-[#C9A84C] text-[#1A1410] px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#E8C96A] transition-colors font-sans"
            >
              📞 Call Us Now
            </a>
            <a
              href="#branches"
              className="border border-[#C9A84C] text-[#C9A84C] px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#C9A84C]/10 transition-colors font-sans"
            >
              🗺 Find a Branch
            </a>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}