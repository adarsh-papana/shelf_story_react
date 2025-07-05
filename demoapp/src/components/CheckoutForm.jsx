import React, { useState } from "react";
import "./../style/CheckoutForm.css";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
 
// const userId = localStorage.getItem("userId"); // Assuming you have userId stored in localStorage
 
function CheckoutForm({ setCartItems, setCartId, setIsCheckout ,userId}) {
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
 
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "address":
        if (!value) error = "Address is required.";
        break;
      case "cardNumber":
        if (!/^\d{16}$/.test(value)) error = "Card number must be 16 digits.";
        break;
      case "expiryDate":
        if (!/^\d{2}\/\d{2}$/.test(value)) error = "Expiry date must be in MM/YY format.";
        break;
      case "cvv":
        if (!/^\d{3}$/.test(value)) error = "CVV must be 3 digits.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "address":
        setAddress(value);
        break;
      case "cardNumber":
        setCardNumber(value);
        break;
      case "expiryDate":
        setExpiryDate(value);
        break;
      case "cvv":
        setCvv(value);
        break;
      default:
        break;
    }
    validateField(name, value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentStatus = "Paid";
    await handleCheckout(address, paymentStatus);
  };
 
  const handleCheckout = async (address, paymentStatus) => {
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      alert("You must be logged in to place an order.");
      navigate("/login"); // Navigate to login page
      return;
    }
 
    try {
      const response = await AxiosInstance.post(`Cart/checkout/${userId}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
      console.log('Checkout response:', response.data);
      setIsCheckout(false);
      setCartItems([]);
      setCartId(null);
      navigate("/order-success"); // Navigate to the order success page
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  };
 
  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardNumber}
              onChange={handleChange}
              required
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={expiryDate}
              onChange={handleChange}
              required
            />
            {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={cvv}
              onChange={handleChange}
              required
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
          <button type="submit" className="btn pay-btn">Pay Now</button>
        </form>
      </div>
    </div>
  );
}
 
export default CheckoutForm;