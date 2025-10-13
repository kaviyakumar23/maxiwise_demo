import React, { useState } from "react";
import { fundData } from "./DummyData.tsx";
import SpiralBg from "../../assets/images/spiral-bg-card.png";
import Shadow from "../../assets/images/Shadow.png";

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
}

const FundCard: React.FC<FundCardProps> = ({
  title,
  subtitle,
  fundsCount,
  bgGradient,
  textColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-7 xl:p-6 2xl:p-7 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden h-[280px] md:h-[300px] lg:h-[280px] xl:h-[256px] 2xl:h-[307px]"
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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Number of cards to show at once
  const cardsPerView = 5;
  
  // Calculate if we can scroll
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + cardsPerView < smartFundPicks.length;

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex((prev) => Math.min(prev + 1, smartFundPicks.length - cardsPerView));
    }
  };

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
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
        
        {/* Navigation Arrows - Hidden on mobile and tablet */}
        {/* <div className="hidden xl:flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-=${
              canScrollLeft
                ? "border-gray-300 hover:border-purple hover:bg-purple-50 cursor-pointer"
                : "border-gray-200 opacity-40 cursor-not-allowed"
            }`}
            aria-label="Previous"
          >
            <svg
              className={`w-5 h-5 md:w-6 md:h-6 ${canScrollLeft ? "text-gray-600" : "text-gray-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              canScrollRight
                ? "border-purple bg-purple hover:bg-purple-600 cursor-pointer"
                : "border-gray-200 bg-gray-100 opacity-40 cursor-not-allowed"
            }`}
            aria-label="Next"
          >
            <svg
              className={`w-5 h-5 md:w-6 md:h-6 ${canScrollRight ? "text-white" : "text-gray-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Cards Container - Horizontal scroll on mobile and tablet, grid on desktop */}
      <div className="flex justify-between gap-3 overflow-x-auto xl:grid xl:grid-cols-5 xl:gap-4 2xl:gap-5 xl:overflow-x-visible scrollbar-hide p-4">
        {smartFundPicks.map((pick) => {
          const styles = cardStyles[pick.id];
          return (
            <div key={pick.id} className="flex-shrink-0 w-[180px] md:w-[220px] lg:w-[200px] xl:w-[200px] 2xl:w-[240px]">
              <FundCard
                id={pick.id}
                title={pick.title}
                subtitle={pick.subtitle}
                fundsCount={pick.fundsCount}
                bgGradient={styles.bgGradient}
                textColor={styles.textColor}
                onClick={() => handleCardClick(pick.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FundPicks;

