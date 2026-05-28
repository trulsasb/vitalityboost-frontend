"use client";

interface OrderStatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-200 text-gray-700",
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const color = statusColors[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${color}`}>
      {status}
    </span>
  );
}
