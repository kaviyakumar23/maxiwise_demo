import React, { useState } from 'react';
import { Toggle } from '../../components/ui/Toggle';
import { fundData } from './DummyData';
import Qustion from '../../assets/images/Question.svg';

type AssetType = 'equity' | 'debt' | 'others';
type CreditAssetType = 'debt' | 'others';

interface CapData {
  smallCap: number;
  midCap: number;
  largeCap: number;
}

interface Segment {
  name: string;
  value: number;
  color: string;
  percentage: number;
  pathData: string;
  midAngle: number;
}

const AssetAllocation: React.FC = () => {
  const { assetAllocation, creditQuality } = fundData;
  const [activeAsset, setActiveAsset] = useState<AssetType>('equity');
  const [activeCreditAsset, setActiveCreditAsset] = useState<CreditAssetType>('debt');

  // Chart constants
  const radius = 80;
  const innerRadius = 55;
  const centerX = 120;
  const centerY = 120;

  // Get current data based on selected asset
  const currentData = assetAllocation[activeAsset];

  // Create doughnut chart segments
  const createDoughnutSegments = (data: CapData): Segment[] => {
    const total = data.smallCap + data.midCap + data.largeCap;
    const segments = [
      { name: 'Large Cap', value: data.largeCap, color: '#170630', percentage: Math.round((data.largeCap / total) * 100) },
      { name: 'Small Cap', value: data.smallCap, color: '#AC72FF', percentage: Math.round((data.smallCap / total) * 100) },
      { name: 'Mid Cap', value: data.midCap, color: '#D1F349', percentage: Math.round((data.midCap / total) * 100) },
    ];

    let currentAngle = -90; // Start from top

    return segments.map((segment) => {
      const angle = (segment.value / total) * 360;
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
        ...segment,
        pathData,
        midAngle,
      };
    });
  };

  const segments = createDoughnutSegments(currentData);

  // Calculate label position for each segment
  const getLabelPosition = (midAngle: number) => {
    const labelRadius = (radius + innerRadius) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    return {
      x: centerX + labelRadius * Math.cos(midRad),
      y: centerY + labelRadius * Math.sin(midRad),
    };
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


        {/* Toggle Buttons */}
        <div className="transition-all duration-300 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3">
          <div className="flex justify-center mb-6 md:mb-8">
            <Toggle
              options={[
                { value: 'equity', label: 'Equity' },
                { value: 'debt', label: 'Debt' },
                { value: 'others', label: 'Others' },
              ]}
              activeValue={activeAsset}
              onChange={(value) => setActiveAsset(value as AssetType)}
              variant="light"
            />
          </div>

          {/* Doughnut Chart */}
          <div className="flex flex-col items-center justify-center px-4">
            <svg
              width="280"
              height="280"
              viewBox="0 0 240 240"
              className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-auto mb-6 md:mb-8"
            >
              {segments.map((segment, index) => {
                const labelPos = getLabelPosition(segment.midAngle);
                return (
                  <g key={index}>
                    <path
                      d={segment.pathData}
                      fill={segment.color}
                    />
                    {/* Add percentage label on the segment */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill={segment.color === '#D1F349' ? 'black' : 'white'}
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {segment.percentage}%
                    </text>
                  </g>
                );
              })}

              {/* Center Circle with Total Percentage */}
              <circle cx="120" cy="120" r={innerRadius} fill="white" />
              <text
                x="120"
                y="110"
                fontSize="20"
                fontWeight="700"
                textAnchor="middle"
                fill="#1F2937"
              >
                {currentData.total}
              </text>
              <text
                x="120"
                y="135"
                fontSize="12"
                fontWeight="500"
                textAnchor="middle"
                fill="#4B5563"
                style={{ textTransform: 'capitalize' }}
              >
                {activeAsset}
              </text>
            </svg>

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
        </div>

        {/* Credit Quality Section */}
        <div className="mt-8 bg-white py-4 md:py-6 rounded-2xl w-full lg:w-2/3 p-4 md:p-6 lg:p-8">
          {/* Toggle Buttons for Debt and Others */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Toggle
              options={[
                { value: 'debt', label: 'Debt' },
                { value: 'others', label: 'Others' },
              ]}
              activeValue={activeCreditAsset}
              onChange={(value) => setActiveCreditAsset(value as CreditAssetType)}
              variant="light"
            />
          </div>

          {/* Credit Quality Header */}
          <div className="flex items-center justify-between px-4 mb-6">
            <h3 className="text-base md:text-lg font-semibold text-navy">Credit Quality</h3>
            <h3 className="text-base md:text-lg font-semibold text-navy">Fund</h3>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="px-4 mb-8">
            <div className="flex gap-1 h-3 items-center">
              {creditQuality.ratings.slice(0, 2).map((rating, index) => {
                const percentage = parseFloat(rating.percentage);
                if (percentage === 0) return null;
                return (
                  <div
                    key={rating.name}
                    className={`h-full ${
                      index === 0 
                        ? 'bg-[#AC72FF]' 
                        : 'bg-[#C59CFF]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Credit Ratings List */}
          <div className="px-4 space-y-4">
            {creditQuality.ratings.map((rating, index) => (
              <div
                key={rating.name}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${index === 0
                        ? 'bg-purple-500'
                        : index === 1
                          ? 'bg-purple-400'
                          : index === 2
                            ? 'bg-purple-300'
                            : index === 3
                              ? 'bg-purple-200'
                              : index === 4
                                ? 'bg-purple-200'
                                : index === 5
                                  ? 'bg-purple-200'
                                  : index === 6
                                    ? 'bg-purple-100'
                                    : 'bg-gray-400'
                      }`}
                  />
                  <span className="text-sm md:text-base font-medium text-gray-700">
                    {rating.name}
                  </span>
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-900">
                  {rating.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;

