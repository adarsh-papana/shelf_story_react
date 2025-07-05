import React from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import "./../style/ShoppingCart.css";
import AxiosInstance from "../AxiosInstance";

function ShoppingCart({
  visibilty,
  cartItems,
  allProducts,
  onClose,
  onRemoveCart,
  setCartVisible,
  setProducts,
  setCartItems,
  setCartId,
  setCartItemID,
  fetchCart,
}) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getProductDetails = (bookID) => {
    return allProducts.find((product) => product.bookID === bookID) || {};
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, product) => total + product.totalAmount, 0);
  };

  const RemoveItemFromCart = async (cartItemID) => {
    try {
      await AxiosInstance.delete(`/Cart/remove-item-from-cart/${cartItemID}`);
      setProducts(
        allProducts.filter((product) => product.cartItemID !== cartItemID)
      );
      fetchCart();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const removeCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login");
    }

    try {
      if (cartItems.length > 0) {
        const response = await AxiosInstance.delete(
          `/Cart/delete-cart-by-userid/${userId}`
        );
        setCartItems([]);
        setCartId(null);
      } else {
        console.log("Cart is already empty");
        alert("Your cart is already empty");
      }
    } catch (error) {
      console.error("Error removing cart:", error);
    }
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  return (
    <div className="modal" style={{ display: visibilty ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={20} />
          </button>
          <button className="btn remove-cart-btn" onClick={removeCart}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
        <div className="cart-products">
          {cartItems.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}

          {cartItems.map((product) => {
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
                  <span className="product-price">
                    ₹{product.totalAmount}
                  </span>
                  <div className="cart-management">
                    <button
                      className="btns delete-btn"
                      onClick={() => RemoveItemFromCart(product.cartItemID)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {cartItems.length > 0 && (
            <div className="total-amount">
              <h3>Total Amount: ₹{getTotalAmount()}</h3>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="cart-actions">
              <button className="btn continue-shopping-btn" onClick={closeCart}>
                Continue Shopping
              </button>
              <button
                className="btn checkout-btn"
                onClick={() => {
                  navigate("/checkout");
                  onClose();
                }}
              >
                Proceed to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
