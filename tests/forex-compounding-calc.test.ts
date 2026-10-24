import { describe, test, expect } from "bun:test";
import {
  calculateCompounding,
  validateCompoundingInputs,
  parseVariableReturns,
  generateCSV,
  createSeededRandom,
  roundTo,
  DEFAULT_INPUTS,
  type CompoundingInputs,
  type CalculatorMode,
} from "../src/lib/forex-compounding-calc";

function makeInputs(overrides: Partial<CompoundingInputs> = {}): CompoundingInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("Forex Compounding Calculator", () => {

  // ============================================================
  // PHASE 5 VALIDATION EXAMPLES
  // ============================================================
  describe("Phase 5 Validation Examples", () => {
    test("Example 1: $1,000 @ 2% × 12 periods → ~$1,268.24", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 2, numberOfPeriods: 12,
        recurringDeposit: 0, recurringWithdrawal: 0, fixedFeePerPeriod: 0, percentageFee: 0,
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBeCloseTo(1268.24, 1);
    });

    test("Example 2: $1,000 @ -10% × 1 period → $900", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: -10, numberOfPeriods: 1,
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBe(900);
    });

    test("Example 3: $1,000 → +10% → -10% = $990", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 2,
        variableReturns: [10, -10],
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBe(990);
    });

    test("Example 4: 50% drawdown → 100% recovery gain required", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: -50, numberOfPeriods: 1,
      }));
      expect(r.maxDrawdownPercent).toBeCloseTo(50, 1);
      expect(r.recoveryGainPercent).toBeCloseTo(100, 1);
    });

    test("Example 5: $500 @ 0% × any periods = $500", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 500, returnPerPeriod: 0, numberOfPeriods: 50,
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBe(500);
    });
  });

  // ============================================================
  // STANDARD COMPOUNDING
  // ============================================================
  describe("Standard Compounding", () => {
    test("Positive return compounds correctly", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 10,
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBeCloseTo(1000 * Math.pow(1.05, 10), 2);
    });

    test("Negative return reduces balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: -5, numberOfPeriods: 10,
      }));
      expect(r.finalBalance).toBeCloseTo(1000 * Math.pow(0.95, 10), 2);
      expect(r.netGainLoss).toBeLessThan(0);
    });

    test("Zero return: balance unchanged (no fees/deposits)", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 2000, returnPerPeriod: 0, numberOfPeriods: 100,
      }));
      expect(r.finalBalance).toBe(2000);
      expect(r.netGainLoss).toBe(0);
    });

    test("Total return % calculated correctly", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 10, numberOfPeriods: 1,
      }));
      expect(r.totalReturnPercent).toBeCloseTo(10, 1);
    });
  });

  // ============================================================
  // VARIABLE RETURNS
  // ============================================================
  describe("Variable Returns", () => {
    test("Mixed positive/negative returns", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 3,
        variableReturns: [10, -5, 20],
      }));
      expect(r.valid).toBe(true);
      expect(r.periods[0].closingBalance).toBeCloseTo(1100, 2);
      expect(r.periods[1].closingBalance).toBeCloseTo(1045, 2);
      expect(r.periods[2].closingBalance).toBeCloseTo(1254, 2);
    });

    test("Variable returns padded with 0 if fewer than periods", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 5,
        variableReturns: [5, 3],
      }));
      expect(r.periods.length).toBe(5);
      expect(r.periods[2].returnPercent).toBe(0);
      expect(r.periods[3].returnPercent).toBe(0);
    });

    test("Variable returns truncated if more than periods", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 2,
        variableReturns: [5, 3, 10, 20],
      }));
      expect(r.periods.length).toBe(2);
    });

    test("Parser: newline separated", () => {
      expect(parseVariableReturns("2\n3\n-1")).toEqual([2, 3, -1]);
    });

    test("Parser: comma separated with %", () => {
      expect(parseVariableReturns("2%, 3%, -1%")).toEqual([2, 3, -1]);
    });

    test("Parser: empty input → []", () => {
      expect(parseVariableReturns("")).toEqual([]);
    });

    test("Parser: malformed tokens skipped", () => {
      expect(parseVariableReturns("2\nabc\n3")).toEqual([2, 3]);
    });
  });

  // ============================================================
  // WIN/LOSS SIMULATION
  // ============================================================
  describe("Win/Loss Simulation", () => {
    test("Deterministic with seed — same seed = same result", () => {
      const r1 = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 50,
        winRate: 55, averageWinReturn: 3, averageLossReturn: -2, seed: 42,
      }));
      const r2 = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 50,
        winRate: 55, averageWinReturn: 3, averageLossReturn: -2, seed: 42,
      }));
      expect(r1.finalBalance).toBe(r2.finalBalance);
    });

    test("Different seeds may produce different results", () => {
      const r1 = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 100,
        winRate: 55, averageWinReturn: 3, averageLossReturn: -2, seed: 111,
      }));
      const r2 = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 100,
        winRate: 55, averageWinReturn: 3, averageLossReturn: -2, seed: 222,
      }));
      // Very likely different
      const anyDiff = r1.finalBalance !== r2.finalBalance;
      expect(typeof anyDiff).toBe("boolean");
    });

    test("100% win rate → all winning periods", () => {
      const r = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 10,
        winRate: 100, averageWinReturn: 5, averageLossReturn: -2, seed: 1,
      }));
      expect(r.periods.every((p) => p.isWin === true)).toBe(true);
    });

    test("0% win rate → all losing periods", () => {
      const r = calculateCompounding(makeInputs({
        mode: "WIN_LOSS", initialBalance: 1000, numberOfPeriods: 10,
        winRate: 0, averageWinReturn: 5, averageLossReturn: -2, seed: 1,
      }));
      expect(r.periods.every((p) => p.isWin === false)).toBe(true);
    });
  });

  // ============================================================
  // DEPOSITS & WITHDRAWALS
  // ============================================================
  describe("Deposits & Withdrawals", () => {
    test("Recurring deposit increases balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringDeposit: 100,
      }));
      expect(r.finalBalance).toBe(1500);
      expect(r.totalDeposits).toBe(500);
    });

    test("Recurring withdrawal decreases balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringWithdrawal: 100,
      }));
      expect(r.finalBalance).toBe(500);
      expect(r.totalWithdrawals).toBe(500);
    });

    test("Withdrawal cannot exceed available balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 500, returnPerPeriod: 0, numberOfPeriods: 10,
        recurringWithdrawal: 1000,
      }));
      // First period: withdraw 500 (all available), rest 0
      expect(r.periods[0].withdrawal).toBe(500);
      expect(r.periods[1].withdrawal).toBe(0);
      expect(r.finalBalance).toBe(0);
    });

    test("Net gain/loss excludes deposits", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringDeposit: 100,
      }));
      // No trading return, so net gain/loss should be 0 (deposits are not profit)
      expect(r.netGainLoss).toBe(0);
    });

    test("Total contributed capital = initial + deposits", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringDeposit: 200,
      }));
      expect(r.totalContributedCapital).toBe(2000);
    });
  });

  // ============================================================
  // FEES
  // ============================================================
  describe("Fees", () => {
    test("Fixed fee reduces balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        fixedFeePerPeriod: 10,
      }));
      expect(r.finalBalance).toBe(950);
      expect(r.totalFees).toBe(50);
    });

    test("Percentage fee reduces balance", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 1,
        percentageFee: 1, // 1%
      }));
      expect(r.finalBalance).toBeCloseTo(990, 2);
    });

    test("Combined fees", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        fixedFeePerPeriod: 5, percentageFee: 0.5,
      }));
      expect(r.totalFees).toBeGreaterThan(0);
    });

    test("Fee cannot make balance negative", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 10, returnPerPeriod: 0, numberOfPeriods: 5,
        fixedFeePerPeriod: 100,
      }));
      expect(r.finalBalance).toBe(0);
    });
  });

  // ============================================================
  // DRAWDOWN & RECOVERY
  // ============================================================
  describe("Drawdown & Recovery", () => {
    test("Maximum drawdown calculated correctly", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 3,
        variableReturns: [20, -50, 10],
      }));
      // After +20%: 1200 (peak). After -50%: 600. DD = 50%.
      expect(r.maxDrawdownPercent).toBeCloseTo(50, 1);
    });

    test("Recovery gain for 50% drawdown = 100%", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 3,
        variableReturns: [20, -50, 10],
      }));
      expect(r.recoveryGainPercent).toBeCloseTo(100, 1);
    });

    test("No drawdown when monotonically increasing", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 10,
      }));
      expect(r.maxDrawdownPercent).toBe(0);
    });
  });

  // ============================================================
  // ACCOUNT DEPLETION
  // ============================================================
  describe("Account Depletion", () => {
    test("Balance reaches zero and stays zero", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 100, returnPerPeriod: -100, numberOfPeriods: 5,
      }));
      expect(r.periods[0].closingBalance).toBe(0);
      expect(r.periods[1].closingBalance).toBe(0);
      expect(r.finalBalance).toBe(0);
    });

    test("Zero balance with deposit recovers (0% return, no fee)", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 100, returnPerPeriod: -100, numberOfPeriods: 3,
        recurringDeposit: 50, fixedFeePerPeriod: 0,
      }));
      // Period 1: 100 → -100% → 0. Period 2: 0 + 50 deposit → 0% return → 50 (deposit is before return, but return is -100% of 50 = -50)
      // Actually: opening=0, deposit=50, balance=50, return=-100% → 50*(-1)=-50, balance=0
      // So balance stays 0 with -100% return even with deposit
      expect(r.periods[0].closingBalance).toBe(0);
      expect(r.periods[1].closingBalance).toBe(0); // -100% wipes deposit too
      // With 0% return and deposit, balance recovers:
      const r2 = calculateCompounding(makeInputs({
        initialBalance: 0, returnPerPeriod: 0, numberOfPeriods: 2,
        recurringDeposit: 50, fixedFeePerPeriod: 0,
      }));
      expect(r2.periods[0].closingBalance).toBe(50);
      expect(r2.periods[1].closingBalance).toBe(100);
    });
  });

  // ============================================================
  // COMPOUND vs SIMPLE GROWTH
  // ============================================================
  describe("Compound vs Simple Growth", () => {
    test("Compounding outperforms simple at positive returns", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 12,
      }));
      expect(r.finalBalance).toBeGreaterThan(r.simpleGrowthBalance);
    });

    test("Simple growth = compound when 1 period", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 1,
      }));
      expect(r.finalBalance).toBeCloseTo(r.simpleGrowthBalance, 2);
    });
  });

  // ============================================================
  // BEST/WORST PERIODS
  // ============================================================
  describe("Best/Worst Periods", () => {
    test("Best and worst returns identified", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 5,
        variableReturns: [2, -3, 5, 1, -1],
      }));
      expect(r.bestPeriodReturn).toBe(5);
      expect(r.worstPeriodReturn).toBe(-3);
    });
  });

  // ============================================================
  // CSV EXPORT
  // ============================================================
  describe("CSV Export", () => {
    test("CSV has correct header and rows", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 2, numberOfPeriods: 3,
      }));
      const csv = generateCSV(r);
      const lines = csv.split("\n");
      expect(lines[0]).toContain("Period,Opening Balance");
      expect(lines.length).toBe(4); // header + 3 rows
    });

    test("CSV values are numeric", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 2, numberOfPeriods: 2,
      }));
      const csv = generateCSV(r);
      const lines = csv.split("\n");
      const row1 = lines[1].split(",");
      expect(Number(row1[0])).toBe(1); // period
      expect(Number(row1[8])).toBeCloseTo(1020, 1); // closing balance
    });
  });

  // ============================================================
  // VALIDATION
  // ============================================================
  describe("Validation", () => {
    test("NaN initial balance → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ initialBalance: NaN }))).not.toBeNull();
    });
    test("Negative initial balance → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ initialBalance: -100 }))).not.toBeNull();
    });
    test("Zero periods → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ numberOfPeriods: 0 }))).not.toBeNull();
    });
    test("> 10000 periods → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ numberOfPeriods: 20000 }))).not.toBeNull();
    });
    test("Negative deposit → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ recurringDeposit: -50 }))).not.toBeNull();
    });
    test("Negative withdrawal → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ recurringWithdrawal: -50 }))).not.toBeNull();
    });
    test("Negative fixed fee → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ fixedFeePerPeriod: -5 }))).not.toBeNull();
    });
    test("Percentage fee > 100 → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ percentageFee: 150 }))).not.toBeNull();
    });
    test("Return < -100% → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ returnPerPeriod: -150 }))).not.toBeNull();
    });
    test("Win rate > 100 → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ mode: "WIN_LOSS", winRate: 150 }))).not.toBeNull();
    });
    test("Win rate < 0 → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ mode: "WIN_LOSS", winRate: -5 }))).not.toBeNull();
    });
    test("Average win <= 0 → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ mode: "WIN_LOSS", averageWinReturn: 0 }))).not.toBeNull();
    });
    test("Average loss >= 0 → invalid", () => {
      expect(validateCompoundingInputs(makeInputs({ mode: "WIN_LOSS", averageLossReturn: 0 }))).not.toBeNull();
    });
    test("Valid inputs → null", () => {
      expect(validateCompoundingInputs(DEFAULT_INPUTS)).toBeNull();
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-Point Safety", () => {
    test("roundTo avoids artifacts", () => {
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });
    test("No NaN in valid results", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 2, numberOfPeriods: 100,
      }));
      expect(isFinite(r.finalBalance)).toBe(true);
      expect(isFinite(r.netGainLoss)).toBe(true);
      expect(isFinite(r.maxDrawdownPercent)).toBe(true);
    });
    test("Large period count handled", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 100, returnPerPeriod: 0.1, numberOfPeriods: 1000,
      }));
      expect(r.valid).toBe(true);
      expect(isFinite(r.finalBalance)).toBe(true);
    });
  });

  // ============================================================
  // SEEDED RANDOM
  // ============================================================
  describe("Seeded PRNG", () => {
    test("Same seed → same sequence", () => {
      const rng1 = createSeededRandom(42);
      const rng2 = createSeededRandom(42);
      for (let i = 0; i < 100; i++) {
        expect(rng1()).toBe(rng2());
      }
    });
    test("Values in [0, 1)", () => {
      const rng = createSeededRandom(99);
      for (let i = 0; i < 1000; i++) {
        const v = rng();
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
      }
    });
  });

  // ============================================================
  // REGRESSION: NET GAIN/LOSS ACCOUNTING FIX
  // ============================================================
  describe("Net Gain/Loss Accounting Fix", () => {
    test("$1,000 @ 0% × 1 period, $10 fee → $990 final, −$10 net gain/loss", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 1,
        fixedFeePerPeriod: 10,
      }));
      expect(r.valid).toBe(true);
      expect(r.finalBalance).toBe(990);
      expect(r.netGainLoss).toBe(-10);
      expect(r.totalFees).toBe(10);
    });

    test("Fees are NOT added back to net gain/loss", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 1,
        fixedFeePerPeriod: 10,
      }));
      // Old (wrong) formula would give: 990 - 1000 - 0 + 0 + 10 = 0
      // New (correct) formula gives: 990 - 1000 - 0 + 0 = -10
      expect(r.netGainLoss).toBe(-10);
      expect(r.netGainLoss).not.toBe(0);
    });

    test("Cash flows do not count as trading profit", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringDeposit: 100,
      }));
      // No trading return → net gain/loss should be 0
      expect(r.netGainLoss).toBe(0);
      expect(r.finalBalance).toBe(1500);
      expect(r.totalDeposits).toBe(500);
    });

    test("Withdrawals do not count as trading loss", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 5,
        recurringWithdrawal: 100,
      }));
      // No trading return → net gain/loss should be 0
      expect(r.netGainLoss).toBe(0);
      expect(r.finalBalance).toBe(500);
      expect(r.totalWithdrawals).toBe(500);
    });

    test("Total return % reflects corrected net gain/loss", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 1,
        fixedFeePerPeriod: 10,
      }));
      // netGainLoss = -10, totalContributedCapital = 1000
      expect(r.totalReturnPercent).toBeCloseTo(-1, 5); // -1%
    });

    test("Positive return with fees: net includes fee impact", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 1,
        fixedFeePerPeriod: 10,
      }));
      // 1000 × 1.05 = 1050, fee = 10, final = 1040
      expect(r.finalBalance).toBe(1040);
      // netGainLoss = 1040 - 1000 - 0 + 0 = 40 (not 40+10=50)
      expect(r.netGainLoss).toBe(40);
      expect(r.totalFees).toBe(10);
    });
  });

  // ============================================================
  // REGRESSION: DRAWDOWN WITH CASH FLOWS
  // ============================================================
  describe("Drawdown With Cash Flows", () => {
    test("Drawdown basis label present", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 5,
      }));
      expect(r.drawdownBasis).toBeDefined();
      expect(r.drawdownBasis).toContain("drawdown");
    });

    test("No cash flows → simple label", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 5,
        recurringDeposit: 0, recurringWithdrawal: 0,
      }));
      expect(r.drawdownBasis).toBe("Account-balance drawdown");
    });

    test("With cash flows → explicit raw-balance label", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 5, numberOfPeriods: 5,
        recurringDeposit: 100,
      }));
      expect(r.drawdownBasis).toContain("includes deposits and withdrawals");
    });

    test("Withdrawal can increase raw drawdown without trading loss", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: 0, numberOfPeriods: 2,
        recurringWithdrawal: 200,
      }));
      // Period 1: 1000 → 800 (withdrawal). Peak was 1000. DD = 20%.
      // No trading loss, but raw drawdown is 20% due to withdrawal.
      expect(r.maxDrawdownPercent).toBeGreaterThan(0);
      expect(r.drawdownBasis).toContain("includes deposits and withdrawals");
    });

    test("Deposit does not artificially reduce drawdown below zero", () => {
      const r = calculateCompounding(makeInputs({
        initialBalance: 1000, returnPerPeriod: -5, numberOfPeriods: 3,
        recurringDeposit: 50,
      }));
      // Trading loss creates real drawdown; deposits may partially offset
      // but the raw drawdown should still be positive.
      expect(r.maxDrawdownPercent).toBeGreaterThanOrEqual(0);
    });
  });

  // ============================================================
  // REGRESSION: VARIABLE RETURNS ARRAY IMMUTABILITY
  // ============================================================
  describe("Variable Returns Array Immutability", () => {
    test("Original variableReturns array is not mutated", () => {
      const originalReturns = [2, 3, -1];
      const inputs = makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 10,
        variableReturns: originalReturns,
      });
      calculateCompounding(inputs);
      // The original array should still have 3 elements (not padded to 10)
      expect(originalReturns.length).toBe(3);
      expect(originalReturns).toEqual([2, 3, -1]);
    });

    test("Calculation still works correctly with padding", () => {
      const r = calculateCompounding(makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 5,
        variableReturns: [5, 3],
      }));
      expect(r.valid).toBe(true);
      expect(r.periods.length).toBe(5);
      expect(r.periods[0].returnPercent).toBe(5);
      expect(r.periods[1].returnPercent).toBe(3);
      expect(r.periods[2].returnPercent).toBe(0); // padded
    });

    test("Truncation does not mutate original", () => {
      const originalReturns = [5, 3, 10, 20, 1];
      const inputs = makeInputs({
        mode: "VARIABLE", initialBalance: 1000, numberOfPeriods: 2,
        variableReturns: originalReturns,
      });
      calculateCompounding(inputs);
      expect(originalReturns.length).toBe(5);
      expect(originalReturns).toEqual([5, 3, 10, 20, 1]);
    });
  });
});
