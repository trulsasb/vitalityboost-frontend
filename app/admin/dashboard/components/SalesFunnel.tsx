"use client";

import React from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { stage: "Visitors", value: 5400 },
  { stage: "Product Views", value: 3200 },
  { stage: "Add to Cart", value: 1800 },
  { stage: "Checkout", value: 950 },
  { stage: "Completed Purchase", value: 610 },
];

export default function SalesFunnel() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Sales Funnel</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList dataKey="stage" position="right" fill="#374151" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
