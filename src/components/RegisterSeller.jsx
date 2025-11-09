// src/components/RegisterSeller.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterSeller() {
  const [storeName, setStoreName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const BASE = import.meta.env.VITE_API_BASE_URL;

  // If not logged in at all, redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { storeName, gstNumber, address };
      await axios.post(`${BASE}/seller/register-seller`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If registration successful, go to product register page
      navigate("/product/register");

    } catch (err) {
      console.error("Seller registration failed:", err);

      const errorMsg = err.response?.data?.message;

      if (
        errorMsg &&
        (errorMsg.includes("Seller already Exists") ||
         errorMsg.includes("already exists"))
      ) {
        // Redirect to product registration if seller already exists
        navigate("/product/register");
      } else {
        // Otherwise, show error
        setError(
          errorMsg || "Failed to register as seller. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Become a Seller</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">GST Number</label>
          <input
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Register as Seller
        </button>
      </form>
    </div>
  );
}
