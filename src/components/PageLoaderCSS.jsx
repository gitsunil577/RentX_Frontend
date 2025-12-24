
import './PageLoaderCSS.css';

/**
 * PageLoaderCSS - A unique animated loader using pure CSS (no framer-motion)
 * Lightweight alternative with similar visual appeal
 */
const PageLoaderCSS = () => {
  return (
    <div className="page-loader">
      {/* Background animated circles */}
      <div className="loader-bg-circle loader-bg-circle-1"></div>
      <div className="loader-bg-circle loader-bg-circle-2"></div>

      {/* Main loader container */}
      <div className="loader-container">
        {/* Vehicle icon animation */}
        <div className="loader-icon-wrapper">
          {/* Rotating outer ring */}
          <div className="loader-ring loader-ring-outer"></div>

          {/* Counter-rotating inner ring */}
          <div className="loader-ring loader-ring-inner"></div>

          {/* Car icon in center */}
          <div className="loader-icon">
            <svg
              className="car-icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="loader-text-container">
          <h2 className="loader-title">Loading</h2>

          {/* Animated dots */}
          <div className="loader-dots">
            <div className="loader-dot" style={{ animationDelay: '0s' }}></div>
            <div className="loader-dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="loader-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>

        {/* Subtitle */}
        <p className="loader-subtitle">Preparing your experience...</p>
      </div>
    </div>
  );
};

export default PageLoaderCSS;
