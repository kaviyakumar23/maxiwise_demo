import React, { useState, useEffect } from 'react';
import { Chip } from '../../components/ui/Chip';
import { Toggle } from '../../components/ui/Toggle';
import Qustion from '../../assets/images/Question.svg';
import { BarChart } from '../../components/ui/BarChart';
import type { BarData } from '../../components/ui/BarChart';
import type { ConsistencyFactors, ConsistencyFactorData } from '../../types/fundTypes';

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
}

/**
 * CARRVA Component - Displays Cycles, Alpha, Return, Risk, and Volatility Analysis
 * 
 * Usage with backend data:
 * ```tsx
 * <Carrva fundType={fundType} consistencyFactors={backendConsistencyFactorsData} />
 * ```
 */
const Carrva: React.FC<CarrvaProps> = ({ fundType, consistencyFactors }) => {
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
        benchmark: caData[metricKey] || '',
      };
    }
    
    // Return empty data if backend data not available
    return {
      fund: '',
      benchmark: '',
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
    const { benchmark, fund } = getConsistencyData();

    // Parse benchmark and fund values
    const benchmarkParsed = parseConsistencyValue(benchmark);
    const fundParsed = parseConsistencyValue(fund);

    const chartData: BarData[] = [
      {
        label: 'Benchmark',
        value: benchmarkParsed.percentage,
        category: benchmarkParsed.category,
        color: 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)',
        valueColor: '#4B5563',
      },
      {
        label: 'Fund',
        value: fundParsed.percentage,
        category: fundParsed.category,
        color: 'linear-gradient(149.86deg, #AC72FF 0.9%, #723FBC 99.1%)',
        valueColor: '#9346FD',
      },
    ];

    return (
      <div className="w-full">
        <BarChart data={chartData} height={240} />
      </div>
    );
  };

  const TrendChart: React.FC = () => {
    // Trend view is not yet supported by backend
    // Show a message to users
    return (
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center bg-white rounded-2xl md:rounded-3xl">
        <p className="text-gray-500 text-center px-6">
          Trend analysis data is currently unavailable. Please check back later.
        </p>
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
          // Table view for Debt/Arbitrage/Fixed Income/Alternative funds
          <div className="transition-all duration-300 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3">
            <ConsistencyTable />
          </div>
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

