import React, { useState, useEffect } from 'react';
import { getConsent, setConsent, type ConsentStatus } from '../../utils/consent';
import { initAnalytics } from '../../utils/analytics';
import { initAttribution } from '../../utils/attribution';

const CookieConsent: React.FC = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const status = getConsent();
    setConsentStatus(status);
    
    // Show banner only if consent is pending
    if (status === 'pending') {
      // Small delay before showing for better UX
      setTimeout(() => setIsVisible(true), 500);
    } else if (status === 'accepted') {
      // If already accepted, initialize tracking
      initAttribution();
      initAnalytics();
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setConsentStatus('accepted');
    setIsVisible(false);
    
    // Initialize tracking after consent
    initAttribution();
    initAnalytics();
  };

  const handleDecline = () => {
    setConsent('declined');
    setConsentStatus('declined');
    setIsVisible(false);
  };

  // Don't render if consent already given or declined
  if (!isVisible || consentStatus !== 'pending') {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      {/* Backdrop blur for desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      {/* Banner content */}
      <div className="relative bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Text content */}
            <div className="flex-1">
              <p 
                id="cookie-consent-description"
                className="text-navy text-sm md:text-base font-outfit leading-relaxed"
              >
                We use cookies to improve your experience and analyze site usage. By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-full font-outfit font-medium text-base
                  text-navy bg-gray-100 hover:bg-gray-200
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 cursor-pointer"
                aria-label="Decline cookies"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 rounded-full font-outfit font-medium text-base
                  text-white bg-purple hover:bg-[#7E22CE]
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2
                  shadow-lg cursor-pointer"
                aria-label="Accept cookies"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

