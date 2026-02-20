interface Review {
  author: string;
  rating: number;
  text: string;
}

interface ProductReviewListProps {
  reviews: Review[];
  className?: string;
}

export function ProductReviewList({ reviews, className = "" }: ProductReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={`text-sm text-gray-500 ${className}`}>Ingen anmeldelser ennå</p>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {reviews.map((review, i) => (
        <div key={i} className="space-y-1 border-b pb-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">{review.author}</span>
            <span className="text-yellow-500">
              {Array.from({ length: review.rating }).map(() => "★")}
            </span>
          </div>
          <p className="text-sm text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
