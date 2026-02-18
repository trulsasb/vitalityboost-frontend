// lib/api/client.ts

import { Product, Order, Discount } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.vitalityboost_nettbutikk.no";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // -------------------------
  // PRODUCTS
  // -------------------------
  getProducts(): Promise<Product[]> {
    return request<Product[]>("/products");
  },

  getProduct(slug: string): Promise<Product> {
    return request<Product>(`/products/${slug}`);
  },

  // -------------------------
  // DISCOUNTS
  // -------------------------
  validateDiscount(code: string): Promise<Discount> {
    return request<Discount>(`/discounts/validate/${code}`);
  },

  // -------------------------
  // ORDERS
  // -------------------------
  createOrder(data: Partial<Order>): Promise<Order> {
    return request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getOrder(orderId: string): Promise<Order> {
    return request<Order>(`/orders/${orderId}`);
  },
};
