"use client";

interface TimelineEvent {
  id: string;
  label: string;
  timestamp: string;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

export default function OrderTimeline({ events }: OrderTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Tidslinje</h2>
        <p className="text-gray-600">Ingen hendelser registrert.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg">Tidslinje</h2>

      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.id} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium">{e.label}</p>
              <p className="text-sm text-gray-600">
                {new Date(e.timestamp).toLocaleString("no-NO")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
