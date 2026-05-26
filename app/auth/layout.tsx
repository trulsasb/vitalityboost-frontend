import React from "react";
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-md bg-white shadow-sm rounded-lg p-8">
        {children}
      </div>
    </div>
  );
}
