import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-5 shadow-sm flex items-center justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
  );
}
