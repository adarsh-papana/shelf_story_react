// // import React, { useState } from "react";
// // import axios from "axios"; // Import Axios for API requests
// // import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// // import "./Login.css"; // Import CSS for styling
// // // import "./Update.css"; // Import CSS for styling
// // const Update = () => {
// //   const [formData, setFormData] = useState({
// //     newPassword: "", // State to store the new password
// //   });

// //   const [error, setError] = useState(""); // State to store error messages
// //   const [success, setSuccess] = useState(""); // State to store success messages

// //   // Handle input field changes
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     console.log("Sending password update request:", formData); // Debugging
// //     try {
// //       // Send password update request to backend
// //       const response = await axios.put("https://localhost:7274/api/User/Update-Details", formData);
// //       console.log("Password updated successfully:", response.data);
// //       setSuccess("Password updated successfully!");
// //     } catch (err) {
// //       console.error("Error updating password:", err.response);
// //       setError(err.response?.data?.message || "Failed to update password");
// //     }
// //   };
// //   return (
// //     <div className="update-wrapper">
// //       <div className="wrapper">
// //         <form onSubmit={handleSubmit}>
// //           <h2>Update Password</h2>
// //           {/* Input field for new password */}
// //           <div className="input-field">
// //             <input
// //               type="password"
// //               name="newPassword"
// //               value={formData.newPassword}
// //               onChange={handleChange}
// //               required
// //             />
// //             <label>Enter your new password</label>
// //           </div>
// //           {/* Submit button */}
// //           <button type="submit">Update Password</button>
// //           {/* Display error message */}
// //           {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
// //           {/* Display success message */}
// //           {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
// //         </form>
// //         </div>
// //     </div>
// //   );
// // };

// // export default Update;


// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API requests
// import "./Update.css"; // Import CSS for styling

// const Update = () => {
//   const [formData, setFormData] = useState({
//     email: "", // Email field
//     newPassword: "", // New password field
//   });

//   const [error, setError] = useState(""); // State to store error messages
//   const [success, setSuccess] = useState(""); // State to store success messages

//   // Handle input field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     console.log("Sending update request:", formData); // Debugging
//     try {
//       // Send update request to backend
//       const response = await axios.put("https://localhost:7274/api/User/Update-Details", formData);
//       console.log("Details updated successfully:", response.data);
//       setSuccess("Details updated successfully!");
//     } catch (err) {
//       console.error("Error updating details:", err.response);
//       setError(err.response?.data?.message || "Failed to update details");
//     }
//   };

//   return (
//     <div className="update-wrapper">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h2>Update Details</h2>
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
//           {/* Input field for new password */}
//           <div className="input-field">
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your new password</label>
//           </div>
//           {/* Submit button */}
//           <button type="submit">Update Details</button>
//           {/* Display error message */}
//           {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           {/* Display success message */}
//           {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Update;

// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API requests
// import "./Update.css"; // Import CSS for styling

// const Update = () => {
//   const [formData, setFormData] = useState({
//     email: "", // Email field
//     newPassword: "", // New password field
//   });

//   const [error, setError] = useState(""); // State to store error messages
//   const [success, setSuccess] = useState(""); // State to store success messages

//   // Handle input field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     console.log("Form data being sent:", formData); // Debugging

//     try {
//       // Send update request to backend
//       const response = await axios.put("https://localhost:7274/api/User/Update-Details", formData);
//       console.log("Details updated successfully:", response.data);
//       setSuccess("Details updated successfully!");
//     } catch (err) {
//       console.error("Error updating details:", err.response);
//       setError(err.response?.data?.message || "Failed to update details");
//     }
//   };

//   return (
//     <div className="update-wrapper">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h2>Update Details</h2>
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
//           {/* Input field for new password */}
//           <div className="input-field">
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               required
//             />
//             <label>Enter your new password</label>
//           </div>
//           {/* Submit button */}
//           <button type="submit">Update Details</button>
//           {/* Display error message */}
//           {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//           {/* Display success message */}
//           {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Update;


import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests
import "./Update.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Update = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    email: "", // Email field
    newPassword: "", // New password field
  });

  const [error, setError] = useState(""); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Send update request to backend
      const response = await axios.put(
        `https://localhost:7274/api/User/Update-Details?email=${formData.email}`, // Pass email as query parameter
        formData.newPassword, // Send newPassword as the request body
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );
      console.log("Details updated successfully:", response.data);
      setSuccess("Details updated successfully!");
      alert("Details updated successfully!");
      navigate("/Login"); // Redirect to login page after successful update
      
    } catch (err) {
      console.error("Error updating details:", err.response);
      setError(err.response?.data?.message || "Failed to update details");
    }
  };

  return (
    <div className="update-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Update Details</h2>
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
          {/* Input field for new password */}
          <div className="input-field">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <label>Enter your new password</label>
          </div>
          {/* Submit button */}
          <button className="update-button" type="submit">Update Details</button>
            {/* Back to Login button */}
            <div className="toggle-form">
          <p>
            Go back to?{" "}
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
          {/* Display error message */}
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
          {/* Display success message */}
          {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default Update;