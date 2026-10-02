/**
 * XAUUSD Lot Size & Risk Calculator — Pure Calculation Module
 *
 * This module contains all mathematical logic for calculating the appropriate
 * XAUUSD position size based on account equity, risk percentage, entry/stop
 * prices, and broker specifications. It is a pure TypeScript module with no
 * React dependencies, allowing it to be tested independently.
 *
 * Key principle: RISK FIRST → STOP → POSITION SIZE
 * Never round upward beyond the selected risk budget.
 */

export interface CalculatorInputs {
  /** Account equity in account currency */
  equity: number;
  /** Risk percentage (e.g. 1 means 1%) */
  riskPercentage: number;
  /** Trade direction */
  direction: "BUY" | "SELL";
  /** Planned XAUUSD entry price (USD per troy ounce) */
  entryPrice: number;
  /** Stop-loss price (USD per troy ounce) */
  stopLossPrice: number;
  /** Optional take-profit price (USD per troy ounce) */
  takeProfitPrice?: number | null;
  /** Contract size in troy ounces per 1.00 lot (default: 100) */
  contractSize: number;
  /** Minimum volume in lots (default: 0.01) */
  minVolume: number;
  /** Maximum volume in lots (default: 100) */
  maxVolume: number;
  /** Volume step / increment (default: 0.01) */
  volumeStep: number;
  /** Optional round-trip commission per lot in account currency */
  commissionPerLot?: number | null;
  /** Optional slippage allowance in USD per troy ounce */
  slippagePerOunce?: number | null;
  /** Account currency code (default: "USD") */
  accountCurrency: string;
  /** For non-USD accounts: USD-to-account-currency conversion rate */
  conversionRate?: number | null;
}

export interface CalculatorResult {
  /** Whether the calculation produced valid results */
  valid: boolean;
  /** Error message if valid is false */
  error?: string;
  /** Monetary risk budget in account currency */
  riskBudget: number;
  /** Stop-loss distance in USD per troy ounce */
  stopDistance: number;
  /** Price risk per 1.00 lot in account currency */
  priceRiskPerLot: number;
  /** Commission per lot in account currency (0 if none) */
  commissionPerLot: number;
  /** Slippage allowance per lot in account currency (0 if none) */
  slippagePerLot: number;
  /** Total estimated risk per 1.00 lot in account currency */
  estimatedRiskPerLot: number;
  /** Raw calculated volume before broker rounding */
  rawVolume: number;
  /** Broker-permitted volume after rounding down to volume step */
  calculatedVolume: number;
  /** Actual estimated risk at the rounded volume */
  actualEstimatedRisk: number;
  /** Contract exposure in troy ounces */
  contractExposureOunces: number;
  /** Optional: estimated reward at TP (account currency) */
  estimatedReward?: number;
  /** Optional: risk/reward ratio */
  riskRewardRatio?: number;
  /** Whether the minimum-volume warning should be shown */
  belowMinimum: boolean;
}

/**
 * Validates the inputs and returns an error message if invalid.
 * Returns null if all inputs are valid.
 */
export function validateInputs(inputs: CalculatorInputs): string | null {
  const {
    equity,
    riskPercentage,
    direction,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    contractSize,
    minVolume,
    maxVolume,
    volumeStep,
    accountCurrency,
    conversionRate,
  } = inputs;

  if (!isFinite(equity) || equity <= 0) {
    return "Account equity must be a positive number.";
  }

  if (!isFinite(riskPercentage) || riskPercentage <= 0) {
    return "Risk percentage must be a positive number.";
  }

  if (!isFinite(entryPrice) || entryPrice <= 0) {
    return "Entry price must be a positive number.";
  }

  if (!isFinite(stopLossPrice) || stopLossPrice <= 0) {
    return "Stop-loss price must be a positive number.";
  }

  if (entryPrice === stopLossPrice) {
    return "Entry price and stop-loss price cannot be identical.";
  }

  // Validate stop-loss direction
  if (direction === "BUY" && stopLossPrice >= entryPrice) {
    return "For a BUY trade, the stop loss must be below the entry price.";
  }

  if (direction === "SELL" && stopLossPrice <= entryPrice) {
    return "For a SELL trade, the stop loss must be above the entry price.";
  }

  // Validate optional take-profit
  if (takeProfitPrice != null && isFinite(takeProfitPrice) && takeProfitPrice > 0) {
    if (direction === "BUY" && takeProfitPrice <= entryPrice) {
      return "For a BUY trade, the take-profit must be above the entry price.";
    }
    if (direction === "SELL" && takeProfitPrice >= entryPrice) {
      return "For a SELL trade, the take-profit must be below the entry price.";
    }
  }

  if (!isFinite(contractSize) || contractSize <= 0) {
    return "Contract size must be a positive number.";
  }

  if (!isFinite(minVolume) || minVolume <= 0) {
    return "Minimum volume must be a positive number.";
  }

  if (!isFinite(maxVolume) || maxVolume <= 0) {
    return "Maximum volume must be a positive number.";
  }

  if (minVolume > maxVolume) {
    return "Minimum volume cannot exceed maximum volume.";
  }

  if (!isFinite(volumeStep) || volumeStep <= 0) {
    return "Volume step must be a positive number.";
  }

  // Non-USD accounts require a conversion rate
  if (accountCurrency !== "USD") {
    if (conversionRate == null || !isFinite(conversionRate) || conversionRate <= 0) {
      return `A valid USD-to-${accountCurrency} conversion rate is required for non-USD accounts.`;
    }
  }

  return null;
}

/**
 * Rounds a volume down to the nearest broker-permitted volume step.
 * Never rounds upward.
 */
export function roundToVolumeStep(volume: number, step: number): number {
  if (step <= 0 || !isFinite(step)) return volume;
  if (!isFinite(volume) || volume <= 0) return 0;
  const steps = Math.floor(volume / step);
  return Math.round(steps * step * 1e8) / 1e8;
}

/**
 * Safely rounds a number to a specified number of decimal places.
 */
export function safeRound(value: number, decimals: number): number {
  if (!isFinite(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Main calculation function.
 * Returns a CalculatorResult with all computed values.
 * If inputs are invalid, returns a result with valid=false and an error message.
 */
export function calculateLotSize(inputs: CalculatorInputs): CalculatorResult {
  const validationError = validateInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      riskBudget: 0,
      stopDistance: 0,
      priceRiskPerLot: 0,
      commissionPerLot: 0,
      slippagePerLot: 0,
      estimatedRiskPerLot: 0,
      rawVolume: 0,
      calculatedVolume: 0,
      actualEstimatedRisk: 0,
      contractExposureOunces: 0,
      belowMinimum: false,
    };
  }

  const {
    equity,
    riskPercentage,
    direction,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    contractSize,
    minVolume,
    maxVolume,
    volumeStep,
    accountCurrency,
    conversionRate,
  } = inputs;

  const commissionPerLot = inputs.commissionPerLot ?? 0;
  const slippagePerOunce = inputs.slippagePerOunce ?? 0;

  // 1. Risk budget in account currency
  const riskBudget = equity * riskPercentage / 100;

  // 2. Stop distance in USD per ounce
  const stopDistance = Math.abs(entryPrice - stopLossPrice);

  // 3. Price risk per lot in USD (stop distance × contract size)
  const priceRiskPerLotUSD = stopDistance * contractSize;

  // 4. Slippage per lot in USD (slippage per ounce × contract size)
  const slippagePerLotUSD = slippagePerOunce * contractSize;

  // 5. Total estimated risk per lot in USD
  const estimatedRiskPerLotUSD = priceRiskPerLotUSD + commissionPerLot + slippagePerLotUSD;

  // 6. Convert to account currency if non-USD
  const convRate = accountCurrency === "USD" ? 1 : (conversionRate ?? 1);
  const estimatedRiskPerLot = estimatedRiskPerLotUSD * convRate;
  const priceRiskPerLot = priceRiskPerLotUSD * convRate;
  const slippagePerLot = slippagePerLotUSD * convRate;
  const commissionConverted = commissionPerLot * convRate;

  // 7. Raw volume
  const rawVolume = estimatedRiskPerLot > 0 ? riskBudget / estimatedRiskPerLot : 0;

  // 8. Round down to broker volume step
  let calculatedVolume = roundToVolumeStep(rawVolume, volumeStep);

  // 9. Clamp to max volume
  if (calculatedVolume > maxVolume) {
    calculatedVolume = roundToVolumeStep(maxVolume, volumeStep);
  }

  // 10. Check if below minimum
  const belowMinimum = calculatedVolume < minVolume;

  // 11. Actual estimated risk at calculated volume
  const actualEstimatedRisk = calculatedVolume * estimatedRiskPerLot;

  // 12. Contract exposure in troy ounces
  const contractExposureOunces = calculatedVolume * contractSize;

  // 13. Optional take-profit calculations
  let estimatedReward: number | undefined;
  let riskRewardRatio: number | undefined;

  if (takeProfitPrice != null && isFinite(takeProfitPrice) && takeProfitPrice > 0) {
    const tpDistance = Math.abs(takeProfitPrice - entryPrice);
    const rewardPerLotUSD = tpDistance * contractSize;
    const rewardPerLot = rewardPerLotUSD * convRate;
    estimatedReward = calculatedVolume * rewardPerLot;
    if (actualEstimatedRisk > 0) {
      riskRewardRatio = estimatedReward / actualEstimatedRisk;
    }
  }

  return {
    valid: true,
    riskBudget: safeRound(riskBudget, 2),
    stopDistance: safeRound(stopDistance, 2),
    priceRiskPerLot: safeRound(priceRiskPerLot, 2),
    commissionPerLot: safeRound(commissionConverted, 2),
    slippagePerLot: safeRound(slippagePerLot, 2),
    estimatedRiskPerLot: safeRound(estimatedRiskPerLot, 2),
    rawVolume: safeRound(rawVolume, 6),
    calculatedVolume: safeRound(calculatedVolume, 2),
    actualEstimatedRisk: safeRound(actualEstimatedRisk, 2),
    contractExposureOunces: safeRound(contractExposureOunces, 2),
    estimatedReward: estimatedReward != null ? safeRound(estimatedReward, 2) : undefined,
    riskRewardRatio: riskRewardRatio != null ? safeRound(riskRewardRatio, 4) : undefined,
    belowMinimum,
  };
}

/**
 * Default inputs matching the validation example from the instructions.
 */
export const DEFAULT_INPUTS: CalculatorInputs = {
  equity: 500,
  riskPercentage: 1,
  direction: "BUY",
  entryPrice: 4300,
  stopLossPrice: 4295,
  takeProfitPrice: null,
  contractSize: 100,
  minVolume: 0.01,
  maxVolume: 100,
  volumeStep: 0.01,
  commissionPerLot: 0,
  slippagePerOunce: 0,
  accountCurrency: "USD",
  conversionRate: null,
};
