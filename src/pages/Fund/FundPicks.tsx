import React, { useRef, useState, useEffect } from "react";
import { fundData } from "./DummyData.tsx";
import SpiralBg from "../../assets/images/spiral-bg-card.png";
import Shadow from "../../assets/images/Shadow.png";
import Qustion from "../../assets/images/Question.svg";
import ButtonPrevious from "../../assets/images/ButtonPrevious.svg";
import ButtonNext from "../../assets/images/ButtonNext.svg";

// Card styling configurations
const cardStyles: Record<string, { bgGradient: string; textColor: string }> = {
  "all-parameters": {
    bgGradient: "linear-gradient(135deg, #9F7AEA 0%, #7C3AED 100%)",
    textColor: "#FFFFFF",
  },
  "same-risk-higher-returns": {
    bgGradient: "linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)",
    textColor: "#AC72FF",
  },
  "low-risk-similar-returns": {
    bgGradient: "linear-gradient(135deg, #D4FF00 0%, #BFEF00 100%)",
    textColor: "#170630",
  },
  "higher-returns-lower-risk": {
    bgGradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    textColor: "#FFFFFF",
  },
  "higher-risk-higher-returns": {
    bgGradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    textColor: "#FFFFFF",
  },
};

interface FundCardProps {
  id: string;
  title: string;
  subtitle?: string;
  fundsCount: number;
  bgGradient: string;
  textColor: string;
  onClick: () => void;
  isFocused?: boolean;
}

const FundCard: React.FC<FundCardProps> = ({
  title,
  subtitle,
  fundsCount,
  bgGradient,
  textColor,
  onClick,
  isFocused = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-7 xl:p-6 2xl:p-7 cursor-pointer overflow-hidden transition-all duration-500 ease-out
        ${isFocused ? 'h-[320px] md:h-[340px] scale-100 shadow-2xl' : 'h-[280px] md:h-[300px] scale-90'}
        lg:h-[280px] lg:scale-100 lg:shadow-none lg:hover:scale-105 lg:hover:shadow-2xl
        xl:h-[256px] 2xl:h-[307px]
      `}
      style={{
        background: `url(${SpiralBg}), ${bgGradient}`,
        backgroundSize: 'cover, 100% 100%',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'hard-light',
      }}
    >
      {/* Shadow overlay */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: `url(${Shadow})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'hard-light',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Title */}
        <div>
          <p
            className="text-base lg:text-sm font-medium font-outfit leading-[27px] lg:leading-[22px]"
            style={{ color: textColor }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className="text-base lg:text-sm font-medium font-outfit leading-[27px] lg:leading-[22px]"
              style={{ color: textColor }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <div
            className="text-base lg:text-sm font-light text-center font-outfit mb-4 lg:mb-2 leading-[27px] lg:leading-[22px]"
            style={{ color: "#FFFFFF" }}
          >
            {fundsCount} Funds
          </div>
          <div className="flex flex-col items-center -space-y-5 lg:-space-y-3">
            <svg
              className="w-8 h-8 lg:w-6 lg:h-6 animate-bounce"
              style={{ color: "#FFFFFF" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <svg
              className="w-8 h-8 lg:w-6 lg:h-6 animate-bounce"
              style={{ color: "#FFFFFF", animationDelay: "02s" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FundPicksProps {
  onCategorySelect: (categoryId: string) => void;
}

const FundPicks: React.FC<FundPicksProps> = ({ onCategorySelect }) => {
  const { smartFundPicks } = fundData;
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  const desktopScrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [focusedCardId, setFocusedCardId] = useState<string>("all-parameters");
  const isInitialMount = useRef(true);

  // Reorder cards to put "all-parameters" in the middle for mobile/tablet
  const reorderedPicks = [...smartFundPicks];
  const allParamsIndex = reorderedPicks.findIndex(pick => pick.id === "all-parameters");
  if (allParamsIndex !== -1) {
    const allParamsCard = reorderedPicks.splice(allParamsIndex, 1)[0];
    reorderedPicks.splice(2, 0, allParamsCard); // Insert at index 2 (middle of 5 cards)
  }

  // Check scroll position
  const checkScrollPosition = () => {
    const scrollContainerRef = window.innerWidth >= 1024 ? desktopScrollContainerRef : mobileScrollContainerRef;
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Detect which card is in focus based on scroll position
  const detectFocusedCard = () => {
    if (mobileScrollContainerRef.current && window.innerWidth < 1024) {
      const container = mobileScrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      Object.entries(cardRefs.current).forEach(([id, element]) => {
        if (element) {
          const cardRect = element.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(containerCenter - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = id;
          }
        }
      });

      if (closestCard && closestCard !== focusedCardId) {
        setFocusedCardId(closestCard);
      }
    } else if (window.innerWidth >= 1024) {
      // Reset focus for desktop view
      setFocusedCardId("");
    }
  };

  // Initialize and center "all-parameters" card on mount for mobile/tablet
  useEffect(() => {
    if (isInitialMount.current && window.innerWidth < 1024) {
      // Small delay to ensure elements are rendered
      const timer = setTimeout(() => {
        const allParamsCard = cardRefs.current["all-parameters"];
        const container = mobileScrollContainerRef.current;
        
        if (allParamsCard && container) {
          const cardRect = allParamsCard.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calculate scroll position to center the card
          const scrollLeft = 
            allParamsCard.offsetLeft - 
            (containerRect.width / 2) + 
            (cardRect.width / 2);
          
          container.scrollLeft = scrollLeft;
          isInitialMount.current = false;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    detectFocusedCard();
    
    const mobileContainer = mobileScrollContainerRef.current;
    const desktopContainer = desktopScrollContainerRef.current;
    
    const handleScroll = () => {
      checkScrollPosition();
      detectFocusedCard();
    };
    
    const handleResize = () => {
      checkScrollPosition();
      detectFocusedCard();
    };
    
    if (mobileContainer) {
      mobileContainer.addEventListener('scroll', handleScroll);
    }
    if (desktopContainer) {
      desktopContainer.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (mobileContainer) {
        mobileContainer.removeEventListener('scroll', handleScroll);
      }
      if (desktopContainer) {
        desktopContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [focusedCardId]);

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

  // Scroll functions
  const handlePrev = () => {
    const scrollContainerRef = window.innerWidth >= 1024 ? desktopScrollContainerRef : mobileScrollContainerRef;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -250,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    const scrollContainerRef = window.innerWidth >= 1024 ? desktopScrollContainerRef : mobileScrollContainerRef;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 250,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (categoryId: string) => {
    onCategorySelect(categoryId);
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
          onClick={() => setIsInfoModalOpen(true)}
          className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors lg:hidden"
        >
          <img src={Qustion} alt="Question" />
        </button>
        
        {/* Navigation Arrows - Hidden on mobile and tablet, visible on desktop */}
        <div className="hidden lg:flex items-center gap-3">
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

      {/* Cards Container - Horizontal scroll on mobile and tablet, grid on desktop */}
      
      {/* Mobile/Tablet view - Carousel with reordered cards */}
      <div 
        ref={mobileScrollContainerRef}
        className="lg:hidden flex items-center justify-start gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 py-8 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: '50%', scrollPaddingRight: '50%' }}
      >
        {reorderedPicks.map((pick) => {
          const styles = cardStyles[pick.id];
          const isFocused = focusedCardId === pick.id;
          
          return (
            <div 
              key={pick.id}
              ref={(el) => { cardRefs.current[pick.id] = el; }}
              className="flex-shrink-0 w-[240px] md:w-[280px] snap-center"
            >
              <FundCard
                id={pick.id}
                title={pick.title}
                subtitle={pick.subtitle}
                fundsCount={pick.fundsCount}
                bgGradient={styles.bgGradient}
                textColor={styles.textColor}
                onClick={() => handleCardClick(pick.id)}
                isFocused={isFocused}
              />
            </div>
          );
        })}
      </div>

      {/* Desktop view - Grid with original order */}
      <div 
        ref={desktopScrollContainerRef}
        className="hidden lg:grid lg:grid-cols-5 xl:gap-4 2xl:gap-5 gap-3 py-4"
      >
        {smartFundPicks.map((pick) => {
          const styles = cardStyles[pick.id];
          
          return (
            <div 
              key={pick.id}
              className="w-full"
            >
              <FundCard
                id={pick.id}
                title={pick.title}
                subtitle={pick.subtitle}
                fundsCount={pick.fundsCount}
                bgGradient={styles.bgGradient}
                textColor={styles.textColor}
                onClick={() => handleCardClick(pick.id)}
                isFocused={false}
              />
            </div>
          );
        })}
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

