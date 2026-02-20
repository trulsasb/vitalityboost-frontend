interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureListProps {
  heading?: string;
  subheading?: string;
  items: FeatureItem[];
  className?: string;
}

export function FeatureList({
  heading,
  subheading,
  items,
  className = "",
}: FeatureListProps) {
  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        
        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center">
            {subheading}
          </p>
        )}

        <ul className="mt-10 space-y-8">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              {item.icon && (
                <div className="text-gray-700 mt-1">
                  {item.icon}
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
