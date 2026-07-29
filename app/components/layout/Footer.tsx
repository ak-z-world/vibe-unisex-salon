import Link from "next/link";
import { SALON_BRANCHES } from "@/lib/branches";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0B09] text-[#E2D9CC] relative overflow-hidden font-body" role="contentinfo">
      {/* Editorial top line accent */}
      <div className="w-full h-[1px] bg-[#2D231C]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-12">
        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-12 lg:gap-x-8 items-start">

          {/* 1. Brand Column (Spans 3/12 on Large) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6">
            <div>
              <Link
                href="/"
                className="font-display text-2xl font-bold tracking-widest text-white hover:text-[#C9A84C] transition-colors"
              >
                VIBE <span className="text-[#C9A84C] font-light">SALON</span>
              </Link>
              <p className="text-sm text-[#9A8E85] mt-4 leading-relaxed font-light max-w-sm">
                Premium hair, beauty &amp; grooming for every identity — curated across India&apos;s finest luxury spaces.
              </p>
            </div>

            {/* Socials with minimalist circular frames */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/vibe_unisex_salon4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vibe Salon on Instagram"
                className="w-10 h-10 rounded-full border border-[#2D231C] flex items-center justify-center text-[#9A8E85] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#1A1410] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a
                href="https://www.facebook.com/p/Vibe-unisex-salon-61556825887339/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vibe Salon on Facebook"
                className="w-10 h-10 rounded-full border border-[#2D231C] flex items-center justify-center text-[#9A8E85] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#1A1410] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>

          {/* 2. Services Column (Spans 3/12 on Large) */}
          <nav aria-label="Services navigation" className="lg:col-span-3">
            <h3 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-[1px] after:bg-[#C9A84C]">
              Services
            </h3>
            <ul className="space-y-4" role="list">
              {[
                "Hair Styling & Cuts",
                "Colour & Highlights",
                "Skin Treatments",
                "Bridal Makeup",
                "Men's Grooming",
                "Spa & Wellness",
              ].map((service) => (
                <li key={service} className="group flex items-center">
                  <span className="text-sm text-[#9A8E85] group-hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-1">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Dynamic Branches Grid Column (Spans 6/12 on Large - Spreads Beautifully) */}
          <nav aria-label="Branch locations navigation" className="lg:col-span-6 w-full">
            <h3 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-[1px] after:bg-[#C9A84C]">
              Our Locations
            </h3>

            {/* Expansive layout: 1 col on mobile, 2 cols on tablets, 3 cols on large displays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {SALON_BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="group relative border-b border-[#2D231C] pb-4 flex flex-col justify-between hover:border-[#C9A84C]/50 transition-colors duration-300"
                >
                  <div className="space-y-1">
                    <Link
                      href={`/branches/${branch.slug}`}
                      className="text-sm font-medium text-white hover:text-[#C9A84C] flex items-center justify-between gap-2 group/link transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#C9A84C] shrink-0" />
                        {branch.name}
                      </span>
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-0.5 translate-x-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:translate-y-0 transition-all text-[#C9A84C]" />
                    </Link>
                    <p className="text-[11px] text-[#6B5F55] uppercase tracking-wider pl-5">
                      {branch.city}
                    </p>
                  </div>

                  <a
                    href={`tel:${branch.phone}`}
                    className="text-xs text-[#9A8E85] hover:text-white transition-colors mt-3 pl-5 flex items-center gap-1.5"
                  >
                    <Phone size={11} className="text-[#6B5F55] group-hover:text-[#C9A84C] transition-colors" />
                    {branch.phone}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Giant luxury typography backdrop for 2026 branding */}
        <div className="select-none pointer-events-none mt-6 md:mt-2 mb-7 flex justify-center overflow-hidden w-full hidden sm:block">
          <h2 className="whitespace-nowrap text-[5.5vw] font-bold tracking-[0.25em] text-[#16110E] leading-none select-none uppercase font-display translate-y-3">
            VIBE UNISEX SALON
          </h2>
        </div>

        {/* Bottom Utility Bar */}
        <div className="mt-8 pt-8 border-t border-[#1C1613] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-xs text-[#6B5F55] font-light tracking-wide text-center sm:text-left">
            &copy; {currentYear} Vibe Unisex Salon. Architectural grooming ecosystems. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-xs text-[#6B5F55] hover:text-[#C9A84C] tracking-wide transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#6B5F55] hover:text-[#C9A84C] tracking-wide transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}