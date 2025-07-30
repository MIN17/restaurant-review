import { Star } from "./Star";
import { stars } from "./Stars";

interface RestaurantRatingProps {
  rating: number;
  toggle: (id: number) => void;
}

// restaurant rating portion of the input form in the AddReview page
export const RestaurantRating = ({ rating, toggle }: RestaurantRatingProps) => {
  const starRatings = stars.slice().map((star) => {
    const isFilled = star.id <= rating;

    return (
      <Star
        key={star.id}
        isFilled={isFilled}
        handleClick={() => toggle(star.id)}
      />
    );
  });

  return (
    <div className="mb-4 flex items-center">
      <span>Rating:</span>
      <span className="flex justify-center ">{starRatings}</span>
    </div>
  );
};
