"use client";

import React from "react";

const countries = [
  { country: "Norway", users: 820 },
  { country: "Sweden", users: 540 },
  { country: "Denmark", users: 430 },
  { country: "Germany", users: 390 },
  { country: "UK", users: 360 },
];

export default function TopCountries() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Countries</h2>

      <div className="space-y-3">
        {countries.map((c) => (
          <div
            key={c.country}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{c.country}</span>
            <span className="text-gray-600">{c.users} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
