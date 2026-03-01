import { PaymentRequest, PaymentResponse } from "@/types/payments";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function createPayment(data: PaymentRequest): Promise<PaymentResponse> {
  const res = await fetch(`${API_BASE}/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Payment API error: ${res.status}`);
  }

  return res.json();
}

export async function getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
  const res = await fetch(`${API_BASE}/payments/status/${paymentId}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Payment status API error: ${res.status}`);
  }

  return res.json();
}
