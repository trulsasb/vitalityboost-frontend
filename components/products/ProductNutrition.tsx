interface ProductNutritionProps {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  className?: string;
}

export function ProductNutrition({
  calories,
  protein,
  carbs,
  fat,
  className = "",
}: ProductNutritionProps) {
  return (
    <div className={`text-sm text-gray-700 space-y-1 ${className}`}>
      {calories !== undefined && <p>Kalorier: {calories}</p>}
      {protein !== undefined && <p>Protein: {protein} g</p>}
      {carbs !== undefined && <p>Karbohydrater: {carbs} g</p>}
      {fat !== undefined && <p>Fett: {fat} g</p>}
    </div>
  );
}
