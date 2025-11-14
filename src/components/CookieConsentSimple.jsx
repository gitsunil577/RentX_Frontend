import { useState, useEffect } from 'react';

const CookieConsentSimple = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setShowBanner(true), 1000);
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

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t-2 border-blue-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Message */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">🍪</span>
            <p className="text-sm text-slate-300">
              We use cookies to improve your experience.
              {' '}
              <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                Learn more
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentSimple;
