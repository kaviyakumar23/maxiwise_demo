import React, { useState, useEffect } from "react";
import { Link } from '@tanstack/react-router';
import { useUser } from "@clerk/clerk-react";
import { useLoginModal } from "../getStarted/LoginModal";
import ChooseCardImg from "../../assets/images/ChooseCard.png"
import Watchlist from "../../assets/images/Watchlist.png"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import type { BetterFunds, FundListItem } from "../../types/fundTypes";

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

interface ChooseCardProps {
  fundDetails?: BetterFunds;
  allFundSchemes: FundScheme[];
  selectedCategory: string | null;
}

const ChooseCard: React.FC<ChooseCardProps> = ({ fundDetails, allFundSchemes, selectedCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { openModal } = useLoginModal();

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handler for add to watchlist button
  const handleAddToWatchlist = () => {
    if (!isSignedIn) {
      // Open login modal if user is not signed in
      openModal();
    } else {
      // TODO: Implement add to watchlist functionality
      console.log('Add to watchlist');
      // Future implementation could include:
      // - Navigate to watchlist page
      // - Show toast notification
      // - Update watchlist state
    }
  };

  // Helper function to get highest cap
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

  // Helper function to get category icon colors
  const getIconColors = (fundType: string) => {
    const type = fundType.toLowerCase();
    if (type.includes('equity') || type.includes('stock')) {
      return { bg: 'bg-blue-500', inner: 'bg-blue-600' };
    }
    if (type.includes('debt') || type.includes('bond') || type.includes('income') || type.includes('fixed income')) {
      return { bg: 'bg-green-500', inner: 'bg-green-600' };
    }
    if (type.includes('hybrid') || type.includes('balanced') || type.includes('allocation')) {
      return { bg: 'bg-purple-500', inner: 'bg-purple-600' };
    }
    return { bg: 'bg-orange-500', inner: 'bg-orange-600' };
  };
  // If no category is selected, show the default "Choose a Card" state
  if (!selectedCategory) {
    return (
      <div className="py-6 md:py-8 lg:py-10">
        {/* Two column grid on desktop, stack on mobile - Choose a Card is 2/3, Watchlist is 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Choose a Card Section - Takes 2 columns */}
          <Card variant="flat" size="md" className="w-full lg:col-span-2">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-sm">
                <img src={ChooseCardImg} alt="Choose Card" className="h-50px" />
              </div>
              <div className="text-center font-outfit font-normal text-sm md:text-base text-indigo leading-relaxed">
                <p>The funds are hiding. Pick a Smart Fund<br />card to uncover them.</p>
              </div>
              <Button variant="primary" color="lime" size="lg" className="w-full">
                Choose a Card
              </Button>
            </div>
          </Card>

          {/* Add to Watchlist Section - Takes 1 column */}
          <Card variant="flat" size="md" className="w-full lg:col-span-1">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-center font-outfit font-semibold text-lg md:text-xl text-navy mb-2">
                Your Watchlist
              </div>
              <div className="w-full max-w-sm">
                <img src={Watchlist} alt="Watchlist" className="h-50px" />
              </div>
              <div className="text-center font-outfit font-normal text-sm md:text-base text-indigo leading-relaxed">
                <p>Add funds to your watchlist to<br />track them all in one place.</p>
              </div>
              <Button 
                variant="primary" 
                color="lime" 
                size="lg" 
                className="w-full"
                onClick={handleAddToWatchlist}
              >
                Add to Watchlist
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Get the selected category data from API or fallback to dummy data
  let categoryTitle = '';
  let categorySubtitle = '';
  let fundListFromAPI: FundListItem[] = [];
  let totalFundsCount = 0;

  if (fundDetails?.success && fundDetails.data) {
    // Find the selected category in betterFunds data
    const selectedCategoryData = fundDetails.data.find(cat => {
      const catId = cat.column.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return catId === selectedCategory;
    });

    if (selectedCategoryData) {
      // Split title if it contains comma
      const parts = selectedCategoryData.column.split(',').map(s => s.trim());
      if (parts.length === 2) {
        categoryTitle = parts[0] + ',';
        categorySubtitle = parts[1];
      } else {
        categoryTitle = selectedCategoryData.column;
      }
      fundListFromAPI = selectedCategoryData.fundList;
      totalFundsCount = selectedCategoryData.fundList.length;
    }
  }

  // Get enriched fund data by matching ISINs
  const enrichedFunds = fundListFromAPI
    .map(fundItem => {
      const scheme = allFundSchemes.find(s => s.isin === fundItem.isin);
      return scheme ? { ...fundItem, scheme } : null;
    })
    .filter((f): f is FundListItem & { scheme: FundScheme } => f !== null);

  const displayedFunds = enrichedFunds.slice(0, 3);

  return (
    <div className="py-6 md:py-8 lg:py-10">
      {/* Fund List Container - Full width on mobile, 3/4 width on desktop */}
      <Card variant="default" size="lg" className="w-full lg:w-2/3">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-navy font-outfit">
            {categoryTitle} {categorySubtitle}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            {totalFundsCount} funds available in this category
          </p>
        </div>

        {/* Fund List */}
        {displayedFunds.length > 0 ? (
          <div>
            {displayedFunds.map((fund, index) => {
              const highestCap = getHighestCap(fund.scheme);
              const planType = fund.scheme.purchase_mode;
              const iconColors = getIconColors(fund.scheme.fund_type);

              return (
                <Link
                  key={fund.isin}
                  to="/fund"
                  search={{ isin: fund.isin }}
                >
                  <div 
                    className={`py-5 px-5 md:py-6 md:px-6 cursor-pointer ${index !== 0 ? 'border-t' : ''}`}
                    style={{
                      borderColor: '#E2E8F0',
                      borderWidth: index !== 0 ? '1px 0 0 0' : '0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F9F9F9';
                      e.currentTarget.style.border = '1.5px solid #EEEEEE';
                      e.currentTarget.style.borderRadius = '1rem';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.border = index !== 0 ? '1px solid #E2E8F0' : 'none';
                      e.currentTarget.style.borderWidth = index !== 0 ? '1px 0 0 0' : '0';
                      e.currentTarget.style.borderRadius = '0';
                    }}
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      {/* Fund Logo Placeholder */}
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${iconColors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <div className={`w-6 h-6 md:w-8 md:h-8 ${iconColors.inner} transform rotate-45`}></div>
                      </div>

                      {/* Fund Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-navy font-outfit mb-1 md:mb-2">
                          {fund.fund_name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-600 font-outfit">
                          {fund.scheme.fund_type && <span>{fund.scheme.fund_type}</span>}
                          {fund.scheme.fund_type && highestCap && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                          {highestCap && <span>{highestCap}</span>}
                          {highestCap && planType && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                          {planType && <span>{planType}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No funds found in this category
          </div>
        )}

        {/* View All Button - Only show if more than 3 funds */}
        {totalFundsCount > 3 && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 md:mt-6 bg-lime text-navy font-semibold text-base md:text-lg py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-lime-dark transition-colors font-outfit cursor-pointer"
          >
            View All ({totalFundsCount})
          </button>
        )}
      </Card>

      {/* Modal for View All */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal */}
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-navy font-outfit">
                      {categoryTitle} {categorySubtitle}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {totalFundsCount} funds available
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div>
                  {enrichedFunds.map((fund, index) => {
                    const highestCap = getHighestCap(fund.scheme);
                    const planType = fund.scheme.purchase_mode;
                    const iconColors = getIconColors(fund.scheme.fund_type);

                    return (
                      <Link
                        key={fund.isin}
                        to="/fund"
                        search={{ isin: fund.isin }}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <div 
                          className={`py-5 px-5 md:py-6 md:px-6 cursor-pointer ${index !== 0 ? 'border-t' : ''}`}
                          style={{
                            borderColor: '#E2E8F0',
                            borderWidth: index !== 0 ? '1px 0 0 0' : '0'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F9F9F9';
                            e.currentTarget.style.border = '1.5px solid #EEEEEE';
                            e.currentTarget.style.borderRadius = '1rem';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.border = index !== 0 ? '1px solid #E2E8F0' : 'none';
                            e.currentTarget.style.borderWidth = index !== 0 ? '1px 0 0 0' : '0';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                        >
                          <div className="flex items-center gap-3 md:gap-4">
                            {/* Fund Logo Placeholder */}
                            <div className={`w-10 h-10 md:w-12 md:h-12 ${iconColors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <div className={`w-6 h-6 md:w-8 md:h-8 ${iconColors.inner} transform rotate-45`}></div>
                            </div>

                            {/* Fund Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm md:text-base font-semibold text-navy font-outfit mb-1">
                                {fund.fund_name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-gray-600 font-outfit">
                                {fund.scheme.fund_type && <span>{fund.scheme.fund_type}</span>}
                                {fund.scheme.fund_type && highestCap && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                                {highestCap && <span>{highestCap}</span>}
                                {highestCap && planType && <span className="text-xl" style={{ color: '#E2E8F0' }}>•</span>}
                                {planType && <span>{planType}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseCard;