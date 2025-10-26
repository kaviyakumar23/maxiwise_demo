import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import Button, { type ButtonProps } from "../ui/Button"
import { cn } from '../../utils/cn';
import { useLoginModal } from '../../pages/getStarted/LoginModal';

const GetStarted: React.FC<ButtonProps & { children?: React.ReactNode }> = ({
  variant = 'primary',
  color = 'purple',
  size = 'lg',
  className,
  onClick,
  children,
  ...props
}) => {
  const { openModal } = useLoginModal();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // If user is signed in, navigate to funds page
    if (isSignedIn) {
      navigate({ to: '/fund' });
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    } else {
      // Otherwise open the login modal
      openModal();
    }
  };

  return (
    <Button 
      variant={variant} 
      color={color} 
      size={size} 
      className={cn(
        'font-outfit',
        'transition-all duration-200',
        'focus:outline-none',
        'text-base',
        className
      )} 
      onClick={handleClick}
      {...props}
    >
      {children || 'Get Started'}
    </Button>
  )
}

export default GetStarted
