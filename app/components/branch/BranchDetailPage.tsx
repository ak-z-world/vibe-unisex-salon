"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { nearbyAreas } from "@/lib/branches";
import type { Branch } from "@/lib/branches";

/* ─── helpers ─── */
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── static data ─── */
const SERVICES = [
  {
    icon: "✂",
    label: "Hair Cut & Styling",
    desc: "Precision cuts crafted for your face shape and texture.",
  },
  {
    icon: "🎨",
    label: "Hair Color",
    desc: "Balayage, highlights, global colour, grey blending and more.",
  },
  {
    icon: "💆",
    label: "Hair Spa",
    desc: "Therapeutic treatments to restore softness and shine.",
  },
  {
    icon: "✨",
    label: "Keratin Smoothening",
    desc: "Frizz-free hair lasting 4–5 months, safe for all types.",
  },
  {
    icon: "💍",
    label: "Bridal Makeup",
    desc: "Bespoke looks for South Indian, North Indian & fusion weddings.",
  },
  {
    icon: "🌸",
    label: "Facial Treatments",
    desc: "Customised dermatologist-grade facial protocols.",
  },
  {
    icon: "🪒",
    label: "Men's Grooming",
    desc: "Modern cuts, beard sculpting and luxury skincare rituals.",
  },
];

function buildFAQs(
  branch: Branch,
  branchNearbyAreas: string[]
) {
  return [
    {
      q: `Where is Vibe Unisex Salon ${branch.neighborhood} located?`,
      a: `Vibe Unisex Salon ${branch.neighborhood} is located at ${branch.address}. Easily accessible from major landmarks in the area.`,
    },
    {
      q: `What are the opening hours of Vibe Salon ${branch.neighborhood}?`,
      a: `Our ${branch.neighborhood} branch is open Monday to Saturday 9:00 AM – 9:00 PM and Sunday 10:00 AM – 7:00 PM.`,
    },
    {
      q: `Does Vibe Salon ${branch.neighborhood} offer bridal makeup?`,
      a: `Yes. Our ${branch.neighborhood} branch has a dedicated bridal consultation desk offering bespoke South Indian, North Indian, Christian, and fusion bridal makeup packages.`,
    },
    {
      q: `Is keratin treatment available at Vibe ${branch.neighborhood}?`,
      a: `Absolutely. We offer express, classic, and Brazilian keratin smoothening treatments at our ${branch.neighborhood} salon, using formaldehyde-free professional formulas.`,
    },
    {
      q: `Which areas near ${branch.neighborhood} does Vibe Salon serve?`,
      a: `Our ${branch.neighborhood} branch conveniently serves clients from ${branchNearbyAreas.join(", ")} and surrounding neighbourhoods.`,
    },
    {
      q: `What hair colour services are available at Vibe Salon ${branch.neighborhood}?`,
      a: `We offer the complete colour menu — balayage, ombre, highlights, global colour, fashion shades, and grey coverage — using L'Oréal and Wella professional systems.`,
    },
    {
      q: `How do I book an appointment at Vibe Salon ${branch.neighborhood}?`,
      a: `You can call us at ${branch.phone} or walk in during working hours. For guaranteed slots on weekends, advance booking is recommended.`,
    },
  ];
}

function buildSEOContent(
  branch: Branch,
  branchNearbyAreas: string[]
): string[] {
  return [
    `When searching for the <strong>best salon in ${branch.neighborhood}</strong>, discerning Chennai residents consistently name Vibe Unisex Salon as their first choice. Nestled at ${branch.address}, our ${branch.neighborhood} branch combines an impeccably designed interior with an internationally trained team of stylists and beauty experts — making it the definitive <strong>hair salon in ${branch.neighborhood}</strong> for those who refuse to compromise on quality.`,

    `<strong>Vibe Salon ${branch.neighborhood}</strong> is more than a haircut destination. It is a complete <strong>beauty salon in ${branch.neighborhood}</strong> offering the full spectrum of hair and beauty services under one roof. From the moment you step inside, the warm gold and charcoal aesthetic, the subtle fragrance of premium products, and the attentiveness of our team signal that you have arrived somewhere special. This is the experience that has earned Vibe a loyal following across Chennai.`,

    `Our stylists at the ${branch.neighborhood} branch undergo continuous training in the latest global techniques. Hair colour is a particular strength — our certified colourists have mastered balayage, foilyage, ombre, vivid fashion colours, and seamless grey blending. Using only professional-grade L'Oréal Professionnel, Wella Koleston, and Schwarzkopf colour systems, we deliver vibrant, long-lasting results that protect the integrity of your hair. If you have been looking for a reliable <strong>hair color salon in ${branch.neighborhood}</strong>, your search ends here.`,

    `Chennai's humidity makes <strong>keratin treatment in ${branch.neighborhood}</strong> one of our most requested services. At Vibe Salon ${branch.neighborhood}, we offer three tiers of keratin smoothening — express (45 minutes), classic, and Brazilian — all using formaldehyde-free professional formulas. Whether you have fine, wavy, or thick curly hair, our specialists will recommend the right treatment tier to deliver up to five months of frizz-free, glossy manageability. This is especially popular during the Chennai monsoon season when humidity levels soar.`,

    `Our <strong>hair spa in ${branch.neighborhood}</strong> programme begins with a complimentary scalp analysis by one of our trichology-trained consultants. Based on your scalp condition and hair health, we prescribe a bespoke therapeutic treatment from our curated spa menu — options include deep hydration masking, bond-strengthening Olaplex protocols, scalp detox rituals, and anti-breakage treatments. The result is visibly healthier, noticeably softer hair after just a single session.`,

    `Brides from ${branch.neighborhood} and surrounding areas including ${branchNearbyAreas.slice(0, 3).join(", ")} regularly choose Vibe for their wedding day looks. Our dedicated <strong>bridal makeup in ${branch.neighborhood}</strong> service includes a personalised consultation, a full trial session, and a bespoke hair and makeup plan tailored to your outfit, jewellery, and skin tone. Our bridal team is experienced in South Indian silk saree looks, North Indian lehenga bridal styles, Christian and western bridal aesthetics, and contemporary fusion approaches — ensuring every bride looks and feels extraordinary.`,

    `Men's grooming at Vibe Salon ${branch.neighborhood} goes far beyond a basic haircut. Our dedicated men's grooming menu includes modern scissor cuts, clipper fades, beard sculpting and hot towel shaves, scalp treatments, and skin-care facials. The ${branch.neighborhood} branch features a dedicated men's section designed for privacy and comfort, acknowledging that modern men in Chennai are as invested in their appearance as ever. If you have been looking for a premium <strong>men's salon in ${branch.neighborhood}</strong>, Vibe delivers the complete luxury grooming experience.`,

    `Facial treatments at our ${branch.neighborhood} branch are curated from international beauty protocols. We offer deep-cleansing facials, anti-ageing treatments, brightening rituals, and acne-management programmes using products from Dermalogica and professional skincare lines. Each facial begins with a skin analysis to ensure the chosen protocol is perfectly matched to your skin type and concern. This consultative, personalised approach is what sets Vibe apart as the <strong>premium beauty salon in ${branch.neighborhood}</strong>.`,

    `Hygiene is a non-negotiable pillar of the Vibe experience. Every tool used at the ${branch.neighborhood} branch is sterilised in a medical-grade autoclave before each client appointment. Styling stations are sanitised between every service. Product dispensers are sealed and tamper-evident. This rigorous adherence to hygiene standards — aligned with NABH guidelines — gives our clients complete confidence that their health is protected at every visit.`,

    `Vibe Unisex Salon ${branch.neighborhood} serves clients not only from the local neighbourhood but from the wider area including ${branchNearbyAreas.join(", ")}. Our central location, generous parking access, and flexible appointment scheduling make us the most convenient <strong>luxury salon near ${branch.neighborhood}</strong>. With branches also in Anna Nagar, T Nagar, Ekkatuthangal, Porur, and Velachery, Vibe Unisex Salon is always within easy reach wherever you are in Chennai. Book your appointment today and experience the standard that has made Vibe Chennai's most trusted name in premium hair and beauty.`,
  ];
}

/* ─── FAQ ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.details
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group border-b border-[#C9A84C]/20 last:border-b-0"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question">
      <summary className="flex items-start justify-between cursor-pointer py-5 gap-4 list-none">
        <span
          itemProp="name"
          className="font-semibold text-[#FAF8F5] text-base leading-snug group-open:text-[#C9A84C] transition-colors">
          {q}
        </span>
        <span className="text-[#C9A84C] text-xl flex-shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-300">
          +
        </span>
      </summary>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer">
        <p
          itemProp="text"
          className="pb-5 text-[#FAF8F5]/65 text-sm leading-relaxed font-sans">
          {a}
        </p>
      </div>
    </motion.details>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function BranchDetailPage({ branch }: { branch: Branch }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const branchNearbyAreas = nearbyAreas[branch.slug] || [];
  const faqs = buildFAQs(branch, branchNearbyAreas);
  const seoParas = buildSEOContent(branch, branchNearbyAreas);

  return (
    <main
      className="min-h-screen font-serif"
      style={{ background: "#1A1410", color: "#FAF8F5" }}>
      {/* ──────────── BREADCRUMB ──────────── */}
      <nav
        aria-label="Breadcrumb"
        className="relative z-20 bg-[#120F0C] border-b border-[#C9A84C]/15 px-6 py-3"
        itemScope
        itemType="https://schema.org/BreadcrumbList">
        <ol className="flex items-center gap-2 text-xs font-sans text-[#FAF8F5]/50 max-w-6xl mx-auto flex-wrap">
          {[
            { name: "Home", href: "/" },
            { name: "Branches", href: "/branches" },
            {
              name: `${branch.neighborhood}`,
              href: `/branches/${branch.slug}`,
            },
          ].map((crumb, i, arr) => (
            <li
              key={crumb.href}
              className="flex items-center gap-2"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem">
              <Link
                href={crumb.href}
                itemProp="item"
                className={
                  i === arr.length - 1
                    ? "text-[#C9A84C]"
                    : "hover:text-[#C9A84C] transition-colors"
                }>
                <span itemProp="name">{crumb.name}</span>
              </Link>
              <meta itemProp="position" content={String(i + 1)} />
              {i < arr.length - 1 && <span>/</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* ──────────── HERO ──────────── */}
      <header
        ref={heroRef}
        className="relative h-[80vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={branch.featuredImageUrl}
            alt={`Vibe Unisex Salon ${branch.neighborhood} Chennai interior`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410]/70 via-[#1A1410]/50 to-[#1A1410]" />
        </motion.div>

        {/* gold frame */}
        <div className="absolute inset-6 border border-[#C9A84C]/20 pointer-events-none hidden md:block" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2 }}
            className="text-xs font-sans tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
            Vibe Unisex Salon · Chennai
          </motion.p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#FAF8F5] mb-5">
            Best Unisex Salon in{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A8882C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              {branch.neighborhood}
            </span>
            , Chennai
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#FAF8F5]/65 font-sans text-lg mb-8">
            Premium Hair, Beauty & Grooming Services in {branch.neighborhood},
            Chennai. Expert Stylists • Hair Spa • Keratin Treatment • Bridal
            Makeup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${branch.phone}`}
              className="bg-[#C9A84C] text-[#1A1410] px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-[#E8C96A] transition-colors font-sans">
              📞 Call Branch
            </a>
            <a
              href={branch.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#C9A84C]/60 text-[#FAF8F5] px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:border-[#C9A84C] transition-colors font-sans">
              🗺 Get Directions
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* ──────────── INFO STRIP ──────────── */}
      <section className="bg-[#120F0C] border-y border-[#C9A84C]/15 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📍", label: "Address", value: branch.address },
            {
              icon: "📞",
              label: "Phone",
              value: branch.phone,
              href: `tel:${branch.phone}`,
            },
            { icon: "🕐", label: "Opening Hours", value: branch.hours },
          ].map((item) => (
            <FadeUp key={item.label} className="flex gap-4">
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-xs tracking-widest uppercase text-[#C9A84C] font-sans mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#FAF8F5]/80 font-sans text-sm hover:text-[#C9A84C] transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#FAF8F5]/80 font-sans text-sm leading-relaxed">
                    {item.value}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ──────────── SERVICES ──────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
            At This Branch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FAF8F5]">
            Services in{" "}
            <span className="text-[#C9A84C]">{branch.neighborhood}</span>
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.label} delay={i * 0.07}>
              <div className="group relative bg-[#1E1814] p-7 border border-[#C9A84C]/15 hover:border-[#C9A84C]/50 transition-all duration-500 h-full">
                <span className="text-3xl block mb-4">{svc.icon}</span>
                <h3 className="text-[#FAF8F5] font-bold mb-2 font-sans text-sm">
                  {svc.label}
                </h3>
                <p className="text-[#FAF8F5]/50 text-xs leading-relaxed font-sans">
                  {svc.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ──────────── MAP ──────────── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
            Find Us
          </p>
          <h2 className="text-3xl font-bold text-[#FAF8F5]">
            Vibe Salon{" "}
            <span className="text-[#C9A84C]">{branch.neighborhood}</span> — Map
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="bg-[#1E1814] border border-[#C9A84C]/20 p-12 text-center rounded-lg">
            <p className="text-[#FAF8F5]/70 mb-6">
              View our {branch.neighborhood} branch on Google Maps.
            </p>

            <a
              href={branch.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#C9A84C] text-[#C9A84C] px-8 py-3 text-xs font-bold tracking-widest uppercase">
              Open Google Maps
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ──────────── NEARBY AREAS ──────────── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
            Coverage Area
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF8F5]">
            Serving{" "}
            <span className="text-[#C9A84C]">{branch.neighborhood}</span> &amp;
            Nearby Neighbourhoods
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="flex flex-wrap gap-3 justify-center">
            {[branch.neighborhood, ...branchNearbyAreas].map((area) => (
              <span
                key={area}
                className="border border-[#C9A84C]/30 text-[#FAF8F5]/70 text-xs font-sans px-5 py-2.5 tracking-wider">
                {area}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section
        className="py-24 px-6"
        style={{ background: "#120F0C" }}
        itemScope
        itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF8F5]">
              About Vibe Salon{" "}
              <span className="text-[#C9A84C]">{branch.neighborhood}</span>
            </h2>
            <div className="mt-6 mx-auto w-16 h-px bg-[#C9A84C]" />
          </FadeUp>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEO CONTENT ──────────── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <FadeUp>
          <article className="space-y-5 text-[#FAF8F5]/70 font-sans leading-relaxed text-base">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF8F5] font-serif">
              Best Salon in {branch.neighborhood}, Chennai — Vibe Unisex Salon
            </h2>
            {seoParas.map((para, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: para }}
                className="[&_strong]:text-[#C9A84C]"
              />
            ))}
          </article>
        </FadeUp>
      </section>

      {/* ──────────── CTA ──────────── */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1A1410 0%, #2A1F14 50%, #1A1410 100%)",
        }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />

        <FadeUp className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-sans mb-4">
            {branch.neighborhood} Branch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FAF8F5] mb-5">
            Book Your Appointment at{" "}
            <span className="text-[#C9A84C]">{branch.neighborhood}</span>
          </h2>
          <p className="text-[#FAF8F5]/55 font-sans mb-10">
            Call us, get directions, or explore all our Chennai branches below.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${branch.phone}`}
              className="bg-[#C9A84C] text-[#1A1410] px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#E8C96A] transition-colors font-sans">
              📞 Call {branch.phone}
            </a>
            <a
              href={branch.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#C9A84C] text-[#C9A84C] px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#C9A84C]/10 transition-colors font-sans">
              🗺 Get Directions
            </a>
            <Link
              href="/branches"
              className="border border-[#FAF8F5]/20 text-[#FAF8F5]/60 px-9 py-4 text-xs font-bold tracking-widest uppercase hover:border-[#FAF8F5]/40 transition-colors font-sans">
              All Branches
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
