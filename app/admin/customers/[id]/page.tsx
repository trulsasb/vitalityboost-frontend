"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params?.id;

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/admin/customers/${customerId}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Laster kunde...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <p className="text-gray-500 mb-4">Kunde ikke funnet.</p>
        <Link href="/admin/customers" className="text-blue-600 hover:underline">
          Tilbake til kunder
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          {customer.name}
        </h1>
        <p className="text-gray-600">{customer.email}</p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-medium mb-2">Kontaktinformasjon</h2>
        <p className="text-sm text-gray-700">Telefon: {customer.phone ?? "—"}</p>
        <p className="text-sm text-gray-700">Adresse: {customer.address ?? "—"}</p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-medium mb-2">Ordre</h2>
        {customer.orders?.length > 0 ? (
          <ul className="list-disc ml-5 space-y-1">
            {customer.orders.map((order: any) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ordre #{order.id}
                </Link>{" "}
                – {order.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">Ingen ordre funnet.</p>
        )}
      </div>

      <Link
        href="/admin/customers"
        className="text-blue-600 hover:underline inline-block"
      >
        ← Tilbake til kunder
      </Link>
    </div>
  );
}
