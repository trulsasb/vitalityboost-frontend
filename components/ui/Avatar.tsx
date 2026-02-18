// Avatar.tsx
"use client";

import React from "react";
import clsx from "clsx";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Avatar({
  src,
  alt = "",
  size = "md",
  className,
}: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden bg-gray-200 flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-gray-500 text-sm">?</span>
      )}
    </div>
  );
}
