import React, { useState, useEffect } from 'react';
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
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const metrics = caarva.metrics as MetricType[];
  const metricsData = caarva.metricsData;

  const currentData = metricsData[activeMetric];

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
              {/* Vertical lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={`${i * 20}%`}
                  y1="0"
                  x2={`${i * 20}%`}
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
                points={trendData
                  .map((point, index) => {
                    // Add left padding (20%) to account for Y-axis labels
                    const x = 20 + (index / (trendData.length - 1)) * 77;
                    const y = getYPosition(point.level);
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
              {trendData.map((point, index) => {
                // Add left padding (20%) to account for Y-axis labels
                const xPercent = 20 + (index / (trendData.length - 1)) * 77;
                const yPercent = getYPosition(point.level);
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
                  CARRVA (Cycles, Alpha, Return, Risk, Volatility, Analysis) helps you evaluate a fund's performance from multiple perspectives. These charts highlight both how consistently a fund delivers returns and the trend of its performance across different time periods, giving you a clearer view of stability and reliability.
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

