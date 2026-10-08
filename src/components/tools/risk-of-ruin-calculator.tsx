"use client";

/**
 * RiskOfRuinCalculator
 *
 * Free, fully client-side trading risk of ruin & losing streak calculator.
 * Four modes: Risk of Ruin (Monte Carlo), Losing Streak, Drawdown & Recovery,
 * Risk Comparison.
 * All math driven by the pure module at @/lib/risk-of-ruin-calc.
 */

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  calculateExpectancy,
  calculateExactLosingStreakProbability,
  calculateConsecutiveLossDrawdown,
  calculateLossesToDrawdown,
  calculateRecoveryGain,
  simulateRiskOfRuin,
  buildLosingStreakTable,
  buildRiskComparison,
  roundTo,
  DEFAULT_INPUTS,
  SIMULATION_PATH_OPTIONS,
  RECOVERY_TABLE,
  RISK_COMPARISON_LEVELS,
  type CalculatorMode,
  type ThresholdBasis,
  type RiskOfRuinInputs,
  type SimulationSummary,
} from "@/lib/risk-of-ruin-calc";
import {
  AlertTriangle, Info, TrendingDown, Play, RefreshCw, Activity,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FORM STATE                                                         */
/* ------------------------------------------------------------------ */

interface FormState {
  mode: CalculatorMode;
  winRate: string;
  averageWinR: string;
  averageLossR: string;
  riskPercent: string;
  startingBalance: string;
  tradeHorizon: string;
  thresholdPercent: string;
  thresholdBasis: ThresholdBasis;
  simulationPaths: string;
  seed: string;
  streakLength: string;
  numberOfTrades: string;
  consecutiveLosses: string;
  targetDrawdownPercent: string;
  customRiskPercent: string;
}

const INITIAL_FORM: FormState = {
  mode: "RISK_OF_RUIN",
  winRate: "50",
  averageWinR: "1.5",
  averageLossR: "1",
  riskPercent: "1",
  startingBalance: "10000",
  tradeHorizon: "200",
  thresholdPercent: "30",
  thresholdBasis: "STARTING_BALANCE_LOSS",
  simulationPaths: "5000",
  seed: "20261008",
  streakLength: "5",
  numberOfTrades: "100",
  consecutiveLosses: "5",
  targetDrawdownPercent: "20",
  customRiskPercent: "",
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

export function RiskOfRuinCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [simResult, setSimResult] = useState<SimulationSummary | null>(null);
  const [simRunning, setSimRunning] = useState(false);
  const [comparisonSimRunning, setComparisonSimRunning] = useState(false);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Parse common inputs
  const winRate = toNumberOrNull(form.winRate) ?? 0;
  const averageWinR = toNumberOrNull(form.averageWinR) ?? 0;
  const averageLossR = toNumberOrNull(form.averageLossR) ?? 0;
  const riskPercent = toNumberOrNull(form.riskPercent) ?? 0;
  const startingBalance = toNumberOrNull(form.startingBalance) ?? 0;

  // Deterministic calculations (instant)
  const expectancy = useMemo(
    () => calculateExpectancy(winRate, averageWinR, averageLossR),
    [winRate, averageWinR, averageLossR],
  );

  const streakProb = useMemo(() => {
    if (form.mode !== "LOSING_STREAK") return null;
    const numTrades = toNumberOrNull(form.numberOfTrades) ?? 0;
    const streakLen = toNumberOrNull(form.streakLength) ?? 0;
    return calculateExactLosingStreakProbability(winRate, numTrades, streakLen);
  }, [form.mode, winRate, form.numberOfTrades, form.streakLength]);

  const streakTable = useMemo(() => {
    if (form.mode !== "LOSING_STREAK") return null;
    const numTrades = toNumberOrNull(form.numberOfTrades) ?? 0;
    return buildLosingStreakTable(winRate, numTrades, riskPercent, averageLossR);
  }, [form.mode, winRate, form.numberOfTrades, riskPercent, averageLossR]);

  const drawdownResult = useMemo(() => {
    if (form.mode !== "DRAWDOWN_RECOVERY") return null;
    const losses = toNumberOrNull(form.consecutiveLosses) ?? 0;
    return calculateConsecutiveLossDrawdown(startingBalance, riskPercent, averageLossR, losses);
  }, [form.mode, startingBalance, riskPercent, averageLossR, form.consecutiveLosses]);

  const lossesToTarget = useMemo(() => {
    if (form.mode !== "DRAWDOWN_RECOVERY") return null;
    const targetDD = toNumberOrNull(form.targetDrawdownPercent) ?? 0;
    return calculateLossesToDrawdown(startingBalance, riskPercent, averageLossR, targetDD / 100);
  }, [form.mode, startingBalance, riskPercent, averageLossR, form.targetDrawdownPercent]);

  const comparisonRows = useMemo(() => {
    if (form.mode !== "RISK_COMPARISON") return null;
    const horizon = toNumberOrNull(form.tradeHorizon) ?? 200;
    const threshold = toNumberOrNull(form.thresholdPercent) ?? 30;
    const seed = toNumberOrNull(form.seed) ?? 20261008;
    const customRisk = toNumberOrNull(form.customRiskPercent) ?? undefined;
    return buildRiskComparison(
      winRate, averageWinR, averageLossR, startingBalance,
      horizon, threshold, form.thresholdBasis, seed, customRisk,
      comparisonSimRunning, 2000,
    );
  }, [form.mode, winRate, averageWinR, averageLossR, startingBalance,
      form.tradeHorizon, form.thresholdPercent, form.thresholdBasis,
      form.seed, form.customRiskPercent, comparisonSimRunning]);

  // Run simulation (user-triggered)
  const runSimulation = useCallback(() => {
    setSimRunning(true);
    // Use setTimeout to let UI update before heavy compute
    setTimeout(() => {
      const horizon = toNumberOrNull(form.tradeHorizon) ?? 200;
      const threshold = toNumberOrNull(form.thresholdPercent) ?? 30;
      const paths = toNumberOrNull(form.simulationPaths) ?? 5000;
      const seed = toNumberOrNull(form.seed) ?? 20261008;
      const result = simulateRiskOfRuin(
        winRate, averageWinR, averageLossR, riskPercent,
        startingBalance, horizon, threshold, form.thresholdBasis,
        paths, seed,
      );
      setSimResult(result);
      setSimRunning(false);
    }, 50);
  }, [form, winRate, averageWinR, averageLossR, riskPercent, startingBalance]);

  /* -------- helpers -------- */
  const fmtNum = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    return roundTo(n, decimals).toFixed(decimals);
  };
  const fmtPct = (n: number, decimals = 2): string => {
    if (!isFinite(n)) return "—";
    if (n < 0.01 && n > 0) return "<0.01%";
    return roundTo(n, decimals).toFixed(decimals) + "%";
  };
  const fmtMoney = (n: number): string => {
    if (!isFinite(n)) return "—";
    return "$" + roundTo(n, 2).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {([
          { id: "RISK_OF_RUIN", label: "Risk of Ruin" },
          { id: "LOSING_STREAK", label: "Losing Streak" },
          { id: "DRAWDOWN_RECOVERY", label: "Drawdown & Recovery" },
          { id: "RISK_COMPARISON", label: "Risk Comparison" },
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

      {/* Strategy inputs (shared across modes) */}
      <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-trading-gold" />
          Strategy Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field id="rr-winrate" label="Win Rate %" value={form.winRate} onChange={(v) => update("winRate", v)} placeholder="50" />
          <Field id="rr-winr" label="Avg Win (R)" value={form.averageWinR} onChange={(v) => update("averageWinR", v)} placeholder="1.5" />
          <Field id="rr-lossr" label="Avg Loss (R)" value={form.averageLossR} onChange={(v) => update("averageLossR", v)} placeholder="1" />
          <Field id="rr-risk" label="Risk Per Trade %" value={form.riskPercent} onChange={(v) => update("riskPercent", v)} placeholder="1" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Field id="rr-balance" label="Starting Balance" value={form.startingBalance} onChange={(v) => update("startingBalance", v)} placeholder="10000" />
          {form.mode === "RISK_OF_RUIN" && (
            <>
              <Field id="rr-horizon" label="Trade Horizon" value={form.tradeHorizon} onChange={(v) => update("tradeHorizon", v)} placeholder="200" />
              <Field id="rr-threshold" label="Threshold %" value={form.thresholdPercent} onChange={(v) => update("thresholdPercent", v)} placeholder="30" />
            </>
          )}
          {form.mode === "LOSING_STREAK" && (
            <>
              <Field id="rr-trades" label="Number of Trades" value={form.numberOfTrades} onChange={(v) => update("numberOfTrades", v)} placeholder="100" />
              <Field id="rr-streak" label="Streak Length" value={form.streakLength} onChange={(v) => update("streakLength", v)} placeholder="5" />
            </>
          )}
          {form.mode === "DRAWDOWN_RECOVERY" && (
            <>
              <Field id="rr-consec" label="Consecutive Losses" value={form.consecutiveLosses} onChange={(v) => update("consecutiveLosses", v)} placeholder="5" />
              <Field id="rr-targetdd" label="Target Drawdown %" value={form.targetDrawdownPercent} onChange={(v) => update("targetDrawdownPercent", v)} placeholder="20" />
            </>
          )}
          {form.mode === "RISK_COMPARISON" && (
            <>
              <Field id="rr-cmp-horizon" label="Trade Horizon" value={form.tradeHorizon} onChange={(v) => update("tradeHorizon", v)} placeholder="200" />
              <Field id="rr-cmp-threshold" label="Threshold %" value={form.thresholdPercent} onChange={(v) => update("thresholdPercent", v)} placeholder="30" />
            </>
          )}
        </div>

        {/* Threshold basis (RISK_OF_RUIN + RISK_COMPARISON) */}
        {(form.mode === "RISK_OF_RUIN" || form.mode === "RISK_COMPARISON") && (
          <div className="mt-4">
            <label className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">THRESHOLD BASIS</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "STARTING_BALANCE_LOSS", label: "Loss From Starting Balance" },
                { id: "PEAK_DRAWDOWN", label: "Peak-to-Trough Drawdown" },
              ] as { id: ThresholdBasis; label: string }[]).map((b) => (
                <button
                  key={b.id}
                  onClick={() => update("thresholdBasis", b.id)}
                  aria-pressed={form.thresholdBasis === b.id}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    form.thresholdBasis === b.id
                      ? "bg-trading-gold/15 text-trading-gold border-trading-gold/40"
                      : "glass text-muted-foreground border-white/10"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Expectancy (always shown) */}
        <div className="mt-4 glass rounded-xl p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Expectancy Per Trade</p>
            <p className={`text-lg font-bold ${expectancy.isPositive ? "text-trading-green" : "text-trading-red"}`}>
              {expectancy.expectancy >= 0 ? "+" : ""}{fmtNum(expectancy.expectancy, 3)}R
            </p>
            <p className="text-xs text-muted-foreground/70">
              {expectancy.isPositive ? "Positive" : "Negative"} mathematical expectancy under entered assumptions
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Break-Even Win Rate</p>
            <p className="text-lg font-bold text-foreground">{fmtNum(expectancy.breakEvenWinRate, 2)}%</p>
          </div>
        </div>

        {/* Example notice */}
        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
          <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
          <span>Illustrative assumptions — not a prediction. Probability results depend entirely on the assumptions entered.</span>
        </div>
      </div>

      {/* ---------------- MODE RESULTS ---------------- */}
      {/* RISK_OF_RUIN */}
      {form.mode === "RISK_OF_RUIN" && (
        <div className="space-y-4">
          {/* Simulation controls */}
          <div className="glass-strong rounded-2xl p-5 gradient-border">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="rr-paths" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">SIMULATION PATHS</label>
                <select
                  id="rr-paths"
                  value={form.simulationPaths}
                  onChange={(e) => update("simulationPaths", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none"
                >
                  {SIMULATION_PATH_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-trading-dark">{p.toLocaleString()}</option>
                  ))}
                </select>
              </div>
              <Field id="rr-seed" label="Simulation Seed" value={form.seed} onChange={(v) => update("seed", v)} placeholder="20261008" />
              <div className="flex items-end">
                <button
                  onClick={runSimulation}
                  disabled={simRunning}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-trading-green text-trading-dark hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {simRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {simRunning ? "Running..." : "Run Simulation"}
                </button>
              </div>
            </div>
          </div>

          {/* Simulation results */}
          {simResult && (
            <>
              {/* Headline */}
              <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">ESTIMATED THRESHOLD-HIT PROBABILITY</p>
                <p className="text-4xl md:text-5xl font-extrabold text-trading-red mb-2">
                  {fmtPct(simResult.thresholdHitPercentage)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated from {simResult.paths.toLocaleString()} simulated {simResult.horizon}-trade paths using the assumptions entered above.
                </p>
              </div>

              {/* Distribution summary */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3">Ending Balance Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <Stat label="Median Ending" value={fmtMoney(simResult.medianEndingBalance)} tone="green" />
                  <Stat label="10th Percentile" value={fmtMoney(simResult.p10EndingBalance)} tone="red" />
                  <Stat label="90th Percentile" value={fmtMoney(simResult.p90EndingBalance)} tone="green" />
                  <Stat label="Avg Ending" value={fmtMoney(simResult.averageEndingBalance)} />
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <h4 className="text-sm font-bold text-foreground mb-3">Drawdown & Streak Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <Stat label="Median Max Drawdown" value={fmtPct(simResult.medianMaxDrawdown * 100)} />
                  <Stat label="90th Percentile DD" value={fmtPct(simResult.p90MaxDrawdown * 100)} tone="red" />
                  <Stat label="Median Longest Streak" value={String(simResult.medianLongestLosingStreak) + " losses"} />
                  <Stat label="P(End < Start)" value={fmtPct(simResult.probabilityBelowStart * 100)} />
                </div>
              </div>

              {/* Disclaimer */}
              <div className="glass rounded-2xl p-4 border border-trading-gold/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This simulation assumes independent trades with constant win rate, average win, average loss and fractional risk. Real trading results can cluster, change over time and include costs or execution differences. The result is a model estimate, not a forecast.
                </p>
              </div>
            </>
          )}
          {!simResult && !simRunning && (
            <div className="glass rounded-2xl p-8 text-center border border-white/10">
              <p className="text-sm text-muted-foreground">Click <strong>Run Simulation</strong> to estimate the threshold-hit probability.</p>
            </div>
          )}
        </div>
      )}

      {/* LOSING_STREAK */}
      {form.mode === "LOSING_STREAK" && streakProb && streakTable && (
        <div className="space-y-4">
          {/* Headline streak probability */}
          <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
            <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">
              EXACT PROBABILITY OF ≥ {form.streakLength} CONSECUTIVE LOSSES IN {form.numberOfTrades} TRADES
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-trading-gold mb-2">
              {fmtPct(streakProb.percentage)}
            </p>
            <p className="text-sm text-muted-foreground">
              Exact under the independent, constant-probability Bernoulli model.
            </p>
          </div>

          {/* Streak table */}
          <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 font-bold text-foreground">Streak</th>
                    <th className="text-left p-3 font-bold text-foreground">P(≥ one run)</th>
                    <th className="text-left p-3 font-bold text-foreground">Drawdown at {form.riskPercent}% Risk</th>
                    <th className="text-left p-3 font-bold text-foreground">Recovery Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {streakTable.map((row) => (
                    <tr key={row.streak} className="border-b border-white/5 last:border-0">
                      <td className="p-3 text-trading-gold font-bold">{row.streak} losses</td>
                      <td className="p-3 text-foreground font-bold">{fmtPct(row.percentage)}</td>
                      <td className="p-3 text-trading-red">{fmtPct(row.drawdownPercent)}</td>
                      <td className="p-3 text-trading-green">{fmtPct(row.recoveryGainPercent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 border border-trading-gold/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              These probabilities are exact under the independent Bernoulli model. Real trades can be correlated — market regime changes may produce more clustered losses than the model assumes.
            </p>
          </div>
        </div>
      )}

      {/* DRAWDOWN_RECOVERY */}
      {form.mode === "DRAWDOWN_RECOVERY" && drawdownResult && lossesToTarget && (
        <div className="space-y-4">
          {/* Headline */}
          <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
            <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">
              {form.consecutiveLosses} CONSECUTIVE LOSSES @ {form.riskPercent}% RISK
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-trading-red mb-2">
              {fmtPct(drawdownResult.drawdownPercent)}
            </p>
            <p className="text-sm text-muted-foreground">
              Ending balance: {fmtMoney(drawdownResult.endingBalance)} · Recovery gain needed: <span className="font-bold text-trading-green">{fmtPct(drawdownResult.recoveryGainPercent)}</span>
            </p>
          </div>

          {/* Summary stats */}
          <div className="glass-strong rounded-2xl p-5 gradient-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <Stat label="Ending Balance" value={fmtMoney(drawdownResult.endingBalance)} tone="red" />
              <Stat label="Money Lost" value={fmtMoney(drawdownResult.moneyLost)} />
              <Stat label="Loss Multiplier" value={fmtNum(drawdownResult.lossMultiplier, 4)} />
              <Stat label={`Losses to ${form.targetDrawdownPercent}% DD`} value={String(lossesToTarget.losses)} tone="gold" />
            </div>
          </div>

          {/* Per-trade table */}
          <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 font-bold text-foreground">Loss #</th>
                    <th className="text-left p-3 font-bold text-foreground">Starting Equity</th>
                    <th className="text-left p-3 font-bold text-foreground">Loss Amount</th>
                    <th className="text-left p-3 font-bold text-foreground">Ending Equity</th>
                    <th className="text-left p-3 font-bold text-foreground">Cumulative DD %</th>
                  </tr>
                </thead>
                <tbody>
                  {drawdownResult.perTrade.map((row) => (
                    <tr key={row.lossNumber} className="border-b border-white/5 last:border-0">
                      <td className="p-3 text-muted-foreground">{row.lossNumber}</td>
                      <td className="p-3 text-foreground">{fmtMoney(row.startingEquity)}</td>
                      <td className="p-3 text-trading-red">−{fmtMoney(row.lossAmount)}</td>
                      <td className="p-3 text-foreground">{fmtMoney(row.endingEquity)}</td>
                      <td className="p-3 text-trading-red">{fmtPct(row.cumulativeDrawdownPercent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Static recovery table */}
          <div className="glass-strong rounded-2xl p-5 gradient-border">
            <h4 className="text-sm font-bold text-foreground mb-1">Recovery Gain Required (Static Reference)</h4>
            <p className="text-xs text-muted-foreground/70 mb-3">Deterministic percentage mathematics — why recovery grows faster than drawdown.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground">
                    <th className="text-left p-2 font-bold">Drawdown</th>
                    <th className="text-left p-2 font-bold">Gain Required to Recover</th>
                  </tr>
                </thead>
                <tbody>
                  {RECOVERY_TABLE.map((row) => (
                    <tr key={row.drawdown} className="border-b border-white/5 last:border-0">
                      <td className="p-2 text-trading-red font-bold">{row.drawdown}%</td>
                      <td className="p-2 text-trading-green font-bold">{row.recovery}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RISK_COMPARISON */}
      {form.mode === "RISK_COMPARISON" && comparisonRows && (
        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-5 gradient-border">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-muted-foreground">
                How the same strategy behaves under different risk-per-trade settings.
              </p>
              <button
                onClick={() => setComparisonSimRunning(!comparisonSimRunning)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-trading-green/20 text-trading-green border border-trading-green/30 hover:bg-trading-green/10 transition-colors"
              >
                {comparisonSimRunning ? "Disable" : "Enable"} Simulation Estimates
              </button>
            </div>
          </div>

          <div className="glass-strong rounded-2xl gradient-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 font-bold text-foreground">Risk / Trade</th>
                    <th className="text-left p-3 font-bold text-foreground">5-Loss DD %</th>
                    <th className="text-left p-3 font-bold text-foreground">10-Loss DD %</th>
                    <th className="text-left p-3 font-bold text-foreground">Losses to Threshold</th>
                    {comparisonSimRunning && <th className="text-left p-3 font-bold text-foreground">Sim. Threshold-Hit</th>}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.riskPercent} className="border-b border-white/5 last:border-0">
                      <td className="p-3 text-trading-gold font-bold">{row.riskPercent}%</td>
                      <td className="p-3 text-trading-red">{fmtPct(row.lossAfter5Percent)}</td>
                      <td className="p-3 text-trading-red">{fmtPct(row.lossAfter10Percent)}</td>
                      <td className="p-3 text-foreground">{row.lossesToThreshold ?? "—"}</td>
                      {comparisonSimRunning && (
                        <td className="p-3 text-muted-foreground">
                          {row.simulatedThresholdHitProbability != null ? fmtPct(row.simulatedThresholdHitProbability * 100) : "—"}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom risk input */}
          <div className="glass-strong rounded-2xl p-5 gradient-border">
            <Field id="rr-customrisk" label="Custom Risk % (optional, added to comparison)" value={form.customRiskPercent} onChange={(v) => update("customRiskPercent", v)} placeholder="e.g. 4" />
          </div>

          <div className="glass rounded-2xl p-4 border border-trading-gold/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deterministic drawdown columns are exact. Simulation estimates (when enabled) use 2,000 paths per risk level and are model estimates, not forecasts. This comparison does not recommend any risk level.
            </p>
          </div>
        </div>
      )}

      {/* Tool links */}
      <div className="glass rounded-2xl p-4 border border-trading-green/20">
        <p className="text-xs text-muted-foreground leading-relaxed">
          For trade payoff geometry, use the{" "}
          <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
          . For position sizing from account risk, the{" "}
          <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>
          . For prop-firm rule checks, the{" "}
          <Link href="/tools/prop-firm-consistency-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Consistency Calculator</Link>
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
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default RiskOfRuinCalculator;
