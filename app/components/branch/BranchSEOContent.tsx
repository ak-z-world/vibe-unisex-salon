// BranchSEOContent.tsx
"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, Heart, Star, MapPin } from "lucide-react";

type Branch = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  address: string;
  pincode: string;
  state: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  mapsLink: string;
  featuredImageUrl: string;
};

interface BranchSEOContentProps {
  branch: Branch;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-10 h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.55) 50%, rgba(201,168,76,0.3) 70%, transparent 100%)",
      }}
    />
  );
}

interface ContentCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function ContentCard({ icon, title, children, delay = 0 }: ContentCardProps) {
  return (
    <SectionReveal delay={delay}>
      <div
        className="rounded-2xl border p-8"
        style={{
          background: "linear-gradient(145deg, #FDFAF6 0%, #FAF6EE 100%)",
          borderColor: "rgba(201,168,76,0.2)",
          boxShadow: "0 2px 16px rgba(201,168,76,0.07)",
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border"
            style={{
              background: "linear-gradient(135deg, #FAF0D7 0%, #F5E8C0 100%)",
              borderColor: "rgba(201,168,76,0.3)",
              color: "#C9A84C",
            }}
          >
            {icon}
          </div>
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#1A1410" }}
          >
            {title}
          </h3>
        </div>
        <div
          className="text-sm leading-[1.85] space-y-3"
          style={{ color: "#6B5F55" }}
        >
          {children}
        </div>
      </div>
    </SectionReveal>
  );
}

export default function BranchSEOContent({ branch }: BranchSEOContentProps) {
  const { city, neighborhood, name } = branch;

  return (
    <article
      className="w-full py-20 px-4"
      style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #FDFAF6 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Primary H2 */}
        <SectionReveal>
          <header className="mb-14 text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#C9A84C" }}
            >
              About Our Salon
            </p>
            <h2
              className="text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ color: "#1A1410" }}
            >
              Luxury Salon in {neighborhood}, {city}
            </h2>
            <div
              className="mx-auto mt-5 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              }}
            />
            <p
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed"
              style={{ color: "#6B5F55" }}
            >
              Vibe Unisex Salon {name} brings a curated luxury experience to the
              heart of {neighborhood}. Whether you&apos;re seeking a
              transformative hair session, a relaxing spa treatment, or a
              complete bridal look, our expert stylists are here to deliver
              results that exceed expectations — every single visit.
            </p>
          </header>
        </SectionReveal>

        {/* Content cards grid */}
        <div className="space-y-5">
          {/* Premium Hair Services */}
          <ContentCard
            icon={<Scissors size={16} />}
            title="Premium Hair Services"
            delay={0.05}
          >
            <p>
              As a leading <strong>salon in {city}</strong>, Vibe Unisex Salon{" "}
              {name} offers precision haircuts crafted for every face shape and
              style preference. Our senior stylists are trained in the latest
              international cutting techniques — from structured bobs to textured
              layers, curtain bangs to razor cuts — delivering salon-quality
              results that hold up between visits.
            </p>
            <p>
              Hair coloring is an art we take seriously. From seamless balayage
              and dimension-rich highlights to bold global color and corrective
              color work, our color specialists use professional-grade products
              to protect hair integrity while delivering vibrant, lasting results.
              As a trusted <strong>salon near {neighborhood}</strong>, we stay
              current on seasonal color trends for every skin tone and lifestyle.
            </p>
          </ContentCard>

          <GoldDivider />

          {/* Hair Spa & Treatments */}
          <ContentCard
            icon={<Sparkles size={16} />}
            title="Hair Spa and Hair Treatments"
            delay={0.08}
          >
            <p>
              Our <strong>hair spa in {city}</strong> is designed as a
              restorative ritual for stressed, over-processed, or simply
              tired hair. Using deep-penetrating serums and scalp massage
              techniques, our therapists restore moisture balance, reduce
              breakage, and bring back natural shine in a single session.
              Regular hair spa treatments at Vibe are recommended every 4–6
              weeks for optimal hair health.
            </p>
            <p>
              For clients seeking long-term smoothness and manageability, our
              professional <strong>keratin treatment</strong> service is a
              standout offering. We use curated formulations suited for Indian
              hair textures — managing frizz, adding luminous shine, and
              dramatically reducing styling time. <strong>Hair coloring</strong>{" "}
              and keratin can often be combined into a single appointment — ask
              our team for a personalized consultation.
            </p>
          </ContentCard>

          <GoldDivider />

          {/* Bridal Makeup */}
          <ContentCard
            icon={<Heart size={16} />}
            title="Bridal Makeup Services"
            delay={0.1}
          >
            <p>
              Our <strong>bridal makeup in {city}</strong> service is among the
              most sought-after offerings at Vibe Unisex Salon {name}. We
              understand the gravity of your wedding day — which is why every
              bridal package begins with a detailed consultation and a dedicated
              trial session, ensuring you look and feel your absolute best when
              it matters most.
            </p>
            <p>
              We offer HD and airbrush makeup techniques using luxury product
              lines, complemented by expert bridal hairstyling — updos, braided
              elegance, or soft waves — tailored to your outfit and occasion. Our
              bridal slots are limited and book early, especially during wedding
              season. Reach us at {branch.phone} to reserve your date.
            </p>
          </ContentCard>

          <GoldDivider />

          {/* Why Choose */}
          <ContentCard
            icon={<Star size={16} />}
            title={`Why Choose Vibe Unisex Salon ${name}`}
            delay={0.12}
          >
            <p>
              What sets Vibe Unisex Salon apart is a consistent commitment to
              craftsmanship, hygiene, and client experience. Every tool is
              sanitized between clients. Every stylist undergoes continuous
              training. And every service — from a basic trim to a full bridal
              transformation — is delivered with the same attention to detail
              and care.
            </p>
            <p>
              Our <strong>grooming services</strong> for men are equally premium:
              beard sculpting, hair treatments, and scalp care — designed for
              the modern professional. We are not just a{" "}
              <strong>salon in {city}</strong>; we are a destination where self-care
              becomes an intentional luxury.
            </p>
          </ContentCard>

          <GoldDivider />

          {/* Visit Our Salon */}
          <ContentCard
            icon={<MapPin size={16} />}
            title={`Visit Our Salon in ${city}`}
            delay={0.14}
          >
            <p>
              Vibe Unisex Salon {name} is conveniently located in{" "}
              {neighborhood}, {city}, making it the go-to choice for residents
              and professionals across the area. Whether you walk in or book
              ahead, you can expect a welcoming atmosphere, minimal wait times
              during off-peak hours, and a team that genuinely values your time.
            </p>
            <p>
              Find us at <strong>{branch.address}</strong>, {neighborhood},{" "}
              {city} — {branch.state} {branch.pincode}. We&apos;re open{" "}
              {branch.hours}. Call us at{" "}
              <a
                href={`tel:${branch.phone}`}
                className="font-medium underline underline-offset-2"
                style={{ color: "#C9A84C" }}
              >
                {branch.phone}
              </a>{" "}
              or use the map link to navigate directly to our salon.
            </p>
          </ContentCard>
        </div>
      </div>
    </article>
  );
}