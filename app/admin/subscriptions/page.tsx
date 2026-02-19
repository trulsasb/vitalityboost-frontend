import Link from "next/link";

async function getSubscriptions(search: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscriptions${query}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Kunne ikke hente abonnementer");
  }

  return res.json();
}

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search || "";

  let subscriptions: any[] = [];
  let error = "";

  try {
    subscriptions = await getSubscriptions(search);
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Abonnementer</h1>
      </div>

      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Søk etter abonnement..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
        >
          Søk
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Kunde</th>
              <th className="text-left p-3 font-medium">Produkt</th>
              <th className="text-left p-3 font-medium">Intervall</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Neste fornyelse</th>
              <th className="text-right p-3 font-medium">Handling</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-6 text-gray-500"
                >
                  Ingen abonnementer funnet
                </td>
              </tr>
            )}

            {subscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{sub.id}</td>
                <td className="p-3">{sub.customer_name}</td>
                <td className="p-3">{sub.product_name}</td>
                <td className="p-3">{sub.interval}</td>
                <td className="p-3">{sub.status}</td>
                <td className="p-3">
                  {new Date(sub.next_renewal).toLocaleDateString("no-NO")}
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
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
    </div>
  );
}
