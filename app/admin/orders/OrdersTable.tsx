"use client";

import Link from "next/link";

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">Kunde</th>
          <th className="p-2 text-left">Total</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Detaljer</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-t">
            <td className="p-2">{order.customerName}</td>
            <td className="p-2">{order.total} kr</td>
            <td className="p-2">{order.status}</td>
            <td className="p-2">
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
  );
}
