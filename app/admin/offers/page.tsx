import { Metadata } from "next";
import OfferManager from "@/app/components/offers/OfferManager";

export const metadata: Metadata = {
  title: "Offer Management — Vibe Unisex Salon Admin",
  description: "Manage promotional offers for Vibe Unisex Salon branches.",
  robots: { index: false, follow: false },
};

export default function AdminOffersPage() {
  return <OfferManager />;
}