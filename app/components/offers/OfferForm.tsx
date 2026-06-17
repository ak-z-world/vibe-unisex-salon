"use client";

import { useState, useEffect } from "react";
import { Offer, CreateOfferPayload } from "@/types/offer";

interface OfferFormProps {
  initialData?: Offer | null;
  onSubmit: (payload: CreateOfferPayload) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const EMPTY_FORM: CreateOfferPayload = {
  title: "",
  description: "",
  image: "",
  ctaText: "Claim Offer",
  active: true,
};

export default function OfferForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: OfferFormProps) {
  const [form, setForm] = useState<CreateOfferPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateOfferPayload, string>>>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        image: initialData.image,
        ctaText: initialData.ctaText,
        active: initialData.active,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [initialData]);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateOfferPayload, string>> = {};
    if (!form.title.trim()) newErrors.title = "Offer title is required.";
    if (!form.description.trim())
      newErrors.description = "Offer description is required.";
    if (!form.ctaText.trim()) newErrors.ctaText = "CTA text is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 border";
  const inputStyle = {
    background: "#FFFAF4",
    borderColor: "#D4C4A8",
    color: "#2C241B",
  };
  const focusStyle = "focus:border-[#B38B59] focus:ring-2 focus:ring-[#B38B59]/20";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-1.5";
  const labelStyle = { color: "#6B5744" };
  const errorClass = "text-xs mt-1";
  const errorStyle = { color: "#DC2626" };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className={labelClass} style={labelStyle}>
          Offer Title <span style={{ color: "#B38B59" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Flat 30% OFF on Hair Spa"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`${inputClass} ${focusStyle}`}
          style={inputStyle}
        />
        {errors.title && (
          <p className={errorClass} style={errorStyle}>
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass} style={labelStyle}>
          Offer Description <span style={{ color: "#B38B59" }}>*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Describe the offer in detail..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} ${focusStyle} resize-none`}
          style={inputStyle}
        />
        {errors.description && (
          <p className={errorClass} style={errorStyle}>
            {errors.description}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClass} style={labelStyle}>
          Offer Image URL
        </label>
        <input
          type="text"
          placeholder="/offers/hair-spa.jpg or https://..."
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className={`${inputClass} ${focusStyle}`}
          style={inputStyle}
        />
        {form.image && (
          <div className="mt-2 rounded-lg overflow-hidden h-24 w-full border" style={{ borderColor: "#E8D8B8" }}>
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* CTA Text */}
      <div>
        <label className={labelClass} style={labelStyle}>
          CTA Button Text <span style={{ color: "#B38B59" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Claim Offer"
          value={form.ctaText}
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          className={`${inputClass} ${focusStyle}`}
          style={inputStyle}
        />
        {errors.ctaText && (
          <p className={errorClass} style={errorStyle}>
            {errors.ctaText}
          </p>
        )}
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setForm({ ...form, active: !form.active })}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
          style={{ background: form.active ? "#B38B59" : "#D4C4A8" }}
          aria-checked={form.active}
          role="switch"
        >
          <span
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200"
            style={{ transform: form.active ? "translateX(22px)" : "translateX(4px)" }}
          />
        </button>
        <span className="text-sm font-medium" style={{ color: "#2C241B" }}>
          {form.active ? "Active — visible on website" : "Inactive — hidden from website"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 disabled:opacity-60"
          style={{
            background: "linear-gradient(90deg, #B38B59, #D4A96A)",
            color: "#fff",
          }}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Offer"
            : "Save Offer"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
          style={{ borderColor: "#D4C4A8", color: "#6B5744" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}