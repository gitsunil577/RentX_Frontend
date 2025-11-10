import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCar, FaCalendarAlt, FaUserTie, FaRupeeSign } from "react-icons/fa";

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user authentication and get user info
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    const userData = localStorage.getItem("userData") || localStorage.getItem("user");
    if (userData) {
      try {
        setUserInfo(JSON.parse(userData));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      setVehicle(null);
      setError(null);

      if (!API_BASE_URL) {
        setError("API base URL is not configured.");
        return;
      }

      try {
        const apiUrl = `${API_BASE_URL}/vehicle/vehicleByID/${id}`;
        const res = await axios.get(apiUrl);

        if (res.data?.data) {
          setVehicle(res.data.data);
        } else {
          // Check if data object is empty but call was successful
          if (res.data && Object.keys(res.data).length === 0) {
            setError("Vehicle data is empty.");
          } else {
            setError("Vehicle data not found.");
          }
        }
      } catch (fetchError) {
        console.error("Error fetching vehicle:", fetchError);
        setError(
          fetchError.response?.data?.message ||
            fetchError.message ||
            "An error occurred while fetching the vehicle."
        );
      }
    };

    if (id) {
      fetchVehicle();
    } else {
      setError("No vehicle ID provided.");
    }
  }, [id]);

  if (!vehicle && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <p className="text-2xl font-semibold text-blue-300 animate-pulse">
          Loading vehicle...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-50"></div>
          <p className="relative text-xl text-red-300 bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-red-500/50 text-center">
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-50"></div>
          <p className="relative text-xl text-slate-300 bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 text-center">
            Vehicle not found or could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Flex container for responsive layout */}
            <div className="flex flex-col md:flex-row">
              {/* Vehicle Image Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 bg-slate-800/50 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                <img
                  src={
                    vehicle.image ||
                    "https://via.placeholder.com/600x600.png?text=No+Image"
                  }
                  alt={vehicle.name}
                  className="w-full h-auto max-w-full max-h-[500px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                />
              </div>

              {/* Vehicle Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <FaCar className="text-blue-400" />
                    <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                      {vehicle.categoryID?.name || "General Category"}
                    </p>
                  </div>

                  {/* Vehicle Name */}
                  <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-white leading-tight">
                    {vehicle.name}
                  </h1>

                  {/* Price with Per Day */}
                  <div className="flex items-center gap-2 mb-6">
                    <FaRupeeSign className="text-blue-400 text-2xl" />
                    <p className="text-3xl font-bold text-blue-400">
                      {vehicle.price?.toFixed(2) || "Price Unavailable"}
                      <span className="text-lg text-slate-400 font-normal ml-2">/day</span>
                    </p>
                  </div>

                  {/* Availability Status */}
                  <div className="mb-6">
                    <p
                      className={`font-semibold inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        vehicle.stock > 0
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      <FaCalendarAlt />
                      {vehicle.stock > 0
                        ? `Available for Rent`
                        : "Not Available"}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-8 leading-relaxed text-base md:text-lg">
                    {vehicle.description}
                  </p>

                  {/* Owner Information */}
                  <hr className="my-6 border-slate-700" />
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-purple-400" />
                      <p className="text-slate-400">
                        <span className="font-medium text-slate-200">Owner:</span>{" "}
                        <span className="text-purple-400">{vehicle.ownerID?.storeName || "Unknown Owner"}</span>
                      </p>
                    </div>
                    {vehicle.ownerID?.gstNumber && (
                      <p className="text-slate-400 ml-6">
                        <span className="font-medium text-slate-200">GSTIN:</span>{" "}
                        {vehicle.ownerID.gstNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Conditional Booking Actions */}
                <div className="mt-auto pt-6">
                  {/* Check if this is the owner's own vehicle */}
                  {isAuthenticated && userInfo?.ownerID && vehicle.ownerID?._id === userInfo.ownerID ? (
                    // This is the owner's own vehicle
                    <div className="border-2 border-orange-500/50 bg-orange-500/10 p-6 rounded-xl backdrop-blur-sm">
                      <div className="font-bold text-orange-400 text-lg mb-3 flex items-center gap-2">
                        <FaUserTie />
                        Your Vehicle
                      </div>
                      <p className="text-orange-300 text-sm mb-4 leading-relaxed">
                        This is your listed vehicle. You cannot book your own vehicles. However, you can book vehicles from other owners!
                      </p>
                      <button
                        onClick={() => navigate("/vehicles")}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02]"
                      >
                        Browse Other Vehicles
                      </button>
                    </div>
                  ) : isAuthenticated && vehicle.stock > 0 ? (
                    // Authenticated user (Buyer or Owner) viewing other vehicles
                    <button
                      onClick={() => navigate(`/vehicles`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                    >
                      <FaCalendarAlt className="text-xl" />
                      Book This Vehicle
                    </button>
                  ) : isAuthenticated && vehicle.stock <= 0 ? (
                    // Vehicle unavailable
                    <div className="border-2 border-red-500/50 bg-red-500/10 p-6 rounded-xl backdrop-blur-sm">
                      <div className="font-bold text-red-400 text-lg mb-2">
                        Vehicle Not Available
                      </div>
                      <p className="text-red-300 text-sm">
                        This vehicle is currently not available for rent. Please check back later or browse other vehicles.
                      </p>
                    </div>
                  ) : (
                    // Not authenticated
                    <div className="border-2 border-blue-500/50 bg-blue-500/10 p-6 rounded-xl backdrop-blur-sm">
                      <div className="font-bold text-blue-400 text-lg mb-3">
                        Login to Book
                      </div>
                      <p className="text-blue-300 text-sm mb-4">
                        Please log in to your account to book this vehicle.
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02]"
                      >
                        Login Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
