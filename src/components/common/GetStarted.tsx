import React from 'react';
import Button, { type ButtonProps } from "../ui/Button"
import { cn } from '../../utils/cn';

const GetStarted: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = 'purple',
  size = 'lg',
  className,
  ...props
}) => {
  return (
    <div className={cn('w-full', className)}>
      <Button variant={variant} color={color} size={size} className={cn(
          'font-outfit',
          'transition-all duration-200',
          'focus:outline-none',
          className
        )} {...props}>Get Started</Button>

    </div>
  )
}

export default GetStarted
