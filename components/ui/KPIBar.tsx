// KPIBar.tsx
"use client";

import React from "react";
import clsx from "clsx";

type KPIBarProps = {
  label: string;
  value: number; // 0–100
  color?: string; // tailwind color class, e.g. "bg-green-500"
  className?: string;
};

export function KPIBar({
  label,
  value,
  color = "bg-black",
  className,
}: KPIBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{safeValue}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={clsx("h-2 rounded-full transition-all", color)}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
