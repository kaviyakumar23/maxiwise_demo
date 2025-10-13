import React, { useState } from 'react';
import { Chip } from '../../components/ui/Chip';
import { Toggle } from '../../components/ui/Toggle';
import { fundData } from './DummyData';
import Qustion from '../../assets/images/Question.svg';
import { BarChart } from '../../components/ui/BarChart';
import type { BarData } from '../../components/ui/BarChart';

type MetricType = 'Cycles' | 'Alpha' | 'Return' | 'Risk' | 'Volatility' | 'Analysis';
type ViewType = 'consistency' | 'trend';

const Carrva: React.FC = () => {
  const { caarva } = fundData;
  
  const [activeMetric, setActiveMetric] = useState<MetricType>(caarva.activeMetric as MetricType);
  const [activeView, setActiveView] = useState<ViewType>('consistency');

  const metrics = caarva.metrics as MetricType[];
  const metricsData = caarva.metricsData;

  const currentData = metricsData[activeMetric];

  const ConsistencyChart: React.FC = () => {
    const { benchmark, fund } = currentData.consistency;

    const chartData: BarData[] = [
      {
        label: 'Benchmark',
        value: benchmark,
        color: 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)',
        valueColor: '#4B5563',
      },
      {
        label: 'Fund',
        value: fund,
        color: 'linear-gradient(149.86deg, #AC72FF 0.9%, #723FBC 99.1%)',
        valueColor: '#9346FD',
      },
    ];

    return (
      <div className="w-full">
        <BarChart data={chartData} height={280} />
      </div>
    );
  };

  const TrendChart: React.FC = () => {
    const levels = [
      { label: 'High', color: 'bg-[#6EE7B7]', range: [80, 100] },
      { label: 'Above Avg', color: 'bg-[#D1FAE5]', range: [60, 80] },
      { label: 'Average', color: 'bg-[#FDE68A]', range: [40, 60] },
      { label: 'Below Avg', color: 'bg-[#FFE4E6]', range: [20, 40] },
      { label: 'Low', color: 'bg-[#FDA4AF]', range: [0, 20] },
    ];

    const trendData = currentData.trend;

    // Calculate positions for the line chart
    const getYPosition = (level: number) => {
      // level: 0=Low, 1=Below Avg, 2=Average, 3=Above Avg, 4=High
      // Each band is 20% of the chart height
      return 100 - (level * 20 + 10); // Center of each band
    };

    return (
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative bg-white rounded-2xl md:rounded-3xl">
        {/* Chart area with colored bands */}
        <div className="absolute left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 top-8 md:top-10 bottom-16 md:bottom-20">
          {/* Colored bands */}
          <div className="relative w-full h-full overflow-hidden">
            {levels.map((level, index) => (
              <div
                key={level.label}
                className={`h-[20%] ${level.color} border-b border-white/20 relative flex items-center px-4 md:px-6`}
              >
                <span 
                  className="text-xs md:text-sm lg:text-base font-medium z-10"
                  style={{
                    color: index === 0 ? '#047857' : 
                           index === 1 ? '#10B981' : 
                           index === 2 ? '#D97706' : 
                           index === 3 ? '#FB7185' : '#E11D48'
                  }}
                >
                  {level.label}
                </span>
              </div>
            ))}

            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={`${i * 20}%`}
                  y1="0"
                  x2={`${i * 20}%`}
                  y2="100%"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* Line chart */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Line path */}
              <polyline
                points={trendData
                  .map((point, index) => {
                    const x = (index / (trendData.length - 1)) * 100;
                    const y = getYPosition(point.level);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#6EE7B7"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Data points */}
              {trendData.map((point, index) => {
                const x = (index / (trendData.length - 1)) * 100;
                const y = getYPosition(point.level);
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="#1F2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-20 md:left-24 lg:left-28 right-4 md:right-6 lg:right-8 bottom-6 md:bottom-8 lg:bottom-10 text-xs md:text-sm lg:text-base font-medium text-[#4B5563]">
          {trendData.map((point, index) => {
            const xPosition = (index / (trendData.length - 1)) * 100;
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
    <div className="p-4 md:p-2 lg:p-4 xl:p-0">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
          CARRVA
        </h1>
        <button className="w-4 h-4 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
          <span><img src={Qustion} alt="Question" /></span>
        </button>
      </div>

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
    </div>
  );
};


export default Carrva;

