interface ProductDescriptionProps {
  text: string;
  className?: string;
}

export function ProductDescription({ text, className = "" }: ProductDescriptionProps) {
  return (
    <p className={`text-gray-700 leading-relaxed ${className}`}>
      {text}
    </p>
  );
}
