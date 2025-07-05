
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../style/BookDetails.css";
// import axios from "axios";

// function BookDetails({ addProductToCart, setOrderDetails, userID }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product } = location.state;
//   console.log("userID from BookDetails" + userID);
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [orderStatus, setOrderStatus] = useState("Pending");
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleBuyNow = () => {
//     setIsModalOpen(true);
//   };

//   const handleSubmitOrder = () => {
//     const order = {
//       userID: userID, // Assuming you have the userId available
//       orderDate: new Date().toISOString(),
//       totalAmount: product.price, // Assuming the total amount is the product price
//       deliveryAddress: deliveryAddress,
//       orderStatus: orderStatus,
//       paymentStatus: paymentStatus,
//       orderItems: [
//         {
//           bookID: product.bookID, // Assuming product has an id field
//           price: product.price,
//           quantity: 1, // Assuming quantity is 1 for simplicity
//           totalAmount: product.price, // Assuming total amount is the product price
//         },
//       ],
//     };

//     console.log("Order object:", order); // Log the order object to check its structure

//     axios
//       .post("https://localhost:7274/api/Orders/place-order", order, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("Order placed successfully:", response.data);
//         alert("Order placed successfully!");
//         // Optionally navigate to checkout or order confirmation page
//         // navigate('/checkout');
//       })
//       .catch((error) => {
//         console.error("Error placing order:", error);
//         alert("Error placing order. Please try again.");
//       });

//     setOrderDetails(order); // Save order details to state
//     setIsModalOpen(false); // Close the modal
//   };

//   return (
//     <div className="book-details">
//       <div className="book-container">
//         <div className="book-image">
//           <img src={product.imageURL} alt={product.title} />
//         </div>
//         <div className="book-info">
//           <h1 className="book-title">{product.title}</h1>
//           <p className="book-price">Price: ₹{product.price}</p>
//           <p className="book-author">Author: {product.author.authorName}</p>
//           <p className="book-category">
//             Category: {product.category.categoryName}
//           </p>
//           <p className="book-stock">{product.stockQuantity}</p>
//           <div className="book-buttons">
//             <button className="btn buy-now" onClick={handleBuyNow}>
//               Buy Now
//             </button>
//             <button
//               className="btn add-to-cart"
//               onClick={() => addProductToCart(product)}
//             >
//               Add to Cart
//             </button>{" "}
//             {/* Use arrow function */}
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Order Details</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSubmitOrder();
//               }}
//             >
//               <div className="form-group">
//                 <label htmlFor="deliveryAddress">Delivery Address:</label>
//                 <input
//                   type="text"
//                   id="deliveryAddress"
//                   value={deliveryAddress}
//                   onChange={(e) => setDeliveryAddress(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="orderStatus">Order Status:</label>
//                 <input
//                   type="text"
//                   id="orderStatus"
//                   value={orderStatus}
//                   onChange={(e) => setOrderStatus(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="paymentStatus">Payment Status:</label>
//                 <input
//                   type="text"
//                   id="paymentStatus"
//                   value={paymentStatus}
//                   onChange={(e) => setPaymentStatus(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn buy-now">
//                 Submit Order
//               </button>
//               <button
//                 type="button"
//                 className="btn cancel"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookDetails;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/BookDetails.css";
import AxiosInstance from "../AxiosInstance";

function BookDetails({ setOrderDetails, userID, fetchCart, userId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleBuyNow = () => {
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitOrder = () => {
    const order = {
      userID: userID, // Assuming you have the userId available
      orderDate: new Date().toISOString(),
      totalAmount: product.price, // Assuming the total amount is the product price
      deliveryAddress: deliveryAddress,
      orderStatus: "Ordered",
      paymentStatus: "Paid",
      orderItems: [
        {
          bookID: product.bookID, // Assuming product has an id field
          price: product.price,
          quantity: 1, // Assuming quantity is 1 for simplicity
          totalAmount: product.price, // Assuming total amount is the product price
        },
      ],
    };

    AxiosInstance.post("Orders/place-order", order, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log("Order placed successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });

    setOrderDetails(order); // Save order details to state
    setIsModalOpen(false); // Close the modal
  };

  const addProductToCart = async (product) => {
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await AxiosInstance.post(`Cart/add-item-to-cart/${userId}`, {
        bookID: product.bookID,
        price: product.price,
        quantity: 1,
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="book-details">
      <div className="book-container">
        <div className="book-image">
          <img src={product.imageURL} alt={product.title} />
        </div>
        <div className="book-info">
          <h1 className="book-title">{product.title}</h1>
          <p className="book-price">Price: ₹{product.price}</p>
          <p className="book-author">Author: {product.author.authorName}</p>
          <p className="book-category">Category: {product.category.categoryName}</p>
          <p className="book-stock">{product.stockQuantity}</p>
          <div className="book-buttons">
            <button className="btn buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="btn add-to-cart" onClick={() => addProductToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); navigate("/order-success") }}>
              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
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
              <button type="submit" className="btn buy-now">Place Order</button>
              <button type="button" className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Not Logged In</h2>
            <p>Please log in to continue.</p>
            <button className="btn login" onClick={() => navigate("/login")}>Login</button>
            <button className="btn cancel" onClick={() => setIsLoginModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
