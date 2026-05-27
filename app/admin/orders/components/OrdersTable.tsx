"use client";

import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";

interface Order {
  id: string;
  customer_name?: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left p-3 font-medium">Ordre-ID</th>
            <th className="text-left p-3 font-medium">Kunde</th>
            <th className="text-left p-3 font-medium">Beløp</th>
            <th className="text-left p-3 font-medium">Status</th>
            <th className="text-left p-3 font-medium">Betaling</th>
            <th className="text-left p-3 font-medium">Dato</th>
            <th className="text-right p-3 font-medium">Handling</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-6 text-gray-500">
                Ingen ordre funnet
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customer_name || "Ukjent"}</td>
              <td className="p-3">{order.total_amount} kr</td>
              <td className="p-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="p-3">{order.payment_status}</td>
              <td className="p-3">
                {new Date(order.created_at).toLocaleDateString("no-NO")}
              </td>
              <td className="p-3 text-right">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Åpne
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
