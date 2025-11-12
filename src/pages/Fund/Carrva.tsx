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

  // Table view for Debt/Arbitrage/Fixed Income/Alternative funds
  const ConsistencyTable: React.FC = () => {
    console.log('ConsistencyTable');
    
    // Get all metrics data for table display
    const getAllMetricsData = () => {
      if (consistencyFactors && consistencyFactors.success && consistencyFactors.data.data.length >= 2) {
        const fundData = consistencyFactors.data.data[0]; // First item is Fund
        const caData = consistencyFactors.data.data[1]; // Second item is CA
        
        return {
          fund: {
            return: fundData.return || '-',
            risk: fundData.risk || '-',
            yield: fundData.yield || '-',
            quality: fundData.quality || '-',
          },
          ca: {
            return: caData.return || '-',
            risk: caData.risk || '-',
            yield: caData.yield || '-',
            quality: caData.quality || '-',
          }
        };
      }
      
      return {
        fund: { return: '-', risk: '-', yield: '-', quality: '-' },
        ca: { return: '-', risk: '-', yield: '-', quality: '-' }
      };
    };

    const metricsData = getAllMetricsData();

    // Helper to format the value display
    const formatValue = (value: string) => {
      if (!value || value === '-') return '-';
      return value;
    };

    return (
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-lg">
            <thead>
              {/* Group Header Row */}
              <tr>
                <th rowSpan={2} className="border-b-2 border-purple-200 bg-white p-4 text-left text-xs md:text-sm lg:text-base font-semibold text-navy align-middle">
                  
                </th>
                <th colSpan={2} className="border-b border-l border-purple-200 bg-white p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-purple-900">
                  (wrt.BM)
                </th>
                <th colSpan={2} className="border-b border-l border-purple-200 bg-white p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-purple-900">
                  (within Category)
                </th>
              </tr>
              {/* Sub Header Row */}
              <tr>
                <th className="border-b-2 border-l border-purple-200 bg-purple-50/50 p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-gray-800">
                  Return
                </th>
                <th className="border-b-2 border-l border-purple-200 bg-purple-50/50 p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-gray-800">
                  Risk
                </th>
                <th className="border-b-2 border-l border-purple-200 bg-purple-50/50 p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-gray-800">
                  Yield
                </th>
                <th className="border-b-2 border-l border-purple-200 bg-purple-50/50 p-4 text-center text-xs md:text-sm lg:text-base font-semibold text-gray-800">
                  Quality
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-50/30 transition-colors">
                <td className="border-b border-purple-100 bg-purple-50/50 p-4 text-xs md:text-sm lg:text-base font-semibold text-navy">
                  Fund
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.fund.return)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.fund.risk)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.fund.yield)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.fund.quality)}
                </td>
              </tr>
              <tr className="hover:bg-purple-50/30 transition-colors">
                <td className="border-b border-purple-100 bg-purple-50/50 p-4 text-xs md:text-sm lg:text-base font-semibold text-navy">
                  CA
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.ca.return)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.ca.risk)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.ca.yield)}
                </td>
                <td className="border-b border-l border-purple-100 p-4 text-center text-xs md:text-sm lg:text-base text-gray-700">
                  {formatValue(metricsData.ca.quality)}
                </td>
              </tr>
            </tbody>
          </table>
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
    const levels = [
      { color: 'bg-[#6EE7B7]', range: [4, 5] },
      { color: 'bg-[#D1FAE5]', range: [3, 4] },
      { color: 'bg-[#FDE68A]', range: [2, 3] },
      { color: 'bg-[#FFE4E6]', range: [1, 2] },
      { color: 'bg-[#FDA4AF]', range: [0, 1] },
    ];

    // Helper to convert period labels (12m -> 1Y, 24m -> 2Y, etc.)
    const convertPeriodLabel = (period: string): string => {
      const match = period.match(/^(\d+)m$/);
      if (match) {
        const months = parseInt(match[1]);
        const years = months / 12;
        return `${years}Y`;
      }
      return period; // Fallback to original if format doesn't match
    };

    // Get trend data from backend
    const getTrendData = (): Array<{ period: string; value: number }> => {
      console.log('TrendChart - Getting trend data for metric:', activeMetric);
      console.log('TrendChart - trendAnalysis prop:', trendAnalysis);
      
      if (!trendAnalysis || !trendAnalysis.success || !trendAnalysis.data) {
        console.log('TrendChart - No trendAnalysis data available');
        return [];
      }

      const { rows, columns, allValues } = trendAnalysis.data;
      console.log('TrendChart - Available columns:', columns);
      console.log('TrendChart - Rows:', rows);
      console.log('TrendChart - All values:', allValues);
      
      // Find the column index for the active metric
      const metricIndex = columns.findIndex(
        col => col.toLowerCase() === activeMetric.toLowerCase()
      );
      
      console.log('TrendChart - Metric index for', activeMetric, ':', metricIndex);

      if (metricIndex === -1) {
        console.log('TrendChart - Metric not found in columns');
        return [];
      }
      
      if (!allValues || allValues.length === 0) {
        console.log('TrendChart - No allValues data');
        return [];
      }

      // Build trend data array
      const result = rows.map((period, rowIndex) => ({
        period: convertPeriodLabel(period),
        value: allValues[rowIndex]?.[metricIndex] ?? 0,
      }));
      
      console.log('TrendChart - Built trend data:', result);
      return result;
    };

    const trendData = getTrendData();
    // Reverse the data for display (5Y, 4Y, 3Y, 2Y, 1Y order)
    const reversedTrendData = [...trendData].reverse();

    // Calculate positions for the line chart (Y-axis: 0-5 scale)
    const getYPosition = (value: number) => {
      // value: 0-1=Low, 1-2=Below Avg, 2-3=Average, 3-4=Above Avg, 4-5=High
      // Convert value (0-5) to percentage position (0-100)
      // Invert because SVG y-axis goes top to bottom
      return 100 - (value * 20);
    };

    // Show message if no data available
    if (reversedTrendData.length === 0) {
      return (
        <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative bg-white rounded-2xl md:rounded-3xl flex items-center justify-center">
          <p className="text-gray-500 text-sm md:text-base">No trend data available for {activeMetric}</p>
        </div>
      );
    }

    return (
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative bg-white rounded-2xl md:rounded-3xl">
        {/* Chart area with colored bands */}
        <div className="absolute left-12 md:left-16 lg:left-20 right-4 md:right-6 lg:right-8 top-8 md:top-10 bottom-16 md:bottom-20">
          {/* Colored bands */}
          <div className="relative w-full h-full overflow-hidden">
            {levels.map((level, index) => (
              <div
                key={index}
                className={`h-[20%] ${level.color} border-b border-white/20`}
              />
            ))}

            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Vertical lines */}
              {reversedTrendData.map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${2 + (i / (reversedTrendData.length - 1)) * 96}%`}
                  y1="0"
                  x2={`${2 + (i / (reversedTrendData.length - 1)) * 96}%`}
                  y2="100%"
                  stroke="white"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                />
              ))}
              {/* Horizontal lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${i * 20}%`}
                  x2="100%"
                  y2={`${i * 20}%`}
                  stroke="white"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Line chart - stretches with container */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Line path */}
              <polyline
                points={reversedTrendData
                  .map((point, index) => {
                    const x = 2 + (index / (reversedTrendData.length - 1)) * 96;
                    const y = getYPosition(point.value);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#1F2937"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Data points - preserves aspect ratio for perfect circles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
              {reversedTrendData.map((point, index) => {
                const xPercent = 2 + (index / (reversedTrendData.length - 1)) * 96;
                const yPercent = getYPosition(point.value);
                return (
                  <circle
                    key={index}
                    cx={`${xPercent}%`}
                    cy={`${yPercent}%`}
                    r="6"
                    fill="#1F2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-2 md:left-4 lg:left-6 top-8 md:top-10 bottom-16 md:bottom-20 flex flex-col justify-between text-xs md:text-sm lg:text-base font-medium text-[#4B5563]">
          {[5, 4, 3, 2, 1, 0].map((value) => (
            <span key={value} className="flex items-center h-0">
              {value}
            </span>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 md:left-16 lg:left-20 right-4 md:right-6 lg:right-8 bottom-6 md:bottom-8 lg:bottom-10 text-xs md:text-sm lg:text-base font-medium text-[#4B5563]">
          {reversedTrendData.map((point, index) => {
            const xPosition = (index / (reversedTrendData.length - 1)) * 100;
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

              {/* Chart/Table Display */}
              <div className="rounded-2xl md:rounded-3xl">
                {activeView === 'consistency' ? <ConsistencyTable /> : <TrendChart />}
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

