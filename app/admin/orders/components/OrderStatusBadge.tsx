"use client";

interface OrderStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Refunded: "bg-purple-100 text-purple-800",
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = statusStyles[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}
