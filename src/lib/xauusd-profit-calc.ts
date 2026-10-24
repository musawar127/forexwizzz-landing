/**
 * XAUUSD Profit Calculator — Gold Profit & Loss — Pure Calculation Module
 *
 * Contains all mathematical logic for XAUUSD/gold profit & loss calculations.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Four modes:
 *   1. PROFIT_LOSS — entry + exit + lots → gross/net P&L
 *   2. FIND_EXIT — desired net profit → required exit price
 *   3. PARTIAL_CLOSE — up to 4 partial exits with allocations
 *   4. GOLD_MOVE — lot size + move amount → P&L value per move
 *
 * Core formula:
 *   GrossProfitUSD = DirectionFactor × (ExitPrice − EntryPrice) × Lots × ContractSize
 *   where DirectionFactor: BUY = +1, SELL = −1
 */

export type Direction = "BUY" | "SELL";
export type CalculatorMode = "PROFIT_LOSS" | "FIND_EXIT" | "PARTIAL_CLOSE" | "GOLD_MOVE";
export type IncrementConvention = "INC_001" | "INC_010" | "CUSTOM";
export type AllocationMode = "PERCENTAGE" | "LOTS";

/* ------------------------------------------------------------------ */
/*  CORE TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface ProfitInputs {
  mode: CalculatorMode;
  direction: Direction;
  entry: number;
  /** Used by PROFIT_LOSS, FIND_EXIT, PARTIAL_CLOSE */
  exit?: number;
  /** Used by PROFIT_LOSS, FIND_EXIT, PARTIAL_CLOSE, GOLD_MOVE */
  lots: number;
  /** Contract size in ounces per 1.00 lot. Default 100. */
  contractSize: number;
  /** Account currency code. */
  accountCurrency: string;
  /** USD → account currency conversion rate. */
  conversionRate: number;
  /** Price increment convention for display. */
  incrementConvention?: IncrementConvention;
  /** Custom increment when convention is CUSTOM. */
  customIncrement?: number;
  /** ---- Trading costs (account currency) ---- */
  /** Commission per 1.00 lot (account currency). */
  commissionPerLot?: number;
  /** Swap/financing cost (account currency, flat). */
  swapCost?: number;
  /** Other fees (account currency, flat). */
  otherFees?: number;
  /** ---- FIND_EXIT mode ---- */
  desiredNetProfit?: number;
  /** ---- PARTIAL_CLOSE mode ---- */
  partialExits?: PartialExitInput[];
  allocationMode?: AllocationMode;
  /** ---- GOLD_MOVE mode ---- */
  customMoveAmount?: number;
  /** ---- Optional account balance ---- */
  accountBalance?: number | null;
}

export interface PartialExitInput {
  exitPrice: number;
  /** In PERCENTAGE mode: % of total lots. In LOTS mode: closed lots. */
  allocation: number;
}

export interface ExposureResult {
  /** Exposure in troy ounces = lots × contractSize. */
  exposureOunces: number;
}

export interface PriceMovementResult {
  /** Raw exit − entry (signed). */
  rawChange: number;
  /** Absolute price distance. */
  absoluteDistance: number;
  /** Directional movement: BUY → exit−entry; SELL → entry−exit. */
  directionalMovement: number;
  /** abs(exit − entry) / entry × 100. */
  priceDistancePercent: number;
}

export interface IncrementMetrics {
  incrementSize: number;
  /** absoluteDistance / incrementSize. */
  incrementCount: number;
  /** incrementSize × lots × contractSize (in USD). */
  valuePerIncrementUSD: number;
}

export interface TradingCosts {
  commissionPerLot: number;
  swapCost: number;
  otherFees: number;
  /** commissionPerLot × lots. */
  commissionCost: number;
  /** commission + swap + other. */
  totalCosts: number;
}

export interface ProfitResult {
  valid: boolean;
  error?: string;
  mode: CalculatorMode;
  direction: Direction;
  // Exposure
  exposureOunces: number;
  // Price movement
  rawChange: number;
  absoluteDistance: number;
  directionalMovement: number;
  priceDistancePercent: number;
  // P&L
  /** Gross P&L in USD (signed). */
  grossPnLUSD: number;
  /** Gross P&L in account currency (signed). */
  grossPnLAccount: number;
  /** Net P&L in account currency (signed, after costs). */
  netPnLAccount: number;
  /** Value per $1 gold move in USD = lots × contractSize. */
  valuePerDollarMoveUSD: number;
  /** Value per $1 gold move in account currency. */
  valuePerDollarMoveAccount: number;
  // Costs
  costs?: TradingCosts;
  // Break-even
  /** Break-even exit price (accounting for costs). null if non-positive for SELL. */
  breakEvenExit: number | null;
  breakEvenMessage?: string;
  // Increment
  increment?: IncrementMetrics;
  // Optional account-balance percentage
  pnlPercentOfBalance?: number | null;
  // FIND_EXIT outputs
  requiredExit?: number;
  requiredGrossProfitAccount?: number;
  requiredGrossProfitUSD?: number;
  requiredPriceMove?: number;
  // PARTIAL_CLOSE outputs
  partial?: PartialCloseResult;
  // GOLD_MOVE outputs
  goldMoveTable?: GoldMoveRow[];
}

export interface PartialExitResult {
  exitPrice: number;
  allocation: number;
  closedLots: number;
  grossPnLUSD: number;
}

export interface PartialCloseResult {
  totalLots: number;
  closedLots: number;
  remainingOpenLots: number;
  percentageClosed: number;
  weightedAverageExit: number | null;
  totalRealizedGrossUSD: number;
  totalRealizedGrossAccount: number;
  commission: number;
  swapCost: number;
  otherFees: number;
  totalCosts: number;
  netRealizedPnLAccount: number;
  exits: PartialExitResult[];
}

export interface GoldMoveRow {
  move: number;
  favorableUSD: number;
  adverseUSD: number;
  favorableAccount: number;
  adverseAccount: number;
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

const EPSILON = 1e-9;

/* ------------------------------------------------------------------ */
/*  EXPOSURE                                                           */
/* ------------------------------------------------------------------ */

export function calculateExposure(lots: number, contractSize: number): number {
  return lots * contractSize;
}

/* ------------------------------------------------------------------ */
/*  GROSS P&L                                                          */
/* ------------------------------------------------------------------ */

/**
 * Gross P&L in USD.
 * BUY: (exit − entry) × lots × contractSize
 * SELL: (entry − exit) × lots × contractSize
 */
export function calculateGrossPnL(
  direction: Direction,
  entry: number,
  exit: number,
  lots: number,
  contractSize: number,
): number {
  const dirFactor = direction === "BUY" ? 1 : -1;
  return dirFactor * (exit - entry) * lots * contractSize;
}

/* ------------------------------------------------------------------ */
/*  PRICE MOVEMENT                                                     */
/* ------------------------------------------------------------------ */

export function calculatePriceMovement(
  direction: Direction,
  entry: number,
  exit: number,
): PriceMovementResult {
  const rawChange = exit - entry;
  const absoluteDistance = Math.abs(rawChange);
  const directionalMovement = direction === "BUY" ? exit - entry : entry - exit;
  const priceDistancePercent = entry > 0 ? (absoluteDistance / entry) * 100 : 0;
  return { rawChange, absoluteDistance, directionalMovement, priceDistancePercent };
}

/* ------------------------------------------------------------------ */
/*  INCREMENT METRICS                                                  */
/* ------------------------------------------------------------------ */

export function getIncrementSize(
  convention: IncrementConvention | undefined,
  customIncrement: number | undefined,
): number {
  if (!convention) return 0.01;
  if (convention === "CUSTOM") {
    if (customIncrement == null || !isFinite(customIncrement) || customIncrement <= 0) return 0.01;
    return customIncrement;
  }
  return convention === "INC_001" ? 0.01 : 0.10;
}

export function calculateIncrementMetrics(
  absoluteDistance: number,
  lots: number,
  contractSize: number,
  incrementSize: number,
): IncrementMetrics {
  const incrementCount = incrementSize > 0 ? absoluteDistance / incrementSize : 0;
  const valuePerIncrementUSD = incrementSize * lots * contractSize;
  return { incrementSize, incrementCount, valuePerIncrementUSD };
}

/* ------------------------------------------------------------------ */
/*  TRADING COSTS                                                      */
/* ------------------------------------------------------------------ */

export function calculateTradingCosts(
  commissionPerLot: number,
  swapCost: number,
  otherFees: number,
  lots: number,
): TradingCosts {
  const commissionCost = commissionPerLot * lots;
  const totalCosts = commissionCost + swapCost + otherFees;
  return { commissionPerLot, swapCost, otherFees, commissionCost, totalCosts };
}

/* ------------------------------------------------------------------ */
/*  NET P&L                                                            */
/* ------------------------------------------------------------------ */

export function calculateNetPnL(grossPnLAccount: number, totalCosts: number): number {
  return grossPnLAccount - totalCosts;
}

/* ------------------------------------------------------------------ */
/*  BREAK-EVEN EXIT PRICE                                              */
/* ------------------------------------------------------------------ */

/**
 * Break-even exit price accounting for costs.
 * Costs are in account currency; convert to USD, then to price distance.
 *
 * BUY: breakEven = entry + (costsUSD / exposureOz)
 * SELL: breakEven = entry − (costsUSD / exposureOz)
 *
 * Returns null (with message) if SELL break-even would be non-positive.
 */
export function calculateBreakEvenExit(
  direction: Direction,
  entry: number,
  exposureOunces: number,
  totalCostsAccount: number,
  conversionRate: number,
): { breakEvenExit: number | null; message?: string } {
  if (exposureOunces <= 0) return { breakEvenExit: null, message: "Exposure must be positive for break-even calculation." };
  if (totalCostsAccount <= 0) return { breakEvenExit: entry }; // no costs → BE = entry

  const costsUSD = totalCostsAccount / conversionRate;
  const costPriceDistance = costsUSD / exposureOunces;

  if (direction === "BUY") {
    return { breakEvenExit: entry + costPriceDistance };
  } else {
    const be = entry - costPriceDistance;
    if (be <= 0) {
      return { breakEvenExit: null, message: "No positive break-even exit price exists under the entered assumptions." };
    }
    return { breakEvenExit: be };
  }
}

/* ------------------------------------------------------------------ */
/*  FIND EXIT PRICE                                                    */
/* ------------------------------------------------------------------ */

/**
 * Required exit price to achieve a desired net profit.
 *
 * requiredGrossProfitAccount = desiredNetProfit + totalCosts
 * requiredGrossProfitUSD = requiredGrossProfitAccount / conversionRate
 * requiredPriceMove = requiredGrossProfitUSD / exposureOunces
 *
 * BUY: exit = entry + requiredPriceMove
 * SELL: exit = entry − requiredPriceMove
 */
export function calculateRequiredExitPrice(
  direction: Direction,
  entry: number,
  lots: number,
  contractSize: number,
  desiredNetProfit: number,
  totalCostsAccount: number,
  conversionRate: number,
): { requiredExit: number | null; requiredGrossProfitAccount: number; requiredGrossProfitUSD: number; requiredPriceMove: number; message?: string } {
  const exposureOunces = lots * contractSize;
  const requiredGrossProfitAccount = desiredNetProfit + totalCostsAccount;
  const requiredGrossProfitUSD = requiredGrossProfitAccount / conversionRate;
  const requiredPriceMove = requiredGrossProfitUSD / exposureOunces;

  if (direction === "BUY") {
    return { requiredExit: entry + requiredPriceMove, requiredGrossProfitAccount, requiredGrossProfitUSD, requiredPriceMove };
  } else {
    const exit = entry - requiredPriceMove;
    if (exit <= 0) {
      return { requiredExit: null, requiredGrossProfitAccount, requiredGrossProfitUSD, requiredPriceMove, message: "The entered desired profit would require a non-positive XAUUSD price under these assumptions." };
    }
    return { requiredExit: exit, requiredGrossProfitAccount, requiredGrossProfitUSD, requiredPriceMove };
  }
}

/* ------------------------------------------------------------------ */
/*  PARTIAL CLOSE                                                      */
/* ------------------------------------------------------------------ */

export function calculatePartialClosePnL(
  direction: Direction,
  entry: number,
  totalLots: number,
  contractSize: number,
  partialExits: PartialExitInput[],
  allocationMode: AllocationMode,
  conversionRate: number,
  commissionPerLot: number,
  swapCost: number,
  otherFees: number,
): PartialCloseResult | { error: string } {
  if (!partialExits || partialExits.length < 1 || partialExits.length > 4) {
    return { error: "Provide between 1 and 4 partial exits." };
  }

  // Compute closed lots per exit
  const exits: PartialExitResult[] = [];
  let totalClosedLots = 0;
  let totalAllocationPercent = 0;

  for (const pe of partialExits) {
    if (!isFinite(pe.exitPrice) || pe.exitPrice <= 0) {
      return { error: "Each exit price must be a positive finite number." };
    }
    if (!isFinite(pe.allocation) || pe.allocation < 0) {
      return { error: "Each allocation must be a non-negative number." };
    }
    let closedLots: number;
    if (allocationMode === "PERCENTAGE") {
      if (pe.allocation > 100) return { error: "No single allocation may exceed 100%." };
      closedLots = totalLots * (pe.allocation / 100);
      totalAllocationPercent += pe.allocation;
    } else {
      closedLots = pe.allocation;
    }
    const grossPnLUSD = calculateGrossPnL(direction, entry, pe.exitPrice, closedLots, contractSize);
    exits.push({ exitPrice: pe.exitPrice, allocation: pe.allocation, closedLots, grossPnLUSD });
    totalClosedLots += closedLots;
  }

  // Validation
  if (allocationMode === "PERCENTAGE") {
    if (totalAllocationPercent > 100 + EPSILON) {
      return { error: `Total allocation (${roundTo(totalAllocationPercent, 4)}%) exceeds 100%.` };
    }
  } else {
    if (totalClosedLots > totalLots + EPSILON) {
      return { error: `Sum of closed lots (${roundTo(totalClosedLots, 6)}) exceeds total lots (${roundTo(totalLots, 6)}).` };
    }
  }
  // At least one exit must have allocation > 0
  if (totalClosedLots <= EPSILON) {
    return { error: "At least one exit must have a positive allocation." };
  }

  const remainingOpenLots = Math.max(0, totalLots - totalClosedLots);
  const percentageClosed = totalLots > 0 ? (totalClosedLots / totalLots) * 100 : 0;

  // Weighted average exit
  let weightedSum = 0;
  for (const e of exits) weightedSum += e.exitPrice * e.closedLots;
  const weightedAverageExit = totalClosedLots > 0 ? weightedSum / totalClosedLots : null;

  // Total realized gross
  const totalRealizedGrossUSD = exits.reduce((s, e) => s + e.grossPnLUSD, 0);
  const totalRealizedGrossAccount = totalRealizedGrossUSD * conversionRate;

  // Costs — commission based on closed lots
  const commission = commissionPerLot * totalClosedLots;
  const totalCosts = commission + swapCost + otherFees;
  const netRealizedPnLAccount = totalRealizedGrossAccount - totalCosts;

  return {
    totalLots,
    closedLots: totalClosedLots,
    remainingOpenLots,
    percentageClosed,
    weightedAverageExit,
    totalRealizedGrossUSD,
    totalRealizedGrossAccount,
    commission,
    swapCost,
    otherFees,
    totalCosts,
    netRealizedPnLAccount,
    exits,
  };
}

/* ------------------------------------------------------------------ */
/*  GOLD MOVE TABLE                                                    */
/* ------------------------------------------------------------------ */

export const GOLD_MOVE_PRESETS = [0.5, 1, 2, 5, 10, 20, 50];

export function buildGoldMoveTable(
  lots: number,
  contractSize: number,
  conversionRate: number,
  customMove?: number,
): GoldMoveRow[] {
  const exposureOz = lots * contractSize;
  const moves = [...GOLD_MOVE_PRESETS];
  if (customMove != null && isFinite(customMove) && customMove > 0 && !moves.includes(customMove)) {
    moves.push(customMove);
    moves.sort((a, b) => a - b);
  }
  return moves.map((m) => ({
    move: m,
    favorableUSD: m * exposureOz,
    adverseUSD: -m * exposureOz,
    favorableAccount: m * exposureOz * conversionRate,
    adverseAccount: -m * exposureOz * conversionRate,
  }));
}

export function calculateMoveValue(move: number, lots: number, contractSize: number, conversionRate: number): {
  favorableUSD: number;
  adverseUSD: number;
  favorableAccount: number;
  adverseAccount: number;
} {
  const exposureOz = lots * contractSize;
  return {
    favorableUSD: move * exposureOz,
    adverseUSD: -move * exposureOz,
    favorableAccount: move * exposureOz * conversionRate,
    adverseAccount: -move * exposureOz * conversionRate,
  };
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

export function validateProfitInputs(inputs: ProfitInputs): string | null {
  const { direction, lots, contractSize, accountCurrency, conversionRate } = inputs;

  if (direction !== "BUY" && direction !== "SELL") return "Direction must be BUY or SELL.";
  if (!isFinite(lots) || lots <= 0) return "Lots must be a positive finite number.";
  if (!isFinite(contractSize) || contractSize <= 0) return "Contract size must be a positive finite number.";
  if (!accountCurrency || accountCurrency.length !== 3) return "Account currency must be a 3-letter code.";
  if (!isFinite(conversionRate) || conversionRate <= 0) return "Conversion rate must be a positive finite number.";

  if (inputs.mode === "PROFIT_LOSS" || inputs.mode === "PARTIAL_CLOSE") {
    if (!isFinite(inputs.entry) || inputs.entry <= 0) return "Entry price must be a positive finite number.";
  }
  if (inputs.mode === "PROFIT_LOSS") {
    if (inputs.exit == null || !isFinite(inputs.exit) || inputs.exit <= 0) return "Exit price must be a positive finite number.";
  }

  // Costs
  if (inputs.commissionPerLot != null && (!isFinite(inputs.commissionPerLot) || inputs.commissionPerLot < 0)) {
    return "Commission per lot must be a non-negative number.";
  }
  if (inputs.swapCost != null && (!isFinite(inputs.swapCost) || inputs.swapCost < 0)) {
    return "Swap cost must be a non-negative number.";
  }
  if (inputs.otherFees != null && (!isFinite(inputs.otherFees) || inputs.otherFees < 0)) {
    return "Other fees must be a non-negative number.";
  }

  // Account balance
  if (inputs.accountBalance != null && inputs.accountBalance !== 0) {
    if (!isFinite(inputs.accountBalance) || inputs.accountBalance <= 0) {
      return "Account balance must be a positive number when entered.";
    }
  }

  // FIND_EXIT
  if (inputs.mode === "FIND_EXIT") {
    if (!isFinite(inputs.entry) || inputs.entry <= 0) return "Entry price must be a positive finite number.";
    if (inputs.desiredNetProfit == null || !isFinite(inputs.desiredNetProfit) || inputs.desiredNetProfit <= 0) {
      return "Desired net profit must be a positive number.";
    }
  }

  // Custom increment
  if (inputs.incrementConvention === "CUSTOM") {
    if (inputs.customIncrement == null || !isFinite(inputs.customIncrement) || inputs.customIncrement <= 0) {
      return "Custom increment must be a positive number.";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  MAIN ENTRY POINT                                                   */
/* ------------------------------------------------------------------ */

export function calculateProfit(inputs: ProfitInputs): ProfitResult {
  const validationError = validateProfitInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      mode: inputs.mode,
      direction: inputs.direction,
      exposureOunces: 0,
      rawChange: 0,
      absoluteDistance: 0,
      directionalMovement: 0,
      priceDistancePercent: 0,
      grossPnLUSD: 0,
      grossPnLAccount: 0,
      netPnLAccount: 0,
      valuePerDollarMoveUSD: 0,
      valuePerDollarMoveAccount: 0,
    };
  }

  const { direction, entry, lots, contractSize, conversionRate } = inputs;
  const exposureOunces = calculateExposure(lots, contractSize);
  const valuePerDollarMoveUSD = exposureOunces; // $1 move × oz = USD value
  const valuePerDollarMoveAccount = valuePerDollarMoveUSD * conversionRate;

  const commissionPerLot = inputs.commissionPerLot ?? 0;
  const swapCost = inputs.swapCost ?? 0;
  const otherFees = inputs.otherFees ?? 0;

  // ---- PROFIT_LOSS ----
  if (inputs.mode === "PROFIT_LOSS") {
    const exit = inputs.exit!;
    const pm = calculatePriceMovement(direction, entry, exit);
    const grossPnLUSD = calculateGrossPnL(direction, entry, exit, lots, contractSize);
    const grossPnLAccount = grossPnLUSD * conversionRate;
    const costs = calculateTradingCosts(commissionPerLot, swapCost, otherFees, lots);
    const netPnLAccount = calculateNetPnL(grossPnLAccount, costs.totalCosts);
    const be = calculateBreakEvenExit(direction, entry, exposureOunces, costs.totalCosts, conversionRate);
    const incrementSize = getIncrementSize(inputs.incrementConvention, inputs.customIncrement);
    const increment = calculateIncrementMetrics(pm.absoluteDistance, lots, contractSize, incrementSize);
    const pnlPercentOfBalance = inputs.accountBalance && inputs.accountBalance > 0
      ? (netPnLAccount / inputs.accountBalance) * 100
      : null;

    return {
      valid: true,
      mode: inputs.mode,
      direction,
      exposureOunces,
      rawChange: pm.rawChange,
      absoluteDistance: pm.absoluteDistance,
      directionalMovement: pm.directionalMovement,
      priceDistancePercent: pm.priceDistancePercent,
      grossPnLUSD,
      grossPnLAccount,
      netPnLAccount,
      valuePerDollarMoveUSD,
      valuePerDollarMoveAccount,
      costs,
      breakEvenExit: be.breakEvenExit,
      breakEvenMessage: be.message,
      increment,
      pnlPercentOfBalance,
    };
  }

  // ---- FIND_EXIT ----
  if (inputs.mode === "FIND_EXIT") {
    const desiredNetProfit = inputs.desiredNetProfit!;
    const costs = calculateTradingCosts(commissionPerLot, swapCost, otherFees, lots);
    const req = calculateRequiredExitPrice(
      direction, entry, lots, contractSize, desiredNetProfit, costs.totalCosts, conversionRate,
    );
    const incrementSize = getIncrementSize(inputs.incrementConvention, inputs.customIncrement);
    const requiredPriceMoveAbs = Math.abs(req.requiredPriceMove);
    const increment = calculateIncrementMetrics(requiredPriceMoveAbs, lots, contractSize, incrementSize);

    return {
      valid: true,
      mode: inputs.mode,
      direction,
      exposureOunces,
      rawChange: req.requiredPriceMove,
      absoluteDistance: requiredPriceMoveAbs,
      directionalMovement: req.requiredPriceMove,
      priceDistancePercent: entry > 0 ? (requiredPriceMoveAbs / entry) * 100 : 0,
      grossPnLUSD: 0,
      grossPnLAccount: 0,
      netPnLAccount: desiredNetProfit,
      valuePerDollarMoveUSD,
      valuePerDollarMoveAccount,
      costs,
      breakEvenExit: entry,
      increment,
      requiredExit: req.requiredExit,
      requiredGrossProfitAccount: req.requiredGrossProfitAccount,
      requiredGrossProfitUSD: req.requiredGrossProfitUSD,
      requiredPriceMove: req.requiredPriceMove,
      error: req.message,
    };
  }

  // ---- PARTIAL_CLOSE ----
  if (inputs.mode === "PARTIAL_CLOSE") {
    const allocationMode = inputs.allocationMode ?? "PERCENTAGE";
    const partial = calculatePartialClosePnL(
      direction, entry, lots, contractSize,
      inputs.partialExits ?? [], allocationMode, conversionRate,
      commissionPerLot, swapCost, otherFees,
    );
    if ("error" in partial) {
      return {
        valid: false,
        error: partial.error,
        mode: inputs.mode,
        direction,
        exposureOunces,
        rawChange: 0, absoluteDistance: 0, directionalMovement: 0, priceDistancePercent: 0,
        grossPnLUSD: 0, grossPnLAccount: 0, netPnLAccount: 0,
        valuePerDollarMoveUSD, valuePerDollarMoveAccount,
      };
    }
    return {
      valid: true,
      mode: inputs.mode,
      direction,
      exposureOunces,
      rawChange: 0, absoluteDistance: 0, directionalMovement: 0, priceDistancePercent: 0,
      grossPnLUSD: partial.totalRealizedGrossUSD,
      grossPnLAccount: partial.totalRealizedGrossAccount,
      netPnLAccount: partial.netRealizedPnLAccount,
      valuePerDollarMoveUSD,
      valuePerDollarMoveAccount,
      partial,
    };
  }

  // ---- GOLD_MOVE ----
  if (inputs.mode === "GOLD_MOVE") {
    const customMove = inputs.customMoveAmount;
    const table = buildGoldMoveTable(lots, contractSize, conversionRate, customMove);
    return {
      valid: true,
      mode: inputs.mode,
      direction,
      exposureOunces,
      rawChange: 0, absoluteDistance: 0, directionalMovement: 0, priceDistancePercent: 0,
      grossPnLUSD: 0, grossPnLAccount: 0, netPnLAccount: 0,
      valuePerDollarMoveUSD,
      valuePerDollarMoveAccount,
      goldMoveTable: table,
    };
  }

  return {
    valid: false,
    error: "Unknown calculator mode.",
    mode: inputs.mode,
    direction,
    exposureOunces: 0,
    rawChange: 0, absoluteDistance: 0, directionalMovement: 0, priceDistancePercent: 0,
    grossPnLUSD: 0, grossPnLAccount: 0, netPnLAccount: 0,
    valuePerDollarMoveUSD: 0, valuePerDollarMoveAccount: 0,
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: ProfitInputs = {
  mode: "PROFIT_LOSS",
  direction: "BUY",
  entry: 4000,
  exit: 4020,
  lots: 0.10,
  contractSize: 100,
  accountCurrency: "USD",
  conversionRate: 1,
  incrementConvention: "INC_001",
  customIncrement: undefined,
  commissionPerLot: 0,
  swapCost: 0,
  otherFees: 0,
  desiredNetProfit: 200,
  partialExits: [
    { exitPrice: 4010, allocation: 50 },
    { exitPrice: 4020, allocation: 50 },
  ],
  allocationMode: "PERCENTAGE",
  customMoveAmount: undefined,
  accountBalance: null,
};

/** Static educational table (spec §15): 100 oz contract. */
export const STATIC_MOVE_TABLE = [
  { lots: 0.01, exposure: "1 oz", move1: 1, move10: 10, move20: 20 },
  { lots: 0.10, exposure: "10 oz", move1: 10, move10: 100, move20: 200 },
  { lots: 1.00, exposure: "100 oz", move1: 100, move10: 1000, move20: 2000 },
];
