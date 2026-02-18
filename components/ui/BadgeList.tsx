// BadgeList.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { Badge } from "./Badge";

type BadgeListProps = {
  items: { label: string; variant?: "default" | "success" | "warning" | "error" }[];
  className?: string;
  badgeClassName?: string;
};

export function BadgeList({
  items,
  className,
  badgeClassName,
}: BadgeListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => (
        <Badge key={index} variant={item.variant} className={badgeClassName}>
          {item.label}
        </Badge>
      ))}
    </div>
  );
}
