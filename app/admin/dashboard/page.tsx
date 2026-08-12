import { adminGet } from "@/lib/api/adminFetch";
import StatsGrid from "./components/StatsGrid";
import RecentOrders, { type AdminOrder } from "./components/RecentOrders";

// Local shapes matching the backend's actual response fields (models/order.py,
// models/payment.py, models/user.py) rather than the speculative types in
// types/order.ts and types/payment.ts, which use a different, incompatible
// schema (nested totals, camelCase, etc.) that the backend does not return.
interface AdminPayment {
  id: number;
}

interface AdminUser {
  id: number;
}

const REVENUE_STATUSES = new Set(["paid", "shipped", "completed"]);

export default async function DashboardPage() {
  let error = "";
  let orders: AdminOrder[] = [];
  let payments: AdminPayment[] = [];
  let users: AdminUser[] = [];

  try {
    [orders, payments, users] = await Promise.all([
      adminGet<AdminOrder[]>("/admin/orders/", "Kunne ikke hente ordre"),
      adminGet<AdminPayment[]>("/admin/payments/", "Kunne ikke hente betalinger"),
      adminGet<AdminUser[]>("/admin/users/", "Kunne ikke hente brukere"),
    ]);
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  const totalRevenue = orders
    .filter((order) => REVENUE_STATUSES.has(order.status))
    .reduce((sum, order) => sum + order.total_amount, 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-10">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <StatsGrid
        totalRevenue={totalRevenue}
        newCustomers={users.length}
        ordersCount={orders.length}
        paymentsCount={payments.length}
      />

      <RecentOrders orders={recentOrders} />
    </div>
  );
}
