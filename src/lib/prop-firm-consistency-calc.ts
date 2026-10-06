/**
 * Prop Firm Consistency Rule Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for prop-firm consistency rule calculations.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Three rule bases:
 *   A. Total Net Profit — Best Day ÷ Total Net Profit
 *   B. Sum of Profitable Days — Best Day ÷ Sum of positive days only
 *   C. Profit Target — Best Day ÷ fixed profit target
 *
 * The user chooses the rule that matches their account terms.
 * Different firms can define the denominator differently.
 */

export type RuleBasis = "NET_PROFIT" | "PROFITABLE_DAYS" | "PROFIT_TARGET";
export type CalculatorMode = "QUICK_CHECK" | "DAILY_PNL" | "REPAIR";
export type BoundaryRule = "AT_OR_BELOW" | "STRICTLY_BELOW";

/* ------------------------------------------------------------------ */
/*  CORE TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface ConsistencyInputs {
  mode: CalculatorMode;
  ruleBasis: RuleBasis;
  /** Best single-day profit. Must be >= 0. */
  bestDay: number;
  /** Consistency threshold percentage (e.g. 30 for 30%). Must be > 0 and < 100. */
  thresholdPercent: number;
  /** Boundary rule: <= (default) or <. */
  boundaryRule?: BoundaryRule;
  /** Denominator value depends on ruleBasis:
   *  NET_PROFIT → total net profit
   *  PROFITABLE_DAYS → sum of positive days
   *  PROFIT_TARGET → fixed profit target
   */
  denominator: number;
  /** For REPAIR mode: planned profit per future day (optional). */
  plannedFutureDay?: number | null;
}

export interface DailyPnLSummary {
  tradingDays: number;
  winningDays: number;
  losingDays: number;
  flatDays: number;
  totalNetProfit: number;
  sumOfProfitableDays: number;
  bestWinningDay: number;
  worstDay: number;
  averageDailyPnL: number;
  hasPositiveDay: boolean;
}

export interface ConsistencyResult {
  valid: boolean;
  error?: string;
  ruleBasis: RuleBasis;
  /** Consistency percentage = bestDay / denominator × 100. NaN if not meaningful. */
  consistencyPercent: number;
  thresholdPercent: number;
  /** True if within the entered threshold (considering boundary rule). */
  withinThreshold: boolean;
  /** Max allowed best day at current denominator = denominator × (threshold/100). */
  maxAllowedBestDay: number;
  /** Required denominator for current best day to fit = bestDay / (threshold/100). */
  requiredDenominator: number;
  /** Additional profit needed (for variable-denominator bases). 0 for PROFIT_TARGET. */
  additionalProfitNeeded: number;
  /** Neutral status message when calculation is not meaningful. */
  neutralMessage?: string;
  /** Daily P&L summary (DAILY_PNL mode only). */
  dailySummary?: DailyPnLSummary;
  /** Repair/planning outputs (REPAIR mode only). */
  repair?: RepairResult;
}

export interface RepairResult {
  /** Additional profit needed (same as top-level for variable bases). */
  additionalProfitNeeded: number;
  /** Min future days if plannedFutureDay supplied (iterative solver). */
  minFutureDays: number | null;
  /** Max safe separate positive day under this simplified model. */
  maxSafeSeparateDay: number | null;
  /** Min evenly-distributed positive days implied by threshold = ceil(1/t). */
  minEvenDays: number;
}

/* ------------------------------------------------------------------ */
/*  FLOATING-POINT SAFE ROUNDING (display only)                        */
/* ------------------------------------------------------------------ */

export function roundTo(value: number, decimals: number): number {
  if (!isFinite(value)) return NaN;
  const factor = Math.pow(10, decimals);
  return Number((Math.round(value * factor) / factor).toFixed(decimals));
}

/** Deterministic epsilon for boundary comparisons. */
const EPSILON = 1e-9;

/* ------------------------------------------------------------------ */
/*  CORE CONSISTENCY CALCULATION                                       */
/* ------------------------------------------------------------------ */

/**
 * Consistency Percentage = BestDay / Denominator × 100
 * Returns NaN if not meaningful (bestDay <= 0 or denominator <= 0).
 */
export function calculateConsistency(bestDay: number, denominator: number): number {
  if (!isFinite(bestDay) || !isFinite(denominator)) return NaN;
  if (bestDay <= 0 || denominator <= 0) return NaN;
  return (bestDay / denominator) * 100;
}

/**
 * Maximum allowed best day at current denominator.
 * MaxAllowedBestDay = Denominator × (ThresholdPercent / 100)
 */
export function calculateMaxAllowedBestDay(denominator: number, thresholdPercent: number): number {
  if (!isFinite(denominator) || !isFinite(thresholdPercent)) return NaN;
  if (denominator <= 0 || thresholdPercent <= 0) return 0;
  return denominator * (thresholdPercent / 100);
}

/**
 * Required denominator for current best day to fit the threshold.
 * RequiredDenominator = BestDay / (ThresholdPercent / 100)
 */
export function calculateRequiredDenominator(bestDay: number, thresholdPercent: number): number {
  if (!isFinite(bestDay) || !isFinite(thresholdPercent)) return NaN;
  const t = thresholdPercent / 100;
  if (t <= 0) return NaN;
  return bestDay / t;
}

/**
 * Additional profit needed (for variable-denominator bases).
 * = max(0, RequiredDenominator - CurrentDenominator)
 * Returns 0 for PROFIT_TARGET basis (denominator is fixed).
 */
export function calculateAdditionalProfitNeeded(
  bestDay: number,
  thresholdPercent: number,
  currentDenominator: number,
  ruleBasis: RuleBasis,
): number {
  if (ruleBasis === "PROFIT_TARGET") return 0;
  const required = calculateRequiredDenominator(bestDay, thresholdPercent);
  if (!isFinite(required) || !isFinite(currentDenominator)) return 0;
  return Math.max(0, required - currentDenominator);
}

/* ------------------------------------------------------------------ */
/*  BOUNDARY CHECK                                                     */
/* ------------------------------------------------------------------ */

/**
 * Check if consistency is within threshold, respecting boundary rule.
 * AT_OR_BELOW: consistency <= threshold (default)
 * STRICTLY_BELOW: consistency < threshold
 * Uses epsilon for deterministic comparison.
 */
export function isWithinThreshold(
  consistencyPercent: number,
  thresholdPercent: number,
  boundaryRule: BoundaryRule = "AT_OR_BELOW",
): boolean {
  if (!isFinite(consistencyPercent) || !isFinite(thresholdPercent)) return false;
  if (boundaryRule === "STRICTLY_BELOW") {
    return consistencyPercent < thresholdPercent - EPSILON;
  }
  return consistencyPercent <= thresholdPercent + EPSILON;
}

/* ------------------------------------------------------------------ */
/*  DAILY P&L SUMMARY                                                  */
/* ------------------------------------------------------------------ */

/**
 * Summarize daily P&L results.
 * Each day may be positive, zero, or negative.
 */
export function summarizeDailyPnL(dailyResults: number[]): DailyPnLSummary {
  const validDays = dailyResults.filter((d) => isFinite(d));
  const tradingDays = validDays.length;
  const winningDays = validDays.filter((d) => d > 0).length;
  const losingDays = validDays.filter((d) => d < 0).length;
  const flatDays = validDays.filter((d) => d === 0).length;
  const totalNetProfit = validDays.reduce((s, d) => s + d, 0);
  const positiveDays = validDays.filter((d) => d > 0);
  const sumOfProfitableDays = positiveDays.reduce((s, d) => s + d, 0);
  const bestWinningDay = positiveDays.length > 0 ? Math.max(...positiveDays) : 0;
  const worstDay = tradingDays > 0 ? Math.min(...validDays) : 0;
  const averageDailyPnL = tradingDays > 0 ? totalNetProfit / tradingDays : 0;
  const hasPositiveDay = positiveDays.length > 0;

  return {
    tradingDays,
    winningDays,
    losingDays,
    flatDays,
    totalNetProfit,
    sumOfProfitableDays,
    bestWinningDay,
    worstDay,
    averageDailyPnL,
    hasPositiveDay,
  };
}

/* ------------------------------------------------------------------ */
/*  DAILY P&L PARSER                                                   */
/* ------------------------------------------------------------------ */

/**
 * Parse daily P&L from a pasted string.
 * Accepts: one number per line, comma separated, space separated.
 * Handles negative numbers and decimals.
 * Strips common currency symbols ($, €, £, ¥, Rs, etc.) if present.
 * Returns array of numbers (invalid tokens skipped).
 */
export function parseDailyPnL(input: string): number[] {
  if (!input || typeof input !== "string") return [];
  // Normalize: replace commas and semicolons with spaces, then split on whitespace/newlines
  // But keep negative signs and decimals.
  const cleaned = input
    .replace(/[$€£¥₹Rs]/gi, "") // strip currency symbols/abbreviations
    .replace(/,/g, " ") // commas → spaces (for comma-separated)
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
    if (isFinite(parsed)) {
      results.push(parsed);
    }
    // Invalid tokens are silently skipped
  }
  return results;
}

/* ------------------------------------------------------------------ */
/*  ROBUST FUTURE-DAY REPAIR SOLVER                                    */
/* ------------------------------------------------------------------ */

/**
 * Find the minimum number of future equal-profit days needed to satisfy
 * the consistency rule, considering that a future day P may become the
 * new best day if P > current best day B.
 *
 * For NET_PROFIT and PROFITABLE_DAYS bases (variable denominators):
 *   NewDenominator(n) = D + n × P
 *   NewBestDay = max(B, P)
 *   Requirement: NewBestDay / NewDenominator(n) <= t  (or < t for strict)
 *
 * Iterative solver — finds smallest integer n >= 0.
 *
 * For PROFIT_TARGET basis: returns null (denominator is fixed, no dilution).
 *
 * @returns minimum integer days, or null if not applicable / unsolvable
 */
export function calculateFutureDayRepair(
  currentDenominator: number,
  currentBestDay: number,
  thresholdPercent: number,
  plannedFutureDay: number,
  ruleBasis: RuleBasis,
  boundaryRule: BoundaryRule = "AT_OR_BELOW",
): number | null {
  if (ruleBasis === "PROFIT_TARGET") return null;
  if (!isFinite(currentDenominator) || currentDenominator < 0) return null;
  if (!isFinite(currentBestDay) || currentBestDay < 0) return null;
  if (!isFinite(thresholdPercent) || thresholdPercent <= 0 || thresholdPercent >= 100) return null;
  if (!isFinite(plannedFutureDay) || plannedFutureDay <= 0) return null;

  const t = thresholdPercent / 100;
  const newBest = Math.max(currentBestDay, plannedFutureDay);

  // Check if already satisfied at n=0
  // (only if current best day hasn't changed — i.e. P <= B)
  if (plannedFutureDay <= currentBestDay) {
    // best day stays B; check B / D <= t
    if (currentDenominator <= 0) {
      // need at least some days
    } else {
      const ratio = currentBestDay / currentDenominator;
      if (boundaryRule === "STRICTLY_BELOW") {
        if (ratio < t - EPSILON) return 0;
      } else {
        if (ratio <= t + EPSILON) return 0;
      }
    }
  }

  // Iterate to find minimum n
  // Cap at a reasonable max to avoid infinite loops (e.g. 10000 days)
  const MAX_DAYS = 10000;
  for (let n = 1; n <= MAX_DAYS; n++) {
    const newDenom = currentDenominator + n * plannedFutureDay;
    const ratio = newBest / newDenom;
    if (boundaryRule === "STRICTLY_BELOW") {
      if (ratio < t - EPSILON) return n;
    } else {
      if (ratio <= t + EPSILON) return n;
    }
  }
  return null; // unsolvable within cap (threshold too low or P too large)
}

/* ------------------------------------------------------------------ */
/*  MAX SAFE SEPARATE POSITIVE DAY                                     */
/* ------------------------------------------------------------------ */

/**
 * Maximum separate positive day profit allowed under the simplified model,
 * for variable-denominator bases (NET_PROFIT, PROFITABLE_DAYS).
 *
 * A new positive day x changes:
 *   new denominator = D + x
 *   new best = max(B, x)
 *
 * Need: max(B, x) / (D + x) <= t  (or < t for strict)
 *
 * CASE 1: x <= B
 *   Requirement: B / (D + x) <= t
 *   → D + x >= B / t
 *   → x >= B/t - D
 *   This is a LOWER bound on x, meaning smaller x is safer.
 *   So any x <= B that doesn't worsen ratio is fine — the max in this case is B itself.
 *
 * CASE 2: x > B
 *   Requirement: x / (D + x) <= t
 *   → x <= t(D + x)
 *   → x - tx <= tD
 *   → x(1 - t) <= tD
 *   → x <= tD / (1 - t)
 *
 * The overall maximum is:
 *   If tD/(1-t) > B: the answer is tD/(1-t) (new best day case)
 *   If tD/(1-t) <= B: the answer is B (staying at current best is the ceiling
 *     — any x > B would violate, but x = B is fine if B/(D+B) <= t)
 *
 * Special: if B/(D+B) > t, even repeating the best day violates the rule.
 *   In that case, max safe day < B. We solve B/(D+x) <= t → x >= B/t - D.
 *   But we need x <= B, so if B/t - D > B, no safe day exists at B level.
 *   The max safe day in this scenario is the largest x <= B with B/(D+x) <= t,
 *   which is x = B (if B/(D+B) <= t) or no solution if B/(D+B) > t... but wait,
 *   if x < B, the best is still B, so B/(D+x) and we need that <= t.
 *   x must be >= B/t - D for the ratio to hold. So the MAXIMUM x <= B that
 *   satisfies is B itself IF B/(D+B) <= t. If B/(D+B) > t, then we need
 *   x >= B/t - D, but the max x is B, and B < B/t - D (since B/(D+B) > t
 *   means B > t(D+B) means B - tB > tD means B(1-t) > tD... hmm this is
 *   getting complex. Let me reconsider.
 *
 * Actually, let me think about this more carefully.
 *
 * The question is: what is the maximum profit I can make on a SINGLE new day
 * without violating the consistency rule?
 *
 * If x <= B (new day doesn't become new best):
 *   ratio = B / (D + x)
 *   As x increases, D+x increases, so ratio decreases. So LARGER x is BETTER here.
 *   The constraint is B/(D+x) <= t → x >= B/t - D
 *   So any x in [max(0, B/t - D), B] is safe.
 *   The maximum in this range is B.
 *   BUT: this is only valid if B/(D+B) <= t, i.e., if adding a day of size B keeps ratio under t.
 *   If B/(D+B) > t, then the safe range [B/t - D, B] is empty (B/t - D > B),
 *   meaning even x=B violates. In that case the max safe x < B doesn't help because
 *   the best is still B and B/(D+x) for x < B gives an even higher ratio... wait no,
 *   x < B means D+x is smaller, so B/(D+x) is LARGER. So if x < B, the ratio is WORSE.
 *   So if the current ratio B/D > t, adding a smaller day makes it worse before it gets better.
 *   Actually no — B/(D+x): as x goes from 0 to B, D+x goes from D to D+B, so ratio goes from B/D to B/(D+B).
 *   B/(D+B) < B/D (since D+B > D). So ratio IMPROVES as x increases.
 *   So the minimum ratio in the x<=B case is at x=B: B/(D+B).
 *   If B/(D+B) <= t, then the max safe x is B (and anything between B/t-D and B is safe).
 *   If B/(D+B) > t, then NO x <= B satisfies the rule... wait, that's not right either.
 *   If B/(D+B) > t, the ratio at x=B is still above t. So no x in [0, B] works? No —
 *   x=0 gives B/D which is even worse. As x increases toward B, ratio improves to B/(D+B).
 *   If B/(D+B) > t, then for ALL x in [0, B], ratio >= B/(D+B) > t. So no safe x <= B.
 *
 * If x > B (new day becomes new best):
 *   ratio = x / (D + x)
 *   As x increases from B, ratio = x/(D+x). derivative: (D+x - x)/(D+x)^2 = D/(D+x)^2 > 0.
 *   So ratio INCREASES as x increases. The minimum is at x=B: B/(D+B).
 *   The constraint is x/(D+x) <= t → x <= tD/(1-t).
 *   So x can be at most tD/(1-t), provided tD/(1-t) > B (i.e., we're in case 2).
 *
 * Combining:
 * - If B/(D+B) <= t: the max safe day is max(B, tD/(1-t)) if tD/(1-t) > B, else B.
 *   Actually: if tD/(1-t) > B, then we can go into case 2 and the max is tD/(1-t).
 *   If tD/(1-t) <= B, then case 2 doesn't apply (x > B would immediately violate since
 *   x/(D+x) at x=B+ is > B/(D+B)... wait, x/(D+x) at x=B is B/(D+B). If B/(D+B) <= t
 *   and tD/(1-t) <= B, then tD/(1-t) <= B means tD <= B(1-t) means tD + tB <= B means
 *   t(D+B) <= B means t <= B/(D+B). So B/(D+B) >= t. Combined with B/(D+B) <= t, we get
 *   B/(D+B) = t exactly. In that case max safe = B.
 * - If B/(D+B) > t: even x=B doesn't satisfy. We need to check if any x works.
 *   For x <= B: ratio = B/(D+x) >= B/(D+B) > t. No safe x.
 *   For x > B: ratio = x/(D+x) at x=B is B/(D+B) > t. Since ratio increases with x,
 *   no x > B works either. So NO safe positive day exists.
 *   Actually wait — that means if the current ratio is already too high, you can't make
 *   ANY positive day without violating? That seems wrong. Let me reconsider...
 *
 *   Hmm, actually the current ratio is B/D (without the new day). If B/D > t, you're
 *   already above threshold. Adding a new day x:
 *   - If x <= B: new ratio = B/(D+x) < B/D. It IMPROVES. So a small x might bring it under t.
 *     Specifically, B/(D+x) <= t → x >= B/t - D.
 *     If B/t - D <= B (i.e., B/(D+B) <= t), then x=B works.
 *     If B/t - D > B (i.e., B/(D+B) > t), then we need x > B, which brings us to case 2.
 *   - If x > B: new ratio = x/(D+x). At x = B+, ratio ≈ B/(D+B) > t. As x→∞, ratio → 1 > t.
 *     The MINIMUM of x/(D+x) for x > B is at x=B+ (limit), which is B/(D+B) > t.
 *     So no x > B works if B/(D+B) > t.
 *
 *   So: if B/(D+B) > t, there is NO safe positive day. The account is in a state where
 *   any positive day worsens or maintains the violation. The user needs LOSING days or
 *   zero days to... wait, losing days don't help under PROFITABLE_DAYS basis. Under NET_PROFIT
 *   basis, losing days reduce D, making the ratio worse (B/D increases).
 *
 *   Actually, the user in this situation needs to grow D with positive days that are
 *   SMALLER than B. x <= B with B/(D+x) <= t → x >= B/t - D. If B/t - D > B, no such x <= B
 *   exists. But if B/t - D is between 0 and B... wait, we said B/(D+B) > t means B/t - D > B.
 *   So x must be > B, but that makes things worse. So truly no safe positive day.
 *
 *   In practice this means the user is stuck — they need the firm to reset, or they need
 *   to accept the violation. The calculator should return 0 or null in this case with a
 *   clear message.
 *
 * Let me simplify the implementation:
 *
 * 1. Compute candidate = tD / (1-t) — the case-2 ceiling.
 * 2. If candidate > B: max safe = candidate (we can go into new-best territory).
 * 3. If candidate <= B:
 *    - Check if B/(D+B) <= t (i.e., repeating best day is safe).
 *    - If yes: max safe = B (can match but not exceed without violating).
 *    - If no: max safe = 0 (no safe positive day — already in violation territory).
 *
 * Actually, let me reconsider case 3 more carefully. If candidate <= B and B/(D+B) <= t:
 *   candidate = tD/(1-t) <= B means the new-best ceiling is at or below B.
 *   So any x > B gives x/(D+x) > B/(D+B) ... wait no. x/(D+x) is increasing, so for x > B,
 *   x/(D+x) > B/(D+B). If B/(D+B) <= t, then for x slightly above B, x/(D+x) might still be
 *   <= t. The ceiling is candidate = tD/(1-t). If candidate > B, then x can go up to candidate.
 *   If candidate <= B, then x > B immediately violates (x/(D+x) > candidate = tD/(1-t) for
 *   x > candidate, and since candidate <= B, any x > B > candidate violates).
 *
 *   Wait, x/(D+x) <= t ⟺ x <= tD/(1-t) = candidate. So x can be at most candidate.
 *   If candidate > B, max safe = candidate (in case 2).
 *   If candidate <= B, max safe in case 2 doesn't exist (can't go above B). So max = B
 *   only if B/(D+B) <= t (case 1 at x=B).
 *
 *   And if B/(D+B) > t, no safe x at all.
 *
 * OK so the final logic:
 * ```
 * candidate = tD / (1-t)  // ceiling for x > B case
 * if candidate > B:
 *   maxSafe = candidate
 * elif B/(D+B) <= t:  // i.e., candidate >= B means tD/(1-t) >= B means t(D+B) >= B... wait
 *   // B/(D+B) <= t ⟺ B <= t(D+B) ⟺ B <= tD + tB ⟺ B(1-t) <= tD ⟺ B <= tD/(1-t) = candidate
 *   // So B/(D+B) <= t IS EQUIVALENT to candidate >= B!
 *   maxSafe = B  // but we already said candidate <= B here, so candidate = B exactly
 * else:
 *   maxSafe = 0  // no safe positive day
 * ```
 *
 * Hmm wait, candidate >= B is equivalent to B/(D+B) <= t. And candidate > B is equivalent
 * to B/(D+B) < t. And candidate = B is equivalent to B/(D+B) = t.
 *
 * So:
 * - If candidate > B (i.e., B/(D+B) < t): maxSafe = candidate
 * - If candidate = B (i.e., B/(D+B) = t): maxSafe = B (= candidate)
 * - If candidate < B (i.e., B/(D+B) > t): maxSafe = 0 (no safe positive day)
 *
 * Which simplifies to:
 * - If candidate >= B: maxSafe = candidate (which covers both > and = cases)
 *   Wait, if candidate = B, maxSafe = B = candidate. If candidate > B, maxSafe = candidate.
 *   So if candidate >= B, maxSafe = candidate.
 * - If candidate < B: maxSafe = 0.
 *
 * But we should also consider the boundary rule (strict vs at-or-below).
 * For strict (< t): x/(D+x) < t → x < tD/(1-t) = candidate.
 *   So maxSafe = candidate - epsilon (practically, we can say maxSafe is just under candidate).
 *   For display, we can show candidate as the theoretical max with a note.
 *   Actually, for the "max safe" we should show the value that, if entered as a day, would
 *   just barely satisfy. For strict, that's anything < candidate. So the max is candidate
 *   (exclusive). We'll return candidate and note the boundary.
 *
 * For the case candidate < B (no safe positive day):
 *   This means the account is already in a state where B/(D+B) > t.
 *   The current ratio B/D is even worse. The user is already above threshold and any
 *   positive day makes it worse or keeps it above. Return 0 with a message.
 *
 * Also special case: if D <= 0 (no profit or negative profit base):
 *   For NET_PROFIT with D <= 0: any positive day x gives x/(D+x). If D is 0, x/x = 1 > t.
 *   So no safe day. Return 0.
 *   If D < 0 (net loss), x/(D+x) could be > 1 if D+x < x... D < 0 so D+x < x, so x/(D+x) > 1.
 *   So ratio > 100% > t. No safe day.
 *
 * Let me also handle the case where B = 0 (no positive day yet):
 *   If B = 0, then any x > 0 becomes the new best. x/(D+x) <= t → x <= tD/(1-t).
 *   candidate = tD/(1-t). If D > 0, candidate > 0. maxSafe = candidate.
 *   If D = 0, candidate = 0. maxSafe = 0.
 *
 * OK I think I have the logic. Let me implement it.
 *
 * @returns max safe separate positive day, or 0 if no safe positive day exists.
 *          Returns null for PROFIT_TARGET basis.
 */
export function calculateMaxSeparatePositiveDay(
  currentDenominator: number,
  currentBestDay: number,
  thresholdPercent: number,
  ruleBasis: RuleBasis,
  boundaryRule: BoundaryRule = "AT_OR_BELOW",
): number | null {
  if (ruleBasis === "PROFIT_TARGET") return null;
  if (!isFinite(currentDenominator) || !isFinite(currentBestDay)) return null;
  if (!isFinite(thresholdPercent) || thresholdPercent <= 0 || thresholdPercent >= 100) return null;
  if (currentDenominator <= 0) return 0; // no profit base → any positive day → ratio > 100%

  const t = thresholdPercent / 100;
  const candidate = (t * currentDenominator) / (1 - t); // ceiling for x > B case

  if (candidate >= currentBestDay - EPSILON) {
    // candidate >= B: max safe is candidate (may be in new-best territory)
    // For strict boundary, the max is just under candidate; we return candidate as the
    // theoretical limit. The UI will note the boundary rule.
    return Math.max(0, candidate);
  }
  // candidate < B: B/(D+B) > t, no safe positive day
  return 0;
}

/* ------------------------------------------------------------------ */
/*  MIN EVENLY DISTRIBUTED DAYS                                        */
/* ------------------------------------------------------------------ */

/**
 * Minimum evenly-distributed positive days implied by threshold.
 * = ceil(1 / t) where t = threshold/100.
 * Examples: 50% → 2, 40% → 3, 30% → 4, 25% → 4, 20% → 5.
 * Educational only — real rules may use a different denominator.
 */
export function calculateMinEvenDays(thresholdPercent: number): number {
  if (!isFinite(thresholdPercent) || thresholdPercent <= 0) return NaN;
  const t = thresholdPercent / 100;
  return Math.ceil(1 / t);
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

export function validateConsistencyInputs(inputs: ConsistencyInputs): string | null {
  const { ruleBasis, bestDay, thresholdPercent, denominator } = inputs;

  if (!isFinite(bestDay) || bestDay < 0) {
    return "Best day profit must be a finite non-negative number.";
  }
  if (!isFinite(thresholdPercent) || thresholdPercent <= 0 || thresholdPercent >= 100) {
    return "Threshold must be between 0 and 100 (exclusive).";
  }
  if (!isFinite(denominator)) {
    return "Denominator must be a finite number.";
  }

  if (ruleBasis === "PROFIT_TARGET") {
    if (denominator <= 0) {
      return "Profit target must be a positive number.";
    }
  } else {
    // NET_PROFIT or PROFITABLE_DAYS: denominator may be 0 or negative → neutral state, not error
    // (handled in calculation)
  }

  if (inputs.plannedFutureDay != null && inputs.plannedFutureDay !== 0) {
    if (!isFinite(inputs.plannedFutureDay) || inputs.plannedFutureDay < 0) {
      return "Planned future day profit must be a non-negative number.";
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  MAIN CALCULATION ENTRY POINT                                       */
/* ------------------------------------------------------------------ */

export function calculateConsistencyResult(inputs: ConsistencyInputs): ConsistencyResult {
  const validationError = validateConsistencyInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      ruleBasis: inputs.ruleBasis,
      consistencyPercent: NaN,
      thresholdPercent: inputs.thresholdPercent,
      withinThreshold: false,
      maxAllowedBestDay: 0,
      requiredDenominator: 0,
      additionalProfitNeeded: 0,
    };
  }

  const { ruleBasis, bestDay, thresholdPercent, denominator } = inputs;
  const boundaryRule = inputs.boundaryRule ?? "AT_OR_BELOW";

  // Check for neutral states
  // No positive day
  if (bestDay <= 0) {
    return {
      valid: true,
      ruleBasis,
      consistencyPercent: NaN,
      thresholdPercent,
      withinThreshold: true, // vacuously within (no positive day to violate)
      maxAllowedBestDay: calculateMaxAllowedBestDay(denominator, thresholdPercent),
      requiredDenominator: 0,
      additionalProfitNeeded: 0,
      neutralMessage: "No positive trading day is available to calculate a best-day consistency percentage.",
    };
  }

  // Denominator <= 0 (for variable bases)
  if (ruleBasis !== "PROFIT_TARGET" && denominator <= 0) {
    const basisLabel = ruleBasis === "NET_PROFIT" ? "Total Net Profit" : "Sum of Profitable Days";
    return {
      valid: true,
      ruleBasis,
      consistencyPercent: NaN,
      thresholdPercent,
      withinThreshold: false,
      maxAllowedBestDay: 0,
      requiredDenominator: calculateRequiredDenominator(bestDay, thresholdPercent),
      additionalProfitNeeded: calculateRequiredDenominator(bestDay, thresholdPercent),
      neutralMessage: `Best-day consistency is not meaningful under this model while the selected profit base (${basisLabel}) is zero or negative.`,
    };
  }

  // Profit target <= 0 (should have been caught by validation, but double-check)
  if (ruleBasis === "PROFIT_TARGET" && denominator <= 0) {
    return {
      valid: false,
      error: "Profit target must be a positive number.",
      ruleBasis,
      consistencyPercent: NaN,
      thresholdPercent,
      withinThreshold: false,
      maxAllowedBestDay: 0,
      requiredDenominator: 0,
      additionalProfitNeeded: 0,
    };
  }

  // Core calculation
  const consistencyPercent = calculateConsistency(bestDay, denominator);
  const withinThreshold = isWithinThreshold(consistencyPercent, thresholdPercent, boundaryRule);
  const maxAllowedBestDay = calculateMaxAllowedBestDay(denominator, thresholdPercent);
  const requiredDenominator = calculateRequiredDenominator(bestDay, thresholdPercent);
  const additionalProfitNeeded = calculateAdditionalProfitNeeded(
    bestDay, thresholdPercent, denominator, ruleBasis,
  );

  // Repair outputs
  let repair: RepairResult | undefined;
  if (inputs.mode === "REPAIR" || inputs.mode === "QUICK_CHECK") {
    const minEvenDays = calculateMinEvenDays(thresholdPercent);
    const maxSafeSeparateDay = calculateMaxSeparatePositiveDay(
      denominator, bestDay, thresholdPercent, ruleBasis, boundaryRule,
    );
    let minFutureDays: number | null = null;
    if (inputs.plannedFutureDay != null && inputs.plannedFutureDay > 0 && ruleBasis !== "PROFIT_TARGET") {
      minFutureDays = calculateFutureDayRepair(
        denominator, bestDay, thresholdPercent, inputs.plannedFutureDay, ruleBasis, boundaryRule,
      );
    }
    repair = {
      additionalProfitNeeded,
      minFutureDays,
      maxSafeSeparateDay,
      minEvenDays,
    };
  }

  return {
    valid: true,
    ruleBasis,
    consistencyPercent,
    thresholdPercent,
    withinThreshold,
    maxAllowedBestDay,
    requiredDenominator,
    additionalProfitNeeded,
    repair,
  };
}

/* ------------------------------------------------------------------ */
/*  DEFAULTS                                                           */
/* ------------------------------------------------------------------ */

export const DEFAULT_INPUTS: ConsistencyInputs = {
  mode: "QUICK_CHECK",
  ruleBasis: "NET_PROFIT",
  bestDay: 1500,
  thresholdPercent: 40,
  boundaryRule: "AT_OR_BELOW",
  denominator: 3000,
  plannedFutureDay: null,
};

export const THRESHOLD_PRESETS = [20, 25, 30, 35, 40, 50];

/** Minimum evenly-distributed days reference table. */
export const MIN_EVEN_DAYS_TABLE = [
  { threshold: 50, minDays: 2 },
  { threshold: 40, minDays: 3 },
  { threshold: 35, minDays: 3 },
  { threshold: 30, minDays: 4 },
  { threshold: 25, minDays: 4 },
  { threshold: 20, minDays: 5 },
];
