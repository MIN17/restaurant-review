import Autocomplete from "react-google-autocomplete";

interface RestaurantNameProp {
  name: string;
  address: string;
  setReview: (
    prevReview: SetStateAction<{
      name: string;
      address: string;
      rating: number;
      review: string;
    }>
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// restaurant name portion of the input form in the AddReview page
export const RestaurantName = ({
  name,
  setReview,
  handleChange,
}: RestaurantNameProp) => {
  return (
    <div className="mb-4 w-full">
      <label>
        <span>Name: </span>
        {/* <Autocomplete
          name="name"
          value={name}
          type="text"
          onChange={handleChange}
          className="flex h-9 w-[95%] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={" Enter a restaurant"}
          apiKey={import.meta.env.VITE_API_KEY}
          onPlaceSelected={(place) => {
            setReview((prevReview) => ({
              ...prevReview,
              name: `${place.name}`,
              address: `${place.formatted_address}`,
            }));
          }}
          options={{
            bounds: {
              north: 39.329176,
              south: 38.740351,
              west: -77.423254,
              east: -76.56632,
            },
            types: ["establishment"],
            componentRestrictions: { country: "us" },
            fields: ["name", "formatted_address"],
            strictBounds: true,
          }}
        /> */}
        <input
          name="name"
          value={name}
          type="text"
          onChange={handleChange}
          className="flex h-9 w-[95%] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={" Enter a restaurant"}
        />
      </label>
    </div>
  );
};
