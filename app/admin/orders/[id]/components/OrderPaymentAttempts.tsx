"use client";

interface PaymentAttempt {
  id: string;
  status: string;
  amount: number;
  timestamp: string;
}

interface OrderPaymentAttemptsProps {
  attempts: PaymentAttempt[];
}

export default function OrderPaymentAttempts({ attempts }: OrderPaymentAttemptsProps) {
  if (!attempts || attempts.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Betalingsforsøk</h2>
        <p className="text-gray-600">Ingen betalingsforsøk registrert.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg">Betalingsforsøk</h2>

      <ul className="space-y-3">
        {attempts.map((a) => (
          <li key={a.id} className="flex justify-between">
            <span>{a.status}</span>
            <span>{a.amount} kr</span>
            <span>{new Date(a.timestamp).toLocaleString("no-NO")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
