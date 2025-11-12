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
import LogoA from "../../assets/images/3D_A.png"

interface FundScheme {
  id: number;
  isin: string;
  fund_name: string;
  small_cap: string;
  mid_cap: string;
  large_cap: string;
  fund_type: string;
  purchase_mode: string;
  morningstar_category: string;
  distribution_status: string;
  [key: string]: any;
}

interface FundSchemesResponse {
  success: boolean;
  data: FundScheme[];
}

interface NavData {
  value: string;
  date: string;
}

const FundMain = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fundDetails, setFundDetails] = useState<FundData | null>(null);
  const [allFundSchemes, setAllFundSchemes] = useState<FundScheme[]>([]);
  const [navData, setNavData] = useState<NavData | null>(null);
  const [loading, setLoading] = useState(true);
  const search = useSearch({ from: '/fund' });

  // Fetch fund schemes once on mount
  useEffect(() => {
    const fetchFundSchemes = async () => {
      try {
        const schemesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mf-data/fund-schemes`);
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
          const chartResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mf-data/chart-data/${fund.id}`);
          const chartResult: FundApiResponse = await chartResponse.json();
          
          if (chartResult.success) {
            setFundDetails(chartResult.data);
            
            // Fetch NAV data immediately after fund details are loaded
            try {
              const navResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/mf-data/nav/${chartResult.data.fundDetails.isin}`
              );
              const navResult = await navResponse.json();

              if (navResult.success && navResult.data) {
                const formatDate = (dateStr: string): string => {
                  const date = new Date(dateStr);
                  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                  return date.toLocaleDateString('en-IN', options);
                };

                setNavData({
                  value: `₹ ${parseFloat(navResult.data.net_asset_value).toFixed(2)}`,
                  date: `as on ${formatDate(navResult.data.date)}`
                });
              }
            } catch (navError) {
              console.error('Error fetching NAV data:', navError);
            }
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
        {!loading && <BreadcrumbNav />}
      </div>

      <div className="bg-[#F8FAFC]">
        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
            <div className="text-center">
              <div className="animate-bounce">
                <img 
                  src={LogoA} 
                  alt="Loading..." 
                  className="w-20 h-20 md:w-24 md:h-24"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Basic Info - Always visible */}
            <BasicInfo 
              fundDetails={fundDetails?.fundDetails} 
              navData={navData} 
              pointToPoint={fundDetails?.pointToPoint}
            />

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
                <Ratios ratiosData={fundDetails?.ratios} fundType={fundDetails?.fundDetails?.fund_type} />
                <Carrva fundType={fundDetails?.fundDetails?.fund_type} consistencyFactors={fundDetails?.consistencyFactors} trendAnalysis={fundDetails?.trendAnalysis} />
                <AssetAllocation 
                  assetAllocation={fundDetails?.assetAllocation}  
                  marketCap={fundDetails?.marketCap}
                  creditQuality={fundDetails?.creditQuality}
                  fundDetails={fundDetails?.fundDetails}
                />
                <FundInformation fundDetails={fundDetails?.fundDetails} navData={navData} />
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
                navData={navData}
                consistencyFactors={fundDetails?.consistencyFactors}
                trendAnalysis={fundDetails?.trendAnalysis}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FundMain
