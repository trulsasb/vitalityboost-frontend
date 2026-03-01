import { Cart, CartItem } from "@/types/cart";

const API_BASE = "/api/cart";

export async function getCart(): Promise<Cart> {
  const res = await fetch(`${API_BASE}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Kunne ikke hente handlekurv");
  }

  return res.json();
}

export async function addToCart(productId: string, quantity: number = 1) {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Kunne ikke legge til produkt i handlekurven");
  }

  return res.json();
}

export async function updateCartItem(itemId: string, quantity: number) {
  const res = await fetch(`${API_BASE}/update`, {
    method: "POST",
    body: JSON.stringify({ itemId, quantity }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Kunne ikke oppdatere handlekurv");
  }

  return res.json();
}

export async function removeFromCart(itemId: string) {
  const res = await fetch(`${API_BASE}/remove`, {
    method: "POST",
    body: JSON.stringify({ itemId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Kunne ikke fjerne produkt fra handlekurven");
  }

  return res.json();
}
