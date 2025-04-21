/*import React, { useState } from "react";
import inventoryService from "../services/inventoryService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddInventoryPage.css"; // Create and style this CSS file
 
// const AddInventoryPage = () => {
//   const navigate = useNavigate();
 
const AddInventoryPage = ({ onClose, onInventoryAdded }) => {
  const [inventoryData, setInventoryData] = useState({
    bookID: "",
    quantity: "",
    notifyLimit: "",
  });

  const [books, setBooks] = useState([]); // State to store the list of books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered book titles
  const [searchTitle, setSearchTitle] = useState(""); // State for the book title input
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = async () => {
    try {
      const payload = {
        bookID: parseInt(inventoryData.bookID),
        quantity: parseInt(inventoryData.quantity),
        notifyLimit: parseInt(inventoryData.notifyLimit),
      };
      // Send data to the backend
      await axios.post("http://localhost:5296/api/inventory", payload);

      // Navigate back to the inventory list page after successful submission
  //     navigate("/inventory");
  //   } catch (error) {
  //     console.error("Error adding inventory:", error);
  //   }
  // };

      onInventoryAdded();
      } catch (error) {
        console.error("Error adding inventory:", error);
      }
    };
 
  return (
    <div className="modal">
      <div className="modal-content">
      <h2>Add Inventory</h2>
      <form>
        <label>
          Book ID:
          <input
            type="number"
            name="bookID"
            value={inventoryData.bookID}
            onChange={handleChange}
            placeholder="Enter Book ID"
            min={0}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={inventoryData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            min={0}
            required
          />
        </label>
        <label>
          Notify Limit:
          <input
            type="number"
            name="notifyLimit"
            value={inventoryData.notifyLimit}
            onChange={handleChange}
            placeholder="Enter Notify Limit"
            min={0}
            required
          />
        </label>
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
 
export default AddInventoryPage;*/

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../style/AddInventoryPage.css";


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
        const response = await axios.get(`https://localhost:7274/api/BookManagement`); // Replace with your API endpoint
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
      await axios.post(`https://localhost:7274/api/Inventory`, payload);

      // Notify parent component about the successful addition
      onInventoryAdded();
    } catch (error) {
      console.error("Error adding inventory:", error);
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
                  <li
                    key={book.bookID}
                    onClick={() => handleSelectBook(book)}
                  >
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