import { NextResponse } from "next/server";
import { adminAuthHeader } from "@/lib/auth/adminToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  let headers: Record<string, string>;
  try {
    headers = adminAuthHeader();
  } catch {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE}/auth/me`, { headers, cache: "no-store" });
  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
