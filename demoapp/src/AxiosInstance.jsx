// import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: "https://localhost:7274/api", // Base URL for your API
// });

// // Add a request interceptor to attach the token
// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Retrieve token from localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error); // Handle request errors
//   }
// );

// export default AxiosInstance;

// ...existing code...
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://localhost:7274/api", // Base URL for your API
});
// ...existing code...
// Add logging + robust header injection + global auth-failure handler
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // prefer bracket notation to avoid case issues
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Debug: ensure header/value are what you expect
    console.debug("Axios Request:", config.method?.toUpperCase(), config.url, "Auth:", config.headers?.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.warn("API returned", status, "- clearing auth and redirecting to /login");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      // Force a fresh login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;