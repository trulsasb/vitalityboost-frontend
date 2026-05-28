"use client";

interface OrderShippingInfoProps {
  carrier: string;
  trackingNumber?: string;
  shippedAt?: string;
}

export default function OrderShippingInfo({
  carrier,
  trackingNumber,
  shippedAt,
}: OrderShippingInfoProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Frakt</h2>

      <div className="flex justify-between">
        <span>Transportør</span>
        <span>{carrier}</span>
      </div>

      {trackingNumber && (
        <div className="flex justify-between">
          <span>Sporingsnummer</span>
          <span>{trackingNumber}</span>
        </div>
      )}

      {shippedAt && (
        <div className="flex justify-between">
          <span>Sendt</span>
          <span>{new Date(shippedAt).toLocaleString("no-NO")}</span>
        </div>
      )}
    </section>
  );
}
