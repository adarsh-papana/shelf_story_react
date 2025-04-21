// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
// import "./../style/ShoppingCart.css";
 
// function ShoppingCart({
//   visibilty,
//   products,
//   allProducts,
//   cartItems,
//   onClose,
//   onRemoveCart,
//   onCheckout,
 
//   RemoveItemFromCart
// }) {
//   const navigate = useNavigate();
 
//   const getProductDetails = (bookID) => {
//     return allProducts.find(product => product.bookID === bookID) || {};
//   };
 
//   const getCartItemID = (bookID) => {
//     const product = cartItems.find(product => product.bookID === bookID);
//     return product ? product.cartItemID : null;
//   };
 
//   const getTotalAmount = () => {
//     return products.reduce((total, product) => total + product.totalAmount, 0);
//   };
 
//   const handleCheckout = () => {
//     navigate('/checkout'); // Navigate to the checkout page
 
//     onCheckout(); // Perform any necessary actions before navigation
//   };
 
//   return (
//     <div className="modal" style={{ display: visibilty ? "block" : "none" }}>
//       <div className="shoppingCart">
//         <div className="header">
//           <h2>Shopping cart</h2>
//           <button className="btn close-btn" onClick={onClose}>
//             <AiFillCloseCircle size={20} />
//           </button>
//           <button className="btn remove-cart-btn" onClick={onRemoveCart}>
//             <RiDeleteBin6Line size={20} />
//           </button>
//         </div>
//         <div className="cart-products">
//           {products.length === 0 && (
//             <span className="empty-text">Your basket is currently empty</span>
//           )}
 
//           {products.map((product) => {
//             const details = getProductDetails(product.bookID);
//             return (
//               <div className="cart-product" key={product.cartItemID}>
//                 <img
//                   src={details.imageURL}
//                   alt={details.title}
//                   className="product-image"
//                 />
//                 <div className="product-info">
//                   <h3>{details.title || `Book # ${product.bookID}`}</h3>
//                   <span className="product-price">{product.totalAmount} Rs</span>
//                   <div className="quantity-controls">
                 
//                     <button className="btns delete-btn" onClick={() => RemoveItemFromCart(getCartItemID(product.bookID))}>
//                       <RiDeleteBin6Line size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
 
//           {products.length > 0 && (
//             <div className="total-amount">
//               <h3>Total Amount: {getTotalAmount()} Rs</h3>
//             </div>
//           )}
 
//           {products.length > 0 && (
//             <button className="btn checkout-btn" onClick={handleCheckout}>
//               Proceed to checkout
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default ShoppingCart;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import "./../style/ShoppingCart.css";
 
 
 
function ShoppingCart({
  visibilty,
  products,
  allProducts,
  cartItems,
  onClose,
  onRemoveCart,
  onCheckout,
  RedirectToHomePage,

 
  RemoveItemFromCart
}) {
  const navigate = useNavigate();
 
  const getProductDetails = (bookID) => {
    return allProducts.find(product => product.bookID === bookID) || {};
  };
 
  const getCartItemID = (bookID) => {
    const product = cartItems.find(product => product.bookID === bookID);
    return product ? product.cartItemID : null;
  };
 
  const getTotalAmount = () => {
    return products.reduce((total, product) => total + product.totalAmount, 0);
  };
 
  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
 
    onCheckout(); // Perform any necessary actions before navigation
  };
 
  const closeCart = () => {
 
    RedirectToHomePage();
 
  }
  return (
    <div className="modal" style={{ display: visibilty ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={20} />
          </button>
          <button className="btn remove-cart-btn" onClick={onRemoveCart}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}
 
          {products.map((product) => {
            const details = getProductDetails(product.bookID);
            return (
              <div className="cart-product" key={product.cartItemID}>
                <img
                  src={details.imageURL}
                  alt={details.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{details.title || `Book # ${product.bookID}`}</h3>
                  <span className="product-price">{product.totalAmount} Rs</span>
                  <div className="cart-management">
 
                    <button className="btns delete-btn" onClick={() => RemoveItemFromCart(getCartItemID(product.bookID))}>
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
 
          {products.length > 0 && (
            <div className="total-amount">
              <h3>Total Amount: {getTotalAmount()} Rs</h3>
            </div>
          )}
 
          {products.length > 0 && (
 
            <div className="cart-actions">
            
          <button className="btn checkout-btn" onClick={() => { handleCheckout(); onClose(); }}>
               Proceed to checkout
              </button>

              <button className="btn continue-shopping-btn" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
 
 
          )
          }
 
        </div>
 
 
      </div>
 
    </div>
  );
}
 
export default ShoppingCart;