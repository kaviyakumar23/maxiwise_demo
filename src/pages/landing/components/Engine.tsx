import { useState, useRef, useEffect } from "react";
import GetStarted from "../../../components/common/GetStarted";

interface CardData {
  id: number;
  topText: string;
  middleText: string;
  mainText: string;
}

const cardsData: CardData[] = [
  {
    id: 1,
    topText: "Start Selecting Right",
    middleText: "To select right:",
    mainText: "Carrva",
  },
  {
    id: 2,
    topText: "Be a part of the 1%",
    middleText: "To navigate right:",
    mainText: "Alpha",
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
      <p className="text-sm md:text-lg font-normal lg:text-2xl font-outfit text-purple p-8">
        From Data to Decisions
      </p>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-navy font-outfit leading-7 p-6">
        The Engine
      </h1>
      <div className="mt-4 p-4">
        <GetStarted />
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 mt-12 max-w-7xl w-full px-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-navy rounded-3xl p-12 lg:p-16 flex flex-col justify-end h-[500px] lg:h-[600px]"
          >
            <p className="text-purple text-xs lg:text-base md:text-sm font-medium font-outfit py-2 leading-4">
              {card.topText}
            </p>
            <h2 className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-outfit leading-6 tracking-tight py-4 mb-2">
              {card.middleText}
            </h2>
            <h3 className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-outfit leading-6 tracking-tight">
              {card.mainText}
            </h3>
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
                  <p className="text-purple text-xs lg:text-base md:text-sm font-medium font-outfit py-2 leading-4 mb-2">
                    {card.topText}
                  </p>
                  <h2 className="text-white text-xl font-normal font-outfit leading-6 tracking-tight mb-2">
                    {card.middleText}
                  </h2>
                  <h3 className="text-white text-xl font-normal font-outfit leading-6 tracking-tight">
                    {card.mainText}
                  </h3>
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