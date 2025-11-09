// Cookie consent management
const CONSENT_KEY = 'maxiwise_cookie_consent';
const CONSENT_TIMESTAMP_KEY = 'maxiwise_consent_timestamp';

export type ConsentStatus = 'accepted' | 'declined' | 'pending';

export const getConsent = (): ConsentStatus => {
  if (typeof window === 'undefined') return 'pending';
  
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'accepted' || consent === 'declined') {
    return consent as ConsentStatus;
  }
  return 'pending';
};

export const setConsent = (status: 'accepted' | 'declined'): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
  
  // Set global flag for scripts to check
  (window as any).__maxiwise_consent = status === 'accepted';
};

export const hasConsent = (): boolean => {
  return getConsent() === 'accepted';
};

export const clearConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
  delete (window as any).__maxiwise_consent;
};

