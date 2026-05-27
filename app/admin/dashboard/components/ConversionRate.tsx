"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const conversionRate = 12.4; // %

export default function ConversionRate() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Conversion Rate</h2>

      <div className="w-40 h-40">
        <CircularProgressbar
          value={conversionRate}
          text={`${conversionRate}%`}
          styles={buildStyles({
            textColor: "#111827",
            pathColor: "#4f46e5",
            trailColor: "#e5e7eb",
            textSize: "16px",
          })}
        />
      </div>
    </div>
  );
}
