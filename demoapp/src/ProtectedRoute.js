import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token"); // Check if the token exists
  console.log("Token in ProtectedRoute:", token); // Debugging log
  const role = localStorage.getItem("role"); // Get the user's role from localStorage
  if (!token) {
    // If no token, redirect to login page
    console.log("User not authenticated. Redirecting to login."); // Debugging log
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    // If the user's role is not allowed, redirect to a "Not Authorized" page or home
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children (protected content)
  console.log("User authenticated. Rendering protected content."); // Debugging log
  return children;
}

export default ProtectedRoute;