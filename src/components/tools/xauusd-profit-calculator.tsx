"use client";

/**
 * XauusdProfitCalculator
 *
 * Free, fully client-side XAUUSD profit & gold P&L calculator.
 * Four modes: Profit/Loss, Find Exit Price, Partial Close, Gold Move.
 * All math driven by the pure module at @/lib/xauusd-profit-calc.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateProfit,
  DEFAULT_INPUTS,
  GOLD_MOVE_PRESETS,
  STATIC_MOVE_TABLE,
  roundTo,
  smartRound,
  type CalculatorMode,
  type Direction,
  type IncrementConvention,
  type AllocationMode,
  type ProfitInputs,
  type ProfitResult,
} from "@/lib/xauusd-profit-calc";
import {
  AlertTriangle, Info, TrendingUp, TrendingDown, Target,
  Layers, ChevronRight, Plus, Trash2, Coins,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  direction: Direction;
  entry: string;
  exit: string;
  lots: string;
  contractSize: string;
  accountCurrency: string;
  conversionRate: string;
  incrementConvention: IncrementConvention;
  customIncrement: string;
  // costs
  commissionPerLot: string;
  swapCost: string;
  otherFees: string;
  // find exit
  desiredNetProfit: string;
  // partial close
  partialExits: { exitPrice: string; allocation: string }[];
  allocationMode: AllocationMode;
  // gold move
  customMoveAmount: string;
  // account balance
  accountBalance: string;
}

const INITIAL_FORM: FormState = {
  mode: "PROFIT_LOSS",
  direction: "BUY",
  entry: "4000",
  exit: "4020",
  lots: "0.10",
  contractSize: "100",
  accountCurrency: "USD",
  conversionRate: "1",
  incrementConvention: "INC_001",
  customIncrement: "",
  commissionPerLot: "",
  swapCost: "",
  otherFees: "",
  desiredNetProfit: "200",
  partialExits: [
    { exitPrice: "4010", allocation: "50" },
    { exitPrice: "4020", allocation: "50" },
  ],
  allocationMode: "PERCENTAGE",
  customMoveAmount: "",
  accountBalance: "",
};

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return null;
  return parsed;
}

const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD", "JPY", "PKR", "Custom"];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function XauusdProfitCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* -------- build calc inputs -------- */
  const inputs: ProfitInputs = useMemo(() => {
    const base: ProfitInputs = {
      mode: form.mode,
      direction: form.direction,
      entry: toNumberOrNull(form.entry) ?? 0,
      exit: toNumberOrNull(form.exit) ?? undefined,
      lots: toNumberOrNull(form.lots) ?? 0,
      contractSize: toNumberOrNull(form.contractSize) ?? 100,
      accountCurrency: form.accountCurrency === "Custom" ? "USD" : form.accountCurrency,
      conversionRate: toNumberOrNull(form.conversionRate) ?? 1,
      incrementConvention: form.incrementConvention,
      customIncrement: form.incrementConvention === "CUSTOM" ? toNumberOrNull(form.customIncrement) ?? undefined : undefined,
      commissionPerLot: toNumberOrNull(form.commissionPerLot) ?? 0,
      swapCost: toNumberOrNull(form.swapCost) ?? 0,
      otherFees: toNumberOrNull(form.otherFees) ?? 0,
      desiredNetProfit: toNumberOrNull(form.desiredNetProfit) ?? 0,
      allocationMode: form.allocationMode,
      customMoveAmount: toNumberOrNull(form.customMoveAmount) ?? undefined,
      accountBalance: toNumberOrNull(form.accountBalance),
    };
    if (form.mode === "PARTIAL_CLOSE") {
      base.partialExits = form.partialExits.map((pe) => ({
        exitPrice: toNumberOrNull(pe.exitPrice) ?? 0,
        allocation: toNumberOrNull(pe.allocation) ?? 0,
      }));
    }
    return base;
  }, [form]);

  const result: ProfitResult = useMemo(() => calculateProfit(inputs), [inputs]);

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
  const hasCosts = !!(toNumberOrNull(form.commissionPerLot) || toNumberOrNull(form.swapCost) || toNumberOrNull(form.otherFees));

  const addPartialExit = () => {
    if (form.partialExits.length >= 4) return;
    update("partialExits", [...form.partialExits, { exitPrice: "", allocation: "" }]);
  };
  const removePartialExit = (i: number) => update("partialExits", form.partialExits.filter((_, idx) => idx !== i));
  const updatePartialExit = (i: number, field: "exitPrice" | "allocation", val: string) => {
    const next = [...form.partialExits];
    next[i] = { ...next[i], [field]: val };
    update("partialExits", next);
  };

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "PROFIT_LOSS", label: "Profit / Loss" },
          { id: "FIND_EXIT", label: "Find Exit Price" },
          { id: "PARTIAL_CLOSE", label: "Partial Close" },
          { id: "GOLD_MOVE", label: "Gold Move" },
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
          <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <Coins className="w-5 h-5 text-trading-gold" />
            Trade Inputs
          </h3>

          {/* Direction (all but GOLD_MOVE) */}
          {form.mode !== "GOLD_MOVE" && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">DIRECTION</label>
              <div className="grid grid-cols-2 gap-2">
                {(["BUY", "SELL"] as Direction[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => update("direction", d)}
                    aria-pressed={form.direction === d}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      form.direction === d
                        ? d === "BUY"
                          ? "bg-trading-green/20 text-trading-green border border-trading-green/50"
                          : "bg-trading-red/20 text-trading-red border border-trading-red/50"
                        : "glass text-muted-foreground hover:text-foreground border border-white/10"
                    }`}
                  >
                    {d === "BUY" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {d === "BUY" ? "Buy" : "Sell"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Entry (all but GOLD_MOVE) */}
          {form.mode !== "GOLD_MOVE" && (
            <Field id="p-entry" label="Entry Price (XAUUSD)" value={form.entry} onChange={(v) => update("entry", v)} placeholder="e.g. 4000" />
          )}

          {/* Exit (PROFIT_LOSS only) */}
          {form.mode === "PROFIT_LOSS" && (
            <Field id="p-exit" label="Exit Price (XAUUSD)" value={form.exit} onChange={(v) => update("exit", v)} placeholder="e.g. 4020" />
          )}

          {/* Lots (all) */}
          <Field id="p-lots" label="Lots" value={form.lots} onChange={(v) => update("lots", v)} placeholder="e.g. 0.10" />

          {/* Contract size (all) */}
          <Field id="p-contract" label="Contract Size (oz per 1.00 lot)" value={form.contractSize} onChange={(v) => update("contractSize", v)} placeholder="e.g. 100" />

          {/* FIND_EXIT: desired profit */}
          {form.mode === "FIND_EXIT" && (
            <Field id="p-desired" label={`Desired Net Profit (${form.accountCurrency})`} value={form.desiredNetProfit} onChange={(v) => update("desiredNetProfit", v)} placeholder="e.g. 200" />
          )}

          {/* PARTIAL_CLOSE: exits */}
          {form.mode === "PARTIAL_CLOSE" && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">ALLOCATION MODE</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(["PERCENTAGE", "LOTS"] as AllocationMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => update("allocationMode", m)}
                    aria-pressed={form.allocationMode === m}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                      form.allocationMode === m
                        ? "bg-trading-gold/15 text-trading-gold border-trading-gold/40"
                        : "glass text-muted-foreground border-white/10"
                    }`}
                  >
                    {m === "PERCENTAGE" ? "Percentage %" : "Lots"}
                  </button>
                ))}
              </div>
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">PARTIAL EXITS (1–4)</label>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {form.partialExits.map((pe, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-10 shrink-0">#{i + 1}</span>
                    <input
                      type="number"
                      step="any"
                      value={pe.exitPrice}
                      onChange={(e) => updatePartialExit(i, "exitPrice", e.target.value)}
                      placeholder="Exit price"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                    />
                    <input
                      type="number"
                      step="any"
                      value={pe.allocation}
                      onChange={(e) => updatePartialExit(i, "allocation", e.target.value)}
                      placeholder={form.allocationMode === "PERCENTAGE" ? "%" : "lots"}
                      className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                    />
                    <button
                      onClick={() => removePartialExit(i)}
                      aria-label={`Remove exit ${i + 1}`}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-trading-red hover:bg-trading-red/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {form.partialExits.length < 4 && (
                <button
                  onClick={addPartialExit}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-trading-green hover:text-trading-green/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Exit
                </button>
              )}
              <p className="text-xs text-muted-foreground/70 mt-2">
                {form.allocationMode === "PERCENTAGE"
                  ? "Allocations must total ≤ 100%. Remainder stays open."
                  : "Sum of closed lots must not exceed total lots."}
              </p>
            </div>
          )}

          {/* GOLD_MOVE: custom move */}
          {form.mode === "GOLD_MOVE" && (
            <Field id="p-custommove" label="Custom Move Amount (optional)" value={form.customMoveAmount} onChange={(v) => update("customMoveAmount", v)} placeholder="e.g. 15" />
          )}

          {/* Account currency (all) */}
          <div className="mb-4">
            <label htmlFor="p-curr" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">ACCOUNT CURRENCY</label>
            <select
              id="p-curr"
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
            <Field id="p-conv" label={`USD → ${form.accountCurrency} Conversion Rate`} value={form.conversionRate} onChange={(v) => update("conversionRate", v)} placeholder="e.g. 0.92" />
          )}

          {/* Advanced: costs + increment + balance */}
          <details className="mt-4 group">
            <summary className="flex items-center gap-2 text-xs font-bold text-trading-gold cursor-pointer list-none select-none mb-3">
              <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              Advanced: Trading Costs, Increment, Account Balance
            </summary>
            <div className="space-y-3 pl-1">
              {form.mode !== "GOLD_MOVE" && (
                <>
                  <Field id="p-comm" label={`Commission per 1.00 Lot (${form.accountCurrency})`} value={form.commissionPerLot} onChange={(v) => update("commissionPerLot", v)} placeholder="e.g. 7" />
                  <Field id="p-swap" label={`Swap / Financing Cost (${form.accountCurrency})`} value={form.swapCost} onChange={(v) => update("swapCost", v)} placeholder="e.g. 5" />
                  <Field id="p-other" label={`Other Fees (${form.accountCurrency})`} value={form.otherFees} onChange={(v) => update("otherFees", v)} placeholder="e.g. 2" />
                </>
              )}
              <div className="mb-4">
                <label htmlFor="p-inc" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">PRICE INCREMENT CONVENTION</label>
                <select
                  id="p-inc"
                  value={form.incrementConvention}
                  onChange={(e) => update("incrementConvention", e.target.value as IncrementConvention)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                >
                  <option value="INC_001" className="bg-trading-dark">$0.01 increment</option>
                  <option value="INC_010" className="bg-trading-dark">$0.10 increment</option>
                  <option value="CUSTOM" className="bg-trading-dark">Custom increment</option>
                </select>
                {form.incrementConvention === "CUSTOM" && (
                  <input
                    id="p-custominc"
                    type="number"
                    step="any"
                    value={form.customIncrement}
                    onChange={(e) => update("customIncrement", e.target.value)}
                    placeholder="e.g. 0.05"
                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                  />
                )}
                <p className="text-xs text-muted-foreground/70 mt-1.5">
                  The increment only affects display — core P&L is unchanged. For pip value details, see{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Pip Value Calculator</Link>.
                </p>
              </div>
              {form.mode === "PROFIT_LOSS" && (
                <Field id="p-balance" label={`Account Balance (optional, ${form.accountCurrency})`} value={form.accountBalance} onChange={(v) => update("accountBalance", v)} placeholder="e.g. 2000" />
              )}
            </div>
          </details>

          {/* Example notice */}
          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Default values are an <strong>illustrative example</strong> — not live gold prices. Contract size, execution prices and costs vary by broker; enter values that match your account.</span>
          </div>
        </div>

        {/* ---------------- RESULTS ---------------- */}
        <div className="space-y-4">
          {/* Error */}
          {!result.valid && result.error && (
            <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert" aria-live="assertive">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{result.error}</p>
              </div>
            </div>
          )}

          {result.valid && (
            <>
              {/* PROFIT_LOSS results */}
              {form.mode === "PROFIT_LOSS" && (
                <>
                  {/* Headline Net P/L */}
                  <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                    <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">
                      {hasCosts ? "NET P/L" : "GROSS P/L"}
                    </p>
                    <p className={`text-4xl md:text-5xl font-extrabold mb-2 ${result.netPnLAccount >= 0 ? "text-trading-green text-glow-green" : "text-trading-red"}`}>
                      {result.netPnLAccount >= 0 ? "+" : ""}{fmtNum(result.netPnLAccount)} {form.accountCurrency}
                    </p>
                    {hasCosts && (
                      <p className="text-sm text-muted-foreground">
                        Gross: <span className="font-bold text-foreground">{result.grossPnLAccount >= 0 ? "+" : ""}{fmtNum(result.grossPnLAccount)}</span> · Costs: <span className="font-bold text-trading-red">−{fmtNum(result.costs!.totalCosts)}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {result.netPnLAccount > 0 ? "Profit" : result.netPnLAccount < 0 ? "Loss" : "Break-even before entered costs"}
                    </p>
                  </div>

                  {/* Visual summary cards */}
                  <div className="glass-strong rounded-2xl p-5 gradient-border">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">PRICE MOVE</p>
                        <p className={`text-lg font-bold ${result.directionalMovement >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                          {result.directionalMovement >= 0 ? "+" : ""}{fmtSmart(result.directionalMovement)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">EXPOSURE</p>
                        <p className="text-lg font-bold text-foreground">{fmtSmart(result.exposureOunces)} oz</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">VALUE / $1 MOVE</p>
                        <p className="text-lg font-bold text-trading-gold">{fmtNum(result.valuePerDollarMoveAccount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">PRICE MOVE %</p>
                        <p className="text-lg font-bold text-foreground">{fmtNum(result.priceDistancePercent, 3)}%</p>
                      </div>
                      {result.increment && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">INCREMENT COUNT</p>
                          <p className="text-lg font-bold text-foreground">{fmtSmart(result.increment.incrementCount)}</p>
                        </div>
                      )}
                      {result.pnlPercentOfBalance != null && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">% OF BALANCE</p>
                          <p className={`text-lg font-bold ${result.pnlPercentOfBalance >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                            {fmtNum(result.pnlPercentOfBalance, 2)}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Break-even */}
                  {result.breakEvenExit != null && (
                    <div className="glass-strong rounded-2xl p-5 gradient-border">
                      <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-trading-gold" />
                        Break-Even Exit Price
                      </h4>
                      <p className="text-2xl font-bold text-trading-gold">{fmtSmart(result.breakEvenExit)}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {hasCosts ? "Accounting for entered costs." : "No costs entered — break-even equals entry."}
                      </p>
                    </div>
                  )}
                  {result.breakEvenMessage && (
                    <div className="glass rounded-2xl p-4 border border-trading-gold/20">
                      <p className="text-xs text-muted-foreground">{result.breakEvenMessage}</p>
                    </div>
                  )}

                  {/* Tool links */}
                  <div className="glass rounded-2xl p-4 border border-trading-green/20">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Need position size from account risk? Use the{" "}
                      <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>
                      . For payoff geometry, the{" "}
                      <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
                      . For collateral, the{" "}
                      <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Margin Calculator</Link>
                      .
                    </p>
                  </div>
                </>
              )}

              {/* FIND_EXIT results */}
              {form.mode === "FIND_EXIT" && (
                <>
                  {result.requiredExit != null ? (
                    <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                      <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">REQUIRED EXIT PRICE</p>
                      <p className="text-4xl md:text-5xl font-extrabold text-trading-gold text-glow-gold mb-2">
                        {fmtSmart(result.requiredExit)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        To achieve {fmtNum(toNumberOrNull(form.desiredNetProfit) ?? 0)} {form.accountCurrency} net profit
                      </p>
                    </div>
                  ) : (
                    <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{result.error}</p>
                      </div>
                    </div>
                  )}
                  <div className="glass-strong rounded-2xl p-5 gradient-border">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <Stat label="Desired Net Profit" value={`${fmtNum(toNumberOrNull(form.desiredNetProfit) ?? 0)} ${form.accountCurrency}`} tone="green" />
                      <Stat label="Required Gross Profit" value={`${fmtNum(result.requiredGrossProfitAccount ?? 0)} ${form.accountCurrency}`} />
                      <Stat label="Required Price Movement" value={fmtSmart(result.requiredPriceMove ?? 0)} tone="gold" />
                      <Stat label="Price Movement %" value={`${fmtNum(result.priceDistancePercent, 3)}%`} />
                      <Stat label="Exposure" value={`${fmtSmart(result.exposureOunces)} oz`} />
                      <Stat label="Value / $1 Move" value={fmtNum(result.valuePerDollarMoveAccount)} />
                    </div>
                  </div>
                </>
              )}

              {/* PARTIAL_CLOSE results */}
              {form.mode === "PARTIAL_CLOSE" && result.partial && (
                <>
                  <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                    <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">NET REALIZED P/L (CLOSED PORTION)</p>
                    <p className={`text-4xl md:text-5xl font-extrabold mb-2 ${result.partial.netRealizedPnLAccount >= 0 ? "text-trading-green text-glow-green" : "text-trading-red"}`}>
                      {result.partial.netRealizedPnLAccount >= 0 ? "+" : ""}{fmtNum(result.partial.netRealizedPnLAccount)} {form.accountCurrency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gross: <span className="font-bold text-foreground">{fmtNum(result.partial.totalRealizedGrossAccount)}</span> · Costs: <span className="font-bold text-trading-red">−{fmtNum(result.partial.totalCosts)}</span>
                    </p>
                  </div>
                  <div className="glass-strong rounded-2xl p-5 gradient-border">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <Stat label="Total Lots" value={fmtSmart(result.partial.totalLots)} />
                      <Stat label="Closed Lots" value={fmtSmart(result.partial.closedLots)} tone="green" />
                      <Stat label="Remaining Open" value={fmtSmart(result.partial.remainingOpenLots)} tone="gold" />
                      <Stat label="% Closed" value={`${fmtNum(result.partial.percentageClosed, 1)}%`} />
                      {result.partial.weightedAverageExit != null && (
                        <Stat label="Weighted Avg Exit" value={fmtSmart(result.partial.weightedAverageExit)} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-2">This output describes the CLOSED portion only. Remaining open lots are not assigned hypothetical P/L.</p>
                  </div>
                  <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-3 font-bold text-foreground">Exit</th>
                            <th className="text-left p-3 font-bold text-foreground">{form.allocationMode === "PERCENTAGE" ? "Alloc %" : "Closed Lots"}</th>
                            <th className="text-left p-3 font-bold text-foreground">Price</th>
                            <th className="text-left p-3 font-bold text-foreground">Gross P/L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.partial.exits.map((e, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0">
                              <td className="p-3 text-muted-foreground">#{i + 1}</td>
                              <td className="p-3 text-foreground">{form.allocationMode === "PERCENTAGE" ? `${fmtNum(e.allocation, 1)}%` : fmtSmart(e.closedLots)}</td>
                              <td className="p-3 text-foreground">{fmtSmart(e.exitPrice)}</td>
                              <td className={`p-3 font-bold ${e.grossPnLUSD >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                                {e.grossPnLUSD >= 0 ? "+" : ""}{fmtNum(e.grossPnLUSD)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* GOLD_MOVE results */}
              {form.mode === "GOLD_MOVE" && result.goldMoveTable && (
                <>
                  <div className="glass-strong rounded-2xl p-6 gradient-border text-center">
                    <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">EXPOSURE</p>
                    <p className="text-3xl font-extrabold text-trading-gold mb-1">{fmtSmart(result.exposureOunces)} oz</p>
                    <p className="text-sm text-muted-foreground">Value per $1 move: <span className="font-bold text-trading-green">{fmtNum(result.valuePerDollarMoveAccount)} {form.accountCurrency}</span></p>
                  </div>
                  <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-3 font-bold text-foreground">Gold Move</th>
                            <th className="text-left p-3 font-bold text-foreground">Favorable</th>
                            <th className="text-left p-3 font-bold text-foreground">Adverse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.goldMoveTable.map((row) => (
                            <tr key={row.move} className="border-b border-white/5 last:border-0">
                              <td className="p-3 text-trading-gold font-bold">${row.move}</td>
                              <td className="p-3 text-trading-green font-bold">+{fmtNum(row.favorableAccount)}</td>
                              <td className="p-3 text-trading-red font-bold">{fmtNum(row.adverseAccount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Static educational table */}
      <div className="glass-strong rounded-2xl p-5 gradient-border">
        <h4 className="text-sm font-bold text-foreground mb-1">How Much Profit Does 0.01 / 0.10 / 1.00 Lot Gold Make?</h4>
        <p className="text-xs text-muted-foreground/70 mb-3">Illustrative contract size: 100 oz per 1.00 lot. Before costs. Actual profit depends on how far XAUUSD moves.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                <th className="text-left p-2 font-bold">Lots</th>
                <th className="text-left p-2 font-bold">Gold Exposure</th>
                <th className="text-left p-2 font-bold">$1 Move</th>
                <th className="text-left p-2 font-bold">$10 Move</th>
                <th className="text-left p-2 font-bold">$20 Move</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_MOVE_TABLE.map((row) => (
                <tr key={row.lots} className="border-b border-white/5 last:border-0">
                  <td className="p-2 text-foreground font-bold">{row.lots.toFixed(2)}</td>
                  <td className="p-2 text-muted-foreground">{row.exposure}</td>
                  <td className="p-2 text-trading-green font-bold">${row.move1}</td>
                  <td className="p-2 text-trading-green font-bold">${row.move10}</td>
                  <td className="p-2 text-trading-green font-bold">${row.move20}</td>
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

export default XauusdProfitCalculator;
