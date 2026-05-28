"use client";

interface OrderPaymentInfoProps {
  method: string;
  status: string;
  paidAt?: string;
}

export default function OrderPaymentInfo({
  method,
  status,
  paidAt,
}: OrderPaymentInfoProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Betaling</h2>

      <div className="flex justify-between">
        <span>Metode</span>
        <span>{method}</span>
      </div>

      <div className="flex justify-between">
        <span>Status</span>
        <span>{status}</span>
      </div>

      {paidAt && (
        <div className="flex justify-between">
          <span>Betalt</span>
          <span>{new Date(paidAt).toLocaleString("no-NO")}</span>
        </div>
      )}
    </section>
  );
}
