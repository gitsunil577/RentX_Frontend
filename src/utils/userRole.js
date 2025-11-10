/**
 * User Role Detection Utility
 * Determines user role (Owner/Buyer) for conditional UI rendering
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch current user data from backend
 * @returns {Promise<Object>} User data with role information
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }

    const response = await axios.get(`${BASE_URL}/user/current-user`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

/**
 * Check if current user is an Owner
 * @returns {Promise<boolean>}
 */
export const isOwner = async () => {
  const user = await getCurrentUser();
  return user?.typeOfCustomer === 'Owner' && user?.hasOwnerProfile;
};

/**
 * Check if current user is a Buyer/Customer
 * @returns {Promise<boolean>}
 */
export const isBuyer = async () => {
  const user = await getCurrentUser();
  return user?.typeOfCustomer === 'Buyer' || user?.isBuyer;
};

/**
 * Get user role from current user data
 * @returns {Promise<string>} 'Owner', 'Buyer', or null
 */
export const getUserRole = async () => {
  const user = await getCurrentUser();
  return user?.typeOfCustomer || null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

/**
 * Synchronous role check from localStorage cached data
 * Use this for initial render, then verify with async functions
 * @returns {Object} { isOwner, isBuyer, role }
 */
export const getCachedUserRole = () => {
  const userDataString = localStorage.getItem('userData');
  if (!userDataString) {
    return { isOwner: false, isBuyer: false, role: null };
  }

  try {
    const userData = JSON.parse(userDataString);
    return {
      isOwner: userData.typeOfCustomer === 'Owner',
      isBuyer: userData.typeOfCustomer === 'Buyer',
      role: userData.typeOfCustomer
    };
  } catch (error) {
    return { isOwner: false, isBuyer: false, role: null };
  }
};

/**
 * Save user data to localStorage for caching
 * Call this after login and after owner registration
 * @param {Object} userData
 */
export const cacheUserData = (userData) => {
  if (userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

/**
 * Clear cached user data
 * Call this on logout
 */
export const clearUserCache = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default {
  getCurrentUser,
  isOwner,
  isBuyer,
  getUserRole,
  isAuthenticated,
  getCachedUserRole,
  cacheUserData,
  clearUserCache
};
