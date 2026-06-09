"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/branches", label: "Our Salons" },
  { href: "/#services", label: "Services" },
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
          ? "bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2D9CC] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-[#1A1410] hover:text-[#C9A84C] transition-colors duration-300"
          aria-label="Vibe Unisex Salon – Home"
        >
          VIBE <span className="text-[#C9A84C]">SALON</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm tracking-wide text-[#ffffff] hover:text-[#C9A84C] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/branches" className="hidden md:inline-flex btn-primary text-xs py-3 px-6">
          Book Now
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#1A1410]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#E2D9CC] px-6 py-6">
          <ul className="flex flex-col gap-5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-base text-[#1A1410] hover:text-[#C9A84C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/branches" className="btn-primary mt-6 text-xs py-3 px-6 w-full justify-center">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}