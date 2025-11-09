import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { trackPageView } from '../utils/analytics';
import { hasConsent } from '../utils/consent';

const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (hasConsent()) {
      const pageName = location.pathname || '/';
      trackPageView(pageName, {
        search: location.search,
        hash: location.hash,
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return <>{children}</>;
};

export default AnalyticsWrapper;

