// Progress.tsx
"use client";

import React from "react";
import clsx from "clsx";

type ProgressProps = {
  value: number; // 0–100
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={clsx("w-full bg-gray-200 rounded-full h-2", className)}>
      <div
        className="bg-black h-2 rounded-full transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
