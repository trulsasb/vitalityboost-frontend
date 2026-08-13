import Link from "next/link";
import { adminGet } from "@/lib/api/adminFetch";

interface BackendUser {
  id: number;
  email: string;
  is_admin: boolean;
  can_view_products: boolean;
  can_edit_products: boolean;
  can_view_orders: boolean;
  can_view_payments: boolean;
  can_manage_accounting: boolean;
  created_at: string | null;
}

function permissionSummary(user: BackendUser) {
  if (user.is_admin) return "Administrator (full tilgang)";
  const labels: string[] = [];
  if (user.can_view_products) labels.push("Se produkter");
  if (user.can_edit_products) labels.push("Endre produkter");
  if (user.can_view_orders) labels.push("Se ordre");
  if (user.can_view_payments) labels.push("Se betalinger");
  if (user.can_manage_accounting) labels.push("Regnskap");
  return labels.length > 0 ? labels.join(", ") : "Ingen tilganger";
}

export default async function UsersPage() {
  let users: BackendUser[] = [];
  let error = "";

  try {
    users = await adminGet<BackendUser[]>("/admin/users/", "Kunne ikke hente brukere");
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Brukere</h1>
        <Link
          href="/admin/users/new"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Ny bruker
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">E-post</th>
              <th className="text-left p-3 font-medium">Tilganger</th>
              <th className="text-left p-3 font-medium">Opprettet</th>
              <th className="text-right p-3 font-medium">Handling</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  Ingen brukere funnet
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-gray-600">{permissionSummary(user)}</td>
                <td className="p-3">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString("no-NO") : "-"}
                </td>
                <td className="p-3 text-right">
                  <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">
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
