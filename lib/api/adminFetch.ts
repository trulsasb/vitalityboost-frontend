import { adminAuthHeader } from "@/lib/auth/adminToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Authenticated GET for admin Server Components. `path` should start with
 * "/", e.g. "/admin/orders". Throws with a Norwegian message on failure so
 * existing page-level try/catch blocks can render it directly.
 */
export async function adminGet<T = any>(
  path: string,
  errorMessage: string
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: { ...adminAuthHeader() },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(errorMessage);
  }

  return res.json();
}
