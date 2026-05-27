"use client";

import React from "react";

const systems = [
  { os: "iOS", users: 2140 },
  { os: "Android", users: 1860 },
  { os: "Windows", users: 720 },
  { os: "macOS", users: 540 },
  { os: "Other", users: 190 },
];

export default function TopOperatingSystems() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Operating Systems</h2>

      <div className="space-y-3">
        {systems.map((s) => (
          <div
            key={s.os}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{s.os}</span>
            <span className="text-gray-600">{s.users} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
