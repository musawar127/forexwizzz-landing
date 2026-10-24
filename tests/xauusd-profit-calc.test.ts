import { describe, test, expect } from "bun:test";
import {
  calculateProfit,
  validateProfitInputs,
  calculateExposure,
  calculateGrossPnL,
  calculatePriceMovement,
  calculateTradingCosts,
  calculateNetPnL,
  calculateBreakEvenExit,
  calculateRequiredExitPrice,
  calculatePartialClosePnL,
  buildGoldMoveTable,
  calculateMoveValue,
  calculateIncrementMetrics,
  getIncrementSize,
  roundTo,
  smartRound,
  GOLD_MOVE_PRESETS,
  DEFAULT_INPUTS,
  STATIC_MOVE_TABLE,
  type ProfitInputs,
  type Direction,
  type AllocationMode,
} from "../src/lib/xauusd-profit-calc";

function makeInputs(overrides: Partial<ProfitInputs> = {}): ProfitInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("XAUUSD Profit Calculator — Gold P&L", () => {

  // ============================================================
  // BUY PROFIT TESTS
  // ============================================================
  describe("BUY Profit", () => {
    test("4000→4020, 0.10 lot, 100 contract → +$200 (default example)", () => {
      const r = calculateProfit(makeInputs());
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBe(200);
      expect(r.grossPnLAccount).toBe(200);
      expect(r.netPnLAccount).toBe(200);
    });
    test("4000→3990, 0.10 lot → −$100 (loss)", () => {
      const r = calculateProfit(makeInputs({ entry: 4000, exit: 3990 }));
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBe(-100);
    });
    test("Zero movement (entry=exit) → 0 P&L", () => {
      const r = calculateProfit(makeInputs({ entry: 4000, exit: 4000 }));
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBe(0);
    });
    test("0.01 lot, 4000→4020 → +$20", () => {
      const r = calculateProfit(makeInputs({ lots: 0.01 }));
      expect(r.grossPnLUSD).toBe(20);
    });
    test("1.00 lot, 4000→4020 → +$2000", () => {
      const r = calculateProfit(makeInputs({ lots: 1.0 }));
      expect(r.grossPnLUSD).toBe(2000);
    });
    test("Custom contract size 10 oz: 0.10 lot, 4000→4020 → +$20", () => {
      const r = calculateProfit(makeInputs({ contractSize: 10 }));
      expect(r.grossPnLUSD).toBe(20);
    });
    test("Decimal prices: 4000.50→4020.50, 0.10 lot → +$200", () => {
      const r = calculateProfit(makeInputs({ entry: 4000.5, exit: 4020.5 }));
      expect(r.grossPnLUSD).toBe(200);
    });
  });

  // ============================================================
  // SELL PROFIT TESTS
  // ============================================================
  describe("SELL Profit", () => {
    test("4020→4000, 0.10 lot, 100 contract → +$200", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4020, exit: 4000 }));
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBe(200);
    });
    test("4000→4020 SELL → −$200 (loss)", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4000, exit: 4020 }));
      expect(r.grossPnLUSD).toBe(-200);
    });
    test("Zero move SELL → 0", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4000, exit: 4000 }));
      expect(Object.is(r.grossPnLUSD, -0) || r.grossPnLUSD === 0).toBe(true);
    });
    test("Custom lots SELL: 0.50 lot, 4020→4000 → +$1000", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4020, exit: 4000, lots: 0.5 }));
      expect(r.grossPnLUSD).toBe(1000);
    });
    test("Custom contract SELL: 10 oz, 4020→4000, 0.10 → +$20", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4020, exit: 4000, contractSize: 10 }));
      expect(r.grossPnLUSD).toBe(20);
    });
  });

  // ============================================================
  // MOVE VALUE TESTS
  // ============================================================
  describe("Move Value (Value per $1 Gold Move)", () => {
    test("0.01 lot, 100 oz → $1 per $1 move", () => {
      const r = calculateProfit(makeInputs({ lots: 0.01 }));
      expect(r.valuePerDollarMoveUSD).toBe(1);
    });
    test("0.10 lot, 100 oz → $10 per $1 move", () => {
      const r = calculateProfit(makeInputs({ lots: 0.10 }));
      expect(r.valuePerDollarMoveUSD).toBe(10);
    });
    test("1.00 lot, 100 oz → $100 per $1 move", () => {
      const r = calculateProfit(makeInputs({ lots: 1.0 }));
      expect(r.valuePerDollarMoveUSD).toBe(100);
    });
    test("$10 move on 0.10 lot = $100", () => {
      const mv = calculateMoveValue(10, 0.10, 100, 1);
      expect(mv.favorableUSD).toBe(100);
    });
    test("$20 move on 1.00 lot = $2000", () => {
      const mv = calculateMoveValue(20, 1.0, 100, 1);
      expect(mv.favorableUSD).toBe(2000);
    });
    test("Static table values correct", () => {
      expect(STATIC_MOVE_TABLE[0].move1).toBe(1);
      expect(STATIC_MOVE_TABLE[1].move10).toBe(100);
      expect(STATIC_MOVE_TABLE[2].move20).toBe(2000);
    });
  });

  // ============================================================
  // ACCOUNT CURRENCY TESTS
  // ============================================================
  describe("Account Currency Conversion", () => {
    test("USD conversion 1 → P&L unchanged", () => {
      const r = calculateProfit(makeInputs({ conversionRate: 1 }));
      expect(r.grossPnLAccount).toBe(r.grossPnLUSD);
    });
    test("EUR conversion 0.92", () => {
      const r = calculateProfit(makeInputs({ accountCurrency: "EUR", conversionRate: 0.92 }));
      expect(r.grossPnLAccount).toBeCloseTo(200 * 0.92, 5);
    });
    test("GBP conversion 0.78", () => {
      const r = calculateProfit(makeInputs({ accountCurrency: "GBP", conversionRate: 0.78 }));
      expect(r.grossPnLAccount).toBeCloseTo(200 * 0.78, 5);
    });
    test("JPY conversion 150", () => {
      const r = calculateProfit(makeInputs({ accountCurrency: "JPY", conversionRate: 150 }));
      expect(r.grossPnLAccount).toBeCloseTo(200 * 150, 5);
    });
    test("PKR conversion 280", () => {
      const r = calculateProfit(makeInputs({ accountCurrency: "PKR", conversionRate: 280 }));
      expect(r.grossPnLAccount).toBeCloseTo(200 * 280, 5);
    });
    test("Value per $1 move in account currency", () => {
      const r = calculateProfit(makeInputs({ accountCurrency: "EUR", conversionRate: 0.92 }));
      expect(r.valuePerDollarMoveAccount).toBeCloseTo(10 * 0.92, 5);
    });
  });

  // ============================================================
  // COST TESTS
  // ============================================================
  describe("Trading Costs", () => {
    test("Commission per lot: 7/lot × 0.10 = $0.70", () => {
      const r = calculateProfit(makeInputs({ commissionPerLot: 7 }));
      expect(r.valid).toBe(true);
      expect(r.costs!.commissionCost).toBeCloseTo(0.7, 5);
      expect(r.netPnLAccount).toBeCloseTo(200 - 0.7, 5);
    });
    test("Swap cost flat: $5", () => {
      const r = calculateProfit(makeInputs({ swapCost: 5 }));
      expect(r.costs!.swapCost).toBe(5);
      expect(r.netPnLAccount).toBeCloseTo(195, 5);
    });
    test("Other fees: $2", () => {
      const r = calculateProfit(makeInputs({ otherFees: 2 }));
      expect(r.costs!.otherFees).toBe(2);
      expect(r.netPnLAccount).toBeCloseTo(198, 5);
    });
    test("Combined costs: commission + swap + other", () => {
      const r = calculateProfit(makeInputs({ commissionPerLot: 7, swapCost: 5, otherFees: 2 }));
      expect(r.costs!.totalCosts).toBeCloseTo(0.7 + 5 + 2, 5);
      expect(r.netPnLAccount).toBeCloseTo(200 - 7.7, 5);
    });
    test("Zero costs → net = gross", () => {
      const r = calculateProfit(makeInputs({ commissionPerLot: 0, swapCost: 0, otherFees: 0 }));
      expect(r.netPnLAccount).toBe(r.grossPnLAccount);
    });
    test("Gross positive / net negative due to costs", () => {
      const r = calculateProfit(makeInputs({ entry: 4000, exit: 4001, lots: 0.10, swapCost: 50 }));
      // gross = $10, costs = $50 → net = −$40
      expect(r.grossPnLAccount).toBe(10);
      expect(r.netPnLAccount).toBe(-40);
    });
    test("Gross zero / net negative due to costs", () => {
      const r = calculateProfit(makeInputs({ entry: 4000, exit: 4000, swapCost: 5 }));
      expect(r.grossPnLAccount).toBe(0);
      expect(r.netPnLAccount).toBe(-5);
    });
  });

  // ============================================================
  // BREAK-EVEN TESTS
  // ============================================================
  describe("Break-Even Exit Price", () => {
    test("Zero costs → BE = entry", () => {
      const r = calculateProfit(makeInputs({ commissionPerLot: 0, swapCost: 0, otherFees: 0 }));
      expect(r.breakEvenExit).toBe(4000);
    });
    test("BUY with costs → BE > entry", () => {
      // costs $10, exposure 10 oz → costPriceDistance = $1 → BE = 4001
      const r = calculateProfit(makeInputs({ direction: "BUY", swapCost: 10 }));
      expect(r.breakEvenExit).toBeCloseTo(4001, 5);
    });
    test("SELL with costs → BE < entry", () => {
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 4020, exit: 4000, swapCost: 10 }));
      expect(r.breakEvenExit).toBeCloseTo(4019, 5);
    });
    test("Conversion rate behavior: EUR costs", () => {
      // costs 9.2 EUR = 10 USD, exposure 10 oz → $1 → BE = 4001
      const r = calculateProfit(makeInputs({ direction: "BUY", accountCurrency: "EUR", conversionRate: 0.92, swapCost: 9.2 }));
      expect(r.breakEvenExit).toBeCloseTo(4001, 3);
    });
    test("Custom contract size break-even", () => {
      // contract 10 oz, 0.10 lot → exposure 1 oz. costs $10 → $10/oz → BE = 4010
      const r = calculateProfit(makeInputs({ contractSize: 10, swapCost: 10 }));
      expect(r.breakEvenExit).toBeCloseTo(4010, 5);
    });
    test("Very small lot break-even", () => {
      // 0.01 lot, 100 oz → 1 oz. costs $1 → $1/oz → BE = 4001
      const r = calculateProfit(makeInputs({ lots: 0.01, swapCost: 1 }));
      expect(r.breakEvenExit).toBeCloseTo(4001, 5);
    });
    test("Impossible non-positive SELL break-even", () => {
      // entry 5, huge costs → BE would be negative
      const r = calculateProfit(makeInputs({ direction: "SELL", entry: 5, exit: 4, lots: 1.0, swapCost: 10000 }));
      expect(r.breakEvenExit).toBeNull();
      expect(r.breakEvenMessage).toContain("No positive break-even");
    });
  });

  // ============================================================
  // FIND EXIT TESTS
  // ============================================================
  describe("Find Exit Price", () => {
    test("BUY desired profit $200, 0 costs → exit = 4020", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", desiredNetProfit: 200, commissionPerLot: 0, swapCost: 0, otherFees: 0 }));
      expect(r.valid).toBe(true);
      expect(r.requiredExit).toBeCloseTo(4020, 5);
    });
    test("SELL desired profit $200 → exit = 3980", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", direction: "SELL", entry: 4000, desiredNetProfit: 200 }));
      expect(r.requiredExit).toBeCloseTo(3980, 5);
    });
    test("Costs included: desired $200, costs $10 → required gross $210", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", desiredNetProfit: 200, swapCost: 10 }));
      expect(r.requiredGrossProfitAccount).toBeCloseTo(210, 5);
      // required price move = 210 / 10 oz = $21 → exit = 4021
      expect(r.requiredExit).toBeCloseTo(4021, 5);
    });
    test("Non-USD account currency", () => {
      // desired 184 EUR, conversion 0.92 → 200 USD gross, 0 costs → exit 4020
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", accountCurrency: "EUR", conversionRate: 0.92, desiredNetProfit: 184 }));
      expect(r.requiredExit).toBeCloseTo(4020, 3);
    });
    test("Custom contract: 10 oz, 0.10 lot, desired $200 → move $200 → exit 4200", () => {
      // exposure = 0.10 × 10 = 1 oz; desired $200 → $200/1oz = $200 move → exit 4200
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", contractSize: 10, desiredNetProfit: 200 }));
      expect(r.requiredExit).toBeCloseTo(4200, 5);
    });
    test("0.01 lot desired $20 → move $20 → exit 4020", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", lots: 0.01, desiredNetProfit: 20 }));
      expect(r.requiredExit).toBeCloseTo(4020, 5);
    });
    test("0.10 lot desired $200 → exit 4020", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", lots: 0.10, desiredNetProfit: 200 }));
      expect(r.requiredExit).toBeCloseTo(4020, 5);
    });
    test("Large desired profit: $20000, 1 lot → move $200 → exit 4200", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", lots: 1.0, desiredNetProfit: 20000 }));
      expect(r.requiredExit).toBeCloseTo(4200, 5);
    });
    test("SELL required exit <=0 handled", () => {
      // entry 100, desired profit 20000, 0.01 lot → move = 20000/1 = $20000 → exit = 100-20000 < 0
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", direction: "SELL", entry: 100, lots: 0.01, desiredNetProfit: 20000 }));
      expect(r.requiredExit).toBeNull();
      expect(r.error).toContain("non-positive");
    });
  });

  // ============================================================
  // PARTIAL CLOSE TESTS
  // ============================================================
  describe("Partial Close", () => {
    test("Single exit 100% allocation", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE",
        partialExits: [{ exitPrice: 4020, allocation: 100 }],
        allocationMode: "PERCENTAGE",
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.closedLots).toBeCloseTo(0.10, 6);
      expect(r.partial!.remainingOpenLots).toBeCloseTo(0, 6);
      expect(r.partial!.percentageClosed).toBeCloseTo(100, 5);
      expect(r.partial!.totalRealizedGrossUSD).toBeCloseTo(200, 5);
    });
    test("Two exits 50/50", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE",
        partialExits: [
          { exitPrice: 4010, allocation: 50 },
          { exitPrice: 4020, allocation: 50 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.exits[0].grossPnLUSD).toBeCloseTo(50, 5); // 0.05 lot × $10 × 100 = $50
      expect(r.partial!.exits[1].grossPnLUSD).toBeCloseTo(100, 5); // 0.05 lot × $20 × 100 = $100
      expect(r.partial!.totalRealizedGrossUSD).toBeCloseTo(150, 5);
    });
    test("Three exits", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 4010, allocation: 33 },
          { exitPrice: 4020, allocation: 33 },
          { exitPrice: 4030, allocation: 34 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.exits.length).toBe(3);
    });
    test("Four exits", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 4005, allocation: 25 },
          { exitPrice: 4010, allocation: 25 },
          { exitPrice: 4020, allocation: 25 },
          { exitPrice: 4040, allocation: 25 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.exits.length).toBe(4);
    });
    test("25/25/50 allocations", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 4010, allocation: 25 },
          { exitPrice: 4020, allocation: 25 },
          { exitPrice: 4030, allocation: 50 },
        ],
      }));
      expect(r.partial!.closedLots).toBeCloseTo(1.0, 6);
    });
    test("Partial <100% → remaining open lots", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [{ exitPrice: 4010, allocation: 30 }],
      }));
      expect(r.partial!.remainingOpenLots).toBeCloseTo(0.7, 6);
      expect(r.partial!.percentageClosed).toBeCloseTo(30, 5);
    });
    test("Lot mode allocation", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0, allocationMode: "LOTS",
        partialExits: [
          { exitPrice: 4010, allocation: 0.3 },
          { exitPrice: 4020, allocation: 0.3 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.closedLots).toBeCloseTo(0.6, 6);
      expect(r.partial!.remainingOpenLots).toBeCloseTo(0.4, 6);
    });
    test("Weighted average exit", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 4010, allocation: 50 },
          { exitPrice: 4030, allocation: 50 },
        ],
      }));
      expect(r.partial!.weightedAverageExit).toBeCloseTo(4020, 5);
    });
    test("Mixed profitable/loss exits (BUY)", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 3990, allocation: 50 }, // loss
          { exitPrice: 4020, allocation: 50 }, // profit
        ],
      }));
      expect(r.partial!.exits[0].grossPnLUSD).toBe(-500); // 0.5 × (-10) × 100
      expect(r.partial!.exits[1].grossPnLUSD).toBe(1000); // 0.5 × 20 × 100
      expect(r.partial!.totalRealizedGrossUSD).toBe(500);
    });
    test("SELL partials", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", direction: "SELL", entry: 4020, lots: 1.0,
        partialExits: [
          { exitPrice: 4010, allocation: 50 },
          { exitPrice: 4000, allocation: 50 },
        ],
      }));
      expect(r.partial!.exits[0].grossPnLUSD).toBe(500);
      expect(r.partial!.exits[1].grossPnLUSD).toBe(1000);
    });
    test("Commission based on closed lots only", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0, commissionPerLot: 7,
        partialExits: [{ exitPrice: 4020, allocation: 50 }],
      }));
      // commission = 7 × 0.5 = 3.5
      expect(r.partial!.commission).toBeCloseTo(3.5, 5);
    });
    test("Total allocation >100% → error", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE",
        partialExits: [
          { exitPrice: 4010, allocation: 60 },
          { exitPrice: 4020, allocation: 50 },
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("100%");
    });
    test("Sum closed lots > total → error", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 0.5, allocationMode: "LOTS",
        partialExits: [
          { exitPrice: 4010, allocation: 0.3 },
          { exitPrice: 4020, allocation: 0.3 },
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("exceeds total");
    });
    test("Zero allocation across all exits → error", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE",
        partialExits: [
          { exitPrice: 4010, allocation: 0 },
          { exitPrice: 4020, allocation: 0 },
        ],
      }));
      expect(r.valid).toBe(false);
      expect(r.error).toContain("positive allocation");
    });
    test("More than 4 exits → error", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE",
        partialExits: [
          { exitPrice: 4005, allocation: 20 },
          { exitPrice: 4010, allocation: 20 },
          { exitPrice: 4015, allocation: 20 },
          { exitPrice: 4020, allocation: 20 },
          { exitPrice: 4025, allocation: 20 },
        ],
      }));
      expect(r.valid).toBe(false);
    });
  });

  // ============================================================
  // GOLD MOVE TABLE TESTS
  // ============================================================
  describe("Gold Move Table", () => {
    test("Default presets present", () => {
      const table = buildGoldMoveTable(0.10, 100, 1);
      expect(table.length).toBe(7);
      expect(table.map((r) => r.move)).toEqual([0.5, 1, 2, 5, 10, 20, 50]);
    });
    test("$1 move on 0.10 lot = $10 favorable, −$10 adverse", () => {
      const table = buildGoldMoveTable(0.10, 100, 1);
      const row1 = table.find((r) => r.move === 1)!;
      expect(row1.favorableUSD).toBe(10);
      expect(row1.adverseUSD).toBe(-10);
    });
    test("$10 move on 1.00 lot = $1000", () => {
      const table = buildGoldMoveTable(1.0, 100, 1);
      const row10 = table.find((r) => r.move === 10)!;
      expect(row10.favorableUSD).toBe(1000);
    });
    test("Account currency conversion in table", () => {
      const table = buildGoldMoveTable(0.10, 100, 0.92);
      const row1 = table.find((r) => r.move === 1)!;
      expect(row1.favorableAccount).toBeCloseTo(9.2, 5);
    });
    test("Custom move added and sorted", () => {
      const table = buildGoldMoveTable(0.10, 100, 1, 15);
      expect(table.length).toBe(8);
      expect(table.map((r) => r.move)).toContain(15);
      const moves = table.map((r) => r.move);
      for (let i = 1; i < moves.length; i++) expect(moves[i]).toBeGreaterThan(moves[i - 1]);
    });
    test("GOLD_MOVE_PRESETS correct", () => {
      expect(GOLD_MOVE_PRESETS).toEqual([0.5, 1, 2, 5, 10, 20, 50]);
    });
  });

  // ============================================================
  // INCREMENT TESTS
  // ============================================================
  describe("Increment / Pip Convention", () => {
    test("$0.01 increment: $20 move → 2000 increments", () => {
      const r = calculateProfit(makeInputs({ incrementConvention: "INC_001" }));
      expect(r.increment!.incrementSize).toBe(0.01);
      expect(r.increment!.incrementCount).toBeCloseTo(2000, 5);
    });
    test("$0.10 increment: $20 move → 200 increments", () => {
      const r = calculateProfit(makeInputs({ incrementConvention: "INC_010" }));
      expect(r.increment!.incrementSize).toBe(0.10);
      expect(r.increment!.incrementCount).toBeCloseTo(200, 5);
    });
    test("Custom increment 0.05: $20 move → 400 increments", () => {
      const r = calculateProfit(makeInputs({ incrementConvention: "CUSTOM", customIncrement: 0.05 }));
      expect(r.increment!.incrementCount).toBeCloseTo(400, 5);
    });
    test("Value per increment USD", () => {
      // 0.10 lot, 100 oz, $0.01 increment → 0.01 × 0.10 × 100 = $0.10
      const r = calculateProfit(makeInputs({ incrementConvention: "INC_001" }));
      expect(r.increment!.valuePerIncrementUSD).toBeCloseTo(0.1, 5);
    });
    test("Core P&L identical regardless of increment convention", () => {
      const r1 = calculateProfit(makeInputs({ incrementConvention: "INC_001" }));
      const r2 = calculateProfit(makeInputs({ incrementConvention: "INC_010" }));
      const r3 = calculateProfit(makeInputs({ incrementConvention: "CUSTOM", customIncrement: 0.05 }));
      expect(r1.grossPnLUSD).toBe(200);
      expect(r2.grossPnLUSD).toBe(200);
      expect(r3.grossPnLUSD).toBe(200);
    });
  });

  // ============================================================
  // VALIDATION TESTS
  // ============================================================
  describe("Validation", () => {
    test("NaN entry → invalid", () => {
      const r = calculateProfit(makeInputs({ entry: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Infinity entry → invalid", () => {
      const r = calculateProfit(makeInputs({ entry: Infinity }));
      expect(r.valid).toBe(false);
    });
    test("Zero entry → invalid", () => {
      const r = calculateProfit(makeInputs({ entry: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative entry → invalid", () => {
      const r = calculateProfit(makeInputs({ entry: -4000 }));
      expect(r.valid).toBe(false);
    });
    test("Zero exit → invalid", () => {
      const r = calculateProfit(makeInputs({ exit: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative exit → invalid", () => {
      const r = calculateProfit(makeInputs({ exit: -10 }));
      expect(r.valid).toBe(false);
    });
    test("Zero lots → invalid", () => {
      const r = calculateProfit(makeInputs({ lots: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative lots → invalid", () => {
      const r = calculateProfit(makeInputs({ lots: -0.1 }));
      expect(r.valid).toBe(false);
    });
    test("Zero contract size → invalid", () => {
      const r = calculateProfit(makeInputs({ contractSize: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Zero conversion → invalid", () => {
      const r = calculateProfit(makeInputs({ conversionRate: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative commission → invalid", () => {
      const r = calculateProfit(makeInputs({ commissionPerLot: -1 }));
      expect(r.valid).toBe(false);
    });
    test("Negative swap → invalid", () => {
      const r = calculateProfit(makeInputs({ swapCost: -5 }));
      expect(r.valid).toBe(false);
    });
    test("Negative other fees → invalid", () => {
      const r = calculateProfit(makeInputs({ otherFees: -2 }));
      expect(r.valid).toBe(false);
    });
    test("Desired profit <=0 → invalid (FIND_EXIT)", () => {
      const r = calculateProfit(makeInputs({ mode: "FIND_EXIT", desiredNetProfit: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Account balance <=0 when entered → invalid", () => {
      const r = calculateProfit(makeInputs({ accountBalance: -100 }));
      expect(r.valid).toBe(false);
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-Point Safety", () => {
    test("roundTo avoids 199.999999 artifacts", () => {
      expect(roundTo(199.99999999997, 2)).toBe(200);
    });
    test("0.1 + 0.2 style artifact", () => {
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });
    test("0.001 lot handled", () => {
      const r = calculateProfit(makeInputs({ lots: 0.001 }));
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBeCloseTo(2, 8); // 0.001×100×20
    });
    test("Fractional allocations", () => {
      const r = calculateProfit(makeInputs({
        mode: "PARTIAL_CLOSE", lots: 1.0,
        partialExits: [
          { exitPrice: 4010, allocation: 33.33 },
          { exitPrice: 4020, allocation: 66.67 },
        ],
      }));
      expect(r.valid).toBe(true);
      expect(r.partial!.closedLots).toBeCloseTo(1.0, 4);
    });
    test("Fractional contract size", () => {
      const r = calculateProfit(makeInputs({ contractSize: 0.5 }));
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBeCloseTo(1, 8); // 0.10×0.5×20
    });
    test("Large prices", () => {
      const r = calculateProfit(makeInputs({ entry: 50000, exit: 50020 }));
      expect(r.grossPnLUSD).toBe(200);
    });
    test("Large conversion rate", () => {
      const r = calculateProfit(makeInputs({ conversionRate: 100000 }));
      expect(r.grossPnLAccount).toBe(20000000);
    });
  });

  // ============================================================
  // PRICE MOVEMENT TESTS
  // ============================================================
  describe("Price Movement", () => {
    test("BUY 4000→4020: raw +20, directional +20, abs 20", () => {
      const pm = calculatePriceMovement("BUY", 4000, 4020);
      expect(pm.rawChange).toBe(20);
      expect(pm.directionalMovement).toBe(20);
      expect(pm.absoluteDistance).toBe(20);
      expect(pm.priceDistancePercent).toBeCloseTo(0.5, 5);
    });
    test("SELL 4020→4000: raw −20, directional +20", () => {
      const pm = calculatePriceMovement("SELL", 4020, 4000);
      expect(pm.rawChange).toBe(-20);
      expect(pm.directionalMovement).toBe(20);
    });
    test("Price movement % labeled correctly", () => {
      const r = calculateProfit(makeInputs({ entry: 4000, exit: 4040 }));
      expect(r.priceDistancePercent).toBeCloseTo(1.0, 5); // 40/4000
    });
  });

  // ============================================================
  // ACCOUNT BALANCE %
  // ============================================================
  describe("Account Balance Percentage", () => {
    test("P/L as % of balance", () => {
      const r = calculateProfit(makeInputs({ accountBalance: 2000 }));
      // net 200 / 2000 × 100 = 10%
      expect(r.pnlPercentOfBalance).toBeCloseTo(10, 5);
    });
    test("No balance → null", () => {
      const r = calculateProfit(makeInputs({ accountBalance: null }));
      expect(r.pnlPercentOfBalance).toBeNull();
    });
  });

  // ============================================================
  // INTEGRATION
  // ============================================================
  describe("Integration", () => {
    test("Default inputs produce +$200", () => {
      const r = calculateProfit(DEFAULT_INPUTS);
      expect(r.valid).toBe(true);
      expect(r.grossPnLUSD).toBe(200);
      expect(r.exposureOunces).toBe(10);
      expect(r.valuePerDollarMoveUSD).toBe(10);
    });
    test("GOLD_MOVE mode returns table", () => {
      const r = calculateProfit(makeInputs({ mode: "GOLD_MOVE" }));
      expect(r.valid).toBe(true);
      expect(r.goldMoveTable).toBeDefined();
      expect(r.goldMoveTable!.length).toBe(7);
    });
  });
});
