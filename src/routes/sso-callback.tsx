import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AuthenticateWithRedirectCallback, useAuth, useUser } from '@clerk/clerk-react';
import { trackSignupCompleted } from '../utils/analytics';
import { submitToHubSpot, parseNameFromEmail } from '../utils/hubspot';

export const Route = createFileRoute('/sso-callback')({
  component: SSOCallback,
});

function SSOCallback() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  useEffect(() => {
    // Track signup completion when OAuth is successful
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress || '';
      const userId = user.id;
      
      if (email && userId) {
        // Track in Mixpanel
        trackSignupCompleted(userId, email, 'google');
        
        // Submit to HubSpot
        const nameParts = parseNameFromEmail(email);
        submitToHubSpot({
          email,
          firstName: user.firstName || nameParts.firstName,
          lastName: user.lastName || nameParts.lastName,
          fullName: user.fullName || undefined,
          signupDate: new Date().toISOString(),
          signupPageUrl: window.location.origin,
        }).catch(error => {
          console.error('[SSO Callback] Error submitting to HubSpot:', error);
        });
      }
    }
  }, [isSignedIn, user]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AuthenticateWithRedirectCallback
        afterSignInUrl="/"
        afterSignUpUrl="/"
        redirectUrl="/"
      />
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600 font-outfit">Completing sign in...</p>
      </div>
    </div>
  );
}

