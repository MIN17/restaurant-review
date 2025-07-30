import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

interface Review {
  id: number;
  name: string;
  address: string;
  rating: number;
  review: string;
}

// configure url path based on environment
const isProduction = import.meta.env.PROD;
const baseUrl: string = isProduction
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

export const ViewReviews = () => {
  const [tableData, setTableData] = useState<Review[]>([]);

  useEffect(() => {
    getReviews();
  }, []);

  // get reviews from the database
  async function getReviews() {
    const response = await axios.get(`${baseUrl}`);
    const data = response.data;
    setTableData(data);
  }

  // TODO: on click => open edit wizard
  async function editReviews(review?: Review) {
    await axios.post(`${baseUrl}/editReviews`, {
      data: {
        review,
      },
    });
  }

  // delete a single or multiple reviews
  async function deleteReviews(review?: Review) {
    await axios.delete(`${baseUrl}/deleteReviews`, {
      data: {
        review,
      },
    });

    // if a specific review is passed in, delete that review.
    // if not, delete all reviews.
    setTableData((prevData) => {
      if (review) {
        const newData = prevData.slice().filter((row) => row !== review);
        return newData;
      } else {
        return [];
      }
    });
  }

  // list of reviews
  const reviews = tableData.map((row, idx) => {
    // generate the list of stars (ratings)
    const stars = [];

    for (let i = 0; i < row.rating; i++) {
      stars.push(<span key={i + 1}>&#9733;</span>);
    }

    return (
      <div
        key={`row-${idx}`}
        className="p-2 mb-2 lg:mb-0 border-solid border-[0.05rem] rounded-lg border-green-500"
      >
        <div className="flex justify-between">
          <span>{row.name}</span>
          <span className="flex items-center">
            <div className="ml-2 mr-2 text-amber-300">{stars}</div>
            <div className="flex text-right">
              <BsPencilSquare
                className="cursor-pointer align-middle"
                key={`edit-${idx}`}
                onClick={() => editReviews(row)}
              />
              <BsFillTrashFill
                className=" cursor-pointer align-middle text-red-400"
                key={`delete-${idx}`}
                onClick={() => deleteReviews(row)}
              />
            </div>
          </span>
        </div>
        <div className="mb-4 italic text-gray-500">{row.address}</div>
        <div className="">{row.review}</div>
      </div>
    );
  });

  return (
    <>
      <title>View Reviews</title>
      <div className="flex h-full desktop:h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold">Reviews</h1>
        <div
          className={`
					mb-7 w-10/12 md:w-1/2 xl:w-5/12 overflow-y-auto max-h-[25rem]	
				`}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-4">{reviews}</div>
        </div>
        <Button
          className={`
						bg-red-500 text-primary-foreground 
					`}
          handleClick={() => deleteReviews()}
          value="Delete All Reviews"
        />
        <Button value="Home" link="/" />
      </div>
    </>
  );
};
