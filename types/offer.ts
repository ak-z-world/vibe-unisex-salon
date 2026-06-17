export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  active: boolean;
  createdAt: string;
}

export type CreateOfferPayload = Omit<Offer, "id" | "createdAt">;
export type UpdateOfferPayload = Partial<Omit<Offer, "id" | "createdAt">>;