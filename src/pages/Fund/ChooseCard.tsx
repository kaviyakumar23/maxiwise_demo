import React from "react";
import ChooseCardImg from "../../assets/images/ChooseCard.png"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import { fundData } from "./DummyData.tsx";
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

interface ChooseCardProps {
  selectedCategory: string | null;
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

const ChooseCard: React.FC<ChooseCardProps> = ({ selectedCategory }) => {
  // If no category is selected, show the default "Choose a Card" state
  if (!selectedCategory) {
    return (
      <div className="py-6 md:py-8 lg:py-10">
        {/* Card container - 3/4 width on desktop, full on mobile */}
        <Card variant="flat" size="md" className="w-full lg:w-2/3">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-sm">
              <img src={ChooseCardImg} alt="Choose Card" className="h-50px" />
            </div>
            <div className="text-center font-outfit font-normal text-sm md:text-base text-indigo leading-relaxed">
              <p>The funds are hiding. Pick a Smart Fund<br />card to uncover them.</p>
            </div>
            <Button variant="primary" color="lime" size="lg" className="w-full">
              Choose a Card
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // If a category is selected, show the fund list
  const funds = categoryFunds[selectedCategory] || [];
  const category = fundData.smartFundPicks.find((pick) => pick.id === selectedCategory);
  const displayedFunds = funds.slice(0, 3);

  return (
    <div className="py-6 md:py-8 lg:py-10">
      {/* Fund List Container - Full width on mobile, 3/4 width on desktop */}
      <Card variant="default" size="lg" className="w-full lg:w-2/3">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-navy font-outfit">
            {category?.title} {category?.subtitle || ""}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            {funds.length} funds available in this category
          </p>
        </div>

        {/* Fund List */}
        <div className="space-y-3 md:space-y-4">
          {displayedFunds.map((fund) => (
            <Card
              key={fund.id}
              variant="filled"
              rounded="sm"
              size="md"
              hover
              clickable
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  {/* Fund Logo */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img
                      src={fund.logo}
                      alt={fund.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
                    />
                  </div>

                  {/* Fund Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg font-semibold text-navy font-outfit mb-1 md:mb-2 truncate">
                      {fund.name}
                    </h3>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                      <span>{fund.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="hidden sm:inline">{fund.marketCap}</span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="hidden sm:inline">{fund.planType}</span>
                    </div>
                  </div>
                </div>

                {/* Returns */}
                <div className="text-right flex-shrink-0">
                  <span className="text-lg md:text-2xl font-bold text-purple font-outfit">
                    {fund.returns}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <button className="w-full mt-4 md:mt-6 bg-lime text-navy font-semibold text-base md:text-lg py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-lime-dark transition-colors font-outfit">
          View All ({funds.length})
        </button>
      </Card>
    </div>
  );
};

export default ChooseCard;