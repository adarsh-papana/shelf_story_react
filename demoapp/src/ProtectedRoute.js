import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Check if the token exists
  console.log("Token in ProtectedRoute:", token); // Debugging log
  if (!token) {
    // If no token, redirect to login page
    console.log("User not authenticated. Redirecting to login."); // Debugging log
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children (protected content)
  console.log("User authenticated. Rendering protected content."); // Debugging log
  return children;
}

export default ProtectedRoute;