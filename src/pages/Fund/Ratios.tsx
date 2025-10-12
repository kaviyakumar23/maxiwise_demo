import React, { useState } from 'react';
import { fundData } from './DummyData';
import { Chip } from '../../components/ui/Chip';
import type { RatioSection } from './DummyData';
import ShadowImage from '../../assets/images/Shadow.png';
import SpiralImage from '../../assets/images/GraphSpiral.png';

const Ratios: React.FC = () => {
  const { ratios } = fundData;
  
  const [activeTab, setActiveTab] = useState(ratios.activeTab);

  // Get the active ratio section based on selected tab
  const getActiveSection = (): RatioSection => {
    switch (activeTab) {
      case 'Risk & Volatility':
        return ratios.riskVolatility;
      case 'Trade-Off Ratios':
        return ratios.tradeOffRatios;
      case 'Market Cycle':
        return ratios.marketCycle;
      case 'Outperformance':
        return ratios.outperformance;
      default:
        return ratios.riskVolatility;
    }
  };

  const activeSection = getActiveSection();

  return (
    <div className="w-full lg:w-2/3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6">
      {/* Section Title with Help Icon */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-outfit text-[#101010]">
          Ratios
        </h2>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
          <span className="text-gray-600 text-lg md:text-xl font-medium">?</span>
        </button>
      </div>

      {/* Ratio Tabs */}
      <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        {ratios.tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="w-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
        {/* Section Title and Subtitle */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-outfit text-[#101010] mb-2">
            {activeSection.title}
          </h3>
          <p className="text-base md:text-lg font-normal font-outfit text-[#6B7280]">
            {activeSection.subtitle}
          </p>
        </div>

        {/* Grouped Bar Chart */}
        <div className="mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          <div className="min-w-[400px] md:min-w-[600px]">
            {/* Chart Container */}
            <div className="relative">
              {/* Bars */}
              <div className="flex items-end justify-around gap-8 px-4 md:px-8 relative" style={{ height: '200px' }}>
                {activeSection.metrics.map((metric, metricIndex) => {
                  const maxValue = Math.max(
                    ...activeSection.metrics.flatMap(m => [m.category, m.benchmark, m.fund])
                  );
                  
                  return (
                    <div key={metricIndex} className="flex-1 flex items-end justify-center gap-2 md:gap-3">
                      {/* Category Bar */}
                      <div className="flex-1 max-w-[60px] flex flex-col items-center justify-end">
                        <div className="relative w-full">
                          {/* Shadow */}
                          <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                            style={{
                              height: `${Math.min((metric.category / maxValue) * 200 * 0.3, 40)}px`,
                              zIndex: 0,
                            }}
                          >
                            <img 
                              src={ShadowImage} 
                              alt="" 
                              className="w-full h-full object-contain"
                              style={{ filter: 'blur(8px)' }}
                            />
                          </div>
                          
                          {/* Bar */}
                          <div
                            className="w-full rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                            style={{
                              height: `${(metric.category / maxValue) * 200}px`,
                              zIndex: 1,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(155.25deg, #CBD5E1 2.06%, #6E7782 97.94%)',
                              }}
                            />
                            <div
                              className="absolute inset-0 opacity-50"
                              style={{
                                backgroundImage: `url(${SpiralImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                mixBlendMode: 'hard-light',
                                transform: 'scaleX(-1)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Benchmark Bar */}
                      <div className="flex-1 max-w-[60px] flex flex-col items-center justify-end">
                        <div className="relative w-full">
                          {/* Shadow */}
                          <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                            style={{
                              height: `${Math.min((metric.benchmark / maxValue) * 200 * 0.3, 40)}px`,
                              zIndex: 0,
                            }}
                          >
                            <img 
                              src={ShadowImage} 
                              alt="" 
                              className="w-full h-full object-contain"
                              style={{ filter: 'blur(8px)' }}
                            />
                          </div>
                          
                          {/* Bar */}
                          <div
                            className="w-full rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                            style={{
                              height: `${(metric.benchmark / maxValue) * 200}px`,
                              zIndex: 1,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)',
                              }}
                            />
                            <div
                              className="absolute inset-0 opacity-50"
                              style={{
                                backgroundImage: `url(${SpiralImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                mixBlendMode: 'hard-light',
                                transform: 'scaleX(-1)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Fund Bar */}
                      <div className="flex-1 max-w-[60px] flex flex-col items-center justify-end">
                        <div className="relative w-full">
                          {/* Shadow */}
                          <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                            style={{
                              height: `${Math.min((metric.fund / maxValue) * 200 * 0.3, 40)}px`,
                              zIndex: 0,
                            }}
                          >
                            <img 
                              src={ShadowImage} 
                              alt="" 
                              className="w-full h-full object-contain"
                              style={{ filter: 'blur(8px)' }}
                            />
                          </div>
                          
                          {/* Bar */}
                          <div
                            className="w-full rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                            style={{
                              height: `${(metric.fund / maxValue) * 200}px`,
                              zIndex: 1,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(180deg, #A78BFA 0%, #7C3AED 100%)',
                              }}
                            />
                            <div
                              className="absolute inset-0 opacity-50"
                              style={{
                                backgroundImage: `url(${SpiralImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                mixBlendMode: 'hard-light',
                                transform: 'scaleX(-1)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Baseline */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300 z-10"></div>
            </div>
            
            {/* Labels below baseline */}
            <div className="flex justify-around gap-8 px-4 md:px-8 mt-4">
              {activeSection.metrics.map((metric, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">
                    {metric.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#64748B] to-[#334155]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">Benchmark</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#A78BFA] to-[#7C3AED]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#9346FD]">Fund</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratios;

