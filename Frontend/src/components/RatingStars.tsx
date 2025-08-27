import { Star } from "lucide-react";

type RatingProps = {
  rating: number; // e.g., 4.8
  maxRating?: number; // default 5
};

const RatingStars = ({ rating, maxRating = 5 }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_, idx) => (
          <Star key={`full-${idx}`} className="w-4 h-4 text-yellow-400" />
        ))}

      {halfStar && <Star key="half" className="w-4 h-4 text-yellow-200" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, idx) => (
          <Star key={`empty-${idx}`} className="w-4 h-4 text-gray-300" />
        ))}
      <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
