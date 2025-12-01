import { Save } from "react-feather";
import { Modal } from "@/components";

interface EditModalProps {
  modalOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  formData: ModalFormData;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  handleCancel: () => void;
  handleUpdate: () => Promise<void>;
}

// edit modal dialog
export default function EditModal({
  modalOpen,
  setModalOpen,
  formData,
  handleInputChange,
  handleCancel,
  handleUpdate,
}: EditModalProps) {
  return (
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
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
          >
            <Save size={16} />
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
