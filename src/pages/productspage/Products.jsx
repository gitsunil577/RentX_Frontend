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
                const apiUrl = `${API_BASE_URL}/product/all-products`;
                console.log("Fetching products from:", apiUrl); // Optional: debug log

                const res = await axios.get(apiUrl); // Use constructed URL

                if (res.data && Array.isArray(res.data.data)) {
                    setProducts(res.data.data);
                } else {
                    console.error("Unexpected API response structure:", res.data);
                    setError("Failed to fetch products: Unexpected data format.");
                }
            } catch (fetchError) {
                console.error("Error fetching products:", fetchError);
                setError(`Failed to fetch products. ${fetchError.response?.data?.message || fetchError.message}`);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchAllProducts();
    }, []); // Empty dependency array means this runs once on mount

    // --- Loading State ---
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">
                    Loading Products...
                </p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <p className="text-center text-lg text-red-700 bg-red-100 p-6 rounded-lg shadow">
                    Error: {error}
                </p>
            </div>
        );
    }

    // --- Products Grid Display ---
    return (
        <div className="bg-gray-50 min-h-screen py-16 md:py-20 px-4 md:px-10"> {/* Consistent background, more padding */}
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-16"> {/* More margin bottom */}
                🛒 Explore Our Products
            </h1>

            {products.length === 0 ? (
                 <p className="text-center text-lg text-gray-500">No products found.</p>
            ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Slightly adjusted gap */}
                    {products.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 group transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden" // Added overflow-hidden, lift effect, adjusted rounding
                        >
                            {/* Product Image */}
                            <div className="relative w-full h-60 overflow-hidden"> {/* Increased height */}
                                <img
                                    src={product.image || 'https://via.placeholder.com/400x300.png?text=No+Image'} // Fallback image
                                    alt={product.name || 'Product Image'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Ensure image fills container
                                />
                            </div>

                             {/* Product Content */}
                            <div className="p-5 flex flex-col flex-grow"> {/* flex-grow allows button to stick to bottom */}
                                <h2 className="text-lg font-semibold text-gray-900 truncate mb-1" title={product.name}> {/* Bolder title */}
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2 mb-3 flex-grow-0"> {/* Limit description lines */}
                                    {product.description}
                                </p>

                                {/* Price and Category Row */}
                                <div className="mt-auto pt-3 flex items-center justify-between"> {/* Push to bottom */}
                                    <span className="text-orange-700 font-semibold text-xl"> {/* Consistent orange, larger */}
                                        ₹{product.price ? product.price.toFixed(2) : 'N/A'}
                                    </span>
                                    <span className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full"> {/* Orange badge */}
                                        {product.categoryID?.name || 'Category'}
                                    </span>
                                </div>

                                {/* View Details Button (Visually styled) */}
                                <div className="mt-5">
                                     {/* Using a div styled as button because the parent div is already clickable */}
                                    <div className="w-full bg-orange-600 hover:bg-orange-700 text-white text-center font-semibold py-2.5 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;