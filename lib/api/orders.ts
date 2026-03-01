import { apiGet, apiPost } from "./client";
import { Order, CreateOrderRequest, OrderStatusResponse } from "@/types/orders";

export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  return apiPost<Order>("/orders/create", data);
}

export async function getOrder(orderId: string): Promise<Order> {
  return apiGet<Order>(`/orders/${orderId}`);
}

export async function getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
  return apiGet<OrderStatusResponse>(`/orders/status/${orderId}`);
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  return apiGet<Order[]>(`/orders/user/${userId}`);
}
