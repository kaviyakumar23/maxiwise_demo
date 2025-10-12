import React, { useState } from 'react';
import FundPicks from './FundPicks';
import ChooseCard from './ChooseCard';
import InvestmentReturns from './InvestmentReturns';
import Ratios from './Ratios';

interface FundTabsProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

type TabType = 'Insights' | 'Returns' | 'Ratios' | 'Details';

const FundTabs: React.FC<FundTabsProps> = ({ selectedCategory, onCategorySelect }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Insights');

  const tabs: TabType[] = ['Insights', 'Returns', 'Ratios', 'Details'];

  // Dummy component for Ratios and Details
  const DummyContent: React.FC<{ title: string }> = ({ title }) => (
    <div className="px-4 py-8 bg-white">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-navy font-outfit mb-4">{title}</h3>
        <p className="text-gray-600 font-outfit">Content coming soon...</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Insights':
        return (
          <>
            <FundPicks onCategorySelect={onCategorySelect} />
            <ChooseCard selectedCategory={selectedCategory} />
          </>
        );
      case 'Returns':
        return <InvestmentReturns />;
      case 'Ratios':
        return <Ratios />;
      case 'Details':
        return <DummyContent title="Details" />;
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

