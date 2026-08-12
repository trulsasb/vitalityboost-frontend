import StatsCard from "./StatsCard";
import { TrendingUp, Users, ShoppingBag, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StatsGridProps {
  totalRevenue: number;
  newCustomers: number;
  ordersCount: number;
  paymentsCount: number;
}

export default function StatsGrid({
  totalRevenue,
  newCustomers,
  ordersCount,
  paymentsCount,
}: StatsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value={formatPrice(totalRevenue)}
        icon={<TrendingUp className="h-6 w-6" />}
      />
      <StatsCard
        title="Customers"
        value={newCustomers}
        icon={<Users className="h-6 w-6" />}
      />
      <StatsCard
        title="Orders"
        value={ordersCount}
        icon={<ShoppingBag className="h-6 w-6" />}
      />
      <StatsCard
        title="Payments"
        value={paymentsCount}
        icon={<CreditCard className="h-6 w-6" />}
      />
    </div>
  );
}
