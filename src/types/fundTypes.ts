// Base API Response
export interface FundApiResponse {
  success: boolean;
  message: string;
  data: FundData;
  statusCode: number;
}

// Main Fund Data
export interface FundData {
  fundDetails: FundDetails;
  assetAllocation: AssetAllocation;
  marketCap: MarketCap;
  creditQuality: CreditQuality;
  consistencyFactors: ConsistencyFactors;
  trendAnalysis: TrendAnalysis;
  rollingReturns: RollingReturns;
  pointToPoint: PointToPoint;
  bestWorst: BestWorst;
  ratios: Ratios;
  betterFunds: BetterFunds;
  ranking: Ranking;
  printSettings: PrintSettings;
}

// Fund Details
export interface FundDetails {
  fund_legal_name: string;
  fund_name: string;
  amc: string;
  isin: string;
  morningstar_category: string;
  inception_date: string;
  fund_size: string;
  fund_size_date: string;
  manager_name: string; // JSON string array
  average_manager_tenure: string;
  minimum_investment: number;
  minimum_additional_purchase: number;
  exit_load: string;
  net_expense_ratio: string;
  investment_strategy: string;
  india_risk_level: string;
  fund_type: 'Equity' | 'Fixed Income' | 'Alternative' | 'Allocation' | 'Commodities';
  purchase_mode: string;
  distribution_status: string;
  turnover_ratio: string;
  pe_ratio_ttm: string | null;
  trackError_36m: string;
  mod_duration: string | null;
  netYield: string | null;
  average_credit_quality: string | null;
  benchmark: string;
  infoRatio_36m: string;
}

// Asset Allocation
export interface AssetAllocation {
  Equity?: string;
  Bond?: string;
  Cash?: string;
  Other?: string;
  Commodity?: string;
}

// Market Cap
export interface MarketCap {
  Large?: string;
  Mid?: string;
  Small?: string;
  Micro?: string;
}

// Credit Quality
export interface CreditQuality {
  creditQualityBreakdown: {
    [key: string]: string; // e.g., "AAA": "85.97", "AA": "14.03"
  };
  creditQualityDate: string | null;
  averageCreditQuality: string | null;
}

// Consistency Factors
export interface ConsistencyFactors {
  success: boolean;
  data: {
    title: string;
    fundType: string;
    data: ConsistencyFactorData[];
    table: {
      headers: string[];
      rows: (string | null)[][];
    };
  };
}

export interface ConsistencyFactorData {
  cycles?: string;
  alpha?: string;
  return?: string;
  risk?: string;
  volatility?: string;
  quality?: string;
  yield?: string;
  fundType?: string;
}

// Trend Analysis
export interface TrendAnalysis {
  success: boolean;
  data: {
    title: string;
    fundType: string;
    rows: string[];
    columns: string[];
    leftSection?: TrendSection;
    rightSection?: TrendSection;
    section?: TrendSection; // For Fixed Income/Alternative
    allRatings: (string | null)[][];
    allValues: number[][];
  };
}

export interface TrendSection {
  title: string;
  columns: string[];
  colorScheme: string;
  ratings: (string | null)[][];
  values: number[][];
}

// Rolling Returns
export interface RollingReturns {
  success: boolean;
  data: {
    title: string;
    categories: string[];
    series: ChartSeries[];
  };
}

// Point to Point
export interface PointToPoint {
  success: boolean;
  data: {
    title: string;
    categories: string[];
    series: ChartSeries[];
  };
}

// Best/Worst
export interface BestWorst {
  success: boolean;
  data: {
    best: BestWorstData;
    worst: BestWorstData;
  };
}

export interface BestWorstData {
  title: string;
  categories: string[];
  series: ChartSeries[];
}

// Chart Series (reusable)
export interface ChartSeries {
  name: string;
  data: (number | null)[];
  color: string;
}

// Ratios
export interface Ratios {
  success: boolean;
  data: {
    riskVolatility: RatioData;
    tradeOffRatios: RatioData;
    marketCycle: RatioData;
    outperformance: RatioData;
  };
}

export interface RatioData {
  title: string;
  categories: string[];
  series: ChartSeries[];
}

// Better Funds
export interface BetterFunds {
  success: boolean;
  data: BetterFundCategory[];
}

export interface BetterFundCategory {
  column: string;
  value: string;
  fundList: FundListItem[];
}

export interface FundListItem {
  isin: string;
  fund_name: string;
  fund_legal_name: string;
  purchase_mode: string;
  fund_type: string;
  small_cap: string;
  mid_cap: string;
  large_cap: string;
}

// Ranking
export interface Ranking {
  success: boolean;
  data: {
    title: string;
    subtitle: string;
    rows: string[];
    columns: string[];
    values: number[][];
    colorIntensities: number[][];
    annotations: string[][];
    rawRankings: {
      [key: string]: number;
    };
    config: RankingConfig;
  };
}

export interface RankingConfig {
  colorMap: string;
  showColorBar: boolean;
  showAxisLabels: boolean;
  fontSize: number;
  figureSize: {
    width: number;
    height: number;
  };
  margins: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  printOptimized: boolean;
  pageBreakAvoid: boolean;
  containerHeight: string;
  minHeight: string;
  maxHeight: string;
}

// Print Settings
export interface PrintSettings {
  pageBreakAvoid: boolean;
  continuousLayout: boolean;
  optimizedForPrint: boolean;
  recommendedCSS: {
    containerClass: string;
    pageBreakInside: string;
    breakInside: string;
    marginBottom: string;
    maxWidth: string;
    overflow: string;
  };
  printMediaQuery: {
    fontSize: string;
    margins: string;
    chartHeight: string;
    pageOrientation: string;
  };
}

