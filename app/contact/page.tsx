"use client";

import { useState, useCallback, useTransition, useRef } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SALON_BRANCHES, type Branch } from "@/lib/branches";
import { contactFormSchema, ContactFormData, SERVICES } from "@/lib/contact-schema";
import { haversineDistance, formatDistance } from "@/lib/haversine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubmitState = "idle" | "submitting" | "success" | "error";

// ---------------------------------------------------------------------------
// Tiny helpers
// ---------------------------------------------------------------------------

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] tracking-widest uppercase text-[#8a7d6b] mb-2 font-medium"
    >
      {children}
      {required && <span className="text-[#c9a96e] ml-1">*</span>}
    </label>
  );
}

const inputBase =
  "w-full bg-[#0e0b07] border border-[#2a2318] rounded-sm px-4 py-3 text-sm text-[#f5efe6] placeholder-[#4a4030] focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition-colors duration-200";

// ---------------------------------------------------------------------------
// Branch Card (shown when a branch is selected)
// ---------------------------------------------------------------------------

function BranchCard({ branch, distance }: { branch: Branch; distance?: number }) {
  return (
    <div className="mt-4 rounded-sm overflow-hidden border border-[#2a2318] bg-[#0e0b07] animate-fadeIn">
      {/* Branch image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={branch.featuredImageUrl}
          alt={branch.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b07] via-transparent to-transparent" />
        {distance !== undefined && (
          <div className="absolute top-3 right-3 bg-[#c9a96e] text-[#1a1208] text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-sm">
            {formatDistance(distance)}
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-[10px] tracking-widest uppercase text-[#c9a96e] mb-0.5">
            {branch.city} · {branch.neighborhood}
          </p>
          <h3 className="text-base font-medium text-[#f5efe6] leading-tight">{branch.name}</h3>
        </div>
      </div>

      {/* Branch details */}
      <div className="p-5 space-y-3">
        <BranchDetailRow
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
          text={branch.address}
        />
        <BranchDetailRow
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          }
          text={branch.phone}
          href={`tel:${branch.phone.replace(/\s/g, "")}`}
        />
        <BranchDetailRow
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          text={branch.hours}
        />
        <a
          href={branch.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-1 text-[11px] tracking-widest uppercase text-[#c9a96e] hover:text-[#e8c480] transition-colors duration-200 border border-[#2a2318] hover:border-[#c9a96e] px-3 py-2 rounded-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

function BranchDetailRow({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-[#c9a96e] mt-0.5 shrink-0">{icon}</span>
      <span className="text-[13px] text-[#c8bfb0] leading-relaxed">{text}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

// ---------------------------------------------------------------------------
// Success screen
// ---------------------------------------------------------------------------

function SuccessScreen({ branchName, onReset }: { branchName: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fadeIn">
      <div className="w-16 h-16 rounded-full border border-[#c9a96e] flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-[#c9a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <p className="text-[10px] tracking-widest uppercase text-[#c9a96e] mb-3">Enquiry Received</p>
      <h3 className="text-2xl font-light text-[#f5efe6] mb-3" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
        We'll be in touch soon
      </h3>
      <p className="text-sm text-[#8a7d6b] leading-relaxed max-w-xs mb-8">
        Your enquiry has been sent to <span className="text-[#c9a96e]">{branchName}</span>. Our team will contact you within 2 hours to confirm your appointment.
      </p>
      <button
        onClick={onReset}
        className="text-[11px] tracking-widest uppercase text-[#c9a96e] border border-[#2a2318] hover:border-[#c9a96e] px-6 py-2.5 rounded-sm transition-colors duration-200"
      >
        Submit Another Enquiry
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton loaders
// ---------------------------------------------------------------------------

function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className="h-3 w-24 bg-[#1a1610] rounded mb-2" />
          <div className="h-11 bg-[#0e0b07] border border-[#1a1610] rounded-sm" />
        </div>
      ))}
      <div className="h-11 bg-[#1a1208] rounded-sm" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function ContactPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [nearestDistance, setNearestDistance] = useState<number | undefined>();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      service: undefined,
      preferredDate: "",
      preferredTime: "",
      message: "",
      branchId: "",
      branchSlug: "",
      branchName: "",
    },
  });

  // ---- Branch selection ----

  const selectBranch = useCallback(
    (branch: Branch | null, distance?: number) => {
      setSelectedBranch(branch);
      setNearestDistance(distance);
      if (branch) {
        setValue("branchId", branch.id, { shouldValidate: true });
        setValue("branchSlug", branch.slug, { shouldValidate: true });
        setValue("branchName", branch.name, { shouldValidate: true });
      } else {
        setValue("branchId", "");
        setValue("branchSlug", "");
        setValue("branchName", "");
      }
    },
    [setValue]
  );

  const handleBranchDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = SALON_BRANCHES.find((b) => b.id === e.target.value) ?? null;
    setNearestDistance(undefined);
    selectBranch(branch);
  };

  // ---- Geolocation ----

  const findNearestBranch = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let nearest: Branch | null = null;
        let minDist = Infinity;

        SALON_BRANCHES.forEach((b) => {
          const d = haversineDistance(latitude, longitude, b.latitude, b.longitude);
          if (d < minDist) {
            minDist = d;
            nearest = b;
          }
        });

        setGeoLoading(false);
        if (nearest) {
          selectBranch(nearest, minDist);
        }
      },
      (err) => {
        setGeoLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location access was denied. Please select a branch manually.");
        } else {
          setGeoError("Unable to retrieve your location. Please select a branch manually.");
        }
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  }, [selectBranch]);

  // ---- Form submit ----

  const onSubmit = (data: ContactFormData) => {
    setSubmitState("submitting");
    setApiError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok || !json.success) {
          setApiError(json.error ?? "Something went wrong. Please try again.");
          setSubmitState("error");
        } else {
          setSubmitState("success");
        }
      } catch {
        setApiError("Network error. Please check your connection and try again.");
        setSubmitState("error");
      }
    });
  };

  const handleReset = () => {
    reset();
    setSelectedBranch(null);
    setNearestDistance(undefined);
    setSubmitState("idle");
    setApiError(null);
  };

  // ---- Render ----

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero Section                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        aria-label="Contact page hero"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0805]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #c9a96e22 0%, transparent 70%)",
            }}
          />
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative lines */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a96e]/20 to-transparent hidden lg:block" />
          <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a96e]/20 to-transparent hidden lg:block" />
        </div>

        <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#c9a96e]" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e]">
              Vibe Unisex Salon
            </p>
            <div className="h-px w-12 bg-[#c9a96e]" />
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-[#f5efe6] leading-[1.1] mb-6"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Book Your{" "}
            <em className="text-[#c9a96e] not-italic">Experience</em>
          </h1>

          <p className="text-base text-[#8a7d6b] leading-relaxed max-w-lg mx-auto mb-10">
            Select your nearest salon, choose a service, and let our experts
            craft a look that is entirely, beautifully yours.
          </p>

          {/* CTA */}
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#e8c480] text-[#1a1208] text-[11px] tracking-widest uppercase font-semibold px-8 py-4 rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
          >
            Book an Appointment
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0a06] to-transparent" />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Main Content                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[#0d0a06] py-20 px-4" ref={formRef}>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">
              Get in Touch
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#f5efe6]"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Send Us Your Enquiry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* ---------------------------------------------------------- */}
            {/* Left column: Branch Selector + Branch Card                  */}
            {/* ---------------------------------------------------------- */}
            <div>
              <div className="bg-[#110e09] border border-[#1e1a12] rounded-sm p-6 md:p-8">
                <h2
                  className="text-xl font-light text-[#f5efe6] mb-1"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  Choose Your Branch
                </h2>
                <p className="text-xs text-[#4a4030] mb-6">
                  Select the branch you'd like to visit and we'll route your enquiry directly to them.
                </p>

                {/* Dropdown */}
                <div className="mb-4">
                  <Label htmlFor="branch-select" required>
                    Select Branch
                  </Label>
                  <div className="relative">
                    <select
                      id="branch-select"
                      aria-label="Select a salon branch"
                      value={selectedBranch?.id ?? ""}
                      onChange={handleBranchDropdownChange}
                      className={cn(inputBase, "appearance-none pr-10 cursor-pointer")}
                    >
                      <option value="" disabled>
                        — Choose a branch —
                      </option>
                      {SALON_BRANCHES.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#c9a96e]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.branchId && (
                    <FieldError message="Please select a branch before submitting" />
                  )}
                </div>

                {/* Find nearest button */}
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={findNearestBranch}
                    disabled={geoLoading}
                    className="w-full flex items-center justify-center gap-2 border border-[#2a2318] hover:border-[#c9a96e] text-[#c9a96e] hover:text-[#e8c480] text-[11px] tracking-widest uppercase px-4 py-3 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-live="polite"
                  >
                    {geoLoading ? (
                      <>
                        <Spinner />
                        Detecting Location…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Find My Nearest Branch
                      </>
                    )}
                  </button>
                  {geoError && (
                    <p role="alert" className="mt-2 text-xs text-rose-400">
                      {geoError}
                    </p>
                  )}
                </div>

                {/* Branch card */}
                {selectedBranch && (
                  <BranchCard branch={selectedBranch} distance={nearestDistance} />
                )}
              </div>

              {/* Decorative FAQ teaser */}
              <div className="mt-8 space-y-3">
                {[
                  { q: "What services do you offer?", a: "Haircuts, hair spa, facials, bridal makeup, keratin treatment, hair coloring and more." },
                  { q: "How quickly will you respond?", a: "Our team will reach out within 2 hours during salon operating hours." },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="border border-[#1e1a12] rounded-sm overflow-hidden group"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm text-[#c8bfb0] list-none hover:text-[#f5efe6] transition-colors">
                      {item.q}
                      <svg className="w-4 h-4 text-[#c9a96e] shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-xs text-[#5a5040] leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Right column: Contact Form                                  */}
            {/* ---------------------------------------------------------- */}
            <div className="bg-[#110e09] border border-[#1e1a12] rounded-sm overflow-hidden">
              {submitState === "success" ? (
                <SuccessScreen
                  branchName={selectedBranch?.name ?? "your selected branch"}
                  onReset={handleReset}
                />
              ) : isPending ? (
                <div className="p-6 md:p-8">
                  <FormSkeleton />
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Appointment enquiry form"
                  className="p-6 md:p-8 space-y-6"
                >
                  <div>
                    <h2
                      className="text-xl font-light text-[#f5efe6] mb-1"
                      style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                    >
                      Your Details
                    </h2>
                    <p className="text-xs text-[#4a4030]">
                      All fields marked <span className="text-[#c9a96e]">*</span> are required.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" required>Full Name</Label>
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Priya Ramesh"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={inputBase}
                      {...register("fullName")}
                    />
                    <FieldError message={errors.fullName?.message} />
                  </div>

                  {/* Mobile */}
                  <div>
                    <Label htmlFor="mobile" required>Mobile Number</Label>
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      aria-invalid={!!errors.mobile}
                      className={inputBase}
                      {...register("mobile")}
                    />
                    <FieldError message={errors.mobile?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" required>Email Address</Label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="priya@example.com"
                      aria-invalid={!!errors.email}
                      className={inputBase}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  {/* Service */}
                  <div>
                    <Label htmlFor="service" required>Service Interested In</Label>
                    <div className="relative">
                      <select
                        id="service"
                        aria-invalid={!!errors.service}
                        className={cn(inputBase, "appearance-none pr-10 cursor-pointer")}
                        {...register("service")}
                      >
                        <option value="">— Select a service —</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#c9a96e]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <FieldError message={errors.service?.message} />
                  </div>

                  {/* Date + Time grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate" required>Preferred Date</Label>
                      <input
                        id="preferredDate"
                        type="date"
                        min={getTodayString()}
                        aria-invalid={!!errors.preferredDate}
                        className={cn(inputBase, "cursor-pointer [color-scheme:dark]")}
                        {...register("preferredDate")}
                      />
                      <FieldError message={errors.preferredDate?.message} />
                    </div>

                    <div>
                      <Label htmlFor="preferredTime" required>Preferred Time</Label>
                      <div className="relative">
                        <Controller
                          name="preferredTime"
                          control={control}
                          render={({ field }) => (
                            <select
                              id="preferredTime"
                              aria-invalid={!!errors.preferredTime}
                              className={cn(inputBase, "appearance-none pr-10 cursor-pointer")}
                              {...field}
                            >
                              <option value="">— Time —</option>
                              {[
                                "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
                                "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
                                "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
                                "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
                                "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
                                "7:00 PM", "7:30 PM", "8:00 PM",
                              ].map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          )}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#c9a96e]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <FieldError message={errors.preferredTime?.message} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Any special requests or questions…"
                      maxLength={500}
                      className={cn(inputBase, "resize-none")}
                      {...register("message")}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  {/* Hidden fields */}
                  <input type="hidden" {...register("branchId")} />
                  <input type="hidden" {...register("branchSlug")} />
                  <input type="hidden" {...register("branchName")} />

                  {/* API error */}
                  {submitState === "error" && apiError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 bg-rose-950/40 border border-rose-800/60 rounded-sm px-4 py-3"
                    >
                      <svg className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-rose-300 leading-relaxed">{apiError}</p>
                    </div>
                  )}

                  {/* Branch validation warning */}
                  {!selectedBranch && (
                    <p className="text-[11px] text-[#5a5040] italic">
                      ⚠ Please select a branch above before submitting.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitState === "submitting" || !selectedBranch}
                    className="w-full flex items-center justify-center gap-3 bg-[#c9a96e] hover:bg-[#e8c480] disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1208] text-[11px] tracking-widest uppercase font-bold px-8 py-4 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,110,0.25)]"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Spinner />
                        Sending Enquiry…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Global styles via style tag (fade-in animation)                   */}
      {/* ---------------------------------------------------------------- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out both;
        }
      `}</style>
    </>
  );
}