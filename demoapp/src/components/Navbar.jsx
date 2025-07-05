import React, { useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import {
  FaHome,
  FaBoxOpen,
  FaUserAlt,
  FaSignOutAlt,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";
import SearchBar from "./Searchbar";
import logo from "../assets/LogowithoutText.png"; // Adjust the path to your logo
import "./../style/Navbar.css"; // Make sure to create and import this CSS file
import { useNavigate } from "react-router-dom";
import Modal from "./LoginModal"; // Import the Modal component

const Navbar = ({
  cartItems,
  setCartVisible,
  setCartItems,
  products,
  setFilteredProducts,
}) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login"); // Redirect to login on logout
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("You must be logged in to view your profile.");
      setIsModalOpen(true);
      return;
    }
    navigate("/profile");
  };

  const handleOrderHistoryClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("You must be logged in to view your order history.");
      setIsModalOpen(true);
      return;
    }
    navigate("/order-history");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const bookhandleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercasedTerm) ||
        product.author.authorName.toLowerCase().includes(lowercasedTerm) ||
        product.category.categoryName.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Logo"
          className="logo rounded-logo"
          onClick={() => {
            window.location.href = "/";
          }}
          style={{ cursor: "pointer" }}
        />
        <h2
          onClick={() => {
            window.location.href = "/";
          }}
          style={{ cursor: "pointer" }}
        >
          Shelf Story
        </h2>
      </div>
      <div className="navbar-center">
        <SearchBar onSearch={bookhandleSearch} />
      </div>
      <div className="navbar-right">
        <button onClick={() => (window.location.href = "/")}>
          <FaHome size={20} /> Home
        </button>
        <div className="profile-management">
          <button onClick={toggleDropdown}>
            <FaUserAlt size={20} /> Profile Management
          </button>
          {dropdownVisible && (
            <div className="dropdown">
              <button onClick={handleProfileClick}>
                <FaUserCircle size={20} /> Profile
              </button>
              <br />
              <button onClick={handleOrderHistoryClick}>
                <FaHistory size={20} /> Order History
              </button>
            </div>
          )}
        </div>
        <button onClick={handleLogout}>
          <FaSignOutAlt size={20} /> Logout
        </button>
        <button
          className="btns shopping-cart-btn"
          onClick={() => setCartVisible(true)}
        >
          <GiShoppingBag size={24} />
          {cartItems.length > 0 && (
            <span className="product-count">{cartItems.length}</span>
          )}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </nav>
  );
};

export default Navbar;
