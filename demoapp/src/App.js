


// // import logo from './logo.svg';
// import './App.css';
// import Login from './Login';
// import Dashboard from './Dashboard';
// import Register from './Register';
// import Update from './Update';
// import Profilemang from './Profilemang';
// import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
// import React, { useState, useEffect} from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// // import "./style/main.css";
// import ShoppingCart from "./components/ShoppingCart";
// import ProductList from "./components/ProductList";
// import CheckoutForm from "./components/CheckoutForm";
// import Navbar from "./components/Navbar"; // Import the Navbar component
// import Order from "./components/Order"; // Import the Order component
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";  // Import jwt-decode
// import InventoryPage from './components/InventoryPage';
// import NotificationPage from './components/NotificationDropdown';
// import AddInventoryPage from './components/AddInventoryPage';
// import AdminNavbar from './components/AdminNavbar';
// import SearchBar from './components/Searchbar';
// import BookDetails from './components/BookDetails';

// function App() {
//   const navigate = useNavigate();
//   const [cartsVisibility, setCartVisible] = useState(false); // Set initial visibility to false
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItemID, setCartItemID] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [cartId, setCartId] = useState(null); // Store cartId
//   const [isCheckout, setIsCheckout] = useState(false); // Track checkout state
 
//   // console.log("User ID from Profilemang:", userId); // Debugging log
//   // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//   // const decodedToken = jwtDecode(token); // Decode the token
//   // const userid= (decodedToken.UserID ); // Extract userId
//   const userId = 4;
  
//   const location = useLocation();
//   const hideNavbarRoutes = [ "/login", "/register", "/update", "/dashboard", "/inventory", "/notifications", "/add-book", "/update-stock", "/update-notify-limit", "/add-inventory"]; // Add routes where you want to hide the navbar

//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

  
//   useEffect(() => {
//     fetchProducts();
//     fetchCart();
//   }, []);

  
//   const fetchProducts = async () => {
    
//     try {
//       const response = await axios.get(`https://localhost:7274/api/BookManagement`);
//       setProducts(response.data);
//       setFilteredProducts(response.data); // Set filtered products to all products initially
//       console.log('Products response:', response.data); // Debugging log
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchCart = async () => {
    
//     // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//     // const decodedToken = jwtDecode(token); // Decode the token
//     //  const userId= (decodedToken.UserID ); // Extract userId
//     //  console.log("User ID from token:", userId); // Debugging log
//     try {
//       const response = await axios.get(`https://localhost:7274/api/Cart/get-cart-by-id/${userId}`);
//       console.log('Cart response:', response.data); // Debugging log
//       setCartItems(response.data.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
//       setCartId(response.data.cartId); // Store cartId
//       setCartItemID(response.data.cartItems.map(item => item.cartItemID)); // Store cartItemIDs
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };
//   const addProductToCart = async (product) => {
//     console.log('Adding product to cart:', product); // Debugging log
//     const token = localStorage.getItem("token"); // Check if the user is authenticated
//     if (!token) {
//       alert("You must be logged in to add items to the cart.");
//       navigate("/login"); // Navigate to Forgot Password component
//     }
//   // const decodedToken = jwtDecode(token); // Decode the token
//   // const userId= (decodedToken.UserID ); // Extract userId
//     try {
//       const response = await axios.post(`https://localhost:7274/api/Cart/add-item-to-cart/${userId}`, {
//         bookID: product.bookID,
//         price: product.price,
//         quantity: 1,
//       });
//       console.log('Add to cart response:', response.data); // Debugging log
//       fetchCart();
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const removeCart = async () => {
    
//     const token = localStorage.getItem("token"); // Check if the user is authenticated
//     if (!token) {
//       alert("You must be logged in to add items to the cart.");
//       navigate("/login"); // Navigate to Forgot Password component
//     }
//   // const decodedToken = jwtDecode(token); // Decode the token
//   // const userId= (decodedToken.UserID ); // Extract userId
//     try {
//       const response = await axios.delete(`https://localhost:7274/api/Cart/delete-cart-by-userid/${userId}`);
//       console.log('Remove cart response:', response.data); // Debugging log
//       setCartItems([]); // Clear cart items
//       setCartId(null); // Clear cartId
//     } catch (error) {
//       console.error("Error removing cart:", error);
//     }
//   };

//   const handleCheckout = async (address, paymentStatus) => {
//     const token = localStorage.getItem("token"); // Check if the user is authenticated
//     if (!token) {
//       alert("You must be logged in to add items to the cart.");
//       navigate("/login"); // Navigate to Forgot Password component
//     }
//   // const decodedToken = jwtDecode(token); // Decode the token
//   // const userId= (decodedToken.UserID ); // Extract userId
//     try {
//       const response = await axios.post(`https://localhost:7274/api/Cart/checkout/${userId}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
//       console.log('Checkout response:', response.data); // Debugging log
//       alert("Order has been placed!");
//       setIsCheckout(false);
//       setCartItems([]); // Clear cart items after checkout
//       setCartId(null); // Clear cartId after checkout
//       navigate("/"); // Redirect to home page after checkout
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   const RemoveItemFromCart = async (cartItemID) => {
//     try {
//       await axios.delete(`https://localhost:7274/api/Cart/remove-item-from-cart/${cartItemID}`);
//       setProducts(products.filter(product => product.cartItemID !== cartItemID));
//       fetchCart();
//     } catch (error) {
//       console.error("Error deleting product from cart:", error);
//     }
//   };

//   const RedirectToHomePage = () => {
//     setCartVisible(false);
 
//   }

//   const bookhandleSearch = (searchTerm) => {
//     const lowercasedTerm = searchTerm.toLowerCase();
//     const filtered = products.filter(
//       (product) =>
//         product.title.toLowerCase().includes(lowercasedTerm) ||
//         product.author.authorName.toLowerCase().includes(lowercasedTerm) ||
//         product.category.categoryName.toLowerCase().includes(lowercasedTerm)
//     );
//     setFilteredProducts(filtered);
//   };
 

 

//   return (

// <div className='App'>
//       {!hideNavbarRoutes.includes(location.pathname) && (
//         <Navbar cartItems={cartItems} setCartVisible={setCartVisible} onSearch={bookhandleSearch} />
//       )}
//       <AdminNavbar onSearch={handleSearch} /> 
//       <Routes>
//         {/* <Route path="/" element={<Login />} /> Render Login for the root path */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/checkout" element={<CheckoutForm onCheckout={handleCheckout} />} />
//         <Route path="/order-history" element={<Order UserID={userId} />} />
//         <Route path="/register" element={<Register />} /> {/* Add route for Register */}
//         <Route path="/update" element={<Update />} /> {/* Add route for Forgot Password */}
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Add route for Dashboard */}
//         <Route path="/profile" element={<ProtectedRoute><Profilemang /></ProtectedRoute>} /> {/* Add route for Profilemang */}
//         {/* <Route path="/" element={<InventoryPage searchQuery={searchQuery} />} /> */}
//           <Route path="/inventory" element={<InventoryPage searchQuery={searchQuery} />} />
//           <Route path="/notifications" element={<NotificationPage />} />
//           <Route path="/add-book" element={<InventoryPage searchQuery={searchQuery} />} />
//           <Route path="/update-stock" element={<InventoryPage searchQuery={searchQuery} />} />
//           <Route path="/update-notify-limit" element={<InventoryPage searchQuery={searchQuery} />} />
//           <Route path="/add-inventory" element={<AddInventoryPage />} />
//           <Route path="/book-details/:bookID" element={<BookDetails addProductToCart={addProductToCart} />} />

//         <Route path="/" element={
//           // <ProtectedRoute> 
//             <>
//               <ShoppingCart
//                 visibilty={cartsVisibility}
//                 products={cartItems}
//                 cartItemID={cartItemID}
//                 allProducts={products} // Pass allProducts to ShoppingCart
//                 onClose={() => setCartVisible(false)}
//                 onRemoveCart={removeCart} // Pass removeCart function
//                 onCheckout={() => setIsCheckout(true)} // Show checkout form
//                 cartItems={cartItems} // Pass cartItems to ShoppingCart
//                 RemoveItemFromCart={RemoveItemFromCart} // Pass RemoveItemFromCart function
//                 RedirectToHomePage={RedirectToHomePage} // Pass RedirectToHomePage function
//               />
              
//               <main>
//                 <h2 className="title">Books</h2>
//                 <ProductList products={filteredProducts} addProductToCart={addProductToCart} setCartVisible={setCartVisible}/>
//               </main>
//             </>
         
//           // </ProtectedRoute>
//           } />
//       </Routes>
//     </div>
//   );
// }

// const MainApp = () => (
//   <Router>
//     <App />
//   </Router>
// );


// export default MainApp;









// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Update from './Update';
import Profilemang from './Profilemang';
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import React, { useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import "./style/main.css";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Order from "./components/Order"; // Import the Order component
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Import jwt-decode
import InventoryPage from './components/InventoryPage';
import NotificationPage from './components/NotificationDropdown';
import AddInventoryPage from './components/AddInventoryPage';
import AdminNavbar from './components/AdminNavbar';
import SearchBar from './components/Searchbar';
import BookDetails from './components/BookDetails';

function App() {
  const navigate = useNavigate();
  const [cartsVisibility, setCartVisible] = useState(false); // Set initial visibility to false
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemID, setCartItemID] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartId, setCartId] = useState(null); // Store cartId
  const [isCheckout, setIsCheckout] = useState(false); // Track checkout state




    const [userInfo, setUserInfo] = useState(null); // State to store user information
    const [error, setError] = useState(""); // State to store error messages
  const [userID , setUserID] = useState(null); // State to store user ID  
  
    const [orderDetails, setOrderDetails] = useState(null);

 
  // console.log("User ID from Profilemang:", userId); // Debugging log
  // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  // const decodedToken = jwtDecode(token); // Decode the token
  // const userid= (decodedToken.UserID ); // Extract userId
  const userId = localStorage.getItem("userId");
  console.log("User ID from localStorage:", userId); // Debugging log
  
  const location = useLocation();
  const hideNavbarRoutes = [ "/login", "/Register", "/Update", "/dashboard", "/inventory", "/notifications", "/add-book", "/update-stock", "/update-notify-limit", "/add-inventory"]; // Add routes where you want to hide the navbar
  const hideNavbarRoutes1 = [ "/login", "/Register","/Update", "/profile", "/checkout","/","/order-history"]; // Add routes where you want to hide the navbar

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


    // Fetch user information when the component mounts
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  
          if (!token) {
            throw new Error("Unauthorized: No token found");
          }
  
          // const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
          const decodedToken = jwtDecode(token); // Decode the JWT token
          const userId = decodedToken.UserID; // Extract userId from the claims
          console.log("Decoded token:", decodedToken);
          console.log("UserId from token:", userId);
          setUserID(userId); // Set the userId in state
          // const UserId = parseInt(userId, 10);
          console.log("Extracted userId:", userId);
          if (!userId || isNaN(userId)) {
              throw new Error("Invalid userId extracted from token");
            }
          const response = await axios.get(
            `https://localhost:7274/api/User/UserById/${userId}`, // Use the userId from the route parameter
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            }
          );
          
            localStorage.setItem("userId", userId); // Store the userId in localStorage
          setUserInfo(response.data); // Set the fetched user information
        } catch (err) {
          console.error("Error fetching user information:", err);
  
          if (err.response?.status === 401) {
            alert("Your session has expired. Please log in again.");
            localStorage.removeItem("token"); // Remove the invalid token
            navigate("/login"); // Redirect to login page
          } else {
            setError(err.response?.data?.message || "Failed to fetch user information.");
          }
        }return userId;
      };
  
      fetchUserInfo();
    }, [userId, navigate]);
  
  const fetchProducts = async () => {
    
    try {
      const response = await axios.get(`https://localhost:7274/api/BookManagement`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Set filtered products to all products initially
      console.log('Products response:', response.data); // Debugging log
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

   const fetchCart = async () => {
    
    // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    // const decodedToken = jwtDecode(token); // Decode the token
    //  const userId= (decodedToken.UserID ); // Extract userId
    //  console.log("User ID from token:", userId); // Debugging log
    try {
      const response = await axios.get(`https://localhost:7274/api/Cart/get-cart-by-id/${userId}`);
      console.log('Cart response:', response.data); // Debugging log
      setCartItems(response.data.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
      setCartId(response.data.cartId); // Store cartId
      setCartItemID(response.data.cartItems.map(item => item.cartItemID)); // Store cartItemIDs
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const addProductToCart = async (product) => {
    console.log('Adding product to cart:', product); // Debugging log
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login"); // Navigate to Forgot Password component
    }
  // const decodedToken = jwtDecode(token); // Decode the token
  // const userId= (decodedToken.UserID ); // Extract userId
    try {
      const response = await axios.post(`https://localhost:7274/api/Cart/add-item-to-cart/${userId}`, {
        bookID: product.bookID,
        price: product.price,
        quantity: 1,
      });
      console.log('Add to cart response:', response.data); // Debugging log
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeCart = async () => {
    
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login"); // Navigate to Forgot Password component
    }
  // const decodedToken = jwtDecode(token); // Decode the token
  // const userId= (decodedToken.UserID ); // Extract userId
    try {
      const response = await axios.delete(`https://localhost:7274/api/Cart/delete-cart-by-userid/${userId}`);
      console.log('Remove cart response:', response.data); // Debugging log
      setCartItems([]); // Clear cart items
      setCartId(null); // Clear cartId
    } catch (error) {
      console.error("Error removing cart:", error);
    }
  };

  const handleCheckout = async (address, paymentStatus) => {
    const token = localStorage.getItem("token"); // Check if the user is authenticated
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login"); // Navigate to Forgot Password component
    }
  // const decodedToken = jwtDecode(token); // Decode the token
  // const userId= (decodedToken.UserID ); // Extract userId
    try {
      const response = await axios.post(`https://localhost:7274/api/Cart/checkout/${userId}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
      console.log('Checkout response:', response.data); // Debugging log
      alert("Order has been placed!");
      setIsCheckout(false);
      setCartItems([]); // Clear cart items after checkout
      setCartId(null); // Clear cartId after checkout
      navigate("/"); // Redirect to home page after checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const RemoveItemFromCart = async (cartItemID) => {
    try {
      await axios.delete(`https://localhost:7274/api/Cart/remove-item-from-cart/${cartItemID}`);
      setProducts(products.filter(product => product.cartItemID !== cartItemID));
      fetchCart();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const RedirectToHomePage = () => {
    setCartVisible(false);
 
  }

  const bookhandleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercasedTerm) ||
        product.author.authorName.toLowerCase().includes(lowercasedTerm) ||
        product.category.categoryName.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  };
 

 

  return (
    <div className='App'>
      {!hideNavbarRoutes.includes(location.pathname) &&  (
        <Navbar cartItems={cartItems} setCartVisible={setCartVisible} onSearch={bookhandleSearch}  setCartItems= {setCartItems}/>
      )}
      {!hideNavbarRoutes1.includes(location.pathname) && !location.pathname.startsWith("/book-details") && !location.pathname.startsWith("/register#") && (
      <AdminNavbar onSearch={handleSearch} />)}

      <ShoppingCart
        visibilty={cartsVisibility}
        products={cartItems}
        cartItemID={cartItemID}
        allProducts={products} // Pass allProducts to ShoppingCart
        onClose={() => setCartVisible(false)}
        onRemoveCart={removeCart} // Pass removeCart function
        onCheckout={() => setIsCheckout(true)} // Show checkout form
        cartItems={cartItems} // Pass cartItems to ShoppingCart
        RemoveItemFromCart={RemoveItemFromCart} // Pass RemoveItemFromCart function
        RedirectToHomePage={RedirectToHomePage} // Pass RedirectToHomePage function
      />

      <Routes>
        <Route path="/login" element={<Login  fetchCart={fetchCart}/>} />
        <Route path="/checkout" element={<CheckoutForm onCheckout={handleCheckout} />} />
        <Route path="/order-history" element={<Order UserID={userId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Update />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profilemang /></ProtectedRoute>} />
        <Route path="/inventory" element={<InventoryPage searchQuery={searchQuery} />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/add-book" element={<InventoryPage searchQuery={searchQuery} />} />
        <Route path="/update-stock" element={<InventoryPage searchQuery={searchQuery} />} />
        <Route path="/update-notify-limit" element={<InventoryPage searchQuery={searchQuery} />} />
        <Route path="/add-inventory" element={<AddInventoryPage />} />
        <Route path="/book-details/:bookID" element={<BookDetails addProductToCart={addProductToCart} toggleCartVisibility={() => setCartVisible(!cartsVisibility)} userID={userID} setOrderDetails={setOrderDetails} />}  />
        <Route path="/" element={
          <>
            <main>
              <h2 className="title">Books</h2>
              <ProductList products={filteredProducts} addProductToCart={addProductToCart} setCartVisible={setCartVisible} />
            </main>
          </>
        } />
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
