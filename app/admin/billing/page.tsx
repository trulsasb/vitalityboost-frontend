import Link from "next/link";

async function getBilling() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/billing`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Kunne ikke hente billing-data");
  }

  return res.json();
}

export default async function BillingPage() {
  let data: any = null;
  let error = "";

  try {
    data = await getBilling();
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Billing</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {data && (
        <>
          {/* KPI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Omsetning (30 dager)</p>
              <p className="text-2xl font-semibold">{data.revenue_30d} kr</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Transaksjoner (30 dager)</p>
              <p className="text-2xl font-semibold">{data.transactions_30d}</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Payouts (30 dager)</p>
              <p className="text-2xl font-semibold">{data.payouts_30d} kr</p>
            </div>
          </div>

          {/* Transaksjoner */}
          <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
            <h2 className="font-semibold text-lg">Transaksjoner</h2>

            {data.transactions.length === 0 && (
              <p className="text-gray-600">Ingen transaksjoner funnet.</p>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">ID</th>
                    <th className="text-left p-3 font-medium">Kunde</th>
                    <th className="text-left p-3 font-medium">Beløp</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Dato</th>
                    <th className="text-right p-3 font-medium">Handling</th>
                  </tr>
                </thead>

                <tbody>
                  {data.transactions.map((tx: any) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{tx.id}</td>
                      <td className="p-3">{tx.customer_name}</td>
                      <td className="p-3">{tx.amount} kr</td>
                      <td className="p-3">{tx.status}</td>
                      <td className="p-3">
                        {new Date(tx.created_at).toLocaleDateString("no-NO")}
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/admin/billing/${tx.id}`}
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
          </section>

          {/* Payouts */}
          <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
            <h2 className="font-semibold text-lg">Payouts</h2>

            {data.payouts.length === 0 && (
              <p className="text-gray-600">Ingen payouts funnet.</p>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">ID</th>
                    <th className="text-left p-3 font-medium">Beløp</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Dato</th>
                  </tr>
                </thead>

                <tbody>
                  {data.payouts.map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{p.id}</td>
                      <td className="p-3">{p.amount} kr</td>
                      <td className="p-3">{p.status}</td>
                      <td className="p-3">
                        {new Date(p.created_at).toLocaleDateString("no-NO")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
