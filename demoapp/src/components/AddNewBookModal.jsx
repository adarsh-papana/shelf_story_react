import React, { useState } from "react";
// import axios from "axios";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "../style/AddNewBookModal.css"; // Create and style this CSS file

const AddNewBookModal = ({ onClose, onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    categoryID: "",
    price: "",
    stockQuantity: "",
    imageURL: "",
    author: {
      authorName: "",
    },
    category: {
      categoryID: "",
      categoryName: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "categoryID") {
      setFormData((prev) => ({
        ...prev,
        categoryID: value,
        category: { ...prev.category, categoryID: value },
      }));
    } else if (name.startsWith("author.")) {
      const field = name.split(".")[1]; // Extract the nested field name
      setFormData((prev) => ({
        ...prev,
        author: { ...prev.author, [field]: value },
      }));
    } else if (name.startsWith("category.")) {
      const field = name.split(".")[1]; // Extract the nested field name
      setFormData((prev) => ({
        ...prev,
        category: { ...prev.category, [field]: value },
      }));
    } else {
      // Handle top-level fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.title,
        categoryID: formData.categoryID,
        price: parseFloat(formData.price),
        stockQuantity: formData.stockQuantity,
        imageURL: formData.imageURL,
        author: {
          authorName: formData.author.authorName,
        },
        category: {
          categoryID: formData.category.categoryID,
          categoryName: formData.category.categoryName,
        },
      };

      await AxiosInstance.post(`/BookManagement`, payload);
      // alert('New book added successfully!');
      toast.success("New book added successfully!");
      onBookAdded(); // Refresh inventory list
      onClose();
    } catch (error) {
      console.error("Error adding book:", error);
      // alert('Error adding book. Check the inputs.');
      toast.error("Error adding book. Check the inputs.");
    }
  };

  return (
    <div className="book-modal">
      <div className="book-modal-content">
        <h3>Add New Book</h3>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category ID:
            <input
              type="text"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Stock Quantity:
            <input
              type="text"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </label>
          <label>
            Author Name:
            <input
              type="text"
              name="author.authorName"
              value={formData.author.authorName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category ID (Nested):
            <input
              type="text"
              name="category.categoryID"
              value={formData.category.categoryID}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category Name:
            <input
              type="text"
              name="category.categoryName"
              value={formData.category.categoryName}
              onChange={handleChange}
              required
            />
          </label>

          <div className="book-modal-actions">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        {/* {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            style={{ marginBottom: '8px' }}
          />
          ))}
        <button onClick={handleSubmit}>Add Book</button>
        <button onClick={onClose}>Cancel</button> */}
      </div>
    </div>
  );
};

export default AddNewBookModal;
