/**
 * Forex & XAUUSD Risk Reward Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for risk/reward trade planning.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Terminology standard (used everywhere):
 *   Risk Distance   = |Entry − Stop|
 *   Reward Distance = |Target − Entry|
 *   Reward Multiple R = Reward Distance / Risk Distance
 *   Risk : Reward   = 1 : R
 *
 * Directional validation happens BEFORE distance calculations.
 * We never use abs() to silently accept an invalid trade layout.
 */

export type Direction = "LONG" | "SHORT";

export type DisplayMode =
  | "GENERIC"
  | "XAUUSD_001" // $0.01 gold increment convention
  | "XAUUSD_010" // $0.10 gold increment convention
  | "FOREX_STANDARD" // 0.0001
  | "FOREX_JPY" // 0.01
  | "CUSTOM";

export type CalculatorMode =
  | "ANALYZE" // Analyze an existing trade (entry + stop + target)
  | "FIND_TARGET" // Solve take profit from desired R
  | "FIND_STOP" // Solve stop loss from desired R
  | "MULTI_TARGET"; // Up to 4 partial take-profit targets

export interface RiskRewardInputs {
  mode: CalculatorMode;
  direction: Direction;
  entry: number;
  /** Used by ANALYZE, FIND_TARGET, MULTI_TARGET */
  stop?: number;
  /** Used by ANALYZE, FIND_STOP, MULTI_TARGET */
  target?: number;
  /** Used by FIND_TARGET, FIND_STOP */
  desiredR?: number;
  /** Display mode for pip/increment distance reporting (does not affect R:R) */
  displayMode?: DisplayMode;
  /** Custom increment value when displayMode === "CUSTOM" */
  customIncrement?: number;
  /** Optional risk amount in account currency (>= 0) */
  riskAmount?: number | null;
  /** Optional historical win rate percentage (0–100) */
  winRate?: number | null;
  /** Optional estimated round-trip trading cost in PRICE-DISTANCE units (>= 0) */
  tradingCost?: number | null;
  /** Multi-target plan (1–4 targets). Only used in MULTI_TARGET mode. */
  targets?: MultiTargetInput[];
}

export interface MultiTargetInput {
  targetPrice: number;
  /** Allocation percentage (0–100). All active targets must total 100. */
  allocationPercent: number;
}

export interface MultiTargetResult {
  targetPrice: number;
  allocationPercent: number;
  allocationWeight: number;
  rewardDistance: number;
  rMultiple: number;
}

export interface CostAdjustedMetrics {
  /** Estimated round-trip cost in price-distance units */
  cost: number;
  /** (reward − c) / (risk + c) — only defined when reward − c > 0 */
  netR: number | null;
  /** (risk + c) / (risk + reward) × 100 */
  adjustedBreakEvenWinRate: number;
  /** Cost-adjusted expectancy in original-risk R units (if win rate supplied) */
  costAdjustedExpectancy: number | null;
}

export interface RiskRewardResult {
  valid: boolean;
  error?: string;
  mode: CalculatorMode;
  direction: Direction;
  /** Entry price used */
  entry: number;
  /** Stop loss (input or solved) */
  stop?: number;
  /** Take profit (input or solved), single-target modes */
  target?: number;
  /** Reward multiple R = reward / risk */
  rMultiple: number;
  /** Risk distance in price units */
  riskDistance: number;
  /** Reward distance in price units */
  rewardDistance: number;
  /** Risk distance as % of entry */
  riskPercentFromEntry: number;
  /** Reward distance as % of entry */
  rewardPercentFromEntry: number;
  /** Risk distance expressed in increment (pip) units, if display mode set */
  riskIncrementUnits: number | null;
  /** Reward distance expressed in increment (pip) units, if display mode set */
  rewardIncrementUnits: number | null;
  /** Increment size used for display (0.0001 / 0.01 / 0.01 / 0.10 / custom) */
  incrementSize: number | null;
  /** Theoretical break-even win rate (binary, before costs): 1/(1+R) × 100 */
  breakEvenWinRate: number | null;
  /** Potential gross reward if riskAmount supplied */
  potentialGrossReward: number | null;
  /** Mathematical expectancy in R units if winRate supplied (gross) */
  expectancy: number | null;
  /** Cost-adjusted metrics if tradingCost supplied (single-target only) */
  costAdjusted: CostAdjustedMetrics | null;
  /** Multi-target plan results (MULTI_TARGET mode only) */
  multiTarget?: {
    targets: MultiTargetResult[];
    weightedR: number;
  };
}

/* ------------------------------------------------------------------ */
/*  DISPLAY MODE → INCREMENT SIZE                                      */
/* ------------------------------------------------------------------ */

export function getIncrementSize(
  mode: DisplayMode | undefined,
  customIncrement: number | undefined,
): number | null {
  if (!mode || mode === "GENERIC") return null;
  if (mode === "CUSTOM") {
    if (customIncrement == null || !isFinite(customIncrement) || customIncrement <= 0) {
      return null;
    }
    return customIncrement;
  }
  switch (mode) {
    case "XAUUSD_001":
      return 0.01;
    case "XAUUSD_010":
      return 0.10;
    case "FOREX_STANDARD":
      return 0.0001;
    case "FOREX_JPY":
      return 0.01;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  FLOATING-POINT SAFE ROUNDING (display only)                        */
/* ------------------------------------------------------------------ */

/** Round to a fixed number of decimals for display. Returns a number. */
export function roundTo(value: number, decimals: number): number {
  if (!isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  // Use toFixed-based rounding to avoid binary float artifacts (e.g. 1.9999999)
  return Number((Math.round(value * factor) / factor).toFixed(decimals));
}

/** Round to a sensible number of significant decimals based on magnitude. */
export function smartRound(value: number): number {
  if (!isFinite(value)) return NaN;
  const abs = Math.abs(value);
  if (abs === 0) return 0;
  if (abs >= 1000) return roundTo(value, 2);
  if (abs >= 1) return roundTo(value, 4);
  if (abs >= 0.01) return roundTo(value, 5);
  return roundTo(value, 8);
}

/** Convert a price distance to increment (pip) units. */
export function convertDistanceToIncrementUnits(
  distance: number,
  incrementSize: number | null,
): number | null {
  if (incrementSize == null || incrementSize <= 0 || !isFinite(distance)) return null;
  return distance / incrementSize;
}

/* ------------------------------------------------------------------ */
/*  CORE DISTANCE + R CALCULATIONS (direction-aware, no abs silencing) */
/* ------------------------------------------------------------------ */

/**
 * Computes signed + absolute risk/reward distances given direction.
 * Returns null distances + an error if the trade geometry is invalid.
 */
export function computeDistances(
  direction: Direction,
  entry: number,
  stop: number,
  target: number,
): { riskDistance: number; rewardDistance: number } | { error: string } {
  if (direction === "LONG") {
    // Required: stop < entry < target
    if (!(stop < entry)) {
      return { error: "For a Long/Buy trade the stop loss must be below the entry price." };
    }
    if (!(target > entry)) {
      return { error: "For a Long/Buy trade the take profit must be above the entry price." };
    }
    return {
      riskDistance: entry - stop, // positive
      rewardDistance: target - entry, // positive
    };
  } else {
    // SHORT: target < entry < stop
    if (!(stop > entry)) {
      return { error: "For a Short/Sell trade the stop loss must be above the entry price." };
    }
    if (!(target < entry)) {
      return { error: "For a Short/Sell trade the take profit must be below the entry price." };
    }
    return {
      riskDistance: stop - entry, // positive
      rewardDistance: entry - target, // positive
    };
  }
}

/* ------------------------------------------------------------------ */
/*  BREAK-EVEN WIN RATE                                                */
/* ------------------------------------------------------------------ */

/**
 * Theoretical break-even win rate for a simple binary trade before costs.
 * = 1 / (1 + R) × 100  =  risk / (risk + reward) × 100
 */
export function calculateBreakEvenWinRate(rMultiple: number): number {
  if (!isFinite(rMultiple) || rMultiple <= 0) return NaN;
  return (1 / (1 + rMultiple)) * 100;
}

/* ------------------------------------------------------------------ */
/*  EXPECTANCY (gross, in R units)                                     */
/* ------------------------------------------------------------------ */

/**
 * Gross mathematical expectancy in R units.
 * EV = p × R − (1 − p),  where p = winRate/100.
 */
export function calculateExpectancy(rMultiple: number, winRate: number): number {
  if (!isFinite(rMultiple) || !isFinite(winRate)) return NaN;
  const p = winRate / 100;
  return p * rMultiple - (1 - p);
}

/* ------------------------------------------------------------------ */
/*  FIND TARGET FROM R                                                 */
/* ------------------------------------------------------------------ */

export function calculateTargetFromR(
  direction: Direction,
  entry: number,
  stop: number,
  desiredR: number,
): { target: number } | { error: string } {
  if (!isFinite(desiredR) || desiredR <= 0) {
    return { error: "Desired R must be a positive number." };
  }
  if (direction === "LONG") {
    if (!(stop < entry)) {
      return { error: "For a Long/Buy trade the stop loss must be below the entry price." };
    }
    const risk = entry - stop;
    const target = entry + desiredR * risk;
    return { target };
  } else {
    if (!(stop > entry)) {
      return { error: "For a Short/Sell trade the stop loss must be above the entry price." };
    }
    const risk = stop - entry;
    const target = entry - desiredR * risk;
    return { target };
  }
}

/* ------------------------------------------------------------------ */
/*  FIND STOP FROM R                                                   */
/* ------------------------------------------------------------------ */

export function calculateStopFromR(
  direction: Direction,
  entry: number,
  target: number,
  desiredR: number,
): { stop: number } | { error: string } {
  if (!isFinite(desiredR) || desiredR <= 0) {
    return { error: "Desired R must be a positive number." };
  }
  if (direction === "LONG") {
    if (!(target > entry)) {
      return { error: "For a Long/Buy trade the take profit must be above the entry price." };
    }
    const reward = target - entry;
    const risk = reward / desiredR;
    if (!isFinite(risk) || risk <= 0) {
      return { error: "The solved stop distance is invalid." };
    }
    const stop = entry - risk;
    if (!isFinite(stop) || stop <= 0) {
      return { error: "The solved stop loss is invalid (non-finite or non-positive)." };
    }
    return { stop };
  } else {
    if (!(target < entry)) {
      return { error: "For a Short/Sell trade the take profit must be below the entry price." };
    }
    const reward = entry - target;
    const risk = reward / desiredR;
    if (!isFinite(risk) || risk <= 0) {
      return { error: "The solved stop distance is invalid." };
    }
    const stop = entry + risk;
    if (!isFinite(stop) || stop <= 0) {
      return { error: "The solved stop loss is invalid (non-finite or non-positive)." };
    }
    return { stop };
  }
}

/* ------------------------------------------------------------------ */
/*  COST-ADJUSTED METRICS (single-target only)                         */
/* ------------------------------------------------------------------ */

export function calculateCostAdjustedMetrics(
  riskDistance: number,
  rewardDistance: number,
  rMultiple: number,
  tradingCost: number,
  winRate: number | null,
): CostAdjustedMetrics {
  const c = tradingCost;
  // NetR only when reward - c > 0
  const netReward = rewardDistance - c;
  const netR = netReward > 0 ? netReward / (riskDistance + c) : null;
  // Adjusted break-even = (risk + c) / (risk + reward) × 100
  const adjustedBreakEvenWinRate =
    ((riskDistance + c) / (riskDistance + rewardDistance)) * 100;

  let costAdjustedExpectancy: number | null = null;
  if (winRate != null && isFinite(winRate)) {
    const p = winRate / 100;
    const costR = c / riskDistance; // cost expressed in original-risk R units
    const netWinnerR = rMultiple - costR;
    const netLoserR = 1 + costR;
    costAdjustedExpectancy = p * netWinnerR - (1 - p) * netLoserR;
  }

  return {
    cost: c,
    netR,
    adjustedBreakEvenWinRate,
    costAdjustedExpectancy,
  };
}

/* ------------------------------------------------------------------ */
/*  MULTI-TARGET PLAN                                                  */
/* ------------------------------------------------------------------ */

export interface MultiTargetPlanResult {
  targets: MultiTargetResult[];
  weightedR: number;
}

export function calculateMultiTargetPlan(
  direction: Direction,
  entry: number,
  stop: number,
  targets: MultiTargetInput[],
): MultiTargetPlanResult | { error: string } {
  if (!targets || targets.length < 1 || targets.length > 4) {
    return { error: "Provide between 1 and 4 take-profit targets." };
  }
  // Validate each target price is finite + positive
  for (const t of targets) {
    if (!isFinite(t.targetPrice) || t.targetPrice <= 0) {
      return { error: "Each target price must be a positive finite number." };
    }
    if (!isFinite(t.allocationPercent) || t.allocationPercent < 0) {
      return { error: "Each allocation percentage must be a non-negative number." };
    }
  }
  // Allocation total must equal 100 (within tolerance)
  const total = targets.reduce((s, t) => s + t.allocationPercent, 0);
  if (Math.abs(total - 100) > 0.001) {
    return { error: `Allocation percentages must total 100% (currently ${roundTo(total, 4)}%).` };
  }
  // Risk distance
  let riskDistance: number;
  if (direction === "LONG") {
    if (!(stop < entry)) {
      return { error: "For a Long/Buy trade the stop loss must be below the entry price." };
    }
    riskDistance = entry - stop;
  } else {
    if (!(stop > entry)) {
      return { error: "For a Short/Sell trade the stop loss must be above the entry price." };
    }
    riskDistance = stop - entry;
  }
  if (riskDistance <= 0) {
    return { error: "Risk distance must be positive." };
  }

  // Validate each target is on the correct side and compute R
  const results: MultiTargetResult[] = targets.map((t) => {
    let rewardDistance: number;
    if (direction === "LONG") {
      // all TPs > entry
      rewardDistance = t.targetPrice - entry;
    } else {
      rewardDistance = entry - t.targetPrice;
    }
    const rMultiple = rewardDistance / riskDistance;
    return {
      targetPrice: t.targetPrice,
      allocationPercent: t.allocationPercent,
      allocationWeight: t.allocationPercent / 100,
      rewardDistance,
      rMultiple,
    };
  });

  // Validate sides + ordering
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.rewardDistance <= 0) {
      return {
        error:
          direction === "LONG"
            ? "For a Long/Buy trade every take-profit target must be above the entry price."
            : "For a Short/Sell trade every take-profit target must be below the entry price.",
      };
    }
  }
  // Ordering: LONG → TP1 < TP2 < TP3 < TP4 ; SHORT → TP1 > TP2 > TP3 > TP4
  for (let i = 1; i < results.length; i++) {
    const prev = results[i - 1];
    const curr = results[i];
    if (direction === "LONG") {
      if (!(curr.targetPrice > prev.targetPrice)) {
        return { error: "For a Long/Buy trade, targets must be in ascending order (TP1 < TP2 < TP3 < TP4)." };
      }
    } else {
      if (!(curr.targetPrice < prev.targetPrice)) {
        return { error: "For a Short/Sell trade, targets must be in descending order (TP1 > TP2 > TP3 > TP4)." };
      }
    }
  }

  // Weighted R = Σ(wi × Ri)
  const weightedR = results.reduce((sum, r) => sum + r.allocationWeight * r.rMultiple, 0);

  return { targets: results, weightedR };
}

/* ------------------------------------------------------------------ */
/*  MAIN VALIDATION + CALCULATION ENTRY POINT                          */
/* ------------------------------------------------------------------ */

export function validateInputs(inputs: RiskRewardInputs): string | null {
  const { mode, direction, entry } = inputs;

  if (!isFinite(entry) || entry <= 0) {
    return "Entry price must be a positive finite number.";
  }
  if (direction !== "LONG" && direction !== "SHORT") {
    return "Direction must be Long or Short.";
  }

  if (mode === "ANALYZE") {
    if (inputs.stop == null || !isFinite(inputs.stop) || inputs.stop <= 0) {
      return "Stop loss must be a positive finite number.";
    }
    if (inputs.target == null || !isFinite(inputs.target) || inputs.target <= 0) {
      return "Take profit must be a positive finite number.";
    }
  } else if (mode === "FIND_TARGET") {
    if (inputs.stop == null || !isFinite(inputs.stop) || inputs.stop <= 0) {
      return "Stop loss must be a positive finite number.";
    }
    if (inputs.desiredR == null || !isFinite(inputs.desiredR) || inputs.desiredR <= 0) {
      return "Desired R must be a positive number.";
    }
  } else if (mode === "FIND_STOP") {
    if (inputs.target == null || !isFinite(inputs.target) || inputs.target <= 0) {
      return "Take profit must be a positive finite number.";
    }
    if (inputs.desiredR == null || !isFinite(inputs.desiredR) || inputs.desiredR <= 0) {
      return "Desired R must be a positive number.";
    }
  } else if (mode === "MULTI_TARGET") {
    if (inputs.stop == null || !isFinite(inputs.stop) || inputs.stop <= 0) {
      return "Stop loss must be a positive finite number.";
    }
    if (!inputs.targets || inputs.targets.length < 1 || inputs.targets.length > 4) {
      return "Provide between 1 and 4 take-profit targets.";
    }
  } else {
    return "Unknown calculator mode.";
  }

  // Display mode validation
  if (inputs.displayMode === "CUSTOM") {
    if (inputs.customIncrement == null || !isFinite(inputs.customIncrement) || inputs.customIncrement <= 0) {
      return "Custom increment must be a positive number.";
    }
  }

  // Risk amount
  if (inputs.riskAmount != null) {
    if (!isFinite(inputs.riskAmount) || inputs.riskAmount < 0) {
      return "Risk amount must be a finite non-negative number.";
    }
  }
  // Win rate
  if (inputs.winRate != null) {
    if (!isFinite(inputs.winRate) || inputs.winRate < 0 || inputs.winRate > 100) {
      return "Win rate must be between 0 and 100.";
    }
  }
  // Trading cost
  if (inputs.tradingCost != null) {
    if (!isFinite(inputs.tradingCost) || inputs.tradingCost < 0) {
      return "Trading cost must be a finite non-negative number.";
    }
  }

  return null;
}

export function analyzeRiskReward(inputs: RiskRewardInputs): RiskRewardResult {
  const validationError = validateInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      mode: inputs.mode,
      direction: inputs.direction,
      entry: inputs.entry,
      rMultiple: 0,
      riskDistance: 0,
      rewardDistance: 0,
      riskPercentFromEntry: 0,
      rewardPercentFromEntry: 0,
      riskIncrementUnits: null,
      rewardIncrementUnits: null,
      incrementSize: null,
      breakEvenWinRate: null,
      potentialGrossReward: null,
      expectancy: null,
      costAdjusted: null,
    };
  }

  const { mode, direction, entry } = inputs;
  const incrementSize = getIncrementSize(inputs.displayMode, inputs.customIncrement);

  // ---- ANALYZE ----
  if (mode === "ANALYZE") {
    const stop = inputs.stop!;
    const target = inputs.target!;
    const dist = computeDistances(direction, entry, stop, target);
    if ("error" in dist) {
      return buildErrorResult(inputs, dist.error, incrementSize);
    }
    const { riskDistance, rewardDistance } = dist;
    const rMultiple = rewardDistance / riskDistance;
    return buildResult(inputs, entry, stop, target, riskDistance, rewardDistance, rMultiple, incrementSize);
  }

  // ---- FIND_TARGET ----
  if (mode === "FIND_TARGET") {
    const stop = inputs.stop!;
    const desiredR = inputs.desiredR!;
    const solved = calculateTargetFromR(direction, entry, stop, desiredR);
    if ("error" in solved) {
      return buildErrorResult(inputs, solved.error, incrementSize);
    }
    const target = solved.target;
    const dist = computeDistances(direction, entry, stop, target);
    if ("error" in dist) {
      return buildErrorResult(inputs, dist.error, incrementSize);
    }
    const { riskDistance, rewardDistance } = dist;
    const rMultiple = rewardDistance / riskDistance;
    return buildResult(inputs, entry, stop, target, riskDistance, rewardDistance, rMultiple, incrementSize);
  }

  // ---- FIND_STOP ----
  if (mode === "FIND_STOP") {
    const target = inputs.target!;
    const desiredR = inputs.desiredR!;
    const solved = calculateStopFromR(direction, entry, target, desiredR);
    if ("error" in solved) {
      return buildErrorResult(inputs, solved.error, incrementSize);
    }
    const stop = solved.stop;
    const dist = computeDistances(direction, entry, stop, target);
    if ("error" in dist) {
      return buildErrorResult(inputs, dist.error, incrementSize);
    }
    const { riskDistance, rewardDistance } = dist;
    const rMultiple = rewardDistance / riskDistance;
    return buildResult(inputs, entry, stop, target, riskDistance, rewardDistance, rMultiple, incrementSize);
  }

  // ---- MULTI_TARGET ----
  if (mode === "MULTI_TARGET") {
    const stop = inputs.stop!;
    const plan = calculateMultiTargetPlan(direction, entry, stop, inputs.targets!);
    if ("error" in plan) {
      return buildErrorResult(inputs, plan.error, incrementSize);
    }
    const riskDistance = direction === "LONG" ? entry - stop : stop - entry;
    // No single break-even for multi-target plans (spec §18).
    const result: RiskRewardResult = {
      valid: true,
      mode,
      direction,
      entry,
      stop,
      rMultiple: plan.weightedR, // weighted R used as the headline R
      riskDistance,
      rewardDistance: NaN, // no single reward distance in multi-target
      riskPercentFromEntry: (riskDistance / entry) * 100,
      rewardPercentFromEntry: NaN,
      riskIncrementUnits: convertDistanceToIncrementUnits(riskDistance, incrementSize),
      rewardIncrementUnits: null,
      incrementSize,
      breakEvenWinRate: null, // explicitly null — see spec §18
      potentialGrossReward: inputs.riskAmount != null ? inputs.riskAmount * plan.weightedR : null,
      expectancy: null, // not computed for multi-target (spec §18)
      costAdjusted: null, // cost adjustment is single-target only (spec §15)
      multiTarget: {
        targets: plan.targets,
        weightedR: plan.weightedR,
      },
    };
    return result;
  }

  return buildErrorResult(inputs, "Unknown calculator mode.", incrementSize);
}

/* ------------------------------------------------------------------ */
/*  INTERNAL HELPERS                                                   */
/* ------------------------------------------------------------------ */

function buildResult(
  inputs: RiskRewardInputs,
  entry: number,
  stop: number,
  target: number,
  riskDistance: number,
  rewardDistance: number,
  rMultiple: number,
  incrementSize: number | null,
): RiskRewardResult {
  const breakEvenWinRate = calculateBreakEvenWinRate(rMultiple);
  const potentialGrossReward =
    inputs.riskAmount != null && inputs.riskAmount > 0
      ? inputs.riskAmount * rMultiple
      : inputs.riskAmount != null
        ? 0
        : null;

  let expectancy: number | null = null;
  if (inputs.winRate != null && isFinite(inputs.winRate)) {
    expectancy = calculateExpectancy(rMultiple, inputs.winRate);
  }

  let costAdjusted: CostAdjustedMetrics | null = null;
  if (inputs.tradingCost != null && inputs.tradingCost > 0) {
    costAdjusted = calculateCostAdjustedMetrics(
      riskDistance,
      rewardDistance,
      rMultiple,
      inputs.tradingCost,
      inputs.winRate ?? null,
    );
  }

  return {
    valid: true,
    mode: inputs.mode,
    direction: inputs.direction,
    entry,
    stop,
    target,
    rMultiple,
    riskDistance,
    rewardDistance,
    riskPercentFromEntry: (riskDistance / entry) * 100,
    rewardPercentFromEntry: (rewardDistance / entry) * 100,
    riskIncrementUnits: convertDistanceToIncrementUnits(riskDistance, incrementSize),
    rewardIncrementUnits: convertDistanceToIncrementUnits(rewardDistance, incrementSize),
    incrementSize,
    breakEvenWinRate,
    potentialGrossReward,
    expectancy,
    costAdjusted,
  };
}

function buildErrorResult(
  inputs: RiskRewardInputs,
  error: string,
  incrementSize: number | null,
): RiskRewardResult {
  return {
    valid: false,
    error,
    mode: inputs.mode,
    direction: inputs.direction,
    entry: inputs.entry,
    rMultiple: 0,
    riskDistance: 0,
    rewardDistance: 0,
    riskPercentFromEntry: 0,
    rewardPercentFromEntry: 0,
    riskIncrementUnits: null,
    rewardIncrementUnits: null,
    incrementSize,
    breakEvenWinRate: null,
    potentialGrossReward: null,
    expectancy: null,
    costAdjusted: null,
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULT INPUTS                                                     */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: RiskRewardInputs = {
  mode: "ANALYZE",
  direction: "LONG",
  entry: 4000,
  stop: 3990,
  target: 4020,
  desiredR: 2,
  displayMode: "XAUUSD_001",
  customIncrement: undefined,
  riskAmount: null,
  winRate: null,
  tradingCost: null,
  targets: [
    { targetPrice: 4010, allocationPercent: 50 },
    { targetPrice: 4020, allocationPercent: 50 },
  ],
};

/** R presets for FIND_TARGET / FIND_STOP modes. */
export const R_PRESETS = [1, 1.5, 2, 2.5, 3, 4, 5];

/** Break-even reference table data (spec §29). */
export const BREAK_EVEN_TABLE = [
  { riskReward: "1 : 0.5", rMultiple: 0.5, breakEven: 66.67 },
  { riskReward: "1 : 1", rMultiple: 1.0, breakEven: 50.0 },
  { riskReward: "1 : 1.5", rMultiple: 1.5, breakEven: 40.0 },
  { riskReward: "1 : 2", rMultiple: 2.0, breakEven: 33.33 },
  { riskReward: "1 : 2.5", rMultiple: 2.5, breakEven: 28.57 },
  { riskReward: "1 : 3", rMultiple: 3.0, breakEven: 25.0 },
  { riskReward: "1 : 4", rMultiple: 4.0, breakEven: 20.0 },
  { riskReward: "1 : 5", rMultiple: 5.0, breakEven: 16.67 },
];

/** Display labels for each display mode. */
export const DISPLAY_MODE_LABELS: Record<DisplayMode, string> = {
  GENERIC: "Generic Price",
  XAUUSD_001: "XAUUSD — $0.01 increment",
  XAUUSD_010: "XAUUSD — $0.10 increment",
  FOREX_STANDARD: "Forex Standard (0.0001)",
  FOREX_JPY: "Forex JPY (0.01)",
  CUSTOM: "Custom Increment",
};
