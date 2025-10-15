import React from 'react';
import { fundData } from './DummyData';

const FundManagers: React.FC = () => {
  const { fundManagers } = fundData;

  return (
    // <div className="p-4 md:p-2 lg:p-4 xl:p-0">
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 xl:p-0">
      {/* Title */}
      <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
        Fund Managers
      </h1>

      {/* Managers List */}

        <div className="space-y-4 md:space-y-6">
          {fundManagers.map((manager, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 md:py-4 border-b border-gray-200 last:border-b-0"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  {manager.avatar ? (
                    <img
                      src={manager.avatar}
                      alt={manager.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Manager Info */}
              <div className="flex-1">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-navy mb-1">
                  {manager.name}
                </h3>
                <p className="text-xs md:text-sm text-[#6B7280]">
                  {manager.since}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FundManagers;

