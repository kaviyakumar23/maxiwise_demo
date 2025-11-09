import React, { useRef, useState, useEffect } from "react";
import Qustion from "../../assets/images/Question.svg";
import ButtonPrevious from "../../assets/images/ButtonPrevious.svg";
import ButtonNext from "../../assets/images/ButtonNext.svg";
import FundCards from "../../components/common/FundCards";
import type { BetterFunds } from "../../types/fundTypes";
import { trackInsightCardViewed } from "../../utils/analytics";

interface FundPicksProps {
  fundDetails?: BetterFunds;
  onCategorySelect: (categoryId: string) => void;
}

const FundPicks: React.FC<FundPicksProps> = ({ fundDetails, onCategorySelect }) => {
  const fundCardsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Check scroll position for navigation arrows
  const checkScrollPosition = () => {
    if (fundCardsRef.current) {
      const scrollContainer = fundCardsRef.current.querySelector('.xl\\:hidden');
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer as HTMLElement;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }
  };

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isInfoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isInfoModalOpen]);

  // Scroll functions for navigation arrows
  const handlePrev = () => {
    if (fundCardsRef.current) {
      const scrollContainer = fundCardsRef.current.querySelector('.xl\\:hidden');
      if (scrollContainer && window.innerWidth < 1280) {
        scrollContainer.scrollBy({ left: -250, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (fundCardsRef.current) {
      const scrollContainer = fundCardsRef.current.querySelector('.xl\\:hidden');
      if (scrollContainer && window.innerWidth < 1280) {
        scrollContainer.scrollBy({ left: 250, behavior: 'smooth' });
      }
    }
  };

  return (
    <div >
      {/* Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-6 md:mb-8 px-4 py-6 md:py-4 lg:py-0">
        <h2 className="text-base md:text-lg font-semibold text-navy font-outfit">
          Smart Fund Picks
        </h2>
        
        {/* Information Button - Visible on mobile and tablet only */}
        <button 
          onClick={() => {
            setIsInfoModalOpen(true);
            // Track insight card viewed
            trackInsightCardViewed({
              fundName: fundDetails?.data?.[0]?.fundList?.[0]?.fund_name || 'unknown',
              location: 'fund_page',
              device: window.innerWidth < 1024 ? 'mobile' : 'desktop',
            });
          }}
          className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors lg:hidden"
        >
          <img src={Qustion} alt="Question" />
        </button>
        
        {/* Navigation Arrows - Hidden on mobile and tablet, visible on lg screens */}
        <div className="hidden lg:flex xl:hidden items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-40 cursor-not-allowed'
            }`}
            style={{
              filter: canScrollLeft ? 'none' : 'grayscale(100%)',
            }}
            aria-label="Previous"
          >
            <img src={ButtonPrevious} alt="Previous" className="w-full h-full" />
          </button>

          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-40 cursor-not-allowed'
            }`}
            style={{
              filter: canScrollRight ? 'none' : 'grayscale(100%)',
            }}
            aria-label="Next"
          >
            <img src={ButtonNext} alt="Next" className="w-full h-full" />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div ref={fundCardsRef}>
        <FundCards enableAutoScroll={false} fundDetails={fundDetails} onCategorySelect={onCategorySelect} />
      </div>

      {/* Information Modal - Bottom Sheet */}
      {isInfoModalOpen && (
        <>
          {/* Backdrop */}
          <div 
  className="fixed inset-0 bg-black/40 z-50 lg:hidden animate-[fadeIn_0.3s_ease-out]"
  onClick={() => setIsInfoModalOpen(false)}
/>
          
          {/* Modal Content */}
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden animate-[slideUp_0.3s_ease-out]"
          >
            <div className="p-6">
              {/* Handle Bar */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              {/* Header */}
              <h1 className="text-navy font-bold text-lg font-outfit mb-4">
                What is Smart Fund Picks?
              </h1>
              
              {/* Description */}
              <p className="text-[#4B5563] font-normal text-sm font-outfit mb-6">
                Smart Fund Picks are curated using the <span className="font-semibold">CARRVA</span> framework, which looks at <span className="font-semibold">Market Cycles, Alpha, Returns, Risk, Volatility,</span> and <span className="font-semibold">Analysis</span>. This data-driven approach helps identify funds that balance risk and reward, making it easier for you to choose the right investment.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="w-full bg-purple text-white font-semibold text-base font-outfit py-4 rounded-full hover:bg-[#7E22CE] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FundPicks;

