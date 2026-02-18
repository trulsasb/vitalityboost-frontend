// BadgeGroup.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { Badge } from "./Badge";

type BadgeGroupProps = {
  items: string[];
  className?: string;
  badgeClassName?: string;
};

export function BadgeGroup({
  items,
  className,
  badgeClassName,
}: BadgeGroupProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => (
        <Badge key={index} className={badgeClassName}>
          {item}
        </Badge>
      ))}
    </div>
  );
}
