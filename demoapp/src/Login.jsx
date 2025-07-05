import React, { useState } from "react";
import axios from "axios"; // Import axios instance
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Import the CSS file for styling
import Update from "./Update"; // Import Update component
import Dashboard from "./Dashboard";
import InventoryPage from "./components/InventoryPage";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Sending request to backend:", formData); // Debugging

    try {
      localStorage.clear();
      const response = await axios.post(
        "https://localhost:7274/api/User/authentication",
        formData
      );
      console.log("Response received:", response.data);
      setSuccess("Login successful!");
      localStorage.setItem("token", response.data);
      const decodedToken = JSON.parse(atob(response.data.split(".")[1]));
      const role = decodedToken.role;
      localStorage.setItem("role", role);
      console.log("Login successful:", response.data);

      if (role === "Admin") {
        navigate("/inventory", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Error response:", err.response);
      // alert("Enter valid credentials");
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleRegisterClick = () => {
    navigate("/Register"); // Navigate to Register component
  };

  const handleForgotPasswordClick = () => {
    navigate("/Update"); // Navigate to Forgot Password component
  };

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <a href="#" onClick={handleForgotPasswordClick}>
              Forgot password?
            </a>
          </div>
          <button className="submit-button" type="submit">
            Log In
          </button>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
          <div className="register">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={handleRegisterClick}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
