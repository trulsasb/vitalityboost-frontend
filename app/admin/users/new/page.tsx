"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState({
    can_view_products: false,
    can_edit_products: false,
    can_view_orders: false,
    can_view_payments: false,
    can_manage_accounting: false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function togglePermission(key: keyof typeof permissions) {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/proxy/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          is_admin: isAdmin,
          ...permissions,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke opprette bruker");
      }

      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Ny bruker</h1>

      <form onSubmit={createUser} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">E-post</label>
          <input
            type="email"
            className="border rounded-md p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Passord</label>
          <input
            type="password"
            className="border rounded-md p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="border rounded-md p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="is_admin" className="font-medium">
              Administrator (full tilgang til alt, inkludert brukerstyring)
            </label>
          </div>

          {!isAdmin && (
            <div className="pl-6 space-y-2 pt-2 border-t">
              <p className="text-sm text-gray-600 mb-2">Eller gi spesifikke tilganger:</p>

              {[
                { key: "can_view_products" as const, label: "Se produkter" },
                { key: "can_edit_products" as const, label: "Legge til / endre produkter" },
                { key: "can_view_orders" as const, label: "Se ordre" },
                { key: "can_view_payments" as const, label: "Se betalinger" },
                { key: "can_manage_accounting" as const, label: "Regnskap" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={key}
                    checked={permissions[key]}
                    onChange={() => togglePermission(key)}
                  />
                  <label htmlFor={key}>{label}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Opprett bruker"}
        </button>
      </form>
    </div>
  );
}
