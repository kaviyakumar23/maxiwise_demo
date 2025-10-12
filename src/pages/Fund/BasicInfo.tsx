import React, { useState } from "react";
import { fundData } from "./DummyData";
import CaretUpDown from "../../assets/images/CaretUpDown.svg";
import NipponLogo from "../../assets/images/Nippon India Mutual Fund.png"

const BasicInfo: React.FC = () => {
  const { fundHeader } = fundData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                {fundHeader.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#64748B] font-outfit font-normal">
                {fundHeader.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <span className="text-sm">{tag}</span>
                    {index < fundHeader.tags.length - 1 && (
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
              className="p-1 hover:bg-white/50 rounded-lg transition-colors"
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
                className="p-1 hover:bg-white/50 rounded-lg transition-colors"
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
                    className="w-full px-4 py-2 text-left text-navy hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => setIsMenuOpen(false)}
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
              {fundHeader.nav.value}
            </div>
            <div className="text-sm font-normal font-outfit text-[#64748B]">
              {fundHeader.nav.date}
            </div>
          </div>

          {/* Annual Returns */}
          <div>
            <div className="text-lg font-semibold text-[#8B5CF6] font-outfit mb-1">
              {fundHeader.annualReturns.value}
            </div>
            <div className="text-sm font-normal font-outfit text-[#64748B] flex items-center gap-0">
              <span>{fundHeader.annualReturns.period}</span>
              {/* <svg className="w-5 h-5 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0l3 4H5l3-4zm0 16l-3-4h6l-3 4z"/>
              </svg> */}
              <img src={CaretUpDown} alt="Caret Up Down" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:block bg-white px-20 pt-16 rounded-lg">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-8">
          {/* Left: Logo + Fund Name + Tags */}
          <div className="flex items-start gap-4 mb-6">
            <img src={NipponLogo} alt="Nippon Logo" className="w-12 h-12 rounded-lg" />
            {/* Fund Name and Tags */}
            <div>
              <h1 className="text-2xl font-semibold text-navy font-outfit leading-[32px] mb-2">
                {fundHeader.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#64748B] font-outfit font-normal leading-[20px] tracking-[-0.6%]">
                {fundHeader.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <span className="text-sm text-gray-600">{tag}</span>
                    {index < fundHeader.tags.length - 1 && (
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
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
        <div className="flex items-start gap-12 px-2">
          <div>
            <div className="text-xl font-semibold text-navy font-outfit leading-[35px] mb-1">
              {fundHeader.nav.value}
            </div>
            <div className="text-sm font-normal font-outfit text-gray leading-[20px]">{fundHeader.nav.date}</div>
          </div>
          {/* Annual Returns */}
          <div>
            <div className="text-xl font-semibold  text-purple font-outfit leading-[35px]0 mb-1">{fundHeader.annualReturns.value}</div>
            <div className="text-smfont-normal font-outfit text-gray leading-[20px] flex items-start gap-1">
              {fundHeader.annualReturns.period}
              <svg className="w-5 h-5 text-purple" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0l3 4H5l3-4zm0 16l-3-4h6l-3 4z"/>
              </svg>
            </div>
          </div>
          {/* AUM */}
          <div>
            <div className="text-xl font-semibold  text-navy font-outfit leading-[35px] mb-1">{fundHeader.aum.value}</div>
            <div className="text-sm font-normal font-outfit text-gray leading-[20px]">{fundHeader.aum.label}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;




