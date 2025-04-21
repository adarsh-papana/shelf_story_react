



// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // // import './../style/Order.css'; // Make sure to create and import this CSS file

// // const Order = ({ UserID }) => {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const response = await axios.get(`https://localhost:7274/api/Orders/user/${UserID}`); // Replace with your API endpoint
// //         const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
// //         setOrders(sortedOrders);
// //       } catch (error) {
// //         console.error("Error fetching orders:", error);
// //       }
// //     };

// //     fetchOrders();
// //   }, [UserID]);

// //   return (
// //     <div className="order-container">
// //       <h2>Order History</h2>
// //       {orders.length === 0 ? (
// //         <p>No orders found.</p>
// //       ) : (
// //         <ul className="order-list">
// //           {orders.map(order => (
// //             <li key={order.orderID} className="order-item">
// //               <h3>Order #{order.orderID}</h3>
// //               <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
// //               <p>Total Amount: ₹{order.totalAmount}</p>
// //               <p>Delivery Address: {order.deliveryAddress}</p>
// //               <p>Order Status: {order.orderStatus}</p>
// //               <p>Payment Status: {order.paymentStatus}</p>
// //               <h4>Items:</h4>
// //               <ul className="order-items">
// //                 {order.orderItems.map(item => (
// //                   <li key={item.orderItemID} className="order-item-detail">
// //                     <p>Book ID: {item.bookID}</p>
// //                     <p>Price: ₹{item.price}</p>
// //                     <p>Quantity: {item.quantity}</p>
// //                     <p>Total Amount: ₹{item.totalAmount}</p>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Order;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './../style/Order.css'; // Make sure to create and import this CSS file

// const Order = ({ UserID }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7274/api/Orders/user/${UserID}`); // Replace with your API endpoint
//         const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
//         setOrders(sortedOrders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };


    

//     fetchOrders();
//   }, [UserID]);

//   return (
//     <div className="order-container">
//       <h2>Order History</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul className="order-list">
//           {orders.map(order => (
//             <li key={order.orderID} className="order-item">
//               <h3>Order #{order.orderID}</h3>
//               <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//               <p>Total Amount: ₹{order.totalAmount}</p>
//               <p>Delivery Address: {order.deliveryAddress}</p>
//               <p>Order Status: {order.orderStatus}</p>
//               <p>Payment Status: {order.paymentStatus}</p>
//               <h4>Items:</h4>
//               <ul className="order-items">
//                 {order.orderItems.map(item => (
//                   <li key={item.orderItemID} className="order-item-detail">
//                     <p>Book ID: {item.bookID}</p>
//                     <p>Price: ₹{item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Total Amount: ₹{item.totalAmount}</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Order;



import React, { useEffect, useState } from "react";
import axios from "axios";
import './../style/Order.css'; // Make sure to create and import this CSS file
import { useNavigate } from "react-router-dom";
const Order = ({ UserID }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Change this value to 3, 4, or 5 as needed
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      alert("You must be logged.");
      navigate("/login"); // Navigate to Forgot Password component
    }
      try {
        const response = await axios.get(`https://localhost:7274/api/Orders/user/${UserID}`); // Replace with your API endpoint
        const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        console.log(sortedOrders);
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [UserID]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="order-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <ul className="order-list">
            {currentOrders.map(order => (
              <li key={order.orderID} className="order-item">
                <h3>Order #{order.orderID}</h3>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Total Amount: ₹{order.totalAmount}</p>
                <p>Delivery Address: {order.deliveryAddress}</p>
                <p>Order Status: {order.orderStatus}</p>
                <p>Payment Status: {order.paymentStatus}</p>
                <h4>Items:</h4>
                <ul className="order-items">
                  {order.orderItems.map(item => (
                    <li key={item.orderItemID} className="order-item-detail">
                      <p>Book ID: {item.bookID}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total Amount: ₹{item.totalAmount}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Order;