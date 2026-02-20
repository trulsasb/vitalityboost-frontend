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

  // I en ekte løsning ville token verifiseres kryptografisk.
  // Her returnerer vi en gyldig respons for å gi en komplett modul.
  return NextResponse.json({
    valid: true,
    user: {
      email: "kunde@example.com",
    },
  });
}
