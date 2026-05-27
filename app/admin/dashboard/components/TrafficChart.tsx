"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { source: "Organic", value: 430 },
  { source: "Social", value: 290 },
  { source: "Email", value: 180 },
  { source: "Paid Ads", value: 350 },
  { source: "Referral", value: 220 },
];

export default function TrafficChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="source" />
            <Tooltip />
            <Radar
              name="Traffic"
              dataKey="value"
              stroke="#0ea5e9"
              fill="#7dd3fc"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
