import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { cn } from "../../utils/cn";
import type { FundScheme } from "../../utils/fundData";
import { 
  transformFundData, 
  filterFunds, 
  filterFundsByMarketCap 
} from "../../utils/fundData";

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

const marketCapTypes = [
  { id: 'Large Cap', label: 'Large Cap' },
  { id: 'Mid Cap', label: 'Mid Cap' },
  { id: 'Small Cap', label: 'Small Cap' },
  { id: 'Others', label: 'Others' }
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
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMarketCap, setSelectedMarketCap] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allFunds, setAllFunds] = useState<FundScheme[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<FundScheme[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch fund data when modal opens
  useEffect(() => {
    if (isOpen && allFunds.length === 0) {
      fetchFundData();
    }
  }, [isOpen]);

  // Filter funds whenever search query or selected types change
  useEffect(() => {
    let filtered = filterFunds(allFunds, searchQuery, selectedTypes);
    
    // Further filter by market cap if selected
    if (selectedMarketCap) {
      filtered = filterFundsByMarketCap(filtered, selectedMarketCap);
    }
    
    setFilteredFunds(filtered);
  }, [searchQuery, selectedTypes, selectedMarketCap, allFunds]);

  const fetchFundData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://d223ljjj0y7hd6.cloudfront.net/api/mf-data/fund-schemes');
      const data = await response.json();
      const enrichedFunds = transformFundData(data.data);
      setAllFunds(enrichedFunds);
      setFilteredFunds(enrichedFunds);
    } catch (error) {
      console.error('Error fetching fund data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFundType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
    // Reset market cap when changing fund type
    setSelectedMarketCap('');
  };

  const toggleMarketCap = (capId: string) => {
    setSelectedMarketCap(prev => prev === capId ? '' : capId);
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedMarketCap('');
    onClose();
  };

  const handleFundSelect = (fund: FundScheme) => {
    console.log('Selected fund:', fund);
    handleClose();
    navigate({ 
      to: '/fund', 
      search: { fundId: fund.id } 
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-up"
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
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Content Section */}
          <div className="p-8 pt-6 overflow-y-auto">
            {/* Explore Mutual Funds by Type */}
            <div className="mb-6">
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

            {/* Market Cap Filter - Only show if Equity is selected */}
            {selectedTypes.includes('equity') && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  By Market Capitalization
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {marketCapTypes.map((cap) => {
                    const isSelected = selectedMarketCap === cap.id;
                    return (
                      <button
                        key={cap.id}
                        onClick={() => toggleMarketCap(cap.id)}
                        className={cn(
                          "px-6 py-3 rounded-xl font-outfit font-medium",
                          "transition-all duration-200",
                          "text-sm",
                          isSelected
                            ? "bg-purple text-white shadow-md"
                            : "bg-gray-100 text-navy hover:bg-gray-200"
                        )}
                      >
                        {cap.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Section */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500 font-outfit">Loading funds...</p>
              </div>
            ) : (
              <div>
                {searchQuery && (
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
                    {filteredFunds.length} {filteredFunds.length === 1 ? 'result' : 'results'} found
                  </h3>
                )}
                
                {filteredFunds.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredFunds.slice(0, 20).map((fund) => (
                      <div
                        key={fund.id}
                        onClick={() => handleFundSelect(fund)}
                        className={cn(
                          "p-4 rounded-2xl border border-gray-200",
                          "hover:border-purple hover:bg-purple/5",
                          "transition-all duration-200 cursor-pointer"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          {/* Fund Logo Placeholder */}
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {fund.fund_name.charAt(0)}
                            </span>
                          </div>
                          
                          {/* Fund Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-outfit font-semibold text-navy text-sm mb-2 line-clamp-2">
                              {fund.fund_name}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-outfit">
                                {fund.fund_type.charAt(0).toUpperCase() + fund.fund_type.slice(1)}
                              </span>
                              {fund.market_cap && fund.market_cap !== 'Others' && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-outfit">
                                  {fund.market_cap}
                                </span>
                              )}
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-outfit">
                                {fund.plan_type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredFunds.length > 20 && (
                      <p className="text-center text-sm text-gray-500 py-4">
                        Showing first 20 results. Refine your search to see more specific results.
                      </p>
                    )}
                  </div>
                ) : searchQuery || selectedTypes.length > 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-outfit">No funds found matching your criteria</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;

