// Spinner.tsx
"use client";

import React from "react";
import clsx from "clsx";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-gray-300 border-t-black",
        sizes[size],
        className
      )}
    />
  );
}
