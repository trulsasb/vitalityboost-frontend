// Tooltip.tsx
"use client";

import React, { useState } from "react";
import clsx from "clsx";

type TooltipProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({
  children,
  text,
  className,
  position = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className={clsx("relative inline-block", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={clsx(
            "absolute z-50 px-2 py-1 text-xs rounded bg-black text-white whitespace-nowrap",
            positions[position]
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}
