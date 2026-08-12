import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Matches models/order.py's OrderStatus enum.
export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled"
  | "refunded"
  | "failed";

export interface AdminOrder {
  id: number;
  created_at: string;
  total_amount: number;
  status: OrderStatus;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending_payment: "text-yellow-600",
  paid: "text-green-600",
  shipped: "text-blue-600",
  completed: "text-green-700",
  cancelled: "text-red-600",
  refunded: "text-gray-500",
  failed: "text-red-600",
};

export default function RecentOrders({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString("nb-NO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{formatPrice(order.total_amount)}</p>
                <p className={cn("text-sm capitalize", STATUS_STYLES[order.status])}>
                  {order.status.replace("_", " ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
