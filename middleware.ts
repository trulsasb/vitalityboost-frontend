import { NextRequest, NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/adminToken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Protects every /admin page. Actual token validity (expiry, signature,
// is_admin claim) is still checked per-request by the backend — this
// middleware only gates the route so logged-out visitors can't see the UI.
export const config = {
  matcher: ["/admin/:path*"],
};
