"use client";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export default function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Oppsummering</h2>

      <div className="flex justify-between">
        <span>Delsum</span>
        <span>{subtotal} kr</span>
      </div>

      <div className="flex justify-between">
        <span>MVA</span>
        <span>{tax} kr</span>
      </div>

      <div className="flex justify-between">
        <span>Frakt</span>
        <span>{shipping} kr</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{total} kr</span>
      </div>
    </section>
  );
}
