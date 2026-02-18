// Container.tsx
"use client";

import React from "react";
import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  const sizes = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  };

  return (
    <div className={clsx("mx-auto px-4", sizes[size], className)}>
      {children}
    </div>
  );
}
