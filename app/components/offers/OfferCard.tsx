"use client";

import { Offer } from "@/types/offer";

interface OfferCardProps {
  offer: Offer;
  onEdit: (offer: Offer) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

export default function OfferCard({
  offer,
  onEdit,
  onDelete,
  onToggleActive,
}: OfferCardProps) {
  return (
    <div
      className="relative rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #FFFAF4 0%, #F8F0E3 100%)",
        borderColor: offer.active ? "#B38B59" : "#D4C4A8",
        boxShadow: offer.active
          ? "0 4px 24px rgba(179,139,89,0.15)"
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Status badge */}
      <div className="absolute top-3 right-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
          style={{
            background: offer.active
              ? "linear-gradient(90deg, #B38B59, #D4A96A)"
              : "#E8D8B8",
            color: offer.active ? "#fff" : "#8A7055",
          }}
        >
          {offer.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Image */}
      {offer.image && (
        <div className="w-full h-36 overflow-hidden">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-5">
        <h3
          className="text-lg font-bold mb-1 pr-20"
          style={{ color: "#2C241B" }}
        >
          {offer.title}
        </h3>
        <p className="text-sm mb-3 line-clamp-2" style={{ color: "#6B5744" }}>
          {offer.description}
        </p>
        <p className="text-xs mb-4" style={{ color: "#8A7055" }}>
          CTA:{" "}
          <span className="font-semibold" style={{ color: "#B38B59" }}>
            {offer.ctaText}
          </span>
        </p>
        <p className="text-xs mb-5" style={{ color: "#B0A090" }}>
          Created: {new Date(offer.createdAt).toLocaleDateString("en-IN")}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onEdit(offer)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #B38B59, #D4A96A)",
              color: "#fff",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => onToggleActive(offer.id, !offer.active)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200"
            style={{
              borderColor: "#B38B59",
              color: "#B38B59",
              background: "transparent",
            }}
          >
            {offer.active ? "Deactivate" : "Activate"}
          </button>

          <button
            onClick={() => onDelete(offer.id)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 ml-auto"
            style={{ background: "#FEE2E2", color: "#DC2626" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}