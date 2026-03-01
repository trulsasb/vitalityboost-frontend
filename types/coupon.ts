export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  active: boolean;
  expiresAt?: string;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
}

export interface ApplyCouponResult {
  valid: boolean;
  discountAmount: number;
  message?: string;
}

export interface ValidateCouponPayload {
  code: string;
  orderTotal: number;
}
