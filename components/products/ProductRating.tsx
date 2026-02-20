interface ProductRatingProps {
  rating: number; // 0–5
  className?: string;
}

export function ProductRating({ rating, className = "" }: ProductRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars.map((filled, i) => (
        <span key={i} className={filled ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}
