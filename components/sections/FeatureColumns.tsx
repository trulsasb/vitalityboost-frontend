interface FeatureColumn {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureColumnsProps {
  heading?: string;
  subheading?: string;
  columns: FeatureColumn[];
  className?: string;
}

export function FeatureColumns({
  heading,
  subheading,
  columns,
  className = "",
}: FeatureColumnsProps) {
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
          {columns.map((col, i) => (
            <div key={i} className="text-center">
              {col.icon && (
                <div className="flex justify-center mb-4 text-gray-700">
                  {col.icon}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900">
                {col.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm max-w-xs mx-auto">
                {col.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
