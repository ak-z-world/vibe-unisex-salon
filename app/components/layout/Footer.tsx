import Link from "next/link";
import { SALON_BRANCHES } from "@/lib/branches";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1410] text-[#E2D9CC]" role="contentinfo">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-semibold text-white hover:text-[#C9A84C] transition-colors"
            >
              VIBE <span className="text-[#C9A84C]">SALON</span>
            </Link>
            <p className="font-body text-sm text-[#9A8E85] mt-4 leading-relaxed">
              Premium hair, beauty &amp; grooming for every identity — across
              India&apos;s finest neighbourhoods.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/vibe_unisex_salon4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vibe Salon on Instagram"
                className="w-9 h-9 border border-[#3D342E] flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/p/Vibe-unisex-salon-61556825887339/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vibe Salon on Facebook"
                className="w-9 h-9 border border-[#3D342E] flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <nav aria-label="Services navigation">
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-medium mb-5">
              Services
            </h3>
            <ul className="space-y-3" role="list">
              {[
                "Hair Styling & Cuts",
                "Colour & Highlights",
                "Skin Treatments",
                "Bridal Makeup",
                "Men&apos;s Grooming",
                "Spa & Wellness",
              ].map((service) => (
                <li key={service}>
                  <span className="font-body text-sm text-[#9A8E85] hover:text-[#E2D9CC] transition-colors cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Branches column */}
          <nav aria-label="Branch locations navigation">
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-medium mb-5">
              Our Salons
            </h3>
            <ul className="space-y-3" role="list">
              {SALON_BRANCHES.map((branch) => (
                <li key={branch.id}>
                  <Link
                    href={`/branches/${branch.slug}`}
                    className="font-body text-sm text-[#9A8E85] hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                  >
                    <MapPin size={12} className="shrink-0 text-[#C9A84C]" />
                    {branch.neighborhood}, {branch.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-medium mb-5">
              Contact
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <Phone size={14} className="shrink-0 text-[#C9A84C] mt-0.5" />
                <a
                  href="tel:+919876543210"
                  className="font-body text-sm text-[#9A8E85] hover:text-[#E2D9CC] transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="shrink-0 text-[#C9A84C] mt-0.5" />
                <span className="font-body text-sm text-[#9A8E85]">
                  Mon – Sun: 9 AM – 9 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#2D2520] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#6B5F55]">
            &copy; {currentYear} Vibe Unisex Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-body text-xs text-[#6B5F55] hover:text-[#C9A84C] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs text-[#6B5F55] hover:text-[#C9A84C] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}