// Toast.tsx
"use client";

import React, { useEffect } from "react";
import clsx from "clsx";

type ToastProps = {
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number; // ms
  onClose: () => void;
  className?: string;
};

export function Toast({
  message,
  variant = "info",
  duration = 3000,
  onClose,
  className,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600 text-white",
  };

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-sm",
        variants[variant],
        className
      )}
    >
      {message}
    </div>
  );
}
