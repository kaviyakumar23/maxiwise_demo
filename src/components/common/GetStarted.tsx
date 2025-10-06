import React from 'react';
import Button, { type ButtonProps } from "../ui/Button"
import { cn } from '../../utils/cn';
import { useLoginModal } from '../../pages/getStarted/LoginModal';

const GetStarted: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = 'purple',
  size = 'lg',
  className,
  onClick,
  ...props
}) => {
  const { openModal } = useLoginModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
    // Open the login modal
    openModal();
  };

  return (
    <div className={cn('w-full', className)}>
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
        Get Started
      </Button>
    </div>
  )
}

export default GetStarted
