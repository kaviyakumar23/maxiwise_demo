import React from 'react';
import { fundData } from './DummyData';

const AboutTheFund: React.FC = () => {
  const { aboutFund } = fundData;

  const fundDetails = [
    { label: 'Total AUM', value: aboutFund.totalAum },
    { label: 'Launch Date', value: aboutFund.launchDate },
  ];

  return (
    <div className="p-4 md:p-2 lg:p-4 xl:p-0">
      {/* Title */}
      <div className="mb-6 md:mb-8 lg:mb-10">
      <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
        About this Fund
      </h1>

      {/* Content */}
      
        {/* Description */}
        <p className="text-sm md:text-base font-normal text-[#4B5563] leading-relaxed mb-6 md:mb-8 lg:mb-10">
          {aboutFund.description}
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

