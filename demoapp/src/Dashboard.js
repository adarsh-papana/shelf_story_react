import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const profilemanage = () => {
   
    navigate("/Profilemang"); // Navigate to Register component
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login on logout
  };
  return (
    <div>
      <h1>Welcome to the Admin Panel</h1>
      <p>You have successfully logged in!</p>
      <button onClick={profilemanage}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;