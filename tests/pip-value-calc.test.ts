import { describe, test, expect } from "bun:test";
import {
  calculatePipValue,
  validateInputs,
  parseForexPair,
  getDefaultForexPipSize,
  formatMoney,
  DEFAULT_XAUUSD_INPUTS,
  DEFAULT_FOREX_INPUTS,
  type PipValueInputs,
} from "../src/lib/pip-value-calc";

function makeXauInputs(overrides: Partial<PipValueInputs> = {}): PipValueInputs {
  return { ...DEFAULT_XAUUSD_INPUTS, ...overrides };
}
function makeForexInputs(overrides: Partial<PipValueInputs> = {}): PipValueInputs {
  return { ...DEFAULT_FOREX_INPUTS, ...overrides };
}

describe("XAUUSD & Forex Pip Value Calculator", () => {

  // === XAUUSD GOLD TESTS ===
  test("Gold 1.00 lot, $0.01 pip, 100oz, USD = $1/pip", () => {
    const r = calculatePipValue(makeXauInputs());
    expect(r.valid).toBe(true);
    expect(r.pipValueQuoteCurrency).toBe(1);
    expect(r.pipValueAccountCurrency).toBe(1);
    expect(r.pip1).toBe(1);
    expect(r.pip100).toBe(100);
    expect(r.pip500).toBe(500);
  });

  test("Gold 0.10 lot, $0.01 pip = $0.10/pip", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0.10 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(0.1);
    expect(r.pip1).toBe(0.1);
    expect(r.pip100).toBe(10);
  });

  test("Gold 0.01 lot, $0.01 pip = $0.01/pip", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0.01 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(0.01);
    expect(r.pip1).toBe(0.01);
    expect(r.pip100).toBe(1);
  });

  test("Gold 1.00 lot, $0.10 pip = $10/pip", () => {
    const r = calculatePipValue(makeXauInputs({ pipSize: 0.10 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(10);
    expect(r.pip1).toBe(10);
    expect(r.pip100).toBe(1000);
  });

  test("Gold 0.10 lot, $0.10 pip = $1/pip", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0.10, pipSize: 0.10 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(1);
  });

  test("Gold 0.01 lot, $0.10 pip = $0.10/pip", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0.01, pipSize: 0.10 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(0.1);
  });

  test("Gold 100 pips under $0.01 convention = $100 (1 lot)", () => {
    const r = calculatePipValue(makeXauInputs());
    expect(r.pip100).toBe(100);
  });

  test("Gold 100 pips under $0.10 convention = $1000 (1 lot)", () => {
    const r = calculatePipValue(makeXauInputs({ pipSize: 0.10 }));
    expect(r.pip100).toBe(1000);
  });

  // === PRICE DISTANCE ===
  test("Gold price 4300→4305: 500 pips ($0.01), 50 pips ($0.10)", () => {
    const r001 = calculatePipValue(makeXauInputs({ startPrice: 4300, endPrice: 4305 }));
    expect(r001.valid).toBe(true);
    expect(r001.priceDistance!.absoluteDifference).toBe(5);
    expect(r001.priceDistance!.pipCount).toBe(500);

    const r010 = calculatePipValue(makeXauInputs({ pipSize: 0.10, startPrice: 4300, endPrice: 4305 }));
    expect(r010.priceDistance!.pipCount).toBe(50);
  });

  test("Gold monetary value of 4300→4305 with 0.01 lot = $5 regardless of pip convention", () => {
    const r001 = calculatePipValue(makeXauInputs({ lotSize: 0.01, startPrice: 4300, endPrice: 4305 }));
    const r010 = calculatePipValue(makeXauInputs({ lotSize: 0.01, pipSize: 0.10, startPrice: 4300, endPrice: 4305 }));
    // Monetary value must be the same regardless of pip label
    expect(r001.priceDistance!.monetaryValue).toBe(r010.priceDistance!.monetaryValue);
    expect(r001.priceDistance!.monetaryValue).toBe(5); // 0.01 * 100 * 5 = 5
  });

  test("Gold signed P/L: BUY 4300→4305 = +$5, SELL = -$5 (0.01 lot)", () => {
    const buy = calculatePipValue(makeXauInputs({ lotSize: 0.01, startPrice: 4300, endPrice: 4305, direction: "BUY" }));
    const sell = calculatePipValue(makeXauInputs({ lotSize: 0.01, startPrice: 4300, endPrice: 4305, direction: "SELL" }));
    expect(buy.priceDistance!.signedPL).toBe(5);
    expect(sell.priceDistance!.signedPL).toBe(-5);
  });

  // === NON-USD GOLD ===
  test("Gold non-USD account with conversion rate", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: 0.92 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueQuoteCurrency).toBe(1); // USD
    expect(r.pipValueAccountCurrency).toBeCloseTo(0.92, 8);
  });

  test("Gold non-USD account without conversion rate → error", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: null }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("conversion rate");
  });

  // === FOREX TESTS ===
  test("EURUSD 1 lot, 100k, pip 0.0001, USD account = $10/pip", () => {
    const r = calculatePipValue(makeForexInputs());
    expect(r.valid).toBe(true);
    expect(r.pipValueQuoteCurrency).toBe(10);
    expect(r.pipValueAccountCurrency).toBe(10);
  });

  test("USDJPY 1 lot, 100k, pip 0.01, rate 150, USD account ≈ $6.667", () => {
    const r = calculatePipValue(makeForexInputs({
      forexPair: "USDJPY",
      pipSize: 0.01,
      conversionRate: 150.0, // account=base, so rate = pair price
    }));
    expect(r.valid).toBe(true);
    // Pip value in JPY = 1 * 100000 * 0.01 = 1000 JPY
    expect(r.pipValueQuoteCurrency).toBe(1000);
    // Convert: 1000 JPY / 150 = $6.6667
    expect(r.pipValueAccountCurrency).toBeCloseTo(6.6666667, 4);
  });

  test("EURGBP 1 lot, 100k, pip 0.0001, GBP account = £10/pip", () => {
    const r = calculatePipValue(makeForexInputs({
      forexPair: "EURGBP",
      accountCurrency: "GBP",
      conversionRate: null, // quote=account → no conversion needed
    }));
    expect(r.valid).toBe(true);
    expect(r.pipValueQuoteCurrency).toBe(10);
    expect(r.pipValueAccountCurrency).toBe(10);
  });

  test("EURGBP with EUR account, rate 0.85 ≈ €11.7647", () => {
    const r = calculatePipValue(makeForexInputs({
      forexPair: "EURGBP",
      accountCurrency: "EUR",
      conversionRate: 0.85, // pair price: 1 EUR = 0.85 GBP
    }));
    expect(r.valid).toBe(true);
    // Pip value in GBP = 10
    // account = base, so conversion = 1 / 0.85 = 1.17647
    // Pip value in EUR = 10 / 0.85 = 11.7647
    expect(r.pipValueAccountCurrency).toBeCloseTo(11.7647059, 4);
  });

  test("JPY cross with third-currency account (USD account, EURJPY)", () => {
    const r = calculatePipValue(makeForexInputs({
      forexPair: "EURJPY",
      pipSize: 0.01,
      accountCurrency: "USD",
      conversionRate: 0.0067, // 1 JPY = 0.0067 USD
    }));
    expect(r.valid).toBe(true);
    // Pip value in JPY = 1 * 100000 * 0.01 = 1000 JPY
    // In USD = 1000 * 0.0067 = $6.70
    expect(r.pipValueQuoteCurrency).toBe(1000);
    expect(r.pipValueAccountCurrency).toBeCloseTo(6.70, 2);
  });

  // === VALIDATION ===
  test("Zero lot size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Lot size");
  });

  test("Negative lot size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: -1 }));
    expect(r.valid).toBe(false);
  });

  test("Zero contract size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ contractSize: 0 }));
    expect(r.valid).toBe(false);
  });

  test("Zero pip size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ pipSize: 0 }));
    expect(r.valid).toBe(false);
  });

  test("NaN lot size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: NaN }));
    expect(r.valid).toBe(false);
  });

  test("Infinity lot size → invalid", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: Infinity }));
    expect(r.valid).toBe(false);
  });

  test("Invalid forex pair format → invalid", () => {
    const r = calculatePipValue(makeForexInputs({ forexPair: "EUR" }));
    expect(r.valid).toBe(false);
  });

  test("Missing conversion rate for third-currency → error", () => {
    const r = calculatePipValue(makeForexInputs({
      forexPair: "EURJPY",
      accountCurrency: "USD",
      conversionRate: null,
    }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("conversion rate");
  });

  // === HELPER FUNCTIONS ===
  test("parseForexPair: valid pairs", () => {
    expect(parseForexPair("EURUSD")).toEqual({ base: "EUR", quote: "USD" });
    expect(parseForexPair("usdjpy")).toEqual({ base: "USD", quote: "JPY" });
  });

  test("parseForexPair: invalid pairs", () => {
    expect(parseForexPair("EUR")).toBeNull();
    expect(parseForexPair("EURUS")).toBeNull();
    expect(parseForexPair("")).toBeNull();
    expect(parseForexPair("123456")).toBeNull();
  });

  test("getDefaultForexPipSize: JPY pairs = 0.01, others = 0.0001", () => {
    expect(getDefaultForexPipSize("USDJPY")).toBe(0.01);
    expect(getDefaultForexPipSize("EURJPY")).toBe(0.01);
    expect(getDefaultForexPipSize("EURUSD")).toBe(0.0001);
    expect(getDefaultForexPipSize("GBPUSD")).toBe(0.0001);
  });

  test("formatMoney: handles small values without showing $0.00", () => {
    expect(formatMoney(0.01, "USD")).toBe("$0.0100");
    expect(formatMoney(0.001, "USD")).toBe("$0.001000");
    expect(formatMoney(0.0001, "USD")).toBe("$0.000100");
    expect(formatMoney(100, "USD")).toBe("$100.00");
    expect(formatMoney(NaN, "USD")).toBe("—");
  });

  // === SMALL AND LARGE LOTS ===
  test("Very small lot (0.001) produces non-zero result", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 0.001 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(0.001);
    expect(r.pipValueAccountCurrency).toBeGreaterThan(0);
  });

  test("Very large lot (1000) produces correct result", () => {
    const r = calculatePipValue(makeXauInputs({ lotSize: 1000 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(1000);
  });

  // === ALL RESULTS FINITE ===
  test("All result fields are finite for valid inputs", () => {
    const r = calculatePipValue(makeXauInputs());
    expect(r.valid).toBe(true);
    expect(isFinite(r.pipValueQuoteCurrency)).toBe(true);
    expect(isFinite(r.pipValueAccountCurrency)).toBe(true);
    expect(isFinite(r.pip1)).toBe(true);
    expect(isFinite(r.pip100)).toBe(true);
    expect(isFinite(r.pip500)).toBe(true);
    expect(isFinite(r.valuePerStandardLot)).toBe(true);
  });

  // === CUSTOM PIP AND CONTRACT ===
  test("Custom pip size 0.05 for gold", () => {
    const r = calculatePipValue(makeXauInputs({ pipSize: 0.05 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(5); // 1 * 100 * 0.05
  });

  test("Custom contract size 10 for gold", () => {
    const r = calculatePipValue(makeXauInputs({ contractSize: 10 }));
    expect(r.valid).toBe(true);
    expect(r.pipValueAccountCurrency).toBe(0.1); // 1 * 10 * 0.01
  });

  // === CONVERSION DESCRIPTION ===
  test("Conversion description present for non-USD gold account", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: 0.92 }));
    expect(r.valid).toBe(true);
    expect(r.conversionDescription).toContain("USD");
    expect(r.conversionDescription).toContain("EUR");
  });

  test("No conversion description needed for USD gold account", () => {
    const r = calculatePipValue(makeXauInputs());
    expect(r.valid).toBe(true);
    expect(r.conversionDescription).toContain("No conversion");
  });

  // === NON-FINITE PRICE REJECTION (regression) ===
  // Previously, a non-finite startPrice/endPrice was silently ignored:
  // validateInputs skipped it (the `isFinite()` guard short-circuited the
  // whole condition) and calculatePipValue returned valid:true with
  // priceDistance undefined. These tests lock in the new behaviour: a
  // non-finite price is a caller error and must surface as a validation
  // failure.
  test("NaN startPrice -> invalid (not silently ignored)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: NaN, endPrice: 4305 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Starting price");
    expect(r.error).toContain("finite");
    expect(r.priceDistance).toBeUndefined();
  });

  test("Infinity startPrice -> invalid (not silently ignored)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: Infinity, endPrice: 4305 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Starting price");
    expect(r.priceDistance).toBeUndefined();
  });

  test("NaN endPrice -> invalid (not silently ignored)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: 4300, endPrice: NaN }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Ending price");
    expect(r.error).toContain("finite");
    expect(r.priceDistance).toBeUndefined();
  });

  test("Infinity endPrice -> invalid (not silently ignored)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: 4300, endPrice: Infinity }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Ending price");
    expect(r.priceDistance).toBeUndefined();
  });

  test("-Infinity startPrice -> invalid", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: -Infinity, endPrice: 4305 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Starting price");
  });

  test("Both prices NaN -> invalid", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: NaN, endPrice: NaN }));
    expect(r.valid).toBe(false);
  });

  test("validateInputs directly: NaN startPrice returns finite error", () => {
    const err = validateInputs(makeXauInputs({ startPrice: NaN, endPrice: 4305 }));
    expect(err).not.toBeNull();
    expect(err).toContain("finite");
  });

  test("validateInputs directly: Infinity endPrice returns finite error", () => {
    const err = validateInputs(makeXauInputs({ startPrice: 4300, endPrice: Infinity }));
    expect(err).not.toBeNull();
    expect(err).toContain("finite");
  });

  test("Forex mode: NaN startPrice -> invalid", () => {
    const r = calculatePipValue(makeForexInputs({ startPrice: NaN, endPrice: 1.1 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Starting price");
  });

  test("Forex mode: Infinity endPrice -> invalid", () => {
    const r = calculatePipValue(makeForexInputs({ startPrice: 1.1, endPrice: Infinity }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("Ending price");
  });

  // === NON-REGRESSION: finite positive prices still work ===
  test("Finite positive prices still produce priceDistance (no regression)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: 4300, endPrice: 4305 }));
    expect(r.valid).toBe(true);
    expect(r.priceDistance).toBeDefined();
    expect(r.priceDistance!.absoluteDifference).toBe(5);
    expect(r.priceDistance!.pipCount).toBe(500);
    expect(r.priceDistance!.monetaryValue).toBe(500);
  });

  test("Single null price still valid with no priceDistance (no regression)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: 4300, endPrice: null }));
    expect(r.valid).toBe(true);
    expect(r.priceDistance).toBeUndefined();
  });

  test("Both prices null still valid with no priceDistance (no regression)", () => {
    const r = calculatePipValue(makeXauInputs({ startPrice: null, endPrice: null }));
    expect(r.valid).toBe(true);
    expect(r.priceDistance).toBeUndefined();
  });

  // === REDUNDANT CONVERSION-RATE CHECK REMOVED ===
  // The duplicate `!isFinite(conversionRate)` check was removed; the primary
  // check above it still rejects non-finite conversion rates.
  test("Conversion rate NaN still rejected after redundant-check removal", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: NaN }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("finite");
  });

  test("Conversion rate Infinity still rejected after redundant-check removal", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: Infinity }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("finite");
  });

  test("Conversion rate zero still rejected (positive check intact)", () => {
    const r = calculatePipValue(makeXauInputs({ accountCurrency: "EUR", conversionRate: 0 }));
    expect(r.valid).toBe(false);
    expect(r.error).toContain("positive");
  });
});
