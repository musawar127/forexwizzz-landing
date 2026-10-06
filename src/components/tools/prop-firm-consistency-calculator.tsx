"use client";

/**
 * PropFirmConsistencyCalculator
 *
 * Free, fully client-side prop firm consistency rule calculator.
 * Three modes: Quick Check, Daily P&L, Repair/Planning.
 * Three rule bases: Total Net Profit, Sum of Profitable Days, Profit Target.
 * All math driven by the pure module at @/lib/prop-firm-consistency-calc.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateConsistencyResult,
  summarizeDailyPnL,
  parseDailyPnL,
  roundTo,
  DEFAULT_INPUTS,
  THRESHOLD_PRESETS,
  MIN_EVEN_DAYS_TABLE,
  type CalculatorMode,
  type RuleBasis,
  type BoundaryRule,
  type ConsistencyInputs,
  type ConsistencyResult,
} from "@/lib/prop-firm-consistency-calc";
import {
  AlertTriangle, Info, TrendingUp, TrendingDown, Calendar,
  Wrench, CheckCircle2, XCircle, Plus, Trash2, ClipboardPaste,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  ruleBasis: RuleBasis;
  bestDay: string;
  thresholdPercent: string;
  boundaryRule: BoundaryRule;
  denominator: string;
  plannedFutureDay: string;
  // daily P&L
  dailyInput: string;
  dailyRows: string[];
}

const INITIAL_FORM: FormState = {
  mode: "QUICK_CHECK",
  ruleBasis: "NET_PROFIT",
  bestDay: "1500",
  thresholdPercent: "40",
  boundaryRule: "AT_OR_BELOW",
  denominator: "3000",
  plannedFutureDay: "",
  dailyInput: "",
  dailyRows: ["800", "-250", "450"],
};

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return null;
  return parsed;
}

const RULE_BASIS_LABELS: Record<RuleBasis, string> = {
  NET_PROFIT: "Total Net Profit",
  PROFITABLE_DAYS: "Sum of Profitable Days",
  PROFIT_TARGET: "Profit Target",
};

const RULE_BASIS_DESCRIPTIONS: Record<RuleBasis, string> = {
  NET_PROFIT: "Includes winning and losing days.",
  PROFITABLE_DAYS: "Adds only positive days.",
  PROFIT_TARGET: "Uses the fixed entered target as denominator.",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function PropFirmConsistencyCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* -------- build daily summary if DAILY_PNL mode -------- */
  const dailySummary = useMemo(() => {
    if (form.mode !== "DAILY_PNL") return null;
    const numbers = form.dailyRows
      .map((r) => toNumberOrNull(r))
      .filter((n): n is number => n !== null && isFinite(n));
    if (numbers.length === 0 && form.dailyInput.trim() !== "") {
      const parsed = parseDailyPnL(form.dailyInput);
      if (parsed.length > 0) return summarizeDailyPnL(parsed);
    }
    if (numbers.length === 0) return null;
    return summarizeDailyPnL(numbers);
  }, [form.mode, form.dailyRows, form.dailyInput]);

  /* -------- build calc inputs -------- */
  const inputs: ConsistencyInputs = useMemo(() => {
    const bestDay = dailySummary
      ? dailySummary.bestWinningDay
      : toNumberOrNull(form.bestDay) ?? 0;

    let denominator: number;
    if (dailySummary) {
      denominator = form.ruleBasis === "NET_PROFIT"
        ? dailySummary.totalNetProfit
        : form.ruleBasis === "PROFITABLE_DAYS"
          ? dailySummary.sumOfProfitableDays
          : toNumberOrNull(form.denominator) ?? 0;
    } else {
      denominator = toNumberOrNull(form.denominator) ?? 0;
    }

    return {
      mode: form.mode,
      ruleBasis: form.ruleBasis,
      bestDay,
      thresholdPercent: toNumberOrNull(form.thresholdPercent) ?? 0,
      boundaryRule: form.boundaryRule,
      denominator,
      plannedFutureDay: toNumberOrNull(form.plannedFutureDay),
    };
  }, [form, dailySummary]);

  const result: ConsistencyResult = useMemo(
    () => calculateConsistencyResult(inputs),
    [inputs],
  );

  /* -------- helpers -------- */
  const fmtNum = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    return roundTo(n, decimals).toFixed(decimals);
  };

  const addDay = () => update("dailyRows", [...form.dailyRows, ""]);
  const removeDay = (i: number) => update("dailyRows", form.dailyRows.filter((_, idx) => idx !== i));
  const updateDay = (i: number, val: string) => {
    const next = [...form.dailyRows];
    next[i] = val;
    update("dailyRows", next);
  };
  const handlePaste = () => {
    const text = form.dailyInput.trim();
    if (!text) return;
    const parsed = parseDailyPnL(text);
    if (parsed.length > 0) {
      update("dailyRows", parsed.map(String));
      update("dailyInput", "");
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "QUICK_CHECK", label: "Quick Check", icon: <TrendingUp className="w-4 h-4" /> },
          { id: "DAILY_PNL", label: "Daily P&L", icon: <Calendar className="w-4 h-4" /> },
          { id: "REPAIR", label: "Repair / Planning", icon: <Wrench className="w-4 h-4" /> },
        ] as { id: CalculatorMode; label: string; icon: React.ReactNode }[]).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={form.mode === tab.id}
            onClick={() => update("mode", tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
              form.mode === tab.id
                ? "bg-trading-green text-trading-dark glow-green"
                : "glass-strong text-muted-foreground hover:text-foreground border border-white/10"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------------- INPUTS ---------------- */}
        <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border">
          {/* Rule basis selector (all modes) */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
              CONSISTENCY RULE IS MEASURED AGAINST
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(["NET_PROFIT", "PROFITABLE_DAYS", "PROFIT_TARGET"] as RuleBasis[]).map((b) => (
                <button
                  key={b}
                  onClick={() => update("ruleBasis", b)}
                  aria-pressed={form.ruleBasis === b}
                  className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all border ${
                    form.ruleBasis === b
                      ? "bg-trading-gold/10 border-trading-gold/40"
                      : "glass border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${form.ruleBasis === b ? "text-trading-gold" : "text-foreground"}`}>
                      {RULE_BASIS_LABELS[b]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{RULE_BASIS_DESCRIPTIONS[b]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Threshold (all modes) */}
          <div className="mb-4">
            <label htmlFor="pf-threshold" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
              CONSISTENCY THRESHOLD %
            </label>
            <input
              id="pf-threshold"
              type="number"
              step="any"
              value={form.thresholdPercent}
              onChange={(e) => update("thresholdPercent", e.target.value)}
              placeholder="e.g. 40"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {THRESHOLD_PRESETS.map((t) => (
                <button
                  key={t}
                  onClick={() => update("thresholdPercent", String(t))}
                  className="px-2.5 py-1 rounded-md text-xs font-bold glass text-muted-foreground hover:text-trading-green hover:border-trading-green/30 border border-white/10 transition-colors"
                >
                  {t}%
                </button>
              ))}
            </div>
          </div>

          {/* Boundary rule (advanced) */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">BOUNDARY RULE</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "AT_OR_BELOW", label: "At or below (≤)" },
                { id: "STRICTLY_BELOW", label: "Strictly below (<)" },
              ] as { id: BoundaryRule; label: string }[]).map((b) => (
                <button
                  key={b.id}
                  onClick={() => update("boundaryRule", b.id)}
                  aria-pressed={form.boundaryRule === b.id}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    form.boundaryRule === b.id
                      ? "bg-trading-gold/15 text-trading-gold border-trading-gold/40"
                      : "glass text-muted-foreground border-white/10"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode-specific inputs */}
          {form.mode === "QUICK_CHECK" && (
            <>
              <Field id="pf-best" label="Best Single Day Profit" value={form.bestDay} onChange={(v) => update("bestDay", v)} placeholder="e.g. 1500" />
              <Field
                id="pf-denom"
                label={form.ruleBasis === "NET_PROFIT" ? "Total Net Profit" : form.ruleBasis === "PROFITABLE_DAYS" ? "Sum of Profitable Days" : "Profit Target"}
                value={form.denominator}
                onChange={(v) => update("denominator", v)}
                placeholder="e.g. 3000"
              />
            </>
          )}

          {form.mode === "DAILY_PNL" && (
            <div className="mb-4">
              <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">DAILY P&L RESULTS</label>
              {/* Paste area */}
              <div className="mb-3">
                <textarea
                  value={form.dailyInput}
                  onChange={(e) => update("dailyInput", e.target.value)}
                  placeholder={"Paste daily P&L here (one per line, comma or space separated):\n800\n-250\n450\n1200\n300"}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:border-trading-green focus:outline-none font-mono"
                />
                <button
                  onClick={handlePaste}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-trading-green hover:text-trading-green/80 transition-colors"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  Parse & Add to List
                </button>
              </div>
              {/* Individual day rows */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {form.dailyRows.map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12 shrink-0">Day {i + 1}</span>
                    <input
                      type="number"
                      step="any"
                      value={val}
                      onChange={(e) => updateDay(i, e.target.value)}
                      placeholder="0"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                    />
                    <button
                      onClick={() => removeDay(i)}
                      aria-label={`Remove day ${i + 1}`}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-trading-red hover:bg-trading-red/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addDay}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-trading-green hover:text-trading-green/80 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Day
              </button>
              {form.ruleBasis === "PROFIT_TARGET" && (
                <div className="mt-3">
                  <Field
                    id="pf-target"
                    label="Profit Target"
                    value={form.denominator}
                    onChange={(v) => update("denominator", v)}
                    placeholder="e.g. 5000"
                  />
                </div>
              )}
            </div>
          )}

          {form.mode === "REPAIR" && (
            <>
              <Field id="pf-repair-best" label="Current Best Day" value={form.bestDay} onChange={(v) => update("bestDay", v)} placeholder="e.g. 1500" />
              <Field
                id="pf-repair-denom"
                label={form.ruleBasis === "NET_PROFIT" ? "Current Total Net Profit" : form.ruleBasis === "PROFITABLE_DAYS" ? "Current Sum of Profitable Days" : "Profit Target"}
                value={form.denominator}
                onChange={(v) => update("denominator", v)}
                placeholder="e.g. 3000"
              />
              {form.ruleBasis !== "PROFIT_TARGET" && (
                <Field
                  id="pf-planned"
                  label="Planned Profit Per Future Day (optional)"
                  value={form.plannedFutureDay}
                  onChange={(v) => update("plannedFutureDay", v)}
                  placeholder="e.g. 500"
                />
              )}
            </>
          )}

          {/* Example notice */}
          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Illustrative example only — not a live prop-firm rule. Rules change frequently; verify your firm&apos;s current terms.</span>
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
              {/* Neutral message */}
              {result.neutralMessage && (
                <div className="glass rounded-2xl p-4 border border-trading-gold/20" aria-live="polite">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{result.neutralMessage}</p>
                  </div>
                </div>
              )}

              {/* Headline consistency */}
              {!result.neutralMessage && (
                <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                  <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">CONSISTENCY</p>
                  <p className={`text-4xl md:text-5xl font-extrabold mb-3 ${result.withinThreshold ? "text-trading-green text-glow-green" : "text-trading-red"}`}>
                    {fmtNum(result.consistencyPercent)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Threshold: <span className="font-bold text-foreground">{fmtNum(result.thresholdPercent, 0)}%</span>
                  </p>
                  <p className={`text-sm font-bold mt-1 ${result.withinThreshold ? "text-trading-green" : "text-trading-red"}`}>
                    {result.withinThreshold ? "Within the entered threshold" : "Above the entered threshold"}
                  </p>
                </div>
              )}

              {/* Daily summary (DAILY_PNL mode) */}
              {dailySummary && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-trading-gold" />
                    Daily P&L Summary
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <Stat label="Trading Days" value={String(dailySummary.tradingDays)} />
                    <Stat label="Winning Days" value={String(dailySummary.winningDays)} tone="green" />
                    <Stat label="Losing Days" value={String(dailySummary.losingDays)} tone="red" />
                    <Stat label="Total Net Profit" value={fmtNum(dailySummary.totalNetProfit)} />
                    <Stat label="Sum of Profitable Days" value={fmtNum(dailySummary.sumOfProfitableDays)} tone="green" />
                    <Stat label="Best Winning Day" value={fmtNum(dailySummary.bestWinningDay)} tone="gold" />
                    <Stat label="Worst Day" value={fmtNum(dailySummary.worstDay)} tone="red" />
                    <Stat label="Average Daily" value={fmtNum(dailySummary.averageDailyPnL)} />
                  </div>
                </div>
              )}

              {/* Supporting results */}
              {!result.neutralMessage && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3">Supporting Results</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="Rule Basis" value={RULE_BASIS_LABELS[result.ruleBasis]} />
                    <Stat label="Denominator" value={fmtNum(result.thresholdPercent > 0 ? inputs.denominator : 0)} />
                    <Stat label="Max Allowed Best Day" value={fmtNum(result.maxAllowedBestDay)} tone="gold" />
                    <Stat label="Required Denominator" value={fmtNum(result.requiredDenominator)} />
                    {result.ruleBasis !== "PROFIT_TARGET" && (
                      <Stat label="Additional Profit Needed" value={fmtNum(result.additionalProfitNeeded)} tone={result.additionalProfitNeeded > 0 ? "red" : "green"} />
                    )}
                  </div>
                  {result.ruleBasis === "PROFIT_TARGET" && (
                    <p className="text-xs text-muted-foreground/70 mt-2 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-trading-gold shrink-0 mt-0.5" />
                      The selected rule is measured against a fixed profit target. Additional profit does not change this percentage unless the applicable target itself changes under your firm&apos;s rules.
                    </p>
                  )}
                </div>
              )}

              {/* Repair outputs */}
              {result.repair && (form.mode === "REPAIR" || form.mode === "QUICK_CHECK") && !result.neutralMessage && (
                <div className="glass-strong rounded-2xl p-5 gradient-border">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-trading-gold" />
                    Planning Outputs
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {result.repair.maxSafeSeparateDay != null && result.ruleBasis !== "PROFIT_TARGET" && (
                      <Stat
                        label="Max Separate Positive Day"
                        value={result.repair.maxSafeSeparateDay > 0 ? fmtNum(result.repair.maxSafeSeparateDay) : "No safe positive day"}
                        tone={result.repair.maxSafeSeparateDay > 0 ? "green" : "red"}
                      />
                    )}
                    <Stat label="Min Even Days (illustrative)" value={String(result.repair.minEvenDays)} />
                    {result.repair.minFutureDays != null && (
                      <Stat
                        label="Min Future Days at Planned Rate"
                        value={result.repair.minFutureDays !== null ? String(result.repair.minFutureDays) : "—"}
                        tone="gold"
                      />
                    )}
                  </div>
                  {result.repair.maxSafeSeparateDay != null && result.ruleBasis !== "PROFIT_TARGET" && (
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      Maximum Separate Positive Day Under This Simplified Model — consistency-rule arithmetic only. It does not account for other account rules, profit targets or drawdown limits.
                    </p>
                  )}
                  {result.repair.minFutureDays != null && (
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      {result.repair.minFutureDays === null
                        ? "Could not solve within a practical range."
                        : `If each future day earns ${fmtNum(toNumberOrNull(form.plannedFutureDay) ?? 0)}, approximately ${result.repair.minFutureDays} day(s) are needed (solver re-evaluates best day if the planned day exceeds the current best).`}
                    </p>
                  )}
                </div>
              )}

              {/* Tool links */}
              <div className="glass rounded-2xl p-4 border border-trading-green/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Consistency is about how concentrated your profit is — not how large your risk should be. For risk-based position sizing, use the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>
                  {" "}or the{" "}
                  <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Min even days reference table */}
      <div className="glass-strong rounded-2xl p-5 gradient-border">
        <h4 className="text-sm font-bold text-foreground mb-1">Minimum Evenly-Distributed Positive Days (Illustrative)</h4>
        <p className="text-xs text-muted-foreground/70 mb-3">If every profitable day contributed equally and the denominator is the sum of those positive days. Real rules may use a different denominator.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                <th className="text-left p-2 font-bold">Threshold</th>
                <th className="text-left p-2 font-bold">Min Equal Positive Days</th>
              </tr>
            </thead>
            <tbody>
              {MIN_EVEN_DAYS_TABLE.map((row) => (
                <tr key={row.threshold} className="border-b border-white/5 last:border-0">
                  <td className="p-2 text-trading-gold font-bold">{row.threshold}%</td>
                  <td className="p-2 text-foreground">{row.minDays} days</td>
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

export default PropFirmConsistencyCalculator;
