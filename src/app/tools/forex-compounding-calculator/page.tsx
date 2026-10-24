import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, ArrowRight, MessageCircle, TrendingUp, TrendingDown,
  BarChart3, BookOpen, Info, XCircle,
} from "lucide-react";
import {
  FadeSection, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { ForexCompoundingCalculator } from "@/components/tools/forex-compounding-calculator";

export const metadata: Metadata = {
  title: "Forex Compounding Calculator — Free Trading Growth Tool",
  description:
    "Free forex compounding calculator to model trading account growth, deposits, withdrawals and losing periods. View charts and export results.",
  alternates: { canonical: "https://forexwizard.online/tools/forex-compounding-calculator/" },
  openGraph: {
    title: "Forex Compounding Calculator — Free Trading Growth Tool",
    description:
      "Free forex compounding calculator to model trading account growth, deposits, withdrawals and losing periods. View charts and export results.",
    type: "website",
    url: "https://forexwizard.online/tools/forex-compounding-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-forex-compounding-calculator.jpg", width: 1200, height: 630, alt: "Forex Compounding Calculator showing account growth projections with charts and per-period breakdown" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Compounding Calculator — Free Trading Growth Tool",
    description:
      "Free forex compounding calculator to model trading account growth, deposits, withdrawals and losing periods. View charts and export results.",
    images: ["/og-forex-compounding-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard Forex Compounding Calculator",
  description:
    "Free forex compounding calculator for modeling trading account growth with standard compounding, variable returns, and win/loss simulation modes.",
  url: "https://forexwizard.online/tools/forex-compounding-calculator/",
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
    { "@type": "ListItem", position: 3, name: "Forex Compounding Calculator", item: "https://forexwizard.online/tools/forex-compounding-calculator/" },
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

const formulaItems = [
  { label: "Compound Growth (per period)", formula: "Balance × (1 + r)^n", note: "r = return per period as decimal, n = number of periods" },
  { label: "Period Return Amount", formula: "Balance × (r / 100)", note: "Applied after deposits and withdrawals" },
  { label: "Simple Growth (non-compounded)", formula: "Initial + Σ(Initial × r_i)", note: "Returns based on initial balance, not current balance" },
  { label: "Drawdown", formula: "(Peak − Current) / Peak × 100", note: "Measured from the highest modeled balance" },
  { label: "Recovery Gain", formula: "Drawdown / (1 − Drawdown)", note: "Gain needed to return to the pre-drawdown peak" },
];

const commonMistakes = [
  { title: "Assuming guaranteed daily returns", desc: "Daily compounding refers to one modeled trading period. Real trading has losing days, weeks and months. The calculator includes negative returns for exactly this reason." },
  { title: "Ignoring losing periods", desc: "A 10% gain followed by a 10% loss leaves you with 99% of your starting balance — not 100%. Losing periods compound too, and the calculator shows this effect." },
  { title: "Overleveraging", desc: "Higher returns per period can produce dramatic projections, but they also increase the impact of losing periods. A single large loss can wipe out months of compounding." },
  { title: "Ignoring spreads and fees", desc: "Commission, spread and swap reduce net returns. The calculator includes fixed and percentage fees so you can see their compounding impact." },
  { title: "Counting deposits as trading profit", desc: "Deposits increase your balance but are not trading performance. The calculator separates contributed capital from net trading gain/loss." },
  { title: "Unrealistic return assumptions", desc: "Modeling 5% per period over 100 periods produces exponential growth that is not representative of real trading. Use conservative assumptions and include losing periods." },
  { title: "Assuming past results predict future performance", desc: "The calculator models hypothetical scenarios. Historical win rates and average returns do not guarantee future outcomes." },
];

const faqs = [
  { q: "What is a forex compounding calculator?", a: "A forex compounding calculator models how a trading account grows (or shrinks) over multiple periods when returns are reinvested. It shows the difference between compounded growth (where each period's return applies to the current balance) and simple growth (where returns apply to the initial balance only). This calculator supports deposits, withdrawals, fees, variable returns and win/loss simulation." },
  { q: "How does forex compounding work?", a: "Compounding means each period's return is applied to the current account balance, not just the initial deposit. If you start with $1,000 and earn 2% per period, after period 1 you have $1,020. Period 2's 2% applies to $1,020 (not $1,000), giving $1,040.40. Over many periods, this creates exponential growth — but the same effect works in reverse during losing periods." },
  { q: "What is the difference between daily, weekly and monthly compounding?", a: "The frequency determines what one 'period' means. If you select daily compounding with 2% per period, that means 2% per modeled trading day. If you select monthly, 2% means 2% per modeled trading month. The assumed rate must correspond to the selected period — 2% daily is very different from 2% monthly. Do not assume they are equivalent." },
  { q: "Why does a 10% gain followed by a 10% loss not return to the starting balance?", a: "Because the loss applies to the larger post-gain balance. Starting with $1,000: a 10% gain gives $1,100. A 10% loss on $1,100 is $110, leaving $990 — not $1,000. This asymmetry is why losing periods matter more than they appear. The calculator shows this effect in the per-period table." },
  { q: "How do deposits and withdrawals affect compounding?", a: "Deposits increase the balance that future returns compound on, but they are not trading profit. The calculator separates total contributed capital (initial balance + deposits) from net gain/loss (which is trading performance only). Withdrawals reduce the compounding base and cannot exceed the available balance." },
  { q: "What is the difference between compounded and simple growth?", a: "Compounded growth applies each period's return to the current balance. Simple growth applies each return to the initial balance only. Over time, compounding produces a higher balance than simple growth when returns are positive — but also deeper losses when returns are negative. The calculator shows both side by side." },
  { q: "Can I model losing periods?", a: "Yes. In Standard mode, enter a negative return per period. In Variable mode, enter a mix of positive and negative returns. In Win/Loss mode, the simulator generates winning and losing periods based on your win rate and average win/loss returns." },
  { q: "Does this calculator predict my future trading results?", a: "No. The calculator models hypothetical scenarios based on assumptions you enter. Real trading results vary, include costs and execution differences, and do not follow a fixed win rate or average return. The results are educational projections, not predictions." },
];

export default function ForexCompoundingCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

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
              <span className="text-foreground/80">Forex Compounding Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Forex </span>
              <span className="text-trading-gold text-glow-gold">Compounding Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Model how your trading account grows over multiple periods with compounding returns, deposits, withdrawals, fees and losing periods. Compare compounded vs simple growth, view interactive charts and export results to CSV.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              This calculator performs hypothetical compounding mathematics only. It does not predict future trades or guarantee any rate of return.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <ForexCompoundingCalculator />
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the Forex </span>
              <span className="text-trading-gold text-glow-gold">Compounding Calculator</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground/90">Mode 1 — Standard Compounding:</strong> Enter your initial balance, a constant return per period (e.g. 2%), the number of periods and the compounding frequency. The calculator applies the return to the current balance each period.</p>
              <p><strong className="text-foreground/90">Mode 2 — Variable Returns:</strong> Enter an individual percentage return for each period (comma or line separated). Positive, negative and zero values are supported. This lets you model realistic sequences with winning and losing periods.</p>
              <p><strong className="text-foreground/90">Mode 3 — Win/Loss Simulation:</strong> Enter your win rate, average winning-period return, average losing-period return and a seed. The calculator uses a seeded PRNG to simulate which periods are wins and which are losses. Same seed = same result.</p>
              <p>In all modes, you can add recurring deposits, recurring withdrawals, a fixed fee per period and a percentage fee. The calculation order is: opening balance → deposit → withdrawal → period return → fixed fee → percentage fee → closing balance.</p>
            </div>
          </div>
        </FadeSection>

        {/* FORMULA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Does Forex </span>
                <span className="text-trading-gold text-glow-gold">Compounding Work?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formulaItems.map((f) => (
                  <div key={f.label} className="glass rounded-xl p-4">
                    <p className="text-sm font-bold text-foreground mb-1">{f.label}</p>
                    <p className="text-sm text-trading-green font-mono mb-1">{f.formula}</p>
                    <p className="text-xs text-muted-foreground/80">{f.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Example: $1,000 at 2% per period for 12 periods = $1,000 × (1.02)^12 ≈ $1,268.24. This is compounded growth. Simple growth would be $1,000 + (12 × $1,000 × 0.02) = $1,240.00 — the difference grows over time.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* DAILY vs WEEKLY vs MONTHLY */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Daily vs Weekly vs Monthly </span>
                <span className="text-trading-gold text-glow-gold">Compounding</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The compounding frequency determines what one "period" means in the calculator. If you select daily with 2% per period, that means 2% per modeled trading day. If you select monthly, 2% means 2% per modeled trading month.</p>
                <p>Do not assume that 2% daily is equivalent to 2% monthly — they are very different. 2% daily over 20 periods produces $1,000 × (1.02)^20 ≈ $1,486. 2% monthly over 20 periods produces the same result, but the real-world time elapsed is very different.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">The assumed rate must correspond to the selected period. A realistic monthly return of 2% is very different from a realistic daily return of 2%.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMPOUNDING VS SIMPLE RETURNS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Compounding vs </span>
                <span className="text-trading-gold text-glow-gold">Simple Returns</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Compounded growth applies each period's return to the current balance. Simple growth applies each return to the initial balance only. Over time, compounding produces a higher balance when returns are positive — but it also produces deeper losses when returns are negative.</p>
                <p>Example: $1,000 at 5% per period for 10 periods. Compounded: $1,000 × (1.05)^10 ≈ $1,628.89. Simple: $1,000 + (10 × $1,000 × 0.05) = $1,500.00. The difference ($128.89) is the compounding effect.</p>
                <p>The calculator shows both side by side in the chart and the summary metrics.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LOSING PERIODS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-red/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why Losing Periods </span>
                <span className="text-trading-gold text-glow-gold">Matter</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>A 10% gain followed by a 10% loss does not return you to your starting balance. Starting with $1,000: a 10% gain gives $1,100. A 10% loss on $1,100 is $110, leaving $990 — not $1,000.</p>
                <p>This asymmetry means losing periods have a larger impact than they appear. A 50% drawdown requires a 100% gain to recover. The calculator tracks the maximum drawdown and the recovery gain required.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* DEPOSITS & WITHDRAWALS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Deposits and Withdrawals Affect </span>
                <span className="text-trading-gold text-glow-gold">Growth</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Deposits increase the balance that future returns compound on, but they are not trading profit. The calculator separates total contributed capital (initial balance + deposits) from net gain/loss (which is trading performance only).</p>
                <p>Withdrawals reduce the compounding base and cannot exceed the available balance. If a withdrawal would exceed the balance, it is capped at the available amount.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">Do not label growth caused by deposits as trading profit. The net gain/loss metric excludes deposits and withdrawals so you can see pure trading performance.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Forex Compounding </span>
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

        {/* RELATED TOOLS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Related Forex Wizard </span>
                <span className="text-trading-gold text-glow-gold">Tools</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><BarChart3 className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Lot Size</strong> — <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>: "What position size corresponds to my chosen account risk?"</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk Reward</strong> — <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>: "How does the target distance compare with the stop distance?"</span></li>
                  <li className="flex items-start gap-2"><TrendingDown className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk of Ruin</strong> — <Link href="/tools/risk-of-ruin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk of Ruin Calculator</Link>: "What is the probability of hitting a loss threshold over many trades?"</span></li>
                  <li className="flex items-start gap-2"><BookOpen className="w-5 h-5 text-trading-gold shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk Management</strong> — <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">Forex Risk Management Guide</Link>: Broader account risk framework.</span></li>
                </ul>
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
                <p>The compounding projections are hypothetical models based on assumptions you enter. Real trading results vary, include costs and execution differences, and do not follow a fixed return rate. Past results do not predict future performance.</p>
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
