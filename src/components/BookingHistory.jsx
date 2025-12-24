import { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaCar, FaRupeeSign, FaTrash, FaEye, FaFileInvoice, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Please login to view your bookings");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/booking/user-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.data) {
        setBookings(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${API_BASE_URL}/booking/cancel-booking/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking cancelled successfully");
      fetchBookings(); // Refresh the list
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const handleDownloadInvoice = async (bookingId, invoiceNumber) => {
    try {
      const token = localStorage.getItem("accessToken");

      toast.info("Downloading invoice...");

      const response = await axios.get(
        `${API_BASE_URL}/booking/invoice/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob' // Important for PDF download
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Use invoice number for filename if available
      const filename = invoiceNumber
        ? `${invoiceNumber}.pdf`
        : `Invoice_${bookingId.slice(-8)}.pdf`;

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (err) {
      console.error("Error downloading invoice:", err);

      if (err.response?.status === 403) {
        toast.error("You are not authorized to download this invoice");
      } else if (err.response?.status === 400) {
        toast.error("Invoice not available. Payment must be completed first.");
      } else {
        toast.error(err.response?.data?.message || "Failed to download invoice");
      }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-blue-300 animate-pulse">Loading your bookings...</p>
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
              My Bookings
            </h1>
            <p className="text-slate-400 mt-2">View and manage your vehicle rental history</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
              <div className="text-6xl mb-6">📋</div>
              <p className="text-2xl text-slate-300 mb-6">No bookings yet</p>
              <a
                href="/vehicles"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold text-lg transition-all"
              >
                Browse Vehicles
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
                    {/* Vehicle Image */}
                    <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg bg-slate-800">
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

                      {/* Owner Info */}
                      {booking.ownerId && (
                        <div className="text-sm text-slate-400">
                          <span className="font-medium text-slate-300">Owner:</span>{" "}
                          {booking.ownerId.storeName}
                        </div>
                      )}

                      {/* Invoice Number - Show if available */}
                      {booking.invoiceNumber && (
                        <div className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2">
                          <FaFileInvoice className="text-blue-400" />
                          <div>
                            <span className="text-slate-400">Invoice: </span>
                            <span className="text-blue-300 font-mono font-semibold">{booking.invoiceNumber}</span>
                          </div>
                          <span className="text-green-400 text-xs ml-2">✓ Verified by RentX</span>
                        </div>
                      )}
                    </div>

                    {/* Amount and Actions */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-4">
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

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        {/* Download Invoice Button - Show for paid bookings */}
                        {booking.paymentStatus === "Paid" && (
                          <button
                            onClick={() => handleDownloadInvoice(booking._id, booking.invoiceNumber)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all border border-blue-500/30"
                          >
                            <FaDownload className="text-sm" />
                            <span className="text-sm font-medium">Download Invoice</span>
                          </button>
                        )}

                        {/* Cancel Button */}
                        {(booking.status === "Pending" || booking.status === "Confirmed") && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/30"
                          >
                            <FaTrash className="text-sm" />
                            <span className="text-sm">Cancel</span>
                          </button>
                        )}
                      </div>
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

export default BookingHistory;
