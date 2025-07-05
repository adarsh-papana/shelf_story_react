import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import "../style/UpdateStockModal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const UpdateStockModal = ({ bookId, onClose, onStockUpdated }) => {
  const [bookTitle, setBookTitle] = useState(""); // State to store the book title
  const [quantity, setQuantity] = useState(""); // State for the updated stock quantity

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await AxiosInstance.get(
          `/BookManagement/${bookId}`
        ); // Replace with your API endpoint
        setBookTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching books:", error);
        // alert('Error fetching books. Please try again.');
        toast.error("Error fetching books. Please try again."); // Show error message using toast
      }
    };

    fetchBooks();
  }, [bookId]);

  const handleSubmit = async () => {
    try {
      await AxiosInstance.post(
        `/Inventory/add-stock?bookId=${bookId}&quantity=${quantity}`
      );
      // if (response.data.success === true) {
      // alert('Stock updated successfully!');
      toast.success("Stock updated successfully!"); // Show success message using toast
      onStockUpdated(); // refresh list
      onClose(); // close modal
    } catch (error) {
      console.error("Error updating stock:", error);
      // alert('Error updating stock.');
      toast.error("Error updating stock."); // Show error message using toast
    }
  };

  return (
    <div className="stock-modal">
      <div className="stock-modal-content">
        <h2>Add Stock</h2>
        <p>
          {" "}
          Add Stock for <strong>{bookTitle}</strong> book:
        </p>
        <form>
          <div className="stock-form-group">
            <label>Add Stock Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter Updated Stock Quantity"
              min="0"
              required
            />
          </div>
          <div className="stock-modal-actions">
            <button type="button" onClick={handleSubmit}>
              Update Stock
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
