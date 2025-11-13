import React, { useState, useEffect } from 'react';
import { Chip } from '../../components/ui/Chip';
import { Toggle } from '../../components/ui/Toggle';
import Qustion from '../../assets/images/Question.svg';
import { BarChart } from '../../components/ui/BarChart';
import type { BarData } from '../../components/ui/BarChart';
import type { ConsistencyFactors, ConsistencyFactorData, TrendAnalysis } from '../../types/fundTypes';

type MetricType = 'Cycles' | 'Alpha' | 'Return' | 'Risk' | 'Volatility' | 'Yield' | 'Quality';
type ViewType = 'consistency' | 'trend';

/**
 * Backend data structure for Consistency Factors
 * 
 * Format varies by fund type:
 * 
 * 1. Equity/Allocation/Commodity:
 *    Fields: cycles, alpha, return, risk, volatility
 *    Format: "Category-Percentage%" (e.g., "High-100%", "Above Avg-91.7%")
 * 
 * 2. Debt/Arbitrage/Fixed Income:
 *    Fields: return, risk, yield, quality
 *    Format: "Category-Percentage%" (e.g., "High-100%", "Below Avg-62.5%")
 *            OR just category (e.g., "High", "Low", "Average", "-")
 * 
 * Note: 
 * - First item in data array is Fund data
 * - Second item in data array is CA (Category Average/Benchmark) data
 * - Fields with "-" or empty should be ignored
 * - Component dynamically adjusts displayed metrics based on fundType
 */

export interface CarrvaProps {
  fundType?: string;
  consistencyFactors?: ConsistencyFactors; // Optional prop for backend data
  trendAnalysis?: TrendAnalysis; // Optional prop for trend analysis data
}

/**
 * CARRVA Component - Displays Cycles, Alpha, Return, Risk, and Volatility Analysis
 * 
 * Usage with backend data:
 * ```tsx
 * <Carrva 
 *   fundType={fundType} 
 *   consistencyFactors={backendConsistencyFactorsData}
 *   trendAnalysis={backendTrendAnalysisData}
 * />
 * ```
 */
const Carrva: React.FC<CarrvaProps> = ({ fundType, consistencyFactors, trendAnalysis }) => {
  const isEquityType = ['Equity', 'Allocation', 'Commodity'].includes(fundType!);
  const isDebtType = ['Debt', 'Arbitrage', 'Fixed Income', 'Alternative'].includes(fundType!);

  // Dynamic metrics based on fund type - memoized to prevent unnecessary recalculations
  const metrics: MetricType[] = React.useMemo(() => {
    if (isEquityType) {
      return ['Cycles', 'Alpha', 'Return', 'Risk', 'Volatility'];
    } else if (isDebtType) {
      return ['Return', 'Risk', 'Yield', 'Quality'];
    } else {
      return ['Cycles', 'Alpha', 'Return', 'Risk', 'Volatility']; // Default fallback
    }
  }, [isEquityType, isDebtType]);

  const [activeMetric, setActiveMetric] = useState<MetricType>('Return');
  const [activeView, setActiveView] = useState<ViewType>('consistency');
  console.log(activeView)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Update active metric when metrics array changes (i.e., when fund type changes)
  useEffect(() => {
    // If current metric is not in the available metrics, switch to the first one
    if (!metrics.includes(activeMetric)) {
      setActiveMetric(metrics[0]);
    }
  }, [metrics, activeMetric]);

  // Helper function to parse backend data format
  // Equity/Allocation/Commodity: "Category-Percentage%" (e.g., "High-100%", "Above Avg-91.7%")
  // Debt/Arbitrage: "Category-Percentage%" or just "Category" (e.g., "High", "Low", "Average")
  const parseConsistencyValue = (value: string | number): { category: string; percentage: number } => {
    if (typeof value === 'number') {
      return { category: '', percentage: value };
    }
    
    if (!value || value === '-') {
      return { category: '', percentage: 0 };
    }
    
    // Handle format like "High-100%" or "Above Avg-91.7%"
    const match = value.match(/^(.+?)-(\d+(?:\.\d+)?)%$/);
    if (match) {
      return {
        category: match[1].trim(),
        percentage: parseFloat(match[2])
      };
    }
    
    // Handle just category format (for debt funds)
    // Map categories to approximate percentage values for visualization
    const categoryMap: Record<string, number> = {
      'High': 90,
      'Above Avg': 70,
      'Average': 50,
      'Below Avg': 30,
      'Low': 10,
    };
    
    const normalizedValue = value.trim();
    if (categoryMap[normalizedValue]) {
      return {
        category: normalizedValue,
        percentage: categoryMap[normalizedValue]
      };
    }
    
    // Fallback for unexpected formats
    return { category: value, percentage: 0 };
  };

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

  // Get consistency data from backend
  const getConsistencyData = () => {
    console.log(consistencyFactors);
    if (consistencyFactors && consistencyFactors.success && consistencyFactors.data.data.length >= 2) {
      const metricKey = activeMetric.toLowerCase() as keyof ConsistencyFactorData;
      const fundData = consistencyFactors.data.data[0]; // First item is Fund
      const caData = consistencyFactors.data.data[1]; // Second item is CA (Benchmark)
      
      return {
        fund: fundData[metricKey] || '',
        category_average: caData[metricKey] || '',
      };
    }
    
    // Return empty data if backend data not available
    return {
      fund: '',
      category_average: '',
    };
  };

  // Scatter plot chart for Yield/Quality metrics (Debt/Arbitrage/Fixed Income/Alternative funds)
  const YieldQualityChart: React.FC = () => {
    console.log('YieldQualityChart');
    const { fund, category_average } = getConsistencyData();

    // Map category strings to numeric values (1-5)
    const mapCategoryToValue = (value: string): number => {
      if (!value || value === '-') return 3; // Default to Average (3)
      
      // Remove percentage if present (e.g., "High-100%" -> "High")
      const categoryMatch = value.match(/^(.+?)-\d+(?:\.\d+)?%$/);
      const category = categoryMatch ? categoryMatch[1].trim() : value.trim();
      
      const categoryMap: Record<string, number> = {
        'High': 5,
        'Above Avg': 4,
        'Average': 3,
        'Below Avg': 2,
        'Low': 1,
      };
      
      return categoryMap[category] || 3; // Default to Average (3) if not found
    };

    // Get numeric values
    const fundValue = mapCategoryToValue(fund);
    const caValue = category_average ? mapCategoryToValue(category_average) : 3; // Default CA to Average if not set

    // Get category labels for display
    const getCategoryLabel = (value: number): string => {
      const labelMap: Record<number, string> = {
        5: 'High',
        4: 'Above Avg',
        3: 'Average',
        2: 'Below Avg',
        1: 'Low',
      };
      return labelMap[value] || 'Average';
    };

    const yLabels = ['Low', 'Below Avg', 'Average', 'Above Avg', 'High'];
    const chartHeight = 300;
    const dotSize = 12; // Size of scatter plot dots

    // Calculate Y position based on value (1-5)
    const getYPosition = (value: number): number => {
      // Map 1-5 to percentage from bottom (0% to 100%)
      // 1 -> 0%, 2 -> 25%, 3 -> 50%, 4 -> 75%, 5 -> 100%
      return ((value - 1) / 4) * 100;
    };

    const dataPoints = [
      {
        label: 'Fund',
        value: fundValue,
        category: getCategoryLabel(fundValue),
        xPosition: 35, // 35% from left
        color: '#9346FD',
        bgColor: '#AC72FF',
      },
      {
        label: 'Category Average',
        value: caValue,
        category: getCategoryLabel(caValue),
        xPosition: 65, // 65% from left
        color: '#4B5563',
        bgColor: '#94A3B8',
      },
    ];

    return (
      <div className="w-full px-4 py-6 md:px-8 md:py-10 lg:px-16 lg:py-16">
        {/* Chart container */}
        <div className="relative bg-white rounded-2xl p-6 md:p-8">
          {/* Y-axis labels and grid */}
          <div className="relative" style={{ height: `${chartHeight}px` }}>
            {/* Grid lines and Y-axis labels */}
            {yLabels.map((label, index) => {
              const yPosition = ((yLabels.length - 1 - index) / (yLabels.length - 1)) * 100;
              return (
                <div
                  key={label}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ bottom: `${yPosition}%`, transform: 'translateY(50%)' }}
                >
                  {/* Y-axis label */}
                  <div className="text-xs md:text-sm lg:text-base font-medium text-gray-600 w-20 md:w-24 lg:w-28 text-right pr-3 md:pr-4">
                    {label}
                  </div>
                  
                  {/* Horizontal grid line */}
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
              );
            })}

            {/* Scatter plot points */}
            <div className="absolute left-20 md:left-24 lg:left-28 right-0 top-0 bottom-0">
              {dataPoints.map((point, index) => {
                const yPos = getYPosition(point.value);
                return (
                  <div key={index}> 
                    {/* Scatter point */}
                    <div
                      className="absolute rounded-full shadow-lg transition-all duration-300 hover:scale-125"
                      style={{
                        left: `${point.xPosition}%`,
                        bottom: `${yPos}%`,
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        backgroundColor: point.color,
                        transform: 'translate(-50%, 50%)',
                        boxShadow: `0 4px 12px ${point.color}40`,
                      }}
                    >
                      {/* Inner glow effect */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${point.bgColor}80, ${point.color})`,
                        }}
                      />
                    </div>

                    {/* Category label above point */}
                    <div
                      className="absolute text-xs md:text-sm lg:text-base font-semibold whitespace-nowrap"
                      style={{
                        left: `${point.xPosition}%`,
                        bottom: `${yPos}%`,
                        transform: 'translate(-50%, -200%)',
                        color: point.color,
                      }}
                    >
                      {point.category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels below the chart */}
          <div className="relative mt-10 pt-10 md:mt-10">
            <div className="flex justify-center">
              {dataPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: '40%' }}
                >
                  {/* Color indicator */}
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full mb-2"
                    style={{ backgroundColor: point.color }}
                  />
                  {/* Label */}
                  <div className="text-xs md:text-sm lg:text-base font-medium text-gray-700 text-center">
                    {point.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConsistencyChart: React.FC = () => {
    console.log('ConsistencyChart');
    const { fund, category_average } = getConsistencyData();

    // Parse benchmark and fund values
    const fundParsed = parseConsistencyValue(fund);
    const category_averageParsed = parseConsistencyValue(category_average);
    

    const chartData: BarData[] = [
      {
        label: 'Fund',
        value: fundParsed.percentage,
        category: fundParsed.category,
        color: 'linear-gradient(149.86deg, #AC72FF 0.9%, #723FBC 99.1%)',
        valueColor: '#9346FD',
      },
      {
        label: 'Category Average',
        value: category_averageParsed.percentage,
        category: category_averageParsed.category,
        color: 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)',
        valueColor: '#4B5563',
      },
    ];

    return (
      <div className="w-full">
        <BarChart data={chartData} height={240} />
      </div>
    );
  };

  const TrendChart: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    const levels = [
      { color: '#6EE7B7', label: 'High', textColor: '#047857' },
      { color: '#D1FAE5', label: 'Above Avg', textColor: '#10B981' },
      { color: '#FDE68A', label: 'Avg', textColor: '#D97706' },
      { color: '#FFE4E6', label: 'Below Avg', textColor: '#FB7185' },
      { color: '#FDA4AF', label: 'Low', textColor: '#E11D48' },
    ];

    // Helper to convert period labels (12m -> 1y, 24m -> 2y, etc.)
    const convertPeriodLabel = (period: string): string => {
      const match = period.match(/^(\d+)m$/);
      if (match) {
        const months = parseInt(match[1]);
        const years = months / 12;
        return `${years}y`;
      }
      return period;
    };

    // Get trend data from backend
    const getTrendData = (): Array<{ period: string; value: number }> => {
      if (!trendAnalysis || !trendAnalysis.success || !trendAnalysis.data) {
        return [];
      }

      const { rows, columns, allValues } = trendAnalysis.data;
      
      const metricIndex = columns.findIndex(
        col => col.toLowerCase() === activeMetric.toLowerCase()
      );

      if (metricIndex === -1 || !allValues || allValues.length === 0) {
        return [];
      }

      const result = rows.map((period, rowIndex) => ({
        period: convertPeriodLabel(period),
        value: allValues[rowIndex]?.[metricIndex] ?? 0,
      }));
      
      return result;
    };

    const trendData = getTrendData();
    const reversedTrendData = [...trendData].reverse();

    // Draw canvas chart
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (!canvas || !container || reversedTrendData.length === 0) {
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match container
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const padding = { left: 0, right: 0, top: 0, bottom: 0 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      // Calculate positions: left edge = 1 unit, right edge = 0.25 unit
      const getXPosition = (index: number): number => {
        if (reversedTrendData.length === 1) return chartWidth / 2;
        // For N points: left (1 unit) + N points + right (0.25 unit) = 1.25 + N total units
        const numPoints = reversedTrendData.length;
        const totalUnits = 1.25 + numPoints;
        return ((1 + index) / totalUnits) * chartWidth;
      };

      const getYPosition = (value: number): number => {
        // value: 0-1=Low, 1-2=Below Avg, 2-3=Avg, 3-4=Above Avg, 4-5=High
        // Map values to CENTER of each band
        // Each band is 20% of height, centers are at 10%, 30%, 50%, 70%, 90%
        // Formula: (5 - value) * 20 + 10 = percent from top
        const percentFromTop = ((5 - value) * 20 + 10);
        return (percentFromTop / 100) * chartHeight;
      };

      // Draw line
      ctx.beginPath();
      reversedTrendData.forEach((point, index) => {
        const x = getXPosition(index);
        const y = getYPosition(point.value);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw data points
      reversedTrendData.forEach((point, index) => {
        const x = getXPosition(index);
        const y = getYPosition(point.value);
        
        // Draw outer circle (white stroke)
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#1F2937';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
      });
    }, [reversedTrendData]);

    // Handle window resize
    React.useEffect(() => {
      const handleResize = () => {
        // Trigger redraw
        const canvas = canvasRef.current;
        if (canvas) {
          const event = new Event('resize');
          window.dispatchEvent(event);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Show message if no data available
    if (reversedTrendData.length === 0) {
      return (
        <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative bg-white rounded-2xl md:rounded-3xl flex items-center justify-center">
          <p className="text-gray-500 text-sm md:text-base">No trend data available for {activeMetric}</p>
        </div>
      );
    }

    return (
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative bg-white rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Chart area with colored bands and grid */}
        <div className="absolute left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 top-8 md:top-10 bottom-16 md:bottom-20">
          {/* Colored bands with grid lines */}
          <div className="relative w-full h-full">
            {/* Colored bands */}
            {levels.map((level, index) => (
              <div
                key={index}
                className="h-[20%] relative"
                style={{ backgroundColor: level.color }}
              >
                {/* Horizontal grid line at top of band */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white opacity-80" />
              </div>
            ))}
            
            {/* Vertical grid lines - left edge = 1 unit, right edge = 0.25 unit */}
            {reversedTrendData.map((_, i) => {
              // For N points: left edge (1 unit) + N points + right edge (0.25 unit) = 1.25 + N total units
              // Each point at position: (1 + i) / (1.25 + N) * 100%
              const numPoints = reversedTrendData.length;
              const totalUnits = 1.25 + numPoints;
              const xPosition = numPoints === 1 
                ? 50 
                : ((1 + i) / totalUnits) * 100;
              return (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-[2px] bg-white opacity-80"
                  style={{ left: `${xPosition}%` }}
                />
              );
            })}

            {/* Y-axis labels inside the left column */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around z-10" style={{ width: `${(1 / (1.25 + reversedTrendData.length)) * 100}%` }}>
              {levels.map((level, index) => (
                <div 
                  key={index} 
                  className="text-center text-xs md:text-sm lg:text-base font-medium px-1"
                  style={{ color: level.textColor }}
                >
                  {level.label}
                </div>
              ))}
            </div>

            {/* Canvas overlay for line and data points */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />
            <div ref={containerRef} className="absolute inset-0" />
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 bottom-6 md:bottom-8 lg:bottom-10 text-xs md:text-sm lg:text-base font-medium text-[#4B5563]">
          {reversedTrendData.map((point, index) => {
            // Match positioning: left edge = 1 unit, right edge = 0.25 unit
            const numPoints = reversedTrendData.length;
            const totalUnits = 1.25 + numPoints;
            const xPosition = numPoints === 1 
              ? 50 
              : ((1 + index) / totalUnits) * 100;
            return (
              <span
                key={point.period}
                className="absolute -translate-x-1/2"
                style={{ left: `${xPosition}%` }}
              >
                {point.period}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="py-4">
      <div className="p-4 md:p-2 lg:p-4 xl:p-0">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
            CARRVA
          </h1>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors lg:hidden"
          >
            <span><img src={Qustion} alt="Question" /></span>
          </button>
        </div>

        {/* Conditional rendering based on fund type */}
        {isDebtType ? (
          // Enhanced view for Debt/Arbitrage/Fixed Income/Alternative funds with toggle
          <>
            {/* Metrics Chips */}
            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
              {metrics.map((metric) => (
                <Chip
                  key={metric}
                  label={metric}
                  isActive={activeMetric === metric}
                  onClick={() => setActiveMetric(metric)}
                />
              ))}
            </div>

            {/* View Toggle */}
            <div className="transition-all duration-300 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3">
              <div className="flex justify-center mb-8 md:mb-10">
                <Toggle
                  options={[
                    { value: 'consistency', label: 'Consistency' },
                    { value: 'trend', label: 'Trend' },
                  ]}
                  activeValue={activeView}
                  onChange={(value) => setActiveView(value as ViewType)}
                  variant="light"
                />
              </div>

              {/* Chart Display */}
              <div className="rounded-2xl md:rounded-3xl">
                {activeView === 'consistency' ? (
                  // Use YieldQualityChart for Yield and Quality, ConsistencyChart for Return and Risk
                  activeMetric === 'Yield' || activeMetric === 'Quality' ? (
                    <YieldQualityChart />
                  ) : (
                    <ConsistencyChart />
                  )
                ) : (
                  <TrendChart />
                )}
              </div>
            </div>
          </>
        ) : (
          // Bar chart view for Equity/Allocation/Commodity funds
          <>
            {/* Metrics Chips */}
            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
              {metrics.map((metric) => (
                <Chip
                  key={metric}
                  label={metric}
                  isActive={activeMetric === metric}
                  onClick={() => setActiveMetric(metric)}
                />
              ))}
            </div>

            {/* View Toggle */}
            <div className="transition-all duration-300 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3">
              <div className="flex justify-center mb-8 md:mb-10">
                <Toggle
                  options={[
                    { value: 'consistency', label: 'Consistency' },
                    { value: 'trend', label: 'Trend' },
                  ]}
                  activeValue={activeView}
                  onChange={(value) => setActiveView(value as ViewType)}
                  variant="light"
                />
              </div>

              {/* Chart Display */}
              <div className="rounded-2xl md:rounded-3xl">
                {activeView === 'consistency' ? <ConsistencyChart /> : <TrendChart />}
              </div>
            </div>
          </>
        )}

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
                  CARRVA Insights
                </h1>

                {/* Description */}
                <p className="text-[#4B5563] font-normal text-sm font-outfit mb-6">
                  CARRVA (Cycles, Alpha, Return, Risk, Volatility) helps you evaluate a fund's performance from multiple perspectives. These charts highlight both how consistently a fund delivers returns and the trend of its performance across different time periods, giving you a clearer view of stability and reliability.
                </p>

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
    </div>
  );
};


export default Carrva;

