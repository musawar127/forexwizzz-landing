"use client";

/**
 * XauusdMarginCalculator
 *
 * Free, fully client-side XAUUSD margin & gold leverage calculator.
 * Three modes: Required Margin, Max Lots From Margin, Leverage Comparison.
 * All math driven by the pure module at @/lib/xauusd-margin-calc.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateMargin,
  calculateMaxLotsFromMargin,
  buildLeverageComparison,
  DEFAULT_INPUTS,
  LEVERAGE_PRESETS,
  ILLUSTRATIVE_TABLE,
  roundTo,
  smartRound,
  type CalculatorMode,
  type MarginMethod,
  type MarginInputs,
  type MarginResult,
} from "@/lib/xauusd-margin-calc";
import {
  AlertTriangle, Info, Scale, ChevronRight, Coins, Layers, Gauge,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  goldPrice: string;
  lots: string;
  contractSize: string;
  method: MarginMethod;
  leverage: string;
  marginRatePercent: string;
  accountCurrency: string;
  conversionRate: string;
  // account metrics
  equity: string;
  existingUsedMargin: string;
  // max lots
  availableMargin: string;
  minLot: string;
  lotStep: string;
  // comparison
  customLeverage: string;
}

const INITIAL_FORM: FormState = {
  mode: "REQUIRED_MARGIN",
  goldPrice: "4000",
  lots: "0.01",
  contractSize: "100",
  method: "LEVERAGE",
  leverage: "100",
  marginRatePercent: "0.5",
  accountCurrency: "USD",
  conversionRate: "1",
  equity: "",
  existingUsedMargin: "",
  availableMargin: "40",
  minLot: "0.01",
  lotStep: "0.01",
  customLeverage: "",
};

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return null;
  return parsed;
}

const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "PKR", "AED", "SAR"];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function XauusdMarginCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* -------- build inputs -------- */
  const inputs: MarginInputs = useMemo(() => {
    const method = form.method;
    const base: MarginInputs = {
      mode: form.mode,
      goldPrice: toNumberOrNull(form.goldPrice) ?? 0,
      lots: toNumberOrNull(form.lots) ?? undefined,
      contractSize: toNumberOrNull(form.contractSize) ?? 100,
      method,
      leverage: method === "LEVERAGE" ? toNumberOrNull(form.leverage) ?? undefined : undefined,
      marginRatePercent: method === "MARGIN_RATE" ? toNumberOrNull(form.marginRatePercent) ?? undefined : undefined,
      accountCurrency: form.accountCurrency,
      conversionRate: toNumberOrNull(form.conversionRate) ?? 1,
      equity: toNumberOrNull(form.equity),
      existingUsedMargin: toNumberOrNull(form.existingUsedMargin),
      minLot: toNumberOrNull(form.minLot) ?? 0.01,
      lotStep: toNumberOrNull(form.lotStep) ?? 0.01,
    };
    if (form.mode === "MAX_LOTS") {
      base.availableMargin = toNumberOrNull(form.availableMargin) ?? 0;
    }
    return base;
  }, [form]);

  const result: MarginResult = useMemo(() => calculateMargin(inputs), [inputs]);

  const maxLotsResult = useMemo(() => {
    if (form.mode !== "MAX_LOTS") return null;
    return calculateMaxLotsFromMargin(
      inputs.goldPrice,
      inputs.contractSize,
      inputs.method,
      inputs.leverage,
      inputs.marginRatePercent,
      inputs.availableMargin ?? 0,
      inputs.conversionRate,
      inputs.minLot ?? 0.01,
      inputs.lotStep ?? 0.01,
    );
  }, [form.mode, inputs]);

  const comparisonResult = useMemo(() => {
    if (form.mode !== "COMPARISON") return null;
    const customLev = toNumberOrNull(form.customLeverage) ?? undefined;
    return buildLeverageComparison(
      inputs.goldPrice,
      inputs.lots ?? 0,
      inputs.contractSize,
      inputs.conversionRate,
      customLev,
    );
  }, [form.mode, form.customLeverage, inputs]);

  /* -------- helpers -------- */
  const fmtNum = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    return roundTo(n, decimals).toFixed(decimals);
  };
  const fmtSmart = (n: number): string => {
    if (!isFinite(n)) return "—";
    return String(smartRound(n));
  };
  const isNonUsd = form.accountCurrency !== "USD";

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "REQUIRED_MARGIN", label: "Required Margin" },
          { id: "MAX_LOTS", label: "Max Lots From Margin" },
          { id: "COMPARISON", label: "Leverage Comparison" },
        ] as { id: CalculatorMode; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={form.mode === tab.id}
            onClick={() => update("mode", tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
              form.mode === tab.id
                ? "bg-trading-green text-trading-dark glow-green"
                : "glass-strong text-muted-foreground hover:text-foreground border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------------- INPUTS ---------------- */}
        <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Coins className="w-5 h-5 text-trading-gold" />
              Inputs
            </h3>
          </div>

          {/* Gold price (all modes) */}
          <Field id="m-gold" label="Gold Price (XAUUSD, USD per ounce)" value={form.goldPrice} onChange={(v) => update("goldPrice", v)} placeholder="e.g. 4000" />

          {/* Lots — REQUIRED_MARGIN + COMPARISON */}
          {form.mode !== "MAX_LOTS" && (
            <Field id="m-lots" label="Trade Size / Lots" value={form.lots} onChange={(v) => update("lots", v)} placeholder="e.g. 0.01" />
          )}

          {/* Available margin — MAX_LOTS */}
          {form.mode === "MAX_LOTS" && (
            <Field id="m-available" label={`Available Margin to Allocate (${form.accountCurrency})`} value={form.availableMargin} onChange={(v) => update("availableMargin", v)} placeholder="e.g. 40" />
          )}

          {/* Contract size (all) */}
          <Field id="m-contract" label="Contract Size (ounces per 1.00 lot)" value={form.contractSize} onChange={(v) => update("contractSize", v)} placeholder="e.g. 100" />

          {/* Method — REQUIRED_MARGIN + MAX_LOTS */}
          {form.mode !== "COMPARISON" && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">MARGIN METHOD</label>
              <div className="grid grid-cols-2 gap-2">
                {(["LEVERAGE", "MARGIN_RATE"] as MarginMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => update("method", m)}
                    aria-pressed={form.method === m}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      form.method === m
                        ? "bg-trading-gold/20 text-trading-gold border border-trading-gold/40"
                        : "glass text-muted-foreground hover:text-foreground border border-white/10"
                    }`}
                  >
                    {m === "LEVERAGE" ? "Leverage" : "Margin Rate %"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leverage input */}
          {form.mode !== "COMPARISON" && form.method === "LEVERAGE" && (
            <div className="mb-4">
              <label htmlFor="m-lev" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
                EFFECTIVE XAUUSD LEVERAGE
              </label>
              <input
                id="m-lev"
                type="number"
                step="any"
                value={form.leverage}
                onChange={(e) => update("leverage", e.target.value)}
                placeholder="e.g. 100"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {LEVERAGE_PRESETS.map((l) => (
                  <button
                    key={l}
                    onClick={() => update("leverage", String(l))}
                    className="px-2.5 py-1 rounded-md text-xs font-bold glass text-muted-foreground hover:text-trading-green hover:border-trading-green/30 border border-white/10 transition-colors"
                  >
                    1:{l}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70 mt-1.5">
                This is the leverage applied to the gold symbol — it may differ from your account&apos;s headline forex leverage.
              </p>
            </div>
          )}

          {/* Margin rate input */}
          {form.mode !== "COMPARISON" && form.method === "MARGIN_RATE" && (
            <Field id="m-rate" label="Margin Rate %" value={form.marginRatePercent} onChange={(v) => update("marginRatePercent", v)} placeholder="e.g. 0.5" />
          )}

          {/* Max-lots: min lot + lot step */}
          {form.mode === "MAX_LOTS" && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Field id="m-minlot" label="Minimum Lot" value={form.minLot} onChange={(v) => update("minLot", v)} placeholder="0.01" />
              <Field id="m-step" label="Lot Step" value={form.lotStep} onChange={(v) => update("lotStep", v)} placeholder="0.01" />
            </div>
          )}

          {/* Comparison: custom leverage */}
          {form.mode === "COMPARISON" && (
            <Field id="m-customlev" label="Custom Leverage to Add (optional, e.g. 150 for 1:150)" value={form.customLeverage} onChange={(v) => update("customLeverage", v)} placeholder="e.g. 150" />
          )}

          {/* Account currency */}
          <div className="mb-4">
            <label htmlFor="m-curr" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">ACCOUNT CURRENCY</label>
            <select
              id="m-curr"
              value={form.accountCurrency}
              onChange={(e) => {
                update("accountCurrency", e.target.value);
                if (e.target.value === "USD") update("conversionRate", "1");
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
            >
              {ACCOUNT_CURRENCIES.map((c) => (
                <option key={c} value={c} className="bg-trading-dark">{c}</option>
              ))}
            </select>
          </div>

          {/* Conversion rate (non-USD) */}
          {isNonUsd && (
            <Field id="m-conv" label={`USD → ${form.accountCurrency} Conversion Rate (units of ${form.accountCurrency} per 1 USD)`} value={form.conversionRate} onChange={(v) => update("conversionRate", v)} placeholder="e.g. 0.92" />
          )}

          {/* Advanced: account metrics (REQUIRED_MARGIN only) */}
          {form.mode === "REQUIRED_MARGIN" && (
            <details className="mt-4 group">
              <summary className="flex items-center gap-2 text-xs font-bold text-trading-gold cursor-pointer list-none select-none mb-3">
                <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                Advanced: Free Margin &amp; Margin Level
              </summary>
              <div className="space-y-3 pl-1">
                <Field id="m-equity" label={`Account Equity (${form.accountCurrency}, optional)`} value={form.equity} onChange={(v) => update("equity", v)} placeholder="e.g. 1000" />
                <Field id="m-used" label={`Existing Used Margin (${form.accountCurrency}, optional)`} value={form.existingUsedMargin} onChange={(v) => update("existingUsedMargin", v)} placeholder="e.g. 50" />
              </div>
            </details>
          )}

          {/* Example notice */}
          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Default values are an <strong>illustrative example</strong> — not live market data. Broker XAUUSD specifications vary; verify in your platform&apos;s symbol specification.</span>
          </div>
        </div>

        {/* ---------------- RESULTS ---------------- */}
        <div className="space-y-4">
          {/* Error */}
          {!result.valid && result.error && form.mode !== "MAX_LOTS" && form.mode !== "COMPARISON" && (
            <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert" aria-live="assertive">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-trading-red mb-1">Cannot calculate</p>
                  <p className="text-sm text-muted-foreground">{result.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* REQUIRED_MARGIN results */}
          {form.mode === "REQUIRED_MARGIN" && result.valid && (
            <>
              {/* Visual summary */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">TRADE</p>
                    <p className="text-lg font-bold text-foreground">{fmtSmart(Number(form.lots))} lots</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">EXPOSURE</p>
                    <p className="text-lg font-bold text-foreground">{fmtSmart(result.exposureOunces)} oz</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">NOTIONAL</p>
                    <p className="text-lg font-bold text-foreground">${fmtNum(result.notionalUSD)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">LEVERAGE</p>
                    <p className="text-lg font-bold text-foreground">1:{fmtNum(result.effectiveLeverage, 0)}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-xs text-muted-foreground mb-1">REQUIRED MARGIN</p>
                    <p className="text-lg font-bold text-trading-green">${fmtNum(result.marginUSD)}</p>
                  </div>
                </div>
              </div>

              {/* Headline margin */}
              <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">REQUIRED MARGIN</p>
                <p className="text-4xl md:text-5xl font-extrabold text-trading-gold text-glow-gold mb-2">
                  {fmtNum(result.marginUSD)} <span className="text-2xl text-muted-foreground">USD</span>
                </p>
                {isNonUsd && (
                  <p className="text-sm text-muted-foreground">
                    = <span className="font-bold text-trading-green">{fmtNum(result.marginAccount)} {form.accountCurrency}</span>
                  </p>
                )}
                <p className="text-xs text-muted-foreground/70 mt-2">
                  Equivalent margin rate: {fmtNum(result.equivalentMarginRatePercent, 3)}% · Effective leverage 1:{fmtNum(result.effectiveLeverage, 0)}
                </p>
              </div>

              {/* Margin per standard lot sizes */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-trading-gold" />
                  Margin per Lot Size ({form.accountCurrency})
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <Stat label="0.01 lot" value={fmtNum(result.marginPer001Lot)} tone="gold" />
                  <Stat label="0.10 lot" value={fmtNum(result.marginPer010Lot)} tone="gold" />
                  <Stat label="1.00 lot" value={fmtNum(result.marginPer100Lot)} tone="green" />
                </div>
              </div>

              {/* Account metrics */}
              {result.account && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-trading-gold" />
                    Account Metrics After Planned Position
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="New Used Margin" value={`${fmtNum(result.account.newUsedMargin)} ${form.accountCurrency}`} />
                    <Stat label="Free Margin After" value={`${fmtNum(result.account.freeMarginAfter)} ${form.accountCurrency}`} tone={result.account.freeMarginNegative ? "red" : "green"} />
                    {result.account.marginLevelPercent != null && <Stat label="Margin Level" value={`${fmtNum(result.account.marginLevelPercent, 2)}%`} />}
                    {result.account.marginUsagePercent != null && <Stat label="Margin Usage" value={`${fmtNum(result.account.marginUsagePercent, 2)}%`} />}
                    {result.account.positionMarginPercent != null && <Stat label="Position as % of Equity" value={`${fmtNum(result.account.positionMarginPercent, 2)}%`} />}
                  </div>
                  {result.account.usedMarginExceedsEquity && (
                    <p className="text-xs text-trading-gold mt-3 flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      The account figures entered imply used margin already exceeds equity. Check the values against your trading platform.
                    </p>
                  )}
                  {result.account.freeMarginNegative && (
                    <p className="text-xs text-trading-gold mt-3 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      With the values entered, the estimated margin requirement is greater than the free margin implied by your equity and existing used margin. A broker may reject an order when sufficient margin is unavailable; exact rules vary.
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Margin level does not by itself predict liquidation. Broker margin-call levels, stop-out levels and floating P/L treatment vary.
                  </p>
                </div>
              )}

              {/* Lot size link */}
              <div className="glass rounded-2xl p-4 border border-trading-green/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Margin tells you the collateral required — not the right position size for your risk.{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">
                    Use the XAUUSD Lot Size &amp; Risk Calculator
                  </Link>{" "}
                  to size a trade from account risk and stop-loss distance.
                </p>
              </div>
            </>
          )}

          {/* MAX_LOTS results */}
          {form.mode === "MAX_LOTS" && maxLotsResult && (
            <>
              {"error" in maxLotsResult ? (
                <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{maxLotsResult.error}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                    <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">BROKER-STEP MAX LOTS</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-trading-gold text-glow-gold mb-2">
                      {fmtSmart(maxLotsResult.brokerStepLots)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Raw mathematical lots: <span className="font-bold text-foreground">{fmtSmart(maxLotsResult.rawLots)}</span>
                    </p>
                  </div>
                  <div className="glass-strong rounded-2xl p-5 gradient-border">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <Stat label="Margin per 1 Lot" value={`${fmtNum(maxLotsResult.marginPerLotAccount)} ${form.accountCurrency}`} />
                      <Stat label="Margin Used at Rounded" value={`${fmtNum(maxLotsResult.marginUsedAtRounded)} ${form.accountCurrency}`} tone="green" />
                      <Stat label="Unused Margin" value={`${fmtNum(maxLotsResult.unusedMargin)} ${form.accountCurrency}`} />
                    </div>
                    {maxLotsResult.belowMinimum && (
                      <p className="text-xs text-trading-gold mt-3 flex items-start gap-2">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        The entered margin amount does not support the minimum volume under the specifications provided.
                      </p>
                    )}
                  </div>
                  <div className="glass rounded-2xl p-4 border border-trading-gold/20">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
                      Max lots from margin is a <strong>collateral calculation, not a risk-management position size</strong>. A position may fit within available margin but still expose the account to a large market loss.{" "}
                      <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">
                        Use the Lot Size &amp; Risk Calculator
                      </Link>{" "}
                      to size from account risk and stop-loss distance.
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {/* COMPARISON results */}
          {form.mode === "COMPARISON" && comparisonResult && (
            <>
              {"error" in comparisonResult ? (
                <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{comparisonResult.error}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="glass-strong rounded-2xl p-5 gradient-border">
                    <p className="text-sm text-muted-foreground mb-1">Exposure: <span className="font-bold text-foreground">{fmtSmart(comparisonResult.exposureOunces)} oz</span></p>
                    <p className="text-sm text-muted-foreground">Notional: <span className="font-bold text-foreground">${fmtNum(comparisonResult.notionalUSD)}</span> (identical across all rows)</p>
                  </div>
                  <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-3 font-bold text-foreground">Leverage</th>
                            <th className="text-left p-3 font-bold text-foreground">Margin Rate</th>
                            <th className="text-left p-3 font-bold text-foreground">Margin USD</th>
                            {isNonUsd && <th className="text-left p-3 font-bold text-foreground">Margin {form.accountCurrency}</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonResult.rows.map((row) => (
                            <tr key={row.leverage} className="border-b border-white/5 last:border-0">
                              <td className="p-3 text-trading-gold font-bold">1:{row.leverage}</td>
                              <td className="p-3 text-muted-foreground">{fmtNum(row.marginRatePercent, 3)}%</td>
                              <td className="p-3 text-trading-green font-bold">${fmtNum(row.marginUSD)}</td>
                              {isNonUsd && <td className="p-3 text-foreground">{fmtNum(row.marginAccount)}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-4 border border-trading-gold/20">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
                      Changing leverage from 1:100 to 1:500 does not change the ounces controlled by an unchanged lot size — only the required collateral changes. Higher leverage can make it possible to open larger exposure with less collateral, and that behavior can increase risk.
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Illustrative example table (spec §25) */}
      <div className="glass-strong rounded-2xl p-5 gradient-border">
        <h4 className="text-sm font-bold text-foreground mb-1">Illustrative Example — Gold $4,000, 100 oz Contract</h4>
        <p className="text-xs text-muted-foreground/70 mb-3">Not live market data. Exact amounts change with gold price and broker specifications.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                <th className="text-left p-2 font-bold">Lots</th>
                <th className="text-left p-2 font-bold">Ounces</th>
                <th className="text-left p-2 font-bold">Notional</th>
                <th className="text-left p-2 font-bold">1:100 Margin</th>
                <th className="text-left p-2 font-bold">1:500 Margin</th>
              </tr>
            </thead>
            <tbody>
              {ILLUSTRATIVE_TABLE.map((row) => (
                <tr key={row.lots} className="border-b border-white/5 last:border-0">
                  <td className="p-2 text-foreground font-bold">{row.lots.toFixed(2)}</td>
                  <td className="p-2 text-muted-foreground">{row.ounces} oz</td>
                  <td className="p-2 text-muted-foreground">${row.notional.toLocaleString()}</td>
                  <td className="p-2 text-trading-green font-bold">${row.margin100}</td>
                  <td className="p-2 text-trading-gold font-bold">${row.margin500}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

function Field({
  id, label, value, onChange, placeholder,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
      />
    </div>
  );
}

function Stat({
  label, value, sub, tone,
}: {
  label: string; value: string; sub?: string; tone?: "gold" | "green" | "red";
}) {
  const color = tone === "gold" ? "text-trading-gold" : tone === "green" ? "text-trading-green" : tone === "red" ? "text-trading-red" : "text-foreground";
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground/70">{sub}</p>}
    </div>
  );
}

export default XauusdMarginCalculator;
