interface PageSectionHeaderProps {
  title: string;
  className?: string;
}

export function PageSectionHeader({ title, className = "" }: PageSectionHeaderProps) {
  return (
    <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${className}`}>
      {title}
    </h2>
  );
}
