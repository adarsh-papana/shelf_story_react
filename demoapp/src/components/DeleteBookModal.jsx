import React, { useState, useEffect } from "react";
// import axios from "axios";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "../style/DeleteBookModal.css";
import ConfirmationModal from "./ConfirmationModal";

const DeleteBookModal = ({ onClose, onBookDeleted }) => {
  const [books, setBooks] = useState([]); // List of books
  const [searchTitle, setSearchTitle] = useState(""); // Search input for book title
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for dropdown
  const [selectedBookId, setSelectedBookId] = useState(null); // Selected Book ID
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation modal

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await AxiosInstance.get(`/BookManagement`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        // alert("Error fetching books. Please try again.");
        toast.error("Error fetching books. Please try again."); // Show error message using toast
      }
    };

    fetchBooks();
  }, []);

  // Handle title search input
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setSearchTitle(value);

    // Filter books based on the input
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Handle selecting a book from the dropdown
  const handleSelectBook = (book) => {
    setSearchTitle(book.title); // Set the selected book title
    setSelectedBookId(book.bookID); // Auto-fill the Book ID
    setFilteredBooks([]); // Clear the dropdown
  };

  // Handle delete book
  const handleDeleteBook = async () => {
    if (!selectedBookId) {
      // alert("Please select a book to delete.");
      toast.error("Please select a book to delete."); // Show error message using toast
      return;
    }
    setShowConfirmation(true); // Show confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await AxiosInstance.delete(`/BookManagement/${selectedBookId}`);
      // alert("Book deleted successfully!");
      toast.success("Book deleted successfully!");
      onBookDeleted(); // Refresh the inventory list
      setShowConfirmation(false); // Close confirmation modal

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting book:", error);
      // alert("Failed to delete book. Please try again.");
      toast.error("Failed to delete book. Please try again.");
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <div className="delete-book-modal">
      <div className="delete-book-modal-content">
        <h2 className="heading-delete">Delete Book</h2>
        <div className="delete-book-form-group">
          <label>Search Book Title:</label>
          <input
            type="text"
            value={searchTitle}
            onChange={handleTitleChange}
            placeholder="Enter book title"
          />
          {filteredBooks.length > 0 && (
            <ul className="delete-dropdown">
              {filteredBooks.map((book) => (
                <li key={book.bookID} onClick={() => handleSelectBook(book)}>
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="delete-book-modal-actions">
          <button type="button" onClick={handleDeleteBook}>
            Delete Book
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this book?"
          onConfirm={confirmDelete} // Confirm delete action
          onCancel={cancelDelete} // Cancel delete action
        />
      )}
    </div>
  );
};

export default DeleteBookModal;
