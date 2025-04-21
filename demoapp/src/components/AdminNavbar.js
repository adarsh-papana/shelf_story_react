import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminNavbar.css"; // Create and style this CSS file
// import logo from "../assets/LogowithoutText.png"; // Adjust the path to your logo
import { useNavigate } from "react-router-dom";
 
const AdminNavbar = ({ onSearch }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
 
  const fetchNotifications = async () => {
    try {
const response = await axios.get(`https://localhost:7274/api/Notification`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`https://localhost:7274/api/Notification/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((note) => note.notificationID !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
 
  useEffect(() => {
    fetchNotifications();
  }, []);
 
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery); // Trigger search when Enter is pressed
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login"); // Redirect to login on logout
  };

  
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        {/* <img src={logo} alt="Logo" className="logo rounded-logo" /> */}
        <span className="site-name">Shelf Story</span>
      </div>
      <div className="admin-navbar-center">
        <div className="admin-search-bar-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16pt" height="16pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet" className="search-icon">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M712 4836 c-210 -51 -393 -242 -432 -451 -8 -43 -10 -560 -8 -1840 l3 -1780 26 -67 c76 -195 220 -336 409 -401 l65 -22 1018 -3 c927 -2 1021 -1 1053 14 50 24 77 68 82 133 4 66 -20 111 -78 145 -35 21 -49 21 -1035 26 l-1000 5 -50 27 c-106 56 -166 149 -173 268 -3 60 0 86 18 132 27 73 92 141 168 176 l57 27 572 5 c558 5 572 6 599 26 98 72 96 204 -3 265 l-38 24 -585 0 -585 0 -85 -31 c-47 -17 -93 -34 -103 -38 -16 -8 -17 60 -15 1430 3 1367 4 1441 21 1475 23 47 79 103 126 126 34 17 104 18 1366 21 l1330 2 18 -21 c16 -20 17 -68 17 -689 l0 -667 23 -33 c32 -48 69 -72 119 -77 58 -7 118 23 149 74 l24 38 0 700 0 700 -23 57 c-29 71 -75 129 -137 174 -96 68 -6 64 -1504 63 -1065 -1 -1367 -3 -1409 -13z"/>
<path d="M1215 3986 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 25 -8 288 -10 819 -8 775 3 782 3 810 24 98 73 98 195 0 268 -28 21 -34 21 -820 23 -643 2 -798 0 -822 -11z"/>
<path d="M3280 2819 c-162 -19 -362 -96 -501 -190 -81 -55 -198 -166 -260 -248 -65 -86 -153 -264 -183 -373 -69 -241 -51 -511 48 -740 140 -324 408 -552 763 -650 67 -18 105 -22 263 -22 170 0 193 2 285 27 107 29 250 93 336 151 l54 36 265 -264 c175 -175 275 -267 293 -272 44 -10 112 1 145 24 54 39 80 138 51 195 -6 12 -128 139 -270 282 l-259 260 36 54 c58 86 123 231 151 338 34 130 42 336 19 470 -79 454 -437 822 -883 907 -106 20 -261 27 -353 15z m317 -334 c273 -63 494 -271 583 -550 34 -106 39 -292 12 -406 -37 -151 -99 -266 -206 -377 -108 -113 -237 -186 -395 -224 -114 -27 -300 -22 -406 12 -281 89 -484 305 -552 588 -23 99 -21 275 6 377 96 367 439 620 811 599 47 -3 113 -12 147 -19z"/>
</g>
</svg>
        
        <input
          type="text"
          className="admin-search-bar"
          placeholder="Search inventory by book title..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown} // Trigger search on Enter key
        />
      </div>
      </div>

      <div className="admin-navbar-right">
        <div className="admin-notification-container">
          <button onClick={toggleDropdown} className="admin-notification-button">
            {/* <img src="/bell-icon.png" alt="Notifications" className="bell-icon" /> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50" /* Adjust size as needed */
                height="48" /* Adjust size as needed */
                viewBox="-10,-10,2,256"
                className="bell-icon"
            >
        <g
          fill="#e6e6e6"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{mixBlendMode: "normal"}}>
          <g transform="scale(8.53333,8.53333)">
            <path d="M17.99805,4c-2.0475,0 -4.09425,0.78175 -5.65625,2.34375l-1.98633,1.98438c-1.124,1.124 -2.45997,1.9997 -3.91797,2.5957l12.63672,12.63672c0.596,-1.458 1.4717,-2.79297 2.5957,-3.91797l1.98633,-1.98633c2.66872,-2.66872 3.04906,-6.75023 1.1582,-9.83203c0.72028,-0.32115 1.18459,-1.03559 1.18555,-1.82422c0,-1.10457 -0.89543,-2 -2,-2c-0.78863,0.00096 -1.50307,0.46527 -1.82422,1.18555c-1.27837,-0.78473 -2.72648,-1.18555 -4.17773,-1.18555zM3.99023,10.99023c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l5.42383,5.42383c-1.02287,0.33743 -1.71464,1.29205 -1.7168,2.36914c0,1.38071 1.11929,2.5 2.5,2.5c1.07729,-0.00104 2.03276,-0.69206 2.37109,-1.71484l5.42188,5.42188c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-14,-14c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274z"></path>
          </g>
        </g>
      </svg>
          </button>
          {showDropdown && (
            <div className="admin-dropdown">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  // <div key={index} className="dropdown-item">
                  //   {note.message}
                  // </div>
                  <div key={note.notificationID} className="admin-dropdown-item">
                    <span>{note.message}</span>
                    <button
                      className="admin-delete-button"
                      onClick={() => deleteNotification(note.notificationID)}
                    >
                      ✖
                    </button>
                  </div>
                ))
              ) : (
                <div className="admin-dropdown-item">No notifications</div>
              )}
            </div>
          )}
        </div>
        <button className="admin-logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
 
export default AdminNavbar;