import React, { useState, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLoginModal } from "../getStarted/LoginModal";
import type { FundDetails, PointToPoint } from "../../types/fundTypes";
import CaretUpDown from "../../assets/images/CaretUpDown.svg";
import NipponLogo from "../../assets/images/Nippon India Mutual Fund.png";

interface NavData {
  value: string;
  date: string;
}

interface BasicInfoProps {
  fundDetails?: FundDetails;
  navData?: NavData | null;
  pointToPoint?: PointToPoint;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ fundDetails, navData, pointToPoint }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedYearPeriod, setSelectedYearPeriod] = useState<1 | 2 | 3 | 4 | 5>(1);
  const { isSignedIn } = useUser();
  const { openModal } = useLoginModal();

  // Handler for bookmark/save button click
  const handleSaveToWatchlist = () => {
    if (!isSignedIn) {
      // Open login modal if user is not signed in
      openModal();
    } else {
      // TODO: Implement save to watchlist functionality
      console.log('Save to watchlist');
    }
  };

  // Handler for share button click
  const handleShare = () => {
    if (!isSignedIn) {
      // Open login modal if user is not signed in
      openModal();
    } else {
      // TODO: Implement share functionality
      console.log('Share fund');
      // Future implementation could include:
      // - Copy link to clipboard
      // - Share via social media
      // - Share via email
    }
  };

  // Handler for download button click
  const handleDownload = () => {
    if (!isSignedIn) {
      // Open login modal if user is not signed in
      openModal();
    } else {
      // TODO: Implement download functionality
      console.log('Download fund information');
      // Future implementation could include:
      // - Generate PDF report
      // - Download fund fact sheet
    }
  };

  // Helper function to format fund size
  const formatFundSize = (size: string): string => {
    const sizeNum = parseFloat(size);
    if (isNaN(sizeNum)) return size;
    
    if (sizeNum >= 10000000000) { // 1000 Cr
      return `₹ ${(sizeNum / 10000000).toFixed(0)} Cr`;
    } else if (sizeNum >= 100000000) { // 10 Cr
      return `₹ ${(sizeNum / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹ ${(sizeNum / 100000).toFixed(2)} L`;
    }
  };

  // Helper function to format date
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };

  // Get annual returns value based on selected year period
  const getAnnualReturnsValue = (year: number): string => {
    if (!pointToPoint?.data) return "N/A";
    
    // Find the Fund series data
    const fundSeries = pointToPoint.data.series.find(
      series => series.name.toLowerCase() === "fund"
    );
    
    if (!fundSeries || !fundSeries.data) return "N/A";
    
    // Map year period to category index
    // categories: ["YTD", "12m", "24m", "36m", "48m", "60m"]
    const categoryIndexMap: { [key: number]: number } = {
      1: 1,  // 12m
      2: 2,  // 24m
      3: 3,  // 36m
      4: 4,  // 48m
      5: 5,  // 60m
    };
    
    const index = categoryIndexMap[year];
    const value = fundSeries.data[index];
    
    if (value === null || value === undefined) return "N/A";
    
    // Format the value with proper decimals
    return `${value}%`;
  };

  // Get annual returns label based on selected year period
  const getAnnualReturnsLabel = (year: number): string => {
    const unit = year === 1 ? "abs" : "p.a";
    return `${year}Y Annual Returns (${unit})`;
  };

  // Cycle through year periods
  const cycleYearPeriod = () => {
    setSelectedYearPeriod((prev) => {
      if (prev === 5) return 1;
      return (prev + 1) as 1 | 2 | 3 | 4 | 5;
    });
  };

  // Prepare fund header data from API
  const displayData = useMemo(() => {
    if (!fundDetails) {
      return {
        name: "Fund information not available",
        tags: [],
        nav: {
          value: "N/A",
          date: "NAV data not available",
        },
        annualReturns: {
          period: getAnnualReturnsLabel(selectedYearPeriod),
          value: "N/A",
        },
        aum: {
          label: "AUM (Fund size)",
          value: "N/A",
        },
      };
    }

    // Extract tags from fund details
    const tags = [
      fundDetails.fund_type,
      fundDetails.morningstar_category,
      fundDetails.purchase_mode,
      fundDetails.distribution_status,
    ].filter(Boolean);

    return {
      name: fundDetails.fund_legal_name,
      tags: tags,
      nav: navData || {
        value: "N/A",
        date: `as on ${formatDate(fundDetails.fund_size_date)}`,
      },
      annualReturns: {
        period: getAnnualReturnsLabel(selectedYearPeriod),
        value: getAnnualReturnsValue(selectedYearPeriod),
      },
      aum: {
        label: "AUM (Fund size)",
        value: formatFundSize(fundDetails.fund_size),
      },
    };
  }, [fundDetails, navData, selectedYearPeriod, pointToPoint]);

  const currentHeader = displayData;

  return (
    <>
      {/* Mobile/Tablet Layout (< 1024px) */}
      <div className="lg:hidden px-4 py-6 rounded-lg">
        {/* Top Section: Logo, Name, Actions */}
        <div className="flex items-start justify-between mb-4">
          {/* Left: Logo */}
          <div className="flex items-start gap-3">
            <img src={NipponLogo} alt="Fund Logo" className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-navy font-outfit leading-[24px] mb-2">
                {currentHeader.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#64748B] font-outfit font-normal">
                {currentHeader.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <span className="text-sm">{tag}</span>
                    {index < currentHeader.tags.length - 1 && (
                      <span>•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Save and Menu Icons */}
          <div className="flex items-start flex-shrink-0 ml-2">
            {/* Save/Bookmark Icon */}
            <button
              onClick={handleSaveToWatchlist}
              className="p-1 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
              aria-label="Save to watchlist"
            >
              <svg
                className="w-5 h-5 text-[#8B5CF6]"
                fill="currentColor"
                stroke="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            {/* Three Dots Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
                aria-label="More options"
              >
                <svg
                  className="w-5 h-5 text-navy"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-navy hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleShare();
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="18" cy="5" r="3" strokeWidth={2} />
                      <circle cx="6" cy="12" r="3" strokeWidth={2} />
                      <circle cx="18" cy="19" r="3" strokeWidth={2} />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth={2} strokeLinecap="round" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                    Share
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-navy hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleDownload();
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: NAV and Annual Returns only */}
        <div className="flex items-start gap-8 pt-4">
          {/* NAV */}
          <div>
            <div className="text-lg font-semibold text-navy font-outfit mb-1">
              {currentHeader.nav.value}
            </div>
            <div className="text-sm font-normal font-outfit text-[#64748B]">
              {currentHeader.nav.date}
            </div>
          </div>

          {/* Annual Returns */}
          <div className="relative">
            <div className="text-lg font-semibold text-[#8B5CF6] font-outfit mb-1">
              {currentHeader.annualReturns.value}
            </div>
            <div className="text-sm font-normal font-outfit text-[#64748B] flex items-center gap-0">
              <span>{currentHeader.annualReturns.period}</span>
              <button
                onClick={cycleYearPeriod}
                className="p-0.5 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label="Change year period"
              >
                <img src={CaretUpDown} alt="Caret Up Down" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:block px-20 pt-16 rounded-lg">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-8">
          {/* Left: Logo + Fund Name + Tags */}
          <div className="flex items-start gap-4 mb-6">
            <img src={NipponLogo} alt="Nippon Logo" className="w-12 h-12 rounded-lg" />
            {/* Fund Name and Tags */}
            <div>
              <h1 className="text-2xl font-semibold text-navy font-outfit leading-[32px] mb-2">
                {currentHeader.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#64748B] font-outfit font-normal leading-[20px] tracking-[-0.6%]">
                {currentHeader.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <span className="text-sm text-gray-600">{tag}</span>
                    {index < currentHeader.tags.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Share"
            >
              <svg
                className="w-5 h-5 text-navy font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="5" r="3" strokeWidth={2} />
                <circle cx="6" cy="12" r="3" strokeWidth={2} />
                <circle cx="18" cy="19" r="3" strokeWidth={2} />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth={2} strokeLinecap="round" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
            {/* Save/Bookmark Icon */}
            <button
              onClick={handleSaveToWatchlist}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Save to watchlist"
            >
              <svg
                className="w-5 h-5 text-navy font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            {/* Download Icon */}
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Download"
            >
              <svg
                className="w-6 h-6 text-navy font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Bottom Section: Metrics */}
        <div className="flex items-center gap-12 px-2">
          <div>
            <div className="text-xl font-semibold text-navy font-outfit leading-[35px] mb-1">
              {currentHeader.nav.value}
            </div>
            <div className="text-sm font-normal font-outfit text-gray leading-[20px]">{currentHeader.nav.date}</div>
          </div>
          {/* Annual Returns */}
          <div className="relative">
            <div className="text-xl font-semibold  text-purple font-outfit leading-[35px] mb-1">{currentHeader.annualReturns.value}</div>
            <div className="text-sm font-normal font-outfit text-gray leading-[20px] flex items-center gap-1">
              {currentHeader.annualReturns.period}
              <button
                onClick={cycleYearPeriod}
                className="p-0.5 hover:bg-gray-100 rounded transition-colors cursor-pointer inline-flex items-center"
                aria-label="Change year period"
              >
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.213805 4.41537C0.171168 4.3126 0.159968 4.19949 0.18162 4.09035C0.203272 3.98122 0.256804 3.88095 0.335445 3.80224L3.71045 0.427242C3.76269 0.374943 3.82472 0.333453 3.89301 0.305146C3.9613 0.276838 4.03449 0.262268 4.10841 0.262268C4.18234 0.262268 4.25553 0.276838 4.32382 0.305146C4.3921 0.333453 4.45414 0.374943 4.50638 0.427242L7.88138 3.80224C7.96014 3.88091 8.01378 3.98118 8.03552 4.09035C8.05727 4.19952 8.04612 4.31269 8.00351 4.41553C7.9609 4.51837 7.88874 4.60625 7.79615 4.66805C7.70357 4.72986 7.59473 4.7628 7.48341 4.76271H0.733414C0.622163 4.76269 0.513417 4.72968 0.420927 4.66785C0.328438 4.60602 0.256358 4.51816 0.213805 4.41537ZM7.48341 10.3877H0.733414C0.622098 10.3876 0.513259 10.4206 0.420674 10.4824C0.32809 10.5442 0.255925 10.6321 0.213314 10.7349C0.170703 10.8377 0.159563 10.9509 0.181304 11.0601C0.203045 11.1692 0.256689 11.2695 0.335445 11.3482L3.71045 14.7232C3.76269 14.7755 3.82472 14.817 3.89301 14.8453C3.9613 14.8736 4.03449 14.8882 4.10841 14.8882C4.18234 14.8882 4.25553 14.8736 4.32382 14.8453C4.3921 14.817 4.45414 14.7755 4.50638 14.7232L7.88138 11.3482C7.96014 11.2695 8.01378 11.1692 8.03552 11.0601C8.05727 10.9509 8.04612 10.8377 8.00351 10.7349C7.9609 10.6321 7.88874 10.5442 7.79615 10.4824C7.70357 10.4206 7.59473 10.3876 7.48341 10.3877Z" fill="#AC72FF" />
                </svg>
              </button>
            </div>
          </div>
          {/* AUM */}
          <div>
            <div className="text-xl font-semibold  text-navy font-outfit leading-[35px] mb-1">{currentHeader.aum.value}</div>
            <div className="text-sm font-normal font-outfit text-gray leading-[20px]">{currentHeader.aum.label}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;




