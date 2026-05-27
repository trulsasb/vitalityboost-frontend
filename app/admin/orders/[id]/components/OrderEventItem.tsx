"use client";

interface OrderEventItemProps {
  event: {
    id: string;
    type: string;
    timestamp: string;
  };
}

export default function OrderEventItem({ event }: OrderEventItemProps) {
  return (
    <li className="border-b pb-2">
      <p className="font-medium">{event.type}</p>
      <p className="text-sm text-gray-600">
        {new Date(event.timestamp).toLocaleString("no-NO")}
      </p>
    </li>
  );
}
