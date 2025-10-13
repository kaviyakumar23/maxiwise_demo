import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the card determines the styling
   * - default: White background with border
   * - filled: Filled background (gray-50)
   * - flat: White background without border
   */
  variant?: "default" | "filled" | "flat";
  
  /**
   * The size affects padding
   * - sm: Small padding (p-4)
   * - md: Medium padding (p-4 md:p-6)
   * - lg: Large padding (p-4 md:p-6 lg:p-8)
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Border radius size
   * - default: rounded-2xl
   * - sm: rounded-xl md:rounded-2xl
   * - lg: rounded-2xl md:rounded-3xl
   */
  rounded?: "default" | "sm" | "lg";
  
  /**
   * Enable hover effect
   */
  hover?: boolean;
  
  /**
   * Make the card clickable with cursor pointer
   */
  clickable?: boolean;
  
  /**
   * Additional className for custom styling
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

/**
 * Card Component
 * 
 * A flexible card component with white background and customizable border radius.
 * Supports multiple variants, sizes, and interactive states.
 * 
 * @example
 * ```tsx
 * // Default card with border
 * <Card>
 *   <p>Content</p>
 * </Card>
 * 
 * // Filled card with hover effect
 * <Card variant="filled" hover clickable>
 *   <p>Clickable content</p>
 * </Card>
 * 
 * // Large card without border
 * <Card variant="flat" size="lg">
 *   <p>Large content</p>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      size = "md",
      rounded = "default",
      hover = false,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "transition-all duration-300";
    
    const variantStyles = {
      default: "bg-white border border-gray-200",
      filled: "bg-gray-50 border border-gray-200",
      flat: "bg-white",
    };
    
    const sizeStyles = {
      sm: "p-4",
      md: "p-4 md:p-6",
      lg: "p-4 md:p-6 lg:p-8",
    };
    
    const roundedStyles = {
      default: "rounded-2xl",
      sm: "rounded-xl md:rounded-2xl",
      lg: "rounded-2xl md:rounded-3xl",
    };
    
    const interactiveStyles = cn(
      hover && "hover:bg-gray-100 hover:shadow-md",
      clickable && "cursor-pointer"
    );
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          roundedStyles[rounded],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

