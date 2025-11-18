interface StarProps {
  isFilled: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function Star(props: StarProps) {
  const { isFilled, handleClick } = props;

  const star = isFilled ? <span>&#9733;</span> : <span>&#9734;</span>;

  return (
    <span
      className="cursor-pointer text-2xl text-amber-300"
      onClick={handleClick}
    >
      {star}
    </span>
  );
}

interface StarRatingProps {
  rating: number;
  toggle: (id: number) => void;
}

// restaurant rating portion of the input form in the AddReview page
export default function StarRating({ rating, toggle }: StarRatingProps) {
  const STARS = [1, 2, 3, 4, 5]; // array of star id's
  const starRatings = STARS.map((starId) => {
    const isFilled = starId <= rating;

    return (
      <Star
        key={starId}
        isFilled={isFilled}
        handleClick={() => toggle(starId)}
      />
    );
  });

  return (
    <div className="mb-4 flex items-center">
      <span>Rating:</span>
      <span className="flex justify-center ">{starRatings}</span>
    </div>
  );
}
