import { createFileRoute } from '@tanstack/react-router';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

export const Route = createFileRoute('/sso-callback')({
  component: SSOCallback,
});

function SSOCallback() {
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

