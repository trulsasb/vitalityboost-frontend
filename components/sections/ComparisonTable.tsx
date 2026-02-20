interface ComparisonFeature {
  label: string;
  values: (string | React.ReactNode)[];
}

interface ComparisonTableProps {
  heading?: string;
  subheading?: string;
  columns: string[];
  features: ComparisonFeature[];
  className?: string;
}

export function ComparisonTable({
  heading,
  subheading,
  columns,
  features,
  className = "",
}: ComparisonTableProps) {
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

        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-gray-900 font-semibold">
                  Funksjon
                </th>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="text-left py-3 px-4 text-gray-900 font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {feature.label}
                  </td>

                  {feature.values.map((val, idx) => (
                    <td key={idx} className="py-3 px-4 text-gray-600">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
