"use client";

import { useState, useEffect, useCallback } from "react";
import { Offer, CreateOfferPayload } from "@/types/offer";
import OfferCard from "./OfferCard";
import OfferForm from "./OfferForm";

type ViewState = "list" | "create" | "edit";

export default function OfferManager() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>("list");
  const [editTarget, setEditTarget] = useState<Offer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/offers");
      if (!res.ok) throw new Error("Failed to fetch offers");
      const data: Offer[] = await res.json();
      setOffers(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  async function handleCreate(payload: CreateOfferPayload) {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create offer");
      }
      await fetchOffers();
      setView("list");
      showToast("Offer created successfully.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to create offer.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(payload: CreateOfferPayload) {
    if (!editTarget) return;
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/offers/${editTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to update offer");
      }
      await fetchOffers();
      setView("list");
      setEditTarget(null);
      showToast("Offer updated successfully.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update offer.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete offer");
      await fetchOffers();
      setDeleteConfirm(null);
      showToast("Offer deleted.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete offer.", "error");
    }
  }

  async function handleToggleActive(id: string, active: boolean) {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error("Failed to update offer");
      await fetchOffers();
      showToast(`Offer ${active ? "activated" : "deactivated"}.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update offer.", "error");
    }
  }

  function handleEdit(offer: Offer) {
    setEditTarget(offer);
    setView("edit");
  }

  function handleCancel() {
    setView("list");
    setEditTarget(null);
  }

  const activeCount = offers.filter((o) => o.active).length;

  return (
    <div className="min-h-screen pt-15" style={{ background: "#F8F4EE" }}>
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all duration-300"
          style={{
            background: toast.type === "success" ? "#2C241B" : "#DC2626",
            color: "#fff",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: "rgba(44,36,27,0.5)", backdropFilter: "blur(4px)" }}>
          <div
            className="rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            style={{ background: "#FFFAF4", border: "1px solid #E8D8B8" }}
          >
            <h3 className="text-lg font-bold mb-2" style={{ color: "#2C241B" }}>
              Delete Offer?
            </h3>
            <p className="text-sm mb-5" style={{ color: "#6B5744" }}>
              This action cannot be undone. The offer will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "#DC2626", color: "#fff" }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border"
                style={{ borderColor: "#D4C4A8", color: "#6B5744" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#B38B59" }}>
              Vibe Unisex Salon
            </p>
            <h1 className="text-3xl font-bold" style={{ color: "#2C241B" }}>
              Offer Management
            </h1>
            {view === "list" && !loading && (
              <p className="text-sm mt-1" style={{ color: "#8A7055" }}>
                {offers.length} total · {activeCount} active
              </p>
            )}
          </div>
          {view === "list" && (
            <button
              onClick={() => setView("create")}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #B38B59, #D4A96A)",
                color: "#fff",
              }}
            >
              + Create Offer
            </button>
          )}
          {view !== "list" && (
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
              style={{ borderColor: "#D4C4A8", color: "#6B5744" }}
            >
              ← Back to Offers
            </button>
          )}
        </div>

        {/* Create / Edit Form */}
        {(view === "create" || view === "edit") && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "#FFFAF4",
              border: "1px solid #E8D8B8",
              boxShadow: "0 4px 24px rgba(179,139,89,0.1)",
            }}
          >
            <h2 className="text-xl font-bold mb-5" style={{ color: "#2C241B" }}>
              {view === "create" ? "Create New Offer" : "Edit Offer"}
            </h2>
            <OfferForm
              initialData={view === "edit" ? editTarget : null}
              onSubmit={view === "create" ? handleCreate : handleUpdate}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <>
            {loading && (
              <div className="flex items-center justify-center py-24">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#B38B59", borderTopColor: "transparent" }}
                />
              </div>
            )}

            {error && (
              <div
                className="rounded-xl px-5 py-4 text-sm"
                style={{ background: "#FEE2E2", color: "#DC2626" }}
              >
                {error}
                <button
                  onClick={fetchOffers}
                  className="ml-3 underline"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && offers.length === 0 && (
              <div className="text-center py-24">
                <p className="text-4xl mb-4">✨</p>
                <p className="text-lg font-semibold mb-1" style={{ color: "#2C241B" }}>
                  No offers yet
                </p>
                <p className="text-sm mb-6" style={{ color: "#8A7055" }}>
                  Create your first offer to start attracting clients.
                </p>
                <button
                  onClick={() => setView("create")}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #B38B59, #D4A96A)",
                    color: "#fff",
                  }}
                >
                  + Create First Offer
                </button>
              </div>
            )}

            {!loading && !error && offers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteConfirm(id)}
                    onToggleActive={handleToggleActive}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}