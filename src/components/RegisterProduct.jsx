// src/components/RegisterProduct.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const BASE = import.meta.env.VITE_API_BASE_URL;

  // Check if user is a registered seller
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    const checkSellerStatus = async () => {
      try {
        const res = await axios.get(`${BASE}/seller/seller-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Seller details response:", res.data);

        // Check if seller exists based on '_id'
        const seller = res.data?.data;

        // If there is no '_id', the seller is not registered
        if (!seller || !seller._id) {
          navigate("/seller/register");
        }
      } catch (err) {
        console.error("Seller check failed:", err);
        navigate("/seller/register");
      }
    };

    checkSellerStatus();
  }, [token, BASE, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !description || !price || !stock || !category) {
      setError("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(`${BASE}/product/register-product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product registered successfully!");
      // Optionally clear form or redirect
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Failed to register product. Try again."
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Register New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Games">Games</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="TV">TV</option>
            <option value="Fridge">Fridge</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Product Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
        >
          Register Product
        </button>
      </form>
    </div>
  );
}
