import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Save } from "react-feather";
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

// View Reviews component
export const ViewReviews = () => {
  const [tableData, setTableData] = useState<Review[]>([]);

  // states for the edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rating: 0,
    review: "",
  });

  useEffect(() => {
    getReviews();
  }, []);

  // update modal wizard form data when editingReview changes
  useEffect(() => {
    if (editingReview) {
      setFormData({
        name: editingReview.name,
        address: editingReview.address,
        rating: editingReview.rating,
        review: editingReview.review,
      });
    }
  }, [editingReview]);

  // get reviews from the database
  async function getReviews() {
    const response = await axios.get(`${baseUrl}`);
    const data = response.data;
    setTableData(data);
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

  // open the editing wizard modal
  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setModalOpen(true);
  };

  // close modal and reset form
  const handleCancel = () => {
    setModalOpen(false);
    setEditingReview(null);
    setFormData({ name: "", address: "", rating: 0, review: "" });
  };

  // handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) || 0 : value,
    }));
  };

  // update the review in the database
  const handleUpdate = async () => {
    if (!editingReview) {
      return;
    }

    if (!formData.review.trim()) {
      alert("Please fill in the review field");
      return;
    }

    try {
      await axios.put(`${baseUrl}/updateReview`, {
        id: editingReview.id,
        rating: formData.rating,
        review: formData.review,
      });

      setTableData((prevData) =>
        prevData.map((review) =>
          review.id === editingReview.id
            ? {
                ...review,
                rating: formData.rating,
                review: formData.review,
              }
            : review
        )
      );

      handleCancel();
    } catch (error) {
      console.error("Error updating review: ", error);
      alert("Failed to update review. Please try again.");
    }
  };

  // code for edit wizard modal
  const editModal = (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className=" my-4 w-11/12">
        <span className="text-lg font-black text-gray-800">Edit Review</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            disabled
            type="text"
            name="name"
            value={formData.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            disabled
            type="text"
            name="address"
            value={formData.address}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (1-5)
          </label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={0}>Select rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
          >
            <Save size={16} />
            Update
          </button>
        </div>
      </div>
    </Modal>
  );

  // list of reviews
  let reviews: any = [];

  // tableData can turn into an HTML in production for some reason,
  // so this array check is needed
  if (Array.isArray(tableData)) {
    reviews = tableData.map((row, idx) => {
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
                  onClick={() => handleEdit(row)}
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
  }

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
        <div>{editModal}</div>
      </div>
    </>
  );
};
