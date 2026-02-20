interface ProductTableProps {
  rows: {
    label: string;
    value: string | number;
  }[];
  className?: string;
}

export function ProductTable({ rows, className = "" }: ProductTableProps) {
  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <table className={`w-full text-sm text-gray-700 ${className}`}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b">
            <td className="py-2 font-medium text-gray-900">{row.label}</td>
            <td className="py-2 text-right">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
