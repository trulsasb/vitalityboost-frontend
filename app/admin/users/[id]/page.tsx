"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PERMISSION_FIELDS = [
  { key: "can_view_products" as const, label: "Se produkter" },
  { key: "can_edit_products" as const, label: "Legge til / endre produkter" },
  { key: "can_view_orders" as const, label: "Se ordre" },
  { key: "can_view_payments" as const, label: "Se betalinger" },
  { key: "can_manage_accounting" as const, label: "Regnskap" },
  { key: "can_edit_content" as const, label: "Redigere hjemmesideinnhold" },
];

type Permissions = {
  can_view_products: boolean;
  can_edit_products: boolean;
  can_view_orders: boolean;
  can_view_payments: boolean;
  can_manage_accounting: boolean;
  can_edit_content: boolean;
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState<Permissions>({
    can_view_products: false,
    can_edit_products: false,
    can_view_orders: false,
    can_view_payments: false,
    can_manage_accounting: false,
    can_edit_content: false,
  });

  async function loadUser() {
    try {
      const res = await fetch(`/api/admin/proxy/users/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente bruker");
      const data = await res.json();

      setEmail(data.email);
      setIsAdmin(Boolean(data.is_admin));
      setPermissions({
        can_view_products: Boolean(data.can_view_products),
        can_edit_products: Boolean(data.can_edit_products),
        can_view_orders: Boolean(data.can_view_orders),
        can_view_payments: Boolean(data.can_view_payments),
        can_manage_accounting: Boolean(data.can_manage_accounting),
        can_edit_content: Boolean(data.can_edit_content),
      });
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function loadCurrentUser() {
    try {
      const res = await fetch("/api/admin/me", { method: "GET" });
      if (!res.ok) return;
      const data = await res.json();
      setIsOwner(Boolean(data.is_owner));
      setCurrentUserId(data.id);
    } catch {
      // If this fails, the delete button just stays hidden — fine, not critical.
    }
  }

  function togglePermission(key: keyof Permissions) {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function deleteUser() {
    if (!confirm("Er du sikker på at du vil slette denne brukeren? Dette kan ikke angres.")) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/proxy/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke slette bruker");
      }

      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
      setDeleting(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const body: Record<string, unknown> = {
      email,
      is_admin: isAdmin,
      ...permissions,
    };
    if (newPassword) {
      body.password = newPassword;
    }

    try {
      const res = await fetch(`/api/admin/proxy/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre bruker");
      }

      setNewPassword("");
      setSuccess("Lagret.");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadUser();
    loadCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster bruker...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Bruker #{id}</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>
      )}

      <form onSubmit={save} className="space-y-4">
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
          <label className="block text-sm font-medium">Nytt passord (valgfritt)</label>
          <input
            type="password"
            className="border rounded-md p-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="La stå tomt for å beholde nåværende passord"
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

              {PERMISSION_FIELDS.map(({ key, label }) => (
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

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {saving ? "Lagrer..." : "Lagre endringer"}
          </button>

          {isOwner && currentUserId !== Number(id) && (
            <button
              type="button"
              onClick={deleteUser}
              disabled={deleting}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Sletter..." : "Slett bruker"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
