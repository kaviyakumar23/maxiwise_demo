import React from 'react';
import type { FundDetails } from '../../types/fundTypes';

interface AboutTheFundProps {
  fundDetails?: FundDetails;
}

const AboutTheFund: React.FC<AboutTheFundProps> = ({ fundDetails: fundDetailsData }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
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

  const fundDetails = [
    { label: 'Total AUM', value: formatAUM(fundDetailsData?.fund_size) },
    { label: 'Launch Date', value: formatDate(fundDetailsData?.inception_date) },
  ];

  return (
    <div className=" w-full lg:w-2/3 py-4">
      {/* Title */}
      <div className="mb-6 md:mb-8 lg:mb-10">
      <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
        About this Fund
      </h1>

      {/* Content */}
      
        {/* Description */}
        <p className="text-sm md:text-base font-normal text-[#4B5563] leading-relaxed mb-6 md:mb-8 lg:mb-10">
          {fundDetailsData?.investment_strategy || 'N/A'}
        </p>
        </div>

        {/* Fund Details */}
        <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
       
          {fundDetails.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-2 sm:gap-4 py-3 md:py-4 border-b border-gray-200 last:border-b-0"
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
  );
};

export default AboutTheFund;

