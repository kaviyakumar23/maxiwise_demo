import React from 'react';
import type { FundDetails } from '../../types/fundTypes';
import Avatar from '../../assets/images/Avatar.png';

interface FundManagersProps {
  fundDetails?: FundDetails;
}

const FundManagers: React.FC<FundManagersProps> = ({ fundDetails }) => {
  const parseManagers = (managerNames: string | undefined) => {
    if (!managerNames) return [];
    try {
      // Replace single quotes with double quotes for valid JSON
      const jsonString = managerNames.replace(/'/g, '"');
      const parsed = JSON.parse(jsonString);
      // Extract the 'value' field from each object
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => item.value || item);
      }
      return [];
    } catch {
      // If it's not JSON, treat it as a single name
      return [managerNames];
    }
  };

  const managers = parseManagers(fundDetails?.manager_name);

  return (
    // <div className="p-4 md:p-2 lg:p-4 xl:p-0">
    <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 w-full lg:w-2/3 mt-4">
      {/* Title */}
      <h1 className="text-sm md:text-base lg:text-lg font-semibold font-outfit text-navy leading-[145%] tracking-[0.15%] py-4">
        Fund Managers
      </h1>

      {/* Managers List */}

      <div>
        {managers.length > 0 ? (
          managers.map((managerName, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 md:py-4 border-b border-gray-200 last:border-b-0"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={Avatar}
                  alt="Manager Avatar"
                  className="w-7 xl:w-12 md:w-8 lg:w-10 rounded-full object-cover"
                />
              </div>

              {/* Manager Info */}
              <div className="flex-1">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-navy">
                  {managerName}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No fund managers available
          </div>
        )}
      </div>
    </div>
  );
};

export default FundManagers;

