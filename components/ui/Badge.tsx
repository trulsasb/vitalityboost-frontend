// Badge.tsx
"use client";

import React from "react";
import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={clsx(
        "inline-block px-2 py-1 text-xs font-medium rounded-md",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
