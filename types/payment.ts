export interface PaymentMethod {
  id: string;
  type: "card" | "vipps" | "invoice";
  last4?: string;
  provider?: string;
}

export interface PaymentStatus {
  status: "pending" | "authorized" | "captured" | "failed" | "refunded";
  message?: string;
  timestamp: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
}

export interface CreatePaymentPayload {
  orderId: string;
  method: "card" | "vipps" | "invoice";
}
