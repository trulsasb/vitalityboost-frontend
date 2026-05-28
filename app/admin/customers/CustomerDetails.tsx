"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders: {
    id: string;
    status: string;
  }[];
}

export default function CustomerDetails({ id }: { id: string }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/customers/${id}`);
        const data = await res.json();
        setCustomer(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-gray-500">Laster kundedetaljer…</div>;
  }

  if (!customer) {
    return <div className="p-4 text-red-600">Kunde ikke funnet.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">{customer.name}</h2>

      <div className="space-y-1">
        <div><strong>E‑post:</strong> {customer.email}</div>
        {customer.phone && <div><strong>Telefon:</strong> {customer.phone}</div>}
        {customer.address && <div><strong>Adresse:</strong> {customer.address}</div>}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Ordrer</h3>
        {customer.orders.length === 0 ? (
          <div className="text-gray-500">Ingen ordrer.</div>
        ) : (
          <ul className="space-y-1">
            {customer.orders.map((order) => (
              <li key={order.id} className="border p-2 rounded">
                <strong>ID:</strong> {order.id} — <strong>Status:</strong> {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
