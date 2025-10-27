import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from "../../utils/cn";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FundScheme {
  id: number;
  isin: string;
  fund_name: string;
  small_cap: string;
  mid_cap: string;
  large_cap: string;
  fund_type: string;
  purchase_mode: string;
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

// Close Icon Component
const CloseIcon = ({ className }: { className?: string }) => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allFunds, setAllFunds] = useState<FundScheme[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch funds data
  useEffect(() => {
    const fetchFunds = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://d223ljjj0y7hd6.cloudfront.net/api/mf-data/fund-schemes');
        const result = await response.json();
        if (result.success) {
          setAllFunds(result.data);
        }
      } catch (error) {
        console.error('Error fetching funds:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchFunds();
    }
  }, [isOpen]);

  const toggleFundType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const removeFundType = (typeId: string) => {
    setSelectedTypes(prev => prev.filter(id => id !== typeId));
  };

  // Helper function to determine the highest cap
  const getHighestCap = (fund: FundScheme): string | null => {
    const smallCap = parseFloat(fund.small_cap) || 0;
    const midCap = parseFloat(fund.mid_cap) || 0;
    const largeCap = parseFloat(fund.large_cap) || 0;

    if (smallCap === 0 && midCap === 0 && largeCap === 0) {
      return null;
    }

    const max = Math.max(smallCap, midCap, largeCap);
    if (max === largeCap) return 'Large Cap';
    if (max === midCap) return 'Mid Cap';
    if (max === smallCap) return 'Small Cap';
    return null;
  };

  // Helper function to map fund_type to our categories
  const mapFundTypeToCategory = (fundType: string): string => {
    const type = fundType.toLowerCase();
    if (type.includes('equity') || type.includes('stock')) return 'equity';
    if (type.includes('debt') || type.includes('bond') || type.includes('income') || type.includes('fixed income')) return 'debt';
    if (type.includes('hybrid') || type.includes('balanced') || type.includes('allocation')) return 'hybrid';
    return 'others';
  };

  // Filter and search funds
  const getFilteredFunds = (): FundScheme[] => {
    let filtered = allFunds;

    // Filter by fund type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(fund => {
        const category = mapFundTypeToCategory(fund.fund_type);
        return selectedTypes.includes(category);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(fund => 
        fund.fund_name.toLowerCase().includes(query)
      );
    }

    // Return maximum 3 results
    return filtered.slice(0, 3);
  };

  const filteredFunds = getFilteredFunds();

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Clear search and filters when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedTypes([]);
    }
  }, [isOpen]);

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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-slide-up max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Section */}
          <div className="md:p-6 p-3">
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

            {/* Selected Fund Types as Chips */}
            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedTypes.map((typeId) => {
                  const type = fundTypes.find(t => t.id === typeId);
                  return (
                    <div
                      key={typeId}
                      className="flex items-center gap-2 px-4 py-2 text-navy rounded-xl font-outfit font-medium text-sm"
                      style={{ backgroundColor: '#E8D8FF' }}
                    >
                      <span>{type?.label}</span>
                      <button
                        onClick={() => removeFundType(typeId)}
                        className="hover:opacity-70 rounded-full p-0.5 transition-opacity"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Content Section */}
          <div className="p-8 pt-6">
            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="mb-6">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading funds...
                  </div>
                ) : filteredFunds.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFunds.map((fund) => {
                      const highestCap = getHighestCap(fund);
                      const planType = fund.purchase_mode;
                      const fundCategory = mapFundTypeToCategory(fund.fund_type);
                      const categoryLabel = fundTypes.find(t => t.id === fundCategory)?.label;

                      // Assign colors based on fund category
                      const getIconColors = (category: string) => {
                        switch (category) {
                          case 'equity':
                            return { bg: 'bg-blue-500', inner: 'bg-blue-600' };
                          case 'debt':
                            return { bg: 'bg-green-500', inner: 'bg-green-600' };
                          case 'hybrid':
                            return { bg: 'bg-purple-500', inner: 'bg-purple-600' };
                          case 'others':
                            return { bg: 'bg-orange-500', inner: 'bg-orange-600' };
                          default:
                            return { bg: 'bg-gray-500', inner: 'bg-gray-600' };
                        }
                      };

                      const iconColors = getIconColors(fundCategory);

                      return (
                        <Link
                          key={fund.id}
                          to="/fund"
                          search={{ isin: fund.isin }}
                          className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 hover:border-purple/50 hover:bg-purple/5 transition-all cursor-pointer"
                          onClick={onClose}
                        >
                          {/* Fund Logo Placeholder */}
                          <div className={`w-12 h-12 ${iconColors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <div className={`w-8 h-8 ${iconColors.inner} transform rotate-45`}></div>
                          </div>

                          {/* Fund Details */}
                          <div className="flex-1">
                            <h4 className="text-navy font-outfit font-semibold text-base mb-2 text-left">
                              {fund.fund_name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600 font-outfit">
                              {categoryLabel && <span>{categoryLabel}</span>}
                              {categoryLabel && highestCap && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                              {highestCap && <span>{highestCap}</span>}
                              {!highestCap && categoryLabel && fund.fund_type && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                              {!highestCap && fund.fund_type && <span>{fund.fund_type}</span>}
                              {((highestCap || (!highestCap && fund.fund_type)) && planType) && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                              {planType && <span>{planType}</span>}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No funds found matching your criteria
                  </div>
                )}
              </div>
            )}

            {/* Fund Type Selection */}
            {!searchQuery.trim() && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  By Market Capitalization
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {fundTypes
                    .filter(type => !selectedTypes.includes(type.id))
                    .map((type) => {
                      return (
                        <button
                          key={type.id}
                          onClick={() => toggleFundType(type.id)}
                          className={cn(
                            "px-6 py-3 rounded-xl font-outfit font-medium cursor-pointer",
                            "transition-all duration-200",
                            "text-sm",
                            "bg-gray-100 text-navy hover:bg-gray-200"
                          )}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;

