"use client";

import React from "react";

const pages = [
  { page: "/products", visits: 1840 },
  { page: "/", visits: 1620 },
  { page: "/about", visits: 940 },
  { page: "/contact", visits: 620 },
  { page: "/cart", visits: 410 },
];

export default function TopLandingPages() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Landing Pages</h2>

      <div className="space-y-3">
        {pages.map((p) => (
          <div
            key={p.page}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{p.page}</span>
            <span className="text-gray-600">{p.visits} visits</span>
          </div>
        ))}
      </div>
    </div>
  );
}
