import { describe, test, expect } from "bun:test";
import {
  calculateLotSize,
  validateInputs,
  roundToVolumeStep,
  roundToBrokerGrid,
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

  test("volume step 0.1: rounds down to broker grid (minVolume=0.01, step=0.1)", () => {
    const result = calculateLotSize(makeInputs({ equity: 1000, riskPercentage: 1, volumeStep: 0.1 }));
    // Budget = 10, risk per lot = 500, raw volume = 0.02
    // Broker grid: min=0.01, step=0.1 → permitted: 0.01, 0.11, 0.21...
    // 0.02 ≥ 0.01, floor((0.02-0.01)/0.1) = 0 → result = 0.01
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.belowMinimum).toBe(false);
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

  // === AUDIT: EDGE CASE 1 — Risk-budget invariant ===
  test("AUDIT: actualEstimatedRisk never exceeds riskBudget (fuzz test)", () => {
    // Test many combinations of equity, risk %, entry, stop, contract, step
    const equities = [100, 500, 1000, 5000, 50000];
    const riskPcts = [0.1, 0.25, 0.5, 1, 2, 5];
    const entries = [4200, 4300, 4400, 4500];
    const stops = [4195, 4290, 4295, 4300, 4395];
    const contractSizes = [10, 50, 100, 1000];
    const steps = [0.001, 0.01, 0.1, 1];
    const commissions = [0, 1, 5, 7, 10];
    const slippages = [0, 0.1, 0.5, 1];

    let tested = 0;
    for (const eq of equities) {
      for (const rp of riskPcts) {
        for (const entry of entries) {
          for (const stop of stops) {
            if (entry === stop) continue;
            for (const cs of contractSizes) {
              for (const step of steps) {
                for (const comm of commissions) {
                  for (const slip of slippages) {
                    const result = calculateLotSize(makeInputs({
                      equity: eq,
                      riskPercentage: rp,
                      entryPrice: entry,
                      stopLossPrice: stop,
                      contractSize: cs,
                      volumeStep: step,
                      minVolume: step,
                      commissionPerLot: comm,
                      slippagePerOunce: slip,
                    }));
                    if (result.valid && result.calculatedVolume > 0) {
                      tested++;
                      // The invariant: actual risk must never exceed budget
                      // (with a small float tolerance for the safeRound display)
                      expect(result.actualEstimatedRisk).toBeLessThanOrEqual(
                        result.riskBudget + 0.01
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    // Ensure we actually tested a meaningful number of combinations
    expect(tested).toBeGreaterThan(100);
  });

  test("AUDIT: volume infinitesimally below step boundary does not exceed budget", () => {
    // Construct a case where rawVolume is just barely above a step boundary
    // Equity=501, risk=1%, entry=4300, stop=4295, contract=100, step=0.01
    // Budget = 5.01, risk per lot = 500, rawVolume = 5.01/500 = 0.01002
    // roundToVolumeStep(0.01002, 0.01) = 0.01
    // actualRisk = 0.01 * 500 = 5.00 <= 5.01 ✓
    const result = calculateLotSize(makeInputs({ equity: 501, riskPercentage: 1 }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget);
  });

  test("AUDIT: with commission, actual risk still does not exceed budget", () => {
    // Budget = 5, risk per lot = 507 (500+7), rawVolume = 5/507 = 0.009862...
    // roundToVolumeStep = 0.00, belowMinimum
    // But let's test with a larger budget where we get a valid volume
    // Budget = 50, risk per lot = 507, rawVolume = 50/507 = 0.0986...
    // roundToVolumeStep = 0.09, actualRisk = 0.09 * 507 = 45.63 <= 50 ✓
    const result = calculateLotSize(makeInputs({
      equity: 5000,
      riskPercentage: 1,
      commissionPerLot: 7,
    }));
    expect(result.valid).toBe(true);
    expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget);
  });

  // === AUDIT: EDGE CASE 2 — Min-volume/step alignment ===
  test("AUDIT: minVolume not aligned with volumeStep — belowMinimum correctly true", () => {
    // Broker: minVolume=0.02, volumeStep=0.01
    // Budget = 5, risk per lot = 500, rawVolume = 0.01
    // Broker grid anchored at 0.02: 0.01 < 0.02 → not tradable → volume=0
    // belowMinimum = true (0 < 0.02)
    const result = calculateLotSize(makeInputs({
      minVolume: 0.02,
      volumeStep: 0.01,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0); // below broker min → no tradable volume
    expect(result.belowMinimum).toBe(true);
  });

  test("AUDIT: minVolume equals volumeStep — correctly not below minimum", () => {
    const result = calculateLotSize(makeInputs({
      minVolume: 0.01,
      volumeStep: 0.01,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.belowMinimum).toBe(false);
  });

  test("AUDIT: minVolume larger than calculated — do NOT auto-increase", () => {
    // Budget = 5, risk per lot = 500, rawVolume = 0.01
    // minVolume = 0.02 → 0.01 < 0.02, broker grid returns 0
    // We must NOT auto-increase to 0.02 (that would exceed budget: 0.02*500=10 > 5)
    const result = calculateLotSize(makeInputs({
      minVolume: 0.02,
      volumeStep: 0.01,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0); // NOT increased to 0.02
    expect(result.belowMinimum).toBe(true);
    // Verify the auto-increase would have exceeded budget
    expect(0.02 * result.estimatedRiskPerLot).toBeGreaterThan(result.riskBudget);
  });

  test("AUDIT: minVolume with non-standard step (0.005)", () => {
    const result = calculateLotSize(makeInputs({
      minVolume: 0.005,
      volumeStep: 0.005,
    }));
    expect(result.valid).toBe(true);
    // Budget = 5, risk per lot = 500, rawVolume = 0.01
    // roundToVolumeStep(0.01, 0.005) = 0.01
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.belowMinimum).toBe(false);
  });

  // === AUDIT: EDGE CASE 3 — Non-finite optional inputs ===
  test("AUDIT: NaN commission is rejected", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: NaN }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("AUDIT: Infinity commission is rejected", () => {
    const result = calculateLotSize(makeInputs({ commissionPerLot: Infinity }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("AUDIT: NaN slippage is rejected", () => {
    const result = calculateLotSize(makeInputs({ slippagePerOunce: NaN }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("AUDIT: Infinity slippage is rejected", () => {
    const result = calculateLotSize(makeInputs({ slippagePerOunce: Infinity }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("AUDIT: NaN conversion rate is rejected for non-USD", () => {
    const result = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: NaN,
    }));
    expect(result.valid).toBe(false);
  });

  test("AUDIT: Infinity conversion rate is rejected for non-USD", () => {
    const result = calculateLotSize(makeInputs({
      accountCurrency: "EUR",
      conversionRate: Infinity,
    }));
    expect(result.valid).toBe(false);
  });

  test("AUDIT: NaN take-profit is now explicitly rejected (updated)", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: NaN }));
    // NaN TP is now rejected per the final fix, not silently ignored
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  // === AUDIT: Default example still works ===
  test("AUDIT: default $500/1% example still returns 0.01 lot", () => {
    const result = calculateLotSize(makeInputs());
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.actualEstimatedRisk).toBe(5);
    expect(result.riskBudget).toBe(5);
    expect(result.belowMinimum).toBe(false);
  });

  // === FINAL FIX: Broker grid anchored at minVolume ===
  test("FINAL: roundToBrokerGrid — min=0.03, step=0.02, permitted: 0.03, 0.05, 0.07...", () => {
    expect(roundToBrokerGrid(0.03, 0.03, 0.02)).toBe(0.03);
    expect(roundToBrokerGrid(0.04, 0.03, 0.02)).toBe(0.03); // 0.04 NOT on grid
    expect(roundToBrokerGrid(0.05, 0.03, 0.02)).toBe(0.05);
    expect(roundToBrokerGrid(0.06, 0.03, 0.02)).toBe(0.05); // 0.06 NOT on grid
    expect(roundToBrokerGrid(0.07, 0.03, 0.02)).toBe(0.07);
    expect(roundToBrokerGrid(0.09, 0.03, 0.02)).toBe(0.09);
    expect(roundToBrokerGrid(0.02, 0.03, 0.02)).toBe(0);    // below min → 0
    expect(roundToBrokerGrid(0.01, 0.03, 0.02)).toBe(0);    // below min → 0
    expect(roundToBrokerGrid(0, 0.03, 0.02)).toBe(0);
  });

  test("FINAL: calculateLotSize with min=0.03, step=0.02, raw volume=0.05 → 0.05", () => {
    // Construct inputs so rawVolume = 0.05
    // Budget / riskPerLot = 0.05 → need Budget=25, riskPerLot=500
    // Equity=2500, risk=1% → Budget=25
    // Entry=4300, stop=4295, contract=100 → riskPerLot=500
    // rawVolume = 25/500 = 0.05
    const result = calculateLotSize(makeInputs({
      equity: 2500,
      riskPercentage: 1,
      entryPrice: 4300,
      stopLossPrice: 4295,
      contractSize: 100,
      minVolume: 0.03,
      volumeStep: 0.02,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.05); // 0.05 is on the grid: 0.03, 0.05, 0.07
    expect(result.belowMinimum).toBe(false);
    expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget);
  });

  test("FINAL: calculateLotSize with min=0.03, step=0.02, raw volume=0.04 → 0.03 (not 0.04)", () => {
    // rawVolume = 0.04 would round to 0.04 on a zero-anchored grid,
    // but 0.04 is NOT on the broker grid (0.03, 0.05, 0.07...).
    // Should snap down to 0.03.
    // Budget / riskPerLot = 0.04 → need Budget=20, riskPerLot=500
    // Equity=2000, risk=1% → Budget=20
    const result = calculateLotSize(makeInputs({
      equity: 2000,
      riskPercentage: 1,
      entryPrice: 4300,
      stopLossPrice: 4295,
      contractSize: 100,
      minVolume: 0.03,
      volumeStep: 0.02,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.03); // NOT 0.04
    expect(result.belowMinimum).toBe(false);
    expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget);
  });

  test("FINAL: calculateLotSize with min=0.03, step=0.02, budget too small for min → belowMinimum", () => {
    // Budget=5, riskPerLot=500, rawVolume=0.01
    // 0.01 < 0.03 (minVolume) → belowMinimum, calculatedVolume=0
    const result = calculateLotSize(makeInputs({
      equity: 500,
      riskPercentage: 1,
      entryPrice: 4300,
      stopLossPrice: 4295,
      contractSize: 100,
      minVolume: 0.03,
      volumeStep: 0.02,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0); // can't trade — below min
    expect(result.belowMinimum).toBe(true);
  });

  test("FINAL: calculateLotSize with min=0.03, step=0.02, raw volume=0.06 → 0.05", () => {
    // rawVolume=0.06 → zero-anchored would give 0.06, but 0.06 is NOT on grid.
    // Broker grid: 0.03, 0.05, 0.07 → 0.06 snaps down to 0.05
    // Budget=30, riskPerLot=500 → rawVolume=0.06
    const result = calculateLotSize(makeInputs({
      equity: 3000,
      riskPercentage: 1,
      entryPrice: 4300,
      stopLossPrice: 4295,
      contractSize: 100,
      minVolume: 0.03,
      volumeStep: 0.02,
    }));
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.05); // NOT 0.06
    expect(result.belowMinimum).toBe(false);
    expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget);
  });

  test("FINAL: risk-budget invariant holds with broker grid (min=0.03, step=0.02)", () => {
    // Test several equity levels
    for (const eq of [500, 1000, 2500, 5000, 10000, 50000]) {
      const result = calculateLotSize(makeInputs({
        equity: eq,
        riskPercentage: 1,
        entryPrice: 4300,
        stopLossPrice: 4295,
        contractSize: 100,
        minVolume: 0.03,
        volumeStep: 0.02,
      }));
      if (result.valid && result.calculatedVolume > 0) {
        expect(result.actualEstimatedRisk).toBeLessThanOrEqual(result.riskBudget + 0.01);
      }
    }
  });

  test("FINAL: default example (min=0.01, step=0.01) still works with broker grid", () => {
    const result = calculateLotSize(makeInputs());
    expect(result.valid).toBe(true);
    expect(result.calculatedVolume).toBe(0.01);
    expect(result.belowMinimum).toBe(false);
  });

  // === FINAL FIX: Non-finite TP explicitly rejected ===
  test("FINAL: NaN take-profit is explicitly rejected (not silently ignored)", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: NaN }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("FINAL: Infinity take-profit is explicitly rejected", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: Infinity }));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("finite");
  });

  test("FINAL: null take-profit is accepted (no TP)", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: null }));
    expect(result.valid).toBe(true);
    expect(result.estimatedReward).toBeUndefined();
  });

  test("FINAL: valid take-profit still works correctly", () => {
    const result = calculateLotSize(makeInputs({ takeProfitPrice: 4310 }));
    expect(result.valid).toBe(true);
    expect(result.estimatedReward).toBe(10);
    expect(result.riskRewardRatio).toBe(2);
  });
});
