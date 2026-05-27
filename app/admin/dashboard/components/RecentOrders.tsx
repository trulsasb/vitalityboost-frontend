import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    total: 129.99,
    status: "paid",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-002",
    customer: "Sarah Smith",
    total: 89.5,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    total: 249.0,
    status: "shipped",
    createdAt: new Date().toISOString(),
  },
];

export default function RecentOrders() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
          >
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(order.createdAt), "PPP")}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">${order.total.toFixed(2)}</p>
              <p
                className={cn(
                  "text-sm capitalize",
                  order.status === "paid" && "text-green-600",
                  order.status === "pending" && "text-yellow-600",
                  order.status === "shipped" && "text-blue-600",
                  order.status === "cancelled" && "text-red-600"
                )}
              >
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
