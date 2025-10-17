import React, { useRef, useState, useEffect } from "react";
import { fundData } from "../../pages/Fund/DummyData.tsx";
import SpiralBg from "../../assets/images/spiral-bg-card.png";
import Shadow from "../../assets/images/Shadow.png";
import CaretDown from "../../assets/images/CaretDoubleDown.svg";
import type { BetterFunds, BetterFundCategory } from "../../types/fundTypes";

// Custom hook to match Tailwind's xl breakpoint (1280px)
function useIsXL() {
  const [isXL, setIsXL] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const update = () => setIsXL(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return isXL;
}

// Default fallback style
const defaultCardStyle = {
  bgGradient: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)",
  textColor: "#FFFFFF",
};

// Card styling configurations based on new column mapping
const cardStyles: Record<string, { bgGradient: string; textColor: string }> = {
  // All Parameters
  "all-parameters": {
    bgGradient: "linear-gradient(135deg, #9F7AEA 0%, #7C3AED 100%)",
    textColor: "#FFFFFF",
  },
  // Higher Returns with Lower/Equal Risk & Volatility
  "higher-returns-with-lower-equal-risk-volatility": {
    bgGradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    textColor: "#FFFFFF",
  },
  // Similar Risk & Volatility but Higher Returns
  "similar-risk-volatility-but-higher-returns": {
    bgGradient: "linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)",
    textColor: "#AC72FF",
  },
  // Similar Returns with Low Risk & Volatility
  "similar-returns-with-low-risk-volatility": {
    bgGradient: "linear-gradient(135deg, #D4FF00 0%, #BFEF00 100%)",
    textColor: "#170630",
  },
  // Higher Returns with Higher Risk & Volatility
  "higher-returns-with-higher-risk-volatility": {
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
  enableEnlargementEffect?: boolean;
  focusedScale?: number;
  unfocusedScale?: number;
  isXL?: boolean;
}

const FundCard: React.FC<FundCardProps> = ({
  title,
  subtitle,
  fundsCount,
  bgGradient,
  textColor,
  onClick,
  isFocused = false,
  enableEnlargementEffect = true,
  focusedScale = 1.0,
  unfocusedScale = 0.9,
  isXL = false,
}) => {
  // Calculate height classes based on enlargement effect
  const getHeightClass = () => {
    if (!enableEnlargementEffect) return 'h-[300px] md:h-[320px]';
    return isFocused ? 'h-[320px] md:h-[340px]' : 'h-[280px] md:h-[300px]';
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-6 xl:p-6 2xl:p-7 cursor-pointer overflow-hidden transition-all duration-500 ease-out
        ${getHeightClass()} ${enableEnlargementEffect && isFocused ? 'shadow-2xl' : ''}
        lg:h-[300px] lg:scale-100 lg:shadow-none lg:hover:scale-105 lg:hover:shadow-2xl
        xl:h-[350px] 2xl:h-[400px]
      `}
      style={{
        background: bgGradient,
        transform: !isXL && enableEnlargementEffect ? `scale(${isFocused ? focusedScale : unfocusedScale})` : undefined,
      }}
    >
      {/* Spiral background with reduced opacity */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${SpiralBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'hard-light',
        }}
      />

      {/* Top fade gradient overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, transparent 100%)',
        }}
      />

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
            className="text-lg lg:text-xl sm:text-base font-medium font-outfit leading-[27px] lg:leading-[22px]"
            style={{ color: textColor }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className="text-lg lg:text-xl sm:text-base font-medium font-outfit leading-[27px] lg:leading-[22px]"
              style={{ color: textColor }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <div
            className="text-lg lg:text-xl sm:text-base font-medium text-center font-outfit mb-4 lg:mb-2 leading-[27px] lg:leading-[22px]"
            style={{ color: "#FFFFFF" }}
          >
            {fundsCount} Funds
          </div>
          <div className="flex flex-col items-center -space-y-5 lg:-space-y-3">
            <img src={CaretDown} alt="Caret Down" className="w-8 h-8 lg:w-6 lg:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FundCardsProps {
  fundDetails?: BetterFunds;
  onCategorySelect?: (categoryId: string) => void;
  // Enlargement effect configuration
  enableEnlargementEffect?: boolean;
  focusedScale?: number;
  unfocusedScale?: number;
  // Auto-scroll configuration
  enableAutoScroll?: boolean;
  scrollSpeed?: number; // pixels per second
  autoScrollResetDelay?: number; // milliseconds before auto-scroll resumes after user interaction
}

// Helper function to map API column names to card IDs
const getCardIdFromColumn = (column: string): string => {
  // Clean the column name and create a consistent ID
  return column.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

// Helper function to split title into main title and subtitle
const splitTitle = (title: string): { title: string; subtitle?: string } => {
  // Handle specific patterns where we want to split on comma
  const parts = title.split(',').map(s => s.trim());
  if (parts.length === 2) {
    return { title: parts[0] + ',', subtitle: parts[1] };
  }
  return { title };
};

// Helper function to transform API data to card format
const transformBetterFundsToCards = (betterFunds?: BetterFunds) => {
  if (!betterFunds?.success || !betterFunds.data) {
    return fundData.smartFundPicks;
  }

  return betterFunds.data.map((category: BetterFundCategory) => {
    // column is the title, value is the description/count
    const { title, subtitle } = splitTitle(category.column);
    return {
      id: getCardIdFromColumn(category.column),
      title,
      subtitle,
      fundsCount: category.fundList.length, // Use actual count from fundList
    };
  });
};

const FundCards: React.FC<FundCardsProps> = ({ 
  fundDetails,
  onCategorySelect,
  enableEnlargementEffect = true,
  focusedScale = 1.0,
  unfocusedScale = 0.9,
  enableAutoScroll = true,
  scrollSpeed = 40,
  autoScrollResetDelay = 5000,
}) => {
  const smartFundPicks = transformBetterFundsToCards(fundDetails);
  const isXL = useIsXL();
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  const desktopScrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [focusedCardId, setFocusedCardId] = useState<string>("all-parameters");
  const isInitialMount = useRef(true);
  const isHoveringRef = useRef(false); // Ref to track hover state for intervals
  const userInteractedRef = useRef(false);
  
  // Helper to get the active container based on breakpoint
  const getActiveContainer = () => 
    isXL ? desktopScrollContainerRef.current : mobileScrollContainerRef.current;

  // Reorder cards to put "all-parameters" in the middle for both mobile/tablet and desktop
  const reorderedPicks = [...smartFundPicks];
  const allParamsIndex = reorderedPicks.findIndex(pick => pick.id === "all-parameters");
  if (allParamsIndex !== -1) {
    const allParamsCard = reorderedPicks.splice(allParamsIndex, 1)[0];
    reorderedPicks.splice(2, 0, allParamsCard); // Insert at index 2 (middle of 5 cards)
  }

  // Duplicate cards multiple times to ensure scrollable content (only when auto-scroll is enabled)
  const duplicatedPicks = enableAutoScroll ? [
    ...reorderedPicks,
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup1` })),
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup2` })),
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup3` })),
  ] : reorderedPicks;

  // Detect which card is in focus based on scroll position
  const detectFocusedCard = () => {
    if (mobileScrollContainerRef.current && !isXL) {
      const container = mobileScrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestBaseId: string | null = null;
      let closestDistance = Infinity;

      Object.entries(cardRefs.current).forEach(([id, element]) => {
        if (element) {
          const cardRect = element.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(containerCenter - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            // Extract base ID by removing duplicate suffix
            closestBaseId = id.replace(/-dup\d+$/, '');
          }
        }
      });

      if (closestBaseId && closestBaseId !== focusedCardId) {
        setFocusedCardId(closestBaseId);
      }
    } else if (isXL) {
      // Reset focus for desktop view (xl and above)
      setFocusedCardId("");
    }
  };

  // Initialize and center "all-parameters" card on mount for mobile/tablet/lg screens
  useEffect(() => {
    if (isInitialMount.current && !isXL) {
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
    } else if (isInitialMount.current && isXL) {
      // For xl and above desktop, the card is already centered due to reordering
      isInitialMount.current = false;
    }
  }, [isXL]);

  // Debug logging for overflow detection (temporary - remove in production)
  useEffect(() => {
    const c = mobileScrollContainerRef.current;
    if (c) {
      console.log('[FundCards Debug]', { 
        scrollWidth: c.scrollWidth, 
        clientWidth: c.clientWidth, 
        canScroll: c.scrollWidth > c.clientWidth,
        isXL,
      });
    }
  }, [isXL]);

  // Initialize scroll position check
  useEffect(() => {
    detectFocusedCard();
    
    const mobileContainer = mobileScrollContainerRef.current;
    
    const handleScroll = () => {
      detectFocusedCard();
    };
    
    const handleResize = () => {
      detectFocusedCard();
    };
    
    if (mobileContainer) {
      mobileContainer.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (mobileContainer) {
        mobileContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [focusedCardId]);

  // Auto-scroll effect - smooth 60fps scrolling using requestAnimationFrame
  useEffect(() => {
    if (!enableAutoScroll) return;
    
    let rafId = 0;
    let intervalId: number | null = null;
    let resetIntervalId: number | undefined;
    let last = 0;

    const step = (t: number) => {
      const container = getActiveContainer();
      if (!container) return;
      
      const dt = last ? (t - last) / 1000 : 0;
      last = t;

      // only scroll if not interacting
      if (!isHoveringRef.current && !userInteractedRef.current && dt > 0) {
        const max = container.scrollWidth - container.clientWidth;
        const x = container.scrollLeft;
        if (max > 0) {
          container.scrollLeft = x >= max - 5 ? 0 : x + scrollSpeed * dt;
        }
      }
    };

    const loop = (t: number) => { 
      step(t); 
      rafId = requestAnimationFrame(loop); 
    };
    
    // Initial nudge to wake up programmatic scroll on iOS
    const c = getActiveContainer();
    if (c) {
      const x = c.scrollLeft;
      c.scrollLeft = x + 1;
      c.scrollLeft = x;
    }
    
    rafId = requestAnimationFrame(loop);
    
    // Fallback interval for low-power modes (~80ms)
    intervalId = window.setInterval(() => step(performance.now()), 80);
    
    // Reset user interaction flag periodically
    resetIntervalId = window.setInterval(() => {
      if (!isHoveringRef.current) {
        userInteractedRef.current = false;
      }
    }, autoScrollResetDelay);

    return () => {
      cancelAnimationFrame(rafId);
      if (intervalId) clearInterval(intervalId);
      if (resetIntervalId) clearInterval(resetIntervalId);
    };
  }, [enableAutoScroll, scrollSpeed, autoScrollResetDelay, isXL]);

  const handleCardClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };
  
  // Clear interaction state
  const clearInteraction = () => {
    isHoveringRef.current = false;
    userInteractedRef.current = false;
  };

  return (
    <>
      {/* Mobile/Tablet/LG view - Carousel with reordered cards (swipeable) 
          Note: If auto-scroll doesn't work, check for ancestor 3D transforms.
          Ensure parent elements don't have transform: translateZ or similar that might
          interfere with scrolling on iOS. Add transform: none to wrapper if needed. */}
      <div 
        ref={mobileScrollContainerRef}
        className="scroller xl:hidden flex items-center justify-start gap-4 md:gap-6 lg:gap-8 overflow-x-scroll scrollbar-hide px-4 md:px-6 lg:px-8 py-8"
        style={{ 
          scrollPaddingLeft: '50%', 
          scrollPaddingRight: '50%', 
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          overscrollBehaviorX: 'contain',
          overscrollBehaviorY: 'none',
        }}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          clearInteraction();
        }}
        onTouchStart={() => {
          isHoveringRef.current = true;
          userInteractedRef.current = true;
        }}
        onTouchEnd={() => {
          // Reset hovering immediately since touch ended
          isHoveringRef.current = false;
          // Reset interaction after a short delay to allow scroll momentum to finish
          setTimeout(() => {
            userInteractedRef.current = false;
          }, 1200);
        }}
        onTouchCancel={clearInteraction}
        onPointerDown={() => {
          userInteractedRef.current = true;
        }}
        onPointerUp={() => {
          setTimeout(clearInteraction, 1200);
        }}
        onPointerCancel={clearInteraction}
        onMouseDown={() => {
          userInteractedRef.current = true;
        }}
        onWheel={() => {
          userInteractedRef.current = true;
        }}
      >
        {duplicatedPicks.map((pick) => {
          const baseId = pick.id.replace(/-dup\d+$/, '');
          const styles = cardStyles[baseId] || defaultCardStyle;
          const isFocused = focusedCardId === baseId;
          
          return (
            <div 
              key={pick.id}
              ref={(el) => { cardRefs.current[pick.id] = el; }}
              className="flex-shrink-0 w-[240px] md:w-[280px] lg:w-[260px]"
            >
              <FundCard
                id={pick.id}
                title={pick.title}
                subtitle={pick.subtitle}
                fundsCount={pick.fundsCount}
                bgGradient={styles.bgGradient}
                textColor={styles.textColor}
                onClick={() => handleCardClick(baseId)}
                isFocused={isFocused}
                enableEnlargementEffect={enableEnlargementEffect}
                focusedScale={focusedScale}
                unfocusedScale={unfocusedScale}
                isXL={isXL}
              />
            </div>
          );
        })}
      </div>

      {/* Desktop view (XL and above) - Horizontal scrolling carousel */}
      <div 
        ref={desktopScrollContainerRef}
        className="scroller hidden xl:flex items-center justify-start gap-4 overflow-x-scroll scrollbar-hide px-8 py-4"
        style={{ 
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          overscrollBehaviorX: 'contain',
          overscrollBehaviorY: 'none',
        }}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          clearInteraction();
        }}
        onPointerDown={() => {
          userInteractedRef.current = true;
        }}
        onPointerUp={() => {
          setTimeout(clearInteraction, 1200);
        }}
        onPointerCancel={clearInteraction}
        onMouseDown={() => {
          userInteractedRef.current = true;
        }}
        onWheel={() => {
          userInteractedRef.current = true;
        }}
      >
        {duplicatedPicks.map((pick) => {
          const baseId = pick.id.replace(/-dup\d+$/, '');
          const styles = cardStyles[baseId] || defaultCardStyle;
          
          return (
            <div 
              key={pick.id}
              className="flex-shrink-0 w-[280px]"
            >
              <FundCard
                id={pick.id}
                title={pick.title}
                subtitle={pick.subtitle}
                fundsCount={pick.fundsCount}
                bgGradient={styles.bgGradient}
                textColor={styles.textColor}
                onClick={() => handleCardClick(baseId)}
                isFocused={false}
                enableEnlargementEffect={false}
                focusedScale={1.0}
                unfocusedScale={1.0}
                isXL={isXL}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FundCards;

