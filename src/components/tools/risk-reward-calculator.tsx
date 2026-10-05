"use client";

/**
 * RiskRewardCalculator
 *
 * Free, fully client-side Forex & XAUUSD risk/reward calculator.
 * Four modes: Analyze Trade, Find Take Profit, Find Stop Loss, Multiple Targets.
 * All math driven by the pure module at @/lib/risk-reward-calc.
 *
 * Terminology standard: Risk : Reward = 1 : R (never "R : 1" labelled as R:R).
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  analyzeRiskReward,
  calculateBreakEvenWinRate,
  DEFAULT_INPUTS,
  DISPLAY_MODE_LABELS,
  R_PRESETS,
  BREAK_EVEN_TABLE,
  roundTo,
  smartRound,
  type CalculatorMode,
  type Direction,
  type DisplayMode,
  type RiskRewardInputs,
  type RiskRewardResult,
} from "@/lib/risk-reward-calc";
import {
  TrendingUp, TrendingDown, Target, Crosshair, AlertTriangle,
  CheckCircle2, Info, Scale, ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  direction: Direction;
  entry: string;
  stop: string;
  target: string;
  desiredR: string;
  displayMode: DisplayMode;
  customIncrement: string;
  riskAmount: string;
  winRate: string;
  tradingCost: string;
  // multi-target
  tp1Price: string; tp1Alloc: string;
  tp2Price: string; tp2Alloc: string;
  tp3Price: string; tp3Alloc: string;
  tp4Price: string; tp4Alloc: string;
  tpCount: 1 | 2 | 3 | 4;
}

const INITIAL_FORM: FormState = {
  mode: "ANALYZE",
  direction: "LONG",
  entry: "4000",
  stop: "3990",
  target: "4020",
  desiredR: "2",
  displayMode: "XAUUSD_001",
  customIncrement: "",
  riskAmount: "",
  winRate: "",
  tradingCost: "",
  tp1Price: "4010", tp1Alloc: "50",
  tp2Price: "4020", tp2Alloc: "50",
  tp3Price: "", tp3Alloc: "",
  tp4Price: "", tp4Alloc: "",
  tpCount: 2,
};

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return null;
  return parsed;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function RiskRewardCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* -------- build calc inputs -------- */
  const inputs: RiskRewardInputs = useMemo(() => {
    const displayMode = form.displayMode;
    const customIncrement =
      displayMode === "CUSTOM" ? toNumberOrNull(form.customIncrement) ?? undefined : undefined;

    const base = {
      mode: form.mode,
      direction: form.direction,
      entry: toNumberOrNull(form.entry) ?? 0,
      stop: toNumberOrNull(form.stop) ?? undefined,
      target: toNumberOrNull(form.target) ?? undefined,
      desiredR: toNumberOrNull(form.desiredR) ?? undefined,
      displayMode,
      customIncrement,
      riskAmount: toNumberOrNull(form.riskAmount),
      winRate: toNumberOrNull(form.winRate),
      tradingCost: toNumberOrNull(form.tradingCost),
    };

    if (form.mode === "MULTI_TARGET") {
      const targets: { targetPrice: number; allocationPercent: number }[] = [];
      const pairs: [string, string][] = [
        [form.tp1Price, form.tp1Alloc],
        [form.tp2Price, form.tp2Alloc],
        [form.tp3Price, form.tp3Alloc],
        [form.tp4Price, form.tp4Alloc],
      ];
      for (let i = 0; i < form.tpCount; i++) {
        const price = toNumberOrNull(pairs[i][0]);
        const alloc = toNumberOrNull(pairs[i][1]);
        if (price != null && alloc != null) {
          targets.push({ targetPrice: price, allocationPercent: alloc });
        }
      }
      return { ...base, targets };
    }
    return base;
  }, [form]);

  const result: RiskRewardResult = useMemo(() => analyzeRiskReward(inputs), [inputs]);

  /* -------- handlers -------- */
  const handleModeChange = (mode: CalculatorMode) => {
    setForm((prev) => ({ ...prev, mode }));
  };
  const handleDirectionChange = (direction: Direction) => {
    setForm((prev) => ({ ...prev, direction }));
  };
  const handleReset = () => setForm(INITIAL_FORM);

  const fmtNum = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    return roundTo(n, decimals).toFixed(decimals);
  };
  const fmtSmart = (n: number): string => {
    if (!isFinite(n)) return "—";
    return String(smartRound(n));
  };

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "ANALYZE", label: "Analyze Trade" },
          { id: "FIND_TARGET", label: "Find Take Profit" },
          { id: "FIND_STOP", label: "Find Stop Loss" },
          { id: "MULTI_TARGET", label: "Multiple Targets" },
        ] as { id: CalculatorMode; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={form.mode === tab.id}
            onClick={() => handleModeChange(tab.id)}
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
              <Crosshair className="w-5 h-5 text-trading-gold" />
              Trade Inputs
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-medium text-muted-foreground hover:text-trading-green transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Direction */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">DIRECTION</label>
            <div className="grid grid-cols-2 gap-2">
              {(["LONG", "SHORT"] as Direction[]).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDirectionChange(d)}
                  aria-pressed={form.direction === d}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    form.direction === d
                      ? d === "LONG"
                        ? "bg-trading-green/20 text-trading-green border border-trading-green/50"
                        : "bg-trading-red/20 text-trading-red border border-trading-red/50"
                      : "glass text-muted-foreground hover:text-foreground border border-white/10"
                  }`}
                >
                  {d === "LONG" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {d === "LONG" ? "Long / Buy" : "Short / Sell"}
                </button>
              ))}
            </div>
          </div>

          {/* Entry (always) */}
          <Field
            id="rr-entry"
            label="Entry Price"
            value={form.entry}
            onChange={(v) => update("entry", v)}
            placeholder="e.g. 4000"
          />

          {/* Stop — ANALYZE, FIND_TARGET, MULTI_TARGET */}
          {(form.mode === "ANALYZE" || form.mode === "FIND_TARGET" || form.mode === "MULTI_TARGET") && (
            <Field
              id="rr-stop"
              label="Stop Loss"
              value={form.stop}
              onChange={(v) => update("stop", v)}
              placeholder="e.g. 3990"
            />
          )}

          {/* Target — ANALYZE, FIND_STOP */}
          {(form.mode === "ANALYZE" || form.mode === "FIND_STOP") && (
            <Field
              id="rr-target"
              label="Take Profit"
              value={form.target}
              onChange={(v) => update("target", v)}
              placeholder="e.g. 4020"
            />
          )}

          {/* Desired R — FIND_TARGET, FIND_STOP */}
          {(form.mode === "FIND_TARGET" || form.mode === "FIND_STOP") && (
            <div className="mb-4">
              <label htmlFor="rr-desired-r" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
                DESIRED R (REWARD MULTIPLE)
              </label>
              <input
                id="rr-desired-r"
                type="number"
                step="0.1"
                value={form.desiredR}
                onChange={(e) => update("desiredR", e.target.value)}
                placeholder="e.g. 2"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {R_PRESETS.map((r) => (
                  <button
                    key={r}
                    onClick={() => update("desiredR", String(r))}
                    className="px-2.5 py-1 rounded-md text-xs font-bold glass text-muted-foreground hover:text-trading-green hover:border-trading-green/30 border border-white/10 transition-colors"
                  >
                    {r}R
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Multi-target inputs */}
          {form.mode === "MULTI_TARGET" && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
                TAKE-PROFIT TARGETS ({form.tpCount} ACTIVE)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {([1, 2, 3, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => update("tpCount", n)}
                    aria-pressed={form.tpCount === n}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${
                      form.tpCount === n
                        ? "bg-trading-gold/20 text-trading-gold border-trading-gold/40"
                        : "glass text-muted-foreground hover:text-foreground border-white/10"
                    }`}
                  >
                    {n} TP{n > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {([1, 2, 3, 4] as const).map((i) => {
                  if (i > form.tpCount) return null;
                  const priceKey = `tp${i}Price` as keyof FormState;
                  const allocKey = `tp${i}Alloc` as keyof FormState;
                  return (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor={`rr-tp${i}-price`} className="sr-only">TP{i} price</label>
                        <input
                          id={`rr-tp${i}-price`}
                          type="number"
                          step="any"
                          value={form[priceKey] as string}
                          onChange={(e) => update(priceKey, e.target.value)}
                          placeholder={`TP${i} price`}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:border-trading-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={`rr-tp${i}-alloc`} className="sr-only">TP{i} allocation %</label>
                        <input
                          id={`rr-tp${i}-alloc`}
                          type="number"
                          step="any"
                          value={form[allocKey] as string}
                          onChange={(e) => update(allocKey, e.target.value)}
                          placeholder={`TP${i} alloc %`}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:border-trading-green focus:outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Allocations must total 100%. {form.direction === "LONG" ? "Targets must ascend (TP1 &lt; TP2…)." : "Targets must descend (TP1 &gt; TP2…)."}
              </p>
            </div>
          )}

          {/* Display mode */}
          <div className="mb-4">
            <label htmlFor="rr-display" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
              DISPLAY / PIP CONVENTION
            </label>
            <select
              id="rr-display"
              value={form.displayMode}
              onChange={(e) => update("displayMode", e.target.value as DisplayMode)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
            >
              {(Object.keys(DISPLAY_MODE_LABELS) as DisplayMode[]).map((m) => (
                <option key={m} value={m} className="bg-trading-dark">
                  {DISPLAY_MODE_LABELS[m]}
                </option>
              ))}
            </select>
            {form.displayMode === "CUSTOM" && (
              <input
                id="rr-custom-inc"
                type="number"
                step="any"
                value={form.customIncrement}
                onChange={(e) => update("customIncrement", e.target.value)}
                placeholder="Custom increment (e.g. 0.05)"
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
              />
            )}
            <p className="text-xs text-muted-foreground/70 mt-1.5">
              The R:R ratio is unaffected by this choice — it only changes how distances are displayed.
            </p>
          </div>

          {/* Advanced toggles */}
          <details className="mt-4 group">
            <summary className="flex items-center gap-2 text-xs font-bold text-trading-gold cursor-pointer list-none select-none mb-3">
              <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              Advanced (Risk Amount, Win Rate, Trading Cost)
            </summary>
            <div className="space-y-3 pl-1">
              <Field
                id="rr-risk-amount"
                label="Risk Amount (Account Currency, optional)"
                value={form.riskAmount}
                onChange={(v) => update("riskAmount", v)}
                placeholder="e.g. 100"
              />
              {form.mode !== "MULTI_TARGET" && (
                <Field
                  id="rr-winrate"
                  label="Historical Win Rate % (optional, 0–100)"
                  value={form.winRate}
                  onChange={(v) => update("winRate", v)}
                  placeholder="e.g. 45"
                />
              )}
              {form.mode === "ANALYZE" && (
                <Field
                  id="rr-cost"
                  label="Estimated Round-Trip Trading Cost (price units, optional)"
                  value={form.tradingCost}
                  onChange={(v) => update("tradingCost", v)}
                  placeholder="e.g. 0.5"
                />
              )}
              {form.mode === "MULTI_TARGET" && (
                <p className="text-xs text-muted-foreground/70">
                  Trading-cost adjustment applies to single-target trades only.
                </p>
              )}
            </div>
          </details>

          {/* Example notice */}
          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Default values are an <strong>illustrative example</strong> — not live market prices. This calculator performs trade-planning math only; it does not estimate the probability of any outcome.</span>
          </div>
        </div>

        {/* ---------------- RESULTS ---------------- */}
        <div className="space-y-4">
          {/* Error */}
          {!result.valid && result.error && (
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

          {result.valid && (
            <>
              {/* Headline R:R */}
              <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">RISK : REWARD</p>
                <p className="text-4xl md:text-5xl font-extrabold text-trading-gold text-glow-gold mb-3">
                  1 : {fmtNum(result.rMultiple, 2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Reward Multiple:{" "}
                  <span className="font-bold text-trading-green">{fmtNum(result.rMultiple, 2)}R</span>
                </p>
                {form.mode === "MULTI_TARGET" && (
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Weighted planned reward across {form.tpCount} target{form.tpCount > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Distances */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-trading-gold" />
                  Price Distances
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Risk Distance" value={fmtSmart(result.riskDistance)} sub={result.riskIncrementUnits != null ? `${fmtNum(result.riskIncrementUnits, 1)} units` : undefined} tone="gold" />
                  <Stat label="Reward Distance" value={result.mode === "MULTI_TARGET" ? "see targets" : fmtSmart(result.rewardDistance)} sub={result.rewardIncrementUnits != null && result.mode !== "MULTI_TARGET" ? `${fmtNum(result.rewardIncrementUnits, 1)} units` : undefined} tone="green" />
                  <Stat label="Risk % from Entry" value={`${fmtNum(result.riskPercentFromEntry, 3)}%`} sub="price distance" />
                  <Stat label="Reward % from Entry" value={result.mode === "MULTI_TARGET" ? "—" : `${fmtNum(result.rewardPercentFromEntry, 3)}%`} sub="price distance" />
                </div>
                {result.incrementSize != null && (
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Increment used: {result.incrementSize} per unit. Percentages describe price distance, not account risk.
                  </p>
                )}
              </div>

              {/* Solved price (FIND_TARGET / FIND_STOP) */}
              {(form.mode === "FIND_TARGET" || form.mode === "FIND_STOP") && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3">
                    {form.mode === "FIND_TARGET" ? "Solved Take Profit" : "Solved Stop Loss"}
                  </h4>
                  <p className="text-3xl font-extrabold text-trading-green">
                    {form.mode === "FIND_TARGET" ? fmtSmart(result.target!) : fmtSmart(result.stop!)}
                  </p>
                </div>
              )}

              {/* Break-even (single-target only) */}
              {result.breakEvenWinRate != null && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Theoretical Break-Even Win Rate</h4>
                  <p className="text-xs text-muted-foreground mb-3">Before trading costs · binary trade assumption</p>
                  <p className="text-3xl font-extrabold text-foreground">{fmtNum(result.breakEvenWinRate, 2)}%</p>
                </div>
              )}

              {/* Multi-target break-even notice */}
              {form.mode === "MULTI_TARGET" && (
                <div className="glass rounded-2xl p-4 border border-trading-gold/20">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Break-even win rate is not shown for multi-target plans because partial exits create multiple possible outcomes. Weighted R describes the planned payoff if each allocation exits at its specified target.
                    </p>
                  </div>
                </div>
              )}

              {/* Multi-target table */}
              {result.multiTarget && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3">Target Breakdown</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-muted-foreground">
                          <th className="text-left p-2 font-bold">Target</th>
                          <th className="text-left p-2 font-bold">Price</th>
                          <th className="text-left p-2 font-bold">Alloc</th>
                          <th className="text-left p-2 font-bold">R</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.multiTarget.targets.map((t, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="p-2 text-muted-foreground">TP{i + 1}</td>
                            <td className="p-2 text-foreground font-medium">{fmtSmart(t.targetPrice)}</td>
                            <td className="p-2 text-muted-foreground">{fmtNum(t.allocationPercent, 1)}%</td>
                            <td className="p-2 text-trading-green font-bold">{fmtNum(t.rMultiple, 2)}R</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Weighted Planned Reward:{" "}
                    <span className="font-bold text-trading-gold">{fmtNum(result.multiTarget.weightedR, 2)}R</span>
                  </p>
                </div>
              )}

              {/* Risk amount */}
              {result.potentialGrossReward != null && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3">Monetary (from Risk Amount)</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="Risk Amount" value={fmtNum(toNumberOrNull(form.riskAmount) ?? 0, 2)} tone="gold" />
                    <Stat label="Potential Gross Reward" value={fmtNum(result.potentialGrossReward, 2)} tone="green" />
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Need position size from account equity and stop distance?{" "}
                    <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Use the Lot Size Calculator</Link>.
                  </p>
                </div>
              )}

              {/* Expectancy */}
              {result.expectancy != null && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Mathematical Expectancy</h4>
                  <p className="text-xs text-muted-foreground mb-3">Using the win rate you entered · in R units</p>
                  <p className={`text-3xl font-extrabold ${result.expectancy >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                    {result.expectancy >= 0 ? "+" : ""}{fmtNum(result.expectancy, 3)}R
                  </p>
                </div>
              )}

              {/* Cost-adjusted */}
              {result.costAdjusted && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-1">Cost-Adjusted Metrics</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Trading cost {fmtSmart(result.costAdjusted.cost)} assumed incurred on either outcome
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="Gross R:R" value={`1 : ${fmtNum(result.rMultiple, 2)}`} tone="gold" />
                    <Stat
                      label="Cost-Adjusted R:R"
                      value={result.costAdjusted.netR != null ? `1 : ${fmtNum(result.costAdjusted.netR, 2)}` : "—"}
                      tone="green"
                    />
                    <Stat label="Adjusted Break-Even" value={`${fmtNum(result.costAdjusted.adjustedBreakEvenWinRate, 2)}%`} />
                    <Stat
                      label="Cost-Adjusted Expectancy"
                      value={result.costAdjusted.costAdjustedExpectancy != null ? `${result.costAdjusted.costAdjustedExpectancy >= 0 ? "+" : ""}${fmtNum(result.costAdjusted.costAdjustedExpectancy, 3)}R` : "—"}
                    />
                  </div>
                </div>
              )}

              {/* Visual trade map */}
              <TradeMap result={result} />
            </>
          )}
        </div>
      </div>

      {/* Break-even reference table */}
      <div className="glass-strong rounded-2xl p-5 gradient-border">
        <h4 className="text-sm font-bold text-foreground mb-3">Break-Even Win Rate Reference (Before Costs)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                <th className="text-left p-2 font-bold">Risk : Reward</th>
                <th className="text-left p-2 font-bold">Reward Multiple</th>
                <th className="text-left p-2 font-bold">Break-Even Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {BREAK_EVEN_TABLE.map((row) => (
                <tr key={row.riskReward} className="border-b border-white/5">
                  <td className="p-2 text-trading-gold font-bold">{row.riskReward}</td>
                  <td className="p-2 text-trading-green font-bold">{row.rMultiple.toFixed(2)}R</td>
                  <td className="p-2 text-foreground">{row.breakEven.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground/70 mt-2">
          These are theoretical binary thresholds before trading costs. A lower break-even rate does not mean a more distant target is equally likely to be reached.
        </p>
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
  label: string; value: string; sub?: string; tone?: "gold" | "green";
}) {
  const color = tone === "gold" ? "text-trading-gold" : tone === "green" ? "text-trading-green" : "text-foreground";
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground/70">{sub}</p>}
    </div>
  );
}

function TradeMap({ result }: { result: RiskRewardResult }) {
  if (result.mode === "MULTI_TARGET") {
    // Multi-target vertical map
    const isLong = result.direction === "LONG";
    const targets = result.multiTarget!.targets;
    const ordered = isLong ? [...targets].reverse() : targets; // top-to-bottom: highest price first
    const prices = [result.stop!, ...ordered.map((t) => t.targetPrice), result.entry];
    // Build a sorted list of (label, price) top (high) to bottom (low)
    const items: { label: string; price: number; tone: "stop" | "entry" | "tp" }[] = isLong
      ? [...ordered.map((t, i) => ({ label: `TP${ordered.length - i}`, price: t.targetPrice, tone: "tp" as const })),
         { label: "ENTRY", price: result.entry, tone: "entry" as const },
         { label: "STOP", price: result.stop!, tone: "stop" as const }]
      : [{ label: "STOP", price: result.stop!, tone: "stop" as const },
         { label: "ENTRY", price: result.entry, tone: "entry" as const },
         ...ordered.map((t, i) => ({ label: `TP${i + 1}`, price: t.targetPrice, tone: "tp" as const }))];
    return (
      <div className="glass-strong rounded-2xl p-5 gradient-border">
        <h4 className="text-sm font-bold text-foreground mb-3">Trade Map</h4>
        <div className="flex flex-col gap-2" role="img" aria-label={`Trade map: ${items.map((i) => `${i.label} at ${roundTo(i.price, 2)}`).join(", ")}`}>
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-20 text-xs font-bold text-right ${it.tone === "stop" ? "text-trading-red" : it.tone === "entry" ? "text-foreground" : "text-trading-green"}`}>
                {it.label}
              </div>
              <div className={`flex-1 h-7 rounded flex items-center px-3 ${it.tone === "stop" ? "bg-trading-red/15 border border-trading-red/30" : it.tone === "entry" ? "bg-white/10 border border-white/20" : "bg-trading-green/15 border border-trading-green/30"}`}>
                <span className="text-sm font-bold text-foreground">{roundTo(it.price, 2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single-target map
  const isLong = result.direction === "LONG";
  const stop = result.stop!;
  const entry = result.entry;
  const target = result.target!;
  const items = isLong
    ? [{ label: "TP", price: target, tone: "tp" as const }, { label: "ENTRY", price: entry, tone: "entry" as const }, { label: "SL", price: stop, tone: "stop" as const }]
    : [{ label: "SL", price: stop, tone: "stop" as const }, { label: "ENTRY", price: entry, tone: "entry" as const }, { label: "TP", price: target, tone: "tp" as const }];
  return (
    <div className="glass-strong rounded-2xl p-5 gradient-border">
      <h4 className="text-sm font-bold text-foreground mb-3">Trade Map</h4>
      <div className="flex flex-col gap-2" role="img" aria-label={`Trade map: ${isLong ? "target above entry above stop" : "stop above entry above target"}. Target ${roundTo(target, 2)}, entry ${roundTo(entry, 2)}, stop ${roundTo(stop, 2)}`}>
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-20 text-xs font-bold text-right ${it.tone === "stop" ? "text-trading-red" : it.tone === "entry" ? "text-foreground" : "text-trading-green"}`}>
              {it.label}
            </div>
            <div className={`flex-1 h-8 rounded flex items-center px-3 ${it.tone === "stop" ? "bg-trading-red/15 border border-trading-red/30" : it.tone === "entry" ? "bg-white/10 border border-white/20" : "bg-trading-green/15 border border-trading-green/30"}`}>
              <span className="text-sm font-bold text-foreground">{roundTo(it.price, 2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskRewardCalculator;
