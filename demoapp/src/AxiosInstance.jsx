import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://localhost:7274/api", // Base URL for your API
});

// Add a request interceptor to attach the token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default AxiosInstance;