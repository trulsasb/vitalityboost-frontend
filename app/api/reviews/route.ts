import { NextResponse } from "next/server";

const reviews = [
  {
    id: "r1",
    productId: "vitality-01",
    author: "Kunde A",
    rating: 5,
    comment: "Mer energi allerede etter én uke!",
    createdAt: "2024-01-12T10:15:00Z",
  },
  {
    id: "r2",
    productId: "vitality-02",
    author: "Kunde B",
    rating: 4,
    comment: "God kvalitet og rask levering.",
    createdAt: "2024-02-03T14:22:00Z",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId må spesifiseres." },
      { status: 400 }
    );
  }

  const productReviews = reviews.filter((r) => r.productId === productId);

  return NextResponse.json({
    productId,
    reviews: productReviews,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { productId, author, rating, comment } = body;

  if (
    !productId ||
    !author ||
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    !comment
  ) {
    return NextResponse.json(
      { error: "Ugyldig anmeldelsesdata." },
      { status: 400 }
    );
  }

  const review = {
    id: crypto.randomUUID(),
    productId,
    author,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);

  return NextResponse.json({
    success: true,
    review,
  });
}
