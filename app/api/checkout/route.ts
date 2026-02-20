import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, address, zip, city, items } = body;

  if (
    !name ||
    !email ||
    !address ||
    !zip ||
    !city ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return NextResponse.json(
      { error: "Ugyldig bestillingsdata." },
      { status: 400 }
    );
  }

  const total = items.reduce(
    (sum: number, item: { id: string; quantity: number; price: number }) =>
      sum + item.quantity * item.price,
    0
  );

  return NextResponse.json({
    success: true,
    order: {
      customer: { name, email, address, zip, city },
      items,
      total,
    },
  });
}
