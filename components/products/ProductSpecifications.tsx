interface ProductSpecificationsProps {
  specs: Record<string, string | number>;
  className?: string;
}

export function ProductSpecifications({ specs, className = "" }: ProductSpecificationsProps) {
  if (!specs || Object.keys(specs).length === 0) {
    return <p className={`text-sm text-gray-500 ${className}`}>Ingen spesifikasjoner tilgjengelig</p>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm text-gray-700">
          <span className="font-medium">{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
