import React, { useState } from 'react';
import { fundData } from './DummyData';
import { Chip } from '../../components/ui/Chip';
import { Toggle } from '../../components/ui/Toggle';
import { TimeButton } from '../../components/ui/TimeButton';
import { BarChart } from '../../components/ui/BarChart';
import type { BarData } from '../../components/ui/BarChart';

const InvestmentReturns: React.FC = () => {
  const { investmentReturns } = fundData;
  
  const [activeTab, setActiveTab] = useState(investmentReturns.tabs[0]);
  const [activeSubTab, setActiveSubTab] = useState(investmentReturns.subTabs[0]);
  const [activeTimePeriod, setActiveTimePeriod] = useState(investmentReturns.activeTimePeriod);

  // Get chart data based on active tab, subtab, and time period
  const getReturnsChartData = (): BarData[] => {
    const dataSource = activeSubTab === 'Rolling Returns' 
      ? investmentReturns.rollingReturnsData 
      : investmentReturns.pointToPointData;
    
    const data = dataSource[activeTimePeriod];
    
    return [
      {
        label: 'Category',
        value: data.category,
        color: 'linear-gradient(155.25deg, #CBD5E1 2.06%, #6E7782 97.94%)',
        valueColor: '#4B5563',
      },
      {
        label: 'Benchmark',
        value: data.benchmark,
        color: 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)',
        valueColor: '#4B5563',
      },
      {
        label: 'Fund',
        value: data.fund,
        color: 'linear-gradient(149.86deg, #AC72FF 0.9%, #723FBC 99.1%)',
        valueColor: '#9346FD',
      },
    ];
  };

  const getPerformanceChartData = (): BarData[] => {
    const data = investmentReturns.performanceData[activeTimePeriod];
    
    const investment = 1000000; // 10 lakhs
    const calculateValue = (percentage: number) => {
      return Math.round((investment * (1 + percentage / 100)) / 100000);
    };
    
    // Helper to create stacked segments (investment + profit)
    const createStackedBar = (percentage: number, label: string, valueColor: string) => {
      const totalValue = investment * (1 + percentage / 100);
      const profitValue = Math.max(0, totalValue - investment); // Ensure non-negative
      
      return {
        label,
        value: totalValue, // Total value used for calculating bar height
        displayValue: `₹${calculateValue(percentage)}L`,
        valueColor,
        segments: [
          {
            value: investment, // Grey segment at bottom
            color: 'linear-gradient(180deg, #64748B 0%, #475569 100%)',
          },
          {
            value: profitValue, // Purple segment on top (can be 0)
            color: 'linear-gradient(180deg, #A78BFA 0%, #7C3AED 100%)',
          },
        ],
      };
    };
    
    return [
      createStackedBar(data.bankAccount, 'Bank Account', '#4B5563'),
      createStackedBar(data.gold, 'Gold', '#4B5563'),
      createStackedBar(data.category, 'Category', '#4B5563'),
      createStackedBar(data.fund, 'Fund', '#9346FD'),
    ];
  };

  const getReturnPercentage = () => {
    const dataSource = activeSubTab === 'Rolling Returns' 
      ? investmentReturns.rollingReturnsData 
      : investmentReturns.pointToPointData;
    
    const data = dataSource[activeTimePeriod];
    return `${data.fund}%`;
  };

  const getPeriodText = () => {
    const periodMap: { [key: string]: string } = {
      '1Y': '1 year',
      '2Y': '2 years',
      '3Y': '3 years',
      '4Y': '4 years',
      '5Y': '5 years',
      'YTD': 'YTD',
    };
    return periodMap[activeTimePeriod] || activeTimePeriod;
  };

  const getPerformanceStats = () => {
    const data = investmentReturns.performanceData[activeTimePeriod];
    const baseInvestment = 10; // 10 Lacs base
    
    // Calculate based on the fund performance percentage
    const totalInvestment = baseInvestment + (data.fund / 110);
    const totalCorpus = totalInvestment + (data.fund / 10.68);
    const profit = totalCorpus - totalInvestment;
    const rollingReturn = (profit / totalInvestment) * 100;
    
    return {
      totalInvestment: totalInvestment.toFixed(0),
      profit: profit.toFixed(1),
      totalCorpus: totalCorpus.toFixed(1),
      rollingReturn: rollingReturn.toFixed(2),
    };
  };

  const performanceTimePeriods = [...investmentReturns.timePeriods, 'YTD'];

  return (
    <div>
      <div className="p-4 md:p-6 lg:p-4 xl:p-0">
    <h2 className="text-base md:text-lg font-semibold text-navy leading-[145%] tracking-[]0.15%] mb-4 md:mb-6">Investment Returns</h2>

      {/* Main Tabs - Returns / Performance */}
      
      <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        {investmentReturns.tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      </div>
    <div className="transition-all duration-300 bg-white p-4 md:p-6 rounded-2xl w-full lg:w-2/3">
      {/* Section Title */}
      

      {/* Returns Tab Content */}
      {activeTab === 'Returns' && (
        <div>
          {/* Toggle for Rolling Returns / Point to Point */}
          <div className="flex justify-center text-sm md:text-base mb-6 md:mb-8">
            <Toggle
              options={investmentReturns.subTabs.map(subTab => ({
                value: subTab,
                label: subTab,
              }))}
              activeValue={activeSubTab}
              onChange={setActiveSubTab}
              variant="light"
            />
          </div>

          {/* Return Percentage Display */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-purple-600 text-2xl md:text-4xl">▲</span>
              <span className="text-2xl md:text-3xl font-semibold font-outfit text-[#101010]">{getReturnPercentage()}</span>
              <span className="text-2xl md:text-3xl font-light font-outfit text-[#101010]">Return</span>
            </div>
            <p className="font-outfit font-normal text-sm md:text-base text-navy mt-2">In <span className="font-bold">{getPeriodText()}</span></p>
          </div>

          {/* Bar Chart */}
          <div className="mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
            <div className="md:min-w-[400px]">
              <BarChart data={getReturnsChartData()} height={200} />
            </div>
          </div>

          {/* Time Period Buttons */}
          <div className="flex justify-between gap-1.5 md:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide">
            {investmentReturns.timePeriods.map((period) => (
              <TimeButton
                key={period}
                label={period}
                isActive={activeTimePeriod === period}
                onClick={() => setActiveTimePeriod(period)}
                variant="light"
              />
            ))}
          </div>
        </div>
      )}

      {/* Performance Tab Content */}
      {activeTab === 'Performance' && (
        <div className="w-full lg:w-2/3 bg-white font-outfit rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-[#4B5563]">
          {/* Investment Amount Display */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-gray-400 text-base md:text-lg mb-2">Investment of</p>
            <p className="text-3xl md:text-5xl font-bold text-navy">₹ 10,00,000</p>
          </div>

          {/* Time Period Buttons */}
          <div className="flex justify-between gap-1.5 md:gap-3 lg:gap-4 mb-8 md:mb-12 overflow-x-auto scrollbar-hide">
            {performanceTimePeriods.map((period) => (
              <TimeButton
                key={period}
                label={period}
                isActive={activeTimePeriod === period}
                onClick={() => setActiveTimePeriod(period)}
                variant="light"
              />
            ))}
          </div>

          {/* Bar Chart */}
          <div className="mb-6 md:mb-8 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-x-auto scrollbar-hide">
            <div className="min-w-[400px]">
              <BarChart data={getPerformanceChartData()} height={200} />
            </div>
          </div>

          {/* Performance Stats */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-600"></div>
                <span className="text-sm md:text-base">Total investment</span>
              </div>
              <span className="text-sm md:text-base font-semibold">₹{getPerformanceStats().totalInvestment} Lacs</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm md:text-base">Profit</span>
              </div>
              <span className="text-sm md:text-base font-semibold">₹{getPerformanceStats().profit} Lacs</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base">Total corpus</span>
              <span className="text-sm md:text-base font-semibold">₹{getPerformanceStats().totalCorpus} Lacs</span>
            </div>

            <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base font-semibold">Rolling return</span>
                <svg 
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </div>
              <span className="text-sm md:text-base font-semibold">{getPerformanceStats().rollingReturn}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default InvestmentReturns;

