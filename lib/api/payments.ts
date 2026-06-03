export interface PaymentRequest {
  userId: string;
  orderId: string;
  amount: number;
  paymentMethod: string; // "card" | "vipps" | "stripe" etc.
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  status: string; // "pending" | "completed" | "failed"
  message?: string;
  redirectUrl?: string;
}
