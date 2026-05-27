"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Admin Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main content */}
      <main
        className={cn(
          "flex-1 p-6 md:p-10",
          "max-w-full overflow-x-hidden"
        )}
      >
        {children}
      </main>
    </div>
  );
}
