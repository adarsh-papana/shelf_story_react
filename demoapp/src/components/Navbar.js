




// import React from "react";
// import { GiShoppingBag } from 'react-icons/gi';
// import { FaHome, FaBoxOpen, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
// import SearchBar from "./Searchbar";
// import './../style/Navbar.css'; // Make sure to create and import this CSS file

// const Navbar = ({ cartItems, setCartVisible }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <h2>Shelf Story</h2>
//       </div>

//       <SearchBar />
//       <div className="navbar-right">
//         <button onClick={() => window.location.href = "/"}>
//           <FaHome size={15} /> Home
//         </button>
//         {/* <button onClick={() => window.location.href = "/inventory"}>
//           <FaBoxOpen size={15} /> Inventory
//         </button> */}
//         <button onClick={() => alert("Go to Profile Management")}>
//           <FaUserAlt size={15} /> Profile Management
//         </button>
//         <button onClick={() => console.log("Logging out")}>
//           <FaSignOutAlt size={15} /> Logout
//         </button>
//         <button className="btn shopping-cart-btn" onClick={() => setCartVisible(true)}>
//           <GiShoppingBag size={20} />
//           {cartItems.length > 0 && (
//             <span className="product-count">
//               {cartItems.length}
//             </span>
//           )}
//         </button>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from "react";
import { GiShoppingBag } from 'react-icons/gi';
import { FaHome, FaBoxOpen, FaUserAlt, FaSignOutAlt, FaHistory, FaUserCircle } from 'react-icons/fa';
import SearchBar from "./Searchbar";
import './../style/Navbar.css'; // Make sure to create and import this CSS file
import { useNavigate } from "react-router-dom";
const Navbar = ({ cartItems, setCartVisible, onSearch , setCartItems }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        navigate("/login"); // Redirect to login on logout
      };

    return (
        <nav className="navbar">

            <div className="navbar-left">
                <h2
                    onClick={() => { window.location.href = "/" }}
                    style={{ cursor: 'pointer' }}
                >
                    Shelf Story
                </h2>
            </div>
            <div className="navbar-center">
                <SearchBar onSearch={onSearch} />
            </div>

            <div className="navbar-right">
                <button onClick={() => window.location.href = "/"}>
                    <FaHome size={20} /> Home
                </button>
                {/* <button onClick={() => window.location.href = "/inventory"}>
                    <FaBoxOpen size={20} /> Inventory
                </button> */}
                <div className="profile-management">
                    <button onClick={toggleDropdown}>
                        <FaUserAlt size={20} /> Profile Management
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown">

                            <button onClick={() => window.location.href = "/profile"}>
                                <FaUserCircle size={20} /> Profile
                            </button>
                            <br />
                            
                            <button onClick={() => window.location.href = "/order-history"}>
                                <FaHistory size={20} /> Order History
                            </button>
                        </div>
                    )}
                </div>
                <button onClick={() => handleLogout()}>
                    <FaSignOutAlt size={20} /> Logout
                </button>
                <button className="btns shopping-cart-btn" onClick={() => setCartVisible(true)}>
                    <GiShoppingBag size={24} />
                    {cartItems.length > 0 && (
                        <span className="product-count">
                            {cartItems.length}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;