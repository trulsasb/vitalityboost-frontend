import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json(
      { error: "Token mangler." },
      { status: 400 }
    );
  }

  // I en ekte løsning ville token verifiseres og brukerdata hentes fra database.
  return NextResponse.json({
    success: true,
    user: {
      email: "kunde@example.com",
      name: "Eksempel Kunde",
      createdAt: "2024-01-01T12:00:00Z",
    },
  });
}
