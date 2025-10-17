import React, { useRef, useState, useEffect } from "react";
import { fundData } from "../../pages/Fund/DummyData.tsx";
import SpiralBg from "../../assets/images/spiral-bg-card.png";
import Shadow from "../../assets/images/Shadow.png";
import CaretDown from "../../assets/images/CaretDoubleDown.svg";

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
  enableEnlargementEffect?: boolean;
  focusedScale?: number;
  unfocusedScale?: number;
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
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);

  // Calculate height classes based on enlargement effect
  const getHeightClass = () => {
    if (!enableEnlargementEffect) return 'h-[300px] md:h-[320px]';
    return isFocused ? 'h-[320px] md:h-[340px]' : 'h-[280px] md:h-[300px]';
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - startX.current) > 5) {
      setIsDragging(true);
    }
  };

  const handleClick = () => {
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-6 xl:p-6 2xl:p-7 cursor-pointer overflow-hidden transition-all duration-500 ease-out
        ${getHeightClass()} ${enableEnlargementEffect && isFocused ? 'shadow-2xl' : ''}
        lg:h-[300px] lg:scale-100 lg:shadow-none lg:hover:scale-105 lg:hover:shadow-2xl
        xl:h-[350px] 2xl:h-[400px]
      `}
      style={{
        background: bgGradient,
        transform: window.innerWidth < 1280 ? `scale(${enableEnlargementEffect ? (isFocused ? focusedScale : unfocusedScale) : 1})` : undefined,
        userSelect: 'none',
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

const FundCards: React.FC<FundCardsProps> = ({ 
  onCategorySelect,
  enableEnlargementEffect = true,
  focusedScale = 1.0,
  unfocusedScale = 0.9,
  enableAutoScroll = true,
  scrollSpeed = 40,
  autoScrollResetDelay = 5000,
}) => {
  const { smartFundPicks } = fundData;
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  const desktopScrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [focusedCardId, setFocusedCardId] = useState<string>("all-parameters");
  const isInitialMount = useRef(true);
  const isHoveringRef = useRef(false); // Ref to track hover state for intervals
  const userInteractedRef = useRef(false);

  // Reorder cards to put "all-parameters" in the middle for both mobile/tablet and desktop
  const reorderedPicks = [...smartFundPicks];
  const allParamsIndex = reorderedPicks.findIndex(pick => pick.id === "all-parameters");
  if (allParamsIndex !== -1) {
    const allParamsCard = reorderedPicks.splice(allParamsIndex, 1)[0];
    reorderedPicks.splice(2, 0, allParamsCard); // Insert at index 2 (middle of 5 cards)
  }

  // Duplicate cards multiple times to ensure scrollable content
  const duplicatedPicks = [
    ...reorderedPicks,
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup1` })),
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup2` })),
    ...reorderedPicks.map(pick => ({ ...pick, id: `${pick.id}-dup3` })),
  ];

  // Detect which card is in focus based on scroll position
  const detectFocusedCard = () => {
    if (mobileScrollContainerRef.current && window.innerWidth < 1280) {
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
    } else if (window.innerWidth >= 1280) {
      // Reset focus for desktop view (xl and above)
      setFocusedCardId("");
    }
  };

  // Initialize and center "all-parameters" card on mount for mobile/tablet/lg screens
  useEffect(() => {
    if (isInitialMount.current && window.innerWidth < 1280) {
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
    } else if (isInitialMount.current && window.innerWidth >= 1280) {
      // For xl and above desktop, the card is already centered due to reordering
      isInitialMount.current = false;
    }
  }, []);

  // Initialize scroll position check
  useEffect(() => {
    detectFocusedCard();
    
    const mobileContainer = mobileScrollContainerRef.current;
    const desktopContainer = desktopScrollContainerRef.current;
    let scrollTimeout: number | undefined;
    
    const handleScroll = () => {
      detectFocusedCard();
      
      // Mark as user interaction when manually scrolling
      userInteractedRef.current = true;
      
      // Clear existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Reset user interaction flag after scroll ends
      scrollTimeout = window.setTimeout(() => {
        if (!isHoveringRef.current) {
          userInteractedRef.current = false;
        }
      }, 1000);
    };
    
    const handleResize = () => {
      detectFocusedCard();
    };
    
    if (mobileContainer) {
      mobileContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (desktopContainer) {
      desktopContainer.addEventListener('scroll', handleScroll, { passive: true });
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
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [focusedCardId]);

  // Auto-scroll effect - smooth 60fps scrolling using requestAnimationFrame
  // Only enable on desktop to avoid conflicts with touch scrolling
  useEffect(() => {
    // Disable auto-scroll on mobile/tablet to prevent interference with touch
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!enableAutoScroll || isMobile) return;

    let animationFrameId: number | undefined;
    let resetIntervalId: number | undefined;
    let lastTimestamp = 0;
    
    // Wait for component to fully mount and render
    const initTimer = setTimeout(() => {
      const animate = (timestamp: number) => {
        // Only run on desktop (xl and above)
        const container = window.innerWidth >= 1280 
          ? desktopScrollContainerRef.current 
          : null;
        
        if (!container) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        
        // Calculate time delta in seconds
        const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
        lastTimestamp = timestamp;
        
        // Check the current state from refs (not state, to avoid closure issues)
        const shouldScroll = !isHoveringRef.current && !userInteractedRef.current;
        
        if (shouldScroll && deltaTime > 0) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const currentScroll = container.scrollLeft;
          
          if (maxScroll > 0) {
            if (currentScroll >= maxScroll - 5) {
              // Loop back to start
              container.scrollLeft = 0;
            } else {
              // Smooth scroll based on time delta
              container.scrollLeft += scrollSpeed * deltaTime;
            }
          }
        }
        
        // Continue animation loop
        animationFrameId = requestAnimationFrame(animate);
      };
      
      // Start animation loop
      animationFrameId = requestAnimationFrame(animate);
      
      // Reset user interaction flag periodically
      resetIntervalId = window.setInterval(() => {
        if (!isHoveringRef.current) {
          userInteractedRef.current = false;
        }
      }, autoScrollResetDelay);
      
    }, 500);
    
    return () => {
      clearTimeout(initTimer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resetIntervalId) {
        clearInterval(resetIntervalId);
      }
    };
  }, [enableAutoScroll, scrollSpeed, autoScrollResetDelay]); // Re-run if props change

  const handleCardClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <>
      {/* Mobile/Tablet/LG view - Carousel with reordered cards (swipeable) */}
      <div 
        ref={mobileScrollContainerRef}
        className="xl:hidden flex items-center justify-start gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide px-4 md:px-6 lg:px-8 py-8"
        style={{ 
          scrollPaddingLeft: '50%', 
          scrollPaddingRight: '50%', 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          userInteractedRef.current = false;
        }}
        onTouchStart={() => {
          isHoveringRef.current = true;
          userInteractedRef.current = true;
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            isHoveringRef.current = false;
          }, 500);
        }}
        onMouseDown={() => {
          userInteractedRef.current = true;
        }}
        onWheel={() => {
          userInteractedRef.current = true;
        }}
      >
        {duplicatedPicks.map((pick) => {
          const baseId = pick.id.replace(/-dup\d+$/, '');
          const styles = cardStyles[baseId];
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
              />
            </div>
          );
        })}
      </div>

      {/* Desktop view (XL and above) - Horizontal scrolling carousel */}
      <div 
        ref={desktopScrollContainerRef}
        className="hidden xl:flex items-center justify-start gap-4 overflow-x-auto scrollbar-hide px-8 py-4"
        style={{ 
          scrollBehavior: 'auto',
        }}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          userInteractedRef.current = false;
        }}
        onMouseDown={() => {
          userInteractedRef.current = true;
        }}
        onWheel={() => {
          userInteractedRef.current = true;
        }}
      >
        {duplicatedPicks.map((pick) => {
          const baseId = pick.id.replace(/-dup\d+$/, '');
          const styles = cardStyles[baseId];
          
          return (
            <div 
              key={pick.id}
              className="flex-shrink-0 w-[300px]"
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
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FundCards;

