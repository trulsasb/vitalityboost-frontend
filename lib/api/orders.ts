export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    variantId?: string;
  }[];
  total: number;
}

export interface OrderStatusResponse {
  orderId: string;
  status: string;
  updatedAt: string;
}
