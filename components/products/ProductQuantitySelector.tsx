interface ProductQuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ProductQuantitySelector({
  value,
  onChange,
  className = "",
}: ProductQuantitySelectorProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="rounded bg-gray-200 px-3 py-1 text-sm"
      >
        -
      </button>

      <span className="text-sm font-medium">{value}</span>

      <button
        onClick={() => onChange(value + 1)}
        className="rounded bg-gray-200 px-3 py-1 text-sm"
      >
        +
      </button>
    </div>
  );
}
