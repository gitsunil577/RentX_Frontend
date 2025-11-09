// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Clears all local session data and redirects to login
  const clearSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setCartCount(0);
    navigate("/login");
  };

  // Fetch cart count from backend
  const fetchCartCount = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/cart/get-cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const items = Array.isArray(res.data.data) ? res.data.data : [];
      const total = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(total);
      setError("");
    } catch (err) {
      console.error("Error fetching cart count:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        clearSession();
      } else {
        setError("Failed to load cart.");
      }
    }
  };

  // Update login status & cart count when route changes
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) fetchCartCount();
    else setCartCount(0);
  }, [location.pathname]);

  // Listen for login status changes in other tabs
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "isLoggedIn") {
        const loggedIn = e.newValue === "true";
        setIsLoggedIn(loggedIn);
        if (loggedIn) fetchCartCount();
        else setCartCount(0);
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        // If expired or invalid, we ignore and still clear
        if (err.response?.status !== 401) {
          console.error("Logout API error:", err);
          return; // if another error, bail out so we don't clear session inadvertently
        }
      }
    }
    // In all cases clear client session
    clearSession();
  };

  const handleCartClick = () => navigate("/cart");

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-gray-800 text-gray-300 shadow-md w-full sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-teal-500 hover:text-teal-400 transition"
        >
          Rental System
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-2 px-3 rounded-md hover:bg-gray-700 transition ${
                  isActive ? "bg-teal-500 text-white font-semibold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleCartClick}
              className="relative py-2 px-3 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2 px-3 rounded-md hover:bg-gray-700 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 px-3 rounded-md hover:bg-gray-700 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 flex flex-col space-y-3 px-4 py-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="py-2 px-3 rounded-md hover:bg-gray-600 text-white"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => {
                handleCartClick();
                setIsOpen(false);
              }}
              className="relative py-2 px-3 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2 px-3 rounded-md hover:bg-gray-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 px-3 rounded-md hover:bg-gray-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-400 text-center py-2">{error}</div>
      )}
    </nav>
  );
};

export default Navbar;
