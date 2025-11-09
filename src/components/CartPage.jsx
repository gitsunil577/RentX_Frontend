import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaCalendarAlt, FaShieldAlt, FaUserTie, FaCar } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rentalDetails, setRentalDetails] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setError("You must be logged in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE}/cart/get-cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data?.data;
        setCartItems(Array.isArray(data) ? data : []);

        // Load rental details from localStorage
        const storedRentalDetails = JSON.parse(localStorage.getItem('rentalDetails') || '[]');
        setRentalDetails(storedRentalDetails);
      } catch (err) {
        console.error("Error fetching cart:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to load cart items.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, BASE]);

  // Get rental details for a specific vehicle
  const getRentalDetailsForVehicle = (vehicleId) => {
    return rentalDetails.find(r => r.vehicleId === vehicleId);
  };

  // Calculate total including rental days and additional options
  const calculateItemTotal = (item) => {
    const rental = getRentalDetailsForVehicle(item.vehicleId);
    if (rental) {
      return rental.totalPrice;
    }
    // Fallback to simple calculation if no rental details
    return item.price * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleRemoveItem = async (vehicleId) => {
    try {
      await axios.delete(`${BASE}/cart/remove-cart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { vehicleId },
      });
      setCartItems((prev) =>
        prev.filter((item) => item.vehicleId !== vehicleId)
      );

      // Also remove from rental details
      const updatedRentalDetails = rentalDetails.filter(r => r.vehicleId !== vehicleId);
      setRentalDetails(updatedRentalDetails);
      localStorage.setItem('rentalDetails', JSON.stringify(updatedRentalDetails));

      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const handleQuantityChange = async (vehicleId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.post(
        `${BASE}/cart/update-quantity`,
        { vehicleId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.vehicleId === vehicleId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const incrementQuantity = (vehicleId) => {
    const current = cartItems.find((i) => i.vehicleId === vehicleId)?.quantity;
    handleQuantityChange(vehicleId, current + 1);
  };

  const decrementQuantity = (vehicleId) => {
    const current = cartItems.find((i) => i.vehicleId === vehicleId)?.quantity;
    if (current > 1) {
      handleQuantityChange(vehicleId, current - 1);
    }
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotal();

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      toast.error("Invalid total amount. Cannot proceed to payment.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      const { data } = await axiosInstance.post(`${BASE}/payments/create-order`, {
        amount: Math.round(totalAmount * 100),
      });

      const order = data?.order;

      if (!order?.id) {
        toast.error("Failed to create payment order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "E-Rental System",
        description: "Payment for vehicle rental",
        handler: async (response) => {
          try {
            const verify = await axiosInstance.post(`${BASE}/payments/verify-payment`, response);
            toast.success("Payment successful and verified!");
            setCartItems([]);
            localStorage.removeItem('rentalDetails');
            navigate("/order-success");
          } catch (error) {
            toast.error("Payment succeeded but verification failed.");
          }
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9876543210",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description || "Something went wrong."}`);
      });

      rzp.open();
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-blue-300 animate-pulse">Loading your cart...</p>
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
            <p className="text-2xl text-red-300 font-bold mb-4">{error}</p>
            {error.includes("log in") && (
              <Link to="/login" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                Go to Login
              </Link>
            )}
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
              <FaCar className="text-blue-400" />
              Your Rental Cart
            </h1>
            <p className="text-slate-400 mt-2">Review your vehicle rentals and proceed to checkout</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
              <div className="text-6xl mb-6">🛒</div>
              <p className="text-2xl text-slate-300 mb-6">Your cart is empty</p>
              <Link
                to="/vehicles"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold text-lg transition-all"
              >
                Browse Vehicles
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const rental = getRentalDetailsForVehicle(item.vehicleId);
                return (
                  <div key={item.vehicleId} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
                        {/* Vehicle Image */}
                        <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.vehicleImage || 'https://via.placeholder.com/200x200.png?text=No+Image'}
                            alt={item.vehicleName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Vehicle Details */}
                        <div className="flex-grow">
                          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {item.vehicleName}
                          </h2>

                          <div className="space-y-2 mb-4">
                            <p className="text-slate-300">
                              <span className="text-slate-400">Price per day:</span>
                              <span className="font-semibold text-blue-400 ml-2">₹{item.price.toFixed(2)}</span>
                            </p>

                            {rental && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                  <FaCalendarAlt className="text-green-400" />
                                  <span>
                                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                  </span>
                                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs ml-2">
                                    {rental.rentalDays} day{rental.rentalDays > 1 ? 's' : ''}
                                  </span>
                                </div>

                                {rental.withInsurance && (
                                  <div className="flex items-center gap-2 text-sm text-green-400">
                                    <FaShieldAlt />
                                    <span>Insurance included (+₹{(item.price * 0.1 * rental.rentalDays).toFixed(2)})</span>
                                  </div>
                                )}

                                {rental.withDriver && (
                                  <div className="flex items-center gap-2 text-sm text-purple-400">
                                    <FaUserTie />
                                    <span>Driver included (+₹{(500 * rental.rentalDays).toFixed(2)})</span>
                                  </div>
                                )}

                                {rental.pickupLocation && (
                                  <p className="text-sm text-slate-400">
                                    <span className="font-medium">Pickup:</span> {rental.pickupLocation}
                                  </p>
                                )}
                              </>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-sm">Quantity:</span>
                            <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg overflow-hidden">
                              <button
                                onClick={() => decrementQuantity(item.vehicleId)}
                                className="px-3 py-2 hover:bg-slate-700 transition-colors text-white"
                              >
                                <FaMinus className="h-3 w-3" />
                              </button>
                              <input
                                type="number"
                                className="w-16 text-center bg-slate-800 border-l border-r border-slate-600 text-white focus:outline-none py-2"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val) && val > 0) handleQuantityChange(item.vehicleId, val);
                                }}
                                min="1"
                              />
                              <button
                                onClick={() => incrementQuantity(item.vehicleId)}
                                className="px-3 py-2 hover:bg-slate-700 transition-colors text-white"
                              >
                                <FaPlus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 mt-4 md:mt-0">
                          <div className="text-right">
                            <p className="text-sm text-slate-400 mb-1">Total</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-400">
                              ₹{calculateItemTotal(item).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.vehicleId)}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <FaTrash className="h-4 w-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>

                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-slate-300">
                        <span>Subtotal</span>
                        <span className="font-semibold text-white">₹{calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Tax (5%)</span>
                        <span className="font-semibold text-white">₹{calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Total Items</span>
                        <span>{cartItems.length}</span>
                      </div>
                    </div>

                    <hr className="border-slate-700 mb-6" />

                    <div className="flex justify-between text-xl md:text-2xl font-bold text-white mb-8">
                      <span>Total</span>
                      <span className="text-blue-400">₹{calculateTotal().toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0}
                      className={`w-full py-4 rounded-lg font-semibold text-lg transition-all mb-4 ${
                        cartItems.length === 0
                          ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-105"
                      }`}
                    >
                      Proceed to Checkout
                    </button>

                    <Link
                      to="/vehicles"
                      className="block text-center text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      Continue Browsing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
