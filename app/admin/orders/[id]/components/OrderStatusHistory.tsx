"use client";

interface StatusEntry {
  id: string;
  status: string;
  timestamp: string;
}

interface OrderStatusHistoryProps {
  history: StatusEntry[];
}

export default function OrderStatusHistory({ history }: OrderStatusHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Statushistorikk</h2>
        <p className="text-gray-600">Ingen statushistorikk.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg">Statushistorikk</h2>

      <ul className="space-y-3">
        {history.map((entry) => (
          <li key={entry.id} className="flex justify-between">
            <span>{entry.status}</span>
            <span>{new Date(entry.timestamp).toLocaleString("no-NO")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
