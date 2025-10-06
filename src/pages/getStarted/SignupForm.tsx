import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface SignupFormProps {
  onBackToLogin: () => void;
  mode?: 'signup' | 'login';
}

const SignupForm: React.FC<SignupFormProps> = ({ onBackToLogin, mode = 'signup' }) => {
  const [currentStep, setCurrentStep] = useState<'phone' | 'otp' | 'password' | 'create-password' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [countdown, setCountdown] = useState(24);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  
  // Error states
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
    otp?: string;
    password?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's a valid Indian mobile number (exactly 10 digits)
    // Indian mobile numbers start with 6, 7, 8, or 9
    return cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const isEmail = (input: string): boolean => {
    return input.includes('@');
  };

  const validateInput = (input: string): { isValid: boolean; error?: string } => {
    if (!input.trim()) {
      return { isValid: false, error: 'This field is required.' };
    }

    if (isEmail(input)) {
      if (!validateEmail(input)) {
        return { isValid: false, error: 'Please enter a valid email address.' };
      }
    } else {
      if (!validatePhoneNumber(input)) {
        return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
      }
    }

    return { isValid: true };
  };

  const validateOTP = (otpValue: string): { isValid: boolean; error?: string } => {
    if (!otpValue.trim()) {
      return { isValid: false, error: 'Please enter the OTP.' };
    }
    if (otpValue.length !== 6) {
      return { isValid: false, error: 'OTP must be 6 digits.' };
    }
    if (!/^\d{6}$/.test(otpValue)) {
      return { isValid: false, error: 'OTP must contain only numbers.' };
    }
    return { isValid: true };
  };

  const validatePassword = (passwordValue: string): { isValid: boolean; error?: string } => {
    if (!passwordValue.trim()) {
      return { isValid: false, error: 'Password is required.' };
    }
    if (passwordValue.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long.' };
    }
    return { isValid: true };
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Countdown timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isCountdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isCountdownActive]);

  const handleContinue = () => {
    const validation = validateInput(phoneNumber);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, phoneNumber: validation.error }));
      return;
    }

    // Check if user already has an account (simulate API call)
    const existingUser = checkExistingUser(phoneNumber);
    if (existingUser) {
      setErrors(prev => ({ 
        ...prev, 
        phoneNumber: 'Looks like you already have an account. Try logging in.' 
      }));
      return;
    }

    // Clear errors and proceed
    clearError('phoneNumber');
    setCurrentStep('otp');
    setCountdown(24);
    setIsCountdownActive(true);
  };

  // Simulate checking for existing user
  const checkExistingUser = (input: string): boolean => {
    // This would normally be an API call
    // For demo purposes, let's say these users already exist
    const existingUsers = ['test@example.com', 'user@test.com', '9876543210'];
    return existingUsers.includes(input);
  };

  const handleResendOTP = () => {
    setCountdown(24);
    setIsCountdownActive(true);
    // Here you would typically call your API to resend OTP
  };

  const handleChangePhone = () => {
    setCurrentStep('phone');
    setOtp('');
    setIsCountdownActive(false);
  };

  const handleOTPSubmit = () => {
    const validation = validateOTP(otp);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, otp: validation.error }));
      return;
    }

    // Simulate OTP verification (normally an API call)
    const isValidOTP = verifyOTP(otp);
    if (!isValidOTP) {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
      return;
    }

    // Clear errors and proceed
    clearError('otp');
    console.log('Verifying OTP:', otp);
    setCurrentStep('success');
  };

  // Simulate OTP verification
  const verifyOTP = (otpValue: string): boolean => {
    // For demo purposes, let's say '123456' is always valid
    // In real implementation, this would be an API call
    return otpValue === '123456' || Math.random() > 0.3; // 70% success rate for demo
  };

  const handleUsePassword = () => {
    setCurrentStep('password');
  };

  const handleUseOTP = () => {
    setCurrentStep('otp');
  };

  const handlePasswordSubmit = () => {
    const validation = validatePassword(password);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, password: validation.error }));
      return;
    }

    // Simulate password verification (normally an API call)
    const isValidPassword = verifyPassword(phoneNumber, password);
    if (!isValidPassword) {
      setErrors(prev => ({ ...prev, password: 'Incorrect password. Please try again.' }));
      return;
    }

    // Clear errors and proceed
    clearError('password');
    console.log('Logging in with password:', password);
    setCurrentStep('success');
  };

  // Simulate password verification
  const verifyPassword = (_user: string, passwordValue: string): boolean => {
    // For demo purposes, let's say 'password123' is always valid
    // In real implementation, this would be an API call
    return passwordValue === 'password123' || Math.random() > 0.4; // 60% success rate for demo
  };

  const handleForgotPassword = () => {
    setCurrentStep('create-password');
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 50) return { text: "Weak! Please add more strength! 💪", color: "text-red-500" };
    if (strength < 75) return { text: "Good! Getting stronger 💪", color: "text-yellow-500" };
    return { text: "Strong! Perfect! 🔒", color: "text-green-500" };
  };

  const handleCreatePasswordSubmit = () => {
    // Validate new password
    const newPasswordValidation = validatePassword(newPassword);
    if (!newPasswordValidation.isValid) {
      setErrors(prev => ({ ...prev, newPassword: newPasswordValidation.error }));
      return;
    }

    // Check password strength
    const strength = getPasswordStrength(newPassword);
    if (strength < 50) {
      setErrors(prev => ({ ...prev, newPassword: 'Password is too weak. Please choose a stronger password.' }));
      return;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password.' }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      return;
    }

    // Clear errors and proceed
    clearError('newPassword');
    clearError('confirmPassword');
    console.log('Creating new password:', newPassword);
    setCurrentStep('success');
  };

  // Error display component
  const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;
    return (
      <p className="text-red-500 text-sm font-outfit font-medium mt-1 flex items-center">
        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {message}
      </p>
    );
  };

  return (
    <div className="w-full max-w-sm">
      {currentStep === 'phone' ? (
        <>
          {/* Phone Input Step */}
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-outfit font-semibold text-2xl text-navy mb-2 leading-[31px] tracking-[-1%]">
              {mode === 'login' ? 'Welcome back!' : 'Let\'s get started'}
            </h1>
            <p className="font-outfit text-[#4B5563] font-light text-base">
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <button 
                    onClick={onBackToLogin}
                    className="text-[#170630] underline font-medium"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    onClick={onBackToLogin}
                    className="text-[#170630] underline font-medium"
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Email/Phone Input */}
          <div className="mb-4">
            <label className="block text-[#4B5563] font-outfit font-medium text-sm mb-2">
              Email / Phone
            </label>
            <Input
              type="text"
              placeholder="Enter your email/phone"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (errors.phoneNumber) {
                  clearError('phoneNumber');
                }
              }}
              className={`w-full px-4 py-3 rounded-lg font-outfit text-base font-extralight focus:outline-none focus:border-transparent ${
                errors.phoneNumber 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#E2E8F0]'
              }`}
            />
            <ErrorMessage message={errors.phoneNumber} />
          </div>

          {/* Continue Button */}
          <Button 
            variant="primary" 
            color="purple" 
            size="lg" 
            fullWidth
            onClick={handleContinue}
            className="py-3 text-base font-medium text-white mb-4"
          >
            Continue
          </Button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <span className="flex-1 px-3 text-[#4B5563] font-normal font-outfit text-sm text-center">Or</span>
          </div>

          {/* Google Sign In */}
          <Button 
            variant="outline" 
            color="purple" 
            size="md" 
            fullWidth
            className="py-3 text-base font-medium border-[#E2E8F0] text-navy hover:bg-transparent hover:text-navy"
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
              <p><a href="#" className="text-[#4B5563] hover:underline text-sm font-medium">
                Terms, Privacy & Security
              </a>{' '}
              policies.
            </p>
          </div>
        </>
      ) : currentStep === 'otp' ? (
        <>
          {/* OTP Verification Step */}
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-outfit font-semibold text-2xl text-[#170630] mb-2">
              Verify your account
            </h1>
            <p className="font-outfit text-[#4B5563] font-normal text-base">
              We've sent a 6-digit code to <span className="font-medium text-[#170630]">{phoneNumber}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
                if (errors.otp) {
                  clearError('otp');
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg font-outfit text-base text-center tracking-widest focus:outline-none focus:border-transparent ${
                errors.otp 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
              maxLength={6}
            />
            <ErrorMessage message={errors.otp} />
          </div>

          {/* Resend OTP and Change Phone */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <button
              onClick={handleResendOTP}
              disabled={isCountdownActive}
              className={`font-outfit font-medium ${
                isCountdownActive 
                  ? 'text-[#4B5563] cursor-not-allowed' 
                  : 'text-[#8B5CF6] hover:underline'
              }`}
            >
              {isCountdownActive ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
            
            <button
              onClick={handleChangePhone}
              className="font-outfit font-medium text-[#170630] hover:underline"
            >
              Change Email / Phone
            </button>
          </div>

          {/* Submit Button */}
          <Button 
            variant="primary" 
            color="purple" 
            size="lg" 
            fullWidth
            onClick={handleOTPSubmit}
            disabled={otp.length !== 6}
            className="py-3 text-base font-medium text-white mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </Button>

          {/* Use Password Button */}
          <div className="text-center mb-4">
            <button
              onClick={handleUsePassword}
              className="font-outfit font-medium text-[#170630] hover:underline text-base"
            >
              Use Password
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center mt-4 text-[#4B5563] font-outfit">
            <p className="text-xs font-normal">
              By continuing, you agree to our{' '}</p>
             <p><a href="#" className="text-[#4B5563] hover:underline text-xs font-medium">
                Terms, Privacy & Security
              </a>{' '}
              policies.
            </p>
          </div>
        </>
      ) : currentStep === 'password' ? (
        <>
          {/* Password Login Step */}
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-outfit font-semibold text-2xl text-[#170630] mb-2">
              Log In with Your Password
            </h1>
            <p className="font-outfit text-[#4B5563] font-normal text-base">
              Please enter the password associates with{' '}
              <span className="font-medium text-[#170630]">{phoneNumber}</span>
            </p>
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  clearError('password');
                }
              }}
              className={`w-full px-4 py-3 pr-12 border rounded-lg font-outfit text-base focus:outline-none focus:border-transparent ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            <ErrorMessage message={errors.password} />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="font-outfit font-medium text-[#170630] underline">Remember me</span>
            </label>
            
            <button
              onClick={handleForgotPassword}
              className="font-outfit font-medium text-[#8B5CF6] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Log In Button */}
          <Button 
            variant="primary" 
            color="purple" 
            size="lg" 
            fullWidth
            onClick={handlePasswordSubmit}
            disabled={!password.trim()}
            className="py-3 text-base font-medium text-white mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log In
          </Button>

          {/* Use OTP Button */}
          <div className="text-center mb-4">
            <button
              onClick={handleUseOTP}
              className="font-outfit font-medium text-[#170630] hover:underline text-base"
            >
              Use OTP
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center mt-4 text-[#4B5563] font-outfit">
            <p className="text-xs font-normal">
              By continuing, you agree to our{' '}</p>
             <p><a href="#" className="text-[#4B5563] hover:underline text-xs font-medium">
                Terms, Privacy & Security
              </a>{' '}
              policies.
            </p>
          </div>
        </>
      ) : currentStep === 'create-password' ? (
        <>
          {/* Create New Password Step */}
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-outfit font-semibold text-2xl text-[#170630] mb-2">
              Create a new password
            </h1>
            <p className="font-outfit text-[#4B5563] font-normal text-base">
              Choose a strong password to keep your account secure.
            </p>
          </div>

          {/* New Password Input */}
          <div className="mb-4 relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) {
                  clearError('newPassword');
                }
              }}
              className={`w-full px-4 py-3 pr-12 border rounded-lg font-outfit text-base focus:outline-none focus:border-transparent ${
                errors.newPassword 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            <ErrorMessage message={errors.newPassword} />
          </div>

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mb-4">
              <div className="flex mb-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full mr-1">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      getPasswordStrength(newPassword) >= 25 ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                    style={{ width: getPasswordStrength(newPassword) >= 25 ? '100%' : '0%' }}
                  ></div>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full mr-1">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      getPasswordStrength(newPassword) >= 50 ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}
                    style={{ width: getPasswordStrength(newPassword) >= 50 ? '100%' : '0%' }}
                  ></div>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full mr-1">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      getPasswordStrength(newPassword) >= 75 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    style={{ width: getPasswordStrength(newPassword) >= 75 ? '100%' : '0%' }}
                  ></div>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      getPasswordStrength(newPassword) >= 100 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    style={{ width: getPasswordStrength(newPassword) >= 100 ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>
              <p className={`text-sm font-outfit font-medium ${getPasswordStrengthText(getPasswordStrength(newPassword)).color}`}>
                {getPasswordStrengthText(getPasswordStrength(newPassword)).text}
              </p>
            </div>
          )}

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) {
                  clearError('confirmPassword');
                }
              }}
              className={`w-full px-4 py-3 pr-12 border rounded-lg font-outfit text-base focus:outline-none focus:border-transparent ${
                errors.confirmPassword 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            <ErrorMessage message={errors.confirmPassword} />
          </div>

          {/* Log In Button */}
          <Button 
            variant="primary" 
            color="purple" 
            size="lg" 
            fullWidth
            onClick={handleCreatePasswordSubmit}
            disabled={!newPassword.trim() || !confirmPassword.trim() || newPassword !== confirmPassword}
            className="py-3 text-base font-medium text-white mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log In
          </Button>

          {/* Terms and Privacy */}
          <div className="text-center mt-4 text-[#4B5563] font-outfit">
            <p className="text-xs font-normal">
              By continuing, you agree to our{' '}</p>
             <p><a href="#" className="text-[#4B5563] hover:underline text-xs font-medium">
                Terms, Privacy & Security
              </a>{' '}
              policies.
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Success State */}
          <div className="flex items-center justify-center h-full min-h-[300px] relative">
            {/* Outermost Eclipse Ring */}
            <div className="absolute w-32 h-32 border border-gray-100 rounded-full animate-ping opacity-15" 
                 style={{ 
                   animationDuration: '2s',
                   animationDelay: '0s'
                 }}>
            </div>

            <div className="absolute w-28 h-28 border border-gray-200 rounded-full animate-ping opacity-20" 
                 style={{ 
                   animationDuration: '2s',
                   animationDelay: '0.5s'
                 }}>
            </div>
            
            {/* Third Eclipse Ring */}
            <div className="absolute w-24 h-24 border border-gray-300 rounded-full animate-ping opacity-25" 
                 style={{ 
                   animationDuration: '2s',
                   animationDelay: '1s'
                 }}>
            </div>
            
            {/* Second Eclipse Ring */}
            <div className="absolute w-20 h-20 border border-gray-400 rounded-full animate-ping opacity-30" 
                 style={{ 
                   animationDuration: '2s',
                   animationDelay: '1.5s'
                 }}>
            </div>
            
            {/* Inner Eclipse Ring */}
            <div className="absolute w-16 h-16 border border-gray-500 rounded-full animate-ping opacity-35" 
                 style={{ 
                   animationDuration: '2s',
                   animationDelay: '2s'
                 }}>
            </div>
            
            {/* Central Checkmark */}
            <div className="relative flex items-center justify-center w-16 h-16 bg-[#8B5CF6] rounded-full shadow-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;