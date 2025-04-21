import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateStockModal.css';
 
const UpdateStockModal = ({ bookId, onClose, onStockUpdated }) => {
  // const [books, setBooks] = useState([]); // List of books
  // const [selectedBookId, setSelectedBookId] = useState(''); // Selected Book ID
  // const [quantity, setQuantity] = useState(''); // Quantity to update
  // const [searchTitle, setSearchTitle] = useState(''); // Search input for book title
  // const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for dropdown

  const [bookTitle, setBookTitle] = useState(''); // State to store the book title
  const [quantity, setQuantity] = useState(''); // State for the updated stock quantity
 
  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5296/api/BookManagement/${bookId}`); // Replace with your API endpoint
        setBookTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error fetching books. Please try again.');
      }
    };

    fetchBooks();
  }, [bookId]);

  // Handle title search input
  // const handleTitleChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTitle(value);

    // Filter books based on the input
  //   const filtered = books.filter((book) =>
  //     book.title.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredBooks(filtered);
  // };

  // Handle selecting a book from the dropdown
  // const handleSelectBook = (book) => {
  //   setSearchTitle(book.title); // Set the selected book title
  //   setSelectedBookId(book.bookID); // Auto-fill the Book ID
  //   setFilteredBooks([]); // Clear the dropdown
  // };
  
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5296/api/Inventory/add-stock?bookId=${bookId}&quantity=${quantity}`);
      // if (response.data.success === true) {
        alert('Stock updated successfully!');
        onStockUpdated(); // refresh list
        onClose(); // close modal
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error updating stock.');
    }
  };
 
  return (
    <div className="stock-modal">
      <div className="stock-modal-content">
      <h2>Add Stock</h2>
      <p> Add Stock for <strong>{bookTitle}</strong> book:</p>
        <form>
          <div className="stock-form-group">
            <label>Updated Stock Quantity:</label>
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