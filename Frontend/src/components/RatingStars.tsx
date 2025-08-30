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
          <Star key={`full-${idx}`} className="w-4 h-4 text-yellow-400 fill-yellow-400 "   />
        ))}

      {/* {halfStar && <Star key="half" className="w-4 h-4 text-yellow-200 " />} */}
      {halfStar && (
        <div key="half" className="relative w-4 h-4">
          {/* empty star outline */}
          <Star className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" />
          {/* half-filled star */}
          <div className="absolute top-0 left-0 h-full overflow-hidden text-yellow-400" style={{ width: "50%" }}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"  />
          </div>
        </div>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, idx) => (
          <Star key={`empty-${idx}`} className="w-4 h-4 text-gray-300" />
        ))}
      <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}/5.0</span>
    </div>
  );
};

export default RatingStars;
