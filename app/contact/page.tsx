"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SALON_BRANCHES, type Branch } from "@/lib/branches";
import { contactFormSchema, ContactFormData, SERVICES } from "@/lib/contact-schema";
import { haversineDistance, formatDistance } from "@/lib/haversine";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// Generates the personalized structured text query parameter for the WhatsApp API
const buildWhatsAppUrl = (data: ContactFormData, branchPhone: string) => {
  const cleanPhone = branchPhone.replace(/[^0-9]/g, "");
  
  const textBody = 
`Hello Vibe Salon! I would like to book an appointment.

✨ *Booking Details* ✨
• *Name:* ${data.fullName}
• *Mobile:* ${data.mobile}
• *Service:* ${data.service}
• *Preferred Date:* ${data.preferredDate}
• *Preferred Time:* ${data.preferredTime}
${data.message ? `• *Special Note:* ${data.message}` : ""}

📍 *Selected Branch:* Vibe ${data.branchName}
Please confirm availability. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textBody)}`;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-[#1a1208]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
    <label htmlFor={htmlFor} className="block text-[11px] tracking-widest uppercase text-[#8a7d6b] mb-2 font-medium">
      {children}
      {required && <span className="text-[#c9a96e] ml-1">*</span>}
    </label>
  );
}

const inputBase =
  "w-full bg-[#0e0b07] border border-[#2a2318] rounded-sm px-4 py-3 text-sm text-[#f5efe6] placeholder-[#4a4030] focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition-colors duration-200";

// ---------------------------------------------------------------------------
// Branch Display Card
// ---------------------------------------------------------------------------

function BranchCard({ branch, distance }: { branch: Branch; distance?: number }) {
  return (
    <div className="mt-4 rounded-sm overflow-hidden border border-[#2a2318] bg-[#0e0b07] animate-fadeIn">
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

      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-[#c9a96e] mt-0.5 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </span>
          <span className="text-[13px] text-[#c8bfb0] leading-relaxed">{branch.address}</span>
        </div>
        <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="block hover:opacity-80 transition-opacity">
          <div className="flex items-start gap-3">
            <span className="text-[#c9a96e] mt-0.5 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <span className="text-[13px] text-[#c9a96e] leading-relaxed font-medium">{branch.phone}</span>
          </div>
        </a>
        <div className="flex items-start gap-3">
          <span className="text-[#c9a96e] mt-0.5 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-[13px] text-[#c8bfb0] leading-relaxed">{branch.hours}</span>
        </div>
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

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ContactPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [nearestDistance, setNearestDistance] = useState<number | undefined>();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
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

  // Handle immediate text redirection on submit configuration
  const onSubmit = (data: ContactFormData) => {
    if (!selectedBranch) return;
    const targetUrl = buildWhatsAppUrl(data, selectedBranch.phone);
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Hero Header Context */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden" aria-label="Contact page hero">
        <div className="absolute inset-0 bg-[#0a0805]">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #c9a96e22 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#c9a96e]" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e]">Vibe Unisex Salon</p>
            <div className="h-px w-12 bg-[#c9a96e]" />
          </div>

          <h1 className="text-4xl md:text-6xl font-light text-[#f5efe6] leading-[1.1] mb-6" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
            Instant WhatsApp <em className="text-[#c9a96e] not-italic">Booking</em>
          </h1>
          <p className="text-sm sm:text-base text-[#8a7d6b] leading-relaxed max-w-md mx-auto">
            Fill out your details below to instantly route your structured booking inquiry directly to your chosen branch manager.
          </p>
        </div>
      </section>

      {/* Main Structural Layout Block */}
      <section className="bg-[#0d0a06] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* Left Column: Branch Selection Mechanics */}
            <div className="space-y-6">
              <div className="bg-[#110e09] border border-[#1e1a12] rounded-sm p-6 md:p-8">
                <h2 className="text-xl font-light text-[#f5efe6] mb-1" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                  1. Choose Your Sanctuary
                </h2>
                <p className="text-xs text-[#4a4030] mb-6">
                  Select your branch to establish a direct secure secure connection link with the location coordinator.
                </p>

                <div className="mb-4">
                  <Label htmlFor="branch-select" required>Select Branch</Label>
                  <div className="relative">
                    <select
                      id="branch-select"
                      aria-label="Select a salon branch"
                      value={selectedBranch?.id ?? ""}
                      onChange={handleBranchDropdownChange}
                      className={cn(inputBase, "appearance-none pr-10 cursor-pointer")}
                    >
                      <option value="" disabled>— Choose a branch —</option>
                      {SALON_BRANCHES.map((b) => (
                        <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#c9a96e]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.branchId && <FieldError message="Please select a target branch location to enable booking" />}
                </div>

                <div className="mb-2">
                  <button
                    type="button"
                    onClick={findNearestBranch}
                    disabled={geoLoading}
                    className="w-full flex items-center justify-center gap-2 border border-[#2a2318] hover:border-[#c9a96e] text-[#c9a96e] hover:text-[#e8c480] text-[11px] tracking-widest uppercase px-4 py-3 rounded-sm transition-all duration-200 disabled:opacity-50"
                  >
                    {geoLoading ? (
                      <>
                        <Spinner />
                        Locating Nearest Sanctuary…
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
                  {geoError && <p role="alert" className="mt-2 text-xs text-rose-400">{geoError}</p>}
                </div>

                {selectedBranch && <BranchCard branch={selectedBranch} distance={nearestDistance} />}
              </div>
            </div>

            {/* Right Column: Dynamic WhatsApp Booking Form Interface */}
            <div className="bg-[#110e09] border border-[#1e1a12] rounded-sm p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div>
                  <h2 className="text-xl font-light text-[#f5efe6] mb-1" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                    2. Booking Parameters
                  </h2>
                  <p className="text-xs text-[#4a4030]">
                    Your information is compiled locally and directly passed to your clipboard message string.
                  </p>
                </div>

                {/* Full Name Input Field */}
                <div>
                  <Label htmlFor="fullName" required>Full Name</Label>
                  <input id="fullName" type="text" placeholder="Priya Ramesh" className={inputBase} {...register("fullName")} />
                  <FieldError message={errors.fullName?.message} />
                </div>

                {/* Mobile Input Field */}
                <div>
                  <Label htmlFor="mobile" required>Mobile Number</Label>
                  <input id="mobile" type="tel" maxLength={10} placeholder="9876543210" className={inputBase} {...register("mobile")} />
                  <FieldError message={errors.mobile?.message} />
                </div>

                {/* Service Select Options */}
                <div>
                  <Label htmlFor="service" required>Service Interested In</Label>
                  <div className="relative">
                    <select id="service" className={cn(inputBase, "appearance-none pr-10 cursor-pointer")} {...register("service")}>
                      <option value="">— Select a service —</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
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

                {/* Date + Time Parameter Layout Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate" required>Preferred Date</Label>
                    <input id="preferredDate" type="date" min={getTodayString()} className={cn(inputBase, "cursor-pointer [color-scheme:dark]")} {...register("preferredDate")} />
                    <FieldError message={errors.preferredDate?.message} />
                  </div>

                  <div>
                    <Label htmlFor="preferredTime" required>Preferred Time</Label>
                    <div className="relative">
                      <select id="preferredTime" className={cn(inputBase, "appearance-none pr-10 cursor-pointer")} {...register("preferredTime")}>
                        <option value="">— Time —</option>
                        {[
                          "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
                          "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
                          "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
                          "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
                        ].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#c9a96e]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <FieldError message={errors.preferredTime?.message} />
                  </div>
                </div>

                {/* Additional Text Message Configuration */}
                <div>
                  <Label htmlFor="message">Additional Notes</Label>
                  <textarea id="message" rows={3} placeholder="Any special requests or instructions…" maxLength={500} className={cn(inputBase, "resize-none")} {...register("message")} />
                  <FieldError message={errors.message?.message} />
                </div>

                {/* Hidden values passing form parameters to verification schemas */}
                <input type="hidden" {...register("branchId")} />
                <input type="hidden" {...register("branchSlug")} />
                <input type="hidden" {...register("branchName")} />

                {!selectedBranch && (
                  <p className="text-[11px] text-[#5a5040] italic">
                    ⚠ Please select a target salon branch location in the left panel first to enable submission.
                  </p>
                )}

                {/* Main Interactive Button Action */}
                <button
                  type="submit"
                  disabled={!selectedBranch}
                  className="w-full flex items-center justify-center gap-3 bg-[#4CAF50] hover:bg-[#43A047] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] tracking-widest uppercase font-bold px-8 py-4 rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(76,175,80,0.15)] hover:shadow-[0_4px_25px_rgba(76,175,80,0.3)]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.516 2.266 2.27 3.507 5.282 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.836 1.452 5.518 0 10.006-4.486 10.01-10.002.002-2.673-1.04-5.184-2.936-7.082-1.897-1.897-4.412-2.934-7.078-2.934-5.524 0-10.014 4.487-10.018 10.005-.001 1.673.443 3.303 1.288 4.717l-.993 3.626 3.71-.973zm10.43-3.414c-.276-.138-1.636-.807-1.889-.9-.253-.093-.437-.138-.62.138-.184.277-.713.9-.874 1.084-.162.184-.323.207-.6.069-.276-.138-1.168-.43-2.226-1.374-.823-.733-1.378-1.639-1.54-1.915-.162-.276-.017-.424.121-.561.124-.124.276-.323.415-.483.138-.161.184-.276.276-.46.093-.184.046-.346-.023-.483-.069-.138-.62-1.493-.849-2.046-.224-.54-.47-.466-.62-.474-.15-.007-.323-.008-.497-.008-.174 0-.458.065-.697.322-.24.257-.916.895-.916 2.182 0 1.288.937 2.529 1.067 2.704.13.175 1.843 2.814 4.465 3.945.624.269 1.11.43 1.49.55.627.199 1.198.171 1.65.103.504-.076 1.636-.667 1.865-1.312.23-.645.23-1.198.161-1.312-.069-.115-.253-.184-.529-.322z" />
                  </svg>
                  Redirect to WhatsApp
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Embedded Global Layout Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out both;
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}