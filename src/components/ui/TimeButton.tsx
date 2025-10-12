import React from 'react';

interface TimeButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'light' | 'dark';
}

export const TimeButton: React.FC<TimeButtonProps> = ({
  label,
  isActive = false,
  onClick,
  variant = 'light',
}) => {
  const baseClasses = 'px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer min-w-[50px] md:min-w-[60px] lg:min-w-[80px]';
  
  const variantClasses = {
    light: isActive
      ? 'bg-purple-100 text-purple border-2 border-purple'
      : 'bg-[#F8FAFC] text-[#4B5563] hover:border-gray-300',
    dark: isActive
      ? 'bg-purple-100 text-purple-600 border-2 border-purple-600'
      : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

