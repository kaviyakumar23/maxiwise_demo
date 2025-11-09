import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Chip } from '../../components/ui/Chip';
import ShadowImage from '../../assets/images/Shadow.png';
import SpiralImage from '../../assets/images/GraphSpiral.png';
import Qustion from '../../assets/images/Question.svg';
import type { Ratios } from '../../types/fundTypes';

interface RatiosProps {
  ratiosData?: Ratios;
  fundType?: 'Equity' | 'Fixed Income' | 'Alternative' | 'Allocation' | 'Commodities';
}

interface RatioMetrics {
  name: string;
  category: number;
  benchmark: number;
  fund: number;
}

interface RatioSection {
  title: string;
  subtitle: string;
  metrics: RatioMetrics[];
}

// Helper function to transform abbreviated labels to full names
const getFullLabelName = (abbreviatedName: string): string => {
  const labelMap: { [key: string]: string } = {
    'StdDev': 'Standard Deviation',
    'Std Dev': 'Standard Deviation',
    'Down Dev': 'Downside Deviation',
    'Total Cap': 'Total Capture',
    'Up Cap': 'Up Capture',
    'Down Cap': 'Down Capture',
  };
  
  return labelMap[abbreviatedName] || abbreviatedName;
};

const RatiosComponent: React.FC<RatiosProps> = ({ ratiosData, fundType }) => {
  // Only show Ratios for specific fund types
  const allowedFundTypes = ['Equity', 'Allocation', 'Commodities'];
  
  // Return null if fund type is not in the allowed list
  if (fundType && !allowedFundTypes.includes(fundType)) {
    return null;
  }

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!ratiosData?.success || !ratiosData.data) {
      return null;
    }

    const { data } = ratiosData;
    
    // Helper function to transform each section
    const transformSection = (sectionData: any, subtitle: string): RatioSection => {
      const metrics: RatioMetrics[] = sectionData.categories.map((category: string, index: number) => {
        const fundSeries = sectionData.series.find((s: any) => s.name === 'Fund');
        const benchmarkSeries = sectionData.series.find((s: any) => s.name === 'Benchmark');
        const categorySeries = sectionData.series.find((s: any) => s.name === 'Category');
        
        // For Outperformance chart: if no Benchmark series, use Category data as benchmark
        // This is because Outperformance API returns Fund and Category (not Benchmark)
        const benchmarkValue = benchmarkSeries?.data[index] || 
                              (sectionData.title === 'Outperformance' ? categorySeries?.data[index] : 0) || 
                              0;
        
        return {
          name: category,
          fund: fundSeries?.data[index] || 0,
          benchmark: benchmarkValue,
          category: categorySeries?.data[index] || 0,
        };
      });

      return {
        title: sectionData.title,
        subtitle: subtitle,
        metrics: metrics,
      };
    };

    return {
      tabs: ['Risk & Volatility', 'Trade-Off Ratios', 'Market Cycle', 'Outperformance'],
      riskVolatility: transformSection(data.riskVolatility, 'Lower the Better'),
      tradeOffRatios: transformSection(data.tradeOffRatios, 'Higher the Better'),
      marketCycle: transformSection(data.marketCycle, 'Higher the Better'),
      outperformance: transformSection(data.outperformance, 'Higher the Better'),
    };
  }, [ratiosData]);

  const [activeTab, setActiveTab] = useState<string>('Risk & Volatility');
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
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

  // Get the active ratio section based on selected tab
  const getActiveSection = (): RatioSection | null => {
    if (!transformedData) return null;
    
    switch (activeTab) {
      case 'Risk & Volatility':
        return transformedData.riskVolatility;
      case 'Trade-Off Ratios':
        return transformedData.tradeOffRatios;
      case 'Market Cycle':
        return transformedData.marketCycle;
      case 'Outperformance':
        return transformedData.outperformance;
      default:
        return transformedData.riskVolatility;
    }
  };

  const activeSection = getActiveSection();

  // If no data is available, show a loading or empty state
  if (!transformedData || !activeSection) {
    return (
      <div className='py-4'>
        <div className="p-4 md:p-2 lg:p-4 xl:p-0">
          <h2 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
            Ratios
          </h2>
          <p className="text-gray-500">No ratio data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-4'>
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
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#CBD5E1] text-sm font-outfit">Fund</span>
              <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                {(activeSection.metrics[hoveredMetric].fund * 1000)}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#CBD5E1] text-sm font-outfit">
                {activeTab === 'Outperformance' ? 'Category' : 'Benchmark'}
              </span>
              <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                {(activeSection.metrics[hoveredMetric].benchmark * 1000)}%
              </span>
            </div>
            {/* Only show Category for non-Outperformance charts */}
            {activeTab !== 'Outperformance' && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#CBD5E1] text-sm font-outfit">Category</span>
                <span className="text-[#CBD5E1] text-sm font-semibold font-outfit">
                  {(activeSection.metrics[hoveredMetric].category * 1000)}%
                </span>
              </div>
            )}
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
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors lg:hidden"
        >
          <span><img src={Qustion} alt="Question" /></span>
        </button>
      </div>

      {/* Ratio Tabs */}
      <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        {transformedData.tabs.map((tab) => (
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
            {/* Calculate max value and Y-axis labels - DYNAMIC per chart */}
            {(() => {
              // Get the actual maximum value from THIS chart's data only
              const maxDataValue = Math.max(
                ...activeSection.metrics.flatMap(m => {
                  const values = [m.fund || 0, m.benchmark || 0];
                  // Only include category if it exists (not in Outperformance chart)
                  if (activeTab !== 'Outperformance' && m.category !== undefined) {
                    values.push(m.category);
                  }
                  return values;
                })
              );
              
              // Simple Y-axis: round max up to nearest nice number, divide by 4 for 5 labels
              const getNiceYAxisMax = (maxVal: number) => {
                if (maxVal === 0 || maxVal < 0.00001) return 0.2;
                
                // Round up to nearest nice number with more granular options
                if (maxVal <= 0.05) return 0.05;
                if (maxVal <= 0.1) return 0.1;
                if (maxVal <= 0.2) return 0.2;
                if (maxVal <= 0.3) return 0.3;
                if (maxVal <= 0.4) return 0.4;
                if (maxVal <= 0.5) return 0.5;
                if (maxVal <= 0.6) return 0.6;
                if (maxVal <= 0.8) return 0.8;
                if (maxVal <= 1.0) return 1.0;
                if (maxVal <= 1.2) return 1.2;
                if (maxVal <= 1.5) return 1.5;
                if (maxVal <= 2.0) return 2.0;
                if (maxVal <= 2.5) return 2.5;
                if (maxVal <= 3.0) return 3.0;
                if (maxVal <= 4.0) return 4.0;
                if (maxVal <= 5.0) return 5.0;
                if (maxVal <= 6.0) return 6.0;
                if (maxVal <= 8.0) return 8.0;
                if (maxVal <= 10.0) return 10.0;
                
                // For larger values, round up to nearest multiple of 5
                return Math.ceil(maxVal / 5) * 5;
              };
              
              const yAxisMax = getNiceYAxisMax(maxDataValue);
              
              // Always generate exactly 5 labels evenly spaced from max to 0
              const adjustedStep = yAxisMax / 4;
              const yAxisLabels = [
                yAxisMax,
                yAxisMax - adjustedStep,
                yAxisMax - 2 * adjustedStep,
                yAxisMax - 3 * adjustedStep,
                0
              ];
              
              // Format Y-axis labels cleanly without rounding artifacts
              const formatYAxisLabel = (value: number): string => {
                // Handle near-zero values
                if (Math.abs(value) < 0.00001) return '0';
                
                // Convert to string with enough precision
                let formatted: string;
                
                if (adjustedStep >= 1) {
                  // For large steps, use 1 decimal or whole number
                  formatted = value.toFixed(1);
                } else if (adjustedStep >= 0.01) {
                  // For medium steps, use 2 decimals to show exact values
                  formatted = value.toFixed(2);
                } else {
                  // For tiny steps, use 3 decimals
                  formatted = value.toFixed(3);
                }
                
                // Remove unnecessary trailing zeros and decimal point
                formatted = formatted.replace(/\.?0+$/, '');
                
                return formatted || '0';
              };
              
              return (
                <>
                  {/* Chart Container */}
                  <div className="relative flex pt-20">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between pr-2 md:pr-4" style={{ height: '200px' }}>
                      {yAxisLabels.map((value, index) => (
                        <div key={`${value}-${index}`} className="text-xs md:text-sm font-outfit text-[#6B7280]">
                          {formatYAxisLabel(value)}
                        </div>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="relative flex-1">
                      {/* Horizontal dotted lines */}
                      <div className="absolute inset-0 pointer-events-none" style={{ height: '200px' }}>
                        {yAxisLabels.slice(0, 4).map((value, index) => (
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
                          return (
                            <div 
                              key={metricIndex}
                              ref={(el) => { metricRefs.current[metricIndex] = el; }}
                              className="flex-1 flex items-end justify-center gap-1.5 md:gap-3 relative"
                              onMouseEnter={() => setHoveredMetric(metricIndex)}
                              onMouseLeave={() => setHoveredMetric(null)}
                            >
                              {/* Fund Bar */}
                              <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
                                <div className="relative w-full">
                                  {/* Shadow */}
                                  <div 
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                                    style={{
                                      height: `${Math.min((metric.fund / yAxisMax) * 200 * 0.3, 40)}px`,
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
                                    className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                                    style={{
                                      height: `${(metric.fund / yAxisMax) * 200}px`,
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
                        
                              {/* Benchmark Bar */}
                              <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
                                <div className="relative w-full">
                                  {/* Shadow */}
                                  <div 
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                                    style={{
                                      height: `${Math.min((metric.benchmark / yAxisMax) * 200 * 0.3, 40)}px`,
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
                                    className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                                    style={{
                                      height: `${(metric.benchmark / yAxisMax) * 200}px`,
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
                        
                              {/* Category Bar - Only show for non-Outperformance charts */}
                              {activeTab !== 'Outperformance' && (
                                <div className="flex-1 max-w-[60px] md:max-w-[150px] flex flex-col items-center justify-end">
                                  <div className="relative w-full">
                                    {/* Shadow */}
                                    <div 
                                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] opacity-20 pointer-events-none"
                                      style={{
                                        height: `${Math.min((metric.category / yAxisMax) * 200 * 0.3, 40)}px`,
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
                                      className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[10px] transition-all duration-500 ease-out relative overflow-hidden"
                                      style={{
                                        height: `${(metric.category / yAxisMax) * 200}px`,
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
                      </div>
                    );
                  })}
                </div>
                
                        {/* Baseline */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 z-10"></div>
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
                              {getFullLabelName(metric.name)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-6 lg:gap-8">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#A78BFA] to-[#7C3AED]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#9346FD]">Fund</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#64748B] to-[#334155]"></div>
            <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">
              {activeTab === 'Outperformance' ? 'Category' : 'Benchmark'}
            </span>
          </div>
          {/* Show Category legend for non-Outperformance charts */}
          {activeTab !== 'Outperformance' && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8]"></div>
              <span className="text-sm md:text-base font-normal font-outfit text-[#4B5563]">Category</span>
            </div>
          )}
        </div>
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
                Ratios
              </h1>
              
              {/* Description */}
              <p className="text-[#4B5563] font-normal text-sm font-outfit mb-6">
                Ratios explain a fund's quality beyond just returns:
              </p>
              
              {/* Content Sections */}
              <div className="space-y-4 mb-6">
                  <div>
                    <h1 className="text-navy font-semibold text-base font-outfit mb-1">Risk & Volatility</h1>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Shows how stable or unpredictable the fund is (lower is better).</p>
                  </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Trade-Off Ratios Section */}
                
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Trade-Off Ratios</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Measures risk-adjusted returns (higher is better).</p>
                  </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Market Cycle Section */}
                
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Market Cycle</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Evaluates how the fund performs in up and down markets (higher is better).</p>
                  </div>
               
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Outperformance (Alpha) Section */}
                
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Outperformance (Alpha)</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Extra return the fund generates over its benchmark (higher is better).</p>
                  </div>
                </div>
              
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

export default RatiosComponent;

