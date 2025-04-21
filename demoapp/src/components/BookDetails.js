// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import "../style/BookDetails.css";


// // function BookDetails(addProductToCart) {
// //   const location = useLocation();
// //   const { product } = location.state;
 
// //   return (
// //     <div className="book-details">
// //     <div className="book-container">
// //       <div className="book-image">
// //         <img src={product.imageURL} alt={product.title} />
// //       </div>
// //       <div className="book-info">
// //         <h1 className="book-title">{product.title}</h1>
// //         <p className="book-price">Price: {product.price} Rs</p>
// //         <p className="book-author">Author: {product.author.authorName}</p>
// //         <p className="book-category">Category: {product.category.categoryName}</p>
// //         <p className="book-stock">{product.stockQuantity}</p>
// //         <div className="book-buttons">
// //           <button className="btn buy-now">Buy Now</button>
// //           <button className="btn add-to-cart" onClick={addProductToCart(product)}>Add to Cart</button>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }
 
// // export default BookDetails;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import "../style/BookDetails.css";

// function BookDetails({ addProductToCart ,visibilty , onClick,onClose ,setCartVisible}) { // Destructure props
//   const location = useLocation();
//   const { product } = location.state;



//   return (
//     <div className="book-details">
//       <div className="book-container">
//         <div className="book-image">
//           <img src={product.imageURL} alt={product.title} />
//         </div>
//         <div className="book-info">
//           <h1 className="book-title">{product.title}</h1>
//           <p className="book-price">Price: {product.price} Rs</p>
//           <p className="book-author">Author: {product.author.authorName}</p>
//           <p className="book-category">Category: {product.category.categoryName}</p>
//           <p className="book-stock">{product.stockQuantity}</p>
//           <div className="book-buttons">
//             <button className="btn buy-now" onClick={()=> PlaceOrder(product)}>Buy Now</button>
//             <button className="btn add-to-cart" onClick={() => addProductToCart(product)}>Add to Cart</button> {/* Use arrow function */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetails;





// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../style/BookDetails.css";
// import axios from "axios";

// function BookDetails({ addProductToCart, setOrderDetails }) { // Destructure props
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product } = location.state;

//   const handleBuyNow = (product) => {
//     const order = {
     
//       userID: 4, // Assuming you have the userId available
//       orderDate: new Date().toISOString(),
//       totalAmount: product.price, // Assuming the total amount is the product price
//       deliveryAddress: "123 Main St, City, Country", // Example address
//       orderStatus: "Pending", // Initial order status
//       paymentStatus: "Unpaid", // Initial payment status
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
  
//     axios.post("https://localhost:7274/api/Orders/place-order", order, {
//       headers: {
//         // 'accept': 'text/plain',
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         console.log("Order placed successfully:", response.data);
//         // Optionally navigate to checkout or order confirmation page
//         // navigate('/checkout');
//       })
//       .catch((error) => {
//         console.error("Error placing order:", error);
//       });
  
//     setOrderDetails(order); // Save order details to state
//     // navigate('/checkout'); // Navigate to checkout page
//   };
  
//   return (
//     <div className="book-details">
//       <div className="book-container">
//         <div className="book-image">
//           <img src={product.imageURL} alt={product.title} />
//         </div>
//         <div className="book-info">
//           <h1 className="book-title">{product.title}</h1>
//           <p className="book-price">Price: {product.price} Rs</p>
//           <p className="book-author">Author: {product.author.authorName}</p>
//           <p className="book-category">Category: {product.category.categoryName}</p>
//           <p className="book-stock">{product.stockQuantity}</p>
//           <div className="book-buttons">
//             <button className="btn buy-now" onClick={() => handleBuyNow(product)}>Buy Now</button>
//             <button className="btn add-to-cart" onClick={() => addProductToCart(product)}>Add to Cart</button> {/* Use arrow function */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetails;





import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/BookDetails.css";
import axios from "axios";

function BookDetails({ addProductToCart, setOrderDetails, userID }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
console.log("userID from BookDetails"+ userID);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const handleSubmitOrder = () => {
    const order = {
      userID: userID, // Assuming you have the userId available
      orderDate: new Date().toISOString(),
      totalAmount: product.price, // Assuming the total amount is the product price
      deliveryAddress: deliveryAddress,
      orderStatus: orderStatus,
      paymentStatus: paymentStatus,
      orderItems: [
        {
          bookID: product.bookID, // Assuming product has an id field
          price: product.price,
          quantity: 1, // Assuming quantity is 1 for simplicity
          totalAmount: product.price, // Assuming total amount is the product price
        },
      ],
    };

    console.log("Order object:", order); // Log the order object to check its structure

    axios.post("https://localhost:7274/api/Orders/place-order", order, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        alert("Order placed successfully!");
        // Optionally navigate to checkout or order confirmation page
        // navigate('/checkout');
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      });

    setOrderDetails(order); // Save order details to state
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="book-details">
      <div className="book-container">
        <div className="book-image">
          <img src={product.imageURL} alt={product.title} />
        </div>
        <div className="book-info">
          <h1 className="book-title">{product.title}</h1>
          <p className="book-price">Price: {product.price} Rs</p>
          <p className="book-author">Author: {product.author.authorName}</p>
          <p className="book-category">Category: {product.category.categoryName}</p>
          <p className="book-stock">{product.stockQuantity}</p>
          <div className="book-buttons">
            <button className="btn buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="btn add-to-cart" onClick={() => addProductToCart(product)}>Add to Cart</button> {/* Use arrow function */}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
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
                <label htmlFor="orderStatus">Order Status:</label>
                <input
                  type="text"
                  id="orderStatus"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentStatus">Payment Status:</label>
                <input
                  type="text"
                  id="paymentStatus"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn buy-now">Submit Order</button>
              <button type="button" className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
