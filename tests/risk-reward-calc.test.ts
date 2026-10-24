import { describe, test, expect } from "bun:test";
import {
  analyzeRiskReward,
  validateInputs,
  computeDistances,
  calculateBreakEvenWinRate,
  calculateTargetFromR,
  calculateStopFromR,
  calculateExpectancy,
  calculateCostAdjustedMetrics,
  calculateMultiTargetPlan,
  convertDistanceToIncrementUnits,
  getIncrementSize,
  roundTo,
  smartRound,
  DEFAULT_INPUTS,
  R_PRESETS,
  BREAK_EVEN_TABLE,
  type RiskRewardInputs,
  type Direction,
  type CalculatorMode,
  type DisplayMode,
} from "../src/lib/risk-reward-calc";

function makeInputs(overrides: Partial<RiskRewardInputs> = {}): RiskRewardInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("Forex & XAUUSD Risk Reward Calculator", () => {

  // ============================================================
  // MODE 1 — ANALYZE TRADE
  // ============================================================
  describe("Analyze Trade — LONG", () => {
    test("LONG 1R: entry 4000, stop 3990, target 4010 → 1:1", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4010 }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBe(10);
      expect(r.rewardDistance).toBe(10);
      expect(r.rMultiple).toBe(1);
      expect(r.breakEvenWinRate).toBeCloseTo(50, 5);
    });

    test("LONG 2R: entry 4000, stop 3990, target 4020 → 1:2 (default example)", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4020 }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBe(10);
      expect(r.rewardDistance).toBe(20);
      expect(r.rMultiple).toBe(2);
      expect(r.breakEvenWinRate).toBeCloseTo(33.333333, 3);
    });

    test("LONG 3R: entry 4000, stop 3990, target 4030 → 1:3", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4030 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(3);
      expect(r.breakEvenWinRate).toBeCloseTo(25, 5);
    });

    test("LONG 0.5R: entry 4000, stop 3990, target 4005 → 1:0.5", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4005 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(0.5);
      expect(r.breakEvenWinRate).toBeCloseTo(66.666666, 3);
    });

    test("LONG 5R: entry 4000, stop 3990, target 4050 → 1:5", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4050 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(5);
      expect(r.breakEvenWinRate).toBeCloseTo(16.666666, 3);
    });
  });

  describe("Analyze Trade — SHORT", () => {
    test("SHORT 1R: entry 4000, stop 4010, target 3990 → 1:1", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 4000, stop: 4010, target: 3990 }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBe(10);
      expect(r.rewardDistance).toBe(10);
      expect(r.rMultiple).toBe(1);
    });

    test("SHORT 2R: entry 4000, stop 4010, target 3980 → 1:2", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 4000, stop: 4010, target: 3980 }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBe(10);
      expect(r.rewardDistance).toBe(20);
      expect(r.rMultiple).toBe(2);
    });

    test("SHORT 3R: entry 4000, stop 4010, target 3970 → 1:3", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 4000, stop: 4010, target: 3970 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(3);
    });

    test("SHORT 0.5R: entry 4000, stop 4010, target 3995 → 1:0.5", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 4000, stop: 4010, target: 3995 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(0.5);
    });

    test("SHORT 5R: entry 4000, stop 4010, target 3950 → 1:5", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 4000, stop: 4010, target: 3950 }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(5);
    });
  });

  // ============================================================
  // FOREX PRICE DECIMALS
  // ============================================================
  describe("Forex decimals", () => {
    test("EURUSD 1R: entry 1.1000, stop 1.0950, target 1.1050", () => {
      const r = analyzeRiskReward(makeInputs({
        direction: "LONG", entry: 1.1, stop: 1.095, target: 1.105,
        displayMode: "FOREX_STANDARD",
      }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBeCloseTo(0.005, 8);
      expect(r.rewardDistance).toBeCloseTo(0.005, 8);
      expect(r.rMultiple).toBeCloseTo(1, 8);
      expect(r.riskIncrementUnits).toBeCloseTo(50, 5); // 0.005 / 0.0001
    });

    test("GBPUSD 2R: entry 1.2500, stop 1.2450, target 1.2600", () => {
      const r = analyzeRiskReward(makeInputs({
        direction: "LONG", entry: 1.25, stop: 1.245, target: 1.26,
        displayMode: "FOREX_STANDARD",
      }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBeCloseTo(2, 6);
      expect(r.rewardIncrementUnits).toBeCloseTo(100, 5);
    });

    test("USDJPY 2R: entry 150.00, stop 149.50, target 151.00 (JPY pip 0.01)", () => {
      const r = analyzeRiskReward(makeInputs({
        direction: "LONG", entry: 150.0, stop: 149.5, target: 151.0,
        displayMode: "FOREX_JPY",
      }));
      expect(r.valid).toBe(true);
      expect(r.rMultiple).toBe(2);
      expect(r.riskIncrementUnits).toBeCloseTo(50, 5); // 0.5 / 0.01
    });

    test("Tiny forex distance: entry 1.10000, stop 1.09999, target 1.10002", () => {
      const r = analyzeRiskReward(makeInputs({
        direction: "LONG", entry: 1.10000, stop: 1.09999, target: 1.10002,
        displayMode: "FOREX_STANDARD",
      }));
      expect(r.valid).toBe(true);
      expect(r.riskDistance).toBeCloseTo(0.00001, 10);
      expect(r.rewardDistance).toBeCloseTo(0.00002, 10);
      expect(r.rMultiple).toBeCloseTo(2, 6);
    });
  });

  // ============================================================
  // XAUUSD CONVENTIONS
  // ============================================================
  describe("XAUUSD pip conventions", () => {
    test("$0.01 convention: entry 4000, stop 3990, target 4020 → 1000 risk pips, 2000 reward pips", () => {
      const r = analyzeRiskReward(makeInputs({
        entry: 4000, stop: 3990, target: 4020, displayMode: "XAUUSD_001",
      }));
      expect(r.valid).toBe(true);
      expect(r.riskIncrementUnits).toBeCloseTo(1000, 5);
      expect(r.rewardIncrementUnits).toBeCloseTo(2000, 5);
      expect(r.rMultiple).toBe(2);
    });

    test("$0.10 convention: same trade → 100 risk pips, 200 reward pips", () => {
      const r = analyzeRiskReward(makeInputs({
        entry: 4000, stop: 3990, target: 4020, displayMode: "XAUUSD_010",
      }));
      expect(r.valid).toBe(true);
      expect(r.riskIncrementUnits).toBeCloseTo(100, 5);
      expect(r.rewardIncrementUnits).toBeCloseTo(200, 5);
      expect(r.rMultiple).toBe(2);
    });

    test("Custom increment 0.05: same trade → 200 risk units, 400 reward units", () => {
      const r = analyzeRiskReward(makeInputs({
        entry: 4000, stop: 3990, target: 4020, displayMode: "CUSTOM", customIncrement: 0.05,
      }));
      expect(r.valid).toBe(true);
      expect(r.riskIncrementUnits).toBeCloseTo(200, 5);
      expect(r.rewardIncrementUnits).toBeCloseTo(400, 5);
    });

    test("Ratio invariant across conventions: R stays 2 regardless of increment", () => {
      const r1 = analyzeRiskReward(makeInputs({ displayMode: "XAUUSD_001" }));
      const r2 = analyzeRiskReward(makeInputs({ displayMode: "XAUUSD_010" }));
      const r3 = analyzeRiskReward(makeInputs({ displayMode: "GENERIC" }));
      expect(r1.rMultiple).toBe(2);
      expect(r2.rMultiple).toBe(2);
      expect(r3.rMultiple).toBe(2);
    });
  });

  // ============================================================
  // MODE 2 — FIND TARGET
  // ============================================================
  describe("Find Target from R", () => {
    test("LONG 1R: entry 100, stop 95 → target 105", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "LONG", entry: 100, stop: 95, desiredR: 1,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(105);
      expect(r.rMultiple).toBe(1);
    });

    test("LONG 2R: entry 100, stop 95 → target 110 (spec example)", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "LONG", entry: 100, stop: 95, desiredR: 2,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(110);
      expect(r.rMultiple).toBe(2);
    });

    test("LONG 3R: entry 100, stop 95 → target 115", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "LONG", entry: 100, stop: 95, desiredR: 3,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(115);
    });

    test("SHORT 1R: entry 100, stop 105 → target 95", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "SHORT", entry: 100, stop: 105, desiredR: 1,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(95);
    });

    test("SHORT 2R: entry 100, stop 105 → target 90", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "SHORT", entry: 100, stop: 105, desiredR: 2,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(90);
    });

    test("SHORT 3R: entry 100, stop 105 → target 85", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "SHORT", entry: 100, stop: 105, desiredR: 3,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(85);
    });

    test("Fractional R 1.5: LONG entry 100, stop 95 → target 107.5", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "LONG", entry: 100, stop: 95, desiredR: 1.5,
      }));
      expect(r.valid).toBe(true);
      expect(r.target).toBe(107.5);
    });

    test("LONG find-target with stop above entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "LONG", entry: 100, stop: 105, desiredR: 2,
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("stop loss must be below");
    });

    test("SHORT find-target with stop below entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_TARGET", direction: "SHORT", entry: 100, stop: 95, desiredR: 2,
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("stop loss must be above");
    });
  });

  // ============================================================
  // MODE 3 — FIND STOP
  // ============================================================
  describe("Find Stop from R", () => {
    test("LONG 2R: entry 100, target 110 → stop 95 (spec example)", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_STOP", direction: "LONG", entry: 100, target: 110, desiredR: 2,
      }));
      expect(r.valid).toBe(true);
      expect(r.stop).toBe(95);
      expect(r.rMultiple).toBe(2);
    });

    test("SHORT 2R: entry 100, target 90 → stop 105", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_STOP", direction: "SHORT", entry: 100, target: 90, desiredR: 2,
      }));
      expect(r.valid).toBe(true);
      expect(r.stop).toBe(105);
    });

    test("Fractional R 1.5: LONG entry 100, target 110 → stop ~93.333", () => {
      // reward = 10, risk = 10/1.5 = 6.6667, stop = 100 - 6.6667 = 93.3333
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_STOP", direction: "LONG", entry: 100, target: 110, desiredR: 1.5,
      }));
      expect(r.valid).toBe(true);
      expect(r.stop).toBeCloseTo(93.333333, 4);
    });

    test("Invalid solution (LONG target below entry) → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_STOP", direction: "LONG", entry: 100, target: 90, desiredR: 2,
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("take profit must be above");
    });

    test("Invalid solution (SHORT target above entry) → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "FIND_STOP", direction: "SHORT", entry: 100, target: 110, desiredR: 2,
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("take profit must be below");
    });
  });

  // ============================================================
  // BREAK-EVEN WIN RATE
  // ============================================================
  describe("Break-Even Win Rate", () => {
    test("1R → 50%", () => {
      expect(calculateBreakEvenWinRate(1)).toBeCloseTo(50, 5);
    });
    test("2R → 33.333%", () => {
      expect(calculateBreakEvenWinRate(2)).toBeCloseTo(33.333333, 3);
    });
    test("3R → 25%", () => {
      expect(calculateBreakEvenWinRate(3)).toBeCloseTo(25, 5);
    });
    test("0.5R → 66.666%", () => {
      expect(calculateBreakEvenWinRate(0.5)).toBeCloseTo(66.666666, 3);
    });
    test("5R → 16.666%", () => {
      expect(calculateBreakEvenWinRate(5)).toBeCloseTo(16.666666, 3);
    });
    test("Break-even table values match formula", () => {
      for (const row of BREAK_EVEN_TABLE) {
        expect(calculateBreakEvenWinRate(row.rMultiple)).toBeCloseTo(row.breakEven, 1);
      }
    });
  });

  // ============================================================
  // EXPECTANCY
  // ============================================================
  describe("Expectancy (gross, R units)", () => {
    test("50% win rate + 2R → +0.5R", () => {
      expect(calculateExpectancy(2, 50)).toBeCloseTo(0.5, 8);
    });
    test("25% win rate + 3R → 0R", () => {
      expect(calculateExpectancy(3, 25)).toBeCloseTo(0, 8);
    });
    test("40% win rate + 1R → -0.2R", () => {
      expect(calculateExpectancy(1, 40)).toBeCloseTo(-0.2, 8);
    });
    test("0% boundary + 2R → -1R", () => {
      expect(calculateExpectancy(2, 0)).toBe(-1);
    });
    test("100% boundary + 2R → +2R", () => {
      expect(calculateExpectancy(2, 100)).toBe(2);
    });

    test("Expectancy surfaces in analyzeRiskReward when winRate supplied", () => {
      const r = analyzeRiskReward(makeInputs({ winRate: 50 }));
      expect(r.valid).toBe(true);
      expect(r.expectancy).toBeCloseTo(0.5, 8);
    });
  });

  // ============================================================
  // COST ADJUSTMENT
  // ============================================================
  describe("Trading Cost Adjustment", () => {
    test("Zero cost → netR equals gross R", () => {
      const m = calculateCostAdjustedMetrics(10, 20, 2, 0, null);
      expect(m.cost).toBe(0);
      expect(m.netR).toBe(2);
      expect(m.adjustedBreakEvenWinRate).toBeCloseTo(33.333333, 3);
    });

    test("Positive cost reduces netR", () => {
      // risk=10, reward=20, c=2 → netR = (20-2)/(10+2) = 18/12 = 1.5
      const m = calculateCostAdjustedMetrics(10, 20, 2, 2, null);
      expect(m.netR).toBeCloseTo(1.5, 8);
    });

    test("Positive cost raises break-even", () => {
      const m = calculateCostAdjustedMetrics(10, 20, 2, 2, null);
      // (10+2)/(10+20) × 100 = 12/30 × 100 = 40
      expect(m.adjustedBreakEvenWinRate).toBeCloseTo(40, 5);
    });

    test("Cost >= reward → netR null (no positive net reward)", () => {
      const m = calculateCostAdjustedMetrics(10, 20, 2, 20, null);
      expect(m.netR).toBeNull();
    });

    test("Cost-adjusted expectancy with win rate", () => {
      // risk=10, reward=20, R=2, c=2, winRate=50
      // costR = 2/10 = 0.2
      // netWinner = 2 - 0.2 = 1.8 ; netLoser = 1 + 0.2 = 1.2
      // EV = 0.5*1.8 - 0.5*1.2 = 0.9 - 0.6 = 0.3
      const m = calculateCostAdjustedMetrics(10, 20, 2, 2, 50);
      expect(m.costAdjustedExpectancy).toBeCloseTo(0.3, 8);
    });

    test("Cost adjustment only applied in single-target (ANALYZE) mode", () => {
      const r = analyzeRiskReward(makeInputs({ tradingCost: 2 }));
      expect(r.valid).toBe(true);
      expect(r.costAdjusted).not.toBeNull();
      expect(r.costAdjusted!.netR).toBeCloseTo(1.5, 8);
    });
  });

  // ============================================================
  // MULTI-TARGET
  // ============================================================
  describe("Multiple Take-Profit Targets", () => {
    test("2 targets / 100%: TP1 1R 50%, TP2 3R 50% → weighted R = 2", () => {
      // entry 4000, stop 3990, risk=10
      // TP1 4010 (1R, 50%), TP2 4030 (3R, 50%)
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4010, allocationPercent: 50 },
          { targetPrice: 4030, allocationPercent: 50 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.multiTarget).toBeDefined();
      expect(r.multiTarget!.weightedR).toBeCloseTo(2, 8);
      expect(r.multiTarget!.targets[0].rMultiple).toBe(1);
      expect(r.multiTarget!.targets[1].rMultiple).toBe(3);
    });

    test("4 targets / 100%: weighted R correct", () => {
      // entry 4000, stop 3990, risk=10
      // TP1 4005 (0.5R, 25%), TP2 4010 (1R, 25%), TP3 4020 (2R, 25%), TP4 4040 (4R, 25%)
      // weighted = 0.25*(0.5+1+2+4) = 0.25*7.5 = 1.875
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4005, allocationPercent: 25 },
          { targetPrice: 4010, allocationPercent: 25 },
          { targetPrice: 4020, allocationPercent: 25 },
          { targetPrice: 4040, allocationPercent: 25 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.multiTarget!.weightedR).toBeCloseTo(1.875, 8);
    });

    test("LONG multi-target ascending order enforced", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4020, allocationPercent: 50 },
          { targetPrice: 4010, allocationPercent: 50 }, // out of order
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("ascending order");
    });

    test("SHORT multi-target descending order enforced", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET", direction: "SHORT",
        entry: 4000, stop: 4010,
        targets: [
          { targetPrice: 3990, allocationPercent: 50 },
          { targetPrice: 3980, allocationPercent: 50 }, // 3990 > 3980 ok
        ],
      }));
      expect(r.valid).toBe(true);
      const r2 = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET", direction: "SHORT",
        entry: 4000, stop: 4010,
        targets: [
          { targetPrice: 3980, allocationPercent: 50 },
          { targetPrice: 3990, allocationPercent: 50 }, // out of order
        ],
      }));
      expect(r2.valid).toBe(false);
      expect(r2.error).toContain("descending order");
    });

    test("Allocation < 100% → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4010, allocationPercent: 40 },
          { targetPrice: 4020, allocationPercent: 50 }, // total 90
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("100%");
    });

    test("Allocation > 100% → invalid", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4010, allocationPercent: 60 },
          { targetPrice: 4020, allocationPercent: 50 }, // total 110
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("100%");
    });

    test("LONG target below entry → invalid (wrong side)", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 3990, allocationPercent: 50 }, // below entry
          { targetPrice: 4020, allocationPercent: 50 },
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("above the entry");
    });

    test("Multi-target does NOT produce a break-even win rate (spec §18)", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        targets: [
          { targetPrice: 4010, allocationPercent: 50 },
          { targetPrice: 4020, allocationPercent: 50 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.breakEvenWinRate).toBeNull();
      expect(r.expectancy).toBeNull();
      expect(r.costAdjusted).toBeNull();
    });

    test("Multi-target with risk amount → potential gross reward = riskAmount × weightedR", () => {
      const r = analyzeRiskReward(makeInputs({
        mode: "MULTI_TARGET",
        riskAmount: 100,
        targets: [
          { targetPrice: 4010, allocationPercent: 50 },
          { targetPrice: 4030, allocationPercent: 50 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.potentialGrossReward).toBeCloseTo(200, 8); // 100 × 2
    });
  });

  // ============================================================
  // VALIDATION — INVALID GEOMETRY
  // ============================================================
  describe("Validation — invalid geometry", () => {
    test("LONG with stop == entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 100, stop: 100, target: 110 }));
      expect(r.valid).toBe(false);
    });
    test("LONG with target == entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 100, stop: 90, target: 100 }));
      expect(r.valid).toBe(false);
    });
    test("LONG with stop above entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 100, stop: 105, target: 110 }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("below the entry");
    });
    test("LONG with target below entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 100, stop: 90, target: 85 }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("above the entry");
    });
    test("SHORT with stop below entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 100, stop: 95, target: 90 }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("above the entry");
    });
    test("SHORT with target above entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ direction: "SHORT", entry: 100, stop: 105, target: 110 }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("below the entry");
    });
  });

  // ============================================================
  // VALIDATION — NON-FINITE / NON-POSITIVE
  // ============================================================
  describe("Validation — non-finite / non-positive", () => {
    test("NaN entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Infinity entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: Infinity }));
      expect(r.valid).toBe(false);
    });
    test("-Infinity entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: -Infinity }));
      expect(r.valid).toBe(false);
    });
    test("Negative entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: -100 }));
      expect(r.valid).toBe(false);
    });
    test("Zero entry → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 0 }));
      expect(r.valid).toBe(false);
    });
    test("NaN stop → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ stop: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Negative stop → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ stop: -10 }));
      expect(r.valid).toBe(false);
    });
    test("Desired R <= 0 → invalid (FIND_TARGET)", () => {
      const r = analyzeRiskReward(makeInputs({ mode: "FIND_TARGET", desiredR: 0 }));
      expect(r.valid).toBe(false);
    });
    test("NaN desired R → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ mode: "FIND_TARGET", desiredR: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Invalid custom increment (0) → invalid (spec §22 rejects increment <= 0)", () => {
      const r = analyzeRiskReward(makeInputs({ displayMode: "CUSTOM", customIncrement: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Invalid win rate (>100) → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ winRate: 150 }));
      expect(r.valid).toBe(false);
    });
    test("Negative win rate → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ winRate: -5 }));
      expect(r.valid).toBe(false);
    });
    test("Negative trading cost → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ tradingCost: -1 }));
      expect(r.valid).toBe(false);
    });
    test("Negative risk amount → invalid", () => {
      const r = analyzeRiskReward(makeInputs({ riskAmount: -50 }));
      expect(r.valid).toBe(false);
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-point safety", () => {
    test("0.1 + 0.2 style case does not corrupt R", () => {
      // entry 1.1, stop 1.0999, target 1.1002 → risk 0.0001, reward 0.0001 (1R)
      const r = analyzeRiskReward(makeInputs({
        direction: "LONG", entry: 1.1, stop: 1.0999, target: 1.1002, displayMode: "FOREX_STANDARD",
      }));
      expect(r.valid).toBe(true);
      // reward 0.0002 / risk 0.0001 = 2
      expect(r.rMultiple).toBeCloseTo(2, 6);
    });

    test("roundTo avoids 1.999999999 artifacts", () => {
      expect(roundTo(1.9999999999997, 2)).toBe(2);
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });

    test("smartRound handles tiny values", () => {
      expect(smartRound(0.00001)).toBeCloseTo(0.00001, 10);
    });

    test("smartRound handles large values", () => {
      expect(smartRound(4000.123456)).toBeCloseTo(4000.12, 2);
    });

    test("Stable R output across magnitude scales", () => {
      // Same 1:2 ratio at 3 different price scales
      const small = analyzeRiskReward(makeInputs({ entry: 1.1, stop: 1.095, target: 1.11 }));
      const mid = analyzeRiskReward(makeInputs({ entry: 100, stop: 95, target: 110 }));
      const large = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4020 }));
      expect(small.rMultiple).toBeCloseTo(2, 6);
      expect(mid.rMultiple).toBeCloseTo(2, 8);
      expect(large.rMultiple).toBeCloseTo(2, 8);
    });
  });

  // ============================================================
  // HELPERS
  // ============================================================
  describe("Helper functions", () => {
    test("getIncrementSize: all modes", () => {
      expect(getIncrementSize("GENERIC", undefined)).toBeNull();
      expect(getIncrementSize("XAUUSD_001", undefined)).toBe(0.01);
      expect(getIncrementSize("XAUUSD_010", undefined)).toBe(0.10);
      expect(getIncrementSize("FOREX_STANDARD", undefined)).toBe(0.0001);
      expect(getIncrementSize("FOREX_JPY", undefined)).toBe(0.01);
      expect(getIncrementSize("CUSTOM", 0.5)).toBe(0.5);
      expect(getIncrementSize("CUSTOM", 0)).toBeNull();
      expect(getIncrementSize("CUSTOM", undefined)).toBeNull();
    });

    test("convertDistanceToIncrementUnits", () => {
      expect(convertDistanceToIncrementUnits(10, 0.01)).toBe(1000);
      expect(convertDistanceToIncrementUnits(10, 0.10)).toBe(100);
      expect(convertDistanceToIncrementUnits(10, null)).toBeNull();
    });

    test("R_PRESETS contains 1, 1.5, 2, 2.5, 3, 4, 5", () => {
      expect(R_PRESETS).toEqual([1, 1.5, 2, 2.5, 3, 4, 5]);
    });

    test("computeDistances returns error for invalid LONG geometry", () => {
      const r = computeDistances("LONG", 100, 105, 110);
      expect("error" in r).toBe(true);
    });

    test("calculateTargetFromR rejects non-positive R", () => {
      const r = calculateTargetFromR("LONG", 100, 95, 0);
      expect("error" in r).toBe(true);
    });

    test("calculateStopFromR rejects non-positive R", () => {
      const r = calculateStopFromR("LONG", 100, 110, -1);
      expect("error" in r).toBe(true);
    });

    test("calculateMultiTargetPlan rejects 0 targets", () => {
      const r = calculateMultiTargetPlan("LONG", 100, 95, []);
      expect("error" in r).toBe(true);
    });

    test("calculateMultiTargetPlan rejects 5 targets", () => {
      const r = calculateMultiTargetPlan("LONG", 100, 95, [
        { targetPrice: 101, allocationPercent: 20 },
        { targetPrice: 102, allocationPercent: 20 },
        { targetPrice: 103, allocationPercent: 20 },
        { targetPrice: 104, allocationPercent: 20 },
        { targetPrice: 105, allocationPercent: 20 },
      ]);
      expect("error" in r).toBe(true);
    });
  });

  // ============================================================
  // RISK AMOUNT
  // ============================================================
  describe("Risk Amount → Potential Gross Reward", () => {
    test("Risk 100 + 2R → gross reward 200", () => {
      const r = analyzeRiskReward(makeInputs({ riskAmount: 100 }));
      expect(r.valid).toBe(true);
      expect(r.potentialGrossReward).toBe(200);
    });
    test("Risk 0 → gross reward 0", () => {
      const r = analyzeRiskReward(makeInputs({ riskAmount: 0 }));
      expect(r.valid).toBe(true);
      expect(r.potentialGrossReward).toBe(0);
    });
    test("No risk amount → null", () => {
      const r = analyzeRiskReward(makeInputs({ riskAmount: null }));
      expect(r.valid).toBe(true);
      expect(r.potentialGrossReward).toBeNull();
    });
  });

  // ============================================================
  // PRICE-DISTANCE PERCENTAGES
  // ============================================================
  describe("Price-distance percentages", () => {
    test("LONG entry 4000, stop 3990 → risk % = 0.25%", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 4000, stop: 3990, target: 4020 }));
      expect(r.riskPercentFromEntry).toBeCloseTo(0.25, 5);
      expect(r.rewardPercentFromEntry).toBeCloseTo(0.5, 5);
    });
    test("Percentages are price-distance, not account risk", () => {
      const r = analyzeRiskReward(makeInputs({ entry: 100, stop: 95, target: 110 }));
      // risk 5/100 = 5%, reward 10/100 = 10%
      expect(r.riskPercentFromEntry).toBeCloseTo(5, 5);
      expect(r.rewardPercentFromEntry).toBeCloseTo(10, 5);
    });
  });
});
