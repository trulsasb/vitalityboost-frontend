"use client";

import React from "react";

const categories = [
  { name: "Supplements", sales: 1420 },
  { name: "Vitamins", sales: 980 },
  { name: "Protein", sales: 860 },
  { name: "Wellness", sales: 740 },
  { name: "Accessories", sales: 510 },
];

export default function TopCategories() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Categories</h2>

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{c.name}</span>
            <span className="text-gray-600">{c.sales} sales</span>
          </div>
        ))}
      </div>
    </div>
  );
}
