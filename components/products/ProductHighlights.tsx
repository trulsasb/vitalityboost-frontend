interface ProductHighlightsProps {
  highlights: string[];
  className?: string;
}

export function ProductHighlights({ highlights, className = "" }: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <ul className={`list-disc pl-5 space-y-1 text-sm text-gray-700 ${className}`}>
      {highlights.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
