"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/branches", label: "Our Salons" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2D9CC] shadow-sm py-0"
          : "bg-gradient-to-b from-black/40 via-black/10 to-transparent py-2" // Adds a subtle gradient at the top for maximum text contrast on videos
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between transition-all duration-500"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-[#1A1410]" : "text-white"
          } hover:text-[#C9A84C]`}
          aria-label="Vibe Unisex Salon – Home"
          style={!scrolled ? { textShadow: "0 2px 10px rgba(0,0,0,0.3)" } : {}}
        >
          VIBE <span className="text-[#C9A84C]">SALON</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-[#4A3D33] hover:text-[#C9A84C]"
                    : "text-white/95 hover:text-[#C9A84C]"
                }`}
                style={!scrolled ? { textShadow: "0 1px 8px rgba(0,0,0,0.4)" } : {}}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link 
          href="/branches" 
          className={`hidden md:inline-flex items-center justify-center text-xs tracking-[0.15em] uppercase font-semibold py-3 px-7 transition-all duration-300 ${
            scrolled 
              ? "bg-[#C9A84C] text-white hover:bg-[#B5955C] shadow-md hover:shadow-lg" 
              : "bg-[#C9A84C]/90 text-white hover:bg-[#C9A84C] backdrop-blur-sm shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:scale-105"
          }`}
        >
          Book Now
        </Link>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-[#1A1410]" : "text-white drop-shadow-md"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile drawer (Always light themed for readability) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-[#E2D9CC] px-6 py-8 shadow-xl animate-in slide-in-from-top-2 duration-300">
          <ul className="flex flex-col gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm tracking-[0.1em] uppercase text-[#1A1410] hover:text-[#C9A84C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="/branches" 
            className="mt-8 flex items-center justify-center bg-[#C9A84C] text-white text-xs tracking-[0.15em] uppercase font-semibold py-4 px-6 w-full shadow-md hover:bg-[#B5955C] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}