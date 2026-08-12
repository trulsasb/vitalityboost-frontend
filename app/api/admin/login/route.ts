import { NextRequest, NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/adminToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "E-post og passord er påkrevd" },
      { status: 400 }
    );
  }

  // Backend expects OAuth2PasswordRequestForm: form-urlencoded, field name
  // "username" (not "email") and "password".
  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Feil e-post eller passord" },
      { status: 401 }
    );
  }

  const data = await res.json();
  const token: string | undefined = data.access_token;

  if (!token) {
    return NextResponse.json(
      { error: "Uventet svar fra serveren" },
      { status: 502 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours, matches backend token expiry
  });

  return response;
}
