import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    orders: [],
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { customer, items, total } = body;

  if (
    !customer ||
    !customer.name ||
    !customer.email ||
    !customer.address ||
    !customer.zip ||
    !customer.city ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof total !== "number"
  ) {
    return NextResponse.json(
      { error: "Ugyldig ordredata." },
      { status: 400 }
    );
  }

  const order = {
    id: crypto.randomUUID(),
    customer,
    items,
    total,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    order,
  });
}
