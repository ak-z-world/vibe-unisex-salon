"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Offer } from "@/types/offer";
import { SALON_BRANCHES } from "@/lib/branches";

const POPUP_STORAGE_KEY = "offer-popup-dismissed";
const POPUP_DELAY_MS = 5000;
const SUPPRESS_HOURS = 24;

const SERVICES = [
  "Hair Cut",
  "Hair Spa",
  "Facial",
  "Bridal Makeup",
  "Hair Coloring",
  "Keratin",
  "Botox Treatment",
  "Manicure",
  "Pedicure",
  "Other",
];

interface FormState {
  name: string;
  phone: string;
  service: string;
  branch: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  branch?: string;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function shouldShowPopup(): boolean {
  // 📍 FIX: Always show the popup during local development testing
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  try {
    const raw = localStorage.getItem(POPUP_STORAGE_KEY);
    if (!raw) return true;
    const dismissed = parseInt(raw, 10);
    if (isNaN(dismissed)) return true;
    const hoursSince = (Date.now() - dismissed) / (1000 * 60 * 60);
    return hoursSince >= SUPPRESS_HOURS;
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now()));
  } catch {
    // localStorage unavailable — ignore
  }
}

export default function OfferPopup() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    service: "",
    branch: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function init() {
      if (!shouldShowPopup()) {
        if (process.env.NODE_ENV === "development") {
          console.log("OfferPopup: Hidden due to cooldown lockout (bypassed in dev mode code).");
        }
        return;
      }

      try {
        const res = await fetch("/api/offers");
        if (!res.ok) {
          if (process.env.NODE_ENV === "development") {
            console.error("OfferPopup: Failed to fetch from /api/offers", res.status);
          }
          return;
        }
        
        const all: Offer[] = await res.json();
        const activeOffers = all
          .filter((o) => o.active)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        
        if (activeOffers.length === 0) {
          if (process.env.NODE_ENV === "development") {
            console.warn("OfferPopup: No active offers found in the database. Ensure at least one offer has active=true.");
          }
          return;
        }
        
        if (process.env.NODE_ENV === "development") {
          console.log(`OfferPopup: Successfully loaded ${activeOffers.length} active offers.`);
        }

        setOffers(activeOffers);
        timerRef.current = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("OfferPopup error during initialization:", err);
        }
      }
    }

    init();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleClose() {
    setOpen(false);
    markDismissed();
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      errs.name = "Please enter your full name (min 3 characters).";
    if (!/^\d{10}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!form.service) errs.service = "Please select a service.";
    if (!form.branch) errs.branch = "Please select a branch.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const currentOffer = offers[currentIndex];

  function handleWhatsApp() {
    if (!validate() || !currentOffer) return;

    const selectedBranch = SALON_BRANCHES.find((b) => b.slug === form.branch);
    if (!selectedBranch) return;

    const whatsappNumber = selectedBranch.phone.replace(/\D/g, "");

    const message = `Hello Vibe Unisex Salon,

I would like to claim the following offer.

Offer:
${currentOffer.title}

Customer Details:

Name: ${form.name.trim()}
Phone: ${form.phone.trim()}
Service Interested: ${form.service}
Preferred Branch: ${selectedBranch.name}

Please contact me regarding this offer.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    handleClose();
  }

  function detectNearestBranch() {
    setLocError(null);
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let nearest = SALON_BRANCHES[0];
        let minDist = Infinity;

        for (const branch of SALON_BRANCHES) {
          if (
            typeof branch.latitude === "number" &&
            typeof branch.longitude === "number"
          ) {
            const dist = haversineDistance(
              latitude,
              longitude,
              branch.latitude,
              branch.longitude
            );
            if (dist < minDist) {
              minDist = dist;
              nearest = branch;
            }
          }
        }

        setForm((prev) => ({ ...prev, branch: nearest.slug }));
        setErrors((prev) => ({ ...prev, branch: undefined }));
        setLocating(false);
      },
      () => {
        setLocError("Location access denied. Please select a branch manually.");
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }

  function nextOffer() {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  }

  function prevOffer() {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  }

  if (offers.length === 0 || !currentOffer) return null;

  const inputBase =
    "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 border";
  const inputStyle = {
    background: "rgba(255,250,244,0.9)",
    borderColor: "#D4C4A8",
    color: "#2C241B",
  };
  const errorStyle = { color: "#DC2626" };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="offer-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(44,36,27,0.6)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            key="offer-popup-card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(248,244,238,0.97) 0%, rgba(232,216,184,0.95) 100%)",
              border: "1px solid rgba(179,139,89,0.3)",
              boxShadow:
                "0 25px 60px rgba(44,36,27,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
              style={{ background: "rgba(44,36,27,0.15)", color: "#2C241B" }}
              aria-label="Close offer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* LEFT — Image with Slide Controls */}
              <div
                className="md:w-5/12 relative overflow-hidden flex flex-col justify-between"
                style={{ minHeight: "240px" }}
              >
                <div className="absolute inset-0 z-0">
                  {currentOffer.image ? (
                    <img
                      src={currentOffer.image}
                      alt={currentOffer.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #B38B59 0%, #D4A96A 50%, #E8C880 100%)",
                      }}
                    >
                      <span className="text-6xl">✨</span>
                    </div>
                  )}
                </div>

                {/* Gradient overlay on image */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 70%, rgba(248,244,238,0.3) 100%)",
                  }}
                />

                {/* Offer badge & Counter */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{
                      background: "linear-gradient(90deg, #B38B59, #D4A96A)",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(179,139,89,0.4)",
                    }}
                  >
                    Exclusive Offer
                  </span>
                  {offers.length > 1 && (
                    <span 
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                      style={{ background: "rgba(44,36,27,0.7)", color: "#FFF" }}
                    >
                      {currentIndex + 1} / {offers.length}
                    </span>
                  )}
                </div>

                {/* Navigation Chevron Overlay (Only visible if > 1 offer) */}
                {offers.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-20 pointer-events-none">
                    <button
                      onClick={prevOffer}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100 pointer-events-auto active:scale-95 shadow-md"
                      style={{ background: "rgba(255,255,255,0.9)", color: "#2C241B" }}
                    >
                      ←
                    </button>
                    <button
                      onClick={nextOffer}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100 pointer-events-auto active:scale-95 shadow-md"
                      style={{ background: "rgba(255,255,255,0.9)", color: "#2C241B" }}
                    >
                      →
                    </button>
                  </div>
                )}

                {/* Bottom carousel DOT indicators */}
                {offers.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    {offers.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="w-2 h-2 rounded-full transition-all duration-200"
                        style={{
                          backgroundColor: idx === currentIndex ? "#B38B59" : "rgba(255,255,255,0.5)",
                          transform: idx === currentIndex ? "scale(1.2)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT — Form */}
              <div className="md:w-7/12 p-6 md:p-7 overflow-y-auto max-h-[90vh]">
                {/* Offer info */}
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-1"
                  style={{ color: "#B38B59" }}
                >
                  Limited Time
                </p>
                <h2
                  className="text-2xl font-bold mb-2 leading-tight"
                  style={{ color: "#2C241B" }}
                >
                  {currentOffer.title}
                </h2>
                <p className="text-sm mb-5" style={{ color: "#6B5744" }}>
                  {currentOffer.description}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-5"
                  style={{ background: "linear-gradient(90deg, #D4C4A8, transparent)" }}
                />

                {/* Form */}
                <div className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={`${inputBase} focus:border-[#B38B59] focus:ring-2 focus:ring-[#B38B59]/20`}
                      style={inputStyle}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={errorStyle}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits) *"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                      className={`${inputBase} focus:border-[#B38B59] focus:ring-2 focus:ring-[#B38B59]/20`}
                      style={inputStyle}
                    />
                    {errors.phone && (
                      <p className="text-xs mt-1" style={errorStyle}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className={`${inputBase} focus:border-[#B38B59] focus:ring-2 focus:ring-[#B38B59]/20`}
                      style={inputStyle}
                    >
                      <option value="" disabled>
                        Service Interested *
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs mt-1" style={errorStyle}>
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Branch */}
                  <div>
                    <div className="flex gap-2">
                      <select
                        value={form.branch}
                        onChange={(e) =>
                          setForm({ ...form, branch: e.target.value })
                        }
                        className={`${inputBase} focus:border-[#B38B59] focus:ring-2 focus:ring-[#B38B59]/20 flex-1`}
                        style={inputStyle}
                      >
                        <option value="" disabled>
                          Preferred Branch *
                        </option>
                        {SALON_BRANCHES.map((branch) => (
                          <option key={branch.slug} value={branch.slug}>
                            {branch.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={detectNearestBranch}
                        disabled={locating}
                        title="Detect nearest branch"
                        className="px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 whitespace-nowrap disabled:opacity-60"
                        style={{
                          borderColor: "#B38B59",
                          color: "#B38B59",
                          background: "transparent",
                        }}
                      >
                        {locating ? "..." : "📍 Nearest"}
                      </button>
                    </div>
                    {locError && (
                      <p className="text-xs mt-1" style={{ color: "#B38B59" }}>
                        {locError}
                      </p>
                    )}
                    {errors.branch && (
                      <p className="text-xs mt-1" style={errorStyle}>
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #B38B59, #D4A96A)",
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(179,139,89,0.4)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {currentOffer.ctaText}
                  </button>

                  <p
                    className="text-center text-xs"
                    style={{ color: "#B0A090" }}
                  >
                    You&apos;ll be redirected to WhatsApp to complete your claim.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}