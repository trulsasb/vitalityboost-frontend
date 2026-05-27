"use client";

import React from "react";

const products = [
  { name: "Protein Shake", sales: 420 },
  { name: "Vitamin D3", sales: 310 },
  { name: "Omega‑3 Capsules", sales: 275 },
  { name: "Creatine Monohydrate", sales: 190 },
  { name: "Electrolyte Mix", sales: 160 },
];

export default function TopProducts() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{p.name}</span>
            <span className="text-gray-600">{p.sales} sold</span>
          </div>
        ))}
      </div>
    </div>
  );
}
