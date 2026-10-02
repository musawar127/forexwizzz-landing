/**
 * XAUUSD & Forex Pip Value Calculator — Pure Calculation Module
 *
 * Contains all mathematical logic for pip value calculations.
 * No React dependencies — pure TypeScript, testable independently.
 */

export type InstrumentMode = "XAUUSD" | "FOREX";

export interface PipValueInputs {
  mode: InstrumentMode;
  /** Lot size (e.g. 0.01, 0.10, 1.00) */
  lotSize: number;
  /** Contract size: ounces per lot for gold, units per lot for forex */
  contractSize: number;
  /** Pip size: 0.01 or 0.10 for gold, 0.0001 or 0.01 for forex */
  pipSize: number;
  /** Account currency code (e.g. "USD", "EUR", "GBP", "JPY") */
  accountCurrency: string;
  /** For forex: the currency pair (e.g. "EURUSD") */
  forexPair?: string;
  /** For forex: base currency (derived from pair) */
  baseCurrency?: string;
  /** For forex: quote currency (derived from pair) */
  quoteCurrency?: string;
  /** Reference exchange rate for conversion (meaning depends on case) */
  conversionRate?: number | null;
  /** Optional: starting price for price-distance calculation */
  startPrice?: number | null;
  /** Optional: ending price for price-distance calculation */
  endPrice?: number | null;
  /** Optional: direction for signed P/L */
  direction?: "BUY" | "SELL" | null;
}

export interface PipValueResult {
  valid: boolean;
  error?: string;
  /** Value of 1 pip in quote currency (or USD for gold) */
  pipValueQuoteCurrency: number;
  /** Value of 1 pip in account currency */
  pipValueAccountCurrency: number;
  /** Total contract exposure */
  contractExposure: number;
  /** Pip values at various counts */
  pip1: number;
  pip10: number;
  pip50: number;
  pip100: number;
  pip500: number;
  /** Value per standard lot (1.00 lot) in account currency */
  valuePerStandardLot: number;
  /** Applied conversion rate (1 quote currency unit = X account currency units) */
  appliedConversionRate: number;
  /** Conversion description */
  conversionDescription: string;
  /** Price distance results (if prices provided) */
  priceDistance?: {
    absoluteDifference: number;
    pipCount: number;
    monetaryValue: number;
    signedPL: number;
  };
}

/**
 * Parses a forex pair string into base and quote currencies.
 * "EURUSD" → { base: "EUR", quote: "USD" }
 */
export function parseForexPair(pair: string): { base: string; quote: string } | null {
  if (!pair || pair.length !== 6) return null;
  const base = pair.substring(0, 3).toUpperCase();
  const quote = pair.substring(3, 6).toUpperCase();
  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(quote)) return null;
  return { base, quote };
}

/**
 * Determines the default pip size for a forex pair.
 * JPY-quoted pairs use 0.01; all others use 0.0001.
 */
export function getDefaultForexPipSize(pair: string): number {
  const parsed = parseForexPair(pair);
  if (!parsed) return 0.0001;
  return parsed.quote === "JPY" ? 0.01 : 0.0001;
}

/**
 * Validates inputs and returns an error message, or null if valid.
 */
export function validateInputs(inputs: PipValueInputs): string | null {
  const { mode, lotSize, contractSize, pipSize, accountCurrency, forexPair, conversionRate } = inputs;

  if (!isFinite(lotSize) || lotSize <= 0) {
    return "Lot size must be a positive number.";
  }
  if (!isFinite(contractSize) || contractSize <= 0) {
    return "Contract size must be a positive number.";
  }
  if (!isFinite(pipSize) || pipSize <= 0) {
    return "Pip size must be a positive number.";
  }
  if (!accountCurrency || accountCurrency.length !== 3) {
    return "Account currency must be a 3-letter code (e.g. USD, EUR).";
  }

  if (mode === "FOREX") {
    if (!forexPair || forexPair.length !== 6) {
      return "Forex pair must be a 6-character code (e.g. EURUSD).";
    }
    const parsed = parseForexPair(forexPair);
    if (!parsed) {
      return "Invalid forex pair format. Use a 6-letter code like EURUSD.";
    }
  }

  // Validate conversion rate if provided
  if (conversionRate != null) {
    if (!isFinite(conversionRate)) {
      return "Conversion rate must be a finite number.";
    }
    if (conversionRate <= 0) {
      return "Conversion rate must be positive.";
    }
  }

  // Validate optional prices.
  // Explicitly reject non-finite values (NaN, +/-Infinity) rather than
  // silently skipping the price-distance calculation. A non-finite price
  // is a caller error and must surface as a validation failure.
  if (inputs.startPrice != null) {
    if (!isFinite(inputs.startPrice)) {
      return "Starting price must be a finite number.";
    }
    if (inputs.startPrice <= 0) {
      return "Starting price must be a positive number.";
    }
  }
  if (inputs.endPrice != null) {
    if (!isFinite(inputs.endPrice)) {
      return "Ending price must be a finite number.";
    }
    if (inputs.endPrice <= 0) {
      return "Ending price must be a positive number.";
    }
  }

  return null;
}

/**
 * Main calculation function.
 */
export function calculatePipValue(inputs: PipValueInputs): PipValueResult {
  const validationError = validateInputs(inputs);
  if (validationError) {
    return {
      valid: false,
      error: validationError,
      pipValueQuoteCurrency: 0,
      pipValueAccountCurrency: 0,
      contractExposure: 0,
      pip1: 0, pip10: 0, pip50: 0, pip100: 0, pip500: 0,
      valuePerStandardLot: 0,
      appliedConversionRate: 0,
      conversionDescription: "",
    };
  }

  const { mode, lotSize, contractSize, pipSize, accountCurrency } = inputs;
  const acctCurr = accountCurrency.toUpperCase();

  // Determine quote currency
  let quoteCurrency: string;
  if (mode === "XAUUSD") {
    quoteCurrency = "USD";
  } else {
    const parsed = parseForexPair(inputs.forexPair!);
    quoteCurrency = parsed!.quote;
  }

  // 1. Pip value in quote currency
  // Pip Value (quote) = Lots × Contract Size × Pip Size
  const pipValueQuote = lotSize * contractSize * pipSize;

  // 2. Contract exposure
  const contractExposure = lotSize * contractSize;

  // 3. Convert to account currency
  let conversionRate = 1;
  let conversionDescription = "";
  let needsConversion = false;

  if (quoteCurrency === acctCurr) {
    // Case A: No conversion needed
    conversionRate = 1;
    conversionDescription = `Quote currency (${quoteCurrency}) equals account currency (${acctCurr}). No conversion required.`;
  } else if (mode === "XAUUSD") {
    // Gold: quote is always USD. Non-USD account needs USD-to-account rate.
    needsConversion = true;
    if (inputs.conversionRate != null && isFinite(inputs.conversionRate) && inputs.conversionRate > 0) {
      conversionRate = inputs.conversionRate;
      conversionDescription = `1 USD = ${conversionRate} ${acctCurr} (manually supplied).`;
    } else {
      return {
        valid: false,
        error: `A USD-to-${acctCurr} conversion rate is required for ${acctCurr} accounts. Please enter a positive conversion rate.`,
        pipValueQuoteCurrency: pipValueQuote,
        pipValueAccountCurrency: 0,
        contractExposure,
        pip1: 0, pip10: 0, pip50: 0, pip100: 0, pip500: 0,
        valuePerStandardLot: 0,
        appliedConversionRate: 0,
        conversionDescription: "",
      };
    }
  } else {
    // Forex mode
    const baseCurrency = parseForexPair(inputs.forexPair!)!.base;

    if (baseCurrency === acctCurr) {
      // Case B: Account = base currency. Need the current pair price.
      needsConversion = true;
      if (inputs.conversionRate != null && isFinite(inputs.conversionRate) && inputs.conversionRate > 0) {
        // conversionRate = the pair's current price (quote per base)
        // Pip value in quote / pair price = pip value in base = account currency
        conversionRate = 1 / inputs.conversionRate;
        conversionDescription = `1 ${quoteCurrency} = ${conversionRate.toFixed(8)} ${acctCurr} (derived from pair price ${inputs.conversionRate} ${quoteCurrency}/${acctCurr}).`;
      } else {
        return {
          valid: false,
          error: `Account currency (${acctCurr}) equals the base currency (${baseCurrency}). A reference ${inputs.forexPair} exchange rate is required for conversion.`,
          pipValueQuoteCurrency: pipValueQuote,
          pipValueAccountCurrency: 0,
          contractExposure,
          pip1: 0, pip10: 0, pip50: 0, pip100: 0, pip500: 0,
          valuePerStandardLot: 0,
          appliedConversionRate: 0,
          conversionDescription: "",
        };
      }
    } else {
      // Case C: Account is a third currency. Need quote-to-account rate.
      needsConversion = true;
      if (inputs.conversionRate != null && isFinite(inputs.conversionRate) && inputs.conversionRate > 0) {
        conversionRate = inputs.conversionRate;
        conversionDescription = `1 ${quoteCurrency} = ${conversionRate} ${acctCurr} (manually supplied).`;
      } else {
        return {
          valid: false,
          error: `Account currency (${acctCurr}) differs from both base (${baseCurrency}) and quote (${quoteCurrency}). A ${quoteCurrency}-to-${acctCurr} conversion rate is required.`,
          pipValueQuoteCurrency: pipValueQuote,
          pipValueAccountCurrency: 0,
          contractExposure,
          pip1: 0, pip10: 0, pip50: 0, pip100: 0, pip500: 0,
          valuePerStandardLot: 0,
          appliedConversionRate: 0,
          conversionDescription: "",
        };
      }
    }
  }

  // 4. Pip value in account currency
  const pipValueAcct = pipValueQuote * conversionRate;

  // 5. Value per standard lot (1.00 lot in account currency)
  const valuePerStandardLot = contractSize * pipSize * conversionRate;

  // 6. Pip values at various counts
  const pip1 = pipValueAcct;
  const pip10 = pipValueAcct * 10;
  const pip50 = pipValueAcct * 50;
  const pip100 = pipValueAcct * 100;
  const pip500 = pipValueAcct * 500;

  // 7. Price distance calculation (optional)
  let priceDistance: PipValueResult["priceDistance"] | undefined;
  if (inputs.startPrice != null && inputs.endPrice != null &&
      isFinite(inputs.startPrice) && isFinite(inputs.endPrice) &&
      inputs.startPrice > 0 && inputs.endPrice > 0) {
    const absDiff = Math.abs(inputs.endPrice - inputs.startPrice);
    const pipCount = pipSize > 0 ? absDiff / pipSize : 0;
    const monetaryValue = absDiff * contractExposure * (mode === "XAUUSD" ? conversionRate : conversionRate);
    const direction = inputs.direction || "BUY";
    const signedPL = direction === "BUY"
      ? (inputs.endPrice - inputs.startPrice) * contractExposure * conversionRate
      : (inputs.startPrice - inputs.endPrice) * contractExposure * conversionRate;

    priceDistance = {
      absoluteDifference: absDiff,
      pipCount,
      monetaryValue,
      signedPL,
    };
  }

  return {
    valid: true,
    pipValueQuoteCurrency: pipValueQuote,
    pipValueAccountCurrency: pipValueAcct,
    contractExposure,
    pip1,
    pip10,
    pip50,
    pip100,
    pip500,
    valuePerStandardLot,
    appliedConversionRate: conversionRate,
    conversionDescription,
    priceDistance,
  };
}

/**
 * Formats a monetary value with appropriate precision.
 * Uses enough decimals to avoid showing meaningful values as $0.00.
 */
export function formatMoney(value: number, currency: string = "USD"): string {
  if (!isFinite(value)) return "—";
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : currency === "JPY" ? "¥" : "";
  const absVal = Math.abs(value);
  let decimals: number;
  if (absVal >= 100) decimals = 2;
  else if (absVal >= 1) decimals = 2;
  else if (absVal >= 0.01) decimals = 4;
  else if (absVal >= 0.0001) decimals = 6;
  else decimals = 8;
  return `${symbol}${value.toFixed(decimals)}`;
}

/**
 * Default inputs for the XAUUSD mode.
 */
export const DEFAULT_XAUUSD_INPUTS: PipValueInputs = {
  mode: "XAUUSD",
  lotSize: 1.00,
  contractSize: 100,
  pipSize: 0.01,
  accountCurrency: "USD",
  conversionRate: null,
  startPrice: null,
  endPrice: null,
  direction: null,
};

/**
 * Default inputs for the FOREX mode.
 */
export const DEFAULT_FOREX_INPUTS: PipValueInputs = {
  mode: "FOREX",
  lotSize: 1.00,
  contractSize: 100000,
  pipSize: 0.0001,
  accountCurrency: "USD",
  forexPair: "EURUSD",
  baseCurrency: "EUR",
  quoteCurrency: "USD",
  conversionRate: null,
  startPrice: null,
  endPrice: null,
  direction: null,
};

/**
 * Preset forex pairs with their default pip sizes.
 */
export const FOREX_PAIR_PRESETS = [
  { pair: "EURUSD", label: "EUR/USD" },
  { pair: "GBPUSD", label: "GBP/USD" },
  { pair: "USDJPY", label: "USD/JPY" },
  { pair: "EURJPY", label: "EUR/JPY" },
  { pair: "GBPJPY", label: "GBP/JPY" },
  { pair: "AUDUSD", label: "AUD/USD" },
  { pair: "USDCAD", label: "USD/CAD" },
  { pair: "USDCHF", label: "USD/CHF" },
  { pair: "NZDUSD", label: "NZD/USD" },
  { pair: "EURGBP", label: "EUR/GBP" },
];

/**
 * Supported account currencies.
 */
export const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "PKR", "AED", "SAR"];
