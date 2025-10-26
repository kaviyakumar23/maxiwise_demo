import React, { useState } from 'react';
import Input, { type InputProps } from "../ui/Input";
import { cn } from "../../utils/cn";
import SearchModal from "./SearchModal";

// Extended props for Search component
interface SearchProps extends InputProps {
  showShortcut?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

// Search Icon Component
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);


const Search: React.FC<SearchProps> = ({
  placeholder = "Search mutual funds...",
  size = 'md',
  keyboardShortcut = ['⌘', 'K'],
  className,
  containerClassName,
  style,
  variant = 'default',
  fullWidth = true,
  rounded = 'full',
  showShortcut = true,
  backgroundColor = '#F6F8FE',
  textColor = '#374151',
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={cn('w-full', className)} onClick={handleInputClick}>
        <Input
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          rounded={rounded}
          leftIcon={<SearchIcon className="w-6 h-6 text-gray-500" />}
          keyboardShortcut={showShortcut ? keyboardShortcut : undefined}
          placeholder={placeholder}
          className={cn(
            'font-outfit',
            'placeholder:text-gray-500',
            'focus:outline-none',
            'transition-all duration-200',
            'text-lg',
            'min-w-32 md:min-w-60',
            'cursor-pointer',
            className
          )}
          containerClassName={cn(
            'relative',
            'transition-all duration-200',
            'focus-within:ring-2 focus-within:ring-gray-100',
            'focus-within:border-gray-400',
            'cursor-pointer',
            containerClassName
          )}
          style={{
            backgroundColor: backgroundColor,
            borderColor: '#E5E7EB',
            color: textColor,
            ...style,
          }}
          readOnly
          {...props}
        />
      </div>

      <SearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Search;