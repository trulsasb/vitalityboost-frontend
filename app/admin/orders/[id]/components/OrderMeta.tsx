"use client";

interface OrderMetaProps {
  orderId: string;
  source: string;
  ip?: string;
}

export default function OrderMeta({ orderId, source, ip }: OrderMetaProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Meta</h2>

      <div className="flex justify-between">
        <span>Order‑ID</span>
        <span>{orderId}</span>
      </div>

      <div className="flex justify-between">
        <span>Kilde</span>
        <span>{source}</span>
      </div>

      {ip && (
        <div className="flex justify-between">
          <span>IP‑adresse</span>
          <span>{ip}</span>
        </div>
      )}
    </section>
  );
}
