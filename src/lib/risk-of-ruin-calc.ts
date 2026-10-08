/**
 * Trading Risk of Ruin & Losing Streak Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for risk-of-ruin, losing-streak probability,
 * drawdown/recovery, and risk-comparison calculations.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * KEY TRANSPARENCY:
 *   - Expectancy, break-even, drawdown, recovery, losing-streak probability
 *     are EXACT deterministic mathematics.
 *   - Threshold-hit probability is a finite-horizon Monte Carlo SIMULATION
 *     estimate, not an exact probability.
 */

export type CalculatorMode = "RISK_OF_RUIN" | "LOSING_STREAK" | "DRAWDOWN_RECOVERY" | "RISK_COMPARISON";
export type ThresholdBasis = "STARTING_BALANCE_LOSS" | "PEAK_DRAWDOWN";

/* ------------------------------------------------------------------ */
/*  CORE TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface RiskOfRuinInputs {
  mode: CalculatorMode;
  // Strategy statistics
  winRate: number; // percentage 0-100
  averageWinR: number; // in R multiples
  averageLossR: number; // in R multiples
  riskPercent: number; // fractional risk per trade (%)
  startingBalance: number;
  // Monte Carlo
  tradeHorizon: number;
  thresholdPercent: number;
  thresholdBasis: ThresholdBasis;
  simulationPaths: number;
  seed: number;
  // Losing streak mode
  streakLength?: number;
  numberOfTrades?: number;
  // Drawdown & recovery mode
  consecutiveLosses?: number;
  targetDrawdownPercent?: number;
  // Risk comparison
  customRiskPercent?: number;
}

export interface ExpectancyResult {
  expectancy: number; // in R
  breakEvenWinRate: number; // percentage
  isPositive: boolean;
}

export interface StreakProbabilityResult {
  probability: number; // 0-1
  percentage: number; // 0-100
}

export interface DrawdownResult {
  endingBalance: number;
  moneyLost: number;
  drawdownDecimal: number;
  drawdownPercent: number;
  lossMultiplier: number;
  recoveryGainDecimal: number;
  recoveryGainPercent: number;
  perTrade: DrawdownTradeRow[];
}

export interface DrawdownTradeRow {
  lossNumber: number;
  startingEquity: number;
  lossAmount: number;
  endingEquity: number;
  cumulativeDrawdownPercent: number;
}

export interface LossesToThresholdResult {
  losses: number;
  // Verification: balance after (losses-1) is still above threshold floor
  balanceBeforeLoss: number;
  balanceAfterLoss: number;
}

export interface SimulationPathResult {
  hitThreshold: boolean;
  endingBalance: number;
  maxDrawdown: number; // peak-to-trough decimal
  longestLosingStreak: number;
}

export interface SimulationSummary {
  thresholdHitProbability: number; // 0-1
  thresholdHitPercentage: number; // 0-100
  paths: number;
  horizon: number;
  medianEndingBalance: number;
  p10EndingBalance: number;
  p90EndingBalance: number;
  medianMaxDrawdown: number; // decimal
  p90MaxDrawdown: number; // decimal
  medianLongestLosingStreak: number;
  probabilityBelowStart: number; // 0-1
  averageEndingBalance: number;
}

export interface StreakTableRow {
  streak: number;
  probability: number; // 0-1
  percentage: number;
  drawdownPercent: number;
  recoveryGainPercent: number;
}

export interface RiskComparisonRow {
  riskPercent: number;
  lossAfter5Percent: number;
  lossAfter10Percent: number;
  lossesToThreshold: number | null;
  simulatedThresholdHitProbability: number | null;
}

/* ------------------------------------------------------------------ */
/*  FLOATING-POINT SAFE ROUNDING                                       */
/* ------------------------------------------------------------------ */

export function roundTo(value: number, decimals: number): number {
  if (!isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Number((Math.round(value * factor) / factor).toFixed(decimals));
}

/* ------------------------------------------------------------------ */
/*  SEEDED PRNG (Mulberry32)                                           */
/* ------------------------------------------------------------------ */

/**
 * Mulberry32 — a simple, fast, deterministic seeded PRNG.
 * Returns a function that produces numbers in [0, 1).
 * Same seed always produces the same sequence.
 */
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
/*  EXPECTANCY                                                         */
/* ------------------------------------------------------------------ */

export function calculateExpectancy(
  winRate: number,
  averageWinR: number,
  averageLossR: number,
): ExpectancyResult {
  const p = winRate / 100;
  const q = 1 - p;
  const expectancy = p * averageWinR - q * averageLossR;
  const breakEvenWinRate = (averageWinR + averageLossR) > 0
    ? (averageLossR / (averageWinR + averageLossR)) * 100
    : 0;
  return {
    expectancy,
    breakEvenWinRate,
    isPositive: expectancy > 0,
  };
}

/* ------------------------------------------------------------------ */
/*  EXACT LOSING-STREAK PROBABILITY (Dynamic Programming)              */
/* ------------------------------------------------------------------ */

/**
 * Exact probability of experiencing AT LEAST one run of `streakLength`
 * consecutive losses within `numTrades` independent trades, given
 * `winRate` (percentage).
 *
 * Uses dynamic programming with states j = 0..k-1 (current run of j losses).
 *
 * This is EXACT under the independent, constant-probability Bernoulli model.
 * It is NOT the naive formula 1 - (1 - q^k)^N.
 */
export function calculateExactLosingStreakProbability(
  winRate: number,
  numTrades: number,
  streakLength: number,
): StreakProbabilityResult {
  const p = winRate / 100;
  const q = 1 - p;
  const N = Math.floor(numTrades);
  const k = Math.floor(streakLength);

  // Edge cases
  if (k < 1 || N < 1) return { probability: 0, percentage: 0 };
  if (k > N) return { probability: 0, percentage: 0 };
  if (p >= 1) return { probability: 0, percentage: 0 }; // win rate 100% → no losses
  if (p <= 0) {
    // win rate 0% → every trade is a loss
    if (N >= k) return { probability: 1, percentage: 100 };
    return { probability: 0, percentage: 0 };
  }

  // DP: dp[j] = probability of being in state j (j consecutive losses at end, no streak yet)
  // j ranges 0..k-1. State k is the absorbing "streak occurred" state.
  let dp = new Array(k).fill(0);
  dp[0] = 1;

  for (let trade = 0; trade < N; trade++) {
    const next = new Array(k).fill(0);
    for (let j = 0; j < k; j++) {
      if (dp[j] === 0) continue;
      // WIN: resets to state 0
      next[0] += dp[j] * p;
      // LOSS: moves to j+1, unless j+1 === k (absorbed into streak-occurred)
      if (j + 1 < k) {
        next[j + 1] += dp[j] * q;
      }
      // if j + 1 === k, the probability goes to the absorbing state (lost from next)
    }
    dp = next;
  }

  const probNoStreak = dp.reduce((s, v) => s + v, 0);
  const probability = Math.max(0, Math.min(1, 1 - probNoStreak));
  return { probability, percentage: probability * 100 };
}

/* ------------------------------------------------------------------ */
/*  DRAWDOWN FROM CONSECUTIVE LOSSES                                   */
/* ------------------------------------------------------------------ */

/**
 * Drawdown after `n` consecutive losses under fixed-fractional risk.
 *
 * LossMultiplier = 1 - r × L  (where r = riskPercent/100, L = averageLossR)
 * EndingBalance = StartingBalance × LossMultiplier^n
 * DrawdownDecimal = 1 - EndingBalance/StartingBalance = 1 - LossMultiplier^n
 */
export function calculateConsecutiveLossDrawdown(
  startingBalance: number,
  riskPercent: number,
  averageLossR: number,
  consecutiveLosses: number,
): DrawdownResult {
  const r = riskPercent / 100;
  const lossMultiplier = 1 - r * averageLossR;
  const n = Math.floor(consecutiveLosses);

  const perTrade: DrawdownTradeRow[] = [];
  let equity = startingBalance;

  for (let i = 1; i <= n; i++) {
    const startEquity = equity;
    const lossAmount = startEquity * r * averageLossR;
    const endEquity = startEquity - lossAmount;
    const cumulativeDrawdownPercent = (1 - endEquity / startingBalance) * 100;
    perTrade.push({
      lossNumber: i,
      startingEquity: startEquity,
      lossAmount,
      endingEquity: endEquity,
      cumulativeDrawdownPercent,
    });
    equity = endEquity;
  }

  const endingBalance = startingBalance * Math.pow(lossMultiplier, n);
  const moneyLost = startingBalance - endingBalance;
  const drawdownDecimal = 1 - Math.pow(lossMultiplier, n);
  const drawdownPercent = drawdownDecimal * 100;
  const recoveryGainDecimal = drawdownDecimal / (1 - drawdownDecimal);
  const recoveryGainPercent = recoveryGainDecimal * 100;

  return {
    endingBalance,
    moneyLost,
    drawdownDecimal,
    drawdownPercent,
    lossMultiplier,
    recoveryGainDecimal,
    recoveryGainPercent,
    perTrade,
  };
}

/* ------------------------------------------------------------------ */
/*  RECOVERY GAIN                                                      */
/* ------------------------------------------------------------------ */

/**
 * Recovery gain required to return to starting balance after a drawdown.
 * RecoveryGain = d / (1 - d) where d is the drawdown decimal.
 */
export function calculateRecoveryGain(drawdownDecimal: number): number {
  if (drawdownDecimal >= 1) return Infinity;
  if (drawdownDecimal <= 0) return 0;
  return drawdownDecimal / (1 - drawdownDecimal);
}

/* ------------------------------------------------------------------ */
/*  LOSSES TO THRESHOLD                                                */
/* ------------------------------------------------------------------ */

/**
 * Smallest integer n where LossMultiplier^n <= (1 - D)
 * i.e., n = ceil(ln(1-D) / ln(m))
 *
 * Verifies post-ceiling due to floating-point boundaries.
 */
export function calculateLossesToDrawdown(
  startingBalance: number,
  riskPercent: number,
  averageLossR: number,
  targetDrawdownDecimal: number,
): LossesToThresholdResult {
  const r = riskPercent / 100;
  const m = 1 - r * averageLossR;
  const D = targetDrawdownDecimal;

  if (m <= 0 || m >= 1) return { losses: Infinity, balanceBeforeLoss: startingBalance, balanceAfterLoss: 0 };
  if (D <= 0 || D >= 1) return { losses: 0, balanceBeforeLoss: startingBalance, balanceAfterLoss: startingBalance };

  const rawN = Math.log(1 - D) / Math.log(m);
  let n = Math.ceil(rawN);

  // Post-ceiling verification (floating-point boundary)
  // Ensure m^n <= 1-D and m^(n-1) > 1-D
  while (n > 0 && Math.pow(m, n) <= 1 - D + 1e-12) {
    // Check if n-1 also satisfies (shouldn't, but verify)
    if (Math.pow(m, n - 1) > 1 - D + 1e-12) break;
    n--;
  }
  while (Math.pow(m, n) > 1 - D + 1e-12) {
    n++;
  }

  const balanceBeforeLoss = startingBalance * Math.pow(m, n - 1);
  const balanceAfterLoss = startingBalance * Math.pow(m, n);
  return { losses: n, balanceBeforeLoss, balanceAfterLoss };
}

/* ------------------------------------------------------------------ */
/*  PERCENTILE                                                         */
/* ------------------------------------------------------------------ */

/**
 * Nearest-rank percentile from a sorted array.
 * percentile is 0-100.
 */
export function calculatePercentile(sortedValues: number[], percentile: number): number {
  if (sortedValues.length === 0) return NaN;
  if (sortedValues.length === 1) return sortedValues[0];
  const rank = (percentile / 100) * (sortedValues.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sortedValues[lower];
  const weight = rank - lower;
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
}

/* ------------------------------------------------------------------ */
/*  MONTE CARLO SIMULATION                                             */
/* ------------------------------------------------------------------ */

/**
 * Run a single simulated trading path.
 * Returns the path outcome.
 */
function simulatePath(
  winRate: number,
  averageWinR: number,
  averageLossR: number,
  riskPercent: number,
  startingBalance: number,
  horizon: number,
  thresholdPercent: number,
  thresholdBasis: ThresholdBasis,
  rng: () => number,
): SimulationPathResult {
  const p = winRate / 100;
  const r = riskPercent / 100;
  const winMult = 1 + r * averageWinR;
  const lossMult = 1 - r * averageLossR;
  const thresholdFloor = startingBalance * (1 - thresholdPercent / 100);
  const thresholdDD = thresholdPercent / 100;

  let equity = startingBalance;
  let peak = startingBalance;
  let maxDrawdown = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let hitThreshold = false;

  for (let i = 0; i < horizon; i++) {
    if (rng() < p) {
      // WIN
      equity *= winMult;
      currentStreak = 0;
    } else {
      // LOSS
      equity *= lossMult;
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    }

    if (equity > peak) peak = equity;
    const dd = 1 - equity / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;

    // Check threshold
    if (thresholdBasis === "STARTING_BALANCE_LOSS") {
      if (equity <= thresholdFloor) {
        hitThreshold = true;
        break;
      }
    } else {
      // PEAK_DRAWDOWN
      if (dd >= thresholdDD) {
        hitThreshold = true;
        break;
      }
    }
  }

  return {
    hitThreshold,
    endingBalance: equity,
    maxDrawdown,
    longestLosingStreak: longestStreak,
  };
}

/**
 * Run the full Monte Carlo simulation across N paths.
 * Uses a seeded PRNG for reproducibility.
 */
export function simulateRiskOfRuin(
  winRate: number,
  averageWinR: number,
  averageLossR: number,
  riskPercent: number,
  startingBalance: number,
  horizon: number,
  thresholdPercent: number,
  thresholdBasis: ThresholdBasis,
  paths: number,
  seed: number,
): SimulationSummary {
  const rng = createSeededRandom(seed);
  const results: SimulationPathResult[] = [];

  for (let i = 0; i < paths; i++) {
    results.push(simulatePath(
      winRate, averageWinR, averageLossR, riskPercent,
      startingBalance, horizon, thresholdPercent, thresholdBasis, rng,
    ));
  }

  const hitCount = results.filter((r) => r.hitThreshold).length;
  const thresholdHitProbability = hitCount / paths;

  const endingBalances = results.map((r) => r.endingBalance).sort((a, b) => a - b);
  const maxDrawdowns = results.map((r) => r.maxDrawdown).sort((a, b) => a - b);
  const streaks = results.map((r) => r.longestLosingStreak).sort((a, b) => a - b);

  const medianEndingBalance = calculatePercentile(endingBalances, 50);
  const p10EndingBalance = calculatePercentile(endingBalances, 10);
  const p90EndingBalance = calculatePercentile(endingBalances, 90);
  const medianMaxDrawdown = calculatePercentile(maxDrawdowns, 50);
  const p90MaxDrawdown = calculatePercentile(maxDrawdowns, 90);
  const medianLongestLosingStreak = calculatePercentile(streaks, 50);
  const probabilityBelowStart = results.filter((r) => r.endingBalance < startingBalance).length / paths;
  const averageEndingBalance = endingBalances.reduce((s, v) => s + v, 0) / paths;

  return {
    thresholdHitProbability,
    thresholdHitPercentage: thresholdHitProbability * 100,
    paths,
    horizon,
    medianEndingBalance,
    p10EndingBalance,
    p90EndingBalance,
    medianMaxDrawdown,
    p90MaxDrawdown,
    medianLongestLosingStreak,
    probabilityBelowStart,
    averageEndingBalance,
  };
}

/* ------------------------------------------------------------------ */
/*  LOSING STREAK TABLE                                                */
/* ------------------------------------------------------------------ */

export function buildLosingStreakTable(
  winRate: number,
  numTrades: number,
  riskPercent: number,
  averageLossR: number,
  customStreak?: number,
): StreakTableRow[] {
  const streaks = [2, 3, 4, 5, 6, 7, 8, 10];
  if (customStreak != null && customStreak > 0 && !streaks.includes(customStreak)) {
    streaks.push(customStreak);
    streaks.sort((a, b) => a - b);
  }

  return streaks.map((k) => {
    const sp = calculateExactLosingStreakProbability(winRate, numTrades, k);
    const dd = calculateConsecutiveLossDrawdown(10000, riskPercent, averageLossR, k);
    return {
      streak: k,
      probability: sp.probability,
      percentage: sp.percentage,
      drawdownPercent: dd.drawdownPercent,
      recoveryGainPercent: dd.recoveryGainPercent,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  RISK COMPARISON                                                    */
/* ------------------------------------------------------------------ */

export const RISK_COMPARISON_LEVELS = [0.25, 0.5, 1.0, 1.5, 2.0, 3.0, 5.0];

export function buildRiskComparison(
  winRate: number,
  averageWinR: number,
  averageLossR: number,
  startingBalance: number,
  horizon: number,
  thresholdPercent: number,
  thresholdBasis: ThresholdBasis,
  seed: number,
  customRisk?: number,
  runSimulation = false,
  simPaths = 2000,
): RiskComparisonRow[] {
  const levels = [...RISK_COMPARISON_LEVELS];
  if (customRisk != null && customRisk > 0 && !levels.includes(customRisk)) {
    levels.push(customRisk);
    levels.sort((a, b) => a - b);
  }

  return levels.map((risk) => {
    const dd5 = calculateConsecutiveLossDrawdown(startingBalance, risk, averageLossR, 5);
    const dd10 = calculateConsecutiveLossDrawdown(startingBalance, risk, averageLossR, 10);
    const lossesResult = calculateLossesToDrawdown(startingBalance, risk, averageLossR, thresholdPercent / 100);

    let simProb: number | null = null;
    if (runSimulation) {
      const summary = simulateRiskOfRuin(
        winRate, averageWinR, averageLossR, risk,
        startingBalance, horizon, thresholdPercent, thresholdBasis,
        simPaths, seed,
      );
      simProb = summary.thresholdHitProbability;
    }

    return {
      riskPercent: risk,
      lossAfter5Percent: dd5.drawdownPercent,
      lossAfter10Percent: dd10.drawdownPercent,
      lossesToThreshold: isFinite(lossesResult.losses) ? lossesResult.losses : null,
      simulatedThresholdHitProbability: simProb,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

export function validateRiskOfRuinInputs(inputs: RiskOfRuinInputs): string | null {
  const { winRate, averageWinR, averageLossR, riskPercent, startingBalance } = inputs;

  if (!isFinite(winRate) || winRate < 0 || winRate > 100) {
    return "Win rate must be between 0 and 100.";
  }
  if (!isFinite(averageWinR) || averageWinR <= 0) {
    return "Average win must be a positive number.";
  }
  if (!isFinite(averageLossR) || averageLossR <= 0) {
    return "Average loss must be a positive number.";
  }
  if (!isFinite(riskPercent) || riskPercent <= 0) {
    return "Risk per trade must be a positive number.";
  }
  if (riskPercent * averageLossR >= 100) {
    return "Risk × average loss must be less than 100% (a single loss must not wipe out the account).";
  }
  if (!isFinite(startingBalance) || startingBalance <= 0) {
    return "Starting balance must be a positive number.";
  }

  if (inputs.mode === "RISK_OF_RUIN") {
    if (!isFinite(inputs.tradeHorizon) || inputs.tradeHorizon < 10 || inputs.tradeHorizon > 2000) {
      return "Trade horizon must be between 10 and 2000.";
    }
    if (!isFinite(inputs.thresholdPercent) || inputs.thresholdPercent <= 0 || inputs.thresholdPercent >= 100) {
      return "Threshold must be between 0 and 100 (exclusive).";
    }
    if (!isFinite(inputs.simulationPaths) || inputs.simulationPaths < 100 || inputs.simulationPaths > 10000) {
      return "Simulation paths must be between 100 and 10000.";
    }
  }

  if (inputs.mode === "LOSING_STREAK") {
    if (inputs.numberOfTrades == null || !isFinite(inputs.numberOfTrades) || inputs.numberOfTrades < 1) {
      return "Number of trades must be at least 1.";
    }
    if (inputs.streakLength == null || !isFinite(inputs.streakLength) || inputs.streakLength < 1) {
      return "Streak length must be at least 1.";
    }
    if (inputs.streakLength > inputs.numberOfTrades) {
      return "Streak length cannot exceed the number of trades.";
    }
  }

  if (inputs.mode === "DRAWDOWN_RECOVERY") {
    if (inputs.consecutiveLosses == null || !isFinite(inputs.consecutiveLosses) || inputs.consecutiveLosses < 1) {
      return "Consecutive losses must be at least 1.";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: RiskOfRuinInputs = {
  mode: "RISK_OF_RUIN",
  winRate: 50,
  averageWinR: 1.5,
  averageLossR: 1,
  riskPercent: 1,
  startingBalance: 10000,
  tradeHorizon: 200,
  thresholdPercent: 30,
  thresholdBasis: "STARTING_BALANCE_LOSS",
  simulationPaths: 5000,
  seed: 20261008,
  streakLength: 5,
  numberOfTrades: 100,
  consecutiveLosses: 5,
  targetDrawdownPercent: 20,
};

export const SIMULATION_PATH_OPTIONS = [1000, 2500, 5000, 10000];

/** Static recovery table (spec §25). */
export const RECOVERY_TABLE = [
  { drawdown: 5, recovery: 5.26 },
  { drawdown: 10, recovery: 11.11 },
  { drawdown: 20, recovery: 25.0 },
  { drawdown: 30, recovery: 42.86 },
  { drawdown: 40, recovery: 66.67 },
  { drawdown: 50, recovery: 100.0 },
  { drawdown: 60, recovery: 150.0 },
  { drawdown: 70, recovery: 233.33 },
  { drawdown: 80, recovery: 400.0 },
  { drawdown: 90, recovery: 900.0 },
];
