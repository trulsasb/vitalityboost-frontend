// payments.ts

import { Order } from "@/types";

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

export const payments = {
  // -------------------------
  // VIPPS
  // -------------------------
  initiateVippsPayment(orderId: string): Promise<{ redirectUrl: string }> {
    return request<{ redirectUrl: string }>(`/payments/vipps/initiate`, {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
  },

  // -------------------------
  // STRIPE
  // -------------------------
  initiateStripePayment(orderId: string): Promise<{ redirectUrl: string }> {
    return request<{ redirectUrl: string }>(`/payments/stripe/initiate`, {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
  },

  // -------------------------
  // ORDER STATUS AFTER PAYMENT
  // -------------------------
  getOrderStatus(orderId: string): Promise<Order> {
    return request<Order>(`/orders/${orderId}`);
  },
};
