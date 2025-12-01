import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components";
import { EditModal } from "./components";
import { BASE_URL } from "@/utils/api";

// icons
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

interface Review {
  id: number;
  name: string;
  address: string;
  rating: number;
  review: string;
}

// View Reviews component
export default function ViewReviews() {
  const [tableData, setTableData] = useState<Review[]>([]);

  // states for the edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<ModalFormData>({
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
    const response = await axios.get(`${BASE_URL}`);
    const data = response.data;
    setTableData(data);
  }

  // delete a single or multiple reviews
  async function deleteReviews(id?: Review["id"]) {
    await axios.delete(`${BASE_URL}/deleteReviews`, {
      data: {
        id,
      },
    });

    // if a specific review is passed in, delete that review.
    // if not, delete all reviews.
    setTableData((prevData) => {
      if (id) {
        const newData = prevData.slice().filter((row) => row.id !== id);
        return newData;
      } else {
        return [];
      }
    });
  }

  // -- HANDLE EDIT MODAL --

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
    >,
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
      await axios.put(`${BASE_URL}/updateReview`, {
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
            : review,
        ),
      );

      handleCancel();
    } catch (error) {
      console.error("Error updating review: ", error);
      alert("Failed to update review. Please try again.");
    }
  };

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
          className="p-2 mb-2 border-solid border-[0.05rem] rounded-lg border-green-500"
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
                  onClick={() => deleteReviews(row.id)}
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
          <div className="">{reviews}</div>
        </div>
        <Button
          className={`
						bg-red-500 text-primary-foreground
					`}
          handleClick={() => deleteReviews()}
          value="Delete All Reviews"
        />
        <Button value="Home" link="/" />
        <EditModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          formData={formData}
          handleInputChange={handleInputChange}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
}
