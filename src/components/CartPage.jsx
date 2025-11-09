import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../api/axiosInstance";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${BASE}/cart/remove-cart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });
      setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.post(
        `${BASE}/cart/update-quantity`,
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const incrementQuantity = (productId) => {
    const current = cartItems.find((i) => i.productId === productId)?.quantity;
    handleQuantityChange(productId, current + 1);
  };

  const decrementQuantity = (productId) => {
    const current = cartItems.find((i) => i.productId === productId)?.quantity;
    if (current > 1) {
      handleQuantityChange(productId, current - 1);
    }
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotal();
  
    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      alert("Invalid total amount. Cannot proceed to payment.");
      return;
    }
  
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load.");
      return;
    }
  
    try {
      const { data } = await axiosInstance.post(`${BASE}/payments/create-order`, {
        amount: Math.round(totalAmount * 100),
      });
  
      const order = data?.order;
  
      if (!order?.id) {
        alert("Failed to create payment order.");
        return;
      }
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Rental Store",
        description: "Payment for rental products",
        handler: async (response) => {
          try {
            const verify = await axiosInstance.post(`${BASE}/payments/verify-payment`, response);
            alert("✅ Payment successful and verified!");
            setCartItems([]);
            navigate("/order-success");
          } catch (error) {
            alert("Payment succeeded but verification failed.");
          }
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
  
      rzp.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description || "Something went wrong."}`);
      });
  
      rzp.open();
    } catch (error) {
      alert("Failed to initiate payment. Please try again.");
    }
  };
  
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-teal-100 to-green-100">
        <div className="text-center">
          <svg className="animate-spin h-14 w-14 mx-auto text-teal-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-xl text-gray-600">Loading your refreshing cart…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-teal-100 to-green-100">
        <div className="text-center">
          <svg className="h-14 w-14 mx-auto text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938-9.414a2 2 0 00-2.828 2.828L11.828 15.172a2 2 0 002.828-2.828L5.86 5.86z" />
          </svg>
          <p className="text-2xl text-red-600 font-bold">{error}</p>
          {error.includes("log in") && (
            <Link to="/login" className="text-teal-600 hover:underline mt-3 block">
              Return to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-teal-100 to-green-100 min-h-screen p-8 text-gray-800">
      <div className="container mx-auto mt-12">
        <div className="bg-teal-600 text-white py-8 px-10 rounded-t-lg shadow-md mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="mr-3 text-white">🌿</span> Your Serene Cart
          </h1>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
          <div className="p-8">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600 mb-6">Your cart is peacefully empty.</p>
                <Link to="/products" className="inline-block px-8 py-4 bg-teal-500 text-white rounded-full font-bold text-lg hover:bg-teal-600">
                  Find Some Green Goodies!
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="bg-white rounded-lg shadow-md border border-gray-200">
                      <div className="flex items-center p-6">
                        <div className="w-48 h-48 mr-10 overflow-hidden rounded-lg shadow-sm">
                          <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-2xl font-semibold text-teal-600 mb-3">{item.productName}</h2>
                          <p className="text-gray-600 text-lg mb-3">
                            Price: <span className="font-semibold text-gray-800">₹{item.price}</span>
                          </p>
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.productId}`} className="mr-4 text-gray-700 font-semibold text-lg">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                              <button onClick={() => decrementQuantity(item.productId)} className="px-4 py-2 hover:bg-gray-100">
                                <MinusIcon className="h-6 w-6" />
                              </button>
                              <input
                                type="number"
                                id={`quantity-${item.productId}`}
                                className="w-20 text-center bg-white border-l border-r border-gray-300 focus:outline-none"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val) && val > 0) handleQuantityChange(item.productId, val);
                                }}
                                min="1"
                              />
                              <button onClick={() => incrementQuantity(item.productId)} className="px-4 py-2 hover:bg-gray-100">
                                <PlusIcon className="h-6 w-6" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-2xl font-bold text-teal-600">₹{item.price * item.quantity}</p>
                          <button onClick={() => handleRemoveItem(item.productId)} className="text-red-500 hover:text-red-600 mt-4 flex items-center">
                            <TrashIcon className="h-6 w-6 mr-2" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-6">Order Summary</h2>
                    <div className="flex justify-between text-gray-600 mb-4 text-lg">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-800">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-6 text-lg">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-800">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-300 pt-6">
                      <div className="flex justify-between text-3xl font-bold text-teal-600 mb-8">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className={`w-full rounded-full py-4 text-xl font-semibold transition duration-200 ${
                          cartItems.length === 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-teal-500 text-white hover:bg-teal-600"
                        }`}
                      >
                        Proceed to Checkout
                      </button>
                      <Link to="/products" className="block mt-6 text-center text-gray-600 hover:underline text-lg">
                        Continue Browsing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
