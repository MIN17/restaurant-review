interface ReviewInputProps {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  review: string;
}

// review portion of the input form in the AddReview page
export default function ReviewInput(props: ReviewInputProps) {
  const { handleChange, review } = props;

  return (
    <div className="mb-4">
      <label>
        Review: <br />
        <textarea
          className="flex min-h-[10rem] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={review}
          name="review"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
