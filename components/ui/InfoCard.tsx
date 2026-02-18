// InfoCard.tsx
"use client";

import React from "react";
import clsx from "clsx";

type InfoCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function InfoCard({
  title,
  description,
  icon,
  className,
}: InfoCardProps) {
  return (
    <div
      className={clsx(
        "border rounded-lg p-4 bg-white flex items-start gap-4",
        className
      )}
    >
      {icon && <div className="text-gray-600 mt-1">{icon}</div>}

      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
