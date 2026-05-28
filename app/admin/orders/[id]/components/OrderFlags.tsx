"use client";

interface OrderFlagsProps {
  flagged: boolean;
  reasons?: string[];
}

export default function OrderFlags({ flagged, reasons }: OrderFlagsProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Flagg</h2>

      <div className="flex justify-between">
        <span>Status</span>
        <span>{flagged ? "Flagget" : "Ingen flagg"}</span>
      </div>

      {flagged && reasons && reasons.length > 0 && (
        <ul className="list-disc pl-5 space-y-1">
          {reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
