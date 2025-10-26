import { useState, useRef, useEffect } from "react";

interface CardData {
  id: number; 
  middleText: string;
  mainText: string;
}

const cardsData: CardData[] = [
  {
    id: 1,
    middleText: "Select Right with",
    mainText: "CARRVA",
  },
  {
    id: 2,
    middleText: "Manage Portfolio with",
    mainText: "The Alpha Methodology",
  },
];

const Engine = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-base md:text-lg font-normal lg:text-2xl font-outfit text-purple p-2 md:p-4">
       The Engine
      </p>
      <div className="text-xl md:text-3xl lg:text-4xl font-medium text-navy font-outfit leading-8 sm:leading-9 p-4 text-center max-w-4xl">
        <p>We do the complex analysis and crunch the numbers so that you get the clarity for every investment decision.</p>
      </div>
      

      {/* Desktop and Tablet View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 mt-12 max-w-7xl w-full px-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-navy rounded-3xl p-12 lg:p-16 flex flex-col justify-end h-[500px] lg:h-[600px]">
            <p className="text-white text-sm md:text-base lg:text-lg font-medium font-outfit leading-4 py-4 mb-2">
              {card.middleText}
            </p>
            <h1 className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-outfit leading-6 tracking-tight">
              {card.mainText}
            </h1>
          </div>
        ))}
      </div>

      {/* Mobile View with Horizontal Scroll */}
      <div className="md:hidden mt-12">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex gap-4">
            {cardsData.map((card) => (
              <div 
                key={card.id}
                className="w-full flex-shrink-0 snap-center"
              >
                <div className="bg-navy rounded-3xl p-10 flex flex-col justify-end h-[400px]">
                  <p className="text-white text-xs md:text-sm lg:text-base font-medium font-outfit leading-4 mb-2">
                    {card.middleText}
                  </p>
                  <h1 className="text-white text-xl font-normal font-outfit leading-6 tracking-tight">
                    {card.mainText}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {cardsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-purple"
                  : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Engine;