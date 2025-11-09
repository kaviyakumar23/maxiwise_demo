// HubSpot Forms API integration
import { getAttributionForHubSpot } from './attribution';
import { hasConsent } from './consent';

// HubSpot portal configuration
const HUBSPOT_PORTAL_ID = '244039058';
// Note: You'll need to create a form in HubSpot and use its form GUID here
// For now, using a placeholder - replace with actual form GUID from HubSpot
const HUBSPOT_FORM_GUID = 'maxiwise-signup-form';

interface HubSpotContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  signupDate?: string;
  signupPageUrl?: string;
}

interface HubSpotSubmissionResponse {
  success: boolean;
  error?: string;
}

// Get HubSpot tracking cookie (hutk)
const getHubSpotCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

// Submit form data to HubSpot
export const submitToHubSpot = async (
  contactData: HubSpotContactData
): Promise<HubSpotSubmissionResponse> => {
  // Check consent before submitting
  if (!hasConsent()) {
    console.log('[HubSpot] Skipping submission - no consent');
    return { success: false, error: 'No consent' };
  }
  
  try {
    const attribution = getAttributionForHubSpot();
    const hutk = getHubSpotCookie();
    
    // Prepare form fields for HubSpot
    const fields = [
      { name: 'email', value: contactData.email },
      { name: 'firstname', value: contactData.firstName || '' },
      { name: 'lastname', value: contactData.lastName || '' },
      { name: 'signup_date', value: contactData.signupDate || new Date().toISOString() },
      { name: 'device_type', value: attribution.deviceType },
      { name: 'first_touch_source', value: attribution.firstTouchSource },
      { name: 'first_touch_medium', value: attribution.firstTouchMedium },
      { name: 'first_touch_campaign', value: attribution.firstTouchCampaign },
      { name: 'last_touch_source', value: attribution.lastTouchSource },
      { name: 'last_touch_medium', value: attribution.lastTouchMedium },
      { name: 'last_touch_campaign', value: attribution.lastTouchCampaign },
      { name: 'referrer_url', value: attribution.referrerUrl },
      { name: 'signup_page_url', value: contactData.signupPageUrl || window.location.href },
      { name: 'lifecyclestage', value: 'lead' },
    ];
    
    // Build submission payload
    const payload: any = {
      fields: fields.filter(f => f.value), // Only include fields with values
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    
    // Add hutk cookie if available
    if (hutk) {
      payload.context.hutk = hutk;
    }
    
    // Submit to HubSpot Forms API
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    
    // Handle response
    if (response.ok) {
      console.log('[HubSpot] Contact created/updated successfully');
      return { success: true };
    } else if (response.status >= 500) {
      // Retry once for server errors
      console.warn('[HubSpot] Server error, retrying once...');
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const retryResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (retryResponse.ok) {
        console.log('[HubSpot] Contact created/updated successfully (after retry)');
        return { success: true };
      } else {
        const errorText = await retryResponse.text();
        console.error('[HubSpot] Error after retry:', response.status, errorText);
        return { success: false, error: `Server error: ${response.status}` };
      }
    } else {
      // Client error (4xx) - log and don't retry
      const errorText = await response.text();
      console.error('[HubSpot] Client error:', response.status, errorText);
      return { success: false, error: `Client error: ${response.status}` };
    }
  } catch (error) {
    console.error('[HubSpot] Error submitting to HubSpot:', error);
    return { success: false, error: String(error) };
  }
};

// Helper to extract name parts from email or full name
export const parseNameFromEmail = (email: string): { firstName: string; lastName: string } => {
  const localPart = email.split('@')[0];
  const parts = localPart.split(/[._-]/);
  
  return {
    firstName: parts[0] || '',
    lastName: parts[1] || '',
  };
};

