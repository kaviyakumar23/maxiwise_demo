// Mixpanel analytics wrapper with consent checking
import { hasConsent } from './consent';

// Declare mixpanel on window
declare global {
  interface Window {
    mixpanel?: any;
  }
}

// Check if Mixpanel is loaded and user has consented
const canTrack = (): boolean => {
  return typeof window !== 'undefined' && hasConsent() && !!window.mixpanel;
};

// Session tracking - stored in sessionStorage
const SESSION_KEY = 'maxiwise_session_started';
const LAST_VISIT_KEY = 'maxiwise_last_visit';

const isNewSession = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !sessionStorage.getItem(SESSION_KEY);
};

const markSessionStarted = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, new Date().toISOString());
};

const isReturningVisitor = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(LAST_VISIT_KEY);
};

const markVisit = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
};

// Event tracking functions

export const trackPageView = (page: string, properties?: Record<string, any>): void => {
  if (!canTrack()) return;
  
  try {
    window.mixpanel.track('Page_Viewed', {
      page,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error);
  }
};

export const trackSessionStarted = (): void => {
  if (!canTrack()) return;
  
  if (isNewSession()) {
    try {
      window.mixpanel.track('Session_Started', {
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
      markSessionStarted();
    } catch (error) {
      console.error('[Analytics] Error tracking session start:', error);
    }
  }
};

export const trackReturnVisit = (): void => {
  if (!canTrack()) return;
  
  if (isReturningVisitor()) {
    try {
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
      window.mixpanel.track('Return_Visit', {
        timestamp: new Date().toISOString(),
        lastVisit,
        url: window.location.href,
      });
    } catch (error) {
      console.error('[Analytics] Error tracking return visit:', error);
    }
  }
  
  markVisit();
};

export const trackFundCardViewed = (
  cardId: string,
  cardTitle: string,
  fundsCount: number,
  properties?: Record<string, any>
): void => {
  if (!canTrack()) return;
  
  try {
    window.mixpanel.track('FundCard_Viewed', {
      cardId,
      cardTitle,
      fundsCount,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking fund card view:', error);
  }
};

export const trackInsightCardViewed = (properties?: Record<string, any>): void => {
  if (!canTrack()) return;
  
  try {
    window.mixpanel.track('InsightCard_Viewed', {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking insight card view:', error);
  }
};

export const trackSignupStarted = (method: 'email' | 'google', properties?: Record<string, any>): void => {
  if (!canTrack()) return;
  
  try {
    window.mixpanel.track('Signup_Started', {
      method,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...properties,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking signup start:', error);
  }
};

export const trackSignupCompleted = (
  userId: string,
  email: string,
  method: 'email' | 'google',
  properties?: Record<string, any>
): void => {
  if (!canTrack()) return;
  
  try {
    // Identify user in Mixpanel
    window.mixpanel.identify(userId);
    
    // Set user properties
    window.mixpanel.people.set({
      $email: email,
      $name: email.split('@')[0],
      signupDate: new Date().toISOString(),
      signupMethod: method,
    });
    
    // Track the event
    window.mixpanel.track('Signup_Completed', {
      method,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking signup completion:', error);
  }
};

// Initialize analytics on consent
export const initAnalytics = (): void => {
  if (!canTrack()) return;
  
  try {
    trackSessionStarted();
    trackReturnVisit();
  } catch (error) {
    console.error('[Analytics] Error initializing analytics:', error);
  }
};

