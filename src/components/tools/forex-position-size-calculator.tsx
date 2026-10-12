"use client";

/**
 * ForexPositionSizeCalculator
 * Three modes: Quick, Entry/Stop, Advanced.
 * All math driven by @/lib/forex-position-size-calc.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculatePositionSize,
  getPairPreset,
  getDefaultPipSize,
  getDefaultContractSize,
  getQuoteCurrency,
  getConversionDirection,
  PAIR_PRESETS,
  ACCOUNT_CURRENCIES,
  roundTo,
  DEFAULT_INPUTS,
  type CalculatorMode,
  type Direction,
  type RiskType,
  type PositionSizeInputs,
  type PositionSizeResult,
} from "@/lib/forex-position-size-calc";
import {
  AlertTriangle, Info, TrendingUp, TrendingDown, Copy, Check,
} from "lucide-react";

interface FormState {
  mode: CalculatorMode;
  accountEquity: string;
  accountCurrency: string;
  riskType: RiskType;
  riskPercentage: string;
  riskAmount: string;
  pairSelect: string;
  pairCustom: string;
  isCustomPair: boolean;
  direction: Direction;
  stopLossPips: string;
  entryPrice: string;
  stopLossPrice: string;
  contractSize: string;
  pipSize: string;
  conversionRate: string;
  minLot: string;
  maxLot: string;
  lotStep: string;
  commissionPerLot: string;
  slippagePips: string;
  additionalCosts: string;
}

const INITIAL_FORM: FormState = {
  mode: "QUICK",
  accountEquity: "10000",
  accountCurrency: "USD",
  riskType: "PERCENTAGE",
  riskPercentage: "1",
  riskAmount: "100",
  pairSelect: "EURUSD",
  pairCustom: "",
  isCustomPair: false,
  direction: "BUY",
  stopLossPips: "20",
  entryPrice: "",
  stopLossPrice: "",
  contractSize: "100000",
  pipSize: "0.0001",
  conversionRate: "1",
  minLot: "0.01",
  maxLot: "100",
  lotStep: "0.01",
  commissionPerLot: "0",
  slippagePips: "0",
  additionalCosts: "0",
};

function toNum(v: string): number {
  const n = Number(v.trim());
  return isFinite(n) ? n : 0;
}

export function ForexPositionSizeCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handlePairChange(pairSelect: string) {
    if (pairSelect === "__custom__") {
      update("isCustomPair", true);
    } else {
      const preset = getPairPreset(pairSelect);
      update("isCustomPair", false);
      update("pairSelect", pairSelect);
      if (preset) {
        update("pipSize", String(preset.pipSize));
        update("contractSize", String(preset.contractSize));
      }
      // Auto-set conversion rate if quote = account currency
      const quote = getQuoteCurrency(pairSelect);
      if (quote === form.accountCurrency) {
        update("conversionRate", "1");
      }
    }
  }

  function handleAccountCurrencyChange(currency: string) {
    update("accountCurrency", currency);
    const pair = form.isCustomPair ? form.pairCustom : form.pairSelect;
    const quote = getQuoteCurrency(pair);
    if (quote === currency) {
      update("conversionRate", "1");
    }
  }

  const inputs: PositionSizeInputs = useMemo(() => {
    const pair = form.isCustomPair ? form.pairCustom.toUpperCase().trim() : form.pairSelect;
    return {
      mode: form.mode,
      accountEquity: toNum(form.accountEquity),
      accountCurrency: form.accountCurrency,
      riskType: form.riskType,
      riskPercentage: form.riskType === "PERCENTAGE" ? toNum(form.riskPercentage) : undefined,
      riskAmount: form.riskType === "FIXED" ? toNum(form.riskAmount) : undefined,
      pair,
      direction: form.direction,
      stopLossPips: toNum(form.stopLossPips),
      entryPrice: form.mode === "ENTRY_STOP" && form.entryPrice ? toNum(form.entryPrice) : undefined,
      stopLossPrice: form.mode === "ENTRY_STOP" && form.stopLossPrice ? toNum(form.stopLossPrice) : undefined,
      contractSize: toNum(form.contractSize),
      pipSize: toNum(form.pipSize),
      conversionRate: toNum(form.conversionRate),
      minLot: toNum(form.minLot),
      maxLot: toNum(form.maxLot),
      lotStep: toNum(form.lotStep),
      commissionPerLot: toNum(form.commissionPerLot) || undefined,
      slippagePips: toNum(form.slippagePips) || undefined,
      additionalCosts: toNum(form.additionalCosts) || undefined,
    };
  }, [form]);

  const result: PositionSizeResult = useMemo(() => calculatePositionSize(inputs), [inputs]);

  const conversionDir = useMemo(() => {
    const pair = form.isCustomPair ? form.pairCustom.toUpperCase().trim() : form.pairSelect;
    return getConversionDirection(pair, form.accountCurrency);
  }, [form.isCustomPair, form.pairCustom, form.pairSelect, form.accountCurrency]);

  const fmtMoney = (n: number) => `${form.accountCurrency} ${roundTo(n, 2).toFixed(2)}`;
  const fmtNum = (n: number, d = 2) => roundTo(n, d).toFixed(d);

  function handleCopy() {
    if (!result.valid) return;
    const text = `Forex Position Size Calculation
Pair: ${result.pair} (${result.direction})
Lot Size: ${fmtNum(result.brokerLots, 4)}
Money at Risk: ${fmtMoney(result.moneyAtRisk)}
Pip Value: ${fmtMoney(result.pipValueAtSize)}
Stop Loss: ${fmtNum(result.stopLossPips)} pips
Risk: ${fmtMoney(result.riskAmount)} (${fmtNum(result.riskPercentage)}%)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2" role="tablist">
        {([
          { id: "QUICK", label: "Quick Position Size" },
          { id: "ENTRY_STOP", label: "Entry & Stop-Loss" },
          { id: "ADVANCED", label: "Advanced Broker Settings" },
        ] as { id: CalculatorMode; label: string }[]).map(tab => (
          <button key={tab.id} role="tab" aria-selected={form.mode === tab.id}
            onClick={() => update("mode", tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${form.mode === tab.id ? "bg-trading-green text-trading-dark glow-green" : "glass-strong text-muted-foreground hover:text-foreground border border-white/10"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="glass-strong rounded-2xl p-5 md:p-6 gradient-border">
          <h3 className="text-lg font-bold text-foreground mb-5">Trade Inputs</h3>

          {/* Account */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Field id="ps-equity" label="Account Equity" value={form.accountEquity} onChange={v => update("accountEquity", v)} placeholder="10000" />
            <div>
              <label htmlFor="ps-currency" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">CURRENCY</label>
              <select id="ps-currency" value={form.accountCurrency} onChange={e => handleAccountCurrencyChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none">
                {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c} className="bg-trading-dark">{c}</option>)}
              </select>
            </div>
          </div>

          {/* Risk type */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={() => update("riskType", "PERCENTAGE")} aria-pressed={form.riskType === "PERCENTAGE"}
              className={`px-3 py-2 rounded-lg text-xs font-bold border ${form.riskType === "PERCENTAGE" ? "bg-trading-gold/15 text-trading-gold border-trading-gold/40" : "glass text-muted-foreground border-white/10"}`}>
              Risk Percentage
            </button>
            <button onClick={() => update("riskType", "FIXED")} aria-pressed={form.riskType === "FIXED"}
              className={`px-3 py-2 rounded-lg text-xs font-bold border ${form.riskType === "FIXED" ? "bg-trading-gold/15 text-trading-gold border-trading-gold/40" : "glass text-muted-foreground border-white/10"}`}>
              Fixed Amount
            </button>
          </div>
          {form.riskType === "PERCENTAGE" ? (
            <Field id="ps-riskpct" label="Risk Percentage (%)" value={form.riskPercentage} onChange={v => update("riskPercentage", v)} placeholder="1" />
          ) : (
            <Field id="ps-riskamt" label={`Risk Amount (${form.accountCurrency})`} value={form.riskAmount} onChange={v => update("riskAmount", v)} placeholder="100" />
          )}

          {/* Pair */}
          <div className="mb-4">
            <label htmlFor="ps-pair" className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">CURRENCY PAIR</label>
            <select id="ps-pair" value={form.isCustomPair ? "__custom__" : form.pairSelect} onChange={e => handlePairChange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none">
              {PAIR_PRESETS.map(p => <option key={p.pair} value={p.pair} className="bg-trading-dark">{p.label}</option>)}
              <option value="__custom__" className="bg-trading-dark">Custom Pair</option>
            </select>
            {form.isCustomPair && (
              <input type="text" value={form.pairCustom} onChange={e => update("pairCustom", e.target.value.toUpperCase())}
                placeholder="e.g. EURCAD" maxLength={6}
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none" />
            )}
          </div>

          {/* Direction */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(["BUY", "SELL"] as Direction[]).map(d => (
              <button key={d} onClick={() => update("direction", d)} aria-pressed={form.direction === d}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold ${form.direction === d
                  ? d === "BUY" ? "bg-trading-green/20 text-trading-green border border-trading-green/50" : "bg-trading-red/20 text-trading-red border border-trading-red/50"
                  : "glass text-muted-foreground border border-white/10"}`}>
                {d === "BUY" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {d}
              </button>
            ))}
          </div>

          {/* Mode-specific */}
          {form.mode === "ENTRY_STOP" ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field id="ps-entry" label="Entry Price" value={form.entryPrice} onChange={v => update("entryPrice", v)} placeholder="1.1000" />
              <Field id="ps-stop" label="Stop-Loss Price" value={form.stopLossPrice} onChange={v => update("stopLossPrice", v)} placeholder="1.0980" />
            </div>
          ) : (
            <Field id="ps-stoppips" label="Stop-Loss Distance (pips)" value={form.stopLossPips} onChange={v => update("stopLossPips", v)} placeholder="20" />
          )}

          {/* Conversion rate */}
          {conversionDir && (
            <div className="mb-4">
              <Field id="ps-conv" label="Conversion Rate (quote-to-account)" value={form.conversionRate} onChange={v => update("conversionRate", v)} placeholder="1.25" />
              <p className="text-xs text-muted-foreground/70 mt-1">{conversionDir}</p>
            </div>
          )}

          {/* Advanced settings */}
          {(form.mode === "ADVANCED" || form.isCustomPair) && (
            <details className="mt-4 group" open={form.mode === "ADVANCED"}>
              <summary className="text-xs font-bold text-trading-gold cursor-pointer list-none mb-3">Broker & Contract Settings</summary>
              <div className="grid grid-cols-2 gap-4">
                <Field id="ps-contract" label="Contract Size (units/lot)" value={form.contractSize} onChange={v => update("contractSize", v)} placeholder="100000" />
                <Field id="ps-pipsize" label="Pip Size" value={form.pipSize} onChange={v => update("pipSize", v)} placeholder="0.0001" />
                <Field id="ps-minlot" label="Min Lot" value={form.minLot} onChange={v => update("minLot", v)} placeholder="0.01" />
                <Field id="ps-maxlot" label="Max Lot" value={form.maxLot} onChange={v => update("maxLot", v)} placeholder="100" />
                <Field id="ps-step" label="Lot Step" value={form.lotStep} onChange={v => update("lotStep", v)} placeholder="0.01" />
                {form.mode === "ADVANCED" && (
                  <>
                    <Field id="ps-comm" label={`Commission/Lot (${form.accountCurrency})`} value={form.commissionPerLot} onChange={v => update("commissionPerLot", v)} placeholder="0" />
                    <Field id="ps-slip" label="Slippage (pips)" value={form.slippagePips} onChange={v => update("slippagePips", v)} placeholder="0" />
                    <Field id="ps-extra" label={`Additional Costs (${form.accountCurrency})`} value={form.additionalCosts} onChange={v => update("additionalCosts", v)} placeholder="0" />
                  </>
                )}
              </div>
            </details>
          )}

          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-trading-gold/5 border border-trading-gold/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-trading-gold shrink-0 mt-0.5" />
            <span>Illustrative calculation — not a trade recommendation. Verify broker specifications before trading.</span>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {!result.valid && result.error ? (
            <div className="glass-strong rounded-2xl p-5 border border-trading-red/30" role="alert">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-trading-red shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{result.error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Headline */}
              <div className="glass-strong rounded-2xl p-6 gradient-border text-center" aria-live="polite">
                <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">RECOMMENDED POSITION SIZE</p>
                <p className="text-4xl md:text-5xl font-extrabold text-trading-green text-glow-green mb-2">
                  {fmtNum(result.brokerLots, 4)}
                </p>
                <p className="text-sm text-muted-foreground">standard lots · {fmtMoney(result.moneyAtRisk)} at risk</p>
                {result.brokerMessage && (
                  <p className="text-xs text-trading-red mt-2">{result.brokerMessage}</p>
                )}
              </div>

              {/* Metrics grid */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <Stat label="Money at Risk" value={fmtMoney(result.moneyAtRisk)} tone="red" />
                  <Stat label="Risk Percentage" value={`${fmtNum(result.riskPercentage)}%`} />
                  <Stat label="Pip Value at Size" value={fmtMoney(result.pipValueAtSize)} />
                  <Stat label="Stop-Loss Pips" value={`${fmtNum(result.stopLossPips)}`} />
                  <Stat label="Base Currency Units" value={result.baseCurrencyUnits.toLocaleString()} />
                  <Stat label="Mini Lots" value={fmtNum(result.miniLots, 1)} />
                  <Stat label="Micro Lots" value={fmtNum(result.microLots, 1)} />
                  <Stat label="Unused Risk Budget" value={fmtMoney(result.unusedRiskBudget)} tone="green" />
                  <Stat label="Cost per Lot" value={fmtMoney(result.costPerLot)} />
                </div>
              </div>

              {/* Breakdown */}
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-foreground">Calculation Breakdown</h4>
                  <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs font-bold text-trading-green hover:text-trading-green/80">
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Results"}
                  </button>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {result.breakdown.map((step, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                      <span className="text-muted-foreground">{step.label}</span>
                      <span className="text-foreground font-medium">{step.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tool links */}
              <div className="glass rounded-2xl p-4 border border-trading-green/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For gold-specific position sizing, use the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>
                  . For trade payoff geometry, the{" "}
                  <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
                  . For pip value details, the{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Pip Value Calculator</Link>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-muted-foreground tracking-wider mb-2">{label.toUpperCase()}</label>
      <input id={id} type="number" step="any" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-foreground text-sm focus:border-trading-green focus:outline-none" />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "green" | "red" }) {
  const color = tone === "green" ? "text-trading-green" : tone === "red" ? "text-trading-red" : "text-foreground";
  return <div><p className="text-xs text-muted-foreground mb-1">{label}</p><p className={`text-sm font-bold ${color}`}>{value}</p></div>;
}

export default ForexPositionSizeCalculator;
