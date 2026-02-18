// Card.tsx
"use client";

import React from "react";
import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: boolean;
  border?: boolean;
};

export function Card({
  children,
  className,
  padding = "md",
  shadow = false,
  border = true,
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={clsx(
        "rounded-md bg-white",
        border && "border border-gray-200",
        shadow && "shadow-md",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
