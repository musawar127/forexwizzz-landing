import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, AlertTriangle, ArrowRight, MessageCircle,
  Target, Crosshair, Layers, BookOpen, LineChart,
  Activity, Info, Scale, Clock, Gauge, DollarSign,
  XCircle, HelpCircle, CheckCircle2, Ruler,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { RiskRewardCalculator } from "@/components/tools/risk-reward-calculator";
import { BREAK_EVEN_TABLE } from "@/lib/risk-reward-calc";

export const metadata: Metadata = {
  title: "Risk Reward Calculator for Forex & XAUUSD | Forex Wizard",
  description:
    "Calculate risk-to-reward for Forex and XAUUSD using entry, stop loss and take profit. See R multiple, break-even win rate, expectancy and multiple targets.",
  alternates: { canonical: "https://forexwizard.online/tools/risk-reward-calculator/" },
  openGraph: {
    title: "Risk Reward Calculator for Forex & XAUUSD | Forex Wizard",
    description:
      "Calculate Forex and XAUUSD risk-to-reward from entry, stop loss and take profit, including R multiple, break-even win rate and advanced trade planning.",
    type: "website",
    url: "https://forexwizard.online/tools/risk-reward-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-risk-reward-calculator.jpg", width: 1200, height: 630, alt: "Forex and XAUUSD Risk Reward Calculator showing entry, stop loss and take profit with R multiple and break-even win rate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk Reward Calculator for Forex & XAUUSD | Forex Wizard",
    description:
      "Calculate Forex and XAUUSD risk-to-reward from entry, stop loss and take profit, including R multiple, break-even win rate and advanced trade planning.",
    images: ["/og-risk-reward-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard Forex & XAUUSD Risk Reward Calculator",
  description:
    "Free Forex and XAUUSD risk reward calculator for entry, stop loss and take-profit planning with R multiple, break-even win rate and multiple target analysis.",
  url: "https://forexwizard.online/tools/risk-reward-calculator/",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Forex Wizard", url: "https://forexwizard.online/", logo: { "@type": "ImageObject", url: "https://forexwizard.online/brand/forexwizard-logo.webp" } },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Trading Tools", item: "https://forexwizard.online/tools/" },
    { "@type": "ListItem", position: 3, name: "Risk Reward Calculator", item: "https://forexwizard.online/tools/risk-reward-calculator/" },
  ],
};

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
  };
  return (
    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      <MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTENT DATA                                                       */
/* ------------------------------------------------------------------ */

const howToSteps = [
  { step: "1", title: "Pick a mode", desc: "Use Analyze Trade to evaluate entry, stop and target you already have. Use Find Take Profit or Find Stop Loss to solve a price from a desired R. Use Multiple Targets to plan partial exits." },
  { step: "2", title: "Set direction and prices", desc: "Choose Long/Buy or Short/Sell, then enter your entry, stop loss and take profit. The calculator validates the trade geometry before computing." },
  { step: "3", title: "Choose a display convention", desc: "Pick Generic Price, an XAUUSD increment ($0.01 or $0.10), a Forex pip convention, or a custom increment. This only affects how distances are shown — the R:R ratio itself is unchanged." },
  { step: "4", title: "Read the results", desc: "See Risk : Reward as 1 : R, the reward multiple in R, price distances, the theoretical break-even win rate, and optional expectancy and cost-adjusted metrics." },
];

const formulaItems = [
  { label: "Risk Distance", formula: "|Entry − Stop|", note: "Distance between entry and stop loss." },
  { label: "Reward Distance", formula: "|Target − Entry|", note: "Distance between entry and take profit." },
  { label: "Reward Multiple (R)", formula: "Reward Distance / Risk Distance", note: "How many times the reward is vs the risk." },
  { label: "Risk : Reward", formula: "1 : R", note: "Forex Wizard standard notation." },
  { label: "Break-Even Win Rate", formula: "1 / (1 + R) × 100", note: "Theoretical binary threshold before costs." },
];

const commonMistakes = [
  { title: "Confusing reward:risk and risk:reward notation", desc: "A 2:1 reward:risk plan is the same as a 1:2 risk:reward plan. Forex Wizard always labels ratios as Risk : Reward = 1 : R to avoid ambiguity." },
  { title: "Stop on the wrong side of entry", desc: "A long trade needs the stop below entry and the target above. A short trade needs the stop above entry and the target below. The calculator rejects invalid geometry rather than silently using absolute values." },
  { title: "Thinking a high R automatically means a better trade", desc: "A higher R only describes payoff geometry. A distant target may be less likely to be reached. R:R says nothing about probability." },
  { title: "Ignoring your actual win rate", desc: "Expectancy combines R with your win rate. A 1:3 plan with a 20% win rate has zero expectancy. A 1:1 plan with a 60% win rate is positive. R alone is not an edge." },
  { title: "Ignoring spread, commission and slippage", desc: "Round-trip costs shrink net reward and widen net loss. Use the cost-adjusted mode to see the real R:R after estimated costs." },
  { title: "Changing the stop after planning without recalculating", desc: "If you move your stop, the risk distance and R change. Always recalculate before adjusting position size." },
  { title: "Assuming XAUUSD has one universal pip size", desc: "Some platforms treat $0.01 as a gold pip, others use $0.10. The R:R ratio is the same either way, but the pip count differs. Choose the convention that matches your platform." },
  { title: "Confusing planned R with realized R", desc: "Planned R is the payoff geometry at the moment you enter. Realized R depends on how you manage the trade — partial exits, trailing stops and early exits all change the actual result." },
  { title: "Treating multi-target weighted R like a binary outcome", desc: "Weighted R describes the planned payoff if every allocation reaches its target. It is not a probability model and does not produce a single break-even win rate." },
];

const faqs = [
  { q: "What is a risk reward calculator?", a: "A risk reward calculator measures the payoff geometry of a trade plan. You enter your entry, stop loss and take profit, and the calculator returns the reward-to-risk multiple (R), the price distances and the theoretical break-even win rate before costs. It does not predict whether the trade will win." },
  { q: "How do you calculate risk reward in forex?", a: "For a long trade, risk distance = entry − stop, reward distance = target − entry, and R = reward / risk. For a short trade, risk = stop − entry and reward = entry − target. The risk : reward ratio is written as 1 : R. Directional validation must happen before the distance calculation so an invalid layout is rejected rather than silently accepted." },
  { q: "What does a 1:2 risk reward ratio mean?", a: "A planned 1:2 risk-to-reward structure means the target is twice as far from the entry as the stop, measured in the same price unit. For example, a 10-pip risk and a 20-pip reward is 1:2. The theoretical break-even win rate before costs is 33.33%. This says nothing about whether the target is likely to be reached." },
  { q: "What win rate is needed for a 1:2 risk reward ratio?", a: "The theoretical break-even win rate for a 1:2 plan is 33.33% before trading costs. Above that, the plan has positive gross expectancy; below it, negative. After costs the threshold is higher. This is a mathematical threshold, not a guarantee of real-world profitability." },
  { q: "Is a 1:2 risk reward ratio always good?", a: "No. A 1:2 ratio only describes payoff geometry. A 1:2 plan with a 25% win rate loses money. A 1:1 plan with a 60% win rate is profitable. Whether a ratio is good depends on your actual win rate, your costs, and whether you follow the plan." },
  { q: "Does lot size change the risk reward ratio?", a: "No. The R:R ratio depends only on the relative price distances between entry, stop and target. Lot size changes the monetary exposure (how much money is at risk and how much can be won), but it does not change the ratio. Use the Lot Size Calculator for position sizing." },
  { q: "How do you calculate risk reward for XAUUSD?", a: "The formula is the same as for forex: R = reward distance / risk distance, where the distances are the price differences between entry, stop and target. For gold, choose a display convention ($0.01 or $0.10 per increment) to see distances in pip or point units, but the R:R ratio itself is independent of that choice." },
  { q: "Does XAUUSD have a universal pip size?", a: "No. Different brokers and platforms use different conventions for gold — some treat $0.01 as a pip, others use $0.10, and some distinguish between pips, points and ticks. Always check your platform's specification. The R:R ratio is the same regardless of the convention because it depends only on relative price distance." },
  { q: "Can I calculate risk reward with multiple take profits?", a: "Yes. Use the Multiple Targets mode to enter up to four take-profit levels with allocation percentages that total 100%. The calculator returns the R value of each target and the weighted planned reward across all allocations. Break-even win rate is not shown for multi-target plans because partial exits create multiple possible outcomes." },
  { q: "How do trading costs affect risk reward?", a: "A round-trip trading cost (spread, commission equivalent and slippage allowance) widens the net loss and shrinks the net reward. The cost-adjusted R:R is (reward − cost) / (risk + cost), and the adjusted break-even win rate is (risk + cost) / (risk + reward) × 100. The calculator always shows both gross and cost-adjusted figures." },
  { q: "What is the difference between risk reward and expectancy?", a: "Risk reward describes payoff geometry — how big the reward is relative to the risk. Expectancy combines R with your win rate to estimate the average outcome per trade in R units: EV = p × R − (1 − p), where p is your win rate as a decimal. A plan can have a high R and still have negative expectancy if the win rate is too low." },
  { q: "Can a high risk reward ratio guarantee profitability?", a: "No. No ratio can guarantee profitability. Real results depend on your actual win rate, execution quality, spread, commission, slippage, gaps, trade management and whether you follow the planned exit. R:R is a planning tool, not a predictor." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function RiskRewardCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold text-trading-gold tracking-tight no-underline flex items-center gap-2">
            <img src="/brand/forexwizard-logo.webp" alt="ForexWizard logo" width={44} height={44} loading="eager" decoding="async" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover" />
            Forex Wizard
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-trading-green transition-colors no-underline">XAUUSD Analysis</Link>
            <Link href="/tools/" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Trading Tools</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 md:py-28 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-trading-green/5 rounded-full blur-[100px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 text-center max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap justify-center">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <Link href="/tools/" className="hover:text-trading-green transition-colors no-underline">Trading Tools</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">Risk Reward Calculator</span>
            </nav>
            <FadeIn delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-trading-gold">
                <Crosshair className="w-4 h-4" />
                Forex Wizard Tool #4 · Risk Reward Calculator
              </span>
            </FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Risk Reward Calculator for </span>
              <span className="text-trading-gold text-glow-gold">Forex &amp; XAUUSD</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Enter your planned entry, stop loss and take profit to calculate the reward-to-risk multiple, price distances and theoretical break-even win rate. Use the Forex and XAUUSD distance options for clearer pip or price-increment measurements; the ratio itself depends only on relative price distance.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              This calculator performs trade-planning mathematics only. It does not estimate the probability that a target or stop will be reached.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <RiskRewardCalculator />
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the </span>
              <span className="text-trading-gold text-glow-gold">Risk Reward Calculator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {howToSteps.map((s) => (
                <div key={s.step} className="glass-strong rounded-2xl p-5 gradient-border">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-trading-green/15 flex items-center justify-center text-trading-green font-bold text-sm">{s.step}</span>
                    <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* HOW IT'S CALCULATED */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Risk Reward Is </span>
                <span className="text-trading-gold text-glow-gold">Calculated</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The calculator uses directional validation before any distance math. For a long trade it requires stop &lt; entry &lt; target; for a short trade it requires target &lt; entry &lt; stop. This prevents invalid layouts from being silently accepted through absolute-value shortcuts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formulaItems.map((f) => (
                    <div key={f.label} className="glass rounded-xl p-4">
                      <p className="text-sm font-bold text-foreground mb-1">{f.label}</p>
                      <p className="text-sm text-trading-green font-mono mb-1">{f.formula}</p>
                      <p className="text-xs text-muted-foreground/80">{f.note}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Results are written using the Forex Wizard standard: <strong className="text-foreground/90">Risk : Reward = 1 : R</strong>. A trade where the reward is twice the risk is displayed as 1 : 2.00 (never 2 : 1 labelled as risk:reward).
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WHAT DOES 1:2 MEAN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Does a 1:2 Risk Reward Ratio </span>
                <span className="text-trading-gold text-glow-gold">Mean?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  A planned 1:2 risk-to-reward structure means the target is twice as far from the entry as the stop when measured using the same price unit. For example, a 10-pip risk and a 20-pip reward is a 1:2 plan.
                </p>
                <div className="glass rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-xs text-muted-foreground mb-1">Risk</p><p className="text-xl font-bold text-trading-gold">10</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Reward</p><p className="text-xl font-bold text-trading-green">20</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Risk : Reward</p><p className="text-xl font-bold text-foreground">1 : 2</p></div>
                </div>
                <p>
                  The theoretical break-even win rate before trading costs is <strong className="text-foreground/90">33.33%</strong>. Above that, the plan has positive gross expectancy; below it, negative. This does not mean a 1:2 plan is universally best — a distant target may be less likely to be reached, and R:R says nothing about probability.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BREAK-EVEN TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Risk Reward Ratio and </span>
              <span className="text-trading-gold text-glow-gold">Break-Even Win Rate</span>
            </h2>
            <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold text-foreground">Risk : Reward</th>
                      <th className="text-left p-4 font-bold text-foreground">Reward Multiple</th>
                      <th className="text-left p-4 font-bold text-foreground">Break-Even Win Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BREAK_EVEN_TABLE.map((row) => (
                      <tr key={row.riskReward} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-trading-gold font-bold">{row.riskReward}</td>
                        <td className="p-4 text-trading-green font-bold">{row.rMultiple.toFixed(2)}R</td>
                        <td className="p-4 text-foreground">{row.breakEven.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3">
              These are theoretical binary thresholds before trading costs. A lower break-even rate does not mean a more distant target is equally likely to be reached.
            </p>
          </div>
        </FadeSection>

        {/* XAUUSD SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Risk Reward Calculator: </span>
                <span className="text-trading-gold text-glow-gold">Gold Price Distances and Pip Conventions</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The R:R formula is the same for gold as for forex — it depends only on relative price distance. What differs for XAUUSD is the lack of a universal pip standard. Different brokers and platforms may use pip, point and tick terminology differently for gold.
                </p>
                <p>
                  This calculator offers three gold display conventions: a $0.01 price increment, a $0.10 price increment, and a custom increment. The R:R ratio is unchanged by the convention because R:R depends on relative price distance, not on what you call a pip.
                </p>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-2">Example: Long XAUUSD</p>
                  <p className="text-sm text-muted-foreground">Entry 4000, stop 3990, target 4020 → risk distance $10, reward distance $20, R = 2, Risk : Reward = 1 : 2.</p>
                  <p className="text-sm text-muted-foreground mt-2">The ratio remains 1:2 regardless of whether the position size is 0.01, 0.10 or 1.00 lot. Lot size changes monetary exposure; it does not change the raw price-distance ratio.</p>
                </div>
                <p>
                  For the monetary value of a gold price move, use the{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Pip Value Calculator</Link>
                  . For position sizing from account equity and stop distance, use the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Lot Size Calculator</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MULTIPLE TAKE PROFITS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Risk Reward With </span>
                <span className="text-trading-gold text-glow-gold">Multiple Take Profits</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The Multiple Targets mode lets you plan up to four partial take-profit levels. Each target has a price and an allocation percentage, and the allocations must total 100%. The calculator returns the R value of each target and the weighted planned reward.
                </p>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-2">Example</p>
                  <p className="text-sm text-muted-foreground">TP1 at 1R with 50% allocation, TP2 at 3R with 50% allocation → weighted R = 0.5 × 1 + 0.5 × 3 = 2.00R.</p>
                </div>
                <p>
                  Break-even win rate is not shown for multi-target plans because partial exits create several possible trade paths (stop before TP1, TP1 then stop, TP1 + TP2 then stop, all targets hit). The simple binary formula is not sufficient. Weighted R describes the planned payoff <em>if</em> each allocation exits at its specified target — it is not a probability model.
                </p>
                <p>
                  This mode does not model moving the stop to break-even, trailing stops, dynamic stop changes, scale-ins, partial stop-outs, re-entry, or the probability of each TP being reached. The model is intentionally transparent.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* R:R vs LOT SIZE / PIP VALUE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Risk Reward vs </span>
                <span className="text-trading-gold text-glow-gold">Lot Size and Pip Value</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Risk reward, lot size and pip value answer three different questions. Risk reward measures the payoff geometry of a trade plan. Lot size measures how much volume to trade so that a given stop distance risks a specific amount of account capital. Pip value measures how much one pip of price movement is worth in account-currency terms for a given volume.
                </p>
                <p>
                  This calculator deliberately does not duplicate position sizing — that belongs in the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Lot Size Calculator</Link>
                  . Once you have planned your R:R here and know your risk amount, use the Lot Size Calculator to convert that risk amount into a lot size for your stop distance. For the monetary value of price moves, use the{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Pip Value Calculator</Link>
                  . And to confirm the resulting position fits within your available collateral, estimate the requirement with the{" "}
                  <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Margin Calculator</Link>
                  .
                </p>
                <p>
                  For choosing meaningful entry, stop and target levels in the first place, see the{" "}
                  <Link href="/xauusd-support-resistance/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">XAUUSD Support and Resistance guide</Link>
                  . For the broader risk-management framework, read our{" "}
                  <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80 transition-colors">forex risk management for beginners guide</Link>
                  . And to time your entries around the most liquid sessions, use the{" "}
                  <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Market Hours Clock</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* SPREAD / COMMISSION / SLIPPAGE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Spread, Commission and Slippage </span>
                <span className="text-trading-gold text-glow-gold">Change Risk Reward</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Trading costs shrink net reward and widen net loss. The calculator&apos;s cost-adjusted mode (available in Analyze Trade) lets you enter an estimated round-trip cost in price-distance units. This may represent spread, a commission equivalent, a slippage allowance, or a combination — the calculator does not fetch broker fees or assume any default.
                </p>
                <div className="glass rounded-xl p-4 space-y-2">
                  <p className="text-sm font-bold text-foreground">Formulas</p>
                  <p className="text-sm text-muted-foreground"><span className="text-trading-green font-mono">Net Loss Magnitude = risk + cost</span></p>
                  <p className="text-sm text-muted-foreground"><span className="text-trading-green font-mono">Net Winning Reward = reward − cost</span></p>
                  <p className="text-sm text-muted-foreground"><span className="text-trading-green font-mono">Cost-Adjusted R = (reward − cost) / (risk + cost)</span></p>
                  <p className="text-sm text-muted-foreground"><span className="text-trading-green font-mono">Adjusted Break-Even = (risk + cost) / (risk + reward) × 100</span></p>
                </div>
                <p>
                  The calculator assumes the entered round-trip cost is incurred for either a stop or target outcome, and always shows both gross and cost-adjusted figures so the gross result is never hidden. Cost adjustment applies to single-target trades only — multi-target plans are not cost-adjusted.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* EXPECTANCY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Risk Reward and </span>
                <span className="text-trading-gold text-glow-gold">Trading Expectancy</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Expectancy combines your reward multiple with your historical win rate to estimate the average outcome per trade in R units. The formula is <span className="text-trading-green font-mono">EV = p × R − (1 − p)</span>, where p is your win rate as a decimal.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">50% win rate, 2R</p>
                    <p className="text-lg font-bold text-trading-green">+0.5R</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">25% win rate, 3R</p>
                    <p className="text-lg font-bold text-foreground">0R</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">40% win rate, 1R</p>
                    <p className="text-lg font-bold text-trading-red">−0.2R</p>
                  </div>
                </div>
                <p>
                  A high R with a low win rate can still lose money. Expectancy is the number that actually determines long-run average outcome — but it depends entirely on the win rate you enter, which the calculator does not estimate. Enter your realistic historical win rate, not a hoped-for one.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Risk Reward </span>
              <span className="text-trading-gold text-glow-gold">Mistakes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonMistakes.map((m) => (
                <div key={m.title} className="glass-strong rounded-2xl p-5 gradient-border">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-trading-red shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Frequently Asked </span>
                <span className="text-trading-gold text-glow-gold">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="glass-strong rounded-2xl gradient-border group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                    <h3 className="text-base font-bold text-foreground pr-4">{faq.q}</h3>
                    <ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="px-5 pb-5 -mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* RISK DISCLAIMER */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Disclaimer
              </h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Trading forex, gold and CFDs involves significant risk and may not be suitable for everyone.</p>
                <p>This calculator is provided for educational and informational purposes only and should not be considered financial advice, investment advice or a recommendation to buy or sell any financial instrument.</p>
                <p>R:R describes payoff geometry. Actual results depend on your real win rate, execution, spread, commission, slippage, gaps, trade management and whether the planned exit is followed. The calculator does not estimate market probability.</p>
                <p>Always perform your own analysis and use appropriate risk management.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">Follow XAU/USD on </span>
                <span className="text-trading-green text-glow-green">Telegram</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.
              </p>
              <TelegramCTA text="Join Forex Wizard Telegram" variant="primary" className="text-lg md:text-xl px-10 py-5" />
              <p className="mt-6 text-xs text-muted-foreground/80">Free to join &middot; Trading involves risk &middot; Not financial advice</p>
            </div>
          </div>
        </FadeSection>

        <SiteFooter />
      </main>

      <StickyTelegramButton href={TELEGRAM_LINK} label="Join Forex Wizard on Telegram" />
    </>
  );
}
