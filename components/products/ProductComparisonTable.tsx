interface ComparisonItem {
  label: string;
  values: (string | number)[];
}

interface ProductComparisonTableProps {
  headers: string[];
  rows: ComparisonItem[];
  className?: string;
}

export function ProductComparisonTable({
  headers,
  rows,
  className = "",
}: ProductComparisonTableProps) {
  return (
    <table className={`w-full text-sm text-gray-700 ${className}`}>
      <thead>
        <tr>
          <th className="py-2 text-left font-semibold text-gray-900">Egenskap</th>
          {headers.map((header, i) => (
            <th key={i} className="py-2 text-right font-semibold text-gray-900">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b">
            <td className="py-2 font-medium text-gray-900">{row.label}</td>
            {row.values.map((value, j) => (
              <td key={j} className="py-2 text-right">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
