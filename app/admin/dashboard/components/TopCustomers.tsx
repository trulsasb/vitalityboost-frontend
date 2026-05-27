"use client";

import React from "react";

const customers = [
  { name: "John Doe", spent: 1299 },
  { name: "Sarah Smith", spent: 980 },
  { name: "Michael Brown", spent: 870 },
  { name: "Emily Johnson", spent: 760 },
  { name: "David Wilson", spent: 690 },
];

export default function TopCustomers() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Customers</h2>

      <div className="space-y-3">
        {customers.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{c.name}</span>
            <span className="text-gray-600">${c.spent}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
