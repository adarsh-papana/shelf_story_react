
// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API requests
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import "./Login.css"; // Import CSS for styling


// const Register = () => {
//   const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user", // Default role
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     console.log("Sending request to backend:", formData); // Debugging

//     try {
//       if (isRegistering) {
//         // Registration API call
//         const response = await axios.post("https://localhost:7274/api/User/register", formData);
//         console.log("Registration response:", response.data);
//         setSuccess("Registration successful! You can now log in.");
//         setIsRegistering(false); // Switch back to login form
//       } else {
//         // Login API call
//         const response = await axios.post("https://localhost:7274/api/User/authentication", {
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         });
//         console.log("Login response:", response.data);
//         setSuccess("Login successful!");
//         navigate("/dashboard", { state: { user: response.data.user } }); // Navigate to dashboard
//       }
//     } catch (err) {
//       console.error("Error response:", err.response);
//       setError(err.response?.data?.message || (isRegistering ? "Registration failed" : "Login failed"));
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h2>{isRegistering ? "Register" : "Login"}</h2>
//           {isRegistering && (
//             <div className="input-field">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Enter your name</label>
//             </div>
//           )}
//           <div className="input-field">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your email</label>
//           </div>
//           <div className="input-field">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your password</label>
//           </div>
//           <div className="input-field">
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="role-select"
//               required
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="manager">Manager</option>
//             </select>
//             <label>Select your role</label>
//           </div>
//           <button type="submit">{isRegistering ? "Register" : "Log In"}</button>
//           {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
//         </form>
//         <div className="toggle-form">
//           <p>
//             {isRegistering
//               ? "Already have an account? "
//               : "Don't have an account? "}
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsRegistering(!isRegistering); // Toggle between login and registration
//                 setError("");
//                 setSuccess("");
//               }}
//             >
//               {isRegistering ? "Log In" : "Register"}
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Register.css"; // Import CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer", // Default role
  });

  const [error, setError] = useState(""); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update formData state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Send registration request to backend
      const response = await axios.post("https://localhost:7274/api/User/register", formData);
      console.log("Registration successful:", response.data); // Log the response
      setSuccess("Registration successful! You can now log in."); // Set success message
      alert("Details updated successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Registration failed:", err.response); // Log the error response
      setError(err.response?.data?.message || "Registration failed"); // Set error message
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
              <option value="admin">Admin</option>
            </select>
            <label>Select your role</label>
          </div>
          {/* Submit button */}
          <button className="button-register" type="submit">Register</button>
          {/* Display error message */}
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
          {/* Display success message */}
          {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
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






// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API requests
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import "./Register.css"; // Import CSS for styling

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "", // User's name
//     email: "", // User's email
//     password: "", // User's password
//     role: "user", // Default role
//   });

//   const [error, setError] = useState(""); // State to store error messages
//   const [success, setSuccess] = useState(""); // State to store success messages
//   const navigate = useNavigate(); // Initialize useNavigate for navigation

//   // Handle input field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value }); // Update formData state
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     setError(""); // Clear previous errors
//     setSuccess(""); // Clear previous success messages

//     try {
//       // Send registration request to backend
//       const response = await axios.post("https://localhost:7274/api/User/register", formData);
//       console.log("Registration successful:", response.data); // Log the response
//       setSuccess("Registration successful! You can now log in."); // Set success message
//       navigate("/login"); // Redirect to login page after successful registration
//     } catch (err) {
//       console.error("Registration failed:", err.response); // Log the error response
//       setError(err.response?.data?.message || "Registration failed"); // Set error message
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h2>Register</h2>
//           {/* Input field for name */}
//           <div className="input-field">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your name</label>
//           </div>
//           {/* Input field for email */}
//           <div className="input-field">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your email</label>
//           </div>
//           {/* Input field for password */}
//           <div className="input-field">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your password</label>
//           </div>
//           {/* Dropdown for role selection */}
//           <div className="input-field">
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="role-select"
//               required
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="manager">Manager</option>
//             </select>
//             <label>Select your role</label>
//           </div>
//           {/* Submit button */}
//           <button type="submit">Register</button>
//           {/* Display error message */}
//           {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           {/* Display success message */}
//           {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
//         </form>
//         {/* Link to navigate to login page */}
//         <div className="toggle-form">
//           <p>
//             Already have an account?{" "}
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default anchor behavior
//                 navigate("/login"); // Navigate to Login component
//               }}
//             >
//               Log In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;