import React, { useState, useEffect } from 'react';
// import { Chip } from '../../components/ui/Chip'; // Not needed when Performance tab is hidden
import { Toggle } from '../../components/ui/Toggle';
import { TimeButton } from '../../components/ui/TimeButton';
import { BarChart } from '../../components/ui/BarChart';
import type { BarData } from '../../components/ui/BarChart';
import type { RollingReturns, PointToPoint } from '../../types/fundTypes';
import Qustion from "../../assets/images/Question.svg";
import ChartBar from "../../assets/images/ChartBar.svg";
// import Percent from "../../assets/images/Percent.svg"; // Not needed when Performance section is hidden

interface InvestmentReturnsProps {
  rollingReturns?: RollingReturns;
  pointToPoint?: PointToPoint;
}

const InvestmentReturns: React.FC<InvestmentReturnsProps> = ({ 
  rollingReturns, 
  pointToPoint 
}) => {
  // Convert category format from API (e.g., "12m", "24m") to UI format (e.g., "1Y", "2Y")
  const convertCategory = (category: string): string => {
    if (category.toLowerCase() === 'ytd') return 'YTD';
    const match = category.match(/(\d+)m/i);
    if (match) {
      const months = parseInt(match[1]);
      const years = months / 12;
      return `${years}Y`;
    }
    return category;
  };

  // Get time periods based on the active sub-tab
  const getTimePeriods = (subTab: string): string[] => {
    const dataSource = subTab === 'Rolling Returns' ? rollingReturns : pointToPoint;
    if (!dataSource?.data?.categories) return ['1Y', '2Y', '3Y', '4Y', '5Y'];
    return dataSource.data.categories.map(convertCategory);
  };

  // const tabs = ['Returns']; // Not needed when Performance tab is hidden
  const subTabs = ['Rolling Returns', 'Point to Point'];
  
  // const [activeTab, setActiveTab] = useState(tabs[0]); // Not needed when Performance tab is hidden
  const [activeSubTab, setActiveSubTab] = useState(subTabs[0]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  // Get current time periods based on active sub-tab
  const timePeriods = getTimePeriods(activeSubTab);
  
  const [activeTimePeriod, setActiveTimePeriod] = useState(timePeriods[0]);

  // Update active time period when switching sub-tabs if the current period is not available
  useEffect(() => {
    const currentTimePeriods = getTimePeriods(activeSubTab);
    if (!currentTimePeriods.includes(activeTimePeriod)) {
      setActiveTimePeriod(currentTimePeriods[0]);
    }
  }, [activeSubTab]);

  // Get chart data based on active tab, subtab, and time period
  const getReturnsChartData = (): BarData[] => {
    const dataSource = activeSubTab === 'Rolling Returns' ? rollingReturns : pointToPoint;
    
    if (!dataSource?.data?.series || !dataSource?.data?.categories) {
      return [];
    }
    
    // Find the index of the active time period
    const periodIndex = timePeriods.indexOf(activeTimePeriod);
    if (periodIndex === -1) return [];
    
    // Build bar data from series
    const barData: BarData[] = [];
    
    dataSource.data.series.forEach((series) => {
      const value = series.data[periodIndex];
      
      // Determine color and valueColor based on series name
      let color: string;
      let valueColor: string;
      
      if (series.name.toLowerCase() === 'category') {
        color = 'linear-gradient(155.25deg, #CBD5E1 2.06%, #6E7782 97.94%)';
        valueColor = '#4B5563';
      } else if (series.name.toLowerCase() === 'benchmark') {
        color = 'linear-gradient(149.86deg, #94A3B8 0.9%, #000000 99.1%)';
        valueColor = '#4B5563';
      } else if (series.name.toLowerCase() === 'fund') {
        color = 'linear-gradient(149.86deg, #AC72FF 0.9%, #723FBC 99.1%)';
        valueColor = '#9346FD';
      } else {
        color = 'linear-gradient(155.25deg, #CBD5E1 2.06%, #6E7782 97.94%)';
        valueColor = '#4B5563';
      }
      
      barData.push({
        label: series.name,
        value: value ?? 0,
        color,
        valueColor,
      });
    });
    
    return barData;
  };

  // const getPerformanceChartData = (): BarData[] => {
  //   // Performance data not yet available from API
  //   // Returning empty array for now
  //   return [];
  // };

  const getReturnPercentage = () => {
    const dataSource = activeSubTab === 'Rolling Returns' ? rollingReturns : pointToPoint;
    
    if (!dataSource?.data?.series || !dataSource?.data?.categories) {
      return '0%';
    }
    
    const periodIndex = timePeriods.indexOf(activeTimePeriod);
    if (periodIndex === -1) return '0%';
    
    // Find the Fund series
    const fundSeries = dataSource.data.series.find(s => s.name.toLowerCase() === 'fund');
    if (!fundSeries) return '0%';
    
    const value = fundSeries.data[periodIndex];
    return `${value ?? 0}%`;
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

  // const getPerformanceStats = () => {
  //   // Performance data not yet available from API
  //   // Returning default values for now
  //   return {
  //     totalInvestment: '10',
  //     profit: '0.0',
  //     totalCorpus: '10.0',
  //     rollingReturn: '0.00',
  //   };
  // };

  // Get performance time periods (includes YTD if present in pointToPoint)
  // const getPerformanceTimePeriods = (): string[] => {
  //   if (!pointToPoint?.data?.categories) {
  //     return getTimePeriods('Rolling Returns');
  //   }
  //   return pointToPoint.data.categories.map(convertCategory);
  // };

  // const performanceTimePeriods = getPerformanceTimePeriods();

  // // Handle body scroll lock when modal is open
  // useEffect(() => {
  //   if (isInfoModalOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
    
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isInfoModalOpen]);

  return (
    <div className='py-4'>
      <div className="p-4 md:p-6 lg:p-4 xl:p-0">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold text-navy leading-[145%] tracking-[0.15%]">Investment Returns</h2>
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors lg:hidden"
        >
          <img src={Qustion} alt="Question" />
        </button>
      </div>

      {/* Main Tabs - Returns */}
      {/* Hiding Performance tab for now */}
      {/* <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div> */}
      </div>
    <div className="transition-all duration-300 bg-white p-4 md:p-6 rounded-2xl w-full lg:w-2/3">
      {/* Section Title */}
      

      {/* Returns Tab Content */}
      {/* {activeTab === 'Returns' && ( */}
        <div>
          {/* Toggle for Rolling Returns / Point to Point */}
          <div className="flex justify-center text-sm md:text-base mb-6 md:mb-8">
            <Toggle
              options={subTabs.map(subTab => ({
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
            {timePeriods.map((period) => (
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
      {/* )} */}

      {/* Performance Tab Content - Hidden for now */}
      {/* {activeTab === 'Performance' && (
        <div className="w-full lg:w-2/3 bg-white font-outfit rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-[#4B5563]">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-gray-400 text-base md:text-lg mb-2">Investment of</p>
            <p className="text-3xl md:text-5xl font-bold text-navy">₹ 10,00,000</p>
          </div>

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

          <div className="mb-6 md:mb-8 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-x-auto scrollbar-hide">
            <div className="min-w-[400px]">
              <BarChart data={getPerformanceChartData()} height={200} />
            </div>
          </div>

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
      )} */}
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
                Investment Returns
              </h1>
              
              {/* Description */}
              <p className="text-[#4B5563] font-normal text-sm font-outfit mb-6">
                Investment Returns measure the growth of your fund.
              </p>
              
              {/* Content Sections */}
              <div className="space-y-4 mb-6">
                {/* Point-to-Point Section */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                  <img src={ChartBar} alt="Chart Bar" />
                  </div>
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Point-to-Point</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Returns show performance between two fixed dates.</p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Rolling Returns Section */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                  <img src={ChartBar} alt="Chart Bar" />
                  </div>
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Rolling Returns</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Average returns across multiple time periods, giving a more consistent and reliable view.</p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Performance Section */}
                {/* <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                    <img src={Percent} alt="Performance Percent" />
                  </div>
                  <div>
                    <h3 className="text-navy font-semibold text-base font-outfit mb-1">Performance</h3>
                    <p className="text-[#4B5563] font-normal text-sm font-outfit">Performance shows how your investment would have grown over time compared to other options. It helps you see how this fund stacks up against alternatives like Bank Accounts, Gold, and the overall category average.</p>
                  </div>
                </div> */}
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

export default InvestmentReturns;


