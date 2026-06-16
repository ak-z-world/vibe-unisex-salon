import { NextRequest, NextResponse } from "next/server";
import { getOffers, createOffer } from "@/lib/offer-storage";
import { CreateOfferPayload } from "@/types/offer";

export async function GET(): Promise<NextResponse> {
  try {
    const offers = await getOffers();
    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error("[GET /api/offers]", error);
    return NextResponse.json(
      { error: "Failed to retrieve offers." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Partial<CreateOfferPayload>;

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Offer title is required." },
        { status: 400 }
      );
    }
    if (!body.description?.trim()) {
      return NextResponse.json(
        { error: "Offer description is required." },
        { status: 400 }
      );
    }
    if (!body.ctaText?.trim()) {
      return NextResponse.json(
        { error: "CTA text is required." },
        { status: 400 }
      );
    }

    const payload: CreateOfferPayload = {
      title: body.title.trim(),
      description: body.description.trim(),
      image: body.image?.trim() ?? "",
      ctaText: body.ctaText.trim(),
      active: body.active ?? true,
    };

    const offer = await createOffer(payload);
    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error("[POST /api/offers]", error);
    return NextResponse.json(
      { error: "Failed to create offer." },
      { status: 500 }
    );
  }
}