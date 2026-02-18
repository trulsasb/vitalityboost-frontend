// StatGrid.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { StatCard } from "./StatCard";

type StatItem = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

type StatGridProps = {
  items: StatItem[];
  columns?: number; // default 3
  className?: string;
};

export function StatGrid({
  items,
  columns = 3,
  className,
}: StatGridProps) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        {
          1: "grid-cols-1",
          2: "grid-cols-2",
          3: "grid-cols-3",
          4: "grid-cols-4",
        }[columns],
        className
      )}
    >
      {items.map((item, index) => (
        <StatCard
          key={index}
          label={item.label}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
