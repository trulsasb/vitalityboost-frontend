// Divider.tsx
"use client";

import React from "react";
import clsx from "clsx";

type DividerProps = {
  className?: string;
  spacing?: "sm" | "md" | "lg";
};

export function Divider({ className, spacing = "md" }: DividerProps) {
  const spacingClasses = {
    sm: "my-2",
    md: "my-4",
    lg: "my-8",
  };

  return (
    <hr
      className={clsx(
        "border-t border-gray-300",
        spacingClasses[spacing],
        className
      )}
    />
  );
}
