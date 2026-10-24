import { describe, test, expect } from "bun:test";
import {
  calculatePositionSize,
  validatePositionSizeInputs,
  calculatePipDistance,
  roundLotsDown,
  roundLotsDownToGrid,
  alignMaxLotToGrid,
  roundTo,
  getPairPreset,
  getDefaultPipSize,
  getQuoteCurrency,
  getConversionDirection,
  PAIR_PRESETS,
  DEFAULT_INPUTS,
  type PositionSizeInputs,
  type Direction,
  type RiskType,
  type CalculatorMode,
} from "../src/lib/forex-position-size-calc";

function makeInputs(overrides: Partial<PositionSizeInputs> = {}): PositionSizeInputs {
  return { ...DEFAULT_INPUTS, ...overrides };
}

describe("Forex Position Size Calculator", () => {

  // ============================================================
  // EXAMPLE A — EUR/USD
  // ============================================================
  describe("Example A — EUR/USD", () => {
    test("$10,000 @ 1%, 20 pip stop, pip value $10 → 0.50 lots, $100 risk", () => {
      const r = calculatePositionSize(makeInputs({
        pair: "EURUSD", accountEquity: 10000, riskPercentage: 1,
        stopLossPips: 20, contractSize: 100000, pipSize: 0.0001,
        conversionRate: 1, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.riskAmount).toBe(100);
      expect(r.pipValuePerLotAccount).toBe(10); // 0.0001 × 100000 × 1
      expect(r.rawLots).toBe(0.5);
      expect(r.brokerLots).toBe(0.5);
      expect(r.moneyAtRisk).toBe(100);
    });
  });

  // ============================================================
  // EXAMPLE B — USD/JPY
  // ============================================================
  describe("Example B — USD/JPY", () => {
    test("USD account, $100 risk, 30 pip stop, rate 150 → 0.50 lots", () => {
      // Pip value per lot in JPY = 0.01 × 100000 = 1000 JPY
      // Pip value in USD = 1000 / 150 = 6.6667
      // Risk per lot = 30 × 6.6667 = 200
      // Lots = 100 / 200 = 0.50
      const r = calculatePositionSize(makeInputs({
        pair: "USDJPY", accountCurrency: "USD", accountEquity: 10000,
        riskType: "FIXED", riskAmount: 100,
        stopLossPips: 30, contractSize: 100000, pipSize: 0.01,
        conversionRate: 1 / 150, // JPY-to-USD: 1 JPY = 1/150 USD
        lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.pipValuePerLotQuote).toBe(1000); // 0.01 × 100000
      expect(r.pipValuePerLotAccount).toBeCloseTo(1000 / 150, 4);
      expect(r.rawLots).toBeCloseTo(0.5, 4);
      expect(r.brokerLots).toBe(0.5);
    });
  });

  // ============================================================
  // EXAMPLE C — EUR/GBP
  // ============================================================
  describe("Example C — EUR/GBP", () => {
    test("USD account, GBP-to-USD rate 1.25, $100 risk, 20 pip stop → 0.40 lots", () => {
      // Pip value per lot in GBP = 0.0001 × 100000 = 10 GBP
      // Pip value in USD = 10 × 1.25 = 12.50 USD
      // Risk per lot = 20 × 12.50 = 250
      // Lots = 100 / 250 = 0.40
      const r = calculatePositionSize(makeInputs({
        pair: "EURGBP", accountCurrency: "USD", accountEquity: 10000,
        riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, contractSize: 100000, pipSize: 0.0001,
        conversionRate: 1.25, // 1 GBP = 1.25 USD
        lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.pipValuePerLotAccount).toBe(12.5);
      expect(r.rawLots).toBe(0.4);
      expect(r.brokerLots).toBe(0.4);
    });
  });

  // ============================================================
  // EXAMPLE D — COMMISSION
  // ============================================================
  describe("Example D — Commission Impact", () => {
    test("$100 risk, 20 pip stop, $10 pip value, $7 commission/lot → 0.48 lots, $99.36 risk", () => {
      // Risk per lot = 20 × 10 + 7 = 207
      // Raw lots = 100 / 207 = 0.48309...
      // Rounded down to 0.48
      // Actual risk = 0.48 × 207 = 99.36
      const r = calculatePositionSize(makeInputs({
        pair: "EURUSD", accountCurrency: "USD", accountEquity: 10000,
        riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, contractSize: 100000, pipSize: 0.0001,
        conversionRate: 1, lotStep: 0.01,
        commissionPerLot: 7,
      }));
      expect(r.valid).toBe(true);
      expect(r.costPerLot).toBe(7);
      expect(r.rawLots).toBeCloseTo(100 / 207, 4);
      expect(r.brokerLots).toBe(0.48);
      expect(r.moneyAtRisk).toBeCloseTo(99.36, 2);
    });
  });

  // ============================================================
  // PIP DISTANCE FROM PRICES
  // ============================================================
  describe("Pip Distance Calculation (Entry/Stop mode)", () => {
    test("BUY: entry 1.1000, stop 1.0980 → 20 pips", () => {
      const r = calculatePipDistance(1.1000, 1.0980, 0.0001, "BUY");
      expect(r.pips).toBeCloseTo(20, 5);
      expect(r.error).toBeUndefined();
    });
    test("SELL: entry 1.1000, stop 1.1020 → 20 pips", () => {
      const r = calculatePipDistance(1.1000, 1.1020, 0.0001, "SELL");
      expect(r.pips).toBeCloseTo(20, 5);
    });
    test("BUY with stop above entry → error", () => {
      const r = calculatePipDistance(1.1000, 1.1020, 0.0001, "BUY");
      expect(r.error).toContain("below");
    });
    test("SELL with stop below entry → error", () => {
      const r = calculatePipDistance(1.1000, 1.0980, 0.0001, "SELL");
      expect(r.error).toContain("above");
    });
    test("Same entry and stop → error", () => {
      const r = calculatePipDistance(1.1000, 1.1000, 0.0001, "BUY");
      expect(r.error).toContain("same");
    });
    test("JPY pair: entry 150.00, stop 149.70 → 30 pips", () => {
      const r = calculatePipDistance(150.00, 149.70, 0.01, "BUY");
      expect(r.pips).toBeCloseTo(30, 5);
    });
  });

  // ============================================================
  // BROKER ROUNDING
  // ============================================================
  describe("Broker Lot Rounding", () => {
    test("Round down to 0.01 step", () => {
      expect(roundLotsDown(0.48309, 0.01)).toBe(0.48);
    });
    test("Exact multiple unchanged", () => {
      expect(roundLotsDown(0.50, 0.01)).toBe(0.5);
    });
    test("Below step → 0", () => {
      expect(roundLotsDown(0.005, 0.01)).toBe(0);
    });
    test("0.001 step", () => {
      expect(roundLotsDown(0.4835, 0.001)).toBe(0.483);
    });
    test("Float artifact 0.30000000000000004 → 0.30", () => {
      expect(roundLotsDown(0.30000000000000004, 0.01)).toBe(0.3);
    });
    test("Never exceeds input", () => {
      for (let i = 1; i <= 100; i++) {
        const lots = i / 100 + 0.007;
        const rounded = roundLotsDown(lots, 0.01);
        expect(rounded).toBeLessThanOrEqual(lots + 1e-9);
      }
    });
  });

  // ============================================================
  // MINIMUM LOT ABOVE RISK BUDGET
  // ============================================================
  describe("Minimum Lot Above Risk Budget", () => {
    test("Min lot 1.00, calculated 0.05 → no valid position", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 100, riskPercentage: 1, stopLossPips: 20,
        minLot: 1.0, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.brokerLots).toBeLessThan(1.0);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerMessage).toContain("below the broker minimum");
    });
  });

  // ============================================================
  // MAXIMUM LOT RESTRICTION
  // ============================================================
  describe("Maximum Lot Restriction", () => {
    test("Calculated exceeds max → capped", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 1000000, riskPercentage: 10, stopLossPips: 10,
        maxLot: 10, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerMessage).toContain("exceeds broker maximum");
    });
  });

  // ============================================================
  // VALIDATION
  // ============================================================
  describe("Validation", () => {
    test("Zero equity → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ accountEquity: 0 }))).not.toBeNull();
    });
    test("Negative equity → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ accountEquity: -100 }))).not.toBeNull();
    });
    test("Zero risk percentage → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ riskPercentage: 0 }))).not.toBeNull();
    });
    test("Risk percentage > 100 → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ riskPercentage: 150 }))).not.toBeNull();
    });
    test("Zero fixed risk → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ riskType: "FIXED", riskAmount: 0 }))).not.toBeNull();
    });
    test("Zero stop-loss pips → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ stopLossPips: 0 }))).not.toBeNull();
    });
    test("Negative stop-loss pips → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ stopLossPips: -10 }))).not.toBeNull();
    });
    test("Zero contract size → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ contractSize: 0 }))).not.toBeNull();
    });
    test("Zero pip size → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ pipSize: 0 }))).not.toBeNull();
    });
    test("Zero conversion rate → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ conversionRate: 0 }))).not.toBeNull();
    });
    test("Negative commission → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ commissionPerLot: -5 }))).not.toBeNull();
    });
    test("Negative slippage → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ slippagePips: -1 }))).not.toBeNull();
    });
    test("Min lot > max lot → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ minLot: 10, maxLot: 1 }))).not.toBeNull();
    });
    test("NaN equity → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ accountEquity: NaN }))).not.toBeNull();
    });
    test("Infinity equity → invalid", () => {
      expect(validatePositionSizeInputs(makeInputs({ accountEquity: Infinity }))).not.toBeNull();
    });
    test("Valid inputs → null", () => {
      expect(validatePositionSizeInputs(DEFAULT_INPUTS)).toBeNull();
    });
  });

  // ============================================================
  // CONVERSION DIRECTION
  // ============================================================
  describe("Conversion Direction", () => {
    test("EUR/USD with USD account → no conversion", () => {
      expect(getConversionDirection("EURUSD", "USD")).toBe("");
    });
    test("EUR/GBP with USD account → GBP-to-USD", () => {
      const dir = getConversionDirection("EURGBP", "USD");
      expect(dir).toContain("GBP");
      expect(dir).toContain("USD");
    });
    test("USD/JPY with USD account → base = account, enter 1/price", () => {
      const dir = getConversionDirection("USDJPY", "USD");
      expect(dir).toContain("1 divided by");
    });
    test("EUR/USD with EUR account → base = account, enter 1/price", () => {
      const dir = getConversionDirection("EURUSD", "EUR");
      expect(dir).toContain("1 divided by");
    });
  });

  // ============================================================
  // PAIR PRESETS
  // ============================================================
  describe("Pair Presets", () => {
    test("EURUSD preset correct", () => {
      const p = getPairPreset("EURUSD");
      expect(p).not.toBeNull();
      expect(p!.pipSize).toBe(0.0001);
      expect(p!.contractSize).toBe(100000);
      expect(p!.quoteCurrency).toBe("USD");
    });
    test("USDJPY preset has 0.01 pip size", () => {
      const p = getPairPreset("USDJPY");
      expect(p!.pipSize).toBe(0.01);
    });
    test("Default pip size for JPY pair", () => {
      expect(getDefaultPipSize("GBPJPY")).toBe(0.01);
    });
    test("Default pip size for non-JPY pair", () => {
      expect(getDefaultPipSize("EURUSD")).toBe(0.0001);
    });
    test("Quote currency extraction", () => {
      expect(getQuoteCurrency("EURUSD")).toBe("USD");
      expect(getQuoteCurrency("GBPJPY")).toBe("JPY");
    });
    test("At least 15 presets", () => {
      expect(PAIR_PRESETS.length).toBeGreaterThanOrEqual(15);
    });
  });

  // ============================================================
  // PERCENTAGE VS FIXED RISK
  // ============================================================
  describe("Percentage vs Fixed Risk", () => {
    test("Percentage risk: 1% of $10,000 = $100", () => {
      const r = calculatePositionSize(makeInputs({
        riskType: "PERCENTAGE", riskPercentage: 1, accountEquity: 10000,
      }));
      expect(r.riskAmount).toBe(100);
    });
    test("Fixed risk: $250", () => {
      const r = calculatePositionSize(makeInputs({
        riskType: "FIXED", riskAmount: 250, accountEquity: 10000,
      }));
      expect(r.riskAmount).toBe(250);
      expect(r.riskPercentage).toBe(2.5);
    });
  });

  // ============================================================
  // SLIPPAGE
  // ============================================================
  describe("Slippage Impact", () => {
    test("Slippage increases risk per lot", () => {
      const rNoSlip = calculatePositionSize(makeInputs({
        riskType: "FIXED", riskAmount: 100, stopLossPips: 20,
      }));
      const rWithSlip = calculatePositionSize(makeInputs({
        riskType: "FIXED", riskAmount: 100, stopLossPips: 20,
        slippagePips: 2,
      }));
      expect(rWithSlip.costPerLot).toBeGreaterThan(rNoSlip.costPerLot);
      expect(rWithSlip.rawLots).toBeLessThan(rNoSlip.rawLots);
    });
  });

  // ============================================================
  // CUSTOM CONTRACT SIZE
  // ============================================================
  describe("Custom Contract Size", () => {
    test("10,000 units per lot (mini account)", () => {
      const r = calculatePositionSize(makeInputs({
        contractSize: 10000, accountEquity: 10000, riskPercentage: 1,
        stopLossPips: 20, conversionRate: 1,
      }));
      expect(r.valid).toBe(true);
      // Pip value per lot = 0.0001 × 10000 = 1
      expect(r.pipValuePerLotAccount).toBe(1);
      // Risk per lot = 20 × 1 = 20
      // Lots = 100 / 20 = 5
      expect(r.rawLots).toBe(5);
    });
  });

  // ============================================================
  // LOT EQUIVALENTS
  // ============================================================
  describe("Lot Equivalents", () => {
    test("0.50 lots → 50,000 units, 5 mini, 50 micro", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskPercentage: 1, stopLossPips: 20,
      }));
      expect(r.brokerLots).toBe(0.5);
      expect(r.baseCurrencyUnits).toBe(50000);
      expect(r.miniLots).toBe(5);
      expect(r.microLots).toBe(50);
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
      const r = calculatePositionSize(makeInputs());
      expect(isFinite(r.riskAmount)).toBe(true);
      expect(isFinite(r.rawLots)).toBe(true);
      expect(isFinite(r.brokerLots)).toBe(true);
      expect(isFinite(r.moneyAtRisk)).toBe(true);
    });
  });

  // ============================================================
  // BREAKDOWN COMPLETENESS
  // ============================================================
  describe("Calculation Breakdown", () => {
    test("Breakdown has multiple steps", () => {
      const r = calculatePositionSize(makeInputs());
      expect(r.valid).toBe(true);
      expect(r.breakdown.length).toBeGreaterThanOrEqual(10);
    });
    test("Breakdown includes key labels", () => {
      const r = calculatePositionSize(makeInputs());
      const labels = r.breakdown.map((s) => s.label);
      expect(labels).toContain("Account Equity");
      expect(labels).toContain("Risk Amount");
      expect(labels).toContain("Pip Value per Lot (account)");
      expect(labels).toContain("Raw Lot Size");
      expect(labels).toContain("Rounded Lot Size (grid-aligned)");
      expect(labels).toContain("Money at Risk");
    });
  });

  // ============================================================
  // ENTRY/STOP MODE INTEGRATION
  // ============================================================
  describe("Entry/Stop Mode Integration", () => {
    test("BUY entry 1.1000, stop 1.0980 → 20 pips, same as manual", () => {
      const r = calculatePositionSize(makeInputs({
        mode: "ENTRY_STOP",
        pair: "EURUSD", entryPrice: 1.1000, stopLossPrice: 1.0980,
        stopLossPips: 0, // will be calculated from prices
      }));
      expect(r.valid).toBe(true);
      expect(r.calculatedPipDistance).toBeCloseTo(20, 5);
      expect(r.stopLossPips).toBeCloseTo(20, 5);
      expect(r.brokerLots).toBe(0.5);
    });
    test("SELL entry 150.00, stop 150.30 (JPY) → 30 pips", () => {
      const r = calculatePositionSize(makeInputs({
        mode: "ENTRY_STOP", pair: "USDJPY", direction: "SELL",
        entryPrice: 150.00, stopLossPrice: 150.30,
        stopLossPips: 0, pipSize: 0.01, conversionRate: 1 / 150,
      }));
      expect(r.valid).toBe(true);
      expect(r.calculatedPipDistance).toBeCloseTo(30, 5);
    });
  });

  // ============================================================
  // REGRESSION: CONVERSION DIRECTION ACCURACY
  // ============================================================
  describe("Conversion Direction Accuracy", () => {
    test("USD/JPY with USD account: instructs 1/price, not the price itself", () => {
      const dir = getConversionDirection("USDJPY", "USD");
      expect(dir).toContain("1 divided by");
      expect(dir).toContain("USDJPY");
      expect(dir).not.toContain("Use the current");
      // Should mention the example rate
      expect(dir).toContain("0.006"); // 1/150 ≈ 0.00667
    });

    test("EUR/USD with USD account: no conversion needed", () => {
      expect(getConversionDirection("EURUSD", "USD")).toBe("");
    });

    test("EUR/GBP with USD account: GBP-to-USD rate", () => {
      const dir = getConversionDirection("EURGBP", "USD");
      expect(dir).toContain("GBP");
      expect(dir).toContain("USD");
      expect(dir).toContain("how many USD per 1 GBP");
    });

    test("EUR/USD with EUR account: 1/price instruction", () => {
      const dir = getConversionDirection("EURUSD", "EUR");
      expect(dir).toContain("1 divided by");
      expect(dir).toContain("EURUSD");
    });

    test("USD/JPY with JPY account: no conversion needed", () => {
      expect(getConversionDirection("USDJPY", "JPY")).toBe("");
    });

    test("USD/JPY with GBP account: JPY-to-GBP rate", () => {
      const dir = getConversionDirection("USDJPY", "GBP");
      expect(dir).toContain("JPY");
      expect(dir).toContain("GBP");
      expect(dir).toContain("how many GBP per 1 JPY");
    });
  });

  // ============================================================
  // REGRESSION: BROKER MAXIMUM LOT DISPLAY
  // ============================================================
  describe("Broker Maximum Lot Display Consistency", () => {
    test("When capped at max, brokerLots = effectiveLots = maxLot", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 1000000, riskPercentage: 50, stopLossPips: 10,
        maxLot: 5, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerLots).toBe(5); // capped at max
      // All outputs should use the capped (effective) size
      expect(r.baseCurrencyUnits).toBe(5 * 100000);
      expect(r.miniLots).toBe(50);
      expect(r.microLots).toBe(500);
      expect(r.pipValueAtSize).toBe(5 * 10); // 5 lots × $10/pip
    });

    test("Below min lot: brokerLots = 0, no invalid recommendation", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 100, riskPercentage: 0.1, stopLossPips: 200,
        minLot: 1.0, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerLots).toBe(0);
      expect(r.moneyAtRisk).toBe(0);
      expect(r.pipValueAtSize).toBe(0);
      expect(r.baseCurrencyUnits).toBe(0);
    });

    test("Within limits: brokerLots = effectiveLots (no cap needed)", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskPercentage: 1, stopLossPips: 20,
        maxLot: 100, minLot: 0.01, lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(true);
      expect(r.brokerLots).toBe(0.5);
      expect(r.brokerLots).toBe(r.rawLots > r.brokerLots ? r.brokerLots : r.rawLots);
    });
  });

  // ============================================================
  // REGRESSION: ADDITIONAL COSTS AS FLAT TRADE COST
  // ============================================================
  describe("Additional Costs as Flat Trade Cost", () => {
    test("Flat cost subtracted from risk budget before lot calculation", () => {
      const rNoCost = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 0,
      }));
      const rWithCost = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 20,
      }));
      // With $20 flat cost, available budget = $80, not $100
      // Risk per lot = 20 × $10 = $200
      // Lots without cost = 100/200 = 0.50
      // Lots with cost = 80/200 = 0.40
      expect(rNoCost.brokerLots).toBe(0.5);
      expect(rWithCost.brokerLots).toBe(0.4);
    });

    test("Flat cost included in total money at risk", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 20,
      }));
      // 0.40 lots × $200/lot + $20 flat = $80 + $20 = $100
      expect(r.moneyAtRisk).toBeCloseTo(100, 2);
    });

    test("Flat cost does not inflate per-lot cost", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 20,
      }));
      // costPerLot should only include commission + slippage, NOT additionalCosts
      expect(r.costPerLot).toBe(0); // no commission or slippage set
    });

    test("Flat cost exceeding risk budget → zero lots", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 50,
        stopLossPips: 20, additionalCosts: 60,
      }));
      // Available budget = max(0, 50 - 60) = 0 → 0 lots
      expect(r.rawLots).toBe(0);
      expect(r.brokerLots).toBe(0);
    });
  });

  // ============================================================
  // REGRESSION: CONVERSION RATE EDGE CASES
  // ============================================================
  describe("Conversion Rate Edge Cases", () => {
    test("USD/JPY at 150 with 1/150 rate produces correct pip value", () => {
      const r = calculatePositionSize(makeInputs({
        pair: "USDJPY", accountCurrency: "USD",
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 30, pipSize: 0.01, contractSize: 100000,
        conversionRate: 1 / 150, // JPY→USD = 0.00667
        lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.pipValuePerLotAccount).toBeCloseTo(1000 / 150, 4);
      expect(r.brokerLots).toBe(0.5);
    });

    test("EUR/GBP with USD account at rate 1.25 produces correct pip value", () => {
      const r = calculatePositionSize(makeInputs({
        pair: "EURGBP", accountCurrency: "USD",
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, pipSize: 0.0001, contractSize: 100000,
        conversionRate: 1.25, // GBP→USD
        lotStep: 0.01,
      }));
      expect(r.valid).toBe(true);
      expect(r.pipValuePerLotAccount).toBe(12.5);
      expect(r.brokerLots).toBe(0.4);
    });

    test("Zero conversion rate → invalid", () => {
      const r = calculatePositionSize(makeInputs({
        pair: "USDJPY", accountCurrency: "USD",
        conversionRate: 0,
      }));
      expect(r.valid).toBe(false);
    });
  });

  // ============================================================
  // REGRESSION: BROKER VOLUME GRID ALIGNMENT
  // ============================================================
  describe("Broker Volume Grid Alignment", () => {
    test("roundLotsDownToGrid: min=0.03, step=0.02, lots=0.075 → 0.07", () => {
      expect(roundLotsDownToGrid(0.075, 0.03, 0.02)).toBe(0.07);
    });
    test("roundLotsDownToGrid: min=0.03, step=0.02, lots=0.07 → 0.07", () => {
      expect(roundLotsDownToGrid(0.07, 0.03, 0.02)).toBe(0.07);
    });
    test("roundLotsDownToGrid: min=0.03, step=0.02, lots=0.05 → 0.05", () => {
      expect(roundLotsDownToGrid(0.05, 0.03, 0.02)).toBe(0.05);
    });
    test("roundLotsDownToGrid: min=0.03, step=0.02, lots=0.03 → 0.03 (exact minimum)", () => {
      expect(roundLotsDownToGrid(0.03, 0.03, 0.02)).toBe(0.03);
    });
    test("roundLotsDownToGrid: below minimum → 0", () => {
      expect(roundLotsDownToGrid(0.02, 0.03, 0.02)).toBe(0);
    });
    test("roundLotsDownToGrid: min=0.01, step=0.01, lots=0.50 → 0.50 (standard)", () => {
      expect(roundLotsDownToGrid(0.50, 0.01, 0.01)).toBe(0.5);
    });
    test("roundLotsDownToGrid: float artifact 0.30000000000000004, min=0, step=0.01 → 0.30", () => {
      expect(roundLotsDownToGrid(0.30000000000000004, 0, 0.01)).toBe(0.3);
    });

    test("alignMaxLotToGrid: max=10, min=0.03, step=0.02 → 10.03... no, 10 rounded to grid", () => {
      // 0.03 + n*0.02 = 10 → n = (10-0.03)/0.02 = 498.5 → floor = 498 → 0.03 + 498*0.02 = 9.99
      const aligned = alignMaxLotToGrid(10, 0.03, 0.02);
      expect(aligned).toBe(9.99);
      expect(aligned).toBeLessThanOrEqual(10);
    });
    test("alignMaxLotToGrid: max=100, min=0.01, step=0.01 → 100 (already aligned)", () => {
      expect(alignMaxLotToGrid(100, 0.01, 0.01)).toBe(100);
    });
    test("alignMaxLotToGrid: max < min → 0", () => {
      expect(alignMaxLotToGrid(0.005, 0.01, 0.01)).toBe(0);
    });

    test("Full calc: min=0.03, step=0.02 → lots align to 0.03, 0.05, 0.07...", () => {
      // $10,000 @ 1%, 20 pip stop, pip value $10 → risk per lot = $200
      // Risk amount = $100 → raw lots = 0.50
      // Grid: 0.03 + n*0.02 → 0.03, 0.05, ..., 0.49 (n=23)
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskPercentage: 1, stopLossPips: 20,
        minLot: 0.03, lotStep: 0.02, maxLot: 100,
      }));
      expect(r.valid).toBe(true);
      // 0.03 + 23*0.02 = 0.49
      expect(r.brokerLots).toBe(0.49);
    });

    test("Full calc: min=0.03, step=0.02, raw=0.075 → 0.07", () => {
      // Tune so rawLots ≈ 0.075
      // risk per lot = 20 × $10 = $200; rawLots = riskAmount / 200 = 0.075 → riskAmount = $15
      const r = calculatePositionSize(makeInputs({
        accountEquity: 1500, riskType: "PERCENTAGE", riskPercentage: 1,
        stopLossPips: 20, minLot: 0.03, lotStep: 0.02, maxLot: 100,
      }));
      expect(r.valid).toBe(true);
      // riskAmount = $15, rawLots = 15/200 = 0.075
      expect(r.rawLots).toBeCloseTo(0.075, 4);
      // Grid-aligned: 0.03 + 2*0.02 = 0.07
      expect(r.brokerLots).toBe(0.07);
    });
  });

  // ============================================================
  // REGRESSION: FLAT COSTS EXCEEDING RISK BUDGET
  // ============================================================
  describe("Flat Costs Exceeding Risk Budget", () => {
    test("Flat costs > risk budget → zero lots, valid result with warning", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 50,
        stopLossPips: 20, additionalCosts: 60,
      }));
      expect(r.valid).toBe(true);
      expect(r.brokerLots).toBe(0);
      expect(r.moneyAtRisk).toBe(0); // no trade → no risk
      expect(r.pipValueAtSize).toBe(0);
      expect(r.baseCurrencyUnits).toBe(0);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerMessage).toContain("consume the entire risk budget");
    });

    test("Flat costs = risk budget → zero lots (boundary)", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 100,
      }));
      expect(r.valid).toBe(true);
      expect(r.brokerLots).toBe(0);
      expect(r.moneyAtRisk).toBe(0);
      expect(r.brokerMessage).toContain("consume the entire risk budget");
    });

    test("Flat costs just below budget → small position possible", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 100,
        stopLossPips: 20, additionalCosts: 80,
      }));
      // Available = 20, risk per lot = 200, raw = 0.1
      expect(r.valid).toBe(true);
      expect(r.rawLots).toBeCloseTo(0.1, 4);
      expect(r.brokerLots).toBe(0.1);
      // moneyAtRisk = 0.1 × 200 + 80 = 100
      expect(r.moneyAtRisk).toBeCloseTo(100, 2);
    });

    test("Zero position: unusedRiskBudget = full risk amount (not reduced by flat costs)", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 50,
        stopLossPips: 20, additionalCosts: 60,
      }));
      // No trade recommended → unused budget = full risk amount
      expect(r.unusedRiskBudget).toBe(50);
    });

    test("All displayed values consistent when zero position", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000, riskType: "FIXED", riskAmount: 50,
        stopLossPips: 20, additionalCosts: 60,
      }));
      expect(r.brokerLots).toBe(0);
      expect(r.moneyAtRisk).toBe(0);
      expect(r.pipValueAtSize).toBe(0);
      expect(r.estimatedStopLossAmount).toBe(0);
      expect(r.baseCurrencyUnits).toBe(0);
      expect(r.miniLots).toBe(0);
      expect(r.microLots).toBe(0);
      expect(r.unusedRiskBudget).toBe(50);
    });
  });

  // ============================================================
  // REGRESSION: NON-ALIGNED MAXIMUM LOT
  // ============================================================
  describe("Non-Aligned Maximum Lot", () => {
    test("maxLot not on grid → capped to highest grid point", () => {
      // min=0.01, step=0.01, max=10.005 → aligned max = 10.00
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000000, riskPercentage: 50, stopLossPips: 10,
        minLot: 0.01, lotStep: 0.01, maxLot: 10.005,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(false);
      // Should be capped at 10.00 (highest grid point ≤ 10.005)
      expect(r.brokerLots).toBe(10);
      expect(r.brokerLots).toBeLessThanOrEqual(10.005);
    });

    test("maxLot on grid → no alignment needed", () => {
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000000, riskPercentage: 50, stopLossPips: 10,
        minLot: 0.01, lotStep: 0.01, maxLot: 10,
      }));
      expect(r.valid).toBe(true);
      expect(r.brokerLots).toBe(10);
    });

    test("Non-aligned max with min offset: min=0.03, step=0.02, max=9.995", () => {
      // Grid: 0.03, 0.05, ..., 0.03 + n*0.02
      // 0.03 + 498*0.02 = 9.99; 0.03 + 499*0.02 = 10.01 > 9.995
      // So aligned max = 9.99
      const r = calculatePositionSize(makeInputs({
        accountEquity: 10000000, riskPercentage: 50, stopLossPips: 10,
        minLot: 0.03, lotStep: 0.02, maxLot: 9.995,
      }));
      expect(r.valid).toBe(true);
      expect(r.withinBrokerLimits).toBe(false);
      expect(r.brokerLots).toBe(9.99);
    });
  });
});
