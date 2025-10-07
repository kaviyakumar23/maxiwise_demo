import React, { useState } from 'react';
import { cn } from "../../utils/cn";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fundTypes = [
  { id: 'equity', label: 'Equity' },
  { id: 'debt', label: 'Debt' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'others', label: 'Others' }
];

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

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFundType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Section */}
          <div className="p-6 pb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                <SearchIcon className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Mutual Funds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-14 pr-6 py-4",
                  "text-navy font-outfit text-lg",
                  "placeholder:text-gray-400",
                  "border-0 focus:outline-none",
                  "bg-transparent"
                )}
                autoFocus
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Content Section */}
          <div className="p-8 pt-6">
            {/* Explore Mutual Funds by Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Explore Mutual Funds by Type
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {fundTypes.map((type) => {
                  const isSelected = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      onClick={() => toggleFundType(type.id)}
                      className={cn(
                        "px-6 py-3 rounded-xl font-outfit font-medium",
                        "transition-all duration-200",
                        "text-sm",
                        isSelected
                          ? "bg-purple text-white shadow-md"
                          : "bg-gray-100 text-navy hover:bg-gray-200"
                      )}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;

