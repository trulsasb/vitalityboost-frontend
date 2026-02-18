// StatCard.tsx
"use client";

import React from "react";
import clsx from "clsx";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div
      className={clsx(
        "border rounded-lg p-4 bg-white flex items-center gap-4",
        className
      )}
    >
      {icon && <div className="text-gray-600">{icon}</div>}

      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-xl font-semibold text-gray-900">{value}</span>
      </div>
    </div>
  );
}
