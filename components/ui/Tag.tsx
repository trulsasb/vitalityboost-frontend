// Tag.tsx
"use client";

import React from "react";
import clsx from "clsx";

type TagProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
};

export function Tag({
  children,
  variant = "default",
  className,
}: TagProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
