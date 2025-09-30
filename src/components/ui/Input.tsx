import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant */
  variant?: 'default' | 'filled' | 'outlined' | 'flushed' | 'unstyled';
  /** Input size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color theme */
  colorScheme?: 'gray' | 'blue' | 'purple' | 'green' | 'red';
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Left element (for more complex content) */
  leftElement?: React.ReactNode;
  /** Right element (for more complex content) */
  rightElement?: React.ReactNode;
  /** Error state */
  isInvalid?: boolean;
  /** Success state */
  isValid?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Label */
  label?: string;
  /** Required field indicator */
  isRequired?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Rounded variant */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show keyboard shortcut (like ⌘K) */
  keyboardShortcut?: string[];
  /** Container className */
  containerClassName?: string;
  /** Label className */
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'default',
    size = 'md',
    colorScheme = 'gray',
    leftIcon,
    rightIcon,
    leftElement,
    rightElement,
    isInvalid = false,
    isValid = false,
    isLoading = false,
    errorMessage,
    helperText,
    label,
    isRequired = false,
    fullWidth = true,
    rounded = 'full',
    keyboardShortcut,
    containerClassName,
    labelClassName,
    className,
    disabled,
    ...props
  }, ref) => {
    
    const baseInputStyles = [
      'font-outfit',
      'transition-all duration-200',
      'focus:outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-500'
    ];

    const sizeStyles = {
      xs: {
        input: 'px-3 py-1.5 text-xs',
        icon: 'w-3 h-3',
        leftPadding: 'pl-8',
        rightPadding: 'pr-8'
      },
      sm: {
        input: 'px-4 py-2 text-sm',
        icon: 'w-4 h-4',
        leftPadding: 'pl-10',
        rightPadding: 'pr-10'
      },
      md: {
        input: 'px-5 py-3 text-base',
        icon: 'w-5 h-5',
        leftPadding: 'pl-12',
        rightPadding: 'pr-12'
      },
      lg: {
        input: 'px-6 py-4 text-lg',
        icon: 'w-6 h-6',
        leftPadding: 'pl-14',
        rightPadding: 'pr-14'
      },
      xl: {
        input: 'px-8 py-5 text-xl',
        icon: 'w-7 h-7',
        leftPadding: 'pl-16',
        rightPadding: 'pr-16'
      }
    };

    const roundedStyles = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    };

    const variantStyles = {
      default: {
        container: 'bg-white border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100',
        input: 'bg-transparent text-gray-900',
        invalid: 'border-red-300 focus-within:border-red-500 focus-within:ring-red-100',
        valid: 'border-green-300 focus-within:border-green-500 focus-within:ring-green-100'
      },
      filled: {
        container: 'bg-gray-100 border border-transparent focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-100',
        input: 'bg-transparent text-gray-900',
        invalid: 'bg-red-50 border-red-300 focus-within:border-red-500 focus-within:ring-red-100',
        valid: 'bg-green-50 border-green-300 focus-within:border-green-500 focus-within:ring-green-100'
      },
      outlined: {
        container: 'bg-transparent border-2 border-gray-300 focus-within:border-gray-500',
        input: 'bg-transparent text-gray-900',
        invalid: 'border-red-400 focus-within:border-red-600',
        valid: 'border-green-400 focus-within:border-green-600'
      },
      flushed: {
        container: 'bg-transparent border-0 border-b-2 border-gray-300 focus-within:border-gray-500 rounded-none',
        input: 'bg-transparent text-gray-900',
        invalid: 'border-red-400 focus-within:border-red-600',
        valid: 'border-green-400 focus-within:border-green-600'
      },
      unstyled: {
        container: 'bg-transparent border-0',
        input: 'bg-transparent text-gray-900',
        invalid: '',
        valid: ''
      }
    };

    const getContainerStyles = () => {
      const base = variantStyles[variant].container;
      const state = isInvalid ? variantStyles[variant].invalid : 
                   isValid ? variantStyles[variant].valid : '';
      return cn(base, state);
    };

    const getInputPadding = () => {
      let paddingLeft = sizeStyles[size].input.split(' ')[0]; // px-value
      let paddingRight = sizeStyles[size].input.split(' ')[0]; // px-value
      
      if (leftIcon || leftElement) {
        paddingLeft = sizeStyles[size].leftPadding;
      }
      if (rightIcon || rightElement || keyboardShortcut) {
        paddingRight = sizeStyles[size].rightPadding;
      }
      
      return `${paddingLeft} ${paddingRight}`;
    };

    const inputClasses = cn(
      baseInputStyles,
      variantStyles[variant].input,
      sizeStyles[size].input.split(' ').slice(1), // Remove padding, will be handled separately
      getInputPadding(),
      variant !== 'flushed' && roundedStyles[rounded],
      fullWidth && 'w-full',
      className
    );

    const containerClasses = cn(
      'relative',
      getContainerStyles(),
      variant !== 'flushed' && roundedStyles[rounded],
      fullWidth && 'w-full',
      containerClassName
    );

    const iconClass = cn('text-gray-500', sizeStyles[size].icon);
    const loadingIconClass = cn('animate-spin text-gray-500', sizeStyles[size].icon);

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label className={cn('block text-sm font-medium text-gray-700', labelClassName)}>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className={containerClasses}>
          {/* Left Icon/Element */}
          {(leftIcon || leftElement) && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
              {leftElement || (
                <span className={iconClass}>
                  {leftIcon}
                </span>
              )}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled || isLoading}
            aria-invalid={isInvalid}
            aria-required={isRequired}
            {...props}
          />

          {/* Right Side Content */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isLoading && (
              <svg className={loadingIconClass} fill="none" viewBox="0 0 24 24">
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
            )}
            
            {keyboardShortcut && !isLoading && (
              <div className="flex items-center gap-1">
                {keyboardShortcut.map((key, index) => (
                  <kbd
                    key={index}
                    className={cn(
                      'font-mono text-slate-400',
                      key === '⌘' ? 'text-lg' : 'text-sm'
                    )}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            )}

            {rightElement && !isLoading && rightElement}
            
            {rightIcon && !isLoading && !rightElement && (
              <span className={iconClass}>
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || errorMessage) && (
          <p className={cn(
            'text-sm',
            isInvalid ? 'text-red-600' : 'text-gray-500'
          )}>
            {isInvalid ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;