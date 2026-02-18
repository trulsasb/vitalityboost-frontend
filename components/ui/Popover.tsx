// Popover.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
};

export function Popover({
  trigger,
  children,
  className,
  align = "left",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignments = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={clsx(
            "absolute mt-2 z-20 bg-white border border-gray-200 rounded shadow-lg p-3",
            alignments[align],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
