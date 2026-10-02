import { describe, test, expect } from "bun:test";
import {
  calculateLotSize,
  validateInputs,
  roundToVolumeStep,
  safeRound,
  DEFAULT_INPUTS,
  type CalculatorInputs,
} from "../src/lib/xauusd-lot-size-calc";

function makeInputs(overrides: Partial<CalculatorInputs> = {}): CalculatorInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("XAUUSD Lot Size Calculator", () => {
  // === VALIDATION EXAMPLE FROM INSTRUCTIONS ===
  test("validation example: $500 equity, 1% risk, BUY 4300/4295 = 0.01 lot", () => {
    const result = calculateLotSize(makeInputs());
    expect(result.valid).toBe(true);
    expect(result.riskBudget).toBe(5);
    expect(result.stopDistance).toBe(5);
    expect(result.estimatedRiskPerLot).toBe(500);
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.actualEstimatedRisk).toBe(5);
    expect(result.belowMinimum).toBe(false);
  });

  test("with $7 commission: 0.01 lot exceeds $5 budget → belowMinimum", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: 7 }));
    expect(result.valid).toBe(true);
    // Risk per lot = 500 + 7 = 507
    // Raw volume = 5 / 507 = 0.00986... → rounds down to 0.00
    // 0.00 < 0.01 minimum → belowMinimum
    expect(result.estimatedRiskPerLot).toBe(507);
    expect(result.calculatedVolume).toBe(0);
    expect(result.belowMinimum).toBe(true);
  });

  // === BUY vs SELL ===
  test("BUY: stop below entry", () => {
    const result = calculateLotSize(makeInputs({ direction: "BUY", entryPrice: 4300, stopLossPrice: 4295 }));
    expect(result.valid).toBe(true);
    expect(result.stopDistance).toBe(5);
  });

  test("SELL: stop above entry", () => {
    const result = calculateLotSize(makeInputs({ direction: "SELL", entryPrice: 4295, stopLossPrice: 4300 }));
    expect(result.valid).toBe(true);
    expect(result.stopDistance).toBe(5);
  });

  test("BUY with stop above entry → invalid", () => {
    const result = calculateLotSize(makeInputs({ direction: "BUY", entryPrice: 4295, stopLossPrice: 4300 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("BUY");
    expect(result.error).toContain("below");
  });

  test("SELL with stop below entry → invalid", () => {
    const result = calculateLotSize(makeInputs({ direction: "SELL", entryPrice: 4300, stopLossPrice: 4295 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("SELL");
    expect(result.error).toContain("above");
  });

  // === DIFFERENT CONTRACT SIZES ===
  test("contract size 1000 (10x default): lot size should be 10x smaller", () => {
    const result = calculateLotSize(makeInputs({ contractSize: 1000 }));
    expect(result.valid).toBe(true);
    // Risk per lot = 5 * 1000 = 5000
    // Volume = 5 / 5000 = 0.001 → rounds to 0.00 → belowMinimum
    expect(result.estimatedRiskPerLot).toBe(5000);
    expect(result.calculatedVolume).toBe(0);
    expect(result.belowMinimum).toBe(true);
  });

  test("contract size 10 (0.1x default): lot size should be 10x larger", () => {
    const result = calculateLotSize(makeInputs({ contractSize: 10, equity: 5000, riskPercentage: 1 }));
    // Risk budget = 50, risk per lot = 5*10 = 50, volume = 50/50 = 1.00
    expect(result.valid).toBe(true);
    expect(result.riskBudget).toBe(50);
    expect(result.estimatedRiskPerLot).toBe(50);
    expect(result.calculatedVolume).toBe(1);
  });

  // === NON-USD ACCOUNTS ===
  test("non-USD account with conversion rate", () => {
    const result = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: 0.92, // 1 USD = 0.92 EUR
    }));
    expect(result.valid).toBe(true);
    // Risk budget = 500 * 1% = 5 EUR
    // Risk per lot USD = 500
    // Risk per lot EUR = 500 * 0.92 = 460
    // Volume = 5 / 460 = 0.01086... → rounds to 0.01
    expect(result.riskBudget).toBe(5);
    expect(result.estimatedRiskPerLot).toBe(460);
    expect(result.calculatedVolume).toBe(0.01);
  });

  test("non-USD account without conversion rate → invalid", () => {
    const result = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: null,
    }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("conversion rate");
  });

  // === COMMISSION AND SLIPPAGE ===
  test("commission per lot is included in risk per lot", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: 10 }));
    expect(result.valid).toBe(true);
    expect(result.estimatedRiskPerLot).toBe(510); // 500 + 10
  });

  test("slippage per ounce is included in risk per lot", () => {
    const result = calculateLotSize(makeInputs({ slippagePerOunce: 0.5 }));
    expect(result.valid).toBe(true);
    // Slippage per lot = 0.5 * 100 = 50
    // Total risk per lot = 500 + 50 = 550
    expect(result.estimatedRiskPerLot).toBe(550);
  });

  test("both commission and slippage combined", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: 10, slippagePerOunce: 0.5 }));
    expect(result.valid).toBe(true);
    expect(result.estimatedRiskPerLot).toBe(560); // 500 + 10 + 50
  });

  // === VOLUME STEP ROUNDING ===
  test("volume step 0.01: rounds down correctly", () => {
    const result = calculateLotSize(makeInputs({ equity: 1000, riskPercentage: 1, volumeStep: 0.01 }));
    // Budget = 10, risk per lot = 500, raw volume = 0.02
    expect(result.calculatedVolume).toBe(0.02);
  });

  test("volume step 0.1: rounds down to nearest 0.1", () => {
    const result = calculateLotSize(makeInputs({ equity: 1000, riskPercentage: 1, volumeStep: 0.1 }));
    // Budget = 10, risk per lot = 500, raw volume = 0.02 → rounds to 0.0 → belowMinimum
    expect(result.calculatedVolume).toBe(0);
    expect(result.belowMinimum).toBe(true);
  });

  // === MINIMUM VOLUME REJECTION ===
  test("calculated volume below minimum → belowMinimum true", () => {
    const result = calculateLotSize(makeInputs({ equity: 100, riskPercentage: 0.5 }));
    // Budget = 0.50, risk per lot = 500, raw volume = 0.001 → rounds to 0.00
    expect(result.calculatedVolume).toBe(0);
    expect(result.belowMinimum).toBe(true);
  });

  // === MAXIMUM VOLUME HANDLING ===
  test("calculated volume above maximum → clamped to max", () => {
    const result = calculateLotSize(makeInputs({ equity: 1000000, riskPercentage: 10, maxVolume: 50 }));
    // Budget = 100000, risk per lot = 500, raw volume = 200 → clamped to 50
    expect(result.calculatedVolume).toBe(50);
  });

  // === ZERO EQUITY ===
  test("zero equity → invalid", () => {
    const result = calculateLotSize(makeInputs({ equity: 0 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("equity");
  });

  // === ZERO OR NEGATIVE RISK PERCENTAGE ===
  test("zero risk percentage → invalid", () => {
    const result = calculateLotSize(makeInputs({ riskPercentage: 0 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Risk percentage");
  });

  test("negative risk percentage → invalid", () => {
    const result = calculateLotSize(makeInputs({ riskPercentage: -1 }));
    expect(result.valid).toBe(false);
  });

  // === IDENTICAL ENTRY AND STOP ===
  test("identical entry and stop → invalid", () => {
    const result = calculateLotSize(makeInputs({ entryPrice: 4300, stopLossPrice: 4300 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("identical");
  });

  // === INCORRECT STOP-LOSS DIRECTION ===
  test("BUY with stop above → invalid (already tested above)", () => {
    expect(true).toBe(true); // covered in BUY/SELL section
  });

  // === MISSING CONVERSION RATES ===
  test("non-USD with negative conversion rate → invalid", () => {
    const result = calculateLotSize(makeInputs({ accountCurrency: "GBP", conversionRate: -1 }));
    expect(result.valid).toBe(false);
  });

  // === EXTREMELY SMALL VOLUME ===
  test("extremely small volume calculation produces no NaN", () => {
    const result = calculateLotSize(makeInputs({ equity: 1, riskPercentage: 0.01 }));
    expect(result.valid).toBe(true);
    expect(isNaN(result.calculatedVolume)).toBe(false);
    expect(isNaN(result.actualEstimatedRisk)).toBe(false);
    expect(isNaN(result.estimatedRiskPerLot)).toBe(false);
  });

  // === OPTIONAL TP AND RISK/REWARD ===
  test("TP provided: calculates estimated reward and R:R ratio", () => {
    const result = calculateLotSize(makeInputs({
      takeProfitPrice: 4310,
      direction: "BUY",
      entryPrice: 4300,
      stopLossPrice: 4295,
    }));
    expect(result.valid).toBe(true);
    // TP distance = 10, reward per lot = 10 * 100 = 1000
    // Volume = 0.01, estimated reward = 0.01 * 1000 = 10
    expect(result.estimatedReward).toBe(10);
    // R:R = 10 / 5 = 2
    expect(result.riskRewardRatio).toBe(2);
  });

  test("TP not provided: no estimated reward", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: null }));
    expect(result.valid).toBe(true);
    expect(result.estimatedReward).toBeUndefined();
    expect(result.riskRewardRatio).toBeUndefined();
  });

  test("SELL with TP below entry: correct reward", () => {
    const result = calculateLotSize(makeInputs({
      direction: "SELL",
      entryPrice: 4310,
      stopLossPrice: 4315,
      takeProfitPrice: 4300,
    }));
    expect(result.valid).toBe(true);
    // Stop distance = 5, TP distance = 10
    // Risk per lot = 500, reward per lot = 1000
    // Volume = 5 / 500 = 0.01, reward = 0.01 * 1000 = 10
    expect(result.estimatedReward).toBe(10);
    expect(result.riskRewardRatio).toBe(2);
  });

  // === HELPER FUNCTIONS ===
  test("roundToVolumeStep: rounds down correctly", () => {
    expect(roundToVolumeStep(0.019, 0.01)).toBe(0.01);
    expect(roundToVolumeStep(0.015, 0.01)).toBe(0.01);
    expect(roundToVolumeStep(0.109, 0.01)).toBe(0.10);
    expect(roundToVolumeStep(0.05, 0.01)).toBe(0.05);
    expect(roundToVolumeStep(0, 0.01)).toBe(0);
  });

  test("roundToVolumeStep: floating-point edge cases (0.3/0.1 problem)", () => {
    // Classic JS: 0.3 / 0.1 = 2.9999999999999996 — must NOT round down to 0.2
    expect(roundToVolumeStep(0.3, 0.1)).toBe(0.3);
    // 0.07 / 0.01 = 6.999999... — must be 0.06, not 0.07
    expect(roundToVolumeStep(0.07, 0.01)).toBe(0.07);
    // 0.003 / 0.001 = 2.999... — must be 0.003
    expect(roundToVolumeStep(0.003, 0.001)).toBe(0.003);
    // 0.029 / 0.01 = 2.8999... — must be 0.02
    expect(roundToVolumeStep(0.029, 0.01)).toBe(0.02);
    // Very small step
    expect(roundToVolumeStep(0.12345, 0.001)).toBe(0.123);
    // Volume exactly on a step boundary
    expect(roundToVolumeStep(0.05, 0.05)).toBe(0.05);
    // Very large volume
    expect(roundToVolumeStep(99.99, 0.01)).toBe(99.99);
  });

  test("safeRound: handles non-finite values", () => {
    expect(safeRound(NaN, 2)).toBe(0);
    expect(safeRound(Infinity, 2)).toBe(0);
    expect(safeRound(1.006, 2)).toBe(1.01);
    expect(safeRound(1.004, 2)).toBe(1);
  });

  // === NO NaN/Infinity IN RESULTS ===
  test("all result fields are finite for valid inputs", () => {
    const result = calculateLotSize(makeInputs());
    expect(result.valid).toBe(true);
    expect(isFinite(result.riskBudget)).toBe(true);
    expect(isFinite(result.stopDistance)).toBe(true);
    expect(isFinite(result.priceRiskPerLot)).toBe(true);
    expect(isFinite(result.estimatedRiskPerLot)).toBe(true);
    expect(isFinite(result.rawVolume)).toBe(true);
    expect(isFinite(result.calculatedVolume)).toBe(true);
    expect(isFinite(result.actualEstimatedRisk)).toBe(true);
    expect(isFinite(result.contractExposureOunces)).toBe(true);
  });

  // === REGRESSION: ISSUE 1 — Commission unit handling ===
  test("REGRESSION: commission is in account currency, not converted from USD", () => {
    // USD account: commission should be added directly (no conversion)
    const usdResult = calculateLotSize(makeInputs({ commissionPerLot: 7 }));
    // priceRiskPerLot (USD) = 5 * 100 = 500
    // slippagePerLot (USD) = 0
    // commission = 7 (already in USD = account currency)
    // total = 500 + 7 + 0 = 507
    expect(usdResult.valid).toBe(true);
    expect(usdResult.commissionPerLot).toBe(7);
    expect(usdResult.estimatedRiskPerLot).toBe(507);
  });

  test("REGRESSION: non-USD commission is in account currency, not converted from USD", () => {
    // EUR account with conversion rate 0.92
    // priceRiskPerLot (USD) = 5 * 100 = 500, in EUR = 500 * 0.92 = 460
    // slippagePerLot (EUR) = 0
    // commission = 5 EUR (already in account currency — NOT converted)
    // total = 460 + 5 + 0 = 465
    const eurResult = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: 0.92,
      commissionPerLot: 5,
    }));
    expect(eurResult.valid).toBe(true);
    expect(eurResult.commissionPerLot).toBe(5);
    expect(eurResult.priceRiskPerLot).toBe(460);
    expect(eurResult.estimatedRiskPerLot).toBe(465); // 460 + 5 + 0, NOT 460 + 4.6
  });

  test("REGRESSION: non-USD with commission and slippage both present", () => {
    // EUR account, convRate 0.92
    // priceRiskPerLot (EUR) = 500 * 0.92 = 460
    // slippagePerLot (EUR) = (0.5 * 100) * 0.92 = 46
    // commission = 5 EUR (account currency)
    // total = 460 + 5 + 46 = 511
    const result = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: 0.92,
      commissionPerLot: 5,
      slippagePerOunce: 0.5,
    }));
    expect(result.valid).toBe(true);
    expect(result.priceRiskPerLot).toBe(460);
    expect(result.slippagePerLot).toBe(46);
    expect(result.commissionPerLot).toBe(5);
    expect(result.estimatedRiskPerLot).toBe(511);
  });

  // === REGRESSION: ISSUE 2 — Volume precision preserved ===
  test("REGRESSION: calculatedVolume preserves 0.001 step precision", () => {
    // Use a broker with 0.001 volume step and a large enough budget
    const result = calculateLotSize(makeInputs({
      equity: 50000,
      riskPercentage: 1,
      volumeStep: 0.001,
      minVolume: 0.001,
    }));
    // Budget = 500, risk per lot = 500, raw volume = 1.0
    // With 0.001 step, calculatedVolume should be 1.0 (not rounded to 1.00 in a way that loses precision)
    expect(result.valid).toBe(true);
    // The key test: 0.001 increments are preserved, not truncated to 2 decimals
    const smallResult = calculateLotSize(makeInputs({
      equity: 100,
      riskPercentage: 0.5,
      volumeStep: 0.001,
      minVolume: 0.001,
    }));
    // Budget = 0.50, risk per lot = 500, raw = 0.001
    // Should be exactly 0.001, not 0.00 (which safeRound(…, 2) would have produced)
    expect(smallResult.valid).toBe(true);
    expect(smallResult.calculatedVolume).toBe(0.001);
    expect(smallResult.belowMinimum).toBe(false);
  });

  test("REGRESSION: calculatedVolume with 0.01 step still returns 0.01 for default example", () => {
    const result = calculateLotSize(makeInputs());
    expect(result.calculatedVolume).toBe(0.01);
  });

  // === REGRESSION: ISSUE 3 — Negative commission/slippage rejected ===
  test("REGRESSION: negative commission is rejected", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: -5 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Commission");
    expect(result.error).toContain("negative");
  });

  test("REGRESSION: negative slippage allowance is rejected", () => {
    const result = calculateLotSize(makeInputs({ slippagePerOunce: -0.5 }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Slippage");
    expect(result.error).toContain("negative");
  });

  test("REGRESSION: zero commission and zero slippage are accepted", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: 0, slippagePerOunce: 0 }));
    expect(result.valid).toBe(true);
  });

  test("REGRESSION: null/undefined commission and slippage are accepted (treated as 0)", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: null, slippagePerOunce: null }));
    expect(result.valid).toBe(true);
    expect(result.commissionPerLot).toBe(0);
    expect(result.slippagePerLot).toBe(0);
  });
});
