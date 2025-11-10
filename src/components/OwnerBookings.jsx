import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaCar, FaRupeeSign, FaUser, FaEnvelope, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const fetchOwnerBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Please login to view bookings");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/booking/owner-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.data) {
        setBookings(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching owner bookings:", err);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdatingStatus(bookingId);
      const token = localStorage.getItem("accessToken");

      const response = await axios.put(
        `${API_BASE_URL}/booking/update-status/${bookingId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking status updated to ${newStatus}`);
      fetchOwnerBookings(); // Refresh the list
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Confirmed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Ongoing":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-400";
      case "Pending":
        return "text-yellow-400";
      case "Refunded":
        return "text-purple-400";
      default:
        return "text-slate-400";
    }
  };

  const getAvailableStatusOptions = (currentStatus) => {
    const statusFlow = {
      Pending: ["Confirmed", "Cancelled"],
      Confirmed: ["Ongoing", "Cancelled"],
      Ongoing: ["Completed"],
      Completed: [],
      Cancelled: [],
    };
    return statusFlow[currentStatus] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-blue-300 animate-pulse">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-50"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-xl border border-red-500/50 text-center">
            <p className="text-2xl text-red-300 font-bold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 min-h-screen py-8 md:py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <FaCalendarAlt className="text-blue-400" />
              Vehicle Bookings
            </h1>
            <p className="text-slate-400 mt-2">Manage bookings for your vehicles</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {["Pending", "Confirmed", "Ongoing", "Completed", "Cancelled"].map((status) => {
            const count = bookings.filter((b) => b.status === status).length;
            return (
              <div key={status} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 text-center">
                  <p className={`text-2xl font-bold mb-1 ${getStatusColor(status).split(" ")[1]}`}>
                    {count}
                  </p>
                  <p className="text-xs text-slate-400">{status}</p>
                </div>
              </div>
            );
          })}
        </div>

        {bookings.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
              <div className="text-6xl mb-6">📋</div>
              <p className="text-2xl text-slate-300 mb-6">No bookings yet</p>
              <p className="text-slate-400">When customers book your vehicles, they will appear here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-4">
                    {/* Vehicle Image */}
                    <div className="w-full lg:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg bg-slate-800">
                      <img
                        src={booking.vehicleId?.image || "https://via.placeholder.com/200x200.png?text=No+Image"}
                        alt={booking.vehicleId?.name || "Vehicle"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-grow space-y-3">
                      {/* Vehicle Name and Status */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                            <FaCar className="text-blue-400" />
                            {booking.vehicleId?.name || "Unknown Vehicle"}
                          </h2>
                          <p className="text-sm text-slate-400 mt-1">
                            Booking ID: {booking._id.slice(-8)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className={`px-4 py-2 rounded-lg font-semibold text-sm border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            Payment: {booking.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <p className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                          <FaUser /> Customer Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-slate-300">
                            <span className="text-slate-500">Name:</span> {booking.userId?.fullname || booking.userId?.username}
                          </p>
                          {booking.userId?.email && (
                            <p className="text-slate-300 flex items-center gap-1">
                              <FaEnvelope className="text-slate-500" />
                              {booking.userId.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-slate-300">
                          <FaCalendarAlt className="text-green-400" />
                          <div>
                            <p className="text-xs text-slate-500">Rental Period</p>
                            <p className="text-sm">
                              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <FaCalendarAlt className="text-blue-400" />
                          <div>
                            <p className="text-xs text-slate-500">Duration</p>
                            <p className="text-sm font-semibold">
                              {booking.numberOfDays} day{booking.numberOfDays > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Locations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2 text-slate-300">
                          <FaMapMarkerAlt className="text-green-400 mt-1" />
                          <div>
                            <p className="text-xs text-slate-500">Pickup</p>
                            <p className="text-sm">{booking.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <FaMapMarkerAlt className="text-red-400 mt-1" />
                          <div>
                            <p className="text-xs text-slate-500">Return</p>
                            <p className="text-sm">{booking.returnLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount and Status Update */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 border-t lg:border-t-0 lg:border-l border-slate-700 pt-4 lg:pt-0 lg:pl-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-400 mb-1">Total Amount</p>
                        <p className="text-2xl md:text-3xl font-bold text-blue-400 flex items-center gap-1">
                          <FaRupeeSign className="text-xl" />
                          {booking.totalAmount?.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Booked on {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Status Update Dropdown */}
                      {getAvailableStatusOptions(booking.status).length > 0 && (
                        <div className="w-full lg:w-auto">
                          <p className="text-xs text-slate-400 mb-2">Update Status</p>
                          <select
                            disabled={updatingStatus === booking._id}
                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Change to...
                            </option>
                            {getAvailableStatusOptions(booking.status).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerBookings;
