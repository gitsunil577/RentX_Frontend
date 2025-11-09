import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes, FaCalendarAlt, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";

// Get the base API URL from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRentalModal, setShowRentalModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [rentalData, setRentalData] = useState({
        startDate: '',
        endDate: '',
        withInsurance: false,
        withDriver: false,
        pickupLocation: '',
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userOwnerId, setUserOwnerId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user info from localStorage
        const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
        if (userInfo) {
            setUserType(userInfo.typeOfCustomer);
            setUserOwnerId(userInfo.ownerID);
        }

        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);

            if (!API_BASE_URL) {
                setError("API base URL is not configured. Check VITE_API_BASE_URL.");
                console.error("VITE_API_BASE_URL is not defined.");
                setLoading(false);
                return;
            }

            try {
                const apiUrl = `${API_BASE_URL}/vehicle/all-vehicles`;
                console.log("Fetching vehicles from:", apiUrl);

                const res = await axios.get(apiUrl);

                if (res.data && Array.isArray(res.data.data)) {
                    let vehicleList = res.data.data;

                    // Filter out owner's own vehicles if user is an owner
                    if (userInfo && userInfo.typeOfCustomer === "Owner" && userInfo.ownerID) {
                        vehicleList = vehicleList.filter(vehicle =>
                            vehicle.ownerID?._id !== userInfo.ownerID
                        );
                    }

                    setProducts(vehicleList);
                } else {
                    console.error("Unexpected API response structure:", res.data);
                    setError("Failed to fetch vehicles: Unexpected data format.");
                }
            } catch (fetchError) {
                console.error("Error fetching vehicles:", fetchError);
                setError(`Failed to fetch vehicles. ${fetchError.response?.data?.message || fetchError.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // Calculate rental days
    const calculateRentalDays = () => {
        if (!rentalData.startDate || !rentalData.endDate) return 0;
        const start = new Date(rentalData.startDate);
        const end = new Date(rentalData.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1; // Minimum 1 day
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        if (!selectedVehicle) return 0;
        const days = calculateRentalDays();
        let total = selectedVehicle.price * days;

        // Add insurance cost (10% of base price per day)
        if (rentalData.withInsurance) {
            total += (selectedVehicle.price * 0.1 * days);
        }

        // Add driver cost (₹500 per day)
        if (rentalData.withDriver) {
            total += (500 * days);
        }

        return total;
    };

    // Open rental modal
    const handleRentNow = (product, e) => {
        e.stopPropagation();

        // Check if user is an owner - owners cannot rent vehicles
        if (userType === "Owner") {
            toast.info("Owners cannot rent vehicles. Switch to a customer account to book rentals.");
            return;
        }

        if (!product.stock || product.stock <= 0) {
            toast.error("This vehicle is not available for rent.");
            return;
        }

        setSelectedVehicle(product);
        setShowRentalModal(true);

        // Set default start date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setRentalData({
            startDate: tomorrow.toISOString().split('T')[0],
            endDate: '',
            withInsurance: false,
            withDriver: false,
            pickupLocation: '',
        });
    };

    // Close modal
    const closeRentalModal = () => {
        setShowRentalModal(false);
        setSelectedVehicle(null);
        setRentalData({
            startDate: '',
            endDate: '',
            withInsurance: false,
            withDriver: false,
            pickupLocation: '',
        });
    };

    // Handle rental booking submission
    const handleBookingSubmit = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Please login to book a vehicle.");
            return;
        }

        if (!rentalData.startDate || !rentalData.endDate) {
            toast.error("Please select start and end dates.");
            return;
        }

        if (new Date(rentalData.endDate) <= new Date(rentalData.startDate)) {
            toast.error("End date must be after start date.");
            return;
        }

        try {
            setBookingLoading(true);

            // For now, we'll add to cart with quantity 1
            // The rental details will be stored in localStorage for checkout
            const bookingPayload = {
                vehicleId: selectedVehicle._id,
                quantity: 1,
            };

            // Store rental details in localStorage for later use at checkout
            const rentalDetails = {
                vehicleId: selectedVehicle._id,
                vehicleName: selectedVehicle.name,
                vehicleImage: selectedVehicle.image,
                dailyPrice: selectedVehicle.price,
                startDate: rentalData.startDate,
                endDate: rentalData.endDate,
                withInsurance: rentalData.withInsurance,
                withDriver: rentalData.withDriver,
                pickupLocation: rentalData.pickupLocation,
                totalPrice: calculateTotalPrice(),
                rentalDays: calculateRentalDays(),
            };

            // Get existing rental details from localStorage
            const existingRentals = JSON.parse(localStorage.getItem('rentalDetails') || '[]');

            // Check if this vehicle already has rental details stored
            const existingIndex = existingRentals.findIndex(r => r.vehicleId === selectedVehicle._id);

            if (existingIndex > -1) {
                // Update existing rental details
                existingRentals[existingIndex] = rentalDetails;
            } else {
                // Add new rental details
                existingRentals.push(rentalDetails);
            }

            localStorage.setItem('rentalDetails', JSON.stringify(existingRentals));

            const res = await axios.post(
                `${API_BASE_URL}/cart/add-to-cart`,
                bookingPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data) {
                const days = calculateRentalDays();
                const total = calculateTotalPrice();
                toast.success(
                    `Vehicle added to cart!\n${days} day(s) rental - Total: ₹${total.toFixed(2)}`,
                    { autoClose: 4000 }
                );
                closeRentalModal();
            }
        } catch (err) {
            console.error("Booking error:", err);
            toast.error(err.response?.data?.message || "Error creating booking. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    // --- Loading State ---
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
                <p className="text-xl font-semibold text-blue-300 animate-pulse">
                    Loading Vehicles...
                </p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-50"></div>
                    <p className="relative text-center text-lg text-red-300 bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-red-500/50">
                        Error: {error}
                    </p>
                </div>
            </div>
        );
    }

    // --- Products Grid Display ---
    return (
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden w-full min-h-screen py-16 md:py-20 px-4 md:px-10">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

            <div className="relative z-10">
                {products.length === 0 ? (
                    <p className="text-center text-lg text-slate-400">No vehicles found.</p>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="group relative"
                            >
                                {/* Glowing border effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

                                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden h-full">
                                    {/* Product Image */}
                                    <div
                                        className="relative w-full h-60 overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/vehicle/${product._id}`)}
                                    >
                                        <img
                                            src={product.image || 'https://via.placeholder.com/400x300.png?text=No+Image'}
                                            alt={product.name || 'Vehicle Image'}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                                    </div>

                                    {/* Product Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-lg font-semibold text-white truncate mb-1" title={product.name}>
                                            {product.name}
                                        </h2>
                                        <p className="text-sm text-slate-400 mt-1 line-clamp-2 mb-3 flex-grow-0">
                                            {product.description}
                                        </p>

                                        {/* Price and Category Row */}
                                        <div className="mt-auto pt-3 flex items-center justify-between">
                                            <span className="text-blue-400 font-bold text-xl">
                                                ₹{product.price ? product.price.toFixed(2) : 'N/A'}<span className="text-sm text-slate-400">/day</span>
                                            </span>
                                            <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30">
                                                {product.categoryID?.name || 'Category'}
                                            </span>
                                        </div>

                                        {/* Availability Status */}
                                        <div className="mt-3">
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                product.stock > 0
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                                {product.stock > 0 ? 'Available' : 'Not Available'}
                                            </span>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => navigate(`/vehicle/${product._id}`)}
                                                className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white text-center font-semibold py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden group/btn border border-slate-600"
                                            >
                                                <span className="relative text-sm">View Details</span>
                                            </button>

                                            <button
                                                onClick={(e) => handleRentNow(product, e)}
                                                disabled={!product.stock || product.stock <= 0}
                                                className={`flex-1 text-center font-semibold py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${
                                                    product.stock > 0
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                }`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                <span className="relative text-sm">Rent Now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Rental Booking Modal */}
            {showRentalModal && selectedVehicle && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Glowing border effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-50"></div>

                        <div className="relative bg-slate-900 rounded-2xl border border-slate-700 p-6 md:p-8">
                            {/* Close Button */}
                            <button
                                onClick={closeRentalModal}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>

                            {/* Modal Header */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Book Your Rental
                            </h2>
                            <p className="text-blue-400 font-semibold text-lg mb-6">
                                {selectedVehicle.name}
                            </p>

                            {/* Vehicle Info */}
                            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 flex items-center gap-4">
                                <img
                                    src={selectedVehicle.image || 'https://via.placeholder.com/100x100.png?text=No+Image'}
                                    alt={selectedVehicle.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <p className="text-slate-300 text-sm">{selectedVehicle.categoryID?.name || 'Category'}</p>
                                    <p className="text-white font-bold text-xl">₹{selectedVehicle.price?.toFixed(2)} <span className="text-sm text-slate-400">/day</span></p>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-300 mb-2 text-sm font-medium">
                                            <FaCalendarAlt className="inline mr-2" />
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={rentalData.startDate}
                                            onChange={(e) => setRentalData({...rentalData, startDate: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-300 mb-2 text-sm font-medium">
                                            <FaCalendarAlt className="inline mr-2" />
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={rentalData.endDate}
                                            onChange={(e) => setRentalData({...rentalData, endDate: e.target.value})}
                                            min={rentalData.startDate || new Date().toISOString().split('T')[0]}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Pickup Location */}
                                <div>
                                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                                        <FaMapMarkerAlt className="inline mr-2" />
                                        Pickup Location (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={rentalData.pickupLocation}
                                        onChange={(e) => setRentalData({...rentalData, pickupLocation: e.target.value})}
                                        placeholder="Enter pickup address"
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-3 mb-6">
                                <label className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={rentalData.withInsurance}
                                        onChange={(e) => setRentalData({...rentalData, withInsurance: e.target.checked})}
                                        className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <FaShieldAlt className="text-green-400" />
                                            <span className="text-white font-medium">Add Insurance</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-1">+₹{(selectedVehicle.price * 0.1).toFixed(2)}/day (10% of rental price)</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={rentalData.withDriver}
                                        onChange={(e) => setRentalData({...rentalData, withDriver: e.target.checked})}
                                        className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium">Add Driver</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-1">+₹500/day</p>
                                    </div>
                                </label>
                            </div>

                            {/* Price Summary */}
                            {rentalData.startDate && rentalData.endDate && (
                                <div className="bg-slate-800/50 rounded-lg p-4 mb-6 space-y-2">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Rental Days:</span>
                                        <span className="font-semibold">{calculateRentalDays()} day(s)</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>Base Price:</span>
                                        <span>₹{(selectedVehicle.price * calculateRentalDays()).toFixed(2)}</span>
                                    </div>
                                    {rentalData.withInsurance && (
                                        <div className="flex justify-between text-slate-300">
                                            <span>Insurance:</span>
                                            <span>₹{(selectedVehicle.price * 0.1 * calculateRentalDays()).toFixed(2)}</span>
                                        </div>
                                    )}
                                    {rentalData.withDriver && (
                                        <div className="flex justify-between text-slate-300">
                                            <span>Driver:</span>
                                            <span>₹{(500 * calculateRentalDays()).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <hr className="border-slate-700" />
                                    <div className="flex justify-between text-white font-bold text-lg">
                                        <span>Total Price:</span>
                                        <span className="text-blue-400">₹{calculateTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={closeRentalModal}
                                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBookingSubmit}
                                    disabled={bookingLoading || !rentalData.startDate || !rentalData.endDate}
                                    className={`flex-1 font-semibold py-3 rounded-lg transition-all ${
                                        bookingLoading || !rentalData.startDate || !rentalData.endDate
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                                    }`}
                                >
                                    {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
