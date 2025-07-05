import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./../style/OrderSuccess.css"; // Create and style this CSS file
 
function OrderSuccess() {
  const navigate = useNavigate();
 
  const handleContinueShopping = () => {
    navigate('/');
  };
 
  return (
    <div className="order-success-container">
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button className="btn continue-shopping-btn" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}
 
export default OrderSuccess;