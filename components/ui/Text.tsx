// Text.tsx
"use client";

import React from "react";
import clsx from "clsx";

type TextProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  muted?: boolean;
  className?: string;
};

export function Text({
  children,
  size = "md",
  muted = false,
  className,
}: TextProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <p
      className={clsx(
        sizes[size],
        muted ? "text-gray-500" : "text-gray-800",
        className
      )}
    >
      {children}
    </p>
  );
}
