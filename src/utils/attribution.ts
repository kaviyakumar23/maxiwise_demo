// UTM Attribution tracking for HubSpot and analytics
const FIRST_TOUCH_PREFIX = 'maxiwise_first_';
const LAST_TOUCH_PREFIX = 'maxiwise_last_';
const COOKIE_EXPIRY_DAYS = 30;

interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
}

// Helper to set cookie
const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Helper to get cookie
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Extract UTM parameters from URL
const extractUTMParams = (): AttributionData => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    term: params.get('utm_term') || undefined,
    content: params.get('utm_content') || undefined,
    referrer: document.referrer || undefined,
    landingPage: window.location.href,
  };
};

// Save attribution data to cookies
const saveAttribution = (prefix: string, data: AttributionData): void => {
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      setCookie(`${prefix}${key}`, value, COOKIE_EXPIRY_DAYS);
    }
  });
};

// Load attribution data from cookies
const loadAttribution = (prefix: string): AttributionData => {
  const keys = ['source', 'medium', 'campaign', 'term', 'content', 'referrer', 'landingPage'];
  const data: AttributionData = {};
  
  keys.forEach((key) => {
    const value = getCookie(`${prefix}${key}`);
    if (value) {
      (data as any)[key] = value;
    }
  });
  
  return data;
};

// Initialize attribution tracking on page load
export const initAttribution = (): void => {
  if (typeof window === 'undefined') return;
  
  const utmData = extractUTMParams();
  const hasUTMs = Object.values(utmData).some(v => v);
  
  // Always save last touch if we have UTM data
  if (hasUTMs) {
    saveAttribution(LAST_TOUCH_PREFIX, utmData);
  }
  
  // Save first touch only if it doesn't exist yet
  const existingFirstTouch = loadAttribution(FIRST_TOUCH_PREFIX);
  if (!existingFirstTouch.source && hasUTMs) {
    saveAttribution(FIRST_TOUCH_PREFIX, utmData);
  }
};

// Get first touch attribution
export const getFirstTouchAttribution = (): AttributionData => {
  return loadAttribution(FIRST_TOUCH_PREFIX);
};

// Get last touch attribution
export const getLastTouchAttribution = (): AttributionData => {
  const lastTouch = loadAttribution(LAST_TOUCH_PREFIX);
  
  // If no last touch data, fall back to current page UTMs or first touch
  if (!lastTouch.source) {
    const currentUTMs = extractUTMParams();
    if (currentUTMs.source) {
      return currentUTMs;
    }
    return loadAttribution(FIRST_TOUCH_PREFIX);
  }
  
  return lastTouch;
};

// Get device type
export const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Format attribution for HubSpot
export const getAttributionForHubSpot = () => {
  const firstTouch = getFirstTouchAttribution();
  const lastTouch = getLastTouchAttribution();
  
  return {
    firstTouchSource: firstTouch.source || 'direct',
    firstTouchMedium: firstTouch.medium || 'none',
    firstTouchCampaign: firstTouch.campaign || 'none',
    lastTouchSource: lastTouch.source || 'direct',
    lastTouchMedium: lastTouch.medium || 'none',
    lastTouchCampaign: lastTouch.campaign || 'none',
    referrerUrl: lastTouch.referrer || firstTouch.referrer || 'direct',
    landingPageUrl: firstTouch.landingPage || window.location.href,
    deviceType: getDeviceType(),
  };
};

