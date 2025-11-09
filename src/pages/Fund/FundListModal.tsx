import React from "react";
import NipponLogo from "../../assets/images/Nippon India Mutual Fund.png";

interface Fund {
  id: string;
  name: string;
  category: string;
  marketCap: string;
  planType: string;
  returns: string;
  logo?: string;
}

interface FundListModalProps {
  categoryId: string;
  categoryTitle?: string;
  categorySubtitle?: string;
  onClose: () => void;
}

// Sample fund data for each category
const categoryFunds: Record<string, Fund[]> = {
  "all-parameters": [
    {
      id: "1",
      name: "Aditya Birla Sun Life Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "17.66%",
      logo: NipponLogo,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "16.89%",
      logo: NipponLogo,
    },
    {
      id: "3",
      name: "HDFC Top 100 Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.92%",
      logo: NipponLogo,
    },
    {
      id: "4",
      name: "Kotak Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.45%",
      logo: NipponLogo,
    },
    {
      id: "5",
      name: "SBI Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.78%",
      logo: NipponLogo,
    },
    {
      id: "6",
      name: "Axis Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.23%",
      logo: NipponLogo,
    },
    {
      id: "7",
      name: "Mirae Asset Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.95%",
      logo: NipponLogo,
    },
    {
      id: "8",
      name: "Nippon India Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.67%",
      logo: NipponLogo,
    },
    {
      id: "9",
      name: "UTI Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.34%",
      logo: NipponLogo,
    },
    {
      id: "10",
      name: "Franklin India Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "12.89%",
      logo: NipponLogo,
    },
  ],
  "same-risk-higher-returns": [
    {
      id: "1",
      name: "Aditya Birla Sun Life Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "17.66%",
      logo: NipponLogo,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "16.89%",
      logo: NipponLogo,
    },
    {
      id: "3",
      name: "HDFC Top 100 Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.92%",
      logo: NipponLogo,
    },
    {
      id: "4",
      name: "Kotak Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.45%",
      logo: NipponLogo,
    },
    {
      id: "5",
      name: "SBI Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.78%",
      logo: NipponLogo,
    },
    {
      id: "6",
      name: "Axis Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.23%",
      logo: NipponLogo,
    },
    {
      id: "7",
      name: "Mirae Asset Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.95%",
      logo: NipponLogo,
    },
    {
      id: "8",
      name: "Nippon India Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.67%",
      logo: NipponLogo,
    },
    {
      id: "9",
      name: "UTI Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.34%",
      logo: NipponLogo,
    },
    {
      id: "10",
      name: "Franklin India Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "12.89%",
      logo: NipponLogo,
    },
  ],
  "low-risk-similar-returns": [
    {
      id: "1",
      name: "Aditya Birla Sun Life Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "17.66%",
      logo: NipponLogo,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "16.89%",
      logo: NipponLogo,
    },
    {
      id: "3",
      name: "HDFC Top 100 Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.92%",
      logo: NipponLogo,
    },
    {
      id: "4",
      name: "Kotak Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.45%",
      logo: NipponLogo,
    },
    {
      id: "5",
      name: "SBI Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.78%",
      logo: NipponLogo,
    },
  ],
  "higher-returns-lower-risk": [
    {
      id: "1",
      name: "Aditya Birla Sun Life Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "17.66%",
      logo: NipponLogo,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "16.89%",
      logo: NipponLogo,
    },
    {
      id: "3",
      name: "HDFC Top 100 Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.92%",
      logo: NipponLogo,
    },
    {
      id: "4",
      name: "Kotak Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.45%",
      logo: NipponLogo,
    },
    {
      id: "5",
      name: "SBI Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.78%",
      logo: NipponLogo,
    },
  ],
  "higher-risk-higher-returns": [
    {
      id: "1",
      name: "Aditya Birla Sun Life Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "17.66%",
      logo: NipponLogo,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "16.89%",
      logo: NipponLogo,
    },
    {
      id: "3",
      name: "HDFC Top 100 Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.92%",
      logo: NipponLogo,
    },
    {
      id: "4",
      name: "Kotak Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "15.45%",
      logo: NipponLogo,
    },
    {
      id: "5",
      name: "SBI Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.78%",
      logo: NipponLogo,
    },
    {
      id: "6",
      name: "Axis Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "14.23%",
      logo: NipponLogo,
    },
    {
      id: "7",
      name: "Mirae Asset Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.95%",
      logo: NipponLogo,
    },
    {
      id: "8",
      name: "Nippon India Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.67%",
      logo: NipponLogo,
    },
    {
      id: "9",
      name: "UTI Large Cap Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "13.34%",
      logo: NipponLogo,
    },
    {
      id: "10",
      name: "Franklin India Bluechip Fund - Direct Plan",
      category: "Equity",
      marketCap: "Large Cap",
      planType: "Direct",
      returns: "12.89%",
      logo: NipponLogo,
    },
  ],
};

const FundListModal: React.FC<FundListModalProps> = ({ categoryId, categoryTitle, categorySubtitle, onClose }) => {
  const funds = categoryFunds[categoryId] || [];
  
  // Show only first 3 funds in the modal
  const displayedFunds = funds.slice(0, 3);
  
  // Display category title
  const fullTitle = categoryTitle && categorySubtitle 
    ? `${categoryTitle} ${categorySubtitle}`
    : categoryTitle || "Fund Category";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-navy font-outfit">
                {fullTitle}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {funds.length} funds available in this category
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Fund List */}
        <div className="px-8 py-6">
          <div className="space-y-4">
            {displayedFunds.map((fund) => (
              <div
                key={fund.id}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Fund Logo */}
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src={fund.logo}
                        alt={fund.name}
                        className="w-10 h-10 rounded-lg object-contain"
                      />
                    </div>

                    {/* Fund Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy font-outfit mb-2">
                        {fund.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{fund.category}</span>
                        <span className="text-gray-400">•</span>
                        <span>{fund.marketCap}</span>
                        <span className="text-gray-400">•</span>
                        <span>{fund.planType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Returns */}
                  <div className="text-right ml-4">
                    <span className="text-2xl font-bold text-purple font-outfit">
                      {fund.returns}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <button className="w-full mt-6 bg-lime text-navy font-semibold text-lg py-4 rounded-2xl hover:bg-lime-dark transition-colors font-outfit">
            View All ({funds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundListModal;

