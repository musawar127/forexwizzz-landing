import { describe, test, expect } from "bun:test";
import {
  calculateMargin,
  validateMarginInputs,
  calculateNotionalExposure,
  calculateMarginFromLeverage,
  calculateMarginFromRate,
  calculateEquivalentMarginRate,
  calculateEquivalentLeverage,
  convertUsdMarginToAccountCurrency,
  calculateAccountMarginMetrics,
  calculateMaxLotsFromMargin,
  buildLeverageComparison,
  roundLotsDownToStep,
  roundTo,
  smartRound,
  COMPARISON_LEVERAGES,
  DEFAULT_INPUTS,
  LEVERAGE_PRESETS,
  type MarginInputs,
  type MarginMethod,
} from "../src/lib/xauusd-margin-calc";

function makeInputs(overrides: Partial<MarginInputs> = {}): MarginInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("XAUUSD Margin Calculator & Gold Leverage Tool", () => {

  // ============================================================
  // NOTIONAL EXPOSURE
  // ============================================================
  describe("Notional Exposure", () => {
    test("0.01 lot × 100 oz = 1 oz, notional $4,000 at price 4000", () => {
      const n = calculateNotionalExposure(0.01, 100, 4000);
      expect(n.exposureOunces).toBeCloseTo(1, 8);
      expect(n.notionalUSD).toBe(4000);
    });
    test("0.10 lot × 100 oz = 10 oz, notional $40,000", () => {
      const n = calculateNotionalExposure(0.10, 100, 4000);
      expect(n.exposureOunces).toBeCloseTo(10, 8);
      expect(n.notionalUSD).toBe(40000);
    });
    test("1.00 lot × 100 oz = 100 oz, notional $400,000", () => {
      const n = calculateNotionalExposure(1.00, 100, 4000);
      expect(n.exposureOunces).toBe(100);
      expect(n.notionalUSD).toBe(400000);
    });
    test("Custom contract size 10 oz: 1 lot = 10 oz", () => {
      const n = calculateNotionalExposure(1.00, 10, 4000);
      expect(n.exposureOunces).toBe(10);
      expect(n.notionalUSD).toBe(40000);
    });
    test("Very high gold price 5000: 1 lot × 100 = $500,000", () => {
      const n = calculateNotionalExposure(1.00, 100, 5000);
      expect(n.notionalUSD).toBe(500000);
    });
    test("Decimal contract size 0.5 if supported", () => {
      const n = calculateNotionalExposure(1.00, 0.5, 4000);
      expect(n.exposureOunces).toBe(0.5);
      expect(n.notionalUSD).toBe(2000);
    });
  });

  // ============================================================
  // LEVERAGE MARGIN — 0.01 LOT (spec §24)
  // ============================================================
  describe("Leverage Margin — 0.01 lot (price 4000, contract 100)", () => {
    test("1:20 → $200", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 20 }));
      expect(r.valid).toBe(true);
      expect(r.marginUSD).toBe(200);
    });
    test("1:50 → $80", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 50 }));
      expect(r.marginUSD).toBe(80);
    });
    test("1:100 → $40", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 100 }));
      expect(r.marginUSD).toBe(40);
    });
    test("1:200 → $20", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 200 }));
      expect(r.marginUSD).toBe(20);
    });
    test("1:500 → $8", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 500 }));
      expect(r.marginUSD).toBe(8);
    });
    test("1:1000 → $4", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 1000 }));
      expect(r.marginUSD).toBe(4);
    });
    test("0.10 lot at 1:100 → $400", () => {
      const r = calculateMargin(makeInputs({ lots: 0.10, leverage: 100 }));
      expect(r.marginUSD).toBe(400);
    });
    test("1.00 lot at 1:100 → $4,000", () => {
      const r = calculateMargin(makeInputs({ lots: 1.00, leverage: 100 }));
      expect(r.marginUSD).toBe(4000);
    });
    test("Custom leverage 1:150 → notional/150", () => {
      const r = calculateMargin(makeInputs({ lots: 0.01, leverage: 150 }));
      expect(r.marginUSD).toBeCloseTo(4000 / 150, 8);
    });
  });

  // ============================================================
  // MARGIN RATE METHOD
  // ============================================================
  describe("Margin Rate Method", () => {
    test("1% rate = equivalent 1:100 leverage, same margin", () => {
      const lev = calculateMargin(makeInputs({ method: "LEVERAGE", leverage: 100 }));
      const rate = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 1 }));
      expect(lev.valid).toBe(true);
      expect(rate.valid).toBe(true);
      expect(rate.marginUSD).toBeCloseTo(lev.marginUSD, 8);
      expect(rate.effectiveLeverage).toBeCloseTo(100, 8);
    });
    test("0.5% rate = equivalent 1:200 leverage", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 0.5 }));
      expect(r.valid).toBe(true);
      expect(r.effectiveLeverage).toBeCloseTo(200, 8);
    });
    test("0.2% rate = equivalent 1:500 leverage", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 0.2 }));
      expect(r.effectiveLeverage).toBeCloseTo(500, 8);
    });
    test("Margin rate and leverage produce identical results when mathematically equivalent", () => {
      // 1:200 ≈ 0.5%
      const lev = calculateMargin(makeInputs({ method: "LEVERAGE", leverage: 200, lots: 0.10 }));
      const rate = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 0.5, lots: 0.10 }));
      expect(lev.marginUSD).toBeCloseTo(rate.marginUSD, 8);
    });
  });

  // ============================================================
  // EQUIVALENT CONVERSIONS
  // ============================================================
  describe("Leverage ↔ Margin Rate Conversions", () => {
    test("calculateEquivalentMarginRate: 1:100 → 1%", () => {
      expect(calculateEquivalentMarginRate(100)).toBe(1);
    });
    test("calculateEquivalentMarginRate: 1:500 → 0.2%", () => {
      expect(calculateEquivalentMarginRate(500)).toBeCloseTo(0.2, 8);
    });
    test("calculateEquivalentLeverage: 1% → 100", () => {
      expect(calculateEquivalentLeverage(1)).toBe(100);
    });
    test("calculateEquivalentLeverage: 0.2% → 500", () => {
      expect(calculateEquivalentLeverage(0.2)).toBe(500);
    });
  });

  // ============================================================
  // ACCOUNT CURRENCY CONVERSION
  // ============================================================
  describe("Account Currency Conversion", () => {
    test("USD → USD: conversion 1, margin unchanged", () => {
      const r = calculateMargin(makeInputs({ accountCurrency: "USD", conversionRate: 1 }));
      expect(r.marginAccount).toBe(r.marginUSD);
    });
    test("USD → EUR: rate 0.92", () => {
      const r = calculateMargin(makeInputs({ accountCurrency: "EUR", conversionRate: 0.92 }));
      expect(r.valid).toBe(true);
      expect(r.marginAccount).toBeCloseTo(r.marginUSD * 0.92, 8);
    });
    test("USD → GBP: rate 0.78", () => {
      const r = calculateMargin(makeInputs({ accountCurrency: "GBP", conversionRate: 0.78 }));
      expect(r.marginAccount).toBeCloseTo(r.marginUSD * 0.78, 8);
    });
    test("USD → PKR: rate 280", () => {
      const r = calculateMargin(makeInputs({ accountCurrency: "PKR", conversionRate: 280 }));
      expect(r.marginAccount).toBeCloseTo(r.marginUSD * 280, 8);
    });
    test("convertUsdMarginToAccountCurrency standalone", () => {
      expect(convertUsdMarginToAccountCurrency(40, 0.92)).toBeCloseTo(36.8, 8);
    });
  });

  // ============================================================
  // ACCOUNT METRICS
  // ============================================================
  describe("Account Margin Metrics", () => {
    test("New Used Margin = existing + required", () => {
      const m = calculateAccountMarginMetrics(10000, 100, 40);
      expect(m.newUsedMargin).toBe(140);
    });
    test("Free Margin After = equity - newUsedMargin", () => {
      const m = calculateAccountMarginMetrics(10000, 100, 40);
      expect(m.freeMarginAfter).toBe(9860);
    });
    test("Margin Level = equity / newUsedMargin × 100", () => {
      const m = calculateAccountMarginMetrics(10000, 100, 40);
      expect(m.marginLevelPercent).toBeCloseTo(7142.857, 2);
    });
    test("Margin Usage = newUsedMargin / equity × 100", () => {
      const m = calculateAccountMarginMetrics(10000, 100, 40);
      expect(m.marginUsagePercent).toBeCloseTo(1.4, 5);
    });
    test("Position Margin % = required / equity × 100", () => {
      const m = calculateAccountMarginMetrics(10000, 100, 40);
      expect(m.positionMarginPercent).toBeCloseTo(0.4, 5);
    });
    test("Existing used margin = 0", () => {
      const m = calculateAccountMarginMetrics(10000, 0, 40);
      expect(m.newUsedMargin).toBe(40);
      expect(m.freeMarginAfter).toBe(9960);
    });
    test("Free margin exactly 0", () => {
      const m = calculateAccountMarginMetrics(100, 60, 40);
      expect(m.freeMarginAfter).toBe(0);
      expect(m.freeMarginNegative).toBe(false);
    });
    test("Negative implied free margin flagged", () => {
      const m = calculateAccountMarginMetrics(100, 80, 40);
      expect(m.freeMarginAfter).toBe(-20);
      expect(m.freeMarginNegative).toBe(true);
    });
    test("Used margin > equity warning flagged", () => {
      const m = calculateAccountMarginMetrics(100, 150, 40);
      expect(m.usedMarginExceedsEquity).toBe(true);
    });
    test("Margin level null when newUsedMargin = 0", () => {
      const m = calculateAccountMarginMetrics(1000, 0, 0);
      expect(m.marginLevelPercent).toBeNull();
    });
    test("Margin usage null when equity = 0", () => {
      const m = calculateAccountMarginMetrics(0, 0, 40);
      expect(m.marginUsagePercent).toBeNull();
      expect(m.positionMarginPercent).toBeNull();
    });
  });

  // ============================================================
  // MAX LOTS FROM MARGIN
  // ============================================================
  describe("Max Lots From Margin", () => {
    test("Raw maximum lots: $40 margin, 1:100, price 4000, contract 100 → 0.01 lot", () => {
      // margin per lot = 4000×100/100 = 4000; available 40 → 0.01
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 40, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rawLots).toBeCloseTo(0.01, 8);
    });
    test("0.01 lot step rounding", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 100, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      // raw = 100/4000 = 0.025 → rounded down to 0.02
      expect(r.brokerStepLots).toBeCloseTo(0.02, 8);
    });
    test("0.001 lot step rounding", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 50, 1, 0.001, 0.001);
      if ("error" in r) { expect(false).toBe(true); return; }
      // raw = 50/4000 = 0.0125 → rounded down to 0.012
      expect(r.brokerStepLots).toBeCloseTo(0.012, 8);
    });
    test("0.10 lot step rounding", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 500, 1, 0.10, 0.10);
      if ("error" in r) { expect(false).toBe(true); return; }
      // raw = 500/4000 = 0.125 → rounded down to 0.10
      expect(r.brokerStepLots).toBeCloseTo(0.10, 8);
    });
    test("Round DOWN only — never exceeds margin budget", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 90, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      // raw = 90/4000 = 0.0225 → rounded to 0.02; margin used = 0.02×4000 = 80 ≤ 90
      expect(r.brokerStepLots).toBeCloseTo(0.02, 8);
      expect(r.marginUsedAtRounded).toBeLessThanOrEqual(90);
    });
    test("Below minimum volume flagged", () => {
      // available 10, margin per lot 4000 → raw 0.0025, below min 0.01
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 10, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.belowMinimum).toBe(true);
    });
    test("Custom minimum volume", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 100, 1, 0.05, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      // raw = 0.025 → brokerStep 0.02 < min 0.05
      expect(r.belowMinimum).toBe(true);
    });
    test("Custom contract size", () => {
      // contract 10 → margin per lot = 4000×10/100 = 400; available 40 → 0.1
      const r = calculateMaxLotsFromMargin(4000, 10, "LEVERAGE", 100, undefined, 40, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rawLots).toBeCloseTo(0.1, 8);
    });
    test("Custom leverage 1:500", () => {
      // margin per lot = 4000×100/500 = 800; available 80 → 0.1
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 500, undefined, 80, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rawLots).toBeCloseTo(0.1, 8);
    });
    test("Non-USD account conversion", () => {
      // margin per lot USD = 4000; EUR rate 0.92 → 3680; available 368 EUR → 0.1 lot
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 36.8, 0.92, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rawLots).toBeCloseTo(0.01, 8);
    });
    test("Margin-rate method max lots", () => {
      // margin per lot = 4000×100×0.5/100 = 2000; available 200 → 0.1 lot
      const r = calculateMaxLotsFromMargin(4000, 100, "MARGIN_RATE", undefined, 0.5, 200, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rawLots).toBeCloseTo(0.1, 8);
    });
    test("Unused margin allocation correct", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 90, 1, 0.01, 0.01);
      if ("error" in r) { expect(false).toBe(true); return; }
      // used = 0.02 × 4000 = 80; unused = 90 - 80 = 10
      expect(r.unusedMargin).toBeCloseTo(10, 8);
    });
  });

  // ============================================================
  // roundLotsDownToStep helper
  // ============================================================
  describe("roundLotsDownToStep", () => {
    test("0.025 → 0.02 (step 0.01)", () => {
      expect(roundLotsDownToStep(0.025, 0.01)).toBeCloseTo(0.02, 8);
    });
    test("Float artifact 0.30000000000000004 → 0.30 (step 0.01)", () => {
      expect(roundLotsDownToStep(0.30000000000000004, 0.01)).toBeCloseTo(0.30, 8);
    });
    test("Exact multiple unchanged", () => {
      expect(roundLotsDownToStep(0.50, 0.01)).toBeCloseTo(0.50, 8);
    });
    test("Below step → 0", () => {
      expect(roundLotsDownToStep(0.005, 0.01)).toBe(0);
    });
  });

  // ============================================================
  // LEVERAGE COMPARISON
  // ============================================================
  describe("Leverage Comparison Table", () => {
    test("Generates rows for 20, 30, 50, 100, 200, 500, 1000", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.valid).toBe(true);
      expect(r.rows.length).toBe(7);
      expect(r.rows.map((x) => x.leverage)).toEqual([20, 30, 50, 100, 200, 500, 1000]);
    });
    test("Notional stays identical across all rows", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1);
      if ("error" in r) { expect(false).toBe(true); return; }
      const notionals = r.rows.map((x) => x.notionalUSD);
      expect(Math.max(...notionals) - Math.min(...notionals)).toBe(0);
    });
    test("Exposure stays identical", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.exposureOunces).toBe(1);
    });
    test("Required margin decreases as leverage increases", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1);
      if ("error" in r) { expect(false).toBe(true); return; }
      for (let i = 1; i < r.rows.length; i++) {
        expect(r.rows[i].marginUSD).toBeLessThan(r.rows[i - 1].marginUSD);
      }
    });
    test("Equivalent margin rate correct (1:100 → 1%)", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1);
      if ("error" in r) { expect(false).toBe(true); return; }
      const row100 = r.rows.find((x) => x.leverage === 100)!;
      expect(row100.marginRatePercent).toBe(1);
    });
    test("Custom leverage added and sorted", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 1, 150);
      if ("error" in r) { expect(false).toBe(true); return; }
      expect(r.rows.length).toBe(8);
      expect(r.rows.map((x) => x.leverage)).toContain(150);
      // sorted
      const levs = r.rows.map((x) => x.leverage);
      for (let i = 1; i < levs.length; i++) {
        expect(levs[i]).toBeGreaterThan(levs[i - 1]);
      }
    });
    test("Account currency conversion in comparison", () => {
      const r = buildLeverageComparison(4000, 0.01, 100, 0.92);
      if ("error" in r) { expect(false).toBe(true); return; }
      const row100 = r.rows.find((x) => x.leverage === 100)!;
      expect(row100.marginAccount).toBeCloseTo(40 * 0.92, 8);
    });
  });

  // ============================================================
  // VALIDATION
  // ============================================================
  describe("Validation", () => {
    test("NaN gold price → invalid", () => {
      const r = calculateMargin(makeInputs({ goldPrice: NaN }));
      expect(r.valid).toBe(false);
    });
    test("Infinity gold price → invalid", () => {
      const r = calculateMargin(makeInputs({ goldPrice: Infinity }));
      expect(r.valid).toBe(false);
    });
    test("Price 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ goldPrice: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative price → invalid", () => {
      const r = calculateMargin(makeInputs({ goldPrice: -4000 }));
      expect(r.valid).toBe(false);
    });
    test("Lots 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ lots: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative lots → invalid", () => {
      const r = calculateMargin(makeInputs({ lots: -0.1 }));
      expect(r.valid).toBe(false);
    });
    test("Contract 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ contractSize: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative contract → invalid", () => {
      const r = calculateMargin(makeInputs({ contractSize: -100 }));
      expect(r.valid).toBe(false);
    });
    test("Leverage 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ leverage: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative leverage → invalid", () => {
      const r = calculateMargin(makeInputs({ leverage: -100 }));
      expect(r.valid).toBe(false);
    });
    test("Margin rate 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative margin rate → invalid", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: -1 }));
      expect(r.valid).toBe(false);
    });
    test("Margin rate > 100 → invalid", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 150 }));
      expect(r.valid).toBe(false);
    });
    test("Conversion 0 → invalid", () => {
      const r = calculateMargin(makeInputs({ conversionRate: 0 }));
      expect(r.valid).toBe(false);
    });
    test("Negative conversion → invalid", () => {
      const r = calculateMargin(makeInputs({ conversionRate: -1 }));
      expect(r.valid).toBe(false);
    });
    test("Negative equity → invalid", () => {
      const r = calculateMargin(makeInputs({ equity: -100 }));
      expect(r.valid).toBe(false);
    });
    test("Negative used margin → invalid", () => {
      const r = calculateMargin(makeInputs({ existingUsedMargin: -50 }));
      expect(r.valid).toBe(false);
    });
    test("Max-lots: negative available margin → invalid", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, -100, 1, 0.01, 0.01);
      expect("error" in r).toBe(true);
    });
    test("Max-lots: min lot 0 → error", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 100, 1, 0, 0.01);
      expect("error" in r).toBe(true);
    });
    test("Max-lots: lot step 0 → error", () => {
      const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, 100, 1, 0.01, 0);
      expect("error" in r).toBe(true);
    });
  });

  // ============================================================
  // FLOATING-POINT SAFETY
  // ============================================================
  describe("Floating-Point Safety", () => {
    test("0.1 + 0.2 style artifact avoided in roundTo", () => {
      expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
    });
    test("0.001 lot steps handled", () => {
      const r = calculateMargin(makeInputs({ lots: 0.001, leverage: 100 }));
      expect(r.valid).toBe(true);
      // 0.001 × 100 × 4000 = 400 notional; /100 = 4
      expect(r.marginUSD).toBeCloseTo(4, 8);
    });
    test("Small margin rate 0.1% handled", () => {
      const r = calculateMargin(makeInputs({ method: "MARGIN_RATE", marginRatePercent: 0.1 }));
      expect(r.valid).toBe(true);
      expect(r.marginUSD).toBeCloseTo(4, 8);
    });
    test("Large notional 1 lot at price 5000", () => {
      const r = calculateMargin(makeInputs({ lots: 1.0, goldPrice: 5000, leverage: 100 }));
      expect(r.marginUSD).toBe(5000);
    });
    test("Rounded lots never exceed margin allocation", () => {
      for (let budget = 10; budget <= 1000; budget += 7) {
        const r = calculateMaxLotsFromMargin(4000, 100, "LEVERAGE", 100, undefined, budget, 1, 0.01, 0.01);
        if ("error" in r) continue;
        expect(r.marginUsedAtRounded).toBeLessThanOrEqual(budget + 1e-9);
      }
    });
  });

  // ============================================================
  // MARGIN PER STANDARD LOT SIZES
  // ============================================================
  describe("Margin per 0.01 / 0.10 / 1.00 lot", () => {
    test("0.01 lot margin at 1:100 = $40 (account USD)", () => {
      const r = calculateMargin(makeInputs({ lots: 1.0, leverage: 100 }));
      expect(r.marginPer001Lot).toBeCloseTo(40, 8);
    });
    test("0.10 lot margin at 1:100 = $400", () => {
      const r = calculateMargin(makeInputs({ lots: 1.0, leverage: 100 }));
      expect(r.marginPer010Lot).toBeCloseTo(400, 8);
    });
    test("1.00 lot margin at 1:100 = $4,000", () => {
      const r = calculateMargin(makeInputs({ lots: 1.0, leverage: 100 }));
      expect(r.marginPer100Lot).toBeCloseTo(4000, 8);
    });
  });

  // ============================================================
  // INTEGRATION: full calculateMargin
  // ============================================================
  describe("calculateMargin integration", () => {
    test("Default inputs (0.01 lot, 1:100, $4000) → margin $40", () => {
      const r = calculateMargin(DEFAULT_INPUTS);
      expect(r.valid).toBe(true);
      expect(r.marginUSD).toBe(40);
      expect(r.marginAccount).toBe(40);
      expect(r.exposureOunces).toBe(1);
      expect(r.notionalUSD).toBe(4000);
      expect(r.effectiveLeverage).toBe(100);
      expect(r.equivalentMarginRatePercent).toBe(1);
    });
    test("Account metrics surface when equity + used margin supplied", () => {
      const r = calculateMargin(makeInputs({ equity: 1000, existingUsedMargin: 50 }));
      expect(r.valid).toBe(true);
      expect(r.account).toBeDefined();
      expect(r.account!.newUsedMargin).toBeCloseTo(90, 8);
      expect(r.account!.freeMarginAfter).toBeCloseTo(910, 8);
    });
    test("LEVERAGE_PRESETS correct", () => {
      expect(LEVERAGE_PRESETS).toEqual([20, 30, 50, 100, 200, 500, 1000]);
    });
    test("COMPARISON_LEVERAGES matches presets", () => {
      expect(COMPARISON_LEVERAGES).toEqual([20, 30, 50, 100, 200, 500, 1000]);
    });
  });
});
