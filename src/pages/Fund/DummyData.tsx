// Dummy data for Mutual Fund Details Page

export interface FundData {
  fundHeader: FundHeader;
  breadcrumb: Breadcrumb;
  smartFundPicks: SmartFundPick[];
  investmentReturns: InvestmentReturns;
  fixedIncomeAttributes: FixedIncomeAttributes;
  ratios: Ratios;
  assetAllocation: AssetAllocation;
  creditQuality: CreditQuality;
  holdings: Holdings;
  fundInformation: FundInformation;
  aboutFund: AboutFund;
  fundManagers: FundManager[];
  caarva: CAARVA;
  watchlist: Watchlist;
}

export interface FundHeader {
  name: string;
  tags: string[];
  nav: {
    value: string;
    date: string;
  };
  annualReturns: {
    period: string;
    value: string;
  };
  aum: {
    label: string;
    value: string;
  };
}

export interface Breadcrumb {
  items: { label: string; path: string }[];
}

export interface SmartFundPick {
  id: string;
  title: string;
  subtitle?: string;
  fundsCount: number;
}

export interface ChartDataByYear {
  [key: string]: {
    category: number;
    benchmark: number;
    fund: number;
  };
}

export interface PerformanceDataByYear {
  [key: string]: {
    bankAccount: number;
    gold: number;
    category: number;
    fund: number;
  };
}

export interface InvestmentReturns {
  tabs: string[];
  activeTab: string;
  subTabs: string[];
  activeSubTab: string;
  returnData: {
    percentage: string;
    period: string;
  };
  chartData: {
    category: number;
    benchmark: number;
    fund: number;
  };
  timePeriods: string[];
  activeTimePeriod: string;
  rollingReturnsData: ChartDataByYear;
  pointToPointData: ChartDataByYear;
  performanceData: PerformanceDataByYear;
}

export interface FixedIncomeAttributes {
  modifiedDuration: string;
  yieldToMaturity: string;
  averageCreditQuality: string;
}

export interface RatioMetrics {
  name: string;
  category: number;
  benchmark: number;
  fund: number;
}

export interface RatioSection {
  title: string;
  subtitle: string;
  metrics: RatioMetrics[];
}

export interface Ratios {
  tabs: string[];
  activeTab: string;
  riskVolatility: RatioSection;
  tradeOffRatios: RatioSection;
  marketCycle: RatioSection;
  outperformance: RatioSection;
}

export interface AssetAllocation {
  debt: string;
  others: string;
}

export interface CreditQuality {
  ratings: {
    name: string;
    percentage: string;
  }[];
}

export interface Holdings {
  tabs: string[];
  activeTab: string;
  list: {
    name: string;
    percentage: string;
  }[];
  totalCount: number;
}

export interface FundInformation {
  latestNav: string;
  expenseRatio: string;
  stampDuty: string;
  exitLoad: string;
  aum: string;
  lockInPeriod: string;
  minInvestment: {
    sip: string;
    lumpsum: string;
  };
}

export interface AboutFund {
  description: string;
  totalAum: string;
  launchDate: string;
}

export interface FundManager {
  name: string;
  since: string;
  avatar?: string;
}

export interface CAARVA {
  tabs: string[];
  activeTab: string;
  subTabs: string[];
  activeSubTab: string;
  chartData: {
    benchmark: number;
    fund: number;
  };
}

export interface Watchlist {
  title: string;
  description: string;
  illustrationText: string;
}

// Main Fund Data Object
export const fundData: FundData = {
  fundHeader: {
    name: "Nippon India Large Cap Fund Direct - Growth",
    tags: ["Debt", "Corporate Bond", "Direct"],
    nav: {
      value: "₹ 20.95",
      date: "NAV (₹) as on 05 Sep 2025",
    },
    annualReturns: {
      period: "3Y Annual Returns",
      value: "17.66%",
    },
    aum: {
      label: "AUM (Fund size)",
      value: "₹ 1,620 Cr",
    },
  },

  breadcrumb: {
    items: [
      { label: "Home", path: "/" },
      { label: "Mutual Funds", path: "/mutual-funds" },
      { label: "Nippon India", path: "/mutual-funds/nippon-india" },
      { label: "Nippon India Large Cap Fund Direct - Growth", path: "/fund" },
    ],
  },

  smartFundPicks: [
    {
      id: "all-parameters",
      title: "All Parameters",
      fundsCount: 20,
    },
    {
      id: "same-risk-higher-returns",
      title: "Same Risk, Higher",
      subtitle: "Returns",
      fundsCount: 10,
    },
    {
      id: "low-risk-similar-returns",
      title: "Low Risk,",
      subtitle: "Similar Returns",
      fundsCount: 5,
    },
    {
      id: "higher-returns-lower-risk",
      title: "Higher Returns,",
      subtitle: "Lower/Equal Risk",
      fundsCount: 5,
    },
    {
      id: "higher-risk-higher-returns",
      title: "Higher Risk, Higher",
      subtitle: "Returns",
      fundsCount: 10,
    },
  ],

  investmentReturns: {
    tabs: ["Returns", "Performance"],
    activeTab: "Returns",
    subTabs: ["Rolling Returns", "Point to Point"],
    activeSubTab: "Rolling Returns",
    returnData: {
      percentage: "17%",
      period: "4 years",
    },
    chartData: {
      category: 10,
      benchmark: 12,
      fund: 17,
    },
    timePeriods: ["1Y", "2Y", "3Y", "4Y", "5Y"],
    activeTimePeriod: "4Y",
    rollingReturnsData: {
      "1Y": {
        category: 8,
        benchmark: 10,
        fund: 12,
      },
      "2Y": {
        category: 9,
        benchmark: 11,
        fund: 14,
      },
      "3Y": {
        category: 9.5,
        benchmark: 11.5,
        fund: 15,
      },
      "4Y": {
        category: 10,
        benchmark: 12,
        fund: 17,
      },
      "5Y": {
        category: 11,
        benchmark: 13,
        fund: 18,
      },
    },
    pointToPointData: {
      "1Y": {
        category: 7,
        benchmark: 9,
        fund: 11,
      },
      "2Y": {
        category: 8.5,
        benchmark: 10.5,
        fund: 13,
      },
      "3Y": {
        category: 9,
        benchmark: 11,
        fund: 14.5,
      },
      "4Y": {
        category: 10,
        benchmark: 12,
        fund: 16,
      },
      "5Y": {
        category: 10.5,
        benchmark: 12.5,
        fund: 17.5,
      },
    },
    performanceData: {
      "1Y": {
        bankAccount: 4,
        gold: 6,
        category: 8,
        fund: 12,
      },
      "2Y": {
        bankAccount: 4.5,
        gold: 8,
        category: 11,
        fund: 16,
      },
      "3Y": {
        bankAccount: 5,
        gold: 10,
        category: 13,
        fund: 20,
      },
      "4Y": {
        bankAccount: 10,
        gold: 170,
        category: 190,
        fund: 220,
      },
      "5Y": {
        bankAccount: 6,
        gold: 14,
        category: 17,
        fund: 25,
      },
      "YTD": {
        bankAccount: 3,
        gold: 5,
        category: 7,
        fund: 10,
      },
    },
  },

  fixedIncomeAttributes: {
    modifiedDuration: "2.18",
    yieldToMaturity: "7.11",
    averageCreditQuality: "AAA",
  },

  ratios: {
    tabs: ["Risk & Volatility", "Trade-Off Ratios", "Market Cycle", "Outperformance"],
    activeTab: "Risk & Volatility",
    riskVolatility: {
      title: "Risk & Volatility",
      subtitle: "Lower the Better",
      metrics: [
        {
          name: "Std Dev",
          category: 0.2,
          benchmark: 0.32,
          fund: 0.48,
        },
        {
          name: "Down Dev",
          category: 0.2,
          benchmark: 0.31,
          fund: 0.52,
        },
        {
          name: "Beta",
          category: 0.2,
          benchmark: 0.3,
          fund: 0.82,
        },
      ],
    },
    tradeOffRatios: {
      title: "Trade-Off Ratios",
      subtitle: "Higher the Better",
      metrics: [
        {
          name: "Sharpe",
          category: 0.2,
          benchmark: 0.31,
          fund: 0.48,
        },
        {
          name: "Sortino",
          category: 0.2,
          benchmark: 0.3,
          fund: 0.52,
        },
        {
          name: "Treynor",
          category: 0.2,
          benchmark: 0.3,
          fund: 0.85,
        },
      ],
    },
    marketCycle: {
      title: "Market Cycle",
      subtitle: "Higher the Better",
      metrics: [
        {
          name: "Total Cap",
          category: 0.2,
          benchmark: 0.32,
          fund: 0.47,
        },
        {
          name: "Up Cap",
          category: 0.2,
          benchmark: 0.3,
          fund: 0.52,
        },
        {
          name: "Down Cap",
          category: 0.2,
          benchmark: 0.3,
          fund: 0.85,
        },
      ],
    },
    outperformance: {
      title: "Outperformance",
      subtitle: "Higher the Better",
      metrics: [
        {
          name: "Alpha",
          category: 0.015,
          benchmark: 0.015,
          fund: 0.02,
        },
      ],
    },
  },

  assetAllocation: {
    debt: "96.83%",
    others: "3.17%",
  },

  creditQuality: {
    ratings: [
      { name: "AAA", percentage: "97.40%" },
      { name: "AA", percentage: "2.60%" },
      { name: "A", percentage: "0%" },
      { name: "B", percentage: "0%" },
      { name: "BB", percentage: "0%" },
      { name: "BBB", percentage: "0%" },
      { name: "Below B", percentage: "0%" },
      { name: "Not Rated", percentage: "0%" },
    ],
  },

  holdings: {
    tabs: ["Holdings", "Sectors"],
    activeTab: "Holdings",
    list: [
      { name: "HDFC Bank Ltd", percentage: "9.43%" },
      { name: "Reliance Industries Ltd", percentage: "9.43%" },
      { name: "ICICI Bank Ltd", percentage: "9.43%" },
      { name: "HDFC Bank Ltd", percentage: "9.43%" },
      { name: "Other", percentage: "9.43%" },
    ],
    totalCount: 10,
  },

  fundInformation: {
    latestNav: "0.85%",
    expenseRatio: "0.85%",
    stampDuty: "0.005%",
    exitLoad: "1.0%",
    aum: "₹1,620 Cr",
    lockInPeriod: "Nil",
    minInvestment: {
      sip: "₹500",
      lumpsum: "₹5000",
    },
  },

  aboutFund: {
    description:
      "Kotak Mutual Fund is a part of India's leading financial service conglomerate Kotak Mahindra Group (est. 1985). In 2003, the Kotak Mahindra Group's flagship company received a banking license. Kotak Mahindra Mutual Fund started its operations in 1998.",
    totalAum: "₹ 20.95 Crores",
    launchDate: "22 June 1993",
  },

  fundManagers: [
    {
      name: "Amit Rawat",
      since: "Since Sep 2018",
    },
    {
      name: "Amit Rawat",
      since: "Since Sep 2018",
    },
  ],

  caarva: {
    tabs: ["Return", "Risk", "Yield", "Quality"],
    activeTab: "Return",
    subTabs: ["Consistency", "Trend"],
    activeSubTab: "Consistency",
    chartData: {
      benchmark: 51,
      fund: 100,
    },
  },

  watchlist: {
    title: "Your Watchlist",
    description: "Add funds to your watchlist to track them all in one place.",
    illustrationText: "The funds are hiding. Pick a Smart Fund card to uncover them.",
  },
};

// Additional data arrays for extended usage

export const allTimePeriods = ["1Y", "2Y", "3Y", "4Y", "5Y"];

export const riskVolatilityLegend = [
  { label: "Category", color: "#CBD5E1" },
  { label: "Benchmark", color: "#64748B" },
  { label: "Fund", color: "#8B5CF6" },
];

export const tooltipData = {
  stdDev: "Category: 0.1, Benchmark: 0.2, Fund: 0.3",
  downDev: "Category: 0.1, Benchmark: 0.2, Fund: 0.3",
  beta: "Category: 0.1, Benchmark: 0.2, Fund: 0.3",
};

// Export default fund data
export default fundData;

