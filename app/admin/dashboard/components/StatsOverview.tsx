import React from "react";
import StatsGrid from "./StatsGrid";
import RecentOrders from "./RecentOrders";

export default function StatsOverview() {
  return (
    <div className="space-y-10">
      <StatsGrid />
      <RecentOrders />
    </div>
  );
}
