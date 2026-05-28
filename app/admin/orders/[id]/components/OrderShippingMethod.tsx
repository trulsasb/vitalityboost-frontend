"use client";

interface OrderShippingMethodProps {
  method: string;
  cost: number;
  eta?: string;
}

export default function OrderShippingMethod({
  method,
  cost,
  eta,
}: OrderShippingMethodProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Fraktmetode</h2>

      <div className="flex justify-between">
        <span>Metode</span>
        <span>{method}</span>
      </div>

      <div className="flex justify-between">
        <span>Kostnad</span>
        <span>{cost} kr</span>
      </div>

      {eta && (
        <div className="flex justify-between">
          <span>Estimert levering</span>
          <span>{eta}</span>
        </div>
      )}
    </section>
  );
}
