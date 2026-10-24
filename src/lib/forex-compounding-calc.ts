/**
 * Forex Compounding Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for forex/trading account compounding.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Three modes:
 *   1. STANDARD — constant return per period
 *   2. VARIABLE — individual return per period (positive/negative/zero)
 *   3. WIN_LOSS — win rate with average win/loss returns (seeded simulation)
 *
 * Period-by-period calculation order:
 *   opening balance → deposit → withdrawal → period return → fixed fee → percentage fee → closing balance
 */

export type CalculatorMode = "STANDARD" | "VARIABLE" | "WIN_LOSS";
export type CompoundingFrequency = "DAILY" | "WEEKLY" | "MONTHLY";

/* ------------------------------------------------------------------ */
/*  CORE TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface CompoundingInputs {
  mode: CalculatorMode;
  initialBalance: number;
  accountCurrency: string;
  // STANDARD mode
  returnPerPeriod?: number; // percentage, e.g. 2 for 2%
  numberOfPeriods: number;
  frequency: CompoundingFrequency;
  // Cash flows
  recurringDeposit?: number;
  recurringWithdrawal?: number;
  // Fees
  fixedFeePerPeriod?: number;
  percentageFee?: number; // percentage of closing balance, e.g. 0.1 for 0.1%
  // VARIABLE mode
  variableReturns?: number[]; // array of percentage returns
  // WIN_LOSS mode
  winRate?: number; // percentage 0-100
  averageWinReturn?: number; // percentage, e.g. 3 for 3%
  averageLossReturn?: number; // percentage, e.g. -2 for -2%
  seed?: number;
}

export interface PeriodResult {
  period: number;
  openingBalance: number;
  deposit: number;
  withdrawal: number;
  returnPercent: number;
  returnAmount: number;
  fixedFee: number;
  percentageFeeAmount: number;
  closingBalance: number;
  isWin?: boolean | null;
  peakBalance: number;
  drawdownPercent: number;
}

export interface CompoundingResult {
  valid: boolean;
  error?: string;
  mode: CalculatorMode;
  periods: PeriodResult[];
  initialBalance: number;
  finalBalance: number;
  netGainLoss: number;
  totalReturnPercent: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalFees: number;
  totalContributedCapital: number;
  simpleGrowthBalance: number;
  highestBalance: number;
  lowestBalance: number;
  maxDrawdownPercent: number;
  /** Label describing what the drawdown is measured against. */
  drawdownBasis: string;
  recoveryGainPercent: number;
  bestPeriodReturn: number;
  worstPeriodReturn: number;
  breakEvenReturnPerPeriod: number; // the return needed per period to break even after fees
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
/*  SEEDED PRNG (Mulberry32)                                           */
/* ------------------------------------------------------------------ */

export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/*  VARIABLE RETURNS PARSER                                            */
/* ------------------------------------------------------------------ */

/**
 * Parse variable returns from a pasted string.
 * Accepts: newline, comma, space, semicolon separated.
 * Strips % signs. Returns array of numbers (invalid tokens skipped).
 */
export function parseVariableReturns(input: string): number[] {
  if (!input || typeof input !== "string") return [];
  const cleaned = input
    .replace(/%/g, "")
    .replace(/,/g, " ")
    .replace(/;/g, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\t/g, " ")
    .trim();
  if (cleaned === "") return [];
  const tokens = cleaned.split(/\s+/).filter((t) => t.length > 0);
  const results: number[] = [];
  for (const token of tokens) {
    const parsed = Number(token);
    if (isFinite(parsed)) results.push(parsed);
  }
  return results;
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

export function validateCompoundingInputs(inputs: CompoundingInputs): string | null {
  if (!isFinite(inputs.initialBalance) || inputs.initialBalance < 0) {
    return "Initial balance must be a non-negative finite number.";
  }
  if (!isFinite(inputs.numberOfPeriods) || inputs.numberOfPeriods < 1 || inputs.numberOfPeriods > 10000) {
    return "Number of periods must be between 1 and 10000.";
  }
  if (inputs.recurringDeposit != null && (!isFinite(inputs.recurringDeposit) || inputs.recurringDeposit < 0)) {
    return "Recurring deposit must be a non-negative number.";
  }
  if (inputs.recurringWithdrawal != null && (!isFinite(inputs.recurringWithdrawal) || inputs.recurringWithdrawal < 0)) {
    return "Recurring withdrawal must be a non-negative number.";
  }
  if (inputs.fixedFeePerPeriod != null && (!isFinite(inputs.fixedFeePerPeriod) || inputs.fixedFeePerPeriod < 0)) {
    return "Fixed fee must be a non-negative number.";
  }
  if (inputs.percentageFee != null && (!isFinite(inputs.percentageFee) || inputs.percentageFee < 0 || inputs.percentageFee > 100)) {
    return "Percentage fee must be between 0 and 100.";
  }

  if (inputs.mode === "STANDARD") {
    if (inputs.returnPerPeriod == null || !isFinite(inputs.returnPerPeriod)) {
      return "Return per period must be a finite number.";
    }
    if (inputs.returnPerPeriod < -100) {
      return "Return per period cannot be less than -100%.";
    }
  }

  if (inputs.mode === "VARIABLE") {
    if (!inputs.variableReturns || inputs.variableReturns.length < 1) {
      return "Enter at least one return for variable mode.";
    }
    for (const r of inputs.variableReturns) {
      if (!isFinite(r) || r < -100) {
        return "Each variable return must be a finite number not less than -100%.";
      }
    }
  }

  if (inputs.mode === "WIN_LOSS") {
    if (inputs.winRate == null || !isFinite(inputs.winRate) || inputs.winRate < 0 || inputs.winRate > 100) {
      return "Win rate must be between 0 and 100.";
    }
    if (inputs.averageWinReturn == null || !isFinite(inputs.averageWinReturn) || inputs.averageWinReturn <= 0) {
      return "Average winning-period return must be a positive number.";
    }
    if (inputs.averageLossReturn == null || !isFinite(inputs.averageLossReturn) || inputs.averageLossReturn >= 0) {
      return "Average losing-period return must be a negative number (e.g. -2).";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  CORE PERIOD CALCULATION                                            */
/* ------------------------------------------------------------------ */

/**
 * Calculate a single period.
 *
 * Order: opening → deposit → withdrawal → return → fixedFee → %fee → closing
 * Withdrawals cannot exceed available balance (opening + deposit).
 * Account cannot go below zero.
 */
function calculatePeriod(
  openingBalance: number,
  deposit: number,
  withdrawal: number,
  returnPercent: number,
  fixedFee: number,
  percentageFee: number,
  prevPeak: number,
): PeriodResult {
  let balance = openingBalance;

  // 1. Deposit
  balance += deposit;

  // 2. Withdrawal (cannot exceed available balance)
  const actualWithdrawal = Math.min(withdrawal, balance);
  balance -= actualWithdrawal;

  // 3. Period return
  const r = returnPercent / 100;
  const returnAmount = balance * r;
  balance += returnAmount;

  // 4. Fixed fee
  const actualFixedFee = Math.min(fixedFee, Math.max(0, balance));
  balance -= actualFixedFee;

  // 5. Percentage fee (of post-return, post-fixed-fee balance)
  const percentageFeeAmount = balance * (percentageFee / 100);
  balance -= percentageFeeAmount;

  // Account cannot go below zero
  if (balance < 0) balance = 0;

  // Peak and drawdown
  const peakBalance = Math.max(prevPeak, balance);
  const drawdownPercent = peakBalance > 0
    ? ((peakBalance - balance) / peakBalance) * 100
    : 0;

  return {
    period: 0, // set by caller
    openingBalance,
    deposit,
    withdrawal: actualWithdrawal,
    returnPercent,
    returnAmount,
    fixedFee: actualFixedFee,
    percentageFeeAmount,
    closingBalance: balance,
    peakBalance,
    drawdownPercent,
  };
}

/* ------------------------------------------------------------------ */
/*  MAIN CALCULATION                                                   */
/* ------------------------------------------------------------------ */

export function calculateCompounding(inputs: CompoundingInputs): CompoundingResult {
  const validationError = validateCompoundingInputs(inputs);
  if (validationError) {
    return buildErrorResult(inputs, validationError);
  }

  const {
    initialBalance,
    numberOfPeriods,
  } = inputs;

  const deposit = inputs.recurringDeposit ?? 0;
  const withdrawal = inputs.recurringWithdrawal ?? 0;
  const fixedFee = inputs.fixedFeePerPeriod ?? 0;
  const percentageFee = inputs.percentageFee ?? 0;

  // Generate return sequence based on mode
  let returns: number[] = [];
  let winFlags: (boolean | null)[] = [];

  if (inputs.mode === "STANDARD") {
    const r = inputs.returnPerPeriod!;
    returns = new Array(numberOfPeriods).fill(r);
    winFlags = new Array(numberOfPeriods).fill(null);
  } else if (inputs.mode === "VARIABLE") {
    // Copy the array to avoid mutating the caller's input
    returns = [...inputs.variableReturns!];
    // If fewer returns than periods, pad with 0 (not silently repeated)
    while (returns.length < numberOfPeriods) returns.push(0);
    // If more returns than periods, truncate
    returns = returns.slice(0, numberOfPeriods);
    winFlags = new Array(numberOfPeriods).fill(null);
  } else if (inputs.mode === "WIN_LOSS") {
    const winRate = inputs.winRate!;
    const avgWin = inputs.averageWinReturn!;
    const avgLoss = inputs.averageLossReturn!;
    const seed = inputs.seed ?? 20261012;
    const rng = createSeededRandom(seed);
    const p = winRate / 100;
    for (let i = 0; i < numberOfPeriods; i++) {
      if (rng() < p) {
        returns.push(avgWin);
        winFlags.push(true);
      } else {
        returns.push(avgLoss);
        winFlags.push(false);
      }
    }
  }

  // Calculate periods
  const periods: PeriodResult[] = [];
  let balance = initialBalance;
  let peak = initialBalance;
  let totalDeposits = 0;
  let totalWithdrawals = 0;
  let totalFees = 0;
  let highestBalance = initialBalance;
  let lowestBalance = initialBalance;
  let maxDrawdownPercent = 0;
  let bestPeriodReturn = returns[0] ?? 0;
  let worstPeriodReturn = returns[0] ?? 0;

  // Simple growth (non-compounded) tracking
  // Simple = initialBalance + sum(returnAmounts based on initialBalance) + deposits - withdrawals - fees
  let simpleBalance = initialBalance;
  let simpleTotalDeposits = 0;
  let simpleTotalWithdrawals = 0;
  let simpleTotalFees = 0;

  for (let i = 0; i < numberOfPeriods; i++) {
    const r = returns[i];
    const result = calculatePeriod(
      balance, deposit, withdrawal, r, fixedFee, percentageFee, peak,
    );
    result.period = i + 1;
    result.isWin = winFlags[i] ?? null;
    periods.push(result);

    balance = result.closingBalance;
    peak = result.peakBalance;
    totalDeposits += result.deposit;
    totalWithdrawals += result.withdrawal;
    totalFees += result.fixedFee + result.percentageFeeAmount;

    if (balance > highestBalance) highestBalance = balance;
    if (balance < lowestBalance) lowestBalance = balance;
    if (result.drawdownPercent > maxDrawdownPercent) maxDrawdownPercent = result.drawdownPercent;

    if (r > bestPeriodReturn) bestPeriodReturn = r;
    if (r < worstPeriodReturn) worstPeriodReturn = r;

    // Simple growth: return based on initialBalance (not current balance)
    const simpleReturnAmount = (initialBalance + simpleTotalDeposits - simpleTotalWithdrawals) * (r / 100);
    simpleBalance += simpleReturnAmount;
    simpleTotalDeposits += deposit;
    const simpleActualWithdrawal = Math.min(withdrawal, simpleBalance);
    simpleBalance -= simpleActualWithdrawal;
    simpleTotalWithdrawals += simpleActualWithdrawal;
    simpleBalance -= fixedFee;
    simpleBalance -= simpleBalance * (percentageFee / 100);
    if (simpleBalance < 0) simpleBalance = 0;
  }

  const finalBalance = balance;
  // Net gain/loss = pure trading performance. Fees are already deducted from
  // the closing balance, so they are NOT added back here. Deposits and
  // withdrawals are external cash flows, not trading performance.
  const netGainLoss = finalBalance - initialBalance - totalDeposits + totalWithdrawals;
  const totalContributedCapital = initialBalance + totalDeposits;
  const totalReturnPercent = totalContributedCapital > 0
    ? (netGainLoss / totalContributedCapital) * 100
    : 0;
  const recoveryGainPercent = maxDrawdownPercent > 0 && maxDrawdownPercent < 100
    ? (maxDrawdownPercent / (100 - maxDrawdownPercent)) * 100
    : maxDrawdownPercent >= 100 ? Infinity : 0;

  // Drawdown basis label: the drawdown is measured from raw account-balance
  // peaks, which include external deposits and withdrawals. This means a
  // withdrawal can increase the drawdown percentage even without a trading
  // loss. The label makes this distinction explicit.
  const hasCashFlows = (deposit > 0 || withdrawal > 0);
  const drawdownBasis = hasCashFlows
    ? "Raw account-balance drawdown (includes deposits and withdrawals)"
    : "Account-balance drawdown";

  // Break-even: the return per period needed to offset fees
  // If fixedFee + percentageFee per period, break-even return ≈ (fees / balance) × 100
  const totalFeePerPeriod = fixedFee + (initialBalance * (percentageFee / 100));
  const breakEvenReturnPerPeriod = initialBalance > 0
    ? (totalFeePerPeriod / initialBalance) * 100
    : 0;

  return {
    valid: true,
    mode: inputs.mode,
    periods,
    initialBalance,
    finalBalance,
    netGainLoss,
    totalReturnPercent,
    totalDeposits,
    totalWithdrawals,
    totalFees,
    totalContributedCapital,
    simpleGrowthBalance: simpleBalance,
    highestBalance,
    lowestBalance,
    maxDrawdownPercent,
    drawdownBasis,
    recoveryGainPercent,
    bestPeriodReturn,
    worstPeriodReturn,
    breakEvenReturnPerPeriod,
  };
}

/* ------------------------------------------------------------------ */
/*  CSV EXPORT                                                         */
/* ------------------------------------------------------------------ */

export function generateCSV(result: CompoundingResult): string {
  const header = [
    "Period",
    "Opening Balance",
    "Deposit",
    "Withdrawal",
    "Return %",
    "Return Amount",
    "Fixed Fee",
    "Percentage Fee",
    "Closing Balance",
    "Peak Balance",
    "Drawdown %",
  ];
  const lines = [header.join(",")];
  for (const p of result.periods) {
    lines.push([
      p.period,
      roundTo(p.openingBalance, 2).toFixed(2),
      roundTo(p.deposit, 2).toFixed(2),
      roundTo(p.withdrawal, 2).toFixed(2),
      roundTo(p.returnPercent, 4).toFixed(4),
      roundTo(p.returnAmount, 2).toFixed(2),
      roundTo(p.fixedFee, 2).toFixed(2),
      roundTo(p.percentageFeeAmount, 2).toFixed(2),
      roundTo(p.closingBalance, 2).toFixed(2),
      roundTo(p.peakBalance, 2).toFixed(2),
      roundTo(p.drawdownPercent, 4).toFixed(4),
    ].join(","));
  }
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  ERROR RESULT HELPER                                                */
/* ------------------------------------------------------------------ */

function buildErrorResult(inputs: CompoundingInputs, error: string): CompoundingResult {
  return {
    valid: false,
    error,
    mode: inputs.mode,
    periods: [],
    initialBalance: inputs.initialBalance,
    finalBalance: 0,
    netGainLoss: 0,
    totalReturnPercent: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalFees: 0,
    totalContributedCapital: inputs.initialBalance,
    simpleGrowthBalance: 0,
    highestBalance: 0,
    lowestBalance: 0,
    maxDrawdownPercent: 0,
    drawdownBasis: "Account-balance drawdown",
    recoveryGainPercent: 0,
    bestPeriodReturn: 0,
    worstPeriodReturn: 0,
    breakEvenReturnPerPeriod: 0,
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: CompoundingInputs = {
  mode: "STANDARD",
  initialBalance: 1000,
  accountCurrency: "USD",
  returnPerPeriod: 2,
  numberOfPeriods: 12,
  frequency: "MONTHLY",
  recurringDeposit: 0,
  recurringWithdrawal: 0,
  fixedFeePerPeriod: 0,
  percentageFee: 0,
  variableReturns: [2, 3, -1, 4, 1.5, -2, 3, 2, -1, 1.5, 2.5, 1],
  winRate: 55,
  averageWinReturn: 3,
  averageLossReturn: -2,
  seed: 20261012,
};

export const FREQUENCY_LABELS: Record<CompoundingFrequency, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
};

export const CURRENCIES = ["USD", "EUR", "GBP"];
