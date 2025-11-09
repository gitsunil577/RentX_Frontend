// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., http://localhost:8000/api/v1
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // <-- REQUIRED for cookies to be sent/received
});

export default axiosInstance;
