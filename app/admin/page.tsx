async function getDashboardData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Kunne ikke hente dashboard-data");
  }

  return res.json();
}

export default async function AdminHomePage() {
  let data: any = null;
  let error = "";

  try {
    data = await getDashboardData();
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Admin</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {data && (
        <>
          {/* KPI-bokser */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Totale ordre</p>
              <p className="text-2xl font-semibold">{data.total_orders}</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Omsetning (30 dager)</p>
              <p className="text-2xl font-semibold">{data.revenue_30d} kr</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Aktive abonnementer</p>
              <p className="text-2xl font-semibold">{data.active_subscriptions}</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Nye kunder (30 dager)</p>
              <p className="text-2xl font-semibold">{data.new_customers_30d}</p>
            </div>
          </div>

          {/* Siste ordre */}
          <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
            <h2 className="font-semibold text-lg">Siste ordre</h2>

            {data.recent_orders.length === 0 && (
              <p className="text-gray-600">Ingen ordre funnet.</p>
            )}

            <div className="space-y-2">
              {data.recent_orders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">Ordre #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString("no-NO")}
                    </p>
                  </div>
                  <p>{order.total_amount} kr</p>
                </div>
              ))}
            </div>
          </section>

          {/* Siste abonnementer */}
          <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
            <h2 className="font-semibold text-lg">Nye abonnementer</h2>

            {data.recent_subscriptions.length === 0 && (
              <p className="text-gray-600">Ingen abonnementer funnet.</p>
            )}

            <div className="space-y-2">
              {data.recent_subscriptions.map((sub: any) => (
                <div
                  key={sub.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{sub.product_name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(sub.created_at).toLocaleDateString("no-NO")}
                    </p>
                  </div>
                  <p>{sub.status}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
