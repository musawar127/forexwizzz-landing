import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, ArrowRight, MessageCircle, Activity, TrendingDown,
  BookOpen, Info, CheckCircle2, XCircle,
} from "lucide-react";
import {
  FadeSection, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { RiskOfRuinCalculator } from "@/components/tools/risk-of-ruin-calculator";
import { RECOVERY_TABLE } from "@/lib/risk-of-ruin-calc";

export const metadata: Metadata = {
  title: "Risk of Ruin Calculator for Forex Trading | Forex Wizard",
  description:
    "Estimate trading risk of ruin, losing-streak probability, drawdown and recovery using win rate, reward-to-risk, risk per trade and trade count.",
  alternates: { canonical: "https://forexwizard.online/tools/risk-of-ruin-calculator/" },
  openGraph: {
    title: "Risk of Ruin Calculator for Forex Trading | Forex Wizard",
    description:
      "Estimate losing-streak probability, compounded drawdown, recovery requirements and finite-horizon risk of ruin from your trading statistics.",
    type: "website",
    url: "https://forexwizard.online/tools/risk-of-ruin-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-risk-of-ruin-calculator.jpg", width: 1200, height: 630, alt: "Risk of Ruin Calculator showing losing-streak probability, drawdown and recovery for forex trading" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk of Ruin Calculator for Forex Trading | Forex Wizard",
    description:
      "Estimate losing-streak probability, compounded drawdown, recovery requirements and finite-horizon risk of ruin from your trading statistics.",
    images: ["/og-risk-of-ruin-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard Trading Risk of Ruin Calculator",
  description:
    "Free trading risk of ruin calculator for estimating losing-streak probability, compounded drawdown, recovery requirements and finite-horizon threshold risk.",
  url: "https://forexwizard.online/tools/risk-of-ruin-calculator/",
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
    { "@type": "ListItem", position: 3, name: "Risk of Ruin Calculator", item: "https://forexwizard.online/tools/risk-of-ruin-calculator/" },
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

const exactVsSimulated = {
  exact: [
    "Expectancy from entered averages",
    "Break-even win rate",
    "Compounded drawdown from consecutive losses",
    "Required recovery gain",
    "Exact losing-streak probability under independent Bernoulli assumptions",
  ],
  simulated: [
    "Threshold-hit probability",
    "Ending-balance distribution",
    "Maximum-drawdown distribution",
    "Longest-losing-streak distribution",
  ],
};

const faqs = [
  { q: "What is a risk of ruin calculator?", a: "A risk of ruin calculator estimates the probability that a trading strategy will reach a defined loss threshold over a given number of trades. This calculator uses a finite-horizon Monte Carlo simulation for the threshold-hit estimate and exact dynamic programming for losing-streak probabilities. The results are model estimates, not forecasts." },
  { q: "How is risk of ruin calculated in forex trading?", a: "Risk of ruin depends on position-sizing method, win probability, payoff distribution, trade dependence, ruin definition and time horizon. This calculator uses fixed-fractional position sizing, binary win/loss outcomes based on entered average R values, a finite trade horizon, and a seeded Monte Carlo simulation. There is no single universal risk-of-ruin formula applicable to all trading systems." },
  { q: "Is risk of ruin an exact probability?", a: "No. The threshold-hit probability is a finite-horizon Monte Carlo simulation estimate, not an exact probability. The losing-streak probability is exact under the independent Bernoulli model, but real trades can be correlated. The calculator clearly separates exact deterministic calculations from simulation estimates." },
  { q: "What information do I need for a risk of ruin calculator?", a: "You need your win rate (percentage of winning trades), average win in R multiples, average loss in R multiples, risk per trade as a percentage of equity, starting balance, trade horizon, and a loss threshold. For the simulation, you also choose the number of paths and a seed for reproducibility." },
  { q: "How does risk per trade affect risk of ruin?", a: "Higher risk per trade increases the equity swing on each trade. This means consecutive losses compound faster, the drawdown from the same losing streak is larger, and the probability of hitting a given threshold within a fixed number of trades generally increases. The Risk Comparison mode demonstrates this relationship across multiple risk levels." },
  { q: "Can a profitable strategy still experience a large drawdown?", a: "Yes. A strategy with positive mathematical expectancy can still experience significant losing streaks and drawdowns, especially over a large number of trades. Positive expectancy describes the average outcome per trade — it does not guarantee that every sequence of trades will be smooth. This is why risk management matters even for profitable strategies." },
  { q: "What is the probability of five losses in a row?", a: "It depends on your loss probability and the number of trades. At a 50% win rate, the probability of five specific consecutive trades all being losses is 0.5^5 = 3.125%. But the probability of seeing at least one five-loss streak somewhere across 100 trades is much higher — use the Losing Streak mode for the exact figure under the independent-trades model." },
  { q: "What is the probability of ten losing trades in a row?", a: "At a 50% win rate, the probability of ten specific consecutive losses is 0.5^10 ≈ 0.098%. But across 200 trades, the probability of at least one ten-loss streak is higher. The Losing Streak mode uses dynamic programming to compute the exact probability under the independent Bernoulli model." },
  { q: "How do I calculate drawdown from consecutive losses?", a: "Under fixed-fractional risk, each loss reduces equity by the risk percentage multiplied by the average loss in R. After n consecutive losses, the ending balance is StartingBalance × (1 − r × L)^n, where r is the risk fraction and L is the average loss in R. The Drawdown & Recovery mode shows this step by step." },
  { q: "How much gain is needed to recover a 10% drawdown?", a: "A 10% drawdown requires an 11.11% gain to recover. If you start with $10,000 and lose 10% ($1,000), you have $9,000. To return to $10,000, you need to gain $1,000 on a $9,000 base — that is 11.11%." },
  { q: "How much gain is needed to recover a 20% drawdown?", a: "A 20% drawdown requires a 25% gain to recover. From $10,000, a 20% loss leaves $8,000. Returning to $10,000 means gaining $2,000 on an $8,000 base — that is 25%." },
  { q: "Why does a 50% drawdown need a 100% gain?", a: "Because the gain is calculated on the reduced balance. A 50% loss from $10,000 leaves $5,000. Returning from $5,000 to $10,000 means doubling the remaining balance — a 100% gain. This asymmetry is why drawdown recovery becomes progressively harder as the drawdown deepens." },
  { q: "What is the difference between drawdown and risk of ruin?", a: "Drawdown measures how far an account has fallen from a peak (or from the starting balance). Risk of ruin estimates the probability of reaching a specified loss threshold over a number of trades. Drawdown is a measure of what has happened; risk of ruin is a probability estimate of what might happen under the model assumptions." },
  { q: "Does win rate alone determine risk of ruin?", a: "No. Win rate, average win, average loss, risk per trade, trade horizon and threshold definition all affect the result. A high win rate with a very small average win and large average loss can still have poor risk characteristics. Expectancy (which combines win rate with reward-to-risk) is more informative than win rate alone." },
  { q: "Does reward-to-risk affect risk of ruin?", a: "Yes. The average win and average loss in R multiples determine the expectancy per trade and the equity multiplier on each outcome. A higher reward-to-risk ratio means each win contributes more, but if the win rate is low, the losing streaks may be longer. The simulation accounts for both." },
  { q: "Does this calculator work for Forex and XAUUSD?", a: "Yes. The model works in R multiples and is instrument-agnostic. Enter your strategy statistics (win rate, average win/loss in R, risk per trade) regardless of whether you trade forex pairs or gold. The mathematical model does not depend on the instrument." },
  { q: "Can I use it for a prop-firm account?", a: "The general risk model can illustrate how a strategy behaves around an entered drawdown threshold, but prop firms may use daily loss limits, static drawdown, trailing drawdown, intraday equity, end-of-day balance, and consistency rules. Therefore this tool does not certify prop-firm compliance. For consistency-rule checks, use the Prop Firm Consistency Calculator." },
  { q: "Does the calculator include commission or spread?", a: "No. The model works in R multiples and does not separately model spread, commission, swap or slippage. Historical win rate and average R values are most useful when calculated from net completed trades — in that case, costs are already reflected in the R values." },
  { q: "What assumptions does the Monte Carlo simulation make?", a: "The simulation assumes independent trades with constant win rate, average win, average loss and fractional risk. Real trading results can cluster (correlated outcomes), change over time (regime shifts), and include costs or execution differences. The result is a model estimate, not a forecast." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function RiskOfRuinCalculatorPage() {
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
              <span className="text-foreground/80">Risk of Ruin Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Trading Risk of Ruin &amp; </span>
              <span className="text-trading-gold text-glow-gold">Losing Streak Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Estimate how win rate, average reward-to-risk and fractional risk interact across a series of trades. Calculate exact losing-streak probabilities, compounded drawdown, recovery requirements and a reproducible Monte Carlo estimate of reaching a chosen loss threshold.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              Probability results depend entirely on the assumptions entered. The model does not predict future trades and assumes constant statistics; losing-streak probabilities additionally assume independent trade outcomes.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <RiskOfRuinCalculator />
          </div>
        </FadeSection>

        {/* EXACT VS SIMULATED */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Exact Calculations vs </span>
                <span className="text-trading-gold text-glow-gold">Simulation Estimates</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-trading-green mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> EXACT CALCULATIONS
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exactVsSimulated.exact.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-trading-green shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-trading-gold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> SIMULATION ESTIMATES
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exactVsSimulated.simulated.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Activity className="w-3.5 h-3.5 text-trading-gold shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4">
                This transparency is important. The losing-streak probability is exact under the independent Bernoulli model. The threshold-hit probability is a finite-horizon Monte Carlo estimate.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the Risk of Ruin </span>
              <span className="text-trading-gold text-glow-gold">Calculator</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground/90">Mode 1 — Risk of Ruin:</strong> Enter your strategy statistics and click Run Simulation. The calculator runs a seeded Monte Carlo simulation across thousands of trading paths and reports the estimated threshold-hit probability, ending-balance distribution, and drawdown/streak distribution.</p>
              <p><strong className="text-foreground/90">Mode 2 — Losing Streak:</strong> Enter your win rate, number of trades and target streak length. The calculator returns the exact probability of experiencing at least one run of that many consecutive losses, using dynamic programming. A table shows probabilities for streaks of 2 through 10 losses.</p>
              <p><strong className="text-foreground/90">Mode 3 — Drawdown &amp; Recovery:</strong> Enter your starting balance, risk per trade, average loss and number of consecutive losses. The calculator shows the compounded drawdown, ending balance, recovery gain required, losses needed to reach a target drawdown, and a trade-by-trade table.</p>
              <p><strong className="text-foreground/90">Mode 4 — Risk Comparison:</strong> See how the same strategy behaves under different risk-per-trade settings (0.25% through 5%). The table shows 5-loss and 10-loss drawdowns, losses to threshold, and optional simulation estimates.</p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS RISK OF RUIN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Is Risk of Ruin in </span>
                <span className="text-trading-gold text-glow-gold">Trading?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Risk of ruin is the probability that a trading strategy will reach a defined loss threshold over a given number of trades. It depends on position-sizing method, win probability, payoff distribution, trade dependence, ruin definition and time horizon.</p>
                <p>This calculator uses fixed-fractional position sizing (risk as a percentage of current equity), binary win/loss outcomes based on entered average R values, a finite trade horizon, and a seeded Monte Carlo simulation. There is no single universal risk-of-ruin formula applicable to all trading systems.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">The result is a model estimate, not a forecast. It describes what would happen under the stated assumptions — it does not predict actual future trades.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* HOW THIS CALCULATOR ESTIMATES ROR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How This Calculator Estimates </span>
                <span className="text-trading-gold text-glow-gold">Risk of Ruin</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The Risk of Ruin mode uses a finite-horizon Monte Carlo simulation. Each simulated path starts at the entered starting balance and processes the entered number of trades. For each trade, a random number determines whether it is a win or loss based on the entered win rate.</p>
                <p>A win multiplies equity by (1 + risk × avgWinR); a loss multiplies by (1 − risk × avgLossR). The simulation tracks whether the equity hits the threshold, the ending balance, the maximum peak-to-trough drawdown, and the longest losing streak.</p>
                <p>Across thousands of paths, the threshold-hit probability is the fraction of paths that hit the threshold. The simulation uses a seeded PRNG (Mulberry32) for reproducibility — the same seed and inputs always produce the same result.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">The simulation assumes independent trades with constant statistics. Real trades can be correlated, and market regime changes can produce more clustered outcomes than the model assumes.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ROR VS DRAWDOWN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Risk of Ruin vs </span>
                <span className="text-trading-gold text-glow-gold">Drawdown</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Drawdown measures how far an account has fallen from a peak (or from the starting balance). It is a measure of what has happened or what a sequence of losses would produce.</p>
                <p>Risk of ruin estimates the probability of reaching a specified loss threshold over a number of trades. It is a forward-looking probability estimate under the model assumptions.</p>
                <p>They are related but distinct concepts. A strategy can have a high risk of ruin (probability of hitting a threshold) even if its current drawdown is small — because the probability is about what might happen over many future trades.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PROBABILITY OF CONSECUTIVE LOSSES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Probability of Consecutive </span>
                <span className="text-trading-gold text-glow-gold">Losing Trades</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>What is the probability of 5 losses in a row? The answer depends on two things: your loss probability and the number of trades you will make.</p>
                <p>At a 50% win rate, the probability of five specific consecutive trades all being losses is 0.5^5 = 3.125%. But the probability of seeing at least one five-loss streak somewhere across 100 trades is much higher — because there are many overlapping opportunities for a streak to occur.</p>
                <p>The Losing Streak mode uses dynamic programming to compute the exact probability under the independent Bernoulli model. It does not use the naive formula 1 − (1 − q^k)^N, which is an approximation that overstates the probability for small N.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">This probability is exact only under the independent-trades assumption. Real trades can be correlated — market regime changes may produce more clustered losses than the model assumes.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* DRAWDOWN FROM CONSECUTIVE LOSSES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Much Drawdown Do Consecutive Losses </span>
                <span className="text-trading-gold text-glow-gold">Cause?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>At fixed-fractional risk, repeated losses compound. Each loss reduces equity by the risk percentage multiplied by the average loss in R.</p>
                <p>Example with 1% risk and 1R average loss: 10 losses leave 0.99^10 ≈ 90.44% of starting capital — a 9.56% drawdown.</p>
                <p>Example with 2% risk: 0.98^10 ≈ 81.71% — a drawdown of about 18.29%.</p>
                <p>The Drawdown &amp; Recovery mode shows this step by step and also calculates how many consecutive losses are needed to reach a target drawdown.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RECOVERY ASYMMETRY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Drawdown Recovery Is </span>
                <span className="text-trading-gold text-glow-gold">Asymmetric</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Recovery gain = drawdown / (1 − drawdown). This means recovery grows faster than the drawdown itself.</p>
                <p>A 10% loss needs an 11.11% gain. A 30% loss needs a 42.86% gain. A 50% loss needs a 100% gain — you must double what remains.</p>
                <div className="glass rounded-xl p-4 overflow-x-auto">
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
                <p className="text-xs text-muted-foreground/70">This is deterministic percentage mathematics — not a simulation.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* RISK PER TRADE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Risk Per Trade Changes </span>
                <span className="text-trading-gold text-glow-gold">Account Drawdown</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>At fixed-fractional risk, each loss reduces equity by a percentage of current equity. The same number of consecutive losses produces a larger drawdown at higher risk per trade.</p>
                <p>With 1% risk, 10 consecutive 1R losses leave about 90.44% of starting capital. With 2% risk, the same 10 losses leave about 81.71%. With 5% risk, they leave about 59.87% — a 40.13% drawdown.</p>
                <p>The Risk Comparison mode shows this relationship across multiple risk levels side by side. It does not recommend any risk level — it demonstrates the mathematical differences.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* WIN RATE ALONE NOT ENOUGH */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Win Rate Alone Is </span>
                <span className="text-trading-gold text-glow-gold">Not Enough</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>A high win rate does not guarantee low risk of ruin. A strategy that wins 70% of the time but has an average win of 0.5R and an average loss of 2R has a negative expectancy — 0.7 × 0.5 − 0.3 × 2 = −0.25R per trade.</p>
                <p>Conversely, a strategy that wins only 35% of the time but has an average win of 3R and an average loss of 1R has a positive expectancy — 0.35 × 3 − 0.65 × 1 = +0.4R per trade.</p>
                <p>Expectancy (which combines win rate with reward-to-risk) is more informative than win rate alone. The calculator displays the expectancy and break-even win rate from your entered assumptions.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ROR VS RISK REWARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Risk of Ruin vs Risk Reward and </span>
                <span className="text-trading-gold text-glow-gold">Expectancy</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Risk of ruin, risk reward and expectancy answer different questions:</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><Activity className="w-5 h-5 text-trading-gold shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk of Ruin</strong> (this page): "What is the estimated probability of hitting a loss threshold over N trades?"</span></li>
                  <li className="flex items-start gap-2"><TrendingDown className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk Reward</strong> — <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>: "How does the target distance compare with the stop distance on a single trade?"</span></li>
                  <li className="flex items-start gap-2"><BookOpen className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Lot Size</strong> — <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>: "What position size corresponds to my chosen account risk?"</span></li>
                  <li className="flex items-start gap-2"><Activity className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Consistency</strong> — <Link href="/tools/prop-firm-consistency-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Prop Firm Consistency Calculator</Link>: "Is my best-day profit concentration within a threshold?"</span></li>
                  <li className="flex items-start gap-2"><TrendingDown className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Profit</strong> — <Link href="/tools/xauusd-profit-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Profit Calculator</Link>: "What P&amp;L results from this entry, exit and size?"</span></li>
                </ul>
                <p>For the broader risk-management framework, see our{" "}
                  <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>
                  . For collateral requirements, the{" "}
                  <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Margin Calculator</Link>
                  . For pip/increment value, the{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Pip Value Calculator</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ASSUMPTIONS AND LIMITATIONS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Assumptions and </span>
                <span className="text-trading-gold text-glow-gold">Limitations</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Independent trades:</strong> The exact streak probability and Monte Carlo simulator assume independent trade outcomes. Real trades can be correlated — market regime changes can produce more clustered wins and losses than the model assumes.</p>
                <p><strong className="text-foreground/90">Constant statistics:</strong> The model assumes constant win rate, average win and average loss. Real strategy performance changes over time.</p>
                <p><strong className="text-foreground/90">No costs:</strong> The model works in R multiples and does not separately model spread, commission, swap or slippage. Historical win rate and average R values are most useful when calculated from net completed trades.</p>
                <p><strong className="text-foreground/90">Binary outcomes:</strong> Each trade is modeled as a win or loss at the average R values. Real trades have a distribution of outcomes, not a binary one.</p>
                <p><strong className="text-foreground/90">Finite horizon:</strong> The simulation runs over a fixed number of trades. It does not model an infinite-horizon risk of ruin.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">The result is a model estimate, not a forecast. It describes what would happen under the stated assumptions — it does not predict actual future trades.</p>
              </div>
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
                <p>The simulation assumes independent trades with constant statistics. Real trading results can cluster, change over time and include costs or execution differences. The result is a model estimate, not a forecast.</p>
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
