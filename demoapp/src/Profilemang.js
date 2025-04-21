import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for dynamic userId
import axios from "axios"; // Import Axios for API requests
import { jwtDecode } from "jwt-decode";  // Import jwt-decode
import "./Profilemang.css";

function Profilemang() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { userId } = useParams(); // Get userId dynamically from the route parameter
  const [userInfo, setUserInfo] = useState(null); // State to store user information
  const [error, setError] = useState(""); // State to store error messages
const [userID , setUserID] = useState(null); // State to store user ID  
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

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile Management</h1>
      {userInfo ? (
        <div className="profile-card">
          <div className="profile-icon">
            <img
              src="/profile-user.png"
              alt="Profile Icon"
            />
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
            
          </div>
        </div>
        ) : (
          <p>Loading user information...</p>
        )}
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      </div>
  );
}

export default Profilemang;