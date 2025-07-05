import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import AxiosInstance from "../AxiosInstance";
import "../style/AddInventoryPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const AddInventoryPage = ({ onClose, onInventoryAdded }) => {
  const [inventoryData, setInventoryData] = useState({
    bookID: "",
    quantity: "",
    notifyLimit: "",
  });

  const [books, setBooks] = useState([]); // State to store the list of books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered book titles
  const [searchTitle, setSearchTitle] = useState(""); // State for the book title input
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await AxiosInstance.get(
          `/BookManagement`
        ); // Replace with your API endpoint
        setBooks(response.data);
        console.log("Books fetched:", response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in the book title input
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
    setInventoryData((prev) => ({
      ...prev,
      bookID: book.bookID, // Auto-fill the bookID
    }));
    setFilteredBooks([]); // Clear the dropdown
  };

  // Hide dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredBooks([]); // Hide the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        bookID: parseInt(inventoryData.bookID),
        quantity: parseInt(inventoryData.quantity),
        notifyLimit: parseInt(inventoryData.notifyLimit),
      };

      // Send data to the backend
      await AxiosInstance.post(`/Inventory`, payload);
      // setSuccessMessage("Inventory added successfully!");

      // Notify parent component about the successful addition
      toast.success("Inventory added successfully!"); // Show success message using toast
      onInventoryAdded();
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error("Error adding inventory. Please try again."); // Show error message using toast
      onInventoryAdded();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Inventory</h2>
        <form>
          <div className="form-group">
            <label>Book Title:</label>
            <input
              type="text"
              value={searchTitle}
              onChange={handleTitleChange}
              placeholder="Enter Book Title"
            />
            {filteredBooks.length > 0 && (
              <ul className="books-dropdown">
                {filteredBooks.map((book) => (
                  <li key={book.bookID} onClick={() => handleSelectBook(book)}>
                    {book.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Book ID:</label>
            <input
              type="number"
              name="bookID"
              value={inventoryData.bookID}
              onChange={handleChange}
              placeholder="Book ID"
              readOnly // Make this field read-only since it's auto-filled
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={inventoryData.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Notify Limit:</label>
            <input
              type="number"
              name="notifyLimit"
              value={inventoryData.notifyLimit}
              onChange={handleChange}
              placeholder="Enter Notify Limit"
              min="0"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleSubmit}>
              Submit
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

export default AddInventoryPage;
