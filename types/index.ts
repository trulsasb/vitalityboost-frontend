// types/index.ts

export type ProductVariant = {
  id: string;
  name: string;
  price: number; // pris inkl. MVA
  description: string;
  stock: number;
  sku: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  images: string[];
  variants: ProductVariant[];
  active: boolean;
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

export type PaymentMethod = "vipps" | "stripe" | "card";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "AUTHORIZED"
  | "CAPTURED"
  | "FAILED"
  | "REFUNDED";

export type Order = {
  id: string;
  items: CartItem[];
  total: number; // inkl. MVA
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type Discount = {
  id: string;
  code: string;
  percentage?: number;
  amount?: number;
  productId?: string;
  active: boolean;
};
