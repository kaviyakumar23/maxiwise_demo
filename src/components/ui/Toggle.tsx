import React from 'react';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps {
  options: ToggleOption[];
  activeValue: string;
  onChange: (value: string) => void;
  variant?: 'light' | 'dark';
}

export const Toggle: React.FC<ToggleProps> = ({
  options,
  activeValue,
  onChange,
  variant = 'light',
}) => {
  const containerClasses = variant === 'light' 
    ? 'bg-gray-100 rounded-full inline-flex gap-1'
    : 'bg-gray-800 rounded-full inline-flex gap-1';

  const buttonBaseClasses = 'px-3 py-1 lg:px-8 lg:py-3 md:px-6 md:py-2 rounded-full transition-all duration-300 cursor-pointer';
  
  const getButtonClasses = (isActive: boolean) => {
    if (variant === 'light') {
      return isActive
        ? 'bg-white text-navy lg:font-semibold md:font-medium sm:font-medium lg:text-base md:text-base text-sm text-navy shadow-sm'
        : 'bg-transparent text-gray-600 lg:font-medium md:font-normal sm:font-normal font-outfit text-[#4B5563] lg:text-base md:text-base text-sm  hover:text-gray-900';
    } else {
      return isActive
        ? 'bg-gray-700 text-white shadow-sm'
        : 'bg-transparent text-gray-400 hover:text-gray-200';
    }
  };

  return (
    <div className={containerClasses}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${buttonBaseClasses} ${getButtonClasses(activeValue === option.value)}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

