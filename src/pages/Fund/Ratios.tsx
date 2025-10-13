import React, { useState, useRef, useEffect } from 'react';
import { fundData } from './DummyData';
import { Chip } from '../../components/ui/Chip';
import type { RatioSection } from './DummyData';
import ShadowImage from '../../assets/images/Shadow.png';
import SpiralImage from '../../assets/images/GraphSpiral.png';
import Qustion from '../../assets/images/Question.svg';

const Ratios: React.FC = () => {
  const { ratios } = fundData;
  
  const [activeTab, setActiveTab] = useState(ratios.activeTab);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate tooltip position when metric is hovered
  useEffect(() => {
    if (hoveredMetric !== null && metricRefs.current[hoveredMetric]) {
      const element = metricRefs.current[hoveredMetric];
      const rect = element!.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 10, // Position above the element with some spacing
        left: rect.left + rect.width / 2, // Center horizontally
      });
    } else {
      setTooltipPosition(null);
    }
  }, [hoveredMetric]);

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
    <>
      {/* Fixed Tooltip */}
      {hoveredMetric !== null && tooltipPosition && (
        <div 
          className="fixed bg-navy rounded-lg shadow-lg p-3 z-[9999] whitespace-nowrap pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="flex flex-col gap-1.5">
            {/* Only show Category for non-Outperformance charts */}
            {activeTab !== 'Outperformance' && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#CBD5E1] text-sm font-outfit">Category</span>
                <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                  {activeSection.metrics[hoveredMetric].category.toFixed(1)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#CBD5E1] text-sm font-outfit">Benchmark</span>
              <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                {activeSection.metrics[hoveredMetric].benchmark.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#CBD5E1] text-sm font-outfit">Fund</span>
              <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                {activeSection.metrics[hoveredMetric].fund.toFixed(1)}
              </span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-navy"></div>
          </div>
        </div>
      )}
      
      
        {/* Section Title with Help Icon */}
        <div className="p-4 md:p-2 lg:p-4 xl:p-0">
      <div className="flex items-center justify-between">
        <h2 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
          Ratios
        </h2>
        <button className="w-4 h-4 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
          <span><img src={Qustion} alt="Question" /></span>
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
      </div> 

      {/* Chart Section */}
      <div className="w-full lg:w-2/3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6">
        {/* Section Title and Subtitle */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg lg:text-xl lg:font-semibold md:font-semibold font-medium font-outfit text-[#101010] mb-2">
            {activeSection.title}
          </h3>
          <p className="lg:text-base md:text-base lg:font-normal md:font-normal font-normal text-sm font-outfit text-[#6B7280]">
            {activeSection.subtitle}
          </p>
        </div>

        {/* Grouped Bar Chart */}
        <div className="mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          <div className="md:min-w-[400px]">
            {/* Chart Container */}
            <div className="relative flex pt-20">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between pr-2 md:pr-4" style={{ height: '200px' }}>
                {[0.8, 0.6, 0.4, 0.2, 0].map((value) => (
                  <div key={value} className="text-xs md:text-sm font-outfit text-[#6B7280]">
                    {value}
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="relative flex-1">
                {/* Horizontal dotted lines */}
                <div className="absolute inset-0 pointer-events-none" style={{ height: '200px' }}>
                  {[0.8, 0.6, 0.4, 0.2].map((value, index) => (
                    <div
                      key={value}
                      className="absolute left-0 right-0 border-t border-dashed border-gray-300"
                      style={{
                        top: `${index * 25}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Bars */}
                <div className="flex items-end justify-around gap-4 md:gap-8 px-4 md:px-8 relative" style={{ height: '200px' }}>
                  {activeSection.metrics.map((metric, metricIndex) => {
                    const maxValue = Math.max(
                      ...activeSection.metrics.flatMap(m => [m.category, m.benchmark, m.fund])
                    );
                    
                    return (
                      <div 
                        key={metricIndex}
                        ref={(el) => { metricRefs.current[metricIndex] = el; }}
                        className="flex-1 flex items-end justify-center gap-1.5 md:gap-3 relative"
                        onMouseEnter={() => setHoveredMetric(metricIndex)}
                        onMouseLeave={() => setHoveredMetric(null)}
                      >
                        {/* Category Bar - Only show for non-Outperformance charts */}
                        {activeTab !== 'Outperformance' && (
                          <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
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
                                className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[15px] transition-all duration-500 ease-out relative overflow-hidden"
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
                        )}
                        
                        {/* Benchmark Bar */}
                        <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
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
                              className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[15px] transition-all duration-500 ease-out relative overflow-hidden"
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
                        <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
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
                              className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[15px] transition-all duration-500 ease-out relative overflow-hidden"
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
            </div>
            
            {/* Labels below baseline */}
            <div className="flex mt-4">
              {/* Empty space for Y-axis */}
              <div className="pr-2 md:pr-4" style={{ width: 'auto', minWidth: '32px' }}></div>
              
              {/* X-axis labels */}
              <div className="flex-1 flex justify-around gap-4 md:gap-8 px-4 md:px-8">
                {activeSection.metrics.map((metric, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="text-xs md:text-base font-normal font-outfit text-[#4B5563]">
                      {metric.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Only show Category legend for non-Outperformance charts */}
          {activeTab !== 'Outperformance' && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8]"></div>
              <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">Category</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#64748B] to-[#334155]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">Benchmark</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#A78BFA] to-[#7C3AED]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#9346FD]">Fund</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ratios;

