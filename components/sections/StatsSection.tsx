interface StatItem {
  label: string;
  value: string | number;
  hidden?: boolean;
}

interface StatsSectionProps {
  heading?: string;
  subheading?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  fieldPrefix?: string;
}

export function StatsSection({
  heading,
  subheading,
  stats,
  columns = 3,
  className = "",
  fieldPrefix,
}: StatsSectionProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-4",
  };

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        
        {heading && (
          <h2 className="text-3xl font-bold text-gray-900">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        <div className={`mt-12 grid gap-10 ${gridCols[columns]}`}>
          {stats.map((stat, i) => {
            if (stat.hidden) return null;
            return (
              <div key={i} data-field={fieldPrefix ? `${fieldPrefix}.${i}` : undefined}>
                <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="mt-2 text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

