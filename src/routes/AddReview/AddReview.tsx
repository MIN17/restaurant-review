import { useState } from "react";
import axios from "axios";
import "@/index.css";
import { RestaurantName } from "./components/RestaurantName";
import { RestaurantRating } from "./components/RestaurantRating";
import { RestaurantReview } from "./components/RestaurantReview";
import { Button } from "@/components/Button";

// configure url path based on environment
const isProduction = import.meta.env.PROD;
const baseUrl: string = isProduction
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

// handle adding review
export const AddReview = () => {
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

  // update restaurant name or review content based on user input
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    event.preventDefault();
    const { name, value } = event.target;

    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(review.name, review.address, review.rating, review.review);

    await axios.post(`${baseUrl}/addReview`, {
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
            address={review.address}
            setReview={setReview}
            handleChange={handleChange}
          />
          <RestaurantRating rating={review.rating} toggle={toggle} />
          <RestaurantReview
            review={review.review}
            handleChange={handleChange}
          />
          <Button value="Submit a review" type="submit" />
          {/* <SubmitButton /> */}
          <hr className="m-0 mb-4" />
          <Button value="Home" link="/" />
        </form>
      </div>
    </>
  );
};
