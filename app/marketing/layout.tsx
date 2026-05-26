import React from "react";
import "../globals.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="w-full border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl font-semibold">VitalityBoost</h1>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="w-full border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600">
          © {new Date().getFullYear()} VitalityBoost. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
