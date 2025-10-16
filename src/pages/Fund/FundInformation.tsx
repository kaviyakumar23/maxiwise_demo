import React from 'react';
import { fundData } from './DummyData';
import Qustion from '../../assets/images/Question.svg';

const FundInformation: React.FC = () => {
  const { fundInformation } = fundData;

  const informationItems = [
    { label: 'Latest NAV', value: fundInformation.latestNav },
    { label: 'Expense Ratio', value: fundInformation.expenseRatio },
    { label: 'Stamp Duty', value: fundInformation.stampDuty },
    { label: 'Exit load', value: fundInformation.exitLoad },
    { label: 'AUM (Fund size)', value: fundInformation.aum },
    { label: 'Lock-in Period', value: fundInformation.lockInPeriod },
    { 
      label: 'Min. investment', 
      value: `SIP: ${fundInformation.minInvestment.sip} & Lumpsum: ${fundInformation.minInvestment.lumpsum}` 
    },
  ];

  return (
    <div className="p-4 md:p-2 lg:p-4 xl:p-0 w-full lg:w-2/3">
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
      <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
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

