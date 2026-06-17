import { NextRequest, NextResponse } from "next/server";
import { updateOffer, deleteOffer } from "@/lib/offer-storage";
import { UpdateOfferPayload } from "@/types/offer";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = (await req.json()) as UpdateOfferPayload;

    const updated = await updateOffer(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Offer not found." }, { status: 404 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[PUT /api/offers/[id]]", error);
    return NextResponse.json(
      { error: "Failed to update offer." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const deleted = await deleteOffer(id);
    if (!deleted) {
      return NextResponse.json({ error: "Offer not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/offers/[id]]", error);
    return NextResponse.json(
      { error: "Failed to delete offer." },
      { status: 500 }
    );
  }
}