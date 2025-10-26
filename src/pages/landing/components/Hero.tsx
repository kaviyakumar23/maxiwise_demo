import { useState, useEffect } from 'react';
import GetStarted from "../../../components/common/GetStarted"
import Search from "../../../components/common/Search"
import BackgroundHero from "../../../assets/images/BackgroundHero.png"

const AnimatedKeyword = ({ word, position, isActive }: { word: string, position: { top: string, left?: string, right?: string }, isActive: boolean }) => {
  return (
    <div
      className={`absolute font-inter text-2xl font-normal text-purple transition-all duration-1000 ease-in-out ${
        isActive 
          ? 'opacity-100 blur-0 scale-100' 
          : 'opacity-0 blur-md scale-95'
      }`}
      style={position}
    >
      {word}
    </div>
  );
};

export const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const keywords = [
    { word: 'Equity', position: { top: '15%', left: '15%' } },
    { word: 'Portfolio', position: { top: '40%', left: '10%' } },
    { word: 'Funds', position: { top: '65%', left: '15%' } },
    { word: 'Assets', position: { top: '15%', right: '15%' } },
    { word: 'Returns', position: { top: '40%', right: '10%' } },
    { word: 'Expense Ratio', position: { top: '65%', right: '15%' } }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % keywords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [keywords.length]);

  return (
    <>
      <div id='hero' className="min-h-screen bg-white h-100vh bg-cover bg-center relative font-outfit">
        <img src={BackgroundHero} alt="BackgroundHero" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Desktop Layout (1025px and above) */}
        <div className="relative z-10 hidden xl:flex flex-col justify-center items-center min-h-screen px-8 tracking-normal">
          {/* Animated Keywords - Only on desktop */}
          {keywords.map((keyword, index) => (
            <AnimatedKeyword
              key={keyword.word}
              word={keyword.word}
              position={keyword.position}
              isActive={activeIndex === index}
            />
          ))}

          {/* Main content - centered in the middle of the page */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing</p>
            </div>
            <div className="mb-12">
              <h1 className="text-6xl font-medium font-outfit text-white py-2">
                The most objective <br /> report card of every <br /> mutual fund.
              </h1>
              <p className="text-3xl font-light italic font-outfit text-white p-4">
                No bias, only facts.
              </p>
            </div>
            <div className='w-full max-w-xl mx-auto'>
              <Search />
              {/* <GetStarted>Start Maxiwising</GetStarted> */}
            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
            <div className="text-white text-sm font-normal text-center">
              1400+ mutual funds analysed | 1.2 lakh data points decoded
            </div>
          </div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="relative z-10 hidden md:flex xl:hidden flex-col justify-center items-center min-h-screen px-6 tracking-normal">
          {/* Main content - centered in the middle of the page */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing </p>
            </div>
            <div className="mb-12">
              <h1 className="text-5xl lg:text-6xl font-medium leading-tight py-2 font-outfit text-white">
              The most objective <br /> report card of every <br /> mutual fund.
              </h1>
              <p className="text-3xl lg:text-3xl font-light italic leading-tight p-4 font-outfit text-white">
                No bias, only facts
              </p>
            </div>
            <div>
              {/* <GetStarted>Start Maxiwising</GetStarted> */}
              <Search />
            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
            <div className="text-white text-sm font-normal text-center">
            1400+ mutual funds analysed | 1.2 lakh data points decoded
            </div>
          </div>
        </div>

        {/* Mobile Layout (below 768px) */}
        <div className="relative z-10 flex md:hidden flex-col justify-center items-start min-h-screen px-2 tracking-normal">
          {/* Main content - centered vertically, left-aligned horizontally */}
          <div className="flex flex-col items-start justify-center text-left pl-8">
            <div className="text-base font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing</p>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight font-outfit text-white">
                The most objective 
              </h1>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight font-outfit text-white">
                report card of every
              </h1>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-2 font-outfit text-white">
                mutual fund.
              </h1>
              <p className="text-base lg:text-6xl font-light italic leading-tight p-4 font-outfit text-white">
                No bias, only facts
              </p>
            </div>
            <div className='py-6'>
              <GetStarted>Start Maxiwising</GetStarted>

            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-6 flex flex-col items-start justify-start gap-6 pl-4">
            <div className="text-white text-sm font-normal text-left">
            1400+ mutual funds analysed | 1.2 lakh data points decoded
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;