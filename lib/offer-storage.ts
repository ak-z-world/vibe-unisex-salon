import { promises as fs } from "fs";
import path from "path";
import { Offer, CreateOfferPayload, UpdateOfferPayload } from "@/types/offer";

const OFFERS_FILE = path.join(process.cwd(), "data", "offers.json");

// In-memory fallback for serverless (read-only) environments
let inMemoryOffers: Offer[] | null = null;

async function loadOffers(): Promise<Offer[]> {
  // Return cached memory if available
  if (inMemoryOffers) return inMemoryOffers;

  try {
    const raw = await fs.readFile(OFFERS_FILE, "utf-8");
    inMemoryOffers = JSON.parse(raw) as Offer[];
  } catch (error) {
    // If file doesn't exist, initialize an empty array
    inMemoryOffers = [];
  }
  return inMemoryOffers;
}

async function saveOffers(offers: Offer[]): Promise<void> {
  // 1. Always update the in-memory state so the app works instantly
  inMemoryOffers = offers;

  // 2. Try to save to disk (works locally, fails silently in production)
  try {
    await fs.mkdir(path.dirname(OFFERS_FILE), { recursive: true });
    await fs.writeFile(OFFERS_FILE, JSON.stringify(offers, null, 2), "utf-8");
  } catch (error) {
    console.warn("Read-only filesystem detected. Using in-memory storage.");
  }
}

export async function getOffers(): Promise<Offer[]> {
  return await loadOffers();
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const offers = await getOffers();
  return offers.find((o) => o.id === id) ?? null;
}

export async function createOffer(payload: CreateOfferPayload): Promise<Offer> {
  const offers = await getOffers();
  const newOffer: Offer = {
    id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  
  offers.push(newOffer);
  await saveOffers(offers);
  
  return newOffer;
}

export async function updateOffer(
  id: string,
  payload: UpdateOfferPayload
): Promise<Offer | null> {
  const offers = await getOffers();
  const index = offers.findIndex((o) => o.id === id);
  if (index === -1) return null;
  
  offers[index] = { ...offers[index], ...payload };
  await saveOffers(offers);
  
  return offers[index];
}

export async function deleteOffer(id: string): Promise<boolean> {
  const offers = await getOffers();
  const filtered = offers.filter((o) => o.id !== id);
  
  if (filtered.length === offers.length) return false;
  
  await saveOffers(filtered);
  return true;
}

export async function getActiveOffer(): Promise<Offer | null> {
  const offers = await getOffers();
  const active = offers
    .filter((o) => o.active)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  return active[0] ?? null;
}