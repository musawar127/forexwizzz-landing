"use client";

/**
 * ForexCompoundingCalculator
 *
 * Free, fully client-side forex compounding calculator.
 * Three modes: Standard, Variable Returns, Win/Loss Simulation.
 * All math driven by the pure module at @/lib/forex-compounding-calc.
 * Charts powered by Recharts.
 */

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  calculateCompounding,
  parseVariableReturns,
  generateCSV,
  roundTo,
  DEFAULT_INPUTS,
  FREQUENCY_LABELS,
  CURRENCIES,
  type CalculatorMode,
  type CompoundingFrequency,
  type CompoundingInputs,
  type CompoundingResult,
} from "@/lib/forex-compounding-calc";
import {
  AlertTriangle, Info, TrendingUp, TrendingDown, Download,
  RefreshCw, BarChart3, DollarSign, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LineChart, Line, ReferenceLine,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  initialBalance: string;
  accountCurrency: string;
  returnPerPeriod: string;
  numberOfPeriods: string;
  frequency: CompoundingFrequency;
  recurringDeposit: string;
  recurringWithdrawal: string;
  fixedFeePerPeriod: string;
  percentageFee: string;
  variableReturnsInput: string;
  winRate: string;
  averageWinReturn: string;
  averageLossReturn: string;
  seed: string;
}

const INITIAL_FORM: FormState = {
  mode: "STANDARD",
  initialBalance: "1000",
  accountCurrency: "USD",
  returnPerPeriod: "2",
  numberOfPeriods: "12",
  frequency: "MONTHLY",
  recurringDeposit: "0",
  recurringWithdrawal: "0",
  fixedFeePerPeriod: "0",
  percentageFee: "0",
  variableReturnsInput: "2, 3, -1, 4, 1.5, -2, 3, 2, -1, 1.5, 2.5, 1",
  winRate: "55",
  averageWinReturn: "3",
  averageLossReturn: "-2",
  seed: "20261012",
};

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return 0;
  const parsed = Number(trimmed);
  if (!isFinite(parsed)) return 0;
  return parsed;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function ForexCompoundingCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* -------- build inputs -------- */
  const inputs: CompoundingInputs = useMemo(() => {
    const base: CompoundingInputs = {
      mode: form.mode,
      initialBalance: toNumberOrNull(form.initialBalance) ?? 0,
      accountCurrency: form.accountCurrency,
      returnPerPeriod: toNumberOrNull(form.returnPerPeriod) ?? 0,
      numberOfPeriods: Math.floor(toNumberOrNull(form.numberOfPeriods) ?? 1),
      frequency: form.frequency,
      recurringDeposit: toNumberOrNull(form.recurringDeposit) ?? 0,
      recurringWithdrawal: toNumberOrNull(form.recurringWithdrawal) ?? 0,
      fixedFeePerPeriod: toNumberOrNull(form.fixedFeePerPeriod) ?? 0,
      percentageFee: toNumberOrNull(form.percentageFee) ?? 0,
      winRate: toNumberOrNull(form.winRate) ?? 50,
      averageWinReturn: toNumberOrNull(form.averageWinReturn) ?? 3,
      averageLossReturn: toNumberOrNull(form.averageLossReturn) ?? -2,
      seed: toNumberOrNull(form.seed) ?? 20261012,
    };
    if (form.mode === "VARIABLE") {
      base.variableReturns = parseVariableReturns(form.variableReturnsInput);
    }
    return base;
  }, [form]);

  const result: CompoundingResult = useMemo(
    () => calculateCompounding(inputs),
    [inputs],
  );

  /* -------- chart data -------- */
  const chartData = useMemo(() => {
    if (!result.valid) return [];
    return result.periods.map((p) => ({
      period: p.period,
      balance: roundTo(p.closingBalance, 2),
      simple: roundTo(result.initialBalance * (1 + (p.returnPercent / 100) * p.period), 2),
      drawdown: roundTo(p.drawdownPercent, 2),
    }));
  }, [result]);

  /* -------- helpers -------- */
  const fmtMoney = (n: number): string => {
    if (!isFinite(n)) return "—";
    const symbol = form.accountCurrency === "USD" ? "$" : form.accountCurrency === "EUR" ? "€" : form.accountCurrency === "GBP" ? "£" : "";
    return `${symbol}${roundTo(n, 2).toFixed(2)}`;
  };
  const fmtPct = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    return `${roundTo(n, decimals).toFixed(decimals)}%`;
  };
  const handleReset = () => setForm(INITIAL_FORM);
  const handleCSV = () => {
    if (!result.valid) return;
    const csv = generateCSV(result);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forex-compounding-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const currencySymbol = form.accountCurrency === "USD" ? "$" : form.accountCurrency === "EUR" ? "€" : "£";

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "STANDARD", label: "Standard Compounding" },
          { id: "VARIABLE", label: "Variable Returns" },
          { id: "WIN_LOSS", label: "Win/Loss Simulation" },
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
        {/* ---------------- INPUTS (LEFT) ---------------- */}
        <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-trading-gold" />
              Calculator Inputs
            </h3>
            <button onClick={handleReset} className="text-xs font-medium text-muted-foreground hover:text-trading-green transition-colors">
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Field id="fc-balance" label="Initial Balance" value={form.initialBalance} onChange={(v) => update("initialBalance", v)} placeholder="1000" />
            <div>
              <label htmlFor="fc-currency" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">CURRENCY</label>
              <select id="fc-currency" value={form.accountCurrency} onChange={(e) => update("accountCurrency", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none">
                {CURRENCIES.map((c) => <option key={c} value={c} className="bg-trading-dark">{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fc-freq" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">COMPOUNDING FREQUENCY</label>
              <select id="fc-freq" value={form.frequency} onChange={(e) => update("frequency", e.target.value as CompoundingFrequency)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none">
                {(Object.keys(FREQUENCY_LABELS) as CompoundingFrequency[]).map((f) => (
                  <option key={f} value={f} className="bg-trading-dark">{FREQUENCY_LABELS[f]}</option>
                ))}
              </select>
            </div>
            <Field id="fc-periods" label="Number of Periods" value={form.numberOfPeriods} onChange={(v) => update("numberOfPeriods", v)} placeholder="12" />
          </div>

          {/* Mode-specific inputs */}
          {form.mode === "STANDARD" && (
            <Field id="fc-return" label="Return Per Period (%)" value={form.returnPerPeriod} onChange={(v) => update("returnPerPeriod", v)} placeholder="2" />
          )}

          {form.mode === "VARIABLE" && (
            <div className="mb-4">
              <label htmlFor="fc-variable" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">
                VARIABLE RETURNS (% — comma or line separated, one per period)
              </label>
              <textarea id="fc-variable" value={form.variableReturnsInput} onChange={(e) => update("variableReturnsInput", e.target.value)}
                rows={3} placeholder="2, 3, -1, 4, 1.5"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-sm focus:border-trading-green focus:outline-none font-mono" />
              <p className="text-xs text-muted-foreground/70 mt-1">Positive, negative and zero values allowed. Missing periods are padded with 0%.</p>
            </div>
          )}

          {form.mode === "WIN_LOSS" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field id="fc-winrate" label="Win Rate (%)" value={form.winRate} onChange={(v) => update("winRate", v)} placeholder="55" />
              <Field id="fc-seed" label="Simulation Seed" value={form.seed} onChange={(v) => update("seed", v)} placeholder="20261012" />
              <Field id="fc-avgwin" label="Avg Win Return (%)" value={form.averageWinReturn} onChange={(v) => update("averageWinReturn", v)} placeholder="3" />
              <Field id="fc-avgloss" label="Avg Loss Return (%)" value={form.averageLossReturn} onChange={(v) => update("averageLossReturn", v)} placeholder="-2" />
            </div>
          )}

          {/* Cash flows */}
          <details className="mt-4 group">
            <summary className="text-xs font-bold text-trading-gold cursor-pointer list-none select-none mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Cash Flows & Fees (Advanced)
            </summary>
            <div className="grid grid-cols-2 gap-4">
              <Field id="fc-deposit" label={`Recurring Deposit (${currencySymbol})`} value={form.recurringDeposit} onChange={(v) => update("recurringDeposit", v)} placeholder="0" />
              <Field id="fc-withdraw" label={`Recurring Withdrawal (${currencySymbol})`} value={form.recurringWithdrawal} onChange={(v) => update("recurringWithdrawal", v)} placeholder="0" />
              <Field id="fc-fixedfee" label={`Fixed Fee/Period (${currencySymbol})`} value={form.fixedFeePerPeriod} onChange={(v) => update("fixedFeePerPeriod", v)} placeholder="0" />
              <Field id="fc-pctfee" label="Percentage Fee (%)" value={form.percentageFee} onChange={(v) => update("percentageFee", v)} placeholder="0" />
            </div>
          </details>

          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Illustrative assumptions — not a prediction. {FREQUENCY_LABELS[form.frequency]} compounding refers to one modeled trading period, not a guaranteed calendar return.</span>
          </div>
        </div>

        {/* ---------------- RESULTS (RIGHT) ---------------- */}
        <div className="space-y-4">
          {/* Error */}
          {!result.valid && result.error && (
            <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{result.error}</p>
              </div>
            </div>
          )}

          {result.valid && (
            <>
              {/* Headline final balance */}
              <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">FINAL PROJECTED BALANCE</p>
                <p className={`text-4xl md:text-5xl font-extrabold mb-2 ${result.netGainLoss >= 0 ? "text-trading-green text-glow-green" : "text-trading-red"}`}>
                  {fmtMoney(result.finalBalance)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Net: <span className={`font-bold ${result.netGainLoss >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                    {result.netGainLoss >= 0 ? "+" : ""}{fmtMoney(result.netGainLoss)}
                  </span> ({fmtPct(result.totalReturnPercent)})
                </p>
              </div>

              {/* Summary metrics */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <Stat label="Initial Balance" value={fmtMoney(result.initialBalance)} />
                  <Stat label="Total Deposits" value={fmtMoney(result.totalDeposits)} tone="green" />
                  <Stat label="Total Withdrawals" value={fmtMoney(result.totalWithdrawals)} />
                  <Stat label="Total Fees" value={fmtMoney(result.totalFees)} tone="red" />
                  <Stat label="Contributed Capital" value={fmtMoney(result.totalContributedCapital)} />
                  <Stat label="Simple Growth Balance" value={fmtMoney(result.simpleGrowthBalance)} />
                  <Stat label="Highest Balance" value={fmtMoney(result.highestBalance)} tone="green" />
                  <Stat label="Lowest Balance" value={fmtMoney(result.lowestBalance)} tone="red" />
                  <Stat label="Max Drawdown" value={fmtPct(result.maxDrawdownPercent)} tone="red" />
                  <Stat label="Recovery Gain" value={isFinite(result.recoveryGainPercent) ? fmtPct(result.recoveryGainPercent) : "∞"} />
                  <Stat label="Best Period" value={fmtPct(result.bestPeriodReturn)} tone="green" />
                  <Stat label="Worst Period" value={fmtPct(result.worstPeriodReturn)} tone="red" />
                </div>
              </div>

              {/* Compound vs Simple chart */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-trading-gold" />
                  Balance Growth: Compound vs Simple
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00e676" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00e676" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSimple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffd740" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ffd740" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="period" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${currencySymbol}${v.toLocaleString()}`} />
                    <Tooltip
                      contentStyle={{ background: "#0a0a0f", border: "1px solid #ffffff20", borderRadius: "8px", color: "#f0f0f0" }}
                      formatter={(value: number) => fmtMoney(value)}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Area type="monotone" dataKey="balance" name="Compounded" stroke="#00e676" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    <Area type="monotone" dataKey="simple" name="Simple Growth" stroke="#ffd740" fillOpacity={1} fill="url(#colorSimple)" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Drawdown chart */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-trading-red" />
                  Drawdown From Peak (%)
                </h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="period" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{ background: "#0a0a0f", border: "1px solid #ffffff20", borderRadius: "8px", color: "#f0f0f0" }}
                      formatter={(value: number) => `${roundTo(value, 2).toFixed(2)}%`}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Line type="monotone" dataKey="drawdown" name="Drawdown %" stroke="#ff5252" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Per-period table + CSV export */}
      {result.valid && (
        <div className="glass-strong rounded-2xl p-5 gradient-border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-foreground">Period-by-Period Breakdown</h4>
            <button onClick={handleCSV} className="inline-flex items-center gap-2 text-xs font-bold text-trading-green hover:text-trading-green/80 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-trading-dark">
                <tr className="border-b border-white/10">
                  <th className="text-left p-2 font-bold text-foreground">#</th>
                  <th className="text-right p-2 font-bold text-foreground">Opening</th>
                  <th className="text-right p-2 font-bold text-foreground">Deposit</th>
                  <th className="text-right p-2 font-bold text-foreground">Withdraw</th>
                  <th className="text-right p-2 font-bold text-foreground">Return %</th>
                  <th className="text-right p-2 font-bold text-foreground">Fees</th>
                  <th className="text-right p-2 font-bold text-foreground">Closing</th>
                  <th className="text-right p-2 font-bold text-foreground">Drawdown %</th>
                </tr>
              </thead>
              <tbody>
                {result.periods.map((p) => (
                  <tr key={p.period} className="border-b border-white/5">
                    <td className="p-2 text-muted-foreground">{p.period}</td>
                    <td className="p-2 text-right text-muted-foreground">{fmtMoney(p.openingBalance)}</td>
                    <td className="p-2 text-right text-trading-green">{p.deposit > 0 ? fmtMoney(p.deposit) : "—"}</td>
                    <td className="p-2 text-right text-trading-red">{p.withdrawal > 0 ? fmtMoney(p.withdrawal) : "—"}</td>
                    <td className={`p-2 text-right font-bold ${p.returnPercent >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                      {p.returnPercent >= 0 ? "+" : ""}{roundTo(p.returnPercent, 2).toFixed(2)}%
                    </td>
                    <td className="p-2 text-right text-trading-red">{(p.fixedFee + p.percentageFeeAmount) > 0 ? fmtMoney(p.fixedFee + p.percentageFeeAmount) : "—"}</td>
                    <td className="p-2 text-right text-foreground font-bold">{fmtMoney(p.closingBalance)}</td>
                    <td className="p-2 text-right text-trading-red">{p.drawdownPercent > 0 ? fmtPct(p.drawdownPercent, 1) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tool links */}
      <div className="glass rounded-2xl p-4 border border-trading-green/20">
        <p className="text-xs text-muted-foreground leading-relaxed">
          For position sizing, use the{" "}
          <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>
          . For trade payoff geometry, the{" "}
          <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
          . For drawdown risk across many trades, the{" "}
          <Link href="/tools/risk-of-ruin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk of Ruin Calculator</Link>
          . For broader risk management, the{" "}
          <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">Risk Management Guide</Link>
          .
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
    <div>
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
  label, value, tone,
}: {
  label: string; value: string; tone?: "gold" | "green" | "red";
}) {
  const color = tone === "gold" ? "text-trading-gold" : tone === "green" ? "text-trading-green" : tone === "red" ? "text-trading-red" : "text-foreground";
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default ForexCompoundingCalculator;
