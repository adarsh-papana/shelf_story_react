import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Update from "./Update";
import Profilemang from "./Profilemang";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import React, { useState, useEffect } from "react";
import AxiosInstance from "./AxiosInstance";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import { jwtDecode } from "jwt-decode";
import InventoryPage from "./components/InventoryPage";
import NotificationPage from "./components/NotificationDropdown";
import AddInventoryPage from "./components/AddInventoryPage";
import AdminNavbar from "./components/AdminNavbar";
import BookDetails from "./components/BookDetails";
import { fetchProducts } from "./components/FetchProducts";
import OrderSuccess from "./components/OrderSucess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

function App() {
  const navigate = useNavigate();
  const [cartsVisibility, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemID, setCartItemID] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [userID, setUserID] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const hideNavbarRoutes = [
    "/login",
    "/Register",
    "/Update",
    "/dashboard",
    "/inventory",
    "/notifications",
    "/add-book",
    "/update-stock",
    "/update-notify-limit",
    "/add-inventory",
  ]; // Add routes where you want to hide the navbar
  const hideNavbarRoutes1 = [
    "/login",
    "/Register",
    "/Update",
    "/profile",
    "/checkout",
    "/",
    "/order-history",
    "/order-success",
  ]; // Add routes where you want to hide the navbar
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchProducts(setFilteredProducts, setProducts);
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const decodedToken = jwtDecode(token); // Decode the JWT token
        const userId = decodedToken.UserID;
        console.log("Decoded token:", decodedToken);
        setUserID(userId);
        console.log("User ID from token:", userId);
        if (!userId || isNaN(userId)) {
          throw new Error("Invalid userId extracted from token");
        }
        const response = await AxiosInstance.get(`/User/UserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("userId", userId);
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user information:", err);

        if (err.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token"); // Remove the invalid token
          navigate("/login"); // Redirect to login page
        } else {
          setError(
            err.response?.data?.message || "Failed to fetch user information."
          );
        }
      } finally {
        setIsLoading(false); // Set loading to false after fetching user info
      }
    };

    fetchUserInfo();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await AxiosInstance.get(`Cart/get-cart-by-id/${userId}`);
      console.log("Cart response:", response.data); // Debugging log

      setCartItems(response.data.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
      setCartId(response.data.cartId); // Store cartId
      setCartItemID(response.data.cartItems.map((item) => item.cartItemID)); // Store cartItemIDs
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>; // Show loading indicator while fetching user info
  // }

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar
          cartItems={cartItems}
          setCartVisible={setCartVisible}
          setCartItems={setCartItems}
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      )}
      {!hideNavbarRoutes1.includes(location.pathname) &&
        !location.pathname.startsWith("/book-details") &&
        !location.pathname.startsWith("/register#") && (
          <AdminNavbar onSearch={handleSearch} />
        )}

      <ShoppingCart
        visibilty={cartsVisibility}
        cartItems={cartItems}
        cartItemID={cartItemID}
        allProducts={products}
        onCheckout={() => setIsCheckout(true)}
        fetchCart={fetchCart}
        onClose={() => setCartVisible(false)}
        setProducts={setProducts}
        setCartItems={setCartItems}
        setCartVisible={setCartVisible}
        setOrderDetails={setOrderDetails}
        setCartId={setCartId}
        setIsCheckout={setIsCheckout}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <CheckoutForm
              setIsCheckout={setIsCheckout}
              onCheckout={fetchCart}
              setCartItems={setCartItems}
              setCartId={setCartId}
              userId={userID}
            />
          }
        />
        <Route path="/order-history" element={<Order UserID={userId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Update />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <Profilemang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <InventoryPage searchQuery={searchQuery} />
            </ProtectedRoute>
          }
        />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/add-book"
          element={<InventoryPage searchQuery={searchQuery} />}
        />
        <Route
          path="/update-stock"
          element={<InventoryPage searchQuery={searchQuery} />}
        />
        <Route
          path="/update-notify-limit"
          element={<InventoryPage searchQuery={searchQuery} />}
        />
        <Route path="/add-inventory" element={<AddInventoryPage />} />
        <Route
          path="/book-details/:bookID"
          element={
            <BookDetails
              toggleCartVisibility={() => setCartVisible(!cartsVisibility)}
              userId={userID}
              setOrderDetails={setOrderDetails}
              fetchCart={fetchCart}
              token={token}
            />
          }
        />
        <Route
          path="/"
          element={
            <>
              <main>
                <h2 className="title-book">Books</h2>
                <ProductList
                  products={filteredProducts}
                  setCartVisible={setCartVisible}
                  fetchCart={fetchCart}
                  setFilteredProducts={setFilteredProducts}
                  setProducts={setProducts}
                  userId={userID}
                />
              </main>
            </>
          }
        />
      </Routes>
    </div>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
