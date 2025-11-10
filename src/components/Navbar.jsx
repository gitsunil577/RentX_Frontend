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
  const [userType, setUserType] = useState(null);
  const [hasOwnerID, setHasOwnerID] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Clears all local session data and redirects to login
  const clearSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("rentalDetails");
    setIsLoggedIn(false);
    setCartCount(0);
    setUserType(null);
    setHasOwnerID(false);
    console.log("✅ Session cleared, user logged out");
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

    if (loggedIn) {
      fetchCartCount();

      // Get user info to determine type
      const userData = localStorage.getItem("userData") || localStorage.getItem("user");
      console.log("📊 Navbar - Raw user data from localStorage:", userData);

      if (userData) {
        try {
          const userInfo = JSON.parse(userData);
          console.log("📊 Navbar - Parsed user info:", userInfo);
          console.log("📊 Navbar - Type of Customer:", userInfo.typeOfCustomer);
          console.log("📊 Navbar - Has OwnerID:", !!userInfo.ownerID);

          setUserType(userInfo.typeOfCustomer);
          setHasOwnerID(!!userInfo.ownerID);
        } catch (err) {
          console.error("❌ Error parsing user data:", err);
        }
      } else {
        console.log("⚠️ No user data found in localStorage");
      }
    } else {
      setCartCount(0);
      setUserType(null);
      setHasOwnerID(false);
    }
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
    { to: "/vehicles", label: "Vehicles" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-300 shadow-lg w-full sticky top-0 z-50 border-b border-slate-800/50 backdrop-blur-xl">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e505_1px,transparent_1px),linear-gradient(to_bottom,#4f46e505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
        <NavLink
          to="/"
          className="text-3xl font-bold transition group"
        >
          <span className="text-white group-hover:text-blue-200 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Rent</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-blue-300 group-hover:to-purple-400 transition-all drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">X</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-2.5 px-5 rounded-lg font-medium transition-all duration-300 relative group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`
              }
            >
              <span className="relative z-10">{label}</span>
              {!location.pathname.includes(to) && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </NavLink>
          ))}

          {/* Cart button - Show for ALL logged-in users (Buyers and Owners) */}
          {isLoggedIn && (
            <button
              onClick={handleCartClick}
              className="relative py-2.5 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Bookings/Dashboard link - Show appropriate version based on user type */}
          {isLoggedIn && (() => {
            const isOwner = userType === "Owner" && hasOwnerID;
            const linkTo = isOwner ? "/owner-dashboard" : "/my-bookings";
            const linkText = isOwner ? "Dashboard" : "My Bookings";

            console.log("🔗 Navbar Link Decision:", {
              userType,
              hasOwnerID,
              isOwner,
              linkTo,
              linkText
            });

            return (
              <NavLink
                to={linkTo}
                className={({ isActive }) =>
                  `py-2.5 px-5 rounded-lg font-medium transition-all duration-300 relative group ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`
                }
              >
                <span className="relative z-10">{linkText}</span>
              </NavLink>
            );
          })()}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2.5 px-5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium transition-all duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2.5 px-5 rounded-lg border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 font-semibold transition-all duration-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
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
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e505_1px,transparent_1px),linear-gradient(to_bottom,#4f46e505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="flex flex-col space-y-2 px-4 py-4 relative z-10">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {/* Cart button - Show for ALL logged-in users (Buyers and Owners) */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  handleCartClick();
                  setIsOpen(false);
                }}
                className="relative py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute top-1 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Bookings/Dashboard link - Show appropriate version based on user type */}
            {isLoggedIn && (
              <NavLink
                to={userType === "Owner" && hasOwnerID ? "/owner-dashboard" : "/my-bookings"}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {userType === "Owner" && hasOwnerID ? "Dashboard" : "My Bookings"}
              </NavLink>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-3 px-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="py-3 px-4 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="py-3 px-4 rounded-lg border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-center py-2 bg-red-900/20 border-t border-red-500/20">
          {error}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
