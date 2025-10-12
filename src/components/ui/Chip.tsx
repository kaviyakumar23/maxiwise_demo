import React from 'react';

interface ChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isActive = false,
  onClick,
  variant = 'primary',
}) => {
  const baseClasses = 'px-5 py-1 md:px-7 md:py-2 lg:px-8 lg:py-3 rounded-full lg:text-base lg:font-medium text-sm font-normal transition-all duration-300 cursor-pointer';
  
  const variantClasses = {
    primary: isActive
      ? 'bg-[#F7F1FF] font-medium text-base font-outfit text-purple border-1 border-[#D5B8FF]'
      : 'bg-white font-medium text-base font-outfit text-[#4B5563] border-1 border-[#CBD5E1] hover:border-gray-300',
    secondary: isActive
      ? 'bg-gray-800 font-medium text-base font-outfit text-white'
      : 'bg-gray-100 font-medium text-base font-outfit text-gray-600 hover:bg-gray-200',
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

