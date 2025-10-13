import { useState } from "react"
import Header from "../../components/common/Header.tsx"
import BreadcrumbNav from "./BreadcrumbNav.tsx"
import BasicInfo from "./BasicInfo.tsx"
import FundPicks from "./FundPicks.tsx"
import ChooseCard from "./ChooseCard.tsx"
import InvestmentReturns from "./InvestmentReturns.tsx"
import Ratios from "./Ratios.tsx"
import FundTabs from "./FundTabs.tsx"

const FundMain = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      <Header fixedStyle="light" />
      <div className="pt-20">
        <BreadcrumbNav />
      </div>

      <div className="bg-[#F8FAFC]">
        {/* Basic Info - Always visible */}
        <BasicInfo />

        {/* Desktop View - All components stacked (lg and above) */}
        <div className="hidden xl:block px-4 py-2 md:px-6 md:py-4 lg:px-20 lg:py-10">
          <FundPicks onCategorySelect={setSelectedCategory} />
          <div className="">
            <ChooseCard selectedCategory={selectedCategory} />
            <InvestmentReturns />
            <Ratios />
          </div>
        </div>

        {/* Mobile/Tablet View - Tabbed interface (below lg) */}
        <div className="xl:hidden">
          <FundTabs
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  )
}

export default FundMain
