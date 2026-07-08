import { put, list } from "@vercel/blob";
import {
  Offer,
  CreateOfferPayload,
  UpdateOfferPayload,
} from "@/types/offer";

const FILE_NAME = "offers.json";

async function loadOffers(): Promise<Offer[]> {
  const blobs = await list({
    prefix: FILE_NAME,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (blobs.blobs.length === 0) {
    return [];
  }

  const url = blobs.blobs[0].url;

  // Pass the token in the headers to authenticate the request
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch blob: ${res.status} ${res.statusText}`);
    return [];
  }

  return await res.json();
}

async function saveOffers(offers: Offer[]) {
  await put(
    FILE_NAME,
    JSON.stringify(offers, null, 2),
    {
      access: "private",
      contentType: "application/json",
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );
}

export async function getOffers() {
  return await loadOffers();
}

export async function getOfferById(id: string) {
  const offers = await getOffers();

  return offers.find(o => o.id === id) ?? null;
}

export async function createOffer(payload: CreateOfferPayload) {

  const offers = await getOffers();

  const offer: Offer = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload,
  };

  offers.push(offer);

  await saveOffers(offers);

  return offer;
}

export async function updateOffer(
  id: string,
  payload: UpdateOfferPayload
) {

  const offers = await getOffers();

  const index = offers.findIndex(o => o.id === id);

  if (index === -1) return null;

  offers[index] = {
    ...offers[index],
    ...payload,
  };

  await saveOffers(offers);

  return offers[index];
}

export async function deleteOffer(id: string) {

  const offers = await getOffers();

  const filtered = offers.filter(o => o.id !== id);

  await saveOffers(filtered);

  return true;
}

export async function getActiveOffer() {

  const offers = await getOffers();

  return (
    offers
      .filter(o => o.active)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )[0] ?? null
  );
}