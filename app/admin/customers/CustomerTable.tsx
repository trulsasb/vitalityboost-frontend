"use client";

import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  email: string;
}

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">Navn</th>
          <th className="p-2 text-left">E‑post</th>
          <th className="p-2 text-left">Detaljer</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} className="border-t">
            <td className="p-2">{customer.name}</td>
            <td className="p-2">{customer.email}</td>
            <td className="p-2">
              <Link
                href={`/admin/customers/${customer.id}`}
                className="text-blue-600 hover:underline"
              >
                Åpne
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
