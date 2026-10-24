/**
 * Forex Position Size Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for forex position sizing.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Core formulas:
 *   Risk Amount = Account Equity × Risk Percentage / 100
 *   Pip Value (quote) = Pip Size × Contract Size
 *   Pip Value (account) = Pip Value (quote) × Conversion Rate
 *   Lots = Risk Budget / (Stop Pips × Pip Value per Lot + Costs per Lot)
 *
 * Broker rounding: always round DOWN to lot step, never exceed risk budget.
 */

export type Direction = "BUY" | "SELL";
export type CalculatorMode = "QUICK" | "ENTRY_STOP" | "ADVANCED";
export type RiskType = "PERCENTAGE" | "FIXED";

/* ------------------------------------------------------------------ */
/*  CORE TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface PositionSizeInputs {
  mode: CalculatorMode;
  // Account
  accountEquity: number;
  accountCurrency: string;
  riskType: RiskType;
  riskPercentage?: number; // when riskType = PERCENTAGE
  riskAmount?: number; // when riskType = FIXED
  // Trade
  pair: string;
  direction: Direction;
  stopLossPips: number;
  entryPrice?: number; // for ENTRY_STOP mode
  stopLossPrice?: number; // for ENTRY_STOP mode
  // Contract specs
  contractSize: number; // units per standard lot (default 100000)
  pipSize: number; // 0.0001 or 0.01 for JPY
  // Conversion
  conversionRate: number; // quote-to-account currency rate (1 if same)
  conversionDirection?: string; // e.g. "1 GBP = 1.25 USD"
  // Broker settings
  minLot: number;
  maxLot: number;
  lotStep: number;
  // Costs
  commissionPerLot?: number; // round-trip per standard lot, in account currency
  slippagePips?: number;
  additionalCosts?: number; // flat, in account currency
}

export interface PositionSizeResult {
  valid: boolean;
  error?: string;
  mode: CalculatorMode;
  pair: string;
  direction: Direction;
  // Risk
  riskAmount: number;
  riskPercentage: number;
  // Pip value
  pipValuePerLotQuote: number;
  pipValuePerLotAccount: number;
  // Stop loss
  stopLossPips: number;
  calculatedPipDistance?: number; // for ENTRY_STOP mode
  // Costs
  costPerLot: number;
  commissionPerLot: number;
  slippageCostPerLot: number;
  additionalCosts: number;
  // Position size
  rawLots: number;
  brokerLots: number;
  // Outputs
  baseCurrencyUnits: number;
  miniLots: number;
  microLots: number;
  moneyAtRisk: number;
  pipValueAtSize: number;
  estimatedStopLossAmount: number;
  unusedRiskBudget: number;
  // Validation
  withinBrokerLimits: boolean;
  brokerMessage?: string;
  // Breakdown
  breakdown: CalculationStep[];
}

export interface CalculationStep {
  label: string;
  value: string;
}

/* ------------------------------------------------------------------ */
/*  FLOATING-POINT SAFE ROUNDING                                       */
/* ------------------------------------------------------------------ */

export function roundTo(value: number, decimals: number): number {
  if (!isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Number((Math.round(value * factor) / factor).toFixed(decimals));
}

const EPSILON = 1e-9;

/* ------------------------------------------------------------------ */
/*  PAIR PRESETS                                                       */
/* ------------------------------------------------------------------ */

export interface PairPreset {
  pair: string;
  label: string;
  pipSize: number;
  contractSize: number;
  quoteCurrency: string;
}

export const PAIR_PRESETS: PairPreset[] = [
  { pair: "EURUSD", label: "EUR/USD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "USD" },
  { pair: "GBPUSD", label: "GBP/USD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "USD" },
  { pair: "AUDUSD", label: "AUD/USD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "USD" },
  { pair: "NZDUSD", label: "NZD/USD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "USD" },
  { pair: "USDJPY", label: "USD/JPY", pipSize: 0.01, contractSize: 100000, quoteCurrency: "JPY" },
  { pair: "USDCHF", label: "USD/CHF", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "CHF" },
  { pair: "USDCAD", label: "USD/CAD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "CAD" },
  { pair: "EURGBP", label: "EUR/GBP", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "GBP" },
  { pair: "EURJPY", label: "EUR/JPY", pipSize: 0.01, contractSize: 100000, quoteCurrency: "JPY" },
  { pair: "GBPJPY", label: "GBP/JPY", pipSize: 0.01, contractSize: 100000, quoteCurrency: "JPY" },
  { pair: "EURAUD", label: "EUR/AUD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "AUD" },
  { pair: "AUDJPY", label: "AUD/JPY", pipSize: 0.01, contractSize: 100000, quoteCurrency: "JPY" },
  { pair: "EURCHF", label: "EUR/CHF", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "CHF" },
  { pair: "GBPCHF", label: "GBP/CHF", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "CHF" },
  { pair: "NZDJPY", label: "NZD/JPY", pipSize: 0.01, contractSize: 100000, quoteCurrency: "JPY" },
  { pair: "AUDCAD", label: "AUD/CAD", pipSize: 0.0001, contractSize: 100000, quoteCurrency: "CAD" },
];

export const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"];

export function getPairPreset(pair: string): PairPreset | null {
  return PAIR_PRESETS.find((p) => p.pair === pair) ?? null;
}

export function getDefaultPipSize(pair: string): number {
  const preset = getPairPreset(pair);
  if (preset) return preset.pipSize;
  // JPY pairs end with JPY
  if (pair.length === 6 && pair.endsWith("JPY")) return 0.01;
  return 0.0001;
}

export function getDefaultContractSize(pair: string): number {
  return 100000;
}

export function getQuoteCurrency(pair: string): string {
  if (pair.length !== 6) return "";
  return pair.substring(3, 6).toUpperCase();
}

export function getBaseCurrency(pair: string): string {
  if (pair.length !== 6) return "";
  return pair.substring(0, 3).toUpperCase();
}

/**
 * Determine if conversion is needed and what direction.
 * Returns a description string, or empty if no conversion needed.
 *
 * For quote = account: no conversion needed (rate = 1).
 * For base = account: user enters 1 / pair_price (e.g. USD/JPY at 150 → 1/150 = 0.00667).
 * For third-currency: user enters the quote-to-account rate directly.
 */
export function getConversionDirection(pair: string, accountCurrency: string): string {
  const quote = getQuoteCurrency(pair);
  const base = getBaseCurrency(pair);
  const acct = accountCurrency.toUpperCase();

  if (quote === acct) return ""; // no conversion needed
  if (base === acct) {
    return `Enter 1 divided by the current ${pair} price. For example, if ${pair} is trading at 150.00, enter ${roundTo(1 / 150, 8)} (1 / 150.00). This converts ${quote} pip values into ${acct}.`;
  }
  return `Enter the ${quote}-to-${acct} conversion rate (how many ${acct} per 1 ${quote}).`;
}

/* ------------------------------------------------------------------ */
/*  PIPE DISTANCE FROM PRICES                                          */
/* ------------------------------------------------------------------ */

export function calculatePipDistance(
  entry: number,
  stop: number,
  pipSize: number,
  direction: Direction,
): { pips: number; error?: string } {
  if (!isFinite(entry) || entry <= 0) return { pips: 0, error: "Entry price must be a positive number." };
  if (!isFinite(stop) || stop <= 0) return { pips: 0, error: "Stop-loss price must be a positive number." };
  if (pipSize <= 0) return { pips: 0, error: "Pip size must be positive." };

  const distance = Math.abs(entry - stop);
  if (distance < EPSILON) return { pips: 0, error: "Entry and stop-loss prices cannot be the same." };

  // Validate direction
  if (direction === "BUY" && stop >= entry) {
    return { pips: 0, error: "For a BUY, the stop-loss should be below the entry price." };
  }
  if (direction === "SELL" && stop <= entry) {
    return { pips: 0, error: "For a SELL, the stop-loss should be above the entry price." };
  }

  return { pips: distance / pipSize };
}

/* ------------------------------------------------------------------ */
/*  BROKER LOT ROUNDING                                                */
/* ------------------------------------------------------------------ */

/**
 * Round lots DOWN to the nearest valid broker volume step,
 * anchored at minLot: valid lots = minLot + n × lotStep (n ≥ 0).
 *
 * If lots < minLot, returns 0 (no valid position).
 * Never rounds upward. Handles floating-point artifacts.
 */
export function roundLotsDownToGrid(lots: number, minLot: number, lotStep: number): number {
  if (!isFinite(lots) || !isFinite(lotStep) || lotStep <= 0 || lots <= 0) return 0;
  if (!isFinite(minLot) || minLot < 0) return 0;
  if (lots < minLot - 1e-9) return 0; // below minimum → no valid position

  // Calculate how many steps above minLot
  const stepsAboveMin = Math.floor((lots - minLot) / lotStep + 1e-9);
  const rounded = minLot + stepsAboveMin * lotStep;
  const stepDecimals = Math.max(
    (lotStep.toString().split(".")[1] || "").length,
    (minLot.toString().split(".")[1] || "").length,
  );
  return roundTo(rounded, stepDecimals);
}

/**
 * Round maxLot DOWN to the nearest valid grid point (minLot + n × lotStep).
 * Ensures the maximum is executable on the broker's volume ladder.
 */
export function alignMaxLotToGrid(maxLot: number, minLot: number, lotStep: number): number {
  if (!isFinite(maxLot) || maxLot <= 0) return 0;
  if (maxLot < minLot) return 0;
  return roundLotsDownToGrid(maxLot, minLot, lotStep);
}

// Keep backward-compatible alias
export function roundLotsDown(lots: number, lotStep: number): number {
  return roundLotsDownToGrid(lots, 0, lotStep);
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

export function validatePositionSizeInputs(inputs: PositionSizeInputs): string | null {
  if (!isFinite(inputs.accountEquity) || inputs.accountEquity <= 0) {
    return "Account equity must be a positive number.";
  }
  if (!inputs.accountCurrency || inputs.accountCurrency.length !== 3) {
    return "Account currency must be a 3-letter code.";
  }

  // Risk validation
  if (inputs.riskType === "PERCENTAGE") {
    if (inputs.riskPercentage == null || !isFinite(inputs.riskPercentage) || inputs.riskPercentage <= 0 || inputs.riskPercentage > 100) {
      return "Risk percentage must be between 0 and 100 (exclusive of 0).";
    }
  } else {
    if (inputs.riskAmount == null || !isFinite(inputs.riskAmount) || inputs.riskAmount <= 0) {
      return "Risk amount must be a positive number.";
    }
  }

  // Stop loss — in ENTRY_STOP mode, pips are calculated from prices
  if (inputs.mode === "ENTRY_STOP" && inputs.entryPrice != null && inputs.stopLossPrice != null) {
    // Validation of prices happens below; skip pip validation here
  } else if (!isFinite(inputs.stopLossPips) || inputs.stopLossPips <= 0) {
    return "Stop-loss distance must be a positive number.";
  }

  // Contract size
  if (!isFinite(inputs.contractSize) || inputs.contractSize <= 0) {
    return "Contract size must be a positive number.";
  }

  // Pip size
  if (!isFinite(inputs.pipSize) || inputs.pipSize <= 0) {
    return "Pip size must be a positive number.";
  }

  // Conversion rate
  if (!isFinite(inputs.conversionRate) || inputs.conversionRate <= 0) {
    return "Conversion rate must be a positive number.";
  }

  // Broker settings
  if (!isFinite(inputs.minLot) || inputs.minLot <= 0) {
    return "Minimum lot size must be a positive number.";
  }
  if (!isFinite(inputs.maxLot) || inputs.maxLot <= 0) {
    return "Maximum lot size must be a positive number.";
  }
  if (!isFinite(inputs.lotStep) || inputs.lotStep <= 0) {
    return "Lot step must be a positive number.";
  }
  if (inputs.minLot > inputs.maxLot) {
    return "Minimum lot cannot exceed maximum lot.";
  }

  // Costs
  if (inputs.commissionPerLot != null && (!isFinite(inputs.commissionPerLot) || inputs.commissionPerLot < 0)) {
    return "Commission must be a non-negative number.";
  }
  if (inputs.slippagePips != null && (!isFinite(inputs.slippagePips) || inputs.slippagePips < 0)) {
    return "Slippage allowance must be a non-negative number.";
  }
  if (inputs.additionalCosts != null && (!isFinite(inputs.additionalCosts) || inputs.additionalCosts < 0)) {
    return "Additional costs must be a non-negative number.";
  }

  // Entry/Stop mode
  if (inputs.mode === "ENTRY_STOP") {
    if (inputs.entryPrice == null || !isFinite(inputs.entryPrice) || inputs.entryPrice <= 0) {
      return "Entry price must be a positive number.";
    }
    if (inputs.stopLossPrice == null || !isFinite(inputs.stopLossPrice) || inputs.stopLossPrice <= 0) {
      return "Stop-loss price must be a positive number.";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  MAIN CALCULATION                                                   */
/* ------------------------------------------------------------------ */

export function calculatePositionSize(inputs: PositionSizeInputs): PositionSizeResult {
  const validationError = validatePositionSizeInputs(inputs);
  if (validationError) {
    return buildErrorResult(inputs, validationError);
  }

  const {
    accountEquity, accountCurrency, pair, direction, contractSize, pipSize,
    conversionRate, minLot, maxLot, lotStep,
  } = inputs;

  // 1. Risk amount
  let riskAmount: number;
  let riskPercentage: number;
  if (inputs.riskType === "PERCENTAGE") {
    riskPercentage = inputs.riskPercentage!;
    riskAmount = accountEquity * riskPercentage / 100;
  } else {
    riskAmount = inputs.riskAmount!;
    riskPercentage = accountEquity > 0 ? (riskAmount / accountEquity) * 100 : 0;
  }

  // 2. Pip value per standard lot in quote currency
  const pipValuePerLotQuote = pipSize * contractSize;

  // 3. Pip value in account currency
  const pipValuePerLotAccount = pipValuePerLotQuote * conversionRate;

  // 4. Stop-loss pips (from ENTRY_STOP if needed)
  let stopLossPips = inputs.stopLossPips;
  let calculatedPipDistance: number | undefined;
  if (inputs.mode === "ENTRY_STOP" && inputs.entryPrice != null && inputs.stopLossPrice != null) {
    const distResult = calculatePipDistance(inputs.entryPrice, inputs.stopLossPrice, pipSize, direction);
    if (distResult.error) {
      return buildErrorResult(inputs, distResult.error);
    }
    calculatedPipDistance = distResult.pips;
    stopLossPips = distResult.pips;
  }

  // 5. Costs per lot (commission and slippage are per-lot; additionalCosts is a flat trade cost)
  const commissionPerLot = inputs.commissionPerLot ?? 0;
  const slippagePips = inputs.slippagePips ?? 0;
  const slippageCostPerLot = slippagePips * pipValuePerLotAccount;
  const additionalCosts = inputs.additionalCosts ?? 0; // flat trade cost, not per-lot
  const costPerLot = commissionPerLot + slippageCostPerLot; // per-lot costs only

  // 6. Risk per standard lot (per-lot costs only)
  const riskPerLot = stopLossPips * pipValuePerLotAccount + costPerLot;

  if (riskPerLot <= 0) {
    return buildErrorResult(inputs, "Risk per standard lot must be positive. Check pip value and stop-loss distance.");
  }

  // 7. Available risk budget after flat additional costs
  const availableRiskBudget = Math.max(0, riskAmount - additionalCosts);

  // 7a. If flat costs consume the entire risk budget, no position is possible
  if (availableRiskBudget <= 0) {
    const zeroResult = buildErrorResult(inputs, "");
    zeroResult.valid = true;
    zeroResult.error = undefined;
    zeroResult.riskAmount = riskAmount;
    zeroResult.riskPercentage = riskPercentage;
    zeroResult.pipValuePerLotQuote = pipValuePerLotQuote;
    zeroResult.pipValuePerLotAccount = pipValuePerLotAccount;
    zeroResult.stopLossPips = stopLossPips;
    zeroResult.costPerLot = costPerLot;
    zeroResult.commissionPerLot = commissionPerLot;
    zeroResult.slippageCostPerLot = slippageCostPerLot;
    zeroResult.additionalCosts = additionalCosts;
    zeroResult.rawLots = 0;
    zeroResult.brokerLots = 0;
    zeroResult.withinBrokerLimits = false;
    zeroResult.brokerMessage = `Flat trading costs (${accountCurrency} ${roundTo(additionalCosts, 2).toFixed(2)}) consume the entire risk budget (${accountCurrency} ${roundTo(riskAmount, 2).toFixed(2)}). No position can fit within the risk limit.`;
    zeroResult.moneyAtRisk = 0;
    zeroResult.pipValueAtSize = 0;
    zeroResult.estimatedStopLossAmount = 0;
    zeroResult.unusedRiskBudget = riskAmount; // no trade → full budget unused
    zeroResult.breakdown = [
      { label: "Account Equity", value: `${accountCurrency} ${roundTo(accountEquity, 2).toFixed(2)}` },
      { label: "Risk Amount", value: `${accountCurrency} ${roundTo(riskAmount, 2).toFixed(2)} (${roundTo(riskPercentage, 2).toFixed(2)}%)` },
      { label: "Flat Additional Costs", value: `${accountCurrency} ${roundTo(additionalCosts, 2).toFixed(2)}` },
      { label: "Available Risk Budget", value: `${accountCurrency} 0.00 (consumed by flat costs)` },
      { label: "Result", value: "No executable position within risk limit" },
    ];
    return zeroResult;
  }

  // 8. Raw lots
  const rawLots = availableRiskBudget / riskPerLot;

  // 9. Broker grid-aligned rounding (anchored at minLot)
  const roundedLots = roundLotsDownToGrid(rawLots, minLot, lotStep);

  // 9a. Align maxLot to the grid as well
  const alignedMaxLot = alignMaxLotToGrid(maxLot, minLot, lotStep);

  // 10. Broker limits check — effective lots is the actual executable size
  let withinBrokerLimits = true;
  let brokerMessage: string | undefined;
  let effectiveLots = roundedLots;

  if (roundedLots <= 0) {
    withinBrokerLimits = false;
    effectiveLots = 0;
    brokerMessage = `No valid position within risk limit. The calculated size is below the broker minimum (${minLot}).`;
  } else if (roundedLots < minLot) {
    withinBrokerLimits = false;
    effectiveLots = 0;
    brokerMessage = `No valid position within risk limit. The calculated size (${roundTo(roundedLots, 4)}) is below the broker minimum (${minLot}).`;
  } else if (roundedLots > alignedMaxLot) {
    withinBrokerLimits = false;
    effectiveLots = alignedMaxLot; // capped at aligned maximum
    brokerMessage = `Calculated size (${roundTo(roundedLots, 4)}) exceeds broker maximum. Capped at ${alignedMaxLot} (highest grid-aligned volume ≤ ${maxLot}).`;
  }

  // Use effectiveLots consistently for all outputs
  const brokerLots = effectiveLots;
  // When no position is recommended (effectiveLots = 0), moneyAtRisk = 0 (not flat costs)
  const moneyAtRisk = effectiveLots > 0 ? effectiveLots * riskPerLot + additionalCosts : 0;
  const pipValueAtSize = effectiveLots * pipValuePerLotAccount;
  const estimatedStopLossAmount = effectiveLots * stopLossPips * pipValuePerLotAccount;
  const unusedRiskBudget = effectiveLots > 0 ? Math.max(0, riskAmount - moneyAtRisk) : riskAmount;

  // 11. Lot equivalents
  const baseCurrencyUnits = effectiveLots * contractSize;
  const miniLots = effectiveLots * 10;
  const microLots = effectiveLots * 100;

  // 12. Breakdown
  const breakdown: CalculationStep[] = [
    { label: "Account Equity", value: `${accountCurrency} ${roundTo(accountEquity, 2).toFixed(2)}` },
    { label: "Risk Amount", value: `${accountCurrency} ${roundTo(riskAmount, 2).toFixed(2)} (${roundTo(riskPercentage, 2).toFixed(2)}%)` },
    { label: "Currency Pair", value: `${pair} (${direction})` },
    { label: "Stop-Loss Distance", value: `${roundTo(stopLossPips, 2).toFixed(2)} pips` },
    { label: "Pip Size", value: pipSize.toFixed(pipSize >= 0.01 ? 2 : 4) },
    { label: "Contract Size", value: `${contractSize.toLocaleString()} units/lot` },
    { label: "Pip Value per Lot (quote)", value: `${roundTo(pipValuePerLotQuote, 4).toFixed(4)}` },
    { label: "Conversion Rate", value: conversionRate === 1 ? "1 (no conversion needed)" : `${conversionRate}` },
    { label: "Pip Value per Lot (account)", value: `${accountCurrency} ${roundTo(pipValuePerLotAccount, 4).toFixed(4)}` },
    { label: "Cost per Lot (commission + slippage)", value: `${accountCurrency} ${roundTo(costPerLot, 4).toFixed(4)}` },
    { label: "Flat Additional Costs", value: `${accountCurrency} ${roundTo(additionalCosts, 2).toFixed(2)}` },
    { label: "Risk per Standard Lot", value: `${accountCurrency} ${roundTo(riskPerLot, 4).toFixed(4)}` },
    { label: "Available Risk Budget (after flat costs)", value: `${accountCurrency} ${roundTo(availableRiskBudget, 2).toFixed(2)}` },
    { label: "Raw Lot Size", value: roundTo(rawLots, 6).toFixed(6) },
    { label: "Rounded Lot Size (grid-aligned)", value: roundTo(roundedLots, 4).toFixed(4) },
    { label: "Grid-Aligned Max Lot", value: roundTo(alignedMaxLot, 4).toFixed(4) },
    { label: "Effective (Executable) Lots", value: roundTo(effectiveLots, 4).toFixed(4) },
    { label: "Money at Risk", value: `${accountCurrency} ${roundTo(moneyAtRisk, 2).toFixed(2)}` },
    { label: "Unused Risk Budget", value: `${accountCurrency} ${roundTo(unusedRiskBudget, 2).toFixed(2)}` },
  ];

  return {
    valid: true,
    mode: inputs.mode,
    pair,
    direction,
    riskAmount,
    riskPercentage,
    pipValuePerLotQuote,
    pipValuePerLotAccount,
    stopLossPips,
    calculatedPipDistance,
    costPerLot,
    commissionPerLot,
    slippageCostPerLot,
    additionalCosts,
    rawLots,
    brokerLots,
    baseCurrencyUnits,
    miniLots,
    microLots,
    moneyAtRisk,
    pipValueAtSize,
    estimatedStopLossAmount,
    unusedRiskBudget,
    withinBrokerLimits,
    brokerMessage,
    breakdown,
  };
}

/* ------------------------------------------------------------------ */
/*  ERROR RESULT HELPER                                                */
/* ------------------------------------------------------------------ */

function buildErrorResult(inputs: PositionSizeInputs, error: string): PositionSizeResult {
  return {
    valid: false,
    error,
    mode: inputs.mode,
    pair: inputs.pair,
    direction: inputs.direction,
    riskAmount: 0,
    riskPercentage: 0,
    pipValuePerLotQuote: 0,
    pipValuePerLotAccount: 0,
    stopLossPips: inputs.stopLossPips,
    costPerLot: 0,
    commissionPerLot: 0,
    slippageCostPerLot: 0,
    additionalCosts: 0,
    rawLots: 0,
    brokerLots: 0,
    baseCurrencyUnits: 0,
    miniLots: 0,
    microLots: 0,
    moneyAtRisk: 0,
    pipValueAtSize: 0,
    estimatedStopLossAmount: 0,
    unusedRiskBudget: 0,
    withinBrokerLimits: false,
    breakdown: [],
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: PositionSizeInputs = {
  mode: "QUICK",
  accountEquity: 10000,
  accountCurrency: "USD",
  riskType: "PERCENTAGE",
  riskPercentage: 1,
  riskAmount: 100,
  pair: "EURUSD",
  direction: "BUY",
  stopLossPips: 20,
  entryPrice: undefined,
  stopLossPrice: undefined,
  contractSize: 100000,
  pipSize: 0.0001,
  conversionRate: 1,
  conversionDirection: "",
  minLot: 0.01,
  maxLot: 100,
  lotStep: 0.01,
  commissionPerLot: 0,
  slippagePips: 0,
  additionalCosts: 0,
};
