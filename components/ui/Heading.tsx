// Heading.tsx
"use client";

import React from "react";
import clsx from "clsx";

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export function Heading({
  children,
  level = 2,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizes = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return (
    <Tag className={clsx(sizes[level], "text-gray-900", className)}>
      {children}
    </Tag>
  );
}
