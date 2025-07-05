import React, { useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Register.css"; // Import CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer", // Default role
  });

  const [errors, setErrors] = useState({}); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Validate inputs
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        else if (value.length < 3)
          error = "Name cannot be shorter than 3 characters.";
        else if (value.length > 50)
          error = "Name cannot be longer than 50 characters.";
        else if (!/^[a-zA-Z]*$/.test(value))
          error = "Only alphabets are allowed in name.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (value.length < 3)
          error = "Email cannot be shorter than 3 characters.";
        else if (value.length > 50)
          error = "Email cannot be longer than 50 characters.";
        else if (!/^[^@\s]+@gmail\.com$/.test(value))
          error = "Email must be a Gmail address.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 8)
          error = "Password must be at least 8 characters long.";
        else if (value.length > 50)
          error = "Password cannot be longer than 50 characters.";
        else if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        )
          error =
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        break;
      case "role":
        if (!value) error = "Role is required.";
        else if (value.length < 3)
          error = "Role cannot be shorter than 3 characters.";
        else if (value.length > 10)
          error = "Role cannot be longer than 10 characters.";
        else if (!/^[a-zA-Z]*$/.test(value))
          error = "Only alphabets are allowed in role.";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input field changes

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({ ...formData, [name]: value }); // Update formData state
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error }); // Update errors state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSuccess(""); // Clear previous success messages

    // Check for any remaining errors
    const validationErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send registration request to backend
      const response = await AxiosInstance.post(
        "/User/register",
        formData
      );
      console.log("Registration successful:", response.data); // Log the response
      setSuccess("Registration successful! You can now log in."); // Set success message
      alert("Details updated successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Registration failed:", err.response); // Log the error response
      setErrors({
        ...errors,
        form: err.response?.data?.message || "Registration failed",
      }); // Set error message
    }
  };

  return (
    <div className="register-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          {/* Input field for name */}
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Enter your name</label>
            {errors.name && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.name}
              </div>
            )}
          </div>
          {/* Input field for email */}
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Enter your email</label>
            {errors.email && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.email}
              </div>
            )}
          </div>
          {/* Input field for password */}
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Enter your password</label>
            {errors.password && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.password}
              </div>
            )}
          </div>
          {/* Dropdown for role selection */}
          <div className="input-field">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
              required
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
            <label>Select your role</label>
            {errors.role && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.role}
              </div>
            )}
          </div>
          {/* Submit button */}
          <button className="button-register" type="submit">
            Register
          </button>
          {/* Display form error message */}
          {errors.form && (
            <div style={{ color: "red", marginTop: "10px" }}>{errors.form}</div>
          )}
          {/* Display success message */}
          {success && (
            <div style={{ color: "green", marginTop: "10px" }}>{success}</div>
          )}
        </form>
        {/* Link to navigate to login page */}
        <div className="toggle-form">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                navigate("/login"); // Navigate to Login component
              }}
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
