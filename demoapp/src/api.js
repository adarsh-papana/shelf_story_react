import axios from "axios";

export const instance = axios.create({
  baseURL: "https://localhost:7274/api/User/authentication", // Change according to backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// const UserID = 4;
 
// export const fetchProducts = async () => {
//   try {
//     const response = await axios.get("https://localhost:7274/api/BookManagement");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };
 
// export const fetchCart = async () => {
//   try {
//     const response = await axios.get(`https://localhost:7274/api/Cart/get-cart-by-id/${UserID}`);
//     console.log('Cart response:', response.data); // Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     throw error;
//   }
// };
 
// export const addProductToCart = async (product) => {
//   console.log('Adding product to cart:', product); // Debugging log
//   try {
//     const response = await axios.post(`https://localhost:7274/api/Cart/add-item-to-cart/${UserID}`, {
//       bookID: product.bookID,
//       price: product.price,
//       quantity: 1,
//     });
//     console.log('Add to cart response:', response.data); // Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     throw error;
//   }
// };
 
 
 
 
 
// export const removeCart = async () => {
//   try {
//     const response = await axios.delete(`https://localhost:7274/api/Cart/delete-cart-by-userid/${UserID}`);
//     console.log('Remove cart response:', response.data); // Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error removing cart:", error);
//     throw error;
//   }
// };
 
// export const handleCheckout = async (address, paymentStatus) => {
//   try {
//     const response = await axios.post(`https://localhost:7274/api/Cart/checkout/${UserID}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
//     console.log('Checkout response:', response.data); // Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error during checkout:", error);
//     throw error;
//   }
// };

// export default instance;