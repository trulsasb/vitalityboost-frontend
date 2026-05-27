"use client";

import React from "react";

const devices = [
  { device: "Mobile", users: 3120 },
  { device: "Desktop", users: 1980 },
  { device: "Tablet", users: 740 },
  { device: "Other", users: 210 },
];

export default function TopDevices() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Devices</h2>

      <div className="space-y-3">
        {devices.map((d) => (
          <div
            key={d.device}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{d.device}</span>
            <span className="text-gray-600">{d.users} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
