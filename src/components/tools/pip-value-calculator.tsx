"use client";

/**
 * PipValueCalculator
 *
 * Reusable, fully client-side React component for the ForexWizard
 * Pip Value Calculator. Supports two instrument modes:
 *   - XAUUSD (gold): lot size, contract size, pip convention
 *   - FOREX (currency pairs): pair, lot size, contract size, pip size
 *
 * All calculations are driven by the pure module at
 * `@/lib/pip-value-calc`. Results recompute live via useMemo as the
 * user edits any input — there is no submit button.
 *
 * Layout: two columns on desktop (inputs left, results right, sticky),
 * stacked on mobile.
 */

import { useMemo, useState } from "react";
import {
  ACCOUNT_CURRENCIES,
  calculatePipValue,
  DEFAULT_FOREX_INPUTS,
  DEFAULT_XAUUSD_INPUTS,
  formatMoney,
  FOREX_PAIR_PRESETS,
  getDefaultForexPipSize,
  parseForexPair,
  type InstrumentMode,
  type PipValueInputs,
  type PipValueResult,
} from "@/lib/pip-value-calc";

/* ------------------------------------------------------------------ */
/* Form state                                                          */
/* ------------------------------------------------------------------ */

type PipConvention = "0.01" | "0.10" | "custom";
type PipSizeMode = "auto" | "custom";

interface FormState {
  mode: InstrumentMode;
  lotSize: string;
  contractSize: string;
  // XAUUSD pip convention
  pipConvention: PipConvention;
  customPipSize: string;
  // FOREX pair + pip size
  forexPairSelect: string; // preset pair code, or "__custom__"
  forexPairCustom: string;
  pipSizeMode: PipSizeMode;
  customForexPipSize: string;
  // Shared
  accountCurrency: string;
  conversionRate: string;
  // Optional price distance
  priceDistanceEnabled: boolean;
  startPrice: string;
  endPrice: string;
  direction: "BUY" | "SELL";
}

function initialForm(): FormState {
  return {
    mode: "XAUUSD",
    lotSize: String(DEFAULT_XAUUSD_INPUTS.lotSize),
    contractSize: String(DEFAULT_XAUUSD_INPUTS.contractSize),
    pipConvention: "0.01",
    customPipSize: "0.01",
    forexPairSelect: "EURUSD",
    forexPairCustom: "",
    pipSizeMode: "auto",
    customForexPipSize: "0.0001",
    accountCurrency: "USD",
    conversionRate: "",
    priceDistanceEnabled: false,
    startPrice: "",
    endPrice: "",
    direction: "BUY",
  };
}

/* ------------------------------------------------------------------ */
/* Coercion helpers                                                    */
/* ------------------------------------------------------------------ */

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return null;
  return parsed;
}

function toNumberOrZero(value: string): number {
  const n = toNumberOrNull(value);
  return n === null ? 0 : n;
}

/* ------------------------------------------------------------------ */
/* Pair + pip resolution helpers                                       */
/* ------------------------------------------------------------------ */

function resolveForexPair(form: FormState): string {
  if (form.forexPairSelect === "__custom__") {
    return form.forexPairCustom.trim().toUpperCase();
  }
  return form.forexPairSelect;
}

function resolvePipSize(form: FormState): number {
  if (form.mode === "XAUUSD") {
    if (form.pipConvention === "0.01") return 0.01;
    if (form.pipConvention === "0.10") return 0.10;
    return toNumberOrZero(form.customPipSize);
  }
  // FOREX
  if (form.pipSizeMode === "auto") {
    return getDefaultForexPipSize(resolveForexPair(form));
  }
  return toNumberOrZero(form.customForexPipSize);
}

interface ConversionContext {
  needed: boolean;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldDescription: string;
}

function getConversionContext(form: FormState): ConversionContext {
  const acct = form.accountCurrency.toUpperCase();
  if (form.mode === "XAUUSD") {
    if (acct === "USD") {
      return {
        needed: false,
        fieldLabel: "",
        fieldPlaceholder: "",
        fieldDescription:
          "Quote currency (USD) matches account currency (USD). No conversion required.",
      };
    }
    return {
      needed: true,
      fieldLabel: `USD to ${acct} Conversion Rate`,
      fieldPlaceholder: "e.g. 0.92",
      fieldDescription: `Enter how many ${acct} equal 1 USD. Pip values will be converted from USD to ${acct}.`,
    };
  }
  // FOREX
  const pair = resolveForexPair(form);
  const parsed = parseForexPair(pair);
  if (!parsed) {
    return {
      needed: false,
      fieldLabel: "",
      fieldPlaceholder: "",
      fieldDescription:
        "Enter a valid 6-letter pair to determine conversion requirements.",
    };
  }
  const { base, quote } = parsed;
  if (acct === quote) {
    return {
      needed: false,
      fieldLabel: "",
      fieldPlaceholder: "",
      fieldDescription: `Quote currency (${quote}) matches account currency. No conversion required.`,
    };
  }
  if (acct === base) {
    return {
      needed: true,
      fieldLabel: `${pair} Current Price (${quote}/${base})`,
      fieldPlaceholder: "e.g. 1.0850",
      fieldDescription: `Account currency equals base currency (${base}). Enter the current ${pair} price \u2014 pip values will be converted from ${quote} to ${base}.`,
    };
  }
  return {
    needed: true,
    fieldLabel: `${quote} to ${acct} Conversion Rate`,
    fieldPlaceholder: `1 ${quote} = X ${acct}`,
    fieldDescription: `Account currency (${acct}) differs from both base (${base}) and quote (${quote}). Enter the ${quote}-to-${acct} exchange rate.`,
  };
}

/* ------------------------------------------------------------------ */
/* Style constants                                                     */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:border-trading-green/50 focus:outline-none transition-colors";

const labelClass =
  "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";

const sectionHeaderClass =
  "text-sm font-bold text-trading-gold uppercase tracking-wider mb-4";

/* ------------------------------------------------------------------ */
/* StatRow                                                             */
/* ------------------------------------------------------------------ */

function StatRow({
  label,
  value,
  description,
  accent,
}: {
  label: string;
  value: string;
  description?: string;
  accent?: "green" | "gold" | "red";
}) {
  const valueColor =
    accent === "green"
      ? "text-trading-green"
      : accent === "gold"
        ? "text-trading-gold"
        : accent === "red"
          ? "text-trading-red"
          : "text-foreground";

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className={`mt-1 text-lg font-bold tabular-nums ${valueColor}`}>
        {value}
      </p>
      {description ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ModeToggle                                                          */
/* ------------------------------------------------------------------ */

function ModeToggle({
  mode,
  onChange,
}: {
  mode: InstrumentMode;
  onChange: (mode: InstrumentMode) => void;
}) {
  const baseBtn =
    "flex-1 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all cursor-pointer";
  return (
    <div className="flex gap-2 p-1 rounded-xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => onChange("XAUUSD")}
        className={`${baseBtn} ${
          mode === "XAUUSD"
            ? "bg-trading-gold/20 text-trading-gold border border-trading-gold/40"
            : "text-muted-foreground hover:text-foreground border border-transparent"
        }`}
      >
        XAUUSD (Gold)
      </button>
      <button
        type="button"
        onClick={() => onChange("FOREX")}
        className={`${baseBtn} ${
          mode === "FOREX"
            ? "bg-trading-green/20 text-trading-green border border-trading-green/40"
            : "text-muted-foreground hover:text-foreground border border-transparent"
        }`}
      >
        Forex Pairs
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function PipValueCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);

  /* -------- derived values -------- */
  const pipSize = resolvePipSize(form);
  const forexPair = resolveForexPair(form);
  const parsedPair = parseForexPair(forexPair);

  /* -------- build PipValueInputs -------- */
  const inputs: PipValueInputs = useMemo(() => {
    const conversionRate = toNumberOrNull(form.conversionRate);
    return {
      mode: form.mode,
      lotSize: toNumberOrZero(form.lotSize),
      contractSize: toNumberOrZero(form.contractSize),
      pipSize,
      accountCurrency: form.accountCurrency,
      forexPair: form.mode === "FOREX" ? forexPair : undefined,
      baseCurrency: form.mode === "FOREX" ? parsedPair?.base : undefined,
      quoteCurrency: form.mode === "FOREX" ? parsedPair?.quote : undefined,
      conversionRate,
      startPrice: form.priceDistanceEnabled
        ? toNumberOrNull(form.startPrice)
        : null,
      endPrice: form.priceDistanceEnabled
        ? toNumberOrNull(form.endPrice)
        : null,
      direction: form.priceDistanceEnabled ? form.direction : null,
    };
  }, [form, pipSize, forexPair, parsedPair]);

  /* -------- run the calculation -------- */
  const result: PipValueResult = useMemo(
    () => calculatePipValue(inputs),
    [inputs],
  );

  /* -------- conversion context for UI -------- */
  const convCtx = getConversionContext(form);

  /* -------- handlers -------- */
  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const handleModeChange = (mode: InstrumentMode) => {
    setForm((prev) => {
      const next: FormState = {
        ...prev,
        mode,
        conversionRate: "", // always clear conversion on mode switch
      };
      if (mode === "XAUUSD") {
        next.contractSize = String(DEFAULT_XAUUSD_INPUTS.contractSize);
        next.lotSize = String(DEFAULT_XAUUSD_INPUTS.lotSize);
        next.pipConvention = "0.01";
      } else {
        next.contractSize = String(DEFAULT_FOREX_INPUTS.contractSize);
        next.lotSize = String(DEFAULT_FOREX_INPUTS.lotSize);
        next.pipSizeMode = "auto";
      }
      return next;
    });
  };

  const handleForexPairChange = (selectValue: string) => {
    setForm((prev) => ({
      ...prev,
      forexPairSelect: selectValue,
      conversionRate: "", // clear conversion when pair changes
    }));
  };

  const handleCustomPairChange = (value: string) => {
    const upper = value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
    setForm((prev) => ({
      ...prev,
      forexPairCustom: upper,
      conversionRate: "",
    }));
  };

  const handleAccountCurrencyChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      accountCurrency: value,
      conversionRate: "", // clear conversion rate when account currency changes
    }));
  };

  const handleReset = () => {
    setForm(initialForm());
  };

  /* -------- display helpers -------- */
  const acctCurr = form.accountCurrency;
  const quoteCurr = form.mode === "XAUUSD" ? "USD" : parsedPair?.quote ?? "—";
  const exposureUnit = form.mode === "XAUUSD" ? "oz" : "units";

  const instrumentLabel =
    form.mode === "XAUUSD"
      ? "XAUUSD (Gold)"
      : parsedPair
        ? `${forexPair} (${parsedPair.base}/${parsedPair.quote})`
        : `${forexPair || "—"} (invalid pair)`;

  const pipConventionLabel =
    form.mode === "XAUUSD"
      ? form.pipConvention === "0.01"
        ? "$0.01 / pip (1-cent)"
        : form.pipConvention === "0.10"
          ? "$0.10 / pip (10-cent)"
          : `Custom: ${form.customPipSize || "—"} / pip`
      : form.pipSizeMode === "auto"
        ? `Auto: ${pipSize} (${parsedPair?.quote === "JPY" ? "JPY pair" : "standard"})`
        : `Custom: ${form.customForexPipSize || "—"}`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ============= LEFT PANEL: INPUTS ============= */}
        <div className="glass-strong rounded-2xl gradient-border p-6 space-y-6">
          {/* header row: title + reset */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Trade Inputs
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Results recalculate automatically as you type.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="glass-strong border border-white/10 hover:border-trading-green/30 text-sm font-medium text-foreground hover:text-trading-green rounded-lg px-4 py-2 transition-colors cursor-pointer"
            >
              Reset Calculator
            </button>
          </div>

          {/* mode toggle */}
          <div>
            <label className={labelClass}>Instrument Mode</label>
            <ModeToggle mode={form.mode} onChange={handleModeChange} />
          </div>

          {/* ---------- XAUUSD MODE ---------- */}
          {form.mode === "XAUUSD" ? (
            <>
              {/* XAUUSD settings */}
              <div>
                <h4 className={sectionHeaderClass}>XAUUSD Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="pv-lot">
                      Lot Size
                    </label>
                    <input
                      id="pv-lot"
                      type="number"
                      inputMode="decimal"
                      value={form.lotSize}
                      onChange={(e) => update("lotSize", e.target.value)}
                      className={inputClass}
                      placeholder="1.00"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="pv-contract">
                      Contract Size (oz/lot)
                    </label>
                    <input
                      id="pv-contract"
                      type="number"
                      inputMode="decimal"
                      value={form.contractSize}
                      onChange={(e) => update("contractSize", e.target.value)}
                      className={inputClass}
                      placeholder="100"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              {/* pip convention */}
              <div>
                <h4 className={sectionHeaderClass}>Pip Convention</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  {(
                    [
                      { v: "0.01", label: "$0.01 / pip", desc: "1-cent" },
                      { v: "0.10", label: "$0.10 / pip", desc: "10-cent" },
                      { v: "custom", label: "Custom", desc: "manual" },
                    ] as { v: PipConvention; label: string; desc: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => update("pipConvention", opt.v)}
                      className={`rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer ${
                        form.pipConvention === opt.v
                          ? "border-trading-gold/50 bg-trading-gold/10 text-trading-gold"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <p className="text-sm font-bold">{opt.label}</p>
                      <p className="text-[11px] opacity-80">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {form.pipConvention === "custom" ? (
                  <div>
                    <label className={labelClass} htmlFor="pv-custompip">
                      Custom Pip Size (USD/oz)
                    </label>
                    <input
                      id="pv-custompip"
                      type="number"
                      inputMode="decimal"
                      value={form.customPipSize}
                      onChange={(e) => update("customPipSize", e.target.value)}
                      className={inputClass}
                      placeholder="0.01"
                      min="0"
                      step="any"
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {/* ---------- FOREX MODE ---------- */}
              <div>
                <h4 className={sectionHeaderClass}>Forex Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="pv-pair">
                      Currency Pair
                    </label>
                    <select
                      id="pv-pair"
                      value={form.forexPairSelect}
                      onChange={(e) => handleForexPairChange(e.target.value)}
                      className={inputClass}
                    >
                      {FOREX_PAIR_PRESETS.map((p) => (
                        <option key={p.pair} value={p.pair}>
                          {p.label}
                        </option>
                      ))}
                      <option value="__custom__">Custom (6-letter)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="pv-lot">
                      Lot Size
                    </label>
                    <input
                      id="pv-lot"
                      type="number"
                      inputMode="decimal"
                      value={form.lotSize}
                      onChange={(e) => update("lotSize", e.target.value)}
                      className={inputClass}
                      placeholder="1.00"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="pv-contract">
                      Contract Size (units/lot)
                    </label>
                    <input
                      id="pv-contract"
                      type="number"
                      inputMode="decimal"
                      value={form.contractSize}
                      onChange={(e) => update("contractSize", e.target.value)}
                      className={inputClass}
                      placeholder="100000"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>

                {form.forexPairSelect === "__custom__" ? (
                  <div className="mt-4">
                    <label className={labelClass} htmlFor="pv-custompair">
                      Custom Pair Code (6 letters, e.g. EURUSD)
                    </label>
                    <input
                      id="pv-custompair"
                      type="text"
                      value={form.forexPairCustom}
                      onChange={(e) => handleCustomPairChange(e.target.value)}
                      className={inputClass}
                      placeholder="EURUSD"
                      maxLength={6}
                    />
                    {form.forexPairCustom.length > 0 &&
                    form.forexPairCustom.length !== 6 ? (
                      <p className="mt-1 text-xs text-trading-red">
                        Pair must be exactly 6 letters.
                      </p>
                    ) : null}
                    {form.forexPairCustom.length === 6 && !parsedPair ? (
                      <p className="mt-1 text-xs text-trading-red">
                        Invalid pair format. Use 6 letters only (A-Z).
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* pip size */}
              <div>
                <h4 className={sectionHeaderClass}>Pip Size</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => update("pipSizeMode", "auto")}
                    className={`rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer ${
                      form.pipSizeMode === "auto"
                        ? "border-trading-green/50 bg-trading-green/10 text-trading-green"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-sm font-bold">Auto-detect</p>
                    <p className="text-[11px] opacity-80">
                      {parsedPair?.quote === "JPY"
                        ? "JPY pair \u2192 0.01"
                        : "Standard \u2192 0.0001"}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => update("pipSizeMode", "custom")}
                    className={`rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer ${
                      form.pipSizeMode === "custom"
                        ? "border-trading-green/50 bg-trading-green/10 text-trading-green"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-sm font-bold">Custom</p>
                    <p className="text-[11px] opacity-80">Manual entry</p>
                  </button>
                </div>
                {form.pipSizeMode === "custom" ? (
                  <div>
                    <label className={labelClass} htmlFor="pv-customforexpip">
                      Custom Pip Size
                    </label>
                    <input
                      id="pv-customforexpip"
                      type="number"
                      inputMode="decimal"
                      value={form.customForexPipSize}
                      onChange={(e) =>
                        update("customForexPipSize", e.target.value)
                      }
                      className={inputClass}
                      placeholder="0.0001"
                      min="0"
                      step="any"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Detected pip size:&nbsp;
                    <span className="text-trading-green font-semibold tabular-nums">
                      {pipSize}
                    </span>
                  </p>
                )}
              </div>
            </>
          )}

          {/* ---------- ACCOUNT CURRENCY (shared) ---------- */}
          <div>
            <h4 className={sectionHeaderClass}>Account Currency</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="pv-acct">
                  Account Currency
                </label>
                <select
                  id="pv-acct"
                  value={form.accountCurrency}
                  onChange={(e) => handleAccountCurrencyChange(e.target.value)}
                  className={inputClass}
                >
                  {ACCOUNT_CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {convCtx.needed ? (
                <div>
                  <label className={labelClass} htmlFor="pv-convrate">
                    {convCtx.fieldLabel}
                  </label>
                  <input
                    id="pv-convrate"
                    type="number"
                    inputMode="decimal"
                    value={form.conversionRate}
                    onChange={(e) => update("conversionRate", e.target.value)}
                    className={inputClass}
                    placeholder={convCtx.fieldPlaceholder}
                    min="0"
                    step="any"
                  />
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {convCtx.needed
                ? convCtx.fieldDescription
                : convCtx.fieldDescription}
            </p>
          </div>

          {/* ---------- PRICE DISTANCE (optional) ---------- */}
          <div>
            <button
              type="button"
              onClick={() =>
                update("priceDistanceEnabled", !form.priceDistanceEnabled)
              }
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <h4 className="text-sm font-bold text-trading-gold uppercase tracking-wider">
                Price Distance (Optional)
              </h4>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  form.priceDistanceEnabled
                    ? "bg-trading-green/20 text-trading-green"
                    : "bg-white/5 text-muted-foreground"
                }`}
              >
                {form.priceDistanceEnabled ? "ON" : "OFF"}
              </span>
            </button>
            {form.priceDistanceEnabled ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass} htmlFor="pv-start">
                    Start Price
                  </label>
                  <input
                    id="pv-start"
                    type="number"
                    inputMode="decimal"
                    value={form.startPrice}
                    onChange={(e) => update("startPrice", e.target.value)}
                    className={inputClass}
                    placeholder="4300.00"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="pv-end">
                    End Price
                  </label>
                  <input
                    id="pv-end"
                    type="number"
                    inputMode="decimal"
                    value={form.endPrice}
                    onChange={(e) => update("endPrice", e.target.value)}
                    className={inputClass}
                    placeholder="4305.00"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="pv-dir">
                    Direction
                  </label>
                  <select
                    id="pv-dir"
                    value={form.direction}
                    onChange={(e) =>
                      update("direction", e.target.value as "BUY" | "SELL")
                    }
                    className={inputClass}
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* ============= RIGHT PANEL: RESULTS ============= */}
        <div className="glass-strong rounded-2xl gradient-border p-6 space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Pip Value Results
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Updates instantly &mdash; no submit needed.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-trading-green/40 bg-trading-green/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-trading-green">
              <span className="h-1.5 w-1.5 rounded-full bg-trading-green animate-pulse" />
              LIVE
            </span>
          </div>

          {!result.valid ? (
            <div className="rounded-lg border border-trading-red/40 bg-trading-red/10 p-4">
              <p className="text-sm font-semibold text-trading-red">
                Input Required
              </p>
              <p className="text-sm text-trading-red/90 mt-1">
                {result.error ?? "Please review your inputs."}
              </p>
            </div>
          ) : (
            <>
              {/* instrument summary */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Instrument
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {instrumentLabel}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Pip convention:
                    </span>
                    <span className="text-foreground font-semibold ml-1">
                      {pipConventionLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lot size:</span>
                    <span className="text-foreground font-semibold tabular-nums ml-1">
                      {form.lotSize || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exposure:</span>
                    <span className="text-trading-gold font-semibold tabular-nums ml-1">
                      {result.contractExposure.toLocaleString()} {exposureUnit}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quote curr:</span>
                    <span className="text-foreground font-semibold ml-1">
                      {quoteCurr}
                    </span>
                  </div>
                </div>
              </div>

              {/* headline pip value */}
              <div className="rounded-xl border border-trading-green/30 bg-trading-green/5 p-6 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Value per Pip (1 pip)
                </p>
                <p className="mt-2 text-3xl md:text-4xl font-extrabold text-trading-green text-glow-green tabular-nums">
                  {formatMoney(result.pipValueAccountCurrency, acctCurr)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  per pip, in {acctCurr}
                </p>
              </div>

              {/* pip values grid */}
              <div>
                <h4 className="text-xs font-bold text-trading-gold uppercase tracking-wider mb-3">
                  Pip Values at Scale
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatRow
                    label="1 pip"
                    value={formatMoney(result.pip1, acctCurr)}
                  />
                  <StatRow
                    label="10 pips"
                    value={formatMoney(result.pip10, acctCurr)}
                  />
                  <StatRow
                    label="50 pips"
                    value={formatMoney(result.pip50, acctCurr)}
                    accent="gold"
                  />
                  <StatRow
                    label="100 pips"
                    value={formatMoney(result.pip100, acctCurr)}
                    accent="gold"
                  />
                  <StatRow
                    label="500 pips"
                    value={formatMoney(result.pip500, acctCurr)}
                    accent="red"
                  />
                  <StatRow
                    label="Per standard lot"
                    value={formatMoney(result.valuePerStandardLot, acctCurr)}
                    accent="green"
                    description="1.00 lot, 1 pip"
                  />
                </div>
              </div>

              {/* currency breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StatRow
                  label={`Value per pip (${quoteCurr})`}
                  value={formatMoney(result.pipValueQuoteCurrency, quoteCurr)}
                  description="Raw quote-currency pip value"
                />
                <StatRow
                  label={`Value per pip (${acctCurr})`}
                  value={formatMoney(result.pipValueAccountCurrency, acctCurr)}
                  accent="green"
                  description="After conversion"
                />
              </div>

              {/* conversion details */}
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Conversion
                </p>
                <p className="mt-1 text-sm text-foreground leading-relaxed">
                  {result.conversionDescription || "—"}
                </p>
                {result.appliedConversionRate !== 1 ? (
                  <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                    Applied rate: {result.appliedConversionRate}
                  </p>
                ) : null}
              </div>

              {/* price distance results */}
              {result.priceDistance ? (
                <div className="rounded-xl border border-trading-gold/30 bg-trading-gold/5 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-trading-gold uppercase tracking-wider">
                    Price Distance Result
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <StatRow
                      label="Price difference"
                      value={result.priceDistance.absoluteDifference.toFixed(
                        result.priceDistance.absoluteDifference >= 1
                          ? 2
                          : 5,
                      )}
                      description="absolute"
                    />
                    <StatRow
                      label="Pip count"
                      value={result.priceDistance.pipCount.toFixed(1)}
                      accent="gold"
                    />
                    <StatRow
                      label="Absolute move value"
                      value={formatMoney(
                        result.priceDistance.monetaryValue,
                        acctCurr,
                      )}
                    />
                    <StatRow
                      label={`Signed P/L (${form.direction})`}
                      value={formatMoney(
                        result.priceDistance.signedPL,
                        acctCurr,
                      )}
                      accent={
                        result.priceDistance.signedPL >= 0 ? "green" : "red"
                      }
                    />
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
        Educational estimate only. Pip values can differ across brokers due to
        contract specifications, pip conventions, quote currency and live
        exchange rates. Always verify against your broker&apos;s contract specs
        before placing a trade.
      </p>
    </div>
  );
}

export default PipValueCalculator;
