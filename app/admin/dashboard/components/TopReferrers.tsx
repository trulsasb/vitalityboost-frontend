"use client";

import React from "react";

const referrers = [
  { source: "Google", visits: 1820 },
  { source: "Facebook", visits: 940 },
  { source: "Instagram", visits: 760 },
  { source: "YouTube", visits: 540 },
  { source: "Direct", visits: 480 },
];

export default function TopReferrers() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Referrers</h2>

      <div className="space-y-3">
        {referrers.map((r) => (
          <div
            key={r.source}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{r.source}</span>
            <span className="text-gray-600">{r.visits} visits</span>
          </div>
        ))}
      </div>
    </div>
  );
}
