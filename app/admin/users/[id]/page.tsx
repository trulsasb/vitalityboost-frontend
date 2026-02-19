"use client";

import { useEffect, useState } from "react";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  async function loadUser() {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente bruker");
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster bruker...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p>Fant ikke brukeren.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Bruker #{user.id}
      </h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {/* Brukerinfo */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Brukerinformasjon</h2>
        <p><strong>Navn:</strong> {user.name}</p>
        <p><strong>E‑post:</strong> {user.email}</p>
        <p>
          <strong>Opprettet:</strong>{" "}
          {new Date(user.created_at).toLocaleDateString("no-NO")}
        </p>
      </section>

      {/* Ordre */}
      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Ordre</h2>

        {user.orders.length === 0 && (
          <p className="text-gray-600">Ingen ordre funnet.</p>
        )}

        <div className="space-y-2">
          {user.orders.map((order: any) => (
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

      {/* Abonnementer */}
      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Abonnementer</h2>

        {user.subscriptions.length === 0 && (
          <p className="text-gray-600">Ingen abonnementer funnet.</p>
        )}

        <div className="space-y-2">
          {user.subscriptions.map((sub: any) => (
            <div
              key={sub.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{sub.product_name}</p>
                <p className="text-sm text-gray-600">
                  Neste fornyelse:{" "}
                  {new Date(sub.next_renewal).toLocaleDateString("no-NO")}
                </p>
              </div>
              <p>{sub.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
