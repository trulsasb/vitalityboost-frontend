interface ProductReviewProps {
  author: string;
  rating: number;
  text: string;
  className?: string;
}

export function ProductReview({ author, rating, text, className = "" }: ProductReviewProps) {
  return (
    <div className={`space-y-1 border-b pb-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{author}</span>
        <span className="text-yellow-500">{Array.from({ length: rating }).map(() => "★")}</span>
      </div>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

