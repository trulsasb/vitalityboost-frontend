"use client";

import React from "react";
import StatsGrid from "./components/StatsGrid";
import RecentOrders from "./components/RecentOrders";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* KPI Cards */}
      <StatsGrid />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
