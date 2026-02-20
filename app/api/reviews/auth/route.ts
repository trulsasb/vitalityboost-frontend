import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "E‑post og passord må fylles ut." },
      { status: 400 }
    );
  }

  // I en ekte produksjonsløsning ville dette sjekket database + hashing.
  // Her returnerer vi en gyldig respons for å gi en komplett modul.
  const token = crypto.randomUUID();

  return NextResponse.json({
    success: true,
    user: {
      email,
    },
    token,
  });
}
