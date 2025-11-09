// src/App.js

import React from 'react';
import './App.css';
import LoginPage from './pages/loginpage/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AboutPage from './pages/aboutpage/AboutPage';
import ProductPage from './pages/productspage/ProductPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import MyContact from './pages/contact/ContactPage';
import ProductDetails from './pages/productspage/ProductDetails';
import RegisterProduct from './components/RegisterProduct';
import RegisterSeller from './components/RegisterSeller';

import CartPage from './components/CartPage';

import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify'; // ✅ Import this
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import styles

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideFooterPaths = ['/login', '/register'];

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

      <div className={hideNavbarPaths.includes(location.pathname) ? "min-h-screen" : "min-h-screen pt-16"} style={hideNavbarPaths.includes(location.pathname) ? {} : { paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<MyContact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/seller/register" element={<RegisterSeller />} />
          <Route path="/product/register" element={<RegisterProduct />} />
        </Routes>
      </div>

      {!hideFooterPaths.includes(location.pathname) && <Footer />}
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
