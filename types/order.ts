export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totals: OrderTotals;
  customerId?: string;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderPayload {
  items: {
    productId: string;
    quantity: number;
    variantId?: string;
  }[];
}
