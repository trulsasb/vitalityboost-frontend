export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
}

export interface AddToCartRequest {
  productId: string;
  quantity?: number;
  variantId?: string;
}
