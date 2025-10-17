import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth, useSignUp } from '@clerk/clerk-react';
import CreateAccount from "../../assets/images/CreateAccount.png";
import Button from "../../components/ui/Button";
import SignupForm from "./SignupForm";

// Context for managing login modal state
interface LoginModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
};

// Provider component
interface LoginModalProviderProps {
  children: ReactNode;
}

export const LoginModalProvider: React.FC<LoginModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {/* Render modal when open */}
      {isOpen && <LoginModalComponent onClose={closeModal} />}
    </LoginModalContext.Provider>
  );
};

// Modal component
interface LoginModalComponentProps {
  onClose: () => void;
}

const LoginModalComponent: React.FC<LoginModalComponentProps> = ({ onClose }) => {
  const { isSignedIn } = useAuth();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const [signupMode, setSignupMode] = useState<'signup' | 'login'>('signup');

  // Close modal when user is signed in
  useEffect(() => {
    if (isSignedIn) {
      // Small delay to show success animation
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSignedIn, onClose]);

  // Google OAuth handler
  const handleGoogleSignIn = async () => {
    if (!signUpLoaded) return;

    try {
      // Use signUp for new users, will automatically redirect to signIn if user exists
      await signUp?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (err: any) {
      console.error('Error signing in with Google:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content - Desktop: Center, Mobile/Tablet: Bottom slide-up */}
      <div className="relative z-10 h-full flex items-center justify-center lg:items-center lg:justify-center">
        {/* Desktop Layout */}
        <div className="hidden lg:block max-h-[90vh] max-w-[90vw] overflow-auto rounded-2xl shadow-2xl">
          <div className="grid grid-cols-2 w-full max-w-4xl min-w-[896px] mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Left Section - Purple Gradient with 3D Graphics */}
            <div className="bg-[#D4B6FF] flex flex-col justify-center items-start relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-16 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </div>
              
              {/* Main Content */}
              <div className="relative z-10">
                <div className="font-outfit font-medium text-5xl text-navy px-12 py-12">
                <h1 className="mb-4">
                  Built for</h1>
                  <h1>
                  Everyone
                </h1>
                </div>
                
                {/* 3D Arrow Graphic */}
                <div className="relative">
                  <img 
                    src={CreateAccount} 
                    alt="3D Arrow" 
                    className="w-84 h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="bg-white flex flex-col justify-center items-center px-12 py-12 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {currentView === 'login' ? (
                <div className="w-full max-w-sm mx-auto">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h1 className="font-outfit font-semibold text-2xl text-[#170630] mb-2">
                      Welcome to Maxiwise
                    </h1>
                    <p className="font-outfit text-[#4B5563] font-normal text-base">
                      Create an account or log in to continue.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-5">
                    <Button 
                      variant="primary" 
                      color="purple" 
                      size="lg" 
                      fullWidth
                      className="py-3 text-base font-medium text-white"
                      onClick={() => {
                        setSignupMode('signup');
                        setCurrentView('signup');
                      }}
                    >
                      Get Started
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      color="indigo" 
                      size="lg" 
                      fullWidth
                      className="py-3 text-base font-medium text-white"
                      onClick={() => {
                        setSignupMode('login');
                        setCurrentView('signup');
                      }}
                    >
                      Log In
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-5">
                    <span className="flex-1 px-3 text-[#4B5563] font-normal font-outfit text-sm text-center">Or continue with</span>
                  </div>

                  {/* Google Sign In */}
                  <Button 
                    variant="outline" 
                    color="purple" 
                    size="md" 
                    fullWidth
                    onClick={handleGoogleSignIn}
                    className="py-3 text-base font-medium border-gray-300 text-navy hover:bg-transparent hover:text-navy hover:border-gray-300"
                    leftIcon={
                      <svg className="w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    }
                  >
                    Continue with Google
                  </Button>

                  {/* Terms and Privacy */}
                  <div className="text-center mt-4 text-[#4B5563] font-outfit">
            <p className="text-xs font-normal">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#4B5563] hover:underline font-medium">
                Terms, Privacy & Security
              </a>{' '}
              policies.
            </p>
          </div>
                </div>
              ) : (
                <div className="w-full max-w-sm mx-auto">
                  <SignupForm 
                    onBackToLogin={() => setCurrentView('login')} 
                    onSwitchMode={(mode) => setSignupMode(mode)}
                    mode={signupMode} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Bottom slide-up */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="px-6 pb-8 pt-4">
            {currentView === 'login' ? (
              <>
                {/* Header with specified typography */}
                <div className="text-center mb-8">
                  <h1 className="text-navy text-xl font-semibold font-outfit leading-[28px] tracking-[-1%] mb-2">
                    Welcome to Maxiwise
                  </h1>
                  <p className="text-[#4B5563] text-sm font-normal font-outfit leading-[20px] tracking-[-0.6%]">
                    Create an account or log in to continue.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-6">
                  <Button 
                    variant="primary" 
                    color="purple" 
                    size="lg" 
                    fullWidth
                    className="py-4 text-base font-medium text-white"
                    onClick={() => {
                      setSignupMode('signup');
                      setCurrentView('signup');
                    }}
                  >
                    Get Started
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    color="indigo" 
                    size="lg" 
                    fullWidth
                    className="py-4 text-base font-medium text-white"
                    onClick={() => {
                      setSignupMode('login');
                      setCurrentView('signup');
                    }}
                  >
                    Log In
                  </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <span className="flex-1 text-[#4B5563] font-normal font-outfit text-sm text-center">Or</span>
                </div>

                {/* Google Sign In */}
                <Button 
                  variant="outline" 
                  color="purple" 
                  size="lg" 
                  fullWidth
                  onClick={handleGoogleSignIn}
                  className="py-4 text-base font-medium border-gray-300 text-navy hover:border-gray-300 mb-6"
                  leftIcon={
                    <svg className="w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                >
                  Continue with Google
                </Button>

                {/* Terms and Privacy */}
                <div className="text-center mt-4 text-[#4B5563] font-outfit">
            <p className="text-xs font-normal">
              By continuing, you agree to our{' '}</p>
              <p><a href="#" className="text-[#4B5563] hover:underline font-medium">
                Terms, Privacy & Security
              </a>{' '}
              <span className="text-xs font-normal">policies.</span>
            </p>
          </div>
              </>
            ) : (
              <SignupForm 
                onBackToLogin={() => setCurrentView('login')} 
                onSwitchMode={(mode) => setSignupMode(mode)}
                mode={signupMode} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
