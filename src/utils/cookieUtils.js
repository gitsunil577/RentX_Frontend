/**
 * Cookie Consent Utilities
 * Manage cookie consent across the application
 */

/**
 * Check if user has accepted cookies
 * @returns {boolean} true if accepted, false otherwise
 */
export const hasAcceptedCookies = () => {
  const consent = localStorage.getItem('cookieConsent');
  return consent === 'accepted';
};

/**
 * Check if user has declined cookies
 * @returns {boolean} true if declined, false otherwise
 */
export const hasDeclinedCookies = () => {
  const consent = localStorage.getItem('cookieConsent');
  return consent === 'declined';
};

/**
 * Get cookie consent status
 * @returns {'accepted' | 'declined' | 'pending'}
 */
export const getCookieConsentStatus = () => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return 'pending';
  return consent;
};

/**
 * Get the date when user gave consent
 * @returns {Date | null}
 */
export const getCookieConsentDate = () => {
  const date = localStorage.getItem('cookieConsentDate');
  return date ? new Date(date) : null;
};

/**
 * Reset cookie consent (for testing purposes)
 */
export const resetCookieConsent = () => {
  localStorage.removeItem('cookieConsent');
  localStorage.removeItem('cookieConsentDate');
};

/**
 * Set cookie in browser (only if user has accepted cookies)
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration
 */
export const setCookie = (name, value, days = 365) => {
  if (!hasAcceptedCookies()) {
    console.warn('Cookies not accepted. Cookie not set:', name);
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get cookie value
 * @param {string} name - Cookie name
 * @returns {string | null}
 */
export const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Delete cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Check if cookies are enabled in browser
 * @returns {boolean}
 */
export const areCookiesEnabled = () => {
  try {
    document.cookie = 'cookietest=1';
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
};

/**
 * Get analytics/tracking consent
 * For future use if you add Google Analytics, etc.
 * @returns {boolean}
 */
export const hasAnalyticsConsent = () => {
  // For now, analytics consent equals cookie consent
  // In future, you can have separate consent for analytics
  return hasAcceptedCookies();
};
