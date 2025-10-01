import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Button color theme */
  color?: 'purple' | 'lime' | 'indigo' | 'light-purple';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Button children */
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    color = 'purple',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-outfit font-medium',
      'rounded-full',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed',
      'select-none',
      'cursor-pointer'
    ];

    const variants = {
      primary: {
        purple: 'bg-[#AC72FF] text-white hover:bg-[#9A5EFF] focus:ring-[#AC72FF] disabled:bg-[#E8D8FF] disabled:text-[#D4B6FF] shadow-lg hover:shadow-xl',
        lime: 'bg-[#D1F349] text-[#170630] hover:bg-[#C7ED35] focus:ring-[#D1F349] disabled:bg-[#E8F3A3] disabled:text-[#7A8442] shadow-lg hover:shadow-xl',
        indigo: 'bg-[#170630] text-[#D1F349] hover:bg-[#1F0A3D] focus:ring-[#170630] disabled:bg-[#2A1B4A] disabled:text-[#7A8442] shadow-lg hover:shadow-xl',
        'light-purple': 'bg-[#E8D8FF] text-[#D4B6FF] hover:bg-[#DCC7FF] focus:ring-[#E8D8FF] disabled:bg-[#F0E8FF] disabled:text-[#E0CAFF] shadow-sm'
      },
      secondary: {
        purple: 'bg-[#E8D8FF] text-[#AC72FF] hover:bg-[#DCC7FF] focus:ring-[#AC72FF]',
        lime: 'bg-[#E8F3A3] text-[#170630] hover:bg-[#DCE895] focus:ring-[#D1F349]',
        indigo: 'bg-[#2A1B4A] text-[#AC72FF] hover:bg-[#332356] focus:ring-[#170630]',
        'light-purple': 'bg-[#F0E8FF] text-[#AC72FF] hover:bg-[#E8D8FF] focus:ring-[#AC72FF]'
      },
      outline: {
        purple: 'border-2 border-[#AC72FF] text-[#AC72FF] hover:bg-[#AC72FF] hover:text-white focus:ring-[#AC72FF] bg-transparent',
        lime: 'border-2 border-[#D1F349] text-[#D1F349] hover:bg-[#D1F349] hover:text-[#170630] focus:ring-[#D1F349] bg-transparent',
        indigo: 'border-2 border-[#170630] text-[#170630] hover:bg-[#170630] hover:text-white focus:ring-[#170630] bg-transparent',
        'light-purple': 'border-2 border-[#E8D8FF] text-[#AC72FF] hover:bg-[#E8D8FF] focus:ring-[#E8D8FF] bg-transparent'
      },
      ghost: {
        purple: 'text-[#AC72FF] hover:bg-[#E8D8FF] focus:ring-[#AC72FF] bg-transparent',
        lime: 'text-[#D1F349] hover:bg-[#E8F3A3] focus:ring-[#D1F349] bg-transparent',
        indigo: 'text-[#170630] hover:bg-[#F5F5F5] focus:ring-[#170630] bg-transparent',
        'light-purple': 'text-[#D4B6FF] hover:bg-[#F0E8FF] focus:ring-[#E8D8FF] bg-transparent'
      },
      link: {
        purple: 'text-[#AC72FF] hover:text-[#9A5EFF] underline-offset-4 hover:underline focus:ring-[#AC72FF] bg-transparent',
        lime: 'text-[#D1F349] hover:text-[#C7ED35] underline-offset-4 hover:underline focus:ring-[#D1F349] bg-transparent',
        indigo: 'text-[#170630] hover:text-[#1F0A3D] underline-offset-4 hover:underline focus:ring-[#170630] bg-transparent',
        'light-purple': 'text-[#D4B6FF] hover:text-[#C8A7FF] underline-offset-4 hover:underline focus:ring-[#E8D8FF] bg-transparent'
      }
    };

    const sizes = {
      xs: 'px-4 py-1 text-xs',
      sm: 'px-6 py-1.5 text-sm',
      md: 'px-8 py-2 text-base',
      lg: 'px-12 py-3 text-lg',
      xl: 'px-16 py-4 text-xl'
    };

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7'
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant][color],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const iconClass = iconSizes[size];

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className={cn('animate-spin', iconClass)} fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon && (
          <span className={iconClass}>{leftIcon}</span>
        )}
        {children}
        {rightIcon && !loading && (
          <span className={iconClass}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;