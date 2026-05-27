import React from "react";
import StatsCard from "./StatsCard";
import { TrendingUp, Users, ShoppingBag, CreditCard } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value="$12,450"
        icon={<TrendingUp className="h-6 w-6" />}
      />
      <StatsCard
        title="New Customers"
        value="128"
        icon={<Users className="h-6 w-6" />}
      />
      <StatsCard
        title="Orders"
        value="342"
        icon={<ShoppingBag className="h-6 w-6" />}
      />
      <StatsCard
        title="Payments"
        value="289"
        icon={<CreditCard className="h-6 w-6" />}
      />
    </div>
  );
}
