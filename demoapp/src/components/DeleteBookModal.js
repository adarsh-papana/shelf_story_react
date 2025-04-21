import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/DeleteBookModal.css";

const DeleteBookModal = ({ onClose, onBookDeleted }) => {
  const [books, setBooks] = useState([]); // List of books
  const [searchTitle, setSearchTitle] = useState(""); // Search input for book title
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for dropdown
  const [selectedBookId, setSelectedBookId] = useState(null); // Selected Book ID

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://localhost:7274/api/BookManagement`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Error fetching books. Please try again.");
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
      alert("Please select a book to delete.");
      return;
    }

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this book?");
      if (!confirmDelete) return;

      await axios.delete(`https://localhost:7274/api/BookManagement/${selectedBookId}`);
      alert("Book deleted successfully!");
      onBookDeleted(); // Refresh the inventory list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    }
  };

  return (
    <div className="delete-book-modal">
      <div className="delete-book-modal-content">
        <h2>Delete Book</h2>
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
    </div>
  );
};

export default DeleteBookModal;