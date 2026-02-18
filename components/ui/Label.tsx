// Label.tsx
"use client";

import React from "react";
import clsx from "clsx";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
};

export function Label({
  children,
  htmlFor,
  className,
  required = false,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-sm font-medium text-gray-700", className)}
    >
      {children}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
}
