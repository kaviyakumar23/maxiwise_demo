import React, { useState } from 'react';
import FundPicks from './FundPicks';
import ChooseCard from './ChooseCard';
import InvestmentReturns from './InvestmentReturns';
import Ratios from './Ratios';
import Carrva from './Carrva';
import AssetAllocation from './AssetAllocation';
import FundInformation from './FundInformation';
import AboutTheFund from './AboutTheFund';
import FundManagers from './FundManagers';
import type { BetterFunds, FundDetails, FundData } from '../../types/fundTypes';

interface FundScheme {
  id: number;
  isin: string;
  fund_name: string;
  small_cap: string;
  mid_cap: string;
  large_cap: string;
  fund_type: string;
  purchase_mode: string;
}

interface FundTabsProps {
  fundDetails?: BetterFunds;
  fundDetailsData?: FundDetails;
  allFundSchemes: FundScheme[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  completeData?: FundData | null;
}

type TabType = 'Insights' | 'Returns' | 'Ratios' | 'Details';

const FundTabs: React.FC<FundTabsProps> = ({ fundDetails, fundDetailsData, allFundSchemes, selectedCategory, onCategorySelect, completeData }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Insights');

  const tabs: TabType[] = ['Insights', 'Returns', 'Ratios', 'Details'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Insights':
        return (
          <>
            <FundPicks fundDetails={fundDetails} onCategorySelect={onCategorySelect} />
            <ChooseCard fundDetails={fundDetails} allFundSchemes={allFundSchemes} selectedCategory={selectedCategory} />
          </>
        );
      case 'Returns':
        return (
          <InvestmentReturns 
            rollingReturns={completeData?.rollingReturns}
            pointToPoint={completeData?.pointToPoint}
          />
        );
      case 'Ratios':
        return (
          <>
            <Ratios />
            <Carrva />
            <AssetAllocation />
          </>
        );
      case 'Details':
        return (
          <>
            <FundInformation fundDetails={fundDetailsData} />
            <AboutTheFund fundDetails={fundDetailsData} />
            <FundManagers fundDetails={fundDetailsData} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Sticky Tabs Header */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 py-4 text-center font-outfit font-medium text-base transition-colors ${
                activeTab === tab
                  ? 'text-purple'
                  : 'text-gray-500'
              }`}
            >
              {tab}
              {/* Active tab indicator */}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FundTabs;

