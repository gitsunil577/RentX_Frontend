// src/components/RegisterProduct.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCar, FaFileAlt, FaDollarSign, FaBoxes, FaList, FaImage } from "react-icons/fa";

export default function RegisterProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Cars");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const BASE = import.meta.env.VITE_API_BASE_URL;

  // Check if user is a registered owner
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    const checkOwnerStatus = async () => {
      try {
        const res = await axios.get(`${BASE}/owner/owner-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Owner details response:", res.data);

        // Check if owner exists based on '_id'
        const owner = res.data?.data;

        // If there is no '_id', the owner is not registered
        if (!owner || !owner._id) {
          navigate("/owner/register");
        }
      } catch (err) {
        console.error("Owner check failed:", err);
        navigate("/owner/register");
      }
    };

    checkOwnerStatus();
  }, [token, BASE, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

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

      await axios.post(`${BASE}/vehicle/register-vehicle`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Vehicle registered successfully!");
      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("Cars");
      setImageFile(null);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Failed to register vehicle. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaCar className="text-4xl text-white" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Register New Vehicle</h2>
          <p className="text-lg text-blue-200/80">Add your vehicle to the marketplace</p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>

          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 backdrop-blur-sm animate-shake">
                <p className="text-red-300 text-center text-sm font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 mb-6 backdrop-blur-sm animate-bounce-in">
                <p className="text-green-300 text-center text-sm font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Vehicle Name</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaCar className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g., Tesla Model 3, BMW X5"
                    className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FaFileAlt className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                    placeholder="Describe your vehicle features, condition, etc."
                    className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500 resize-none"
                  />
                </div>
              </div>

              {/* Price and Stock Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Input */}
                <div className="relative group/input">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Price (per day)</label>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaDollarSign className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      placeholder="0.00"
                      className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                    />
                  </div>
                </div>

                {/* Stock Input */}
                <div className="relative group/input">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Available Units</label>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaBoxes className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                      placeholder="0"
                      className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category Select */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaList className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500 appearance-none cursor-pointer"
                  >
                    <option value="Cars">Cars</option>
                    <option value="Bikes">Bikes</option>
                    <option value="Scooters">Scooters</option>
                    <option value="Bicycles">Bicycles</option>
                    <option value="SUVs">SUVs</option>
                    <option value="Trucks">Trucks</option>
                    <option value="Electric Vehicles">Electric Vehicles</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Vehicle Image (optional)</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FaImage className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group/btn relative w-full h-14 overflow-hidden rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-blue-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

                <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wider">
                  Register Vehicle
                  <FaCar className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }

        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
