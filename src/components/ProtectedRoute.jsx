/**
 * Protected Route Components
 * Provides route-level access control based on user roles and owner status
 */

import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Check if user is authenticated
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

/**
 * Check user role from cached data
 */
const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem('userData') || localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setRole(userData.typeOfCustomer);
      } else {
        setRole(null);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { role, isLoading };
};

/**
 * RequireAuth - Ensures user is authenticated
 * Redirects to login if not authenticated
 */
export const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <p className="text-xl font-semibold text-blue-300 animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * Check if user has completed owner registration (has ownerID)
 */
const useOwnerStatus = () => {
  const [hasOwnerID, setHasOwnerID] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem('userData') || localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setHasOwnerID(!!userData.ownerID);
      } else {
        setHasOwnerID(false);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setHasOwnerID(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { hasOwnerID, isLoading };
};

/**
 * OwnerOnlyRoute - Requires user to have completed owner registration (ownerID)
 * Redirects to owner registration if not registered as owner
 */
export const OwnerOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasOwnerID, isLoading: ownerLoading } = useOwnerStatus();
  const location = useLocation();

  if (authLoading || ownerLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <p className="text-xl font-semibold text-blue-300 animate-pulse">
          Verifying access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasOwnerID) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="max-w-md w-full">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-orange-500/50">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                Owner Registration Required
              </h2>
              <p className="text-slate-300 mb-6">
                To list vehicles, you must first complete the owner registration process.
              </p>
              <div className="space-y-3">
                <a
                  href="/owner/register"
                  className="block w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Register as Owner
                </a>
                <a
                  href="/home"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

/**
 * BuyerOnlyRoute - Requires Buyer role
 * Redirects to home with message if Owner tries to access
 */
export const BuyerOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <p className="text-xl font-semibold text-blue-300 animate-pulse">
          Verifying access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === 'Owner') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="max-w-md w-full">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-orange-500/50">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                Access Restricted
              </h2>
              <p className="text-slate-300 mb-6">
                This feature is not available for your account type.
                You are currently registered as an <span className="font-semibold text-orange-400">Owner</span>.
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Note: Owners can list vehicles and book rentals from other owners.
                However, you cannot book your own vehicles.
              </p>
              <div className="space-y-3">
                <a
                  href="/vehicles"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Browse Vehicles
                </a>
                <a
                  href="/home"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default {
  RequireAuth,
  OwnerOnlyRoute,
  BuyerOnlyRoute,
};
