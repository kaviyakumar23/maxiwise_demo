import React from 'react';
import type { FundDetails } from '../../types/fundTypes';
import Qustion from '../../assets/images/Question.svg';

interface NavData {
  value: string;
  date: string;
}

interface FundInformationProps {
  fundDetails?: FundDetails;
  navData?: NavData | null;
}

const FundInformation: React.FC<FundInformationProps> = ({ fundDetails, navData }) => {
  const formatCurrency = (value: number | undefined) => {
    if (!value) return 'N/A';
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatAUM = (fundSize: string | undefined) => {
    if (!fundSize) return 'N/A';
    try {
      // Remove any non-numeric characters except decimal point
      const numericValue = parseFloat(fundSize.replace(/[^\d.]/g, ''));
      if (isNaN(numericValue)) return fundSize;
      
      // Convert to crores and format with 2 decimal places
      const crores = numericValue / 10000000;
      return `₹ ${crores.toFixed(2)} Crores`;
    } catch {
      return fundSize;
    }
  };

  const informationItems = [
    { label: 'Latest NAV', value: navData?.value || 'N/A' },
    { label: 'Expense Ratio', value: `${fundDetails?.net_expense_ratio}%` || 'N/A' },
    { label: 'Stamp Duty', value: 'N/A' },
    { label: 'Exit load', value: `${fundDetails?.exit_load}%` || 'N/A' },
    { label: 'AUM (Fund size)', value: formatAUM(fundDetails?.fund_size) },
    { label: 'Lock-in Period', value: 'N/A' },
    { 
      label: 'Min. investment', 
      value: fundDetails?.minimum_investment 
        ? `SIP: ${formatCurrency(fundDetails.minimum_investment)} & Lumpsum: ${formatCurrency(fundDetails.minimum_additional_purchase)}` 
        : 'N/A'
    },
  ];

  return (
    <div className="p-4 md:p-2 lg:p-4 xl:p-0 w-full lg:w-2/3 py-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
          Fund Information
        </h1>
        <button className="w-4 h-4 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors lg:hidden">
          <span><img src={Qustion} alt="Question" /></span>
        </button>
      </div>

      {/* Information List */}
      <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-10">
        <div>
          {informationItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-4 md:py-5 lg:py-6 border-b border-gray-200 last:border-b-0"
            >
              <span className="text-sm md:text-base font-normal text-[#4B5563]">
                {item.label}
              </span>
              <span className="text-sm md:text-base font-semibold text-[#4B5563] text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundInformation;

