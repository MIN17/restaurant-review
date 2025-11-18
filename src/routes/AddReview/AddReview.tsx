import { useState } from "react";
import axios from "axios";
import { RestaurantName, StarRating, ReviewInput } from "./components";
import { Button } from "@/components";
import { BASE_URL } from "@/utils/api";

// handle adding review
export default function AddReview() {
  const [review, setReview] = useState({
    name: "",
    address: "",
    rating: 0,
    review: "",
  });

  // handle clicking of star ratings in the input form
  function toggle(id: number) {
    // if same rating is clicked, make it 0
    const newRating = review.rating === id ? 0 : id;

    setReview((prevReview) => {
      return {
        ...prevReview,
        rating: newRating,
      };
    });
  }

  // update form data based on user input
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    event.preventDefault();
    const { name, value } = event.target;

    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

  // insert the review into the database
  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await axios.post(`${BASE_URL}/addReview`, {
      name: review.name,
      address: review.address,
      rating: review.rating,
      review: review.review,
    });

    // reset all form values to initial state
    setReview({
      name: "",
      address: "",
      rating: 0,
      review: "",
    });
  }

  return (
    <>
      <title>Add Review</title>
      <div className="flex h-full desktop:h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Add Review</h1>
        <form className="w-4/6 md:w-1/2 lg:w-2/5" onSubmit={submitReview}>
          <RestaurantName
            name={review.name}
            setReview={setReview}
            handleChange={handleChange}
          />
          <StarRating rating={review.rating} toggle={toggle} />
          <ReviewInput review={review.review} handleChange={handleChange} />
          <Button value="Submit a review" type="submit" />
          <hr className="m-0 mb-4" />
          <Button value="Home" link="/" />
        </form>
      </div>
    </>
  );
}
