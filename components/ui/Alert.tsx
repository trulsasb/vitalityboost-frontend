// Alert.tsx
"use client";

import React from "react";
import clsx from "clsx";

type AlertProps = {
  title?: string;
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
};

export function Alert({
  title,
  message,
  variant = "info",
  className,
}: AlertProps) {
  const variants = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div
      className={clsx(
        "border rounded-md p-4 text-sm",
        variants[variant],
        className
      )}
    >
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div>{message}</div>
    </div>
  );
}
