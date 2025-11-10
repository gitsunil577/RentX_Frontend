// src/components/RegisterOwner.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStore, FaFileInvoice, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

export default function RegisterOwner() {
  const [storeName, setStoreName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");

    try {
      const payload = { storeName, gstNumber, address };
      await axios.post(`${BASE}/owner/register-owner`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Owner registered successfully! Redirecting...");

      // Fetch updated user data to get the ownerID
      try {
        const userResponse = await axios.get(`${BASE}/user/current-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUserData = userResponse.data?.data;

        if (updatedUserData) {
          // Update localStorage with the new user data including ownerID
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
          localStorage.setItem('user', JSON.stringify(updatedUserData));

          // Dispatch event to notify other components
          window.dispatchEvent(new Event('userDataUpdated'));

          console.log('✅ User data updated after owner registration:', updatedUserData);
        }
      } catch (fetchError) {
        console.error('Error fetching updated user data:', fetchError);
        // Continue anyway - route protection will handle it
      }

      // If registration successful, go to vehicle register page
      setTimeout(() => {
        navigate("/vehicle/register");
      }, 1500);

    } catch (err) {
      console.error("Owner registration failed:", err);

      const errorMsg = err.response?.data?.message;

      if (
        errorMsg &&
        (errorMsg.includes("Owner already Exists") ||
         errorMsg.includes("already exists"))
      ) {
        // Owner already exists, fetch user data and redirect
        try {
          const userResponse = await axios.get(`${BASE}/user/current-user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const updatedUserData = userResponse.data?.data;

          if (updatedUserData) {
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            window.dispatchEvent(new Event('userDataUpdated'));
          }
        } catch (fetchError) {
          console.error('Error fetching user data:', fetchError);
        }

        // Redirect to vehicle registration if owner already exists
        navigate("/vehicle/register");
      } else {
        // Otherwise, show error
        setError(
          errorMsg || "Failed to register as owner. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaUserTie className="text-4xl text-white" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Become an Owner</h2>
          <p className="text-lg text-blue-200/80">Register your business to start listing vehicles</p>
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
              {/* Store Name Input */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Store Name</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaStore className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                    placeholder="Your Store or Business Name"
                    className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  />
                </div>
              </div>

              {/* GST Number Input */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">GST Number</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaFileInvoice className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    required
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className="relative group/input">
                <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300 top-8"></div>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                  </div>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows="4"
                    placeholder="Your complete business address"
                    className="w-full pl-12 pr-4 pt-4 pb-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500 resize-none"
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
                  Register as Owner
                  <FaUserTie className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
