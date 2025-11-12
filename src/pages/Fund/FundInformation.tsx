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

const FundInformation: React.FC<FundInformationProps> = ({ fundDetails }) => {
  const formatCurrency = (value: number | undefined) => {
    if (!value) return 'N/A';
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatDuration = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'N/A';
    return numValue.toFixed(2);
  };

  const formatOneDecimal = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'N/A';
    return `${numValue.toFixed(1)}%`;
  };

  const formatRatioValue = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'N/A';
    return numValue.toFixed(1);
  };

  const formatNumericValue = (value: string | undefined) => {
    if (!value) return 'N/A';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'N/A';
    return `${numValue.toFixed(2)}%`;
  };

  // Common fields for all fund types
  const commonItems = [
    // { label: 'Latest NAV', value: navData?.value || 'N/A' },
    {label: 'Benchmark', value: fundDetails?.benchmark || 'N/A'},
    { label: 'Expense Ratio', value: fundDetails?.net_expense_ratio ? `${parseFloat(fundDetails.net_expense_ratio).toFixed(2)}%` : 'N/A' },
    // { label: 'Stamp Duty', value: 'N/A' },
    { label: 'Exit load', value: fundDetails?.exit_load ? `${fundDetails.exit_load}` : 'N/A' },
    { label: 'India Risk Level', value: fundDetails?.india_risk_level || 'N/A' },
    
    // { label: 'Lock-in Period', value: 'N/A' },
    // { 
    //   label: 'Min. investment', 
    //   value: fundDetails?.minimum_investment 
    //     ? `SIP: ${formatCurrency(fundDetails.minimum_investment)} & Lumpsum: ${formatCurrency(fundDetails.minimum_additional_purchase)}` 
    //     : 'N/A'
    // },
  ];

  // Fund type specific fields
  const getTypeSpecificItems = () => {
    const fundType = fundDetails?.fund_type?.toLowerCase();
    const items: Array<{ label: string; value: string }> = [];

    if (fundType === "fixed income") {
      items.push(
        { label: 'Modified Duration', value: formatDuration(fundDetails?.mod_duration) },
        { label: 'Net Yield (%)', value: formatOneDecimal(fundDetails?.netYield) },
        { label: 'Average Rating', value: fundDetails?.average_credit_quality || 'N/A' }
      );
    } else if (fundType === "equity") {
      items.push(
        { label: 'PE Ratio', value: formatRatioValue(fundDetails?.pe_ratio_ttm) },
        { label: 'Turnover Ratio (%)', value: formatOneDecimal(fundDetails?.turnover_ratio) },
        { label: 'Information Ratio', value: formatRatioValue(fundDetails?.infoRatio_36m) }
      );
    } else if (fundType === "alternative") {
      items.push(
        { label: 'Modified Duration', value: formatDuration(fundDetails?.mod_duration) },
        { label: 'Net Yield (%)', value: formatOneDecimal(fundDetails?.netYield) },
        { label: 'Average Rating', value: fundDetails?.average_credit_quality || 'N/A' }
      );
    } else if (fundType === "allocation") {
      items.push(
        { label: 'PE Ratio', value: formatRatioValue(fundDetails?.pe_ratio_ttm) },
        { label: 'Turnover Ratio (%)', value: formatOneDecimal(fundDetails?.turnover_ratio) },
        { label: 'Modified Duration', value: formatDuration(fundDetails?.mod_duration) },
        { label: 'Net Yield (%)', value: formatOneDecimal(fundDetails?.netYield) },
        { label: 'Average Rating', value: fundDetails?.average_credit_quality || 'N/A' }
      );
    }

    // Add Tracking Error for Index Funds - applicable to all fund types
    if (
      fundDetails?.morningstar_category?.includes("Index Funds") || 
      fundDetails?.morningstar_category?.includes("Index Funds - Fixed Income")
    ) {
      items.push({ label: 'Tracking Error (%)', value: formatNumericValue(fundDetails?.trackError_36m) });
    }

    return items;
  };

  const informationItems = [...commonItems, ...getTypeSpecificItems()];

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

