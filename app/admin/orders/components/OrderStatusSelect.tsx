"use client";

interface OrderStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = ["Pending", "Completed", "Cancelled", "Refunded"];

export default function OrderStatusSelect({
  value,
  onChange,
}: OrderStatusSelectProps) {
  return (
    <select
      className="border rounded-md px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
