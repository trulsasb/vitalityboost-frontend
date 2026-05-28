"use client";

interface OrderFraudCheckProps {
  score: number;
  level: "low" | "medium" | "high";
  reason?: string;
}

export default function OrderFraudCheck({
  score,
  level,
  reason,
}: OrderFraudCheckProps) {
  const color =
    level === "high"
      ? "text-red-700"
      : level === "medium"
      ? "text-yellow-700"
      : "text-green-700";

  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Svindelvurdering</h2>

      <div className="flex justify-between">
        <span>Score</span>
        <span className={color}>{score}</span>
      </div>

      <div className="flex justify-between">
        <span>Nivå</span>
        <span className={color}>{level}</span>
      </div>

      {reason && (
        <div className="pt-2">
          <p className="text-sm text-gray-600">{reason}</p>
        </div>
      )}
    </section>
  );
}
