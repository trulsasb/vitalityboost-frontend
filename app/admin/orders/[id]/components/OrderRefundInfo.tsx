"use client";

interface OrderRefundInfoProps {
  refunded: boolean;
  refundedAmount?: number;
  refundedAt?: string;
}

export default function OrderRefundInfo({
  refunded,
  refundedAmount,
  refundedAt,
}: OrderRefundInfoProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Refund</h2>

      <div className="flex justify-between">
        <span>Status</span>
        <span>{refunded ? "Refundert" : "Ikke refundert"}</span>
      </div>

      {refundedAmount !== undefined && (
        <div className="flex justify-between">
          <span>Beløp</span>
          <span>{refundedAmount} kr</span>
        </div>
      )}

      {refundedAt && (
        <div className="flex justify-between">
          <span>Dato</span>
          <span>{new Date(refundedAt).toLocaleString("no-NO")}</span>
        </div>
      )}
    </section>
  );
}
