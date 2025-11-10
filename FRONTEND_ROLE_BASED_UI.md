# 🎨 Frontend Role-Based UI Implementation Guide

## 📋 Overview

This guide shows how to conditionally show/hide UI elements based on user role:

- **👥 Buyers/Customers:**
  - ✅ See "Rent Now" buttons
  - ❌ Don't see "List Vehicle" menu

- **🏪 Owners:**
  - ✅ See "List Vehicle" menu
  - ✅ See "Manage Vehicles" menu
  - ❌ "Rent Now" button disabled/hidden

---

## 🚀 Quick Start

### Step 1: Install/Copy User Role Utility

File already created: `src/utils/userRole.js`

This utility provides:
```javascript
import {
  getCurrentUser,      // Fetch fresh user data
  isOwner,            // Check if user is owner
  isBuyer,            // Check if user is buyer
  getCachedUserRole,  // Sync check from cache
  cacheUserData,      // Save user data
  clearUserCache      // Clear on logout
} from './utils/userRole';
```

---

## 📍 Step 2: Update Navigation Component

### Option A: Simple Header/Navbar Update

```javascript
// src/components/Header.jsx or Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCachedUserRole, getCurrentUser, cacheUserData } from '../utils/userRole';

export default function Header() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);

    if (token) {
      // Get fresh user data
      const userData = await getCurrentUser();
      if (userData) {
        setUserRole(userData.typeOfCustomer);
        cacheUserData(userData); // Cache for next time
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Rent<span className="text-blue-500">X</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Public Links */}
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/vehicles" className="hover:text-blue-400">Vehicles</Link>

          {/* Authenticated Links */}
          {isAuthenticated && (
            <>
              {/* 👥 BUYER-ONLY LINKS */}
              {userRole === 'Buyer' && (
                <>
                  <Link to="/my-bookings" className="hover:text-blue-400">
                    My Bookings
                  </Link>
                  <Link to="/owner/register" className="hover:text-blue-400">
                    Become an Owner
                  </Link>
                </>
              )}

              {/* 🏪 OWNER-ONLY LINKS */}
              {userRole === 'Owner' && (
                <>
                  <Link
                    to="/vehicle/register"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    List Vehicle
                  </Link>
                  <Link to="/owner/vehicles" className="hover:text-blue-400">
                    My Vehicles
                  </Link>
                  <Link to="/owner/bookings" className="hover:text-blue-400">
                    Vehicle Bookings
                  </Link>
                </>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}

          {/* Not Authenticated */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
```

---

## 🚗 Step 3: Update Vehicle Card Component

### Conditional "Rent Now" Button

```javascript
// src/components/VehicleCard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCachedUserRole } from '../utils/userRole';

export default function VehicleCard({ vehicle }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const { role } = getCachedUserRole();
    setUserRole(role);
  }, []);

  const isOwner = userRole === 'Owner';
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Vehicle Image */}
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-48 object-cover"
      />

      {/* Vehicle Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{vehicle.name}</h3>
        <p className="text-gray-600">{vehicle.description}</p>

        <div className="mt-2">
          <span className="text-2xl font-bold text-blue-600">
            ${vehicle.priceUSD}
          </span>
          <span className="text-gray-500"> / day</span>
          <span className="text-sm text-gray-400 ml-2">
            (₹{vehicle.priceINR})
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {/* View Details - Always visible */}
          <Link
            to={`/vehicles/${vehicle._id}`}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300"
          >
            View Details
          </Link>

          {/* Rent Now Button - Conditional */}
          {!isOwner && isAuthenticated && (
            <Link
              to={`/booking/create/${vehicle._id}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
            >
              Rent Now
            </Link>
          )}

          {!isOwner && !isAuthenticated && (
            <Link
              to="/login"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
            >
              Login to Rent
            </Link>
          )}

          {/* Owner - Show disabled button with message */}
          {isOwner && (
            <div
              className="flex-1 bg-gray-400 text-white px-4 py-2 rounded text-center cursor-not-allowed opacity-60"
              title="Owners cannot book vehicles"
            >
              Owner Account
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 📄 Step 4: Update Vehicle Details Page

### Detailed Vehicle Page with Role-Based Booking

```javascript
// src/pages/VehicleDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCachedUserRole, getCurrentUser } from '../utils/userRole';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchVehicle();
    checkUserRole();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vehicle/vehicleByID/${id}`);
      setVehicle(response.data.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUserRole(userData.typeOfCustomer);
    }
  };

  const handleRentNowClick = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (userRole === 'Owner') {
      alert('❌ Owners cannot book vehicles. Only customers can rent vehicles.');
      return;
    }

    // Proceed to booking
    navigate(`/booking/create/${vehicle._id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Vehicle not found</div>;

  const isOwner = userRole === 'Owner';
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vehicle Image */}
        <div>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Vehicle Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{vehicle.name}</h1>
          <p className="text-gray-600 mb-6">{vehicle.description}</p>

          {/* Price */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-600">Price per day</div>
            <div className="text-3xl font-bold text-blue-600">
              ${vehicle.priceUSD}
            </div>
            <div className="text-sm text-gray-500">
              (₹{vehicle.priceINR} INR)
            </div>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className="text-gray-600">Available: </span>
            <span className="font-semibold">{vehicle.stock} units</span>
          </div>

          {/* Owner Details */}
          {vehicle.ownerID && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-600">Listed by</div>
              <div className="font-semibold">{vehicle.ownerID.storeName}</div>
              <div className="text-sm text-gray-500">{vehicle.ownerID.address}</div>
            </div>
          )}

          {/* Rent Now Button - Conditional */}
          {!isOwner && isAuthenticated && vehicle.stock > 0 && (
            <button
              onClick={handleRentNowClick}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
            >
              Rent Now
            </button>
          )}

          {!isOwner && !isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
            >
              Login to Rent
            </button>
          )}

          {vehicle.stock === 0 && (
            <div className="w-full bg-gray-400 text-white py-4 rounded-lg text-xl font-semibold text-center">
              Out of Stock
            </div>
          )}

          {/* Owner - Show message instead of button */}
          {isOwner && (
            <div className="border-2 border-orange-400 bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div className="font-bold text-orange-800 text-lg">
                  Owner Account
                </div>
              </div>
              <p className="text-orange-700">
                You are registered as an <strong>Owner</strong>.
                Owners can list and manage vehicles but cannot book vehicles.
                Only customers can rent vehicles.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/vehicle/register')}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  List Your Own Vehicle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🛡️ Step 5: Protect Booking Route

### Add Route Guard

```javascript
// src/components/ProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/userRole';

export const BuyerOnlyRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    const userData = await getCurrentUser();
    setUserRole(userData?.typeOfCustomer);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole === 'Owner') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-red-50 border-2 border-red-400 rounded-lg p-8">
          <svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-700 mb-4">
            You are registered as an <strong>Owner</strong>.
            Owners cannot book vehicles. Only customers can rent vehicles.
          </p>
          <button
            onClick={() => window.location.href = '/vehicles'}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export const OwnerOnlyRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    const userData = await getCurrentUser();
    setUserRole(userData?.typeOfCustomer);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 'Owner') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-orange-50 border-2 border-orange-400 rounded-lg p-8">
          <svg className="w-16 h-16 text-orange-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          <h2 className="text-2xl font-bold text-orange-800 mb-2">Owner Access Required</h2>
          <p className="text-orange-700 mb-4">
            You need to be registered as an <strong>Owner</strong> to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/owner/register'}
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            Become an Owner
          </button>
        </div>
      </div>
    );
  }

  return children;
};
```

---

## 🔀 Step 6: Update App Routes

```javascript
// src/App.jsx or routes file

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuyerOnlyRoute, OwnerOnlyRoute } from './components/ProtectedRoute';

// Import pages
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetails from './pages/VehicleDetails';
import CreateBooking from './pages/CreateBooking';
import MyBookings from './pages/MyBookings';
import RegisterVehicle from './components/RegisterVehicle';
import OwnerVehicles from './pages/OwnerVehicles';
import OwnerBookings from './pages/OwnerBookings';
import RegisterOwner from './components/RegisterOwner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Buyer-Only Routes */}
        <Route
          path="/booking/create/:vehicleId"
          element={
            <BuyerOnlyRoute>
              <CreateBooking />
            </BuyerOnlyRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <BuyerOnlyRoute>
              <MyBookings />
            </BuyerOnlyRoute>
          }
        />

        {/* Owner-Only Routes */}
        <Route
          path="/vehicle/register"
          element={
            <OwnerOnlyRoute>
              <RegisterVehicle />
            </OwnerOnlyRoute>
          }
        />
        <Route
          path="/owner/vehicles"
          element={
            <OwnerOnlyRoute>
              <OwnerVehicles />
            </OwnerOnlyRoute>
          }
        />
        <Route
          path="/owner/bookings"
          element={
            <OwnerOnlyRoute>
              <OwnerBookings />
            </OwnerOnlyRoute>
          }
        />

        {/* Owner Registration - Available to both */}
        <Route path="/owner/register" element={<RegisterOwner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🔄 Step 7: Update Login Component

### Cache User Data After Login

```javascript
// src/pages/LoginPage.jsx

import { cacheUserData } from '../utils/userRole';

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      identifier,
      password
    });

    const { accessToken, refreshToken, user } = response.data.data;

    // Save tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // ⚠️ IMPORTANT: Cache user data for role detection
    cacheUserData(user);

    console.log('✅ Login successful:', user);
    console.log('📋 User Role:', user.typeOfCustomer);

    // Redirect based on role
    if (user.typeOfCustomer === 'Owner') {
      navigate('/owner/vehicles');
    } else {
      navigate('/vehicles');
    }

  } catch (error) {
    console.error('Login failed:', error);
    setError(error.response?.data?.message || 'Login failed');
  }
};
```

---

## 🔄 Step 8: Update Owner Registration

### Update Tokens AND Cache Data

```javascript
// src/components/RegisterOwner.jsx

import { cacheUserData } from '../utils/userRole';

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${BASE_URL}/owner/register-owner`,
      { storeName, gstNumber, address },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { accessToken, refreshToken, user } = response.data.data;

    // Update tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // ⚠️ IMPORTANT: Cache updated user data
    cacheUserData(user);

    console.log('✅ Owner registration successful');
    console.log('📋 New Role:', user.typeOfCustomer);

    setSuccessMessage('Owner registered! You can now list vehicles.');

    // Navigate to list vehicle page
    setTimeout(() => {
      window.location.href = '/vehicle/register'; // Force refresh
    }, 2000);

  } catch (error) {
    console.error('Owner registration failed:', error);
    setError(error.response?.data?.message || 'Failed to register');
  }
};
```

---

## ✅ Complete Checklist

### ✅ Files to Create/Update:

- [ ] **Create:** `src/utils/userRole.js` ✅
- [ ] **Create:** `src/components/ProtectedRoute.jsx`
- [ ] **Update:** `src/components/Header.jsx` or `Navbar.jsx`
- [ ] **Update:** `src/components/VehicleCard.jsx`
- [ ] **Update:** `src/pages/VehicleDetails.jsx`
- [ ] **Update:** `src/pages/LoginPage.jsx`
- [ ] **Update:** `src/components/RegisterOwner.jsx`
- [ ] **Update:** `src/App.jsx` (routes)

---

## 🎨 Visual Summary

### For Buyers:
```
Navigation:
✅ Home | Vehicles | My Bookings | Become an Owner | Logout

Vehicle Card:
✅ [View Details] [Rent Now]

Vehicle Details:
✅ Large "Rent Now" button
```

### For Owners:
```
Navigation:
✅ Home | Vehicles | List Vehicle | My Vehicles | Vehicle Bookings | Logout

Vehicle Card:
✅ [View Details] [Owner Account - Disabled]

Vehicle Details:
❌ "Rent Now" button replaced with:
⚠️ Warning box: "You are an Owner. Owners cannot book vehicles."
✅ [List Your Own Vehicle] button instead
```

---

## 🧪 Testing

### Test as Buyer:
1. ✅ See "Rent Now" buttons
2. ✅ Can click and proceed to booking
3. ❌ Don't see "List Vehicle" in nav

### Test as Owner:
1. ✅ See "List Vehicle" in nav
2. ✅ See "My Vehicles" in nav
3. ❌ "Rent Now" is disabled/hidden
4. ✅ See helpful message instead

---

## 🚀 Result

**Better UX:**
- Users only see what they can do
- No confusing "Access Denied" errors
- Clear visual indication of account type
- Helpful messages guide users to correct actions

**This is much better than showing features and then blocking them!** 🎉

---

**Created:** January 2025
**Status:** ✅ Ready to Implement
