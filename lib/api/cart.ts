import { apiGet, apiPost, apiDelete } from "./client";
import { Cart, CartItem, AddToCartRequest } from "@/types/cart";

export async function getCart(userId: string): Promise<Cart> {
  return apiGet<Cart>(`/cart/${userId}`);
}

export async function addToCart(data: AddToCartRequest): Promise<CartItem> {
  return apiPost<CartItem>("/cart/add", data);
}

export async function removeFromCart(itemId: string): Promise<{ success: boolean }> {
  return apiDelete<{ success: boolean }>(`/cart/remove/${itemId}`);
}

export async function clearCart(userId: string): Promise<{ success: boolean }> {
  return apiDelete<{ success: boolean }>(`/cart/clear/${userId}`);
}
