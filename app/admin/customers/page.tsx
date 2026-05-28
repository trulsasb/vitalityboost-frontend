"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/admin/customers");
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Kunder
      </h1>
      <p className="text-gray-700 mb-6">
        Administrer kundekontoer, kontaktinformasjon og ordretilknytning.
      </p>

      {loading && (
        <p className="text-gray-500">Laster kunder...</p>
      )}

      {!loading && customers.length === 0 && (
        <p className="text-gray-500">Ingen kunder funnet.</p>
      )}

      {!loading && customers.length > 0 && (
        <div className="space-y-4">
          {customers.map((customer: any) => (
            <div
              key={customer.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-gray-600">{customer.email}</p>
              </div>

              <Link
                href={`/admin/customers/${customer.id}`}
                className="text-blue-600 hover:underline"
              >
                Vis detaljer
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
