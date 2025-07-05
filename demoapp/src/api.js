import axios from "axios";

export const instance = axios.create({
  baseURL: "https://localhost:7274/api/User/authentication", // Change according to backend URL
  headers: {
    "Content-Type": "application/json",
  },
});