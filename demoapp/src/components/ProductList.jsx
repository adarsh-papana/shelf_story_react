import React, { useState } from "react";
import "./../style/ProductList.css"; // Make sure to create and import this CSS file
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import Modal from "./LoginModal"; // Import the Modal component

function ProductList({ products, fetchCart, setFilteredProducts, setProducts ,userId }) {
  // const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleProductClick = (product) => {
    navigate(`/book-details/${product.bookID}`, { state: { product } });
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the product div
    addProductToCart(product);
  };

  const addProductToCart = async (product) => {
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      setModalMessage("You must be logged in to add items to the cart.");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await AxiosInstance.post(`/Cart/add-item-to-cart/${userId}`, {
        bookID: product.bookID,
        price: product.price,
        quantity: 1,
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product.bookID} onClick={() => handleProductClick(product)} style={{ cursor: "pointer" }}>
          <img className="product-image" src={product.imageURL} alt={product.title} />
          <div className="product-info">
            <h4 className="product-name">{product.title}</h4>
            <p className="product-author">Author: {product.author.authorName}</p>
            <p className="product-category">Category: {product.category.categoryName}</p>
            <span className="product-price">₹{product.price}</span>
          </div>
          <div className="button">
            <button className="btnss" onClick={(event) => handleAddToCartClick(event, product)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} message={modalMessage} />
    </div>
  );
}

export default ProductList;