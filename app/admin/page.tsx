import { adminGet } from "@/lib/api/adminFetch";

interface BackendOrder {
  id: number;
  total_amount: number;
  status: string;
  created_at: string | null;
  customer_name: string | null;
}

interface BackendProduct {
  id: number;
  active: boolean;
}

export default async function AdminHomePage() {
  let orders: BackendOrder[] = [];
  let products: BackendProduct[] = [];
  let error = "";

  try {
    [orders, products] = await Promise.all([
      adminGet<BackendOrder[]>("/admin/orders/", "Kunne ikke hente ordre"),
      adminGet<BackendProduct[]>("/admin/products/", "Kunne ikke hente produkter"),
    ]);
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentOrders = orders.filter(
    (o) => o.created_at && new Date(o.created_at).getTime() >= thirtyDaysAgo
  );
  const revenue30d = recentOrders
    .filter((o) => o.status !== "pending_payment" && o.status !== "failed" && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_amount, 0);
  const activeProducts = products.filter((p) => p.active).length;

  const sortedRecent = [...orders]
    .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
    .slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Admin</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Totale ordre</p>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>

        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Omsetning (30 dager)</p>
          <p className="text-2xl font-semibold">{revenue30d} kr</p>
        </div>

        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Aktive produkter</p>
          <p className="text-2xl font-semibold">{activeProducts}</p>
        </div>

        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Nye ordre (30 dager)</p>
          <p className="text-2xl font-semibold">{recentOrders.length}</p>
        </div>
      </div>

      <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Siste ordre</h2>

        {sortedRecent.length === 0 && (
          <p className="text-gray-600">Ingen ordre funnet.</p>
        )}

        <div className="space-y-2">
          {sortedRecent.map((order) => (
            <div key={order.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Ordre #{order.id}</p>
                <p className="text-sm text-gray-600">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString("no-NO") : "-"}
                  {order.customer_name ? ` · ${order.customer_name}` : ""}
                </p>
              </div>
              <p>{order.total_amount} kr</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
