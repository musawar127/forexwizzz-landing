/**
 * XAUUSD Margin Calculator & Gold Leverage Tool — Pure Calculation Module
 *
 * Contains all mathematical logic for XAUUSD/gold margin calculations.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Standard model:
 *   ExposureOunces = Lots × ContractSize
 *   NotionalUSD    = Lots × ContractSize × GoldPrice
 *   Margin (leverage)  = NotionalUSD / LeverageDenominator
 *   Margin (margin rate) = NotionalUSD × (MarginRatePercent / 100)
 *
 * Broker accuracy: this is a transparent estimation model. Real brokers may
 * use symbol-specific leverage, tiered margin, hedged-position rules, etc.
 */

export type MarginMethod = "LEVERAGE" | "MARGIN_RATE";
export type CalculatorMode = "REQUIRED_MARGIN" | "MAX_LOTS" | "COMPARISON";

export interface MarginInputs {
  mode: CalculatorMode;
  /** Gold price in USD per ounce (XAUUSD). Must be > 0. */
  goldPrice: number;
  /** Trade size in lots. Must be > 0 (REQUIRED_MARGIN / COMPARISON). */
  lots?: number;
  /** Contract size in ounces per 1.00 lot. Must be > 0. Default 100. */
  contractSize: number;
  /** Margin method. */
  method: MarginMethod;
  /** Leverage denominator (e.g. 100 for 1:100). Required if method=LEVERAGE. */
  leverage?: number;
  /** Margin rate percentage (e.g. 0.5 for 0.5%). Required if method=MARGIN_RATE. */
  marginRatePercent?: number;
  /** Account currency code (e.g. "USD"). */
  accountCurrency: string;
  /** USD → account currency conversion rate (how many account units = 1 USD). */
  conversionRate: number;
  /** ---- Advanced account metrics (optional) ---- */
  /** Account equity in account currency. >= 0. */
  equity?: number | null;
  /** Existing used margin in account currency. >= 0. */
  existingUsedMargin?: number | null;
  /** ---- Max-lots mode inputs ---- */
  /** Available margin to allocate (account currency). >= 0 (MAX_LOTS). */
  availableMargin?: number;
  /** Minimum lot size. > 0. Default 0.01. */
  minLot?: number;
  /** Lot step. > 0. Default 0.01. */
  lotStep?: number;
}

export interface NotionalResult {
  /** Exposure in troy ounces. */
  exposureOunces: number;
  /** Notional exposure in USD. */
  notionalUSD: number;
}

export interface MarginResult {
  valid: boolean;
  error?: string;
  mode: CalculatorMode;
  method: MarginMethod;
  /** Notional exposure. */
  exposureOunces: number;
  notionalUSD: number;
  /** Required margin in USD. */
  marginUSD: number;
  /** Required margin in account currency. */
  marginAccount: number;
  /** Effective leverage denominator (input or equivalent from margin rate). */
  effectiveLeverage: number;
  /** Equivalent margin rate % (input or equivalent from leverage). */
  equivalentMarginRatePercent: number;
  /** Margin per 0.01 lot in account currency. */
  marginPer001Lot: number;
  /** Margin per 0.10 lot in account currency. */
  marginPer010Lot: number;
  /** Margin per 1.00 lot in account currency. */
  marginPer100Lot: number;
  /** Account metrics (if equity supplied). */
  account?: AccountMetrics;
}

export interface AccountMetrics {
  equity: number;
  existingUsedMargin: number;
  newRequiredMargin: number;
  newUsedMargin: number;
  freeMarginAfter: number;
  /** Equity / NewUsedMargin × 100. null if newUsedMargin <= 0. */
  marginLevelPercent: number | null;
  /** NewUsedMargin / Equity × 100. null if equity <= 0. */
  marginUsagePercent: number | null;
  /** NewRequiredMargin / Equity × 100. null if equity <= 0. */
  positionMarginPercent: number | null;
  /** True if existing used margin already exceeds equity. */
  usedMarginExceedsEquity: boolean;
  /** True if free margin after planned position is negative. */
  freeMarginNegative: boolean;
}

export interface MaxLotsResult {
  valid: boolean;
  error?: string;
  /** Raw mathematical lots before broker rounding. */
  rawLots: number;
  /** Lots rounded DOWN to the lot step. */
  brokerStepLots: number;
  /** Estimated margin used at brokerStepLots (account currency). */
  marginUsedAtRounded: number;
  /** Unused margin allocation (account currency). */
  unusedMargin: number;
  /** Margin per 1 lot in account currency. */
  marginPerLotAccount: number;
  /** True if rawLots is below the minimum lot. */
  belowMinimum: boolean;
}

export interface ComparisonRow {
  leverage: number;
  marginRatePercent: number;
  notionalUSD: number;
  marginUSD: number;
  marginAccount: number;
}

export interface ComparisonResult {
  valid: boolean;
  error?: string;
  rows: ComparisonRow[];
  exposureOunces: number;
  notionalUSD: number;
}

/* ------------------------------------------------------------------ */
/*  FLOATING-POINT SAFE ROUNDING (display only)                        */
/* ------------------------------------------------------------------ */

export function roundTo(value: number, decimals: number): number {
  if (!isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Number((Math.round(value * factor) / factor).toFixed(decimals));
}

export function smartRound(value: number): number {
  if (!isFinite(value)) return NaN;
  const abs = Math.abs(value);
  if (abs === 0) return 0;
  if (abs >= 1000) return roundTo(value, 2);
  if (abs >= 1) return roundTo(value, 2);
  if (abs >= 0.01) return roundTo(value, 4);
  return roundTo(value, 8);
}

/**
 * Round lots DOWN to the nearest multiple of lotStep.
 * Mathematically safe downward rounding — never rounds up.
 * Handles floating-point artifacts (e.g. 0.30000000000000004).
 */
export function roundLotsDownToStep(lots: number, lotStep: number): number {
  if (!isFinite(lots) || !isFinite(lotStep) || lotStep <= 0 || lots <= 0) return 0;
  // Use string-based rounding to avoid float artifacts
  const stepsCount = Math.floor(lots / lotStep + 1e-9);
  const rounded = stepsCount * lotStep;
  // Clean up float artifacts by rounding to the step's decimal precision
  const stepDecimals = (lotStep.toString().split(".")[1] || "").length;
  return roundTo(rounded, stepDecimals);
}

/* ------------------------------------------------------------------ */
/*  NOTIONAL EXPOSURE                                                  */
/* ------------------------------------------------------------------ */

export function calculateNotionalExposure(
  lots: number,
  contractSize: number,
  goldPrice: number,
): NotionalResult {
  return {
    exposureOunces: lots * contractSize,
    notionalUSD: lots * contractSize * goldPrice,
  };
}

/* ------------------------------------------------------------------ */
/*  LEVERAGE ↔ MARGIN RATE CONVERSIONS                                 */
/* ------------------------------------------------------------------ */

/** Equivalent margin rate % = 100 / leverage. */
export function calculateEquivalentMarginRate(leverage: number): number {
  if (!isFinite(leverage) || leverage <= 0) return NaN;
  return 100 / leverage;
}

/** Equivalent leverage = 100 / marginRatePercent. */
export function calculateEquivalentLeverage(marginRatePercent: number): number {
  if (!isFinite(marginRatePercent) || marginRatePercent <= 0) return NaN;
  return 100 / marginRatePercent;
}

/* ------------------------------------------------------------------ */
/*  REQUIRED MARGIN (single method)                                    */
/* ------------------------------------------------------------------ */

/**
 * Required margin in USD from leverage method.
 * MarginUSD = NotionalUSD / Leverage
 */
export function calculateMarginFromLeverage(
  notionalUSD: number,
  leverage: number,
): number {
  if (!isFinite(leverage) || leverage <= 0) return NaN;
  return notionalUSD / leverage;
}

/**
 * Required margin in USD from margin-rate method.
 * MarginUSD = NotionalUSD × (MarginRatePercent / 100)
 */
export function calculateMarginFromRate(
  notionalUSD: number,
  marginRatePercent: number,
): number {
  if (!isFinite(marginRatePercent) || marginRatePercent < 0) return NaN;
  return notionalUSD * (marginRatePercent / 100);
}

/* ------------------------------------------------------------------ */
/*  ACCOUNT CURRENCY CONVERSION                                        */
/* ------------------------------------------------------------------ */

/**
 * Convert USD margin to account currency.
 * MarginAccount = MarginUSD × ConversionRate
 */
export function convertUsdMarginToAccountCurrency(
  marginUSD: number,
  conversionRate: number,
): number {
  if (!isFinite(conversionRate) || conversionRate <= 0) return NaN;
  return marginUSD * conversionRate;
}

/* ------------------------------------------------------------------ */
/*  ACCOUNT METRICS (free margin, margin level, usage)                 */
/* ------------------------------------------------------------------ */

export function calculateAccountMarginMetrics(
  equity: number,
  existingUsedMargin: number,
  newRequiredMargin: number,
): AccountMetrics {
  const newUsedMargin = existingUsedMargin + newRequiredMargin;
  const freeMarginAfter = equity - newUsedMargin;
  const usedMarginExceedsEquity = existingUsedMargin > equity;
  const freeMarginNegative = freeMarginAfter < 0;

  const marginLevelPercent = newUsedMargin > 0 ? (equity / newUsedMargin) * 100 : null;
  const marginUsagePercent = equity > 0 ? (newUsedMargin / equity) * 100 : null;
  const positionMarginPercent = equity > 0 ? (newRequiredMargin / equity) * 100 : null;

  return {
    equity,
    existingUsedMargin,
    newRequiredMargin,
    newUsedMargin,
    freeMarginAfter,
    marginLevelPercent,
    marginUsagePercent,
    positionMarginPercent,
    usedMarginExceedsEquity,
    freeMarginNegative,
  };
}

/* ------------------------------------------------------------------ */
/*  MAX LOTS FROM MARGIN                                               */
/* ------------------------------------------------------------------ */

export function calculateMaxLotsFromMargin(
  goldPrice: number,
  contractSize: number,
  method: MarginMethod,
  leverage: number | undefined,
  marginRatePercent: number | undefined,
  availableMargin: number,
  conversionRate: number,
  minLot: number,
  lotStep: number,
): MaxLotsResult | { error: string } {
  // Validate
  if (!isFinite(goldPrice) || goldPrice <= 0) return { error: "Gold price must be a positive finite number." };
  if (!isFinite(contractSize) || contractSize <= 0) return { error: "Contract size must be a positive finite number." };
  if (!isFinite(availableMargin) || availableMargin < 0) return { error: "Available margin must be a finite non-negative number." };
  if (!isFinite(conversionRate) || conversionRate <= 0) return { error: "Conversion rate must be a positive finite number." };
  if (!isFinite(minLot) || minLot <= 0) return { error: "Minimum lot must be a positive number." };
  if (!isFinite(lotStep) || lotStep <= 0) return { error: "Lot step must be a positive number." };

  // Margin per 1 lot in USD
  const notionalPerLot = goldPrice * contractSize; // 1 lot × contractSize × price
  let marginPerLotUSD: number;
  if (method === "LEVERAGE") {
    if (leverage == null || !isFinite(leverage) || leverage <= 0) return { error: "Leverage must be a positive number." };
    marginPerLotUSD = notionalPerLot / leverage;
  } else {
    if (marginRatePercent == null || !isFinite(marginRatePercent) || marginRatePercent <= 0) return { error: "Margin rate must be a positive number." };
    marginPerLotUSD = notionalPerLot * (marginRatePercent / 100);
  }
  // Convert to account currency
  const marginPerLotAccount = marginPerLotUSD * conversionRate;
  if (marginPerLotAccount <= 0) return { error: "Margin per lot must be positive." };

  // Raw lots
  const rawLots = availableMargin / marginPerLotAccount;
  // Round down to step
  const brokerStepLots = roundLotsDownToStep(rawLots, lotStep);
  // Margin used at rounded lots
  const marginUsedAtRounded = brokerStepLots * marginPerLotAccount;
  // Unused margin
  const unusedMargin = availableMargin - marginUsedAtRounded;
  // Below minimum?
  const belowMinimum = brokerStepLots < minLot;

  return {
    valid: true,
    rawLots,
    brokerStepLots,
    marginUsedAtRounded,
    unusedMargin,
    marginPerLotAccount,
    belowMinimum,
  };
}

/* ------------------------------------------------------------------ */
/*  LEVERAGE COMPARISON TABLE                                          */
/* ------------------------------------------------------------------ */

export const COMPARISON_LEVERAGES = [20, 30, 50, 100, 200, 500, 1000];

export function buildLeverageComparison(
  goldPrice: number,
  lots: number,
  contractSize: number,
  conversionRate: number,
  customLeverage?: number,
): ComparisonResult | { error: string } {
  if (!isFinite(goldPrice) || goldPrice <= 0) return { error: "Gold price must be a positive finite number." };
  if (!isFinite(lots) || lots <= 0) return { error: "Lots must be a positive finite number." };
  if (!isFinite(contractSize) || contractSize <= 0) return { error: "Contract size must be a positive finite number." };
  if (!isFinite(conversionRate) || conversionRate <= 0) return { error: "Conversion rate must be a positive finite number." };

  const { exposureOunces, notionalUSD } = calculateNotionalExposure(lots, contractSize, goldPrice);

  const leverages = [...COMPARISON_LEVERAGES];
  if (customLeverage != null && isFinite(customLeverage) && customLeverage > 0 && !leverages.includes(customLeverage)) {
    leverages.push(customLeverage);
    leverages.sort((a, b) => a - b);
  }

  const rows: ComparisonRow[] = leverages.map((lev) => {
    const marginUSD = notionalUSD / lev;
    return {
      leverage: lev,
      marginRatePercent: 100 / lev,
      notionalUSD,
      marginUSD,
      marginAccount: marginUSD * conversionRate,
    };
  });

  return { valid: true, rows, exposureOunces, notionalUSD };
}

/* ------------------------------------------------------------------ */
/*  VALIDATION + MAIN ENTRY POINT                                      */
/* ------------------------------------------------------------------ */

export function validateMarginInputs(inputs: MarginInputs): string | null {
  const { mode, goldPrice, contractSize, method, accountCurrency, conversionRate } = inputs;

  if (!isFinite(goldPrice) || goldPrice <= 0) return "Gold price must be a positive finite number.";
  if (!isFinite(contractSize) || contractSize <= 0) return "Contract size must be a positive finite number.";
  if (!accountCurrency || accountCurrency.length !== 3) return "Account currency must be a 3-letter code.";
  if (!isFinite(conversionRate) || conversionRate <= 0) return "Conversion rate must be a positive finite number.";

  if (method !== "LEVERAGE" && method !== "MARGIN_RATE") return "Margin method must be Leverage or Margin Rate.";

  if (method === "LEVERAGE") {
    if (inputs.leverage == null || !isFinite(inputs.leverage) || inputs.leverage <= 0) {
      return "Effective XAUUSD leverage must be a positive number.";
    }
  } else {
    if (inputs.marginRatePercent == null || !isFinite(inputs.marginRatePercent) || inputs.marginRatePercent <= 0) {
      return "Margin rate must be a positive number.";
    }
    if (inputs.marginRatePercent > 100) {
      return "Margin rate cannot exceed 100%.";
    }
  }

  if (mode === "REQUIRED_MARGIN" || mode === "COMPARISON") {
    if (inputs.lots == null || !isFinite(inputs.lots) || inputs.lots <= 0) {
      return "Lots must be a positive finite number.";
    }
  }

  if (mode === "MAX_LOTS") {
    if (inputs.availableMargin == null || !isFinite(inputs.availableMargin) || inputs.availableMargin < 0) {
      return "Available margin must be a finite non-negative number.";
    }
    if (inputs.minLot != null && (!isFinite(inputs.minLot) || inputs.minLot <= 0)) {
      return "Minimum lot must be a positive number.";
    }
    if (inputs.lotStep != null && (!isFinite(inputs.lotStep) || inputs.lotStep <= 0)) {
      return "Lot step must be a positive number.";
    }
  }

  // Account metrics (optional)
  if (inputs.equity != null) {
    if (!isFinite(inputs.equity) || inputs.equity < 0) return "Account equity must be a finite non-negative number.";
  }
  if (inputs.existingUsedMargin != null) {
    if (!isFinite(inputs.existingUsedMargin) || inputs.existingUsedMargin < 0) return "Existing used margin must be a finite non-negative number.";
  }

  return null;
}

export function calculateMargin(inputs: MarginInputs): MarginResult {
  const validationError = validateMarginInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      mode: inputs.mode,
      method: inputs.method,
      exposureOunces: 0,
      notionalUSD: 0,
      marginUSD: 0,
      marginAccount: 0,
      effectiveLeverage: 0,
      equivalentMarginRatePercent: 0,
      marginPer001Lot: 0,
      marginPer010Lot: 0,
      marginPer100Lot: 0,
    };
  }

  const { goldPrice, contractSize, method, conversionRate } = inputs;
  const lots = inputs.lots ?? 0;

  // Notional
  const { exposureOunces, notionalUSD } = calculateNotionalExposure(lots, contractSize, goldPrice);

  // Margin
  let marginUSD: number;
  let effectiveLeverage: number;
  let equivalentMarginRatePercent: number;

  if (method === "LEVERAGE") {
    const lev = inputs.leverage!;
    marginUSD = calculateMarginFromLeverage(notionalUSD, lev);
    effectiveLeverage = lev;
    equivalentMarginRatePercent = calculateEquivalentMarginRate(lev);
  } else {
    const rate = inputs.marginRatePercent!;
    marginUSD = calculateMarginFromRate(notionalUSD, rate);
    equivalentMarginRatePercent = rate;
    effectiveLeverage = calculateEquivalentLeverage(rate);
  }

  // Account currency
  const marginAccount = convertUsdMarginToAccountCurrency(marginUSD, conversionRate);

  // Margin per standard lot sizes
  const notional001 = 0.01 * contractSize * goldPrice;
  const notional010 = 0.10 * contractSize * goldPrice;
  const notional100 = 1.00 * contractSize * goldPrice;
  const marginPer001Lot = convertUsdMarginToAccountCurrency(
    method === "LEVERAGE"
      ? calculateMarginFromLeverage(notional001, inputs.leverage!)
      : calculateMarginFromRate(notional001, inputs.marginRatePercent!),
    conversionRate,
  );
  const marginPer010Lot = convertUsdMarginToAccountCurrency(
    method === "LEVERAGE"
      ? calculateMarginFromLeverage(notional010, inputs.leverage!)
      : calculateMarginFromRate(notional010, inputs.marginRatePercent!),
    conversionRate,
  );
  const marginPer100Lot = convertUsdMarginToAccountCurrency(
    method === "LEVERAGE"
      ? calculateMarginFromLeverage(notional100, inputs.leverage!)
      : calculateMarginFromRate(notional100, inputs.marginRatePercent!),
    conversionRate,
  );

  // Account metrics (optional)
  let account: AccountMetrics | undefined;
  if (inputs.equity != null && inputs.existingUsedMargin != null) {
    account = calculateAccountMarginMetrics(
      inputs.equity,
      inputs.existingUsedMargin,
      marginAccount,
    );
  }

  return {
    valid: true,
    mode: inputs.mode,
    method: inputs.method,
    exposureOunces,
    notionalUSD,
    marginUSD,
    marginAccount,
    effectiveLeverage,
    equivalentMarginRatePercent,
    marginPer001Lot,
    marginPer010Lot,
    marginPer100Lot,
    account,
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: MarginInputs = {
  mode: "REQUIRED_MARGIN",
  goldPrice: 4000,
  lots: 0.01,
  contractSize: 100,
  method: "LEVERAGE",
  leverage: 100,
  marginRatePercent: undefined,
  accountCurrency: "USD",
  conversionRate: 1,
  equity: null,
  existingUsedMargin: null,
  availableMargin: undefined,
  minLot: 0.01,
  lotStep: 0.01,
};

export const LEVERAGE_PRESETS = [20, 30, 50, 100, 200, 500, 1000];

/** Illustrative example table data (spec §25): gold $4,000, 100 oz contract. */
export const ILLUSTRATIVE_TABLE = [
  { lots: 0.01, ounces: 1, notional: 4000, margin100: 40, margin500: 8 },
  { lots: 0.10, ounces: 10, notional: 40000, margin100: 400, margin500: 80 },
  { lots: 1.00, ounces: 100, notional: 400000, margin100: 4000, margin500: 800 },
];
