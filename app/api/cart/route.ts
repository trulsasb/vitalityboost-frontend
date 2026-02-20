import { NextResponse } from "next/server";

export async function GET() {
  // I en ekte produksjonsløsning ville dette hentet handlekurv fra database eller session.
  // Her returnerer vi en tom handlekurv for å gi en komplett, fungerende API‑modul.
  return NextResponse.json({
    items: [],
    total: 0,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!Array.isArray(body.items)) {
    return NextResponse.json(
      { error: "Ugyldig payload: items må være en liste." },
      { status: 400 }
    );
  }

  const total = body.items.reduce(
    (sum: number, item: { id: string; quantity: number; price: number }) =>
      sum + item.quantity * item.price,
    0
  );

  return NextResponse.json({
    success: true,
    items: body.items,
    total,
  });
}
