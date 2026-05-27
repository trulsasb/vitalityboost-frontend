"use client";

import React from "react";

const browsers = [
  { browser: "Chrome", users: 2840 },
  { browser: "Safari", users: 1620 },
  { browser: "Firefox", users: 540 },
  { browser: "Edge", users: 430 },
  { browser: "Other", users: 190 },
];

export default function TopBrowsers() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Browsers</h2>

      <div className="space-y-3">
        {browsers.map((b) => (
          <div
            key={b.browser}
            className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{b.browser}</span>
            <span className="text-gray-600">{b.users} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
