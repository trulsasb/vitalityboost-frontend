interface ProductIconProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function ProductIcon({ icon, label, className = "" }: ProductIconProps) {
  return (
    <div className={`flex items-center gap-2 text-sm text-gray-700 ${className}`}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
