import { useState, useEffect } from "react"
import { useSearch } from '@tanstack/react-router'
import Header from "../../components/common/Header.tsx"
import BreadcrumbNav from "./BreadcrumbNav.tsx"
import BasicInfo from "./BasicInfo.tsx"
import FundPicks from "./FundPicks.tsx"
import ChooseCard from "./ChooseCard.tsx"
import InvestmentReturns from "./InvestmentReturns.tsx"
import Ratios from "./Ratios.tsx"
import Carrva from "./Carrva.tsx"
import AssetAllocation from "./AssetAllocation.tsx"
import FundInformation from "./FundInformation.tsx"
import AboutTheFund from "./AboutTheFund.tsx"
import FundManagers from "./FundManagers.tsx"
import FundTabs from "./FundTabs.tsx"
import type { FundApiResponse, FundData } from "../../types/fundTypes"

interface FundScheme {
  id: number;
  isin: string;
  fund_name: string;
  small_cap: string;
  mid_cap: string;
  large_cap: string;
  fund_type: string;
  purchase_mode: string;
  [key: string]: any;
}

interface FundSchemesResponse {
  success: boolean;
  data: FundScheme[];
}

const FundMain = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fundDetails, setFundDetails] = useState<FundData | null>(null);
  const [allFundSchemes, setAllFundSchemes] = useState<FundScheme[]>([]);
  const [loading, setLoading] = useState(false);
  const search = useSearch({ from: '/fund' });

  // Fetch fund schemes once on mount
  useEffect(() => {
    const fetchFundSchemes = async () => {
      try {
        const schemesResponse = await fetch('https://d223ljjj0y7hd6.cloudfront.net/api/mf-data/fund-schemes');
        const schemesResult: FundSchemesResponse = await schemesResponse.json();
        
        if (schemesResult.success) {
          setAllFundSchemes(schemesResult.data);
        }
      } catch (error) {
        console.error('Error fetching fund schemes:', error);
      }
    };

    fetchFundSchemes();
  }, []);

  // Fetch fund details when ISIN changes
  useEffect(() => {
    const fetchFundData = async () => {
      if (!search.isin || allFundSchemes.length === 0) return;

      setLoading(true);
      try {
        const fund = allFundSchemes.find((f) => f.isin === search.isin);
        
        if (fund) {
          // Fetch chart data using the fund id
          const chartResponse = await fetch(`https://d223ljjj0y7hd6.cloudfront.net/api/mf-data/chart-data/${fund.id}`);
          const chartResult: FundApiResponse = await chartResponse.json();
          
          if (chartResult.success) {
            setFundDetails(chartResult.data);
          }
        }
      } catch (error) {
        console.error('Error fetching fund data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundData();
  }, [search.isin, allFundSchemes]);

  return (
    <div>
      <Header fixedStyle="light" />
      <div className="pt-20">
        <BreadcrumbNav />
      </div>

      <div className="bg-[#F8FAFC]">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-500">Loading fund details...</div>
          </div>
        ) : (
          <>
            {/* Basic Info - Always visible */}
            <BasicInfo fundDetails={fundDetails?.fundDetails} />

            {/* Desktop View - All components stacked (lg and above) */}
            <div className="hidden xl:block px-4 py-2 md:block lg:px-20 lg:py-10">
              <FundPicks fundDetails={fundDetails?.betterFunds} onCategorySelect={setSelectedCategory} />
              <div className="">
                <ChooseCard 
                  fundDetails={fundDetails?.betterFunds} 
                  allFundSchemes={allFundSchemes}
                  selectedCategory={selectedCategory} 
                />
                <InvestmentReturns 
                  rollingReturns={fundDetails?.rollingReturns}
                  pointToPoint={fundDetails?.pointToPoint}
                />
                <Ratios />
                <Carrva />
                <AssetAllocation />
                <FundInformation fundDetails={fundDetails?.fundDetails} />
                <AboutTheFund fundDetails={fundDetails?.fundDetails} />
                <FundManagers fundDetails={fundDetails?.fundDetails} />
              </div>
            </div>

            {/* Mobile/Tablet View - Tabbed interface (below lg) */}
            <div className="md:hidden xl:hidden">
              <FundTabs
                fundDetails={fundDetails?.betterFunds}
                fundDetailsData={fundDetails?.fundDetails}
                allFundSchemes={allFundSchemes}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                completeData={fundDetails}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FundMain
