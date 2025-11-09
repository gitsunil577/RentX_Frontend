import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Corrected typo here

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(null);
      setError(null);

      if (!API_BASE_URL) {
        setError("API base URL is not configured.");
        return;
      }

      try {
        const apiUrl = `${API_BASE_URL}/product/productByID/${id}`;
        const res = await axios.get(apiUrl);

        if (res.data?.data) {
          setProduct(res.data.data);
        } else {
          // Check if data object is empty but call was successful
          if (res.data && Object.keys(res.data).length === 0) {
            setError("Product data is empty.");
          } else {
            setError("Product data not found.");
          }
        }
      } catch (fetchError) {
        console.error("Error fetching product:", fetchError);
        setError(
          fetchError.response?.data?.message ||
            fetchError.message ||
            "An error occurred while fetching the product."
        );
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("No product ID provided.");
    }
  }, [id]);

  // 🛒 Add to Cart handler
  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken"); // or sessionStorage
    if (!token) {
      toast.error("You must be logged in to add items to cart.");
      return;
    }

    if (!product?._id) {
      toast.error("Product details not loaded yet.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE_URL}/cart/add-to-cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        toast.success("Item added to cart!");
        // Optional: You might want to update product stock locally or refetch product data
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.message || "Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  if (!product && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-500 animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <p className="text-xl text-red-700 bg-red-100 p-6 rounded-lg shadow text-center">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <p className="text-xl text-gray-700 bg-gray-200 p-6 rounded-lg shadow text-center">
          Product not found or could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Flex container for responsive layout */}
        {/* Flex column by default (mobile), flex row on medium screens */}
        <div className="flex flex-col md:flex-row">
          {/* Product Image Section */}
          {/* Image section takes full width on mobile, half on medium+ */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-100 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x600.png?text=No+Image"
              }
              alt={product.name}
              className="w-full h-auto max-w-full max-h-[500px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            />
          </div>

          {/* Product Details Section */}
          {/* Details section takes full width on mobile, half on medium+ */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              {" "}
              {/* Container for top details */}
              <p className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-2">
                {product.categoryID?.name || "General Category"}
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-orange-700 mb-6">
                ₹{product.price?.toFixed(2) || "Price Unavailable"}
              </p>
              <p
                className={`font-semibold mb-6 ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed text-base md:text-lg">
                {product.description}
              </p>
              <hr className="my-6 border-gray-200" />
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Sold by:</span>{" "}
                  {product.sellerID?.storeName || "Unknown Seller"}
                </p>
                {product.sellerID?.gstNumber && (
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">GSTIN:</span>{" "}
                    {product.sellerID.gstNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              {/* Buttons stack on small screens, row on sm+ */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock <= 0 || loading}
                  className={`w-full sm:w-auto flex-1 bg-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-md transform focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-200 ease-in-out ${
                    product.stock > 0
                      ? "hover:bg-orange-700 hover:scale-105 active:scale-100"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  disabled={!product.stock || product.stock <= 0}
                  className={`w-full sm:w-auto flex-1 bg-gray-800 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-md transform focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-200 ease-in-out ${
                    product.stock > 0
                      ? "hover:bg-gray-900 hover:scale-105 active:scale-100"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
