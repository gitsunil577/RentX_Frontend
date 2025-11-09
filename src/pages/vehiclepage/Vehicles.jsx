import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Get the base API URL from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null);     // Added error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true); // Start loading
            setError(null);   // Reset error state

            // Check if the API base URL is defined
            if (!API_BASE_URL) {
                setError("API base URL is not configured. Check VITE_API_BASE_URL.");
                console.error("VITE_API_BASE_URL is not defined.");
                setLoading(false);
                return;
            }

            try {
                // Construct the full API endpoint
                const apiUrl = `${API_BASE_URL}/vehicle/all-vehicles`;
                console.log("Fetching vehicles from:", apiUrl); // Optional: debug log

                const res = await axios.get(apiUrl); // Use constructed URL

                if (res.data && Array.isArray(res.data.data)) {
                    setProducts(res.data.data);
                } else {
                    console.error("Unexpected API response structure:", res.data);
                    setError("Failed to fetch vehicles: Unexpected data format.");
                }
            } catch (fetchError) {
                console.error("Error fetching vehicles:", fetchError);
                setError(`Failed to fetch vehicles. ${fetchError.response?.data?.message || fetchError.message}`);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchAllProducts();
    }, []); // Empty dependency array means this runs once on mount

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
                                onClick={() => navigate(`/vehicle/${product._id}`)}
                                className="cursor-pointer group relative"
                            >
                                {/* Glowing border effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

                                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden h-full">
                                    {/* Product Image */}
                                    <div className="relative w-full h-60 overflow-hidden">
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
                                                ₹{product.price ? product.price.toFixed(2) : 'N/A'}
                                            </span>
                                            <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30">
                                                {product.categoryID?.name || 'Category'}
                                            </span>
                                        </div>

                                        {/* View Details Button */}
                                        <div className="mt-5">
                                            <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-center font-semibold py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden group/btn">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                                <span className="relative">View Details</span>
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

export default Products;