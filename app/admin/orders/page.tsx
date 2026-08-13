import Link from "next/link";
import { adminGet } from "@/lib/api/adminFetch";

interface BackendOrder {
  id: number;
  total_amount: number;
  status: string;
  created_at: string | null;
  customer_name: string | null;
  customer_email: string | null;
}

export default async function OrdersPage() {
  let orders: BackendOrder[] = [];
  let error = "";

  try {
    orders = await adminGet<BackendOrder[]>("/admin/orders/", "Kunne ikke hente ordre");
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Ordrer</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Kunde</th>
              <th className="text-left p-3 font-medium">Beløp</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Opprettet</th>
              <th className="text-right p-3 font-medium">Handling</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  Ingen ordre funnet
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.customer_name || order.customer_email || "-"}</td>
                <td className="p-3">{order.total_amount} kr</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString("no-NO") : "-"}
                </td>
                <td className="p-3 text-right">
                  <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline">
                    Åpne
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
