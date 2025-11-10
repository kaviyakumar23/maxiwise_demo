import React, { useState } from 'react';
import type { AssetAllocation as AssetAllocationType, MarketCap, CreditQuality, FundDetails } from '../../types/fundTypes';
import Qustion from '../../assets/images/Question.svg';

type ChartView = 'asset' | 'marketCap' | 'creditQuality';

interface Segment {
  name: string;
  value: number;
  color: string;
  percentage: number;
  pathData: string;
  midAngle: number;
}

interface AssetAllocationProps {
  assetAllocation?: AssetAllocationType;
  marketCap?: MarketCap;
  creditQuality?: CreditQuality;
  fundDetails?: FundDetails;
}

const AssetAllocation: React.FC<AssetAllocationProps> = ({ 
  assetAllocation, 
  marketCap, 
  creditQuality,
  fundDetails 
}) => {
  const [chartView, setChartView] = useState<ChartView>('asset');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Chart constants
  const radius = 80;
  const innerRadius = 55;
  const centerX = 120;
  const centerY = 120;

  // Color palettes
  const assetColors = ['#170630', '#AC72FF', '#D1F349', '#FF6B9D', '#4ECDC4'];
  const marketCapColors = ['#170630', '#AC72FF', '#D1F349', '#FF6B9D'];
  const creditQualityColors = ['#170630', '#8657A7', '#2D1B4E', '#A46BC5', '#4A2F6C', '#684389', '#C27FE3', '#E093FF'];

  // Determine if drilldowns are available based on fund type
  const fundType = fundDetails?.fund_type?.toLowerCase();
  const canShowMarketCap = (fundType === 'equity' || fundType === 'allocation') && marketCap;
  // Allow credit quality drilldown for all fund types if data exists
  const canShowCreditQuality = creditQuality && creditQuality.creditQualityBreakdown;

  // Helper function to normalize data and filter out zeros and values < 0.5%
  const normalizeData = (data: Record<string, string | undefined>): Array<{ name: string; value: number }> => {
    const entries = Object.entries(data)
      .map(([key, value]) => ({
        name: key,
        value: parseFloat(value || '0')
      }))
      .filter(item => item.value > 0);

    const total = entries.reduce((sum, item) => sum + item.value, 0);
    
    if (total === 0) return [];

    // Normalize to percentages and filter out values less than 0.5%
    const normalized = entries.map(item => ({
      name: item.name,
      value: (item.value / total) * 100
    }));

    // Filter out segments that are less than 0.5% after normalization
    return normalized.filter(item => item.value >= 0.5);
  };

  // Prepare data based on current view
  const getChartData = (): Array<{ name: string; value: number; displayName: string }> => {
    if (chartView === 'marketCap' && marketCap) {
      const normalized = normalizeData({
        'Large': marketCap.Large,
        'Mid': marketCap.Mid,
        'Small': marketCap.Small,
        'Micro': marketCap.Micro
      });
      return normalized.map(item => ({
        ...item,
        displayName: `${item.name} Cap`
      }));
    } else if (chartView === 'creditQuality' && creditQuality?.creditQualityBreakdown) {
      const breakdown = creditQuality.creditQualityBreakdown;
      const normalized = normalizeData(breakdown);
      return normalized.map(item => ({
        ...item,
        displayName: item.name.toUpperCase()
      }));
    } else if (assetAllocation) {
      // Default asset allocation view
      const normalized = normalizeData({
        'Equity': assetAllocation.Equity,
        'Bond': assetAllocation.Bond,
        'Commodity': assetAllocation.Commodity,
        'Cash': assetAllocation.Cash,
        'Other': assetAllocation.Other
      });
      return normalized.map(item => ({
        ...item,
        displayName: item.name
      }));
    }
    return [];
  };

  // Create doughnut chart segments
  const createDoughnutSegments = (data: Array<{ name: string; value: number; displayName: string }>): Segment[] => {
    if (data.length === 0) return [];

    const colors = chartView === 'creditQuality' ? creditQualityColors : 
                   chartView === 'marketCap' ? marketCapColors : assetColors;

    let currentAngle = -90; // Start from top

    return data.map((item, index) => {
      const angle = (item.value / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      const midAngle = startAngle + angle / 2;

      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // Calculate outer arc points
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      // Calculate inner arc points
      const x3 = centerX + innerRadius * Math.cos(endRad);
      const y3 = centerY + innerRadius * Math.sin(endRad);
      const x4 = centerX + innerRadius * Math.cos(startRad);
      const y4 = centerY + innerRadius * Math.sin(startRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        'Z',
      ].join(' ');

      currentAngle = endAngle;

      return {
        name: item.displayName,
        value: item.value,
        color: colors[index % colors.length],
        percentage: Math.round(item.value),
        pathData,
        midAngle,
      };
    });
  };

  const chartData = getChartData();
  const segments = createDoughnutSegments(chartData);

  // Calculate label position for each segment
  const getLabelPosition = (midAngle: number) => {
    const labelRadius = (radius + innerRadius) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    return {
      x: centerX + labelRadius * Math.cos(midRad),
      y: centerY + labelRadius * Math.sin(midRad),
    };
  };

  // Get title based on current view
  const getChartTitle = () => {
    if (chartView === 'marketCap') return 'Market Cap';
    if (chartView === 'creditQuality') return 'Credit Quality';
    return 'Asset Allocation';
  };

  // Handle segment click - drill down to detailed views
  const handleSegmentClick = (segmentName: string) => {
    if (chartView !== 'asset') return;
    
    // Handle Equity segment click - drill down to Market Cap view
    if (segmentName === 'Equity' && canShowMarketCap) {
      setChartView('marketCap');
    }
    // Handle Bond/Cash segment click - drill down to Credit Quality view
    // Only allow for non-Equity fund types (Allocation, Debt, etc.)
    else if ((segmentName === 'Bond' || segmentName === 'Cash') && canShowCreditQuality && fundType !== 'equity') {
      setChartView('creditQuality');
    }
  };

  // Check if a segment is clickable
  const isSegmentClickable = (segmentName: string) => {
    if (chartView !== 'asset') return false;
    
    // Equity segment is clickable if market cap data is available
    if (segmentName === 'Equity' && canShowMarketCap) return true;
    
    // Bond/Cash segments are clickable if credit quality data is available
    // Only for non-Equity fund types (Allocation, Debt, etc.)
    if ((segmentName === 'Bond' || segmentName === 'Cash') && canShowCreditQuality && fundType !== 'equity') return true;
    
    return false;
  };

  return (
    <div className="py-4">
      <div className="p-4 md:p-2 lg:p-4 xl:p-0">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
            Asset Allocation
          </h1>
          <button className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors lg:hidden">
            <span><img src={Qustion} alt="Question" /></span>
          </button>
        </div>

        {/* Chart Card */}
        <div className="transition-all duration-300 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3">
          {/* Chart Title */}
          <div className="text-center mb-4">
            <h2 className="text-base md:text-lg font-semibold text-navy pt-6">
              {getChartTitle()}
            </h2>
            {chartView === 'asset' && (canShowMarketCap || (canShowCreditQuality && fundType !== 'equity')) && (
              <p className="text-xs md:text-sm text-gray-500 mt-2">
                {canShowMarketCap && canShowCreditQuality && fundType !== 'equity'
                  ? 'Click on Equity to view market cap composition or Bond/Cash to view debt composition'
                  : canShowMarketCap 
                  ? 'Click on Equity to view market cap composition'
                  : 'Click on Bond or Cash to view debt composition'}
              </p>
            )}
          </div>

          {/* Doughnut Chart */}
          <div className="flex flex-col items-center justify-center px-4">
            {segments.length > 0 ? (
              <svg
                width="340"
                height="340"
                viewBox="0 0 240 240"
                className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-auto mb-6 md:mb-8"
              >
                {segments.map((segment, index) => {
                  const labelPos = getLabelPosition(segment.midAngle);
                  const isClickable = isSegmentClickable(segment.name);
                  const isHovered = hoveredSegment === segment.name;
                  
                  return (
                    <g key={index}>
                      <path
                        d={segment.pathData}
                        fill={segment.color}
                        opacity={isClickable && isHovered ? 0.8 : 1}
                        className={isClickable ? 'cursor-pointer transition-opacity duration-200' : ''}
                        onClick={() => handleSegmentClick(segment.name)}
                        onMouseEnter={() => isClickable && setHoveredSegment(segment.name)}
                        onMouseLeave={() => setHoveredSegment(null)}
                        style={{ cursor: isClickable ? 'pointer' : 'default' }}
                      />
                      {/* Add percentage label on the segment */}
                      {segment.percentage >= 5 && (
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          fill={segment.color === '#D1F349' ? 'black' : 'white'}
                          fontSize="10"
                          fontWeight="600"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{ pointerEvents: 'none' }}
                        >
                          {segment.percentage}%
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Center Circle */}
                <circle cx="120" cy="120" r={innerRadius} fill="white" />
                <text
                  x="120"
                  y="115"
                  fontSize="16"
                  fontWeight="700"
                  textAnchor="middle"
                  fill="#1F2937"
                >
                  100%
                </text>
                <text
                  x="120"
                  y="135"
                  fontSize="11"
                  fontWeight="500"
                  textAnchor="middle"
                  fill="#4B5563"
                >
                  Total
                </text>
              </svg>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            )}

            {/* Legend */}
            <div className="w-full max-w-md space-y-2 md:space-y-3">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm md:text-base font-medium text-gray-700">
                      {segment.name}
                    </span>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-gray-900">
                    {segment.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button - Show when in detailed views */}
          {(chartView === 'marketCap' || chartView === 'creditQuality') && (
            <div className="flex justify-center mt-6 md:mt-8 px-4">
              <button
                onClick={() => setChartView('asset')}
                className="px-6 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Asset Allocation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;

