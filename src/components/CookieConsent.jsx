import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a small delay
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-500/30 rounded-2xl shadow-2xl backdrop-blur-xl p-6 md:p-8">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl pointer-events-none"></div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                {/* Cookie Icon */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    <circle cx="8" cy="8" r="1" />
                    <circle cx="12" cy="10" r="1" />
                    <circle cx="10" cy="12" r="1" />
                    <circle cx="7" cy="11" r="1" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    🍪 We Use Cookies
                  </h3>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    We use cookies to enhance your browsing experience, remember your preferences, and provide personalized content.
                    By clicking "Accept All Cookies", you agree to the storing of cookies on your device.
                    {' '}
                    <a
                      href="/terms"
                      className="text-blue-400 hover:text-blue-300 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Learn more
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={acceptCookies}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    Accept All Cookies
                  </button>
                  <button
                    onClick={declineCookies}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-semibold transition-all duration-200 border border-slate-600 hover:border-slate-500 whitespace-nowrap"
                  >
                    Decline
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-400">
                  We use cookies for authentication, location tracking, and improving your experience.
                  Essential cookies are required for the site to function properly.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
