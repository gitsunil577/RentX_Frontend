import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

/**
 * NavigationLoader - Automatically shows loader during route transitions
 */
const NavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useEffect(() => {
    // Check if location has changed
    if (location.pathname !== prevLocation) {
      // Show loader when route starts changing
      setIsLoading(true);

      // Hide loader after a delay to allow smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
        setPrevLocation(location.pathname);
      }, 800); // Adjust timing as needed (500-1000ms recommended)

      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevLocation]);

  // Don't show loader on initial mount
  if (prevLocation === location.pathname && !isLoading) {
    return null;
  }

  return isLoading ? <PageLoader /> : null;
};

export default NavigationLoader;
