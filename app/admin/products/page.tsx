import Link from "next/link";

async function getProducts(search: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products${query}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Kunne ikke hente produkter");
  }

  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search || "";

  let products: any[] = [];
  let error = "";

  try {
    products = await getProducts(search);
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Produkter</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Nytt produkt
        </Link>
      </div>

      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Søk etter produkter..."
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
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">Navn</th>
              <th className="text-left p-3 font-medium">Pris</th>
              <th className="text-left p-3 font-medium">Kategori</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Opprettet</th>
              <th className="text-right p-3 font-medium">Handling</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6 text-gray-500"
                >
                  Ingen produkter funnet
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price} kr</td>
                <td className="p-3">{product.category || "-"}</td>
                <td className="p-3">
                  {product.active ? "Aktiv" : "Inaktiv"}
                </td>
                <td className="p-3">
                  {new Date(product.created_at).toLocaleDateString("no-NO")}
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Rediger
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
