import React from 'react';
import ShadowBar from '../../assets/images/ShadowBar.png';
import SpiralImage from '../../assets/images/GraphSpiral.png';

export interface BarSegment {
  value: number;
  color: string;
}

export interface BarData {
  label: string;
  value: number;
  color?: string; // Optional - only needed for single bars (not stacked)
  displayValue?: string;
  valueColor?: string;
  segments?: BarSegment[]; // For stacked bars
  category?: string; // Optional - category label (e.g., "High", "Above Avg")
}

interface BarChartProps {
  data: BarData[];
  maxValue?: number;
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  height = 100,
  showLabels = true,
  showValues = true,
}) => {
  console.log(data);
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full px-4 py-6 md:px-8 md:py-10 lg:px-16 lg:py-16">
      {/* Chart container with bars */}
      <div className="relative ">
        <div className="flex items-end justify-center gap-4 md:gap-8 lg:gap-16 px-4 md:px-6 lg:px-8 relative" style={{ height: `${height}px` }}>
          {data.map((item, index) => {
            // Calculate actual pixel height based on value proportion
            const barHeightPx = (item.value / max) * height;
            
            return (
              <div key={index} className="flex flex-col items-center justify-end flex-1 max-w-[150px] relative">
                {/* Category and Value above bar */}
                {showValues && item.value > 0 && (
                  <div className="mb-2 md:mb-3 lg:mb-4 flex flex-col items-center relative z-10">
                    {/* Category label */}
                    {item.category && (
                      <div 
                        className="text-xs md:text-sm lg:text-base font-semibold font-outfit mb-1"
                        style={{ color: item.valueColor || '#4B5563' }}
                      >
                        {item.category}
                      </div>
                    )}
                    {/* Percentage value */}
                    <div 
                      className="text-sm md:text-base lg:text-lg font-semibold font-outfit"
                      style={{ color: item.valueColor || '#4B5563' }}
                    >
                      {item.displayValue || `${item.value}%`}
                    </div>
                  </div>
                )}
                
                {/* Bar with shadow */}
                <div className="relative w-full">
                  {/* Shadow underneath bar */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
                    style={{
                      height: `${Math.min(barHeightPx * 0.3, 40)}px`,
                      zIndex: 100,
                    }}
                  >
                    <img 
                      src={ShadowBar} 
                      alt="" 
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'blur(8px)',
                      }}
                    />
                  </div>
                  
                  {/* Bar - either stacked or single */}
                  {item.segments ? (
                    // Stacked bar
                    <div
                      className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[15px] transition-all duration-500 ease-out relative overflow-hidden"
                      style={{
                        height: `${barHeightPx}px`,
                        zIndex: 1,
                      }}
                    >
                      {/* Gradient backgrounds for each segment */}
                      {item.segments.map((segment, segmentIndex) => {
                        const totalSegmentValue = item.segments!.reduce((sum, s) => sum + s.value, 0);
                        const segmentHeightPx = (segment.value / totalSegmentValue) * barHeightPx;
                        
                        // Calculate position from bottom
                        let bottomPx = 0;
                        for (let i = 0; i < segmentIndex; i++) {
                          bottomPx += (item.segments![i].value / totalSegmentValue) * barHeightPx;
                        }
                        
                        return (
                          <div
                            key={segmentIndex}
                            className="w-full absolute left-0"
                            style={{
                              height: `${segmentHeightPx}px`,
                              bottom: `${bottomPx}px`,
                              background: segment.color,
                            }}
                          />
                        );
                      })}
                      
                      {/* Spiral wave pattern overlay - applied to entire bar */}
                      <div
                        className="absolute inset-0 opacity-50 pointer-events-none"
                        style={{
                          backgroundImage: `url(${SpiralImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          mixBlendMode: 'hard-light',
                          transform: 'scaleX(1)',
                          zIndex: 10,
                        }}
                      />
                    </div>
                  ) : (
                    // Single bar
                    <div
                      className="w-full rounded-t-[5px] md:rounded-t-[10px] lg:rounded-t-[15px] transition-all duration-500 ease-out relative overflow-hidden"
                      style={{
                        height: `${barHeightPx}px`,
                        zIndex: 1,
                      }}
                    >
                      {/* Gradient background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: item.color,
                        }}
                      />
                      
                      {/* Spiral wave pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-50"
                        style={{
                          backgroundImage: `url(${SpiralImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          mixBlendMode: 'hard-light',
                          transform: 'scaleX(1)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Baseline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 z-10"></div>
      </div>
      
      {/* Labels below baseline */}
      {showLabels && (
        <div className="flex justify-center gap-4 md:gap-10 lg:gap-16 px-4 md:px-6 lg:px-8 mt-3 md:mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 max-w-[150px] text-center">
              <div className="text-xs md:text-sm lg:text-base font-normal font-outfit text-[#4B5563]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

