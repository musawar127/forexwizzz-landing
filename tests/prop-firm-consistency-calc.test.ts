import { describe, test, expect } from "bun:test";
import {
  calculateConsistency,
  calculateMaxAllowedBestDay,
  calculateRequiredDenominator,
  calculateAdditionalProfitNeeded,
  isWithinThreshold,
  summarizeDailyPnL,
  parseDailyPnL,
  calculateFutureDayRepair,
  calculateMaxSeparatePositiveDay,
  calculateMinEvenDays,
  calculateConsistencyResult,
  validateConsistencyInputs,
  roundTo,
  DEFAULT_INPUTS,
  THRESHOLD_PRESETS,
  MIN_EVEN_DAYS_TABLE,
  type ConsistencyInputs,
  type RuleBasis,
  type BoundaryRule,
} from "../src/lib/prop-firm-consistency-calc";

function makeInputs(overrides: Partial<ConsistencyInputs> = {}): ConsistencyInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("Prop Firm Consistency Rule Calculator", () => {

  // ============================================================
  // CORE CONSISTENCY TESTS
  // ============================================================
  describe("Core Consistency — 30% rule", () => {
    test("Best $1,500, Net $4,000, 30% → 37.5%", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 4000, thresholdPercent: 30, ruleBasis: "NET_PROFIT",
      }));
      expect(r.valid).toBe(true);
      expect(r.consistencyPercent).toBeCloseTo(37.5, 5);
      expect(r.withinThreshold).toBe(false); // 37.5 > 30
    });
    test("Required total: 1500/0.30 = 5000", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 4000, thresholdPercent: 30, ruleBasis: "NET_PROFIT",
      }));
      expect(r.requiredDenominator).toBeCloseTo(5000, 5);
    });
    test("Additional profit needed: 5000-4000 = 1000", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 4000, thresholdPercent: 30, ruleBasis: "NET_PROFIT",
      }));
      expect(r.additionalProfitNeeded).toBeCloseTo(1000, 5);
    });
    test("Max allowed best day: 4000×0.30 = 1200", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 4000, thresholdPercent: 30, ruleBasis: "NET_PROFIT",
      }));
      expect(r.maxAllowedBestDay).toBeCloseTo(1200, 5);
    });
  });

  describe("Core Consistency — 40% rule (default example)", () => {
    test("Best $1,500, Net $3,000, 40% → 50%", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 40, ruleBasis: "NET_PROFIT",
      }));
      expect(r.valid).toBe(true);
      expect(r.consistencyPercent).toBeCloseTo(50, 5);
      expect(r.withinThreshold).toBe(false); // 50 > 40
    });
    test("Required total: 1500/0.40 = 3750", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 40, ruleBasis: "NET_PROFIT",
      }));
      expect(r.requiredDenominator).toBeCloseTo(3750, 5);
    });
    test("Additional profit needed: 3750-3000 = 750", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 40, ruleBasis: "NET_PROFIT",
      }));
      expect(r.additionalProfitNeeded).toBeCloseTo(750, 5);
    });
    test("Max allowed best day: 3000×0.40 = 1200", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 40, ruleBasis: "NET_PROFIT",
      }));
      expect(r.maxAllowedBestDay).toBeCloseTo(1200, 5);
    });
  });

  describe("Core Consistency — 50% rule", () => {
    test("Best $1,500, Net $3,000, 50% → 50%, within threshold (at-or-below)", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 50, ruleBasis: "NET_PROFIT",
      }));
      expect(r.valid).toBe(true);
      expect(r.consistencyPercent).toBeCloseTo(50, 5);
      expect(r.withinThreshold).toBe(true); // 50 <= 50
    });
    test("50% strict boundary: equality fails", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 50, ruleBasis: "NET_PROFIT",
        boundaryRule: "STRICTLY_BELOW",
      }));
      expect(r.withinThreshold).toBe(false); // 50 < 50 is false
    });
  });

  describe("Core Consistency — 20% rule", () => {
    test("Best $500, Net $3000, 20% → 16.67%, within", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 500, denominator: 3000, thresholdPercent: 20, ruleBasis: "NET_PROFIT",
      }));
      expect(r.consistencyPercent).toBeCloseTo(16.666666, 3);
      expect(r.withinThreshold).toBe(true);
    });
  });

  describe("Custom decimal thresholds", () => {
    test("33.33% threshold", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1000, denominator: 3000, thresholdPercent: 33.33, ruleBasis: "NET_PROFIT",
      }));
      expect(r.valid).toBe(true);
      expect(r.consistencyPercent).toBeCloseTo(33.3333, 2);
    });
    test("25.5% threshold", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 800, denominator: 3000, thresholdPercent: 25.5, ruleBasis: "NET_PROFIT",
      }));
      expect(r.consistencyPercent).toBeCloseTo(26.6667, 2);
      expect(r.withinThreshold).toBe(false);
    });
  });

  describe("Exact equality & boundary", () => {
    test("Exact equality at-or-below passes", () => {
      // best=1000, denom=2500, threshold=40 → 40% exactly
      expect(isWithinThreshold(40, 40, "AT_OR_BELOW")).toBe(true);
    });
    test("Exact equality strictly-below fails", () => {
      expect(isWithinThreshold(40, 40, "STRICTLY_BELOW")).toBe(false);
    });
    test("Just below threshold (39.99 vs 40)", () => {
      expect(isWithinThreshold(39.99, 40, "AT_OR_BELOW")).toBe(true);
      expect(isWithinThreshold(39.99, 40, "STRICTLY_BELOW")).toBe(true);
    });
    test("Just above threshold (40.01 vs 40)", () => {
      expect(isWithinThreshold(40.01, 40, "AT_OR_BELOW")).toBe(false);
      expect(isWithinThreshold(40.01, 40, "STRICTLY_BELOW")).toBe(false);
    });
  });

  // ============================================================
  // DENOMINATOR TESTS — same data, different bases
  // ============================================================
  describe("Denominator comparison (same daily data)", () => {
    // Day1: +1000, Day2: -500, Day3: +700
    // Best = 1000, Net = 1200, Positive sum = 1700
    test("NET_PROFIT basis: 1000/1200 = 83.33%", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1000, denominator: 1200, thresholdPercent: 40, ruleBasis: "NET_PROFIT",
      }));
      expect(r.consistencyPercent).toBeCloseTo(83.3333, 2);
    });
    test("PROFITABLE_DAYS basis: 1000/1700 = 58.82%", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1000, denominator: 1700, thresholdPercent: 40, ruleBasis: "PROFITABLE_DAYS",
      }));
      expect(r.consistencyPercent).toBeCloseTo(58.8235, 2);
    });
    test("PROFIT_TARGET basis: 1000/2000 = 50%", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1000, denominator: 2000, thresholdPercent: 40, ruleBasis: "PROFIT_TARGET",
      }));
      expect(r.consistencyPercent).toBeCloseTo(50, 5);
    });
    test("Different bases produce different consistency percentages", () => {
      const netR = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: 1200, ruleBasis: "NET_PROFIT" }));
      const posR = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: 1700, ruleBasis: "PROFITABLE_DAYS" }));
      const tgtR = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: 2000, ruleBasis: "PROFIT_TARGET" }));
      expect(netR.consistencyPercent).not.toBeCloseTo(posR.consistencyPercent, 2);
      expect(posR.consistencyPercent).not.toBeCloseTo(tgtR.consistencyPercent, 2);
    });
  });

  // ============================================================
  // DAILY P&L SUMMARY TESTS
  // ============================================================
  describe("Daily P&L Summary", () => {
    test("All positive days", () => {
      const s = summarizeDailyPnL([100, 200, 300]);
      expect(s.tradingDays).toBe(3);
      expect(s.winningDays).toBe(3);
      expect(s.losingDays).toBe(0);
      expect(s.flatDays).toBe(0);
      expect(s.totalNetProfit).toBe(600);
      expect(s.sumOfProfitableDays).toBe(600);
      expect(s.bestWinningDay).toBe(300);
      expect(s.hasPositiveDay).toBe(true);
    });
    test("Mixed positive/negative", () => {
      const s = summarizeDailyPnL([800, -250, 450, 1200, 300]);
      expect(s.tradingDays).toBe(5);
      expect(s.winningDays).toBe(4);
      expect(s.losingDays).toBe(1);
      expect(s.totalNetProfit).toBe(2500);
      expect(s.sumOfProfitableDays).toBe(2750);
      expect(s.bestWinningDay).toBe(1200);
      expect(s.worstDay).toBe(-250);
    });
    test("Zero/flat days", () => {
      const s = summarizeDailyPnL([100, 0, -50, 0, 200]);
      expect(s.tradingDays).toBe(5);
      expect(s.winningDays).toBe(2);
      expect(s.losingDays).toBe(1);
      expect(s.flatDays).toBe(2);
    });
    test("All losing days", () => {
      const s = summarizeDailyPnL([-100, -200, -50]);
      expect(s.tradingDays).toBe(3);
      expect(s.winningDays).toBe(0);
      expect(s.losingDays).toBe(3);
      expect(s.totalNetProfit).toBe(-350);
      expect(s.sumOfProfitableDays).toBe(0);
      expect(s.bestWinningDay).toBe(0);
      expect(s.hasPositiveDay).toBe(false);
    });
    test("One winning day", () => {
      const s = summarizeDailyPnL([-100, 500, -200]);
      expect(s.winningDays).toBe(1);
      expect(s.bestWinningDay).toBe(500);
      expect(s.totalNetProfit).toBe(200);
      expect(s.sumOfProfitableDays).toBe(500);
    });
    test("Best day first", () => {
      const s = summarizeDailyPnL([1000, 500, 300]);
      expect(s.bestWinningDay).toBe(1000);
    });
    test("Best day last", () => {
      const s = summarizeDailyPnL([300, 500, 1000]);
      expect(s.bestWinningDay).toBe(1000);
    });
    test("Duplicate best days", () => {
      const s = summarizeDailyPnL([1000, 500, 1000]);
      expect(s.bestWinningDay).toBe(1000);
      expect(s.winningDays).toBe(3);
    });
    test("Large dataset (60 days)", () => {
      const days = Array.from({ length: 60 }, (_, i) => (i % 3 === 0 ? -100 : 200));
      const s = summarizeDailyPnL(days);
      expect(s.tradingDays).toBe(60);
      expect(s.winningDays).toBe(40);
      expect(s.losingDays).toBe(20);
    });
    test("Decimal P&L", () => {
      const s = summarizeDailyPnL([100.50, -25.25, 200.75]);
      expect(s.totalNetProfit).toBeCloseTo(276.00, 5);
      expect(s.sumOfProfitableDays).toBeCloseTo(301.25, 5);
    });
    test("Average daily P&L", () => {
      const s = summarizeDailyPnL([300, -100, 200]);
      expect(s.averageDailyPnL).toBeCloseTo(133.333, 2);
    });
  });

  // ============================================================
  // REPAIR / FUTURE-DAY SOLVER TESTS
  // ============================================================
  describe("Repair — Required Denominator & Additional Profit", () => {
    test("Required denominator: 1500/0.40 = 3750", () => {
      expect(calculateRequiredDenominator(1500, 40)).toBeCloseTo(3750, 5);
    });
    test("Additional profit: max(0, 3750-3000) = 750", () => {
      expect(calculateAdditionalProfitNeeded(1500, 40, 3000, "NET_PROFIT")).toBeCloseTo(750, 5);
    });
    test("Already within threshold → 0 additional", () => {
      // best=500, denom=3000, threshold=40 → 16.67%, required=1250, already above
      expect(calculateAdditionalProfitNeeded(500, 40, 3000, "NET_PROFIT")).toBe(0);
    });
    test("PROFIT_TARGET basis → 0 additional (no dilution)", () => {
      expect(calculateAdditionalProfitNeeded(1500, 40, 2000, "PROFIT_TARGET")).toBe(0);
    });
  });

  describe("Future-Day Repair Solver", () => {
    test("Planned day below current best — solver finds minimum days", () => {
      // D=3000, B=1500, threshold=40%, P=500 (below best)
      // Required: max(1500, 500)/(3000 + n×500) <= 0.40
      // 1500/(3000+500n) <= 0.40 → 3000+500n >= 3750 → n >= 1.5 → n=2
      const n = calculateFutureDayRepair(3000, 1500, 40, 500, "NET_PROFIT", "AT_OR_BELOW");
      expect(n).toBe(2);
    });
    test("Planned day equal to current best", () => {
      // D=3000, B=1500, threshold=40%, P=1500
      // max(1500,1500)/(3000+1500n) <= 0.40 → 1500/(3000+1500n) <= 0.40
      // 3000+1500n >= 3750 → 1500n >= 750 → n >= 0.5 → n=1
      const n = calculateFutureDayRepair(3000, 1500, 40, 1500, "NET_PROFIT", "AT_OR_BELOW");
      expect(n).toBe(1);
    });
    test("Planned day above current best — re-evaluates (new best = P)", () => {
      // D=3000, B=1500, threshold=40%, P=2000 (above best)
      // new best = 2000. 2000/(3000+2000n) <= 0.40 → 3000+2000n >= 5000 → n >= 1
      const n = calculateFutureDayRepair(3000, 1500, 40, 2000, "NET_PROFIT", "AT_OR_BELOW");
      expect(n).toBe(1);
      // Verify: at n=1, ratio = 2000/5000 = 40% ✓ (at-or-below)
    });
    test("Already satisfied at n=0 → returns 0 (P <= B and ratio already within)", () => {
      // D=5000, B=1000, threshold=40%, P=500. Current ratio = 1000/5000 = 20% <= 40%
      const n = calculateFutureDayRepair(5000, 1000, 40, 500, "NET_PROFIT", "AT_OR_BELOW");
      expect(n).toBe(0);
    });
    test("PROFIT_TARGET basis → null (no dilution)", () => {
      const n = calculateFutureDayRepair(2000, 1500, 40, 500, "PROFIT_TARGET", "AT_OR_BELOW");
      expect(n).toBeNull();
    });
    test("Strict boundary solver", () => {
      // D=3000, B=1500, threshold=40%, P=1500, strict
      // 1500/(3000+1500n) < 0.40 → 3000+1500n > 3750 → n > 0.5 → n=1
      // At n=1: 1500/4500 = 33.33% < 40% ✓
      const n = calculateFutureDayRepair(3000, 1500, 40, 1500, "NET_PROFIT", "STRICTLY_BELOW");
      expect(n).toBe(1);
    });
    test("PROFITABLE_DAYS basis solver", () => {
      // Same structure as NET_PROFIT for profitable days
      const n = calculateFutureDayRepair(1700, 1000, 40, 500, "PROFITABLE_DAYS", "AT_OR_BELOW");
      // max(1000,500)/(1700+500n) <= 0.40 → 1700+500n >= 2500 → n >= 1.6 → n=2
      expect(n).toBe(2);
    });
  });

  // ============================================================
  // MAX SEPARATE POSITIVE DAY TESTS
  // ============================================================
  describe("Max Separate Positive Day", () => {
    test("30% threshold: D=4000, B=1500 → boundary = 1714.29, inclusive (AT_OR_BELOW)", () => {
      const m = calculateMaxSeparatePositiveDay(4000, 1500, 30, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeCloseTo(1714.2857, 2);
      expect(m!.inclusive).toBe(true);
      expect(m!.noValidDay).toBe(false);
    });
    test("40% threshold: D=3000, B=1500 → boundary = 2000, inclusive (AT_OR_BELOW)", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeCloseTo(2000, 5);
      expect(m!.inclusive).toBe(true);
      expect(m!.noValidDay).toBe(false);
    });
    test("50% threshold: D=3000, B=1500 → boundary = 3000, inclusive (AT_OR_BELOW)", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 50, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeCloseTo(3000, 5);
      expect(m!.inclusive).toBe(true);
      expect(m!.noValidDay).toBe(false);
    });
    test("Current ratio already passing (well within)", () => {
      const m = calculateMaxSeparatePositiveDay(10000, 500, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeCloseTo(6666.67, 1);
      expect(m!.inclusive).toBe(true);
    });
    test("New day becomes new best (candidate > B)", () => {
      const m = calculateMaxSeparatePositiveDay(5000, 1000, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeGreaterThan(1000);
      expect(m!.inclusive).toBe(true);
    });
    test("candidate < B → noValidDay (AT_OR_BELOW)", () => {
      // D=2000, B=2000, threshold=40% → candidate = 1333.33 < B
      const m = calculateMaxSeparatePositiveDay(2000, 2000, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.noValidDay).toBe(true);
    });
    test("Ratio already violated badly → noValidDay", () => {
      const m = calculateMaxSeparatePositiveDay(1000, 2000, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.noValidDay).toBe(true);
    });
    test("PROFIT_TARGET basis → null", () => {
      const m = calculateMaxSeparatePositiveDay(2000, 1500, 40, "PROFIT_TARGET", "AT_OR_BELOW");
      expect(m).toBeNull();
    });
    test("Zero denominator → noValidDay", () => {
      const m = calculateMaxSeparatePositiveDay(0, 1000, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.noValidDay).toBe(true);
    });
  });

  // ============================================================
  // STRICT BOUNDARY REGRESSION TESTS (spec cases 1–8)
  // ============================================================
  describe("Strict Boundary Regression Tests", () => {
    // Case 1: threshold = 40%, D = 3000, B = 1500 → boundary = 2000
    test("Case 1: boundary = tD/(1-t) = 0.4×3000/0.6 = 2000", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.boundary).toBeCloseTo(2000, 5);
    });

    // Case 2: AT_OR_BELOW — x = 2000 should satisfy the rule
    test("Case 2: AT_OR_BELOW, x = 2000 satisfies (inclusive boundary)", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 40, "NET_PROFIT", "AT_OR_BELOW");
      expect(m).not.toBeNull();
      expect(m!.inclusive).toBe(true);
      expect(m!.noValidDay).toBe(false);
      // Verify: x = boundary = 2000 → ratio = 2000/(3000+2000) = 0.4 = 40% <= 40% ✓
      const ratio = 2000 / (3000 + 2000);
      expect(ratio).toBeCloseTo(0.4, 8);
      expect(isWithinThreshold(ratio * 100, 40, "AT_OR_BELOW")).toBe(true);
    });

    // Case 3: STRICTLY_BELOW — x = 2000 should NOT satisfy the rule
    test("Case 3: STRICTLY_BELOW, x = 2000 does NOT satisfy (exclusive boundary)", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 40, "NET_PROFIT", "STRICTLY_BELOW");
      expect(m).not.toBeNull();
      expect(m!.inclusive).toBe(false);
      expect(m!.noValidDay).toBe(false);
      expect(m!.boundary).toBeCloseTo(2000, 5);
      // Verify: x = 2000 → ratio = 40%, which is NOT < 40%
      const ratio = 2000 / (3000 + 2000);
      expect(isWithinThreshold(ratio * 100, 40, "STRICTLY_BELOW")).toBe(false);
    });

    // Case 4: STRICTLY_BELOW — a value immediately below 2000 should satisfy
    test("Case 4: STRICTLY_BELOW, x just below 2000 satisfies", () => {
      const x = 1999.99;
      const ratio = (x / (3000 + x)) * 100;
      expect(isWithinThreshold(ratio, 40, "STRICTLY_BELOW")).toBe(true);
    });

    // Case 5: candidate < current best-day case
    test("Case 5: candidate < B → noValidDay in both boundary modes", () => {
      // D=2000, B=2000, threshold=40% → candidate = 1333.33 < B
      const mAt = calculateMaxSeparatePositiveDay(2000, 2000, 40, "NET_PROFIT", "AT_OR_BELOW");
      const mStrict = calculateMaxSeparatePositiveDay(2000, 2000, 40, "NET_PROFIT", "STRICTLY_BELOW");
      expect(mAt!.noValidDay).toBe(true);
      expect(mStrict!.noValidDay).toBe(true);
    });

    // Case 6: candidate = current best-day boundary case
    test("Case 6: candidate = B boundary — AT_OR_BELOW allows, STRICTLY_BELOW noValidDay", () => {
      // Construct candidate = B: tD/(1-t) = B → D = B(1-t)/t
      // B=1500, t=0.4 → D = 1500×0.6/0.4 = 2250
      const D = 2250, B = 1500, threshold = 40;
      const candidate = (0.4 * D) / 0.6; // = 1500 = B
      expect(candidate).toBeCloseTo(B, 5);

      const mAt = calculateMaxSeparatePositiveDay(D, B, threshold, "NET_PROFIT", "AT_OR_BELOW");
      expect(mAt!.noValidDay).toBe(false);
      expect(mAt!.inclusive).toBe(true);
      expect(mAt!.boundary).toBeCloseTo(B, 5);

      const mStrict = calculateMaxSeparatePositiveDay(D, B, threshold, "NET_PROFIT", "STRICTLY_BELOW");
      // x = B gives ratio = t exactly → strict < t fails → noValidDay
      expect(mStrict!.noValidDay).toBe(true);
    });

    // Case 7: verify source no longer contains "No safe positive day"
    test("Case 7: component source does not contain 'No safe positive day'", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      const src = fs.readFileSync(
        "/home/z/my-project/src/components/tools/prop-firm-consistency-calculator.tsx",
        "utf8",
      );
      expect(src).not.toContain("No safe positive day");
      expect(src).not.toContain("safe positive day");
      expect(src).not.toContain("safe profit");
      expect(src).not.toContain("safe day");
    });

    // Case 8: verify strict mode presents result with < (exclusive)
    test("Case 8: STRICTLY_BELOW produces inclusive=false (UI shows <)", () => {
      const m = calculateMaxSeparatePositiveDay(3000, 1500, 40, "NET_PROFIT", "STRICTLY_BELOW");
      expect(m).not.toBeNull();
      expect(m!.inclusive).toBe(false);
      // The UI should display "< boundary" not "≤ boundary"
      expect(m!.noValidDay).toBe(false);
    });
  });

  // ============================================================
  // MIN EVEN DAYS
  // ============================================================
  describe("Min Evenly-Distributed Days", () => {
    test("50% → 2 days", () => { expect(calculateMinEvenDays(50)).toBe(2); });
    test("40% → 3 days", () => { expect(calculateMinEvenDays(40)).toBe(3); });
    test("30% → 4 days", () => { expect(calculateMinEvenDays(30)).toBe(4); });
    test("25% → 4 days", () => { expect(calculateMinEvenDays(25)).toBe(4); });
    test("20% → 5 days", () => { expect(calculateMinEvenDays(20)).toBe(5); });
    test("Table values match formula", () => {
      for (const row of MIN_EVEN_DAYS_TABLE) {
        expect(calculateMinEvenDays(row.threshold)).toBe(row.minDays);
      }
    });
  });

  // ============================================================
  // DAILY P&L PARSER
  // ============================================================
  describe("Daily P&L Parser", () => {
    test("Newline list", () => {
      expect(parseDailyPnL("800\n-250\n450\n1200\n300")).toEqual([800, -250, 450, 1200, 300]);
    });
    test("Comma separated", () => {
      expect(parseDailyPnL("800, -250, 450, 1200, 300")).toEqual([800, -250, 450, 1200, 300]);
    });
    test("Mixed whitespace", () => {
      expect(parseDailyPnL("800  -250\t450\n1200  300")).toEqual([800, -250, 450, 1200, 300]);
    });
    test("Negative numbers", () => {
      expect(parseDailyPnL("-100\n-200\n-50")).toEqual([-100, -200, -50]);
    });
    test("Decimals", () => {
      expect(parseDailyPnL("100.50\n-25.25\n200.75")).toEqual([100.50, -25.25, 200.75]);
    });
    test("Currency symbols stripped ($)", () => {
      expect(parseDailyPnL("$800\n$-250\n$450")).toEqual([800, -250, 450]);
    });
    test("Currency symbols stripped (£, €)", () => {
      expect(parseDailyPnL("£800\n€450")).toEqual([800, 450]);
    });
    test("Malformed tokens skipped", () => {
      expect(parseDailyPnL("800\nabc\n450\nxyz\n300")).toEqual([800, 450, 300]);
    });
    test("Empty input → []", () => {
      expect(parseDailyPnL("")).toEqual([]);
    });
    test("Whitespace-only input → []", () => {
      expect(parseDailyPnL("   \n  \t  ")).toEqual([]);
    });
    test("Comma without spaces", () => {
      expect(parseDailyPnL("800,-250,450")).toEqual([800, -250, 450]);
    });
    test("Semicolon separated", () => {
      expect(parseDailyPnL("800; -250; 450")).toEqual([800, -250, 450]);
    });
  });

  // ============================================================
  // VALIDATION
  // ============================================================
  describe("Validation", () => {
    test("NaN best day → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Infinity best day → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: Infinity }));
      expect(r.valid).toBe(false);
    });
    test("Negative best day → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: -100 }));
      expect(r.valid).toBe(false);
    });
    test("Threshold 0 → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ thresholdPercent: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Threshold 100 → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ thresholdPercent: 100 }));
      expect(r.valid).toBe(false);
    });
    test("Threshold > 100 → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ thresholdPercent: 150 }));
      expect(r.valid).toBe(false);
    });
    test("Profit target <= 0 → invalid", () => {
      const r = calculateConsistencyResult(makeInputs({ ruleBasis: "PROFIT_TARGET", denominator: 0 }));
      expect(r.valid).toBe(false);
    });
    test("No positive day → neutral state", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: 0 }));
      expect(r.valid).toBe(true);
      expect(r.neutralMessage).toBeDefined();
      expect(r.neutralMessage).toContain("No positive trading day");
    });
    test("Net profit <= 0 → neutral state", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: 0, ruleBasis: "NET_PROFIT" }));
      expect(r.valid).toBe(true);
      expect(r.neutralMessage).toBeDefined();
      expect(r.neutralMessage).toContain("zero or negative");
    });
    test("Profitable days sum <= 0 → neutral state", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: 0, ruleBasis: "PROFITABLE_DAYS" }));
      expect(r.valid).toBe(true);
      expect(r.neutralMessage).toBeDefined();
    });
    test("Negative denominator (net loss) → neutral state", () => {
      const r = calculateConsistencyResult(makeInputs({ bestDay: 1000, denominator: -500, ruleBasis: "NET_PROFIT" }));
      expect(r.valid).toBe(true);
      expect(r.neutralMessage).toBeDefined();
    });
  });

  // ============================================================
  // PROFIT TARGET BASIS — no dilution
  // ============================================================
  describe("Profit Target Basis — no dilution", () => {
    test("Additional profit needed is always 0", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1500, denominator: 3000, thresholdPercent: 40, ruleBasis: "PROFIT_TARGET",
      }));
      expect(r.additionalProfitNeeded).toBe(0);
    });
    test("Max allowed best day = target × threshold", () => {
      const r = calculateConsistencyResult(makeInputs({
        bestDay: 1000, denominator: 5000, thresholdPercent: 30, ruleBasis: "PROFIT_TARGET",
      }));
      expect(r.maxAllowedBestDay).toBeCloseTo(1500, 5);
    });
    test("Repair solver returns null for profit target", () => {
      const n = calculateFutureDayRepair(5000, 1000, 30, 500, "PROFIT_TARGET", "AT_OR_BELOW");
      expect(n).toBeNull();
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-Point Safety", () => {
    test("roundTo avoids artifacts", () => {
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });
    test("Consistency percentage avoids 29.999999 artifacts", () => {
      // best=900, denom=3000 → 30% exactly (but float may give 29.99999...)
      const pct = calculateConsistency(900, 3000);
      expect(roundTo(pct, 2)).toBe(30);
    });
    test("Boundary comparison deterministic with epsilon", () => {
      // 30.000000001 vs 30 → should be at-or-below
      expect(isWithinThreshold(30 + 1e-10, 30, "AT_OR_BELOW")).toBe(true);
      // 30.0001 vs 30 → should fail
      expect(isWithinThreshold(30.0001, 30, "AT_OR_BELOW")).toBe(false);
    });
  });

  // ============================================================
  // INTEGRATION
  // ============================================================
  describe("Integration — calculateConsistencyResult", () => {
    test("Default inputs produce expected result", () => {
      const r = calculateConsistencyResult(DEFAULT_INPUTS);
      expect(r.valid).toBe(true);
      expect(r.consistencyPercent).toBeCloseTo(50, 5);
      expect(r.additionalProfitNeeded).toBeCloseTo(750, 5);
    });
    test("THRESHOLD_PRESETS correct", () => {
      expect(THRESHOLD_PRESETS).toEqual([20, 25, 30, 35, 40, 50]);
    });
    test("Repair outputs present in QUICK_CHECK mode", () => {
      const r = calculateConsistencyResult(makeInputs({ mode: "QUICK_CHECK" }));
      expect(r.repair).toBeDefined();
      expect(r.repair!.minEvenDays).toBe(3); // 40% → ceil(1/0.4) = 3
    });
    test("Repair outputs present in REPAIR mode", () => {
      const r = calculateConsistencyResult(makeInputs({ mode: "REPAIR" }));
      expect(r.repair).toBeDefined();
    });
    test("Max separate day surfaces in repair", () => {
      const r = calculateConsistencyResult(makeInputs({ mode: "REPAIR" }));
      expect(r.repair!.maxSeparateDay).not.toBeNull();
    });
    test("Min future days null when no planned future day", () => {
      const r = calculateConsistencyResult(makeInputs({ mode: "REPAIR", plannedFutureDay: null }));
      expect(r.repair!.minFutureDays).toBeNull();
    });
    test("Min future days computed when planned future day supplied", () => {
      const r = calculateConsistencyResult(makeInputs({
        mode: "REPAIR", plannedFutureDay: 500,
      }));
      expect(r.repair!.minFutureDays).not.toBeNull();
      expect(r.repair!.minFutureDays!).toBeGreaterThan(0);
    });
  });
});
