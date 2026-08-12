import { cookies } from "next/headers";

export const ADMIN_TOKEN_COOKIE = "admin_token";

/**
 * Reads the admin JWT from the httpOnly cookie on the server.
 * Returns null if the admin is not logged in.
 */
export function getAdminToken(): string | null {
  return cookies().get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}

/**
 * Builds the Authorization header for an authenticated admin request.
 * Throws if there is no token, since callers should only use this on
 * pages already gated by middleware.
 */
export function adminAuthHeader(): Record<string, string> {
  const token = getAdminToken();
  if (!token) {
    throw new Error("Ikke innlogget som admin");
  }
  return { Authorization: `Bearer ${token}` };
}
