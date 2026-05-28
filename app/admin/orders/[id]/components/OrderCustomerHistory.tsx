"use client";

interface OrderCustomerHistoryProps {
  previousOrders: {
    id: string;
    date: string;
    total: number;
  }[];
}

export default function OrderCustomerHistory({
  previousOrders,
}: OrderCustomerHistoryProps) {
  if (!previousOrders || previousOrders.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Kundehistorikk</h2>
        <p className="text-gray-600">Ingen tidligere ordre.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-3">
      <h2 className="font-semibold text-lg">Kundehistorikk</h2>

      <ul className="space-y-2">
        {previousOrders.map((o) => (
          <li key={o.id} className="flex justify-between">
            <span>{new Date(o.date).toLocaleDateString("no-NO")}</span>
            <span>{o.total} kr</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
