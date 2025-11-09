// src/components/ScrollToTop.jsx  (Example file path)

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object, specifically the pathname
  const { pathname } = useLocation();

  // This effect runs every time the pathname changes
  useEffect(() => {
    // Scroll the window to the top left corner (0, 0)
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' to avoid smooth scrolling animation interference
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Dependency array ensures this runs only when pathname changes

  // This component does not render any visible UI
  return null;
}

export default ScrollToTop;