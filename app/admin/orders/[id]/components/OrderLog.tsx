"use client";

interface OrderLogEntry {
  id: string;
  message: string;
  timestamp: string;
}

interface OrderLogProps {
  entries: OrderLogEntry[];
}

export default function OrderLog({ entries }: OrderLogProps) {
  if (!entries || entries.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Logg</h2>
        <p className="text-gray-600">Ingen loggoppføringer.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg">Logg</h2>

      <ul className="space-y-3">
        {entries.map((e) => (
          <li key={e.id} className="space-y-1">
            <p className="text-sm text-gray-600">
              {new Date(e.timestamp).toLocaleString("no-NO")}
            </p>
            <p>{e.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
