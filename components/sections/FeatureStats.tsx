interface FeatureStat {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

interface FeatureStatsProps {
  heading?: string;
  subheading?: string;
  stats: FeatureStat[];
  className?: string;
}

export function FeatureStats({
  heading,
  subheading,
  stats,
  className = "",
}: FeatureStatsProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-5xl">

        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              {stat.icon && (
                <div className="flex justify-center mb-4 text-gray-700">
                  {stat.icon}
                </div>
              )}

              <div className="text-4xl font-bold text-gray-900">
                {stat.value}
              </div>

              <div className="mt-2 text-gray-700 font-medium">
                {stat.label}
              </div>

              {stat.description && (
                <p className="mt-2 text-gray-600 text-sm max-w-xs mx-auto">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
