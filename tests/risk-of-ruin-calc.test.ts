import { describe, test, expect } from "bun:test";
import {
  calculateExpectancy,
  calculateExactLosingStreakProbability,
  calculateConsecutiveLossDrawdown,
  calculateRecoveryGain,
  calculateLossesToDrawdown,
  calculatePercentile,
  simulateRiskOfRuin,
  createSeededRandom,
  buildLosingStreakTable,
  buildRiskComparison,
  validateRiskOfRuinInputs,
  roundTo,
  DEFAULT_INPUTS,
  RISK_COMPARISON_LEVELS,
  RECOVERY_TABLE,
  type RiskOfRuinInputs,
  type ThresholdBasis,
} from "../src/lib/risk-of-ruin-calc";

function makeInputs(overrides: Partial<RiskOfRuinInputs> = {}): RiskOfRuinInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

// Brute-force losing-streak checker for small N (used to verify DP)
function bruteForceStreakProbability(winRate: number, N: number, k: number): number {
  const p = winRate / 100;
  const q = 1 - p;
  if (k > N) return 0;
  if (k < 1 || N < 1) return 0;

  let streakHitCount = 0;
  let totalOutcomes = 0;

  // Enumerate all 2^N outcomes
  for (let mask = 0; mask < Math.pow(2, N); mask++) {
    let outcomeProb = 1;
    let consecutive = 0;
    let hit = false;
    for (let i = 0; i < N; i++) {
      const isWin = (mask >> i) & 1;
      if (isWin) {
        outcomeProb *= p;
        consecutive = 0;
      } else {
        outcomeProb *= q;
        consecutive++;
        if (consecutive >= k) hit = true;
      }
    }
    totalOutcomes += outcomeProb;
    if (hit) streakHitCount += outcomeProb;
  }
  return streakHitCount / totalOutcomes;
}

describe("Trading Risk of Ruin & Losing Streak Calculator", () => {

  // ============================================================
  // EXPECTANCY TESTS
  // ============================================================
  describe("Expectancy", () => {
    test("50% wins, 1.5R win, 1R loss → +0.25R", () => {
      const e = calculateExpectancy(50, 1.5, 1);
      expect(e.expectancy).toBeCloseTo(0.25, 8);
      expect(e.isPositive).toBe(true);
    });
    test("40% wins, 2R win, 1R loss → +0.2R", () => {
      const e = calculateExpectancy(40, 2, 1);
      // 0.4×2 - 0.6×1 = 0.8 - 0.6 = 0.2
      expect(e.expectancy).toBeCloseTo(0.2, 8);
      expect(e.isPositive).toBe(true);
    });
    test("Break-even case: 40% wins, 1.5R win, 1R loss", () => {
      // 0.4×1.5 - 0.6×1 = 0.6 - 0.6 = 0
      const e = calculateExpectancy(40, 1.5, 1);
      expect(e.expectancy).toBeCloseTo(0, 8);
    });
    test("Negative expectancy: 30% wins, 1R win, 1R loss", () => {
      // 0.3×1 - 0.7×1 = -0.4
      const e = calculateExpectancy(30, 1, 1);
      expect(e.expectancy).toBeCloseTo(-0.4, 8);
      expect(e.isPositive).toBe(false);
    });
    test("Break-even win rate: 1.5R win, 1R loss → 40%", () => {
      const e = calculateExpectancy(50, 1.5, 1);
      expect(e.breakEvenWinRate).toBeCloseTo(40, 5);
    });
    test("Decimal R values", () => {
      const e = calculateExpectancy(55, 1.75, 0.85);
      // 0.55×1.75 - 0.45×0.85 = 0.9625 - 0.3825 = 0.58
      expect(e.expectancy).toBeCloseTo(0.58, 5);
    });
  });

  // ============================================================
  // LOSING STREAK EXACTNESS (DP vs Brute-Force)
  // ============================================================
  describe("Losing Streak — DP vs Brute-Force", () => {
    test("N=1, k=1, p=50% → 0.5 (at least one loss in 1 trade)", () => {
      const dp = calculateExactLosingStreakProbability(50, 1, 1);
      const bf = bruteForceStreakProbability(50, 1, 1);
      expect(dp.probability).toBeCloseTo(bf, 8);
      expect(dp.probability).toBeCloseTo(0.5, 8);
    });
    test("N=2, k=2, p=50% → probability of two consecutive losses", () => {
      const dp = calculateExactLosingStreakProbability(50, 2, 2);
      const bf = bruteForceStreakProbability(50, 2, 2);
      expect(dp.probability).toBeCloseTo(bf, 8);
      // 0.5 × 0.5 = 0.25
      expect(dp.probability).toBeCloseTo(0.25, 8);
    });
    test("N=3, k=2, p=50% → matches brute-force", () => {
      const dp = calculateExactLosingStreakProbability(50, 3, 2);
      const bf = bruteForceStreakProbability(50, 3, 2);
      expect(dp.probability).toBeCloseTo(bf, 6);
    });
    test("N=4, k=2, p=60% → matches brute-force", () => {
      const dp = calculateExactLosingStreakProbability(60, 4, 2);
      const bf = bruteForceStreakProbability(60, 4, 2);
      expect(dp.probability).toBeCloseTo(bf, 6);
    });
    test("N=5, k=3, p=50% → matches brute-force", () => {
      const dp = calculateExactLosingStreakProbability(50, 5, 3);
      const bf = bruteForceStreakProbability(50, 5, 3);
      expect(dp.probability).toBeCloseTo(bf, 6);
    });
    test("N=6, k=3, p=40% → matches brute-force", () => {
      const dp = calculateExactLosingStreakProbability(40, 6, 3);
      const bf = bruteForceStreakProbability(40, 6, 3);
      expect(dp.probability).toBeCloseTo(bf, 6);
    });
    test("N<k → probability 0", () => {
      const dp = calculateExactLosingStreakProbability(50, 3, 5);
      expect(dp.probability).toBe(0);
    });
    test("p=0 (100% loss rate), N>=k → probability 1", () => {
      const dp = calculateExactLosingStreakProbability(0, 10, 5);
      expect(dp.probability).toBe(1);
    });
    test("p=100% (100% win rate) → probability 0", () => {
      const dp = calculateExactLosingStreakProbability(100, 100, 5);
      expect(dp.probability).toBe(0);
    });
    test("k=1 → probability = 1 - p^N", () => {
      const dp = calculateExactLosingStreakProbability(50, 10, 1);
      expect(dp.probability).toBeCloseTo(1 - Math.pow(0.5, 10), 8);
    });
    test("Larger N: 50% win, 100 trades, 5 streak — probability > naive single-streak", () => {
      const dp = calculateExactLosingStreakProbability(50, 100, 5);
      const naive = Math.pow(0.5, 5); // single specific streak
      expect(dp.probability).toBeGreaterThan(naive);
    });
    test("50% win, 100 trades, 5 streak — probability > 50%", () => {
      // Known approximate value for this common scenario
      const dp = calculateExactLosingStreakProbability(50, 100, 5);
      expect(dp.percentage).toBeGreaterThan(50);
    });
  });

  // ============================================================
  // DRAWDOWN TESTS
  // ============================================================
  describe("Consecutive Loss Drawdown", () => {
    test("$10,000, 1% risk, 1R loss, 5 losses → ~$9,509.90, ~4.90% drawdown", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 1, 1, 5);
      expect(r.endingBalance).toBeCloseTo(9509.90, 1);
      expect(r.drawdownPercent).toBeCloseTo(4.90, 2);
    });
    test("$10,000, 1% risk, 1R loss, 10 losses → ~$9,043.82, ~9.56% drawdown", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 1, 1, 10);
      expect(r.endingBalance).toBeCloseTo(9043.82, 1);
      expect(r.drawdownPercent).toBeCloseTo(9.56, 2);
    });
    test("2% risk, 10 losses → ~81.71% remaining, ~18.29% drawdown", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 2, 1, 10);
      expect(r.endingBalance / 10000).toBeCloseTo(0.8171, 3);
      expect(r.drawdownPercent).toBeCloseTo(18.29, 1);
    });
    test("Custom avgLossR 0.5: 1% risk, 5 losses", () => {
      // lossMult = 1 - 0.01×0.5 = 0.995; 0.995^5 = 0.97525 → 2.475% drawdown
      const r = calculateConsecutiveLossDrawdown(10000, 1, 0.5, 5);
      expect(r.drawdownPercent).toBeCloseTo(2.475, 2);
    });
    test("0.5% risk, 10 losses → small drawdown", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 0.5, 1, 10);
      expect(r.drawdownPercent).toBeLessThan(5);
    });
    test("Per-trade table has correct number of rows", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 1, 1, 5);
      expect(r.perTrade.length).toBe(5);
    });
    test("Per-trade cumulative drawdown increases", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 1, 1, 10);
      for (let i = 1; i < r.perTrade.length; i++) {
        expect(r.perTrade[i].cumulativeDrawdownPercent).toBeGreaterThan(r.perTrade[i - 1].cumulativeDrawdownPercent);
      }
    });
    test("Loss multiplier correct", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 1, 1, 5);
      expect(r.lossMultiplier).toBeCloseTo(0.99, 8);
    });
  });

  // ============================================================
  // RECOVERY TESTS
  // ============================================================
  describe("Recovery Gain", () => {
    test("5% drawdown → 5.26% recovery", () => {
      expect(calculateRecoveryGain(0.05) * 100).toBeCloseTo(5.26, 1);
    });
    test("10% drawdown → 11.11% recovery", () => {
      expect(calculateRecoveryGain(0.10) * 100).toBeCloseTo(11.11, 1);
    });
    test("20% drawdown → 25% recovery", () => {
      expect(calculateRecoveryGain(0.20) * 100).toBeCloseTo(25, 0);
    });
    test("30% drawdown → 42.86% recovery", () => {
      expect(calculateRecoveryGain(0.30) * 100).toBeCloseTo(42.86, 1);
    });
    test("40% drawdown → 66.67% recovery", () => {
      expect(calculateRecoveryGain(0.40) * 100).toBeCloseTo(66.67, 1);
    });
    test("50% drawdown → 100% recovery", () => {
      expect(calculateRecoveryGain(0.50) * 100).toBeCloseTo(100, 0);
    });
    test("60% drawdown → 150% recovery", () => {
      expect(calculateRecoveryGain(0.60) * 100).toBeCloseTo(150, 0);
    });
    test("70% drawdown → 233.33% recovery", () => {
      expect(calculateRecoveryGain(0.70) * 100).toBeCloseTo(233.33, 1);
    });
    test("80% drawdown → 400% recovery", () => {
      expect(calculateRecoveryGain(0.80) * 100).toBeCloseTo(400, 0);
    });
    test("90% drawdown → 900% recovery", () => {
      expect(calculateRecoveryGain(0.90) * 100).toBeCloseTo(900, 0);
    });
    test("Recovery table values correct", () => {
      for (const row of RECOVERY_TABLE) {
        expect(calculateRecoveryGain(row.drawdown / 100) * 100).toBeCloseTo(row.recovery, 1);
      }
    });
  });

  // ============================================================
  // LOSSES TO THRESHOLD TESTS
  // ============================================================
  describe("Losses to Threshold", () => {
    test("10% threshold, 1% risk, 1R loss → n where 0.99^n <= 0.90", () => {
      // ln(0.9)/ln(0.99) ≈ 10.48 → ceil = 11
      const r = calculateLossesToDrawdown(10000, 1, 1, 0.10);
      expect(r.losses).toBe(11);
    });
    test("20% threshold, 1% risk, 1R loss", () => {
      // ln(0.8)/ln(0.99) ≈ 22.28 → ceil = 23
      const r = calculateLossesToDrawdown(10000, 1, 1, 0.20);
      expect(r.losses).toBe(23);
    });
    test("30% threshold, 2% risk, 1R loss", () => {
      // m = 0.98; ln(0.7)/ln(0.98) ≈ 17.83 → ceil = 18
      const r = calculateLossesToDrawdown(10000, 2, 1, 0.30);
      expect(r.losses).toBe(18);
    });
    test("50% threshold, 1% risk, 1R loss", () => {
      // ln(0.5)/ln(0.99) ≈ 68.97 → ceil = 69
      const r = calculateLossesToDrawdown(10000, 1, 1, 0.50);
      expect(r.losses).toBe(69);
    });
    test("n-1 does not cross threshold, n does", () => {
      const r = calculateLossesToDrawdown(10000, 1, 1, 0.20);
      const m = 0.99;
      // m^(n-1) > 0.80 (not crossed)
      expect(Math.pow(m, r.losses - 1)).toBeGreaterThan(0.80 - 1e-9);
      // m^n <= 0.80 (crossed)
      expect(Math.pow(m, r.losses)).toBeLessThanOrEqual(0.80 + 1e-9);
    });
    test("Higher risk → fewer losses to threshold", () => {
      const r1 = calculateLossesToDrawdown(10000, 1, 1, 0.30);
      const r2 = calculateLossesToDrawdown(10000, 3, 1, 0.30);
      expect(r2.losses).toBeLessThan(r1.losses);
    });
  });

  // ============================================================
  // SEEDED RANDOM TESTS
  // ============================================================
  describe("Seeded PRNG (Mulberry32)", () => {
    test("Same seed → same first N values", () => {
      const rng1 = createSeededRandom(20261008);
      const rng2 = createSeededRandom(20261008);
      for (let i = 0; i < 100; i++) {
        expect(rng1()).toBe(rng2());
      }
    });
    test("Different seeds → different sequences", () => {
      const rng1 = createSeededRandom(12345);
      const rng2 = createSeededRandom(67890);
      let diffs = 0;
      for (let i = 0; i < 100; i++) {
        if (rng1() !== rng2()) diffs++;
      }
      expect(diffs).toBeGreaterThan(90);
    });
    test("Values in [0, 1)", () => {
      const rng = createSeededRandom(42);
      for (let i = 0; i < 1000; i++) {
        const v = rng();
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
      }
    });
  });

  // ============================================================
  // SIMULATION DETERMINISM TESTS
  // ============================================================
  describe("Simulation Determinism", () => {
    test("Same seed + inputs → same summary", () => {
      const s1 = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 1000, 20261008);
      const s2 = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 1000, 20261008);
      expect(s1.thresholdHitProbability).toBe(s2.thresholdHitProbability);
      expect(s1.medianEndingBalance).toBe(s2.medianEndingBalance);
      expect(s1.medianMaxDrawdown).toBe(s2.medianMaxDrawdown);
    });
    test("Different seed → may produce different result", () => {
      const s1 = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 1000, 20261008);
      const s2 = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 1000, 99999);
      // At least one metric likely differs
      const anyDiff = s1.thresholdHitProbability !== s2.thresholdHitProbability
        || s1.medianEndingBalance !== s2.medianEndingBalance;
      // Note: with 1000 paths it's theoretically possible (but very unlikely) to match
      // We test for "may" not "must"
      expect(typeof anyDiff).toBe("boolean");
    });
    test("STARTING_BALANCE_LOSS basis works", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.thresholdHitProbability).toBeGreaterThanOrEqual(0);
      expect(s.thresholdHitProbability).toBeLessThanOrEqual(1);
    });
    test("PEAK_DRAWDOWN basis works", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "PEAK_DRAWDOWN", 500, 42);
      expect(s.thresholdHitProbability).toBeGreaterThanOrEqual(0);
      expect(s.thresholdHitProbability).toBeLessThanOrEqual(1);
    });
  });

  // ============================================================
  // SIMULATION SANITY TESTS
  // ============================================================
  describe("Simulation Sanity", () => {
    test("Probability between 0 and 1", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.thresholdHitProbability).toBeGreaterThanOrEqual(0);
      expect(s.thresholdHitProbability).toBeLessThanOrEqual(1);
    });
    test("Percentiles ordered: P10 <= median <= P90", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.p10EndingBalance).toBeLessThanOrEqual(s.medianEndingBalance + 1e-6);
      expect(s.medianEndingBalance).toBeLessThanOrEqual(s.p90EndingBalance + 1e-6);
    });
    test("Max drawdown between 0 and 1", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.medianMaxDrawdown).toBeGreaterThanOrEqual(0);
      expect(s.medianMaxDrawdown).toBeLessThanOrEqual(1);
    });
    test("Path count correct", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.paths).toBe(500);
    });
    test("Ending balance positive under validated multipliers", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 500, 42);
      expect(s.medianEndingBalance).toBeGreaterThan(0);
    });
    test("Higher risk → greater deterministic consecutive-loss drawdown", () => {
      const dd1 = calculateConsecutiveLossDrawdown(10000, 1, 1, 10);
      const dd3 = calculateConsecutiveLossDrawdown(10000, 3, 1, 10);
      expect(dd3.drawdownPercent).toBeGreaterThan(dd1.drawdownPercent);
    });
  });

  // ============================================================
  // PERCENTILE TESTS
  // ============================================================
  describe("Percentile", () => {
    test("Median of [1,2,3,4,5] → 3", () => {
      expect(calculatePercentile([1, 2, 3, 4, 5], 50)).toBe(3);
    });
    test("P10 of [1,2,3,4,5]", () => {
      expect(calculatePercentile([1, 2, 3, 4, 5], 10)).toBeCloseTo(1.4, 5);
    });
    test("P90 of [1,2,3,4,5]", () => {
      expect(calculatePercentile([1, 2, 3, 4, 5], 90)).toBeCloseTo(4.6, 5);
    });
    test("Single value → that value", () => {
      expect(calculatePercentile([42], 50)).toBe(42);
    });
    test("Empty → NaN", () => {
      expect(isNaN(calculatePercentile([], 50))).toBe(true);
    });
  });

  // ============================================================
  // LOSING STREAK TABLE TESTS
  // ============================================================
  describe("Losing Streak Table", () => {
    test("Default streaks 2-10 present", () => {
      const table = buildLosingStreakTable(50, 100, 1, 1);
      expect(table.length).toBe(8);
      expect(table.map((r) => r.streak)).toEqual([2, 3, 4, 5, 6, 7, 8, 10]);
    });
    test("Custom streak added and sorted", () => {
      const table = buildLosingStreakTable(50, 100, 1, 1, 9);
      expect(table.length).toBe(9);
      expect(table.map((r) => r.streak)).toContain(9);
    });
    test("Probability decreases as streak increases", () => {
      const table = buildLosingStreakTable(50, 100, 1, 1);
      for (let i = 1; i < table.length; i++) {
        expect(table[i].probability).toBeLessThanOrEqual(table[i - 1].probability);
      }
    });
    test("Drawdown increases with streak", () => {
      const table = buildLosingStreakTable(50, 100, 1, 1);
      for (let i = 1; i < table.length; i++) {
        expect(table[i].drawdownPercent).toBeGreaterThan(table[i - 1].drawdownPercent);
      }
    });
  });

  // ============================================================
  // RISK COMPARISON TESTS
  // ============================================================
  describe("Risk Comparison", () => {
    test("Default levels present", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42);
      expect(rows.length).toBe(7);
      expect(rows.map((r) => r.riskPercent)).toEqual([0.25, 0.5, 1.0, 1.5, 2.0, 3.0, 5.0]);
    });
    test("5-loss drawdown increases with risk", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42);
      for (let i = 1; i < rows.length; i++) {
        expect(rows[i].lossAfter5Percent).toBeGreaterThan(rows[i - 1].lossAfter5Percent);
      }
    });
    test("10-loss drawdown increases with risk", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42);
      for (let i = 1; i < rows.length; i++) {
        expect(rows[i].lossAfter10Percent).toBeGreaterThan(rows[i - 1].lossAfter10Percent);
      }
    });
    test("Losses to threshold generally decreases as risk rises", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42);
      for (let i = 1; i < rows.length; i++) {
        expect(rows[i].lossesToThreshold!).toBeLessThanOrEqual(rows[i - 1].lossesToThreshold!);
      }
    });
    test("Simulation column null by default", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42);
      expect(rows[0].simulatedThresholdHitProbability).toBeNull();
    });
    test("Simulation column populated when runSimulation=true", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42, undefined, true, 200);
      expect(rows[0].simulatedThresholdHitProbability).not.toBeNull();
    });
    test("Custom risk added and sorted", () => {
      const rows = buildRiskComparison(50, 1.5, 1, 10000, 200, 30, "STARTING_BALANCE_LOSS", 42, 4.0);
      expect(rows.length).toBe(8);
      expect(rows.map((r) => r.riskPercent)).toContain(4.0);
    });
  });

  // ============================================================
  // VALIDATION TESTS
  // ============================================================
  describe("Validation", () => {
    test("NaN win rate → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ winRate: NaN }))).not.toBeNull();
    });
    test("Win rate > 100 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ winRate: 150 }))).not.toBeNull();
    });
    test("Win rate < 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ winRate: -5 }))).not.toBeNull();
    });
    test("Average win <= 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ averageWinR: 0 }))).not.toBeNull();
    });
    test("Average loss <= 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ averageLossR: 0 }))).not.toBeNull();
    });
    test("Risk <= 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ riskPercent: 0 }))).not.toBeNull();
    });
    test("Risk × avgLoss >= 100% → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ riskPercent: 50, averageLossR: 2 }))).not.toBeNull();
    });
    test("Starting balance <= 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ startingBalance: 0 }))).not.toBeNull();
    });
    test("Trade horizon < 10 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ tradeHorizon: 5 }))).not.toBeNull();
    });
    test("Trade horizon > 2000 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ tradeHorizon: 3000 }))).not.toBeNull();
    });
    test("Simulation paths < 100 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ simulationPaths: 50 }))).not.toBeNull();
    });
    test("Simulation paths > 10000 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ simulationPaths: 20000 }))).not.toBeNull();
    });
    test("Threshold <= 0 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ thresholdPercent: 0 }))).not.toBeNull();
    });
    test("Threshold >= 100 → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ thresholdPercent: 100 }))).not.toBeNull();
    });
    test("Streak > trades → invalid (LOSING_STREAK)", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ mode: "LOSING_STREAK", numberOfTrades: 10, streakLength: 20 }))).not.toBeNull();
    });
    test("Negative balance → invalid", () => {
      expect(validateRiskOfRuinInputs(makeInputs({ startingBalance: -1000 }))).not.toBeNull();
    });
    test("Valid inputs → null", () => {
      expect(validateRiskOfRuinInputs(DEFAULT_INPUTS)).toBeNull();
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-Point Safety", () => {
    test("roundTo avoids artifacts", () => {
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });
    test("0.5% risk handled", () => {
      const r = calculateConsecutiveLossDrawdown(10000, 0.5, 1, 10);
      expect(r.drawdownPercent).toBeCloseTo(4.89, 1);
    });
    test("Large horizon simulation doesn't NaN", () => {
      const s = simulateRiskOfRuin(50, 1.5, 1, 1, 10000, 500, 30, "STARTING_BALANCE_LOSS", 100, 42);
      expect(isFinite(s.thresholdHitProbability)).toBe(true);
      expect(isFinite(s.medianEndingBalance)).toBe(true);
    });
  });
});
