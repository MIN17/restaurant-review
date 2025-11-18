import { useState } from "react";
import {
  PlaceDetails,
  PlacePrediction,
  usePlacesAutocomplete,
} from "places-autocomplete-hook";
import { LuMapPin } from "react-icons/lu";

interface RestaurantNameProp {
  name: string;
  setReview: (
    prevReview: SetStateAction<{
      name: string;
      address: string;
      rating: number;
      review: string;
    }>,
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// restaurant name portion of the input form in the AddReview page
export default function RestaurantName({
  name,
  setReview,
  handleChange,
}: RestaurantNameProp) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Place Autocomplete API
  // source: https://github.com/gstrobl/places-autocomplete-hook/tree/main?tab=readme-ov-file
  const { setValue, suggestions, loading, error, getPlaceDetails } =
    usePlacesAutocomplete({
      apiKey: import.meta.env.VITE_API_KEY,
      includedPrimaryTypes: ["food"],
      includedRegionCodes: ["US"],
      // location: {
      //   lat: 39.13,
      //   lng: -77.38,
      //   radius: 50000,
      // },
    });

  // update review state as the user types
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setValue(e.target.value);
    setIsDropdownOpen(true);
  };

  // handler for clicking on a suggestion
  const handlePlaceSelect = async (suggestion: PlacePrediction) => {
    const details: PlaceDetails = await getPlaceDetails(suggestion.placeId);
    setIsDropdownOpen(false);
    setReview((prev) => ({
      ...prev,
      name: `${suggestion?.structuredFormat?.mainText?.text}`,
      address: `${details.formattedAddress}`,
    }));
  };

  return (
    <div className="mb-4 w-full relative">
      <span>Name: </span>
      <input
        name="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter an restaurant"
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {isDropdownOpen &&
        suggestions.status === "OK" &&
        suggestions.data.length > 0 && (
          <div className="absolute bg-white w-full border border-gray-200 rounded-xl">
            {suggestions.data.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePlaceSelect(suggestion)}
                className=" w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
              >
                <LuMapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium text-sm">
                    {suggestion.structuredFormat?.mainText?.text}
                  </div>
                  <div className="text-sm text-gray-500">
                    {suggestion.structuredFormat?.secondaryText?.text}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}

// restaurant name portion of the input form in the AddReview page
// export const RestaurantName = ({
//   name,
//   setReview,
//   handleChange,
// }: RestaurantNameProp) => {

//   return (
//     <div className="mb-4 w-full">
//       <label>
//         <span>Name: </span>

//         <input
//           name="name"
//           value={name}
//           type="text"
//           onChange={handleChange}
//           className="flex h-9 w-[95%] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
//           placeholder={" Enter a restaurant"}
//         />
//       </label>
//     </div>
//   );
// };
