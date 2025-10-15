export interface FundScheme {
  id: number;
  isin: string;
  fund_name: string;
  // Derived properties (hardcoded for now based on name patterns)
  fund_type: 'equity' | 'debt' | 'hybrid' | 'others';
  market_cap?: 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Others';
  plan_type: 'Direct' | 'Regular';
}

// Fund Details Type
export interface FundDetails {
  fund_legal_name: string;
  fund_name: string;
  amc: string;
  morningstar_category: string;
  inception_date: string;
  fund_size: string;
  fund_size_date: string;
  manager_name: string;
  average_manager_tenure: string;
  minimum_investment: number;
  minimum_additional_purchase: number;
  exit_load: string;
  net_expense_ratio: string;
  investment_strategy: string;
  india_risk_level: string;
  fund_type: string;
  purchase_mode: string;
  distribution_status: string;
  turnover_ratio: string;
  pe_ratio_ttm: string;
  trackError_36m: string | null;
  mod_duration: string | null;
  netYield: string;
  average_credit_quality: string;
  benchmark: string;
  infoRatio_36m: string | null;
}

// Asset Allocation Type
export interface AssetAllocation {
  Equity: string;
  Bond: string;
  Cash: string;
}

// Market Cap Type
export interface MarketCap {
  Large: string;
  Mid: string;
  Small: string;
  Micro: string;
}

// Credit Quality Type
export interface CreditQuality {
  creditQualityBreakdown: {
    AAA: string;
    AA: string;
  };
  creditQualityDate: string;
  averageCreditQuality: string;
}

// Consistency Factors Type
export interface ConsistencyFactors {
  success: boolean;
  data: {
    title: string;
    fundType: string;
    data: Array<{
      cycles?: string;
      alpha?: string;
      return?: string;
      risk?: string;
      volatility?: string;
      fundType?: string;
    }>;
    table: {
      headers: string[];
      rows: Array<Array<string | null>>;
    };
  };
}

// Trend Analysis Type
export interface TrendAnalysis {
  success: boolean;
  data: {
    title: string;
    fundType: string;
    rows: string[];
    columns: string[];
    leftSection: {
      title: string;
      columns: string[];
      colorScheme: string;
      ratings: Array<Array<number | null>>;
      values: number[][];
    };
    rightSection: {
      title: string;
      columns: string[];
      colorScheme: string;
      ratings: Array<Array<number | null>>;
      values: number[][];
    };
    allRatings: Array<Array<number | null>>;
    allValues: number[][];
  };
}

// Chart Series Type
export interface ChartSeries {
  name: string;
  data: Array<number | null>;
  color: string;
}

// Rolling Returns Type
export interface RollingReturns {
  success: boolean;
  data: {
    title: string;
    categories: string[];
    series: ChartSeries[];
  };
}

// Point to Point Type
export interface PointToPoint {
  success: boolean;
  data: {
    title: string;
    categories: string[];
    series: ChartSeries[];
  };
}

// Best/Worst Type
export interface BestWorst {
  success: boolean;
  data: {
    best: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
    worst: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
  };
}

// Ratios Type
export interface Ratios {
  success: boolean;
  data: {
    riskVolatility: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
    tradeOffRatios: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
    marketCycle: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
    outperformance: {
      title: string;
      categories: string[];
      series: ChartSeries[];
    };
  };
}

// Better Funds Type
export interface BetterFunds {
  success: boolean;
  data: Array<{
    column: string;
    value: number;
    fundList: any[];
  }>;
}

// Ranking Type
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
      Cycles: number;
      Alpha: number;
      Return: number;
      Risk: number;
      Volatility: number;
      Sharpe: number;
      Treynor: number;
      Information: number;
    };
    config: {
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
    };
  };
}

// Print Settings Type
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

// Main Fund Data Type
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

// Extract fund type from fund name
export function extractFundType(fundName: string): FundScheme['fund_type'] {
  const lowerName = fundName.toLowerCase();
  
  if (
    lowerName.includes('equity') ||
    lowerName.includes('elss') ||
    lowerName.includes('focused') ||
    lowerName.includes('value') ||
    lowerName.includes('dividend') ||
    lowerName.includes('growth') ||
    lowerName.includes('multicap') ||
    lowerName.includes('flexi cap') ||
    lowerName.includes('flexicap') ||
    lowerName.includes('index') ||
    lowerName.includes('large cap') ||
    lowerName.includes('mid cap') ||
    lowerName.includes('small cap') ||
    lowerName.includes('banking') ||
    lowerName.includes('pharma') ||
    lowerName.includes('healthcare') ||
    lowerName.includes('technology') ||
    lowerName.includes('infrastructure') ||
    lowerName.includes('fmcg') ||
    lowerName.includes('consumption') ||
    lowerName.includes('nifty') ||
    lowerName.includes('sensex')
  ) {
    return 'equity';
  }
  
  if (
    lowerName.includes('hybrid') ||
    lowerName.includes('balanced') ||
    lowerName.includes('advantage') ||
    lowerName.includes('arbitrage')
  ) {
    return 'hybrid';
  }
  
  if (
    lowerName.includes('debt') ||
    lowerName.includes('bond') ||
    lowerName.includes('gilt') ||
    lowerName.includes('liquid') ||
    lowerName.includes('overnight') ||
    lowerName.includes('ultra short') ||
    lowerName.includes('low duration') ||
    lowerName.includes('short duration') ||
    lowerName.includes('medium duration') ||
    lowerName.includes('long duration') ||
    lowerName.includes('dynamic bond') ||
    lowerName.includes('corporate bond') ||
    lowerName.includes('money market') ||
    lowerName.includes('floating rate')
  ) {
    return 'debt';
  }
  
  return 'others';
}

// Extract market cap from fund name
export function extractMarketCap(fundName: string): FundScheme['market_cap'] {
  const lowerName = fundName.toLowerCase();
  
  if (lowerName.includes('large cap') || lowerName.includes('largecap')) {
    return 'Large Cap';
  }
  
  if (lowerName.includes('mid cap') || lowerName.includes('midcap')) {
    return 'Mid Cap';
  }
  
  if (lowerName.includes('small cap') || lowerName.includes('smallcap')) {
    return 'Small Cap';
  }
  
  return 'Others';
}

// Extract plan type from fund name
export function extractPlanType(fundName: string): FundScheme['plan_type'] {
  const lowerName = fundName.toLowerCase();
  
  if (lowerName.includes('dir') || lowerName.includes('direct')) {
    return 'Direct';
  }
  
  return 'Regular';
}

// Transform raw API data into enriched fund schemes
export function transformFundData(rawData: { id: number; isin: string; fund_name: string }[]): FundScheme[] {
  return rawData.map(fund => ({
    ...fund,
    fund_type: extractFundType(fund.fund_name),
    market_cap: extractMarketCap(fund.fund_name),
    plan_type: extractPlanType(fund.fund_name),
  }));
}

// Filter funds based on search query and selected types
export function filterFunds(
  funds: FundScheme[],
  searchQuery: string,
  selectedTypes: string[]
): FundScheme[] {
  let filtered = funds;
  
  // Filter by fund type if any are selected
  if (selectedTypes.length > 0) {
    filtered = filtered.filter(fund => selectedTypes.includes(fund.fund_type));
  }
  
  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(fund => 
      fund.fund_name.toLowerCase().includes(query)
    );
  }
  
  return filtered;
}

// Filter funds by market cap
export function filterFundsByMarketCap(
  funds: FundScheme[],
  marketCap: string
): FundScheme[] {
  return funds.filter(fund => fund.market_cap === marketCap);
}

