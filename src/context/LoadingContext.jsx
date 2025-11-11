import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';

/**
 * LoadingContext - Manages global loading state for page transitions
 */
const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Automatically detect navigation state from React Router
  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    } else {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  const value = {
    isLoading,
    setIsLoading,
    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
