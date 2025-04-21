



// import React, { useState } from "react";
// import "./../style/CheckoutForm.css";

// function CheckoutForm({ onCheckout }) {
//   const [address, setAddress] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onCheckout();
//   };

//   return (
//     <div className="checkout-form">
//       <h2>Checkout</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Card Number</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Expiry Date</label>
//           <input
//             type="text"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>CVV</label>
//           <input
//             type="text"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn pay-btn">Pay Now</button>
//       </form>
//     </div>
//   );
// }

// export default CheckoutForm;



import React, { useState } from "react";
import "./../style/CheckoutForm.css";

function CheckoutForm({ onCheckout }) {
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentStatus = "Paid"; 
    await onCheckout(address, paymentStatus);
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn pay-btn" >Pay Now</button>
      </form>
    </div>

    </div>
  );
}

export default CheckoutForm;