"use client";

import OrderEventItem from "./OrderEventItem";

interface OrderEventListProps {
  events: {
    id: string;
    type: string;
    timestamp: string;
  }[];
}

export default function OrderEventList({ events }: OrderEventListProps) {
  if (!events || events.length === 0) {
    return <p className="text-gray-600">Ingen hendelser registrert.</p>;
  }

  return (
    <ul className="space-y-2">
      {events.map((event) => (
        <OrderEventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
