import { adminGet } from "@/lib/api/adminFetch";

interface BackendPayment {
  id: number;
  order_id: number;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string | null;
}

export default async function BillingPage() {
  let payments: BackendPayment[] = [];
  let error = "";

  try {
    payments = await adminGet<BackendPayment[]>("/payments/", "Kunne ikke hente betalinger");
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  const revenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Betalinger</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Bekreftet omsetning</p>
          <p className="text-2xl font-semibold">{revenue} kr</p>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Totalt antall betalinger</p>
          <p className="text-2xl font-semibold">{payments.length}</p>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-600">Fullførte</p>
          <p className="text-2xl font-semibold">
            {payments.filter((p) => p.status === "completed").length}
          </p>
        </div>
      </div>

      <section className="border rounded-md p-4 bg-white shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">Transaksjoner</h2>

        {payments.length === 0 && (
          <p className="text-gray-600">Ingen transaksjoner funnet.</p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">Ordre</th>
                <th className="text-left p-3 font-medium">Metode</th>
                <th className="text-left p-3 font-medium">Beløp</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Dato</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">#{p.order_id}</td>
                  <td className="p-3 capitalize">{p.provider}</td>
                  <td className="p-3">{p.amount} {p.currency}</td>
                  <td className="p-3">{p.status}</td>
                  <td className="p-3">
                    {p.created_at ? new Date(p.created_at).toLocaleDateString("no-NO") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
