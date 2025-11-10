// src/App.js

import React from 'react';
import './App.css';
import LoginPage from './pages/loginpage/LoginPage';
import Navbar from './components/Navbar';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AboutPage from './pages/aboutpage/AboutPage';
import VehiclePage from './pages/vehiclepage/VehiclePages';
import RegisterPage from './pages/registerpage/RegisterPage';
import MyContact from './pages/contact/ContactPage';
import VehicleDetails from './pages/vehiclepage/VehicleDetails';
import RegisterVehicle from './components/RegisterVehicle';
import RegisterOwner from './components/RegisterOwner';

import CartPage from './components/CartPage';
import OrderSuccess from './components/OrderSuccess';
import BookingHistory from './components/BookingHistory';
import OwnerBookings from './components/OwnerBookings';
import { RequireAuth, OwnerOnlyRoute } from './components/ProtectedRoute';

import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify'; // ✅ Import this
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import styles

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideFooterPaths = ['/login', '/register', '/', '/home'];
  const noPaddingPaths = ['/login', '/register', '/', '/home']; // No padding for login, register, and homepage

  return (
    <>
      <ScrollToTop />

      {/* Only show Navbar if NOT on login/register pages */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      {/* ✅ ToastContainer added here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className={noPaddingPaths.includes(location.pathname) ? "min-h-screen" : "min-h-screen pt-16"} style={noPaddingPaths.includes(location.pathname) ? {} : { paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/vehicles" element={<VehiclePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<MyContact />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="/order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
          <Route path="/my-bookings" element={<RequireAuth><BookingHistory /></RequireAuth>} />
          <Route path="/owner-bookings" element={<OwnerOnlyRoute><OwnerBookings /></OwnerOnlyRoute>} />
          <Route path="/owner/register" element={<RequireAuth><RegisterOwner /></RequireAuth>} />
          <Route path="/vehicle/register" element={<OwnerOnlyRoute><RegisterVehicle /></OwnerOnlyRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
