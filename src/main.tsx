import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { routeTree } from './routeTree.gen'
import './index.css'
import App from './App.tsx'
import { initAttribution } from './utils/attribution'
import { initAnalytics } from './utils/analytics'
import { hasConsent } from './utils/consent'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Import Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file')
}

// Analytics initialization wrapper
const AppWithAnalytics = () => {
  useEffect(() => {
    // Initialize attribution tracking (always, regardless of consent)
    initAttribution();
    
    // Initialize analytics if user has already consented
    if (hasConsent()) {
      initAnalytics();
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <App />
    </>
  );
};

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AppWithAnalytics />
      </ClerkProvider>
    </StrictMode>,
  )
}