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

  const buttonBaseClasses = 'px-3 py-1 lg:px-8 lg:py-3 rounded-full lg:text-base lg:font-medium text-sm font-normal transition-all duration-300 cursor-pointer';
  
  const getButtonClasses = (isActive: boolean) => {
    if (variant === 'light') {
      return isActive
        ? 'bg-white text-gray-900 shadow-sm'
        : 'bg-transparent text-gray-600 hover:text-gray-900';
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

