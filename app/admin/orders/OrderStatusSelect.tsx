"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  { value: "pending", label: "Venter" },
  { value: "processing", label: "Behandles" },
  { value: "shipped", label: "Sendt" },
  { value: "completed", label: "Fullført" },
  { value: "cancelled", label: "Kansellert" },
];

export default function OrderStatusSelect({ value, onChange }: Props) {
  return (
    <select
      className="border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
