import { NextRequest, NextResponse } from "next/server";
import { getAdminToken } from "@/lib/auth/adminToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Thin authenticated proxy from client components to the backend's /admin/*
// endpoints. The admin JWT lives in an httpOnly cookie the browser can't
// read directly, so client components call this same-origin route instead
// of the backend, and this route (running server-side) attaches the token.
async function proxy(req: NextRequest, path: string[]) {
  const token = getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  const url = `${API_BASE}/admin/${path.join("/")}/${req.nextUrl.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  };

  if (req.method === "POST" || req.method === "PUT") {
    init.headers = { ...init.headers, "Content-Type": "application/json" };
    init.body = await req.text();
  }

  const res = await fetch(url, init);
  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params.path);
}
