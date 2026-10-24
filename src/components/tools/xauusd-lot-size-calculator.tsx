"use client";

/**
 * XauusdLotSizeCalculator
 *
 * Reusable, fully client-side React component for the ForexWizard
 * XAUUSD Lot Size & Risk Calculator.
 *
 * All calculations are driven by the pure module at
 * `@/lib/xauusd-lot-size-calc`. Results recompute live via useMemo as the
 * user edits any input — there is no submit button.
 *
 * Layout: two columns on desktop (inputs left, results right, sticky),
 * stacked on mobile.
 */

import { useMemo, useState } from "react";
import {
  calculateLotSize,
  DEFAULT_INPUTS,
  type CalculatorInputs,
  type CalculatorResult,
} from "@/lib/xauusd-lot-size-calc";

/* ------------------------------------------------------------------ */
/* Form state                                                          */
/* ------------------------------------------------------------------ */

interface FormState {
  equity: string;
  riskPercentage: string;
  direction: "BUY" | "SELL";
  entryPrice: string;
  stopLossPrice: string;
  takeProfitPrice: string;
  contractSize: string;
  minVolume: string;
  maxVolume: string;
  volumeStep: string;
  commissionPerLot: string;
  slippagePerOunce: string;
  accountCurrency: string;
  conversionRate: string;
}

function initialForm(): FormState {
  return {
    equity: String(DEFAULT_INPUTS.equity),
    riskPercentage: String(DEFAULT_INPUTS.riskPercentage),
    direction: DEFAULT_INPUTS.direction,
    entryPrice: String(DEFAULT_INPUTS.entryPrice),
    stopLossPrice: String(DEFAULT_INPUTS.stopLossPrice),
    takeProfitPrice: "",
    contractSize: String(DEFAULT_INPUTS.contractSize),
    minVolume: String(DEFAULT_INPUTS.minVolume),
    maxVolume: String(DEFAULT_INPUTS.maxVolume),
    volumeStep: String(DEFAULT_INPUTS.volumeStep),
    commissionPerLot: "",
    slippagePerOunce: "",
    accountCurrency: DEFAULT_INPUTS.accountCurrency,
    conversionRate: "",
  };
}

/* ------------------------------------------------------------------ */
/* Coercion + formatting helpers                                       */
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

function fmtMoney(n: number | undefined | null): string {
  if (n == null || !isFinite(n)) return "\u2014";
  return `$${n.toFixed(2)}`;
}

function fmtNumber(n: number | undefined | null, dp = 2): string {
  if (n == null || !isFinite(n)) return "\u2014";
  return n.toFixed(dp);
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
/* Stat row                                                            */
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
      <p
        className={`mt-1 text-lg font-bold tabular-nums ${valueColor}`}
      >
        {value}
      </p>
      {description ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function XauusdLotSizeCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);

  const result: CalculatorResult = useMemo(() => {
    const inputs: CalculatorInputs = {
      equity: toNumberOrZero(form.equity),
      riskPercentage: toNumberOrZero(form.riskPercentage),
      direction: form.direction,
      entryPrice: toNumberOrZero(form.entryPrice),
      stopLossPrice: toNumberOrZero(form.stopLossPrice),
      takeProfitPrice: toNumberOrNull(form.takeProfitPrice),
      contractSize: toNumberOrZero(form.contractSize),
      minVolume: toNumberOrZero(form.minVolume),
      maxVolume: toNumberOrZero(form.maxVolume),
      volumeStep: toNumberOrZero(form.volumeStep),
      commissionPerLot: toNumberOrNull(form.commissionPerLot),
      slippagePerOunce: toNumberOrNull(form.slippagePerOunce),
      accountCurrency: form.accountCurrency.trim().toUpperCase() || "USD",
      conversionRate: toNumberOrNull(form.conversionRate),
    };
    return calculateLotSize(inputs);
  }, [form]);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setForm(initialForm());
  };

  const currencyUpper = form.accountCurrency.trim().toUpperCase() || "USD";
  const isNonUsd = currencyUpper !== "USD";

  const hasTP =
    result.valid &&
    result.estimatedReward != null &&
    result.riskRewardRatio != null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ============= LEFT PANEL: INPUTS ============= */}
        <div className="glass-strong rounded-2xl gradient-border p-6 space-y-6">
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

          {/* ---------- BASIC INPUTS ---------- */}
          <div>
            <h4 className={sectionHeaderClass}>Basic Inputs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="xau-equity">
                  Account Equity
                </label>
                <input
                  id="xau-equity"
                  type="number"
                  inputMode="decimal"
                  value={form.equity}
                  onChange={(e) => update("equity", e.target.value)}
                  className={inputClass}
                  placeholder="500"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-risk">
                  Account Risk (%)
                </label>
                <input
                  id="xau-risk"
                  type="number"
                  inputMode="decimal"
                  value={form.riskPercentage}
                  onChange={(e) => update("riskPercentage", e.target.value)}
                  className={inputClass}
                  placeholder="1"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-direction">
                  Trade Direction
                </label>
                <select
                  id="xau-direction"
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
              <div>
                <label className={labelClass} htmlFor="xau-entry">
                  XAUUSD Entry Price
                </label>
                <input
                  id="xau-entry"
                  type="number"
                  inputMode="decimal"
                  value={form.entryPrice}
                  onChange={(e) => update("entryPrice", e.target.value)}
                  className={inputClass}
                  placeholder="4300"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-stop">
                  Stop-Loss Price
                </label>
                <input
                  id="xau-stop"
                  type="number"
                  inputMode="decimal"
                  value={form.stopLossPrice}
                  onChange={(e) => update("stopLossPrice", e.target.value)}
                  className={inputClass}
                  placeholder="4295"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-tp">
                  Take-Profit Price (Optional)
                </label>
                <input
                  id="xau-tp"
                  type="number"
                  inputMode="decimal"
                  value={form.takeProfitPrice}
                  onChange={(e) => update("takeProfitPrice", e.target.value)}
                  className={inputClass}
                  placeholder="Optional"
                  min="0"
                  step="any"
                />
              </div>
            </div>
          </div>

          {/* ---------- BROKER SPECIFICATIONS ---------- */}
          <div>
            <h4 className={sectionHeaderClass}>Broker Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="xau-contract">
                  Contract Size (oz/lot)
                </label>
                <input
                  id="xau-contract"
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
              <div>
                <label className={labelClass} htmlFor="xau-minvol">
                  Minimum Volume (lots)
                </label>
                <input
                  id="xau-minvol"
                  type="number"
                  inputMode="decimal"
                  value={form.minVolume}
                  onChange={(e) => update("minVolume", e.target.value)}
                  className={inputClass}
                  placeholder="0.01"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-maxvol">
                  Maximum Volume (lots)
                </label>
                <input
                  id="xau-maxvol"
                  type="number"
                  inputMode="decimal"
                  value={form.maxVolume}
                  onChange={(e) => update("maxVolume", e.target.value)}
                  className={inputClass}
                  placeholder="100"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-step">
                  Volume Step
                </label>
                <input
                  id="xau-step"
                  type="number"
                  inputMode="decimal"
                  value={form.volumeStep}
                  onChange={(e) => update("volumeStep", e.target.value)}
                  className={inputClass}
                  placeholder="0.01"
                  min="0"
                  step="any"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="xau-commission">
                  Commission per Lot, Round Trip (Optional)
                </label>
                <input
                  id="xau-commission"
                  type="number"
                  inputMode="decimal"
                  value={form.commissionPerLot}
                  onChange={(e) => update("commissionPerLot", e.target.value)}
                  className={inputClass}
                  placeholder="Optional"
                  min="0"
                  step="any"
                />
              </div>
            </div>
          </div>

          {/* ---------- ADVANCED SETTINGS ---------- */}
          <div>
            <h4 className={sectionHeaderClass}>Advanced Settings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="xau-slippage">
                  Slippage Allowance, USD/oz (Optional)
                </label>
                <input
                  id="xau-slippage"
                  type="number"
                  inputMode="decimal"
                  value={form.slippagePerOunce}
                  onChange={(e) => update("slippagePerOunce", e.target.value)}
                  className={inputClass}
                  placeholder="Optional"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="xau-currency">
                  Account Currency
                </label>
                <input
                  id="xau-currency"
                  type="text"
                  value={form.accountCurrency}
                  onChange={(e) =>
                    update("accountCurrency", e.target.value.toUpperCase())
                  }
                  className={inputClass}
                  placeholder="USD"
                  maxLength={6}
                />
              </div>
              {isNonUsd ? (
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="xau-convrate">
                    {`USD to ${currencyUpper} Conversion Rate`}
                  </label>
                  <input
                    id="xau-convrate"
                    type="number"
                    inputMode="decimal"
                    value={form.conversionRate}
                    onChange={(e) => update("conversionRate", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 0.92"
                    min="0"
                    step="any"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* ============= RIGHT PANEL: RESULTS ============= */}
        <div className="glass-strong rounded-2xl gradient-border p-6 space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Calculation Results
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Updates instantly &mdash; no submit needed.
            </p>
          </div>

          {!result.valid ? (
            <div className="rounded-lg border border-trading-red/40 bg-trading-red/10 p-4">
              <p className="text-sm font-semibold text-trading-red">
                Invalid Inputs
              </p>
              <p className="text-sm text-trading-red/90 mt-1">
                {result.error ?? "Please review your inputs."}
              </p>
            </div>
          ) : (
            <>
              {/* Big lot size display */}
              <div className="rounded-xl border border-trading-green/30 bg-trading-green/5 p-6 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Calculated Maximum Lot Size
                </p>
                <p className="mt-2 text-3xl md:text-4xl font-extrabold text-trading-green text-glow-green tabular-nums">
                  {fmtNumber(result.calculatedVolume, 2)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  lots &mdash; rounded down to broker volume step
                </p>
              </div>

              {/* Below-minimum warning */}
              {result.belowMinimum ? (
                <div className="rounded-lg border border-trading-gold/40 bg-trading-gold/10 p-4">
                  <p className="text-sm font-semibold text-trading-gold">
                    Minimum Volume Warning
                  </p>
                  <p className="text-sm text-trading-gold/90 mt-1">
                    Your selected risk budget is below the minimum trade size
                    allowed by these broker specifications.
                  </p>
                </div>
              ) : null}

              {/* Primary stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StatRow
                  label="Risk Budget"
                  value={fmtMoney(result.riskBudget)}
                  accent="green"
                />
                <StatRow
                  label="Actual Estimated Risk"
                  value={fmtMoney(result.actualEstimatedRisk)}
                  accent="red"
                />
                <StatRow
                  label="Stop-Loss Distance"
                  value={`${fmtNumber(result.stopDistance, 2)} USD/oz`}
                />
                <StatRow
                  label="Contract Exposure"
                  value={`${fmtNumber(result.contractExposureOunces, 2)} oz`}
                  description="lots &times; contract size"
                />
              </div>

              {/* TP-related stats */}
              {hasTP ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <StatRow
                    label="Estimated Reward @ TP"
                    value={fmtMoney(result.estimatedReward)}
                    accent="green"
                  />
                  <StatRow
                    label="Risk / Reward Ratio"
                    value={`1 : ${fmtNumber(result.riskRewardRatio, 2)}`}
                    accent="gold"
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
        Educational estimate only. Actual losses can differ due to gaps,
        slippage, spreads, commissions and execution conditions.
      </p>
    </div>
  );
}

export default XauusdLotSizeCalculator;
