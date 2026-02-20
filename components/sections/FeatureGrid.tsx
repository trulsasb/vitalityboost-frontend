interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  heading?: string;
  subheading?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({
  heading,
  subheading,
  features,
  columns = 3,
  className = "",
}: FeatureGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-4",
  };

  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-4">
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

        <div className={`mt-12 grid gap-10 ${gridCols[columns]}`}>
          {features.map((feature, i) => (
            <div key={i} className="text-center">
              {feature.icon && (
                <div className="flex justify-center mb-4 text-gray-700">
                  {feature.icon}
                </div>
              )}

              <h3 classname="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
