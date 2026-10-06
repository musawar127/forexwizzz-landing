import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, ArrowRight, MessageCircle, Calendar, TrendingUp,
  Scale, BookOpen, Info, CheckCircle2, XCircle, Wrench,
} from "lucide-react";
import {
  FadeSection, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { PropFirmConsistencyCalculator } from "@/components/tools/prop-firm-consistency-calculator";
import { MIN_EVEN_DAYS_TABLE } from "@/lib/prop-firm-consistency-calc";

export const metadata: Metadata = {
  title: "Prop Firm Consistency Rule Calculator | Forex Wizard",
  description:
    "Calculate your prop firm consistency percentage, best-day limit and extra profit needed for 30%, 40%, 50% or custom payout rules.",
  alternates: { canonical: "https://forexwizard.online/tools/prop-firm-consistency-calculator/" },
  openGraph: {
    title: "Prop Firm Consistency Rule Calculator | Forex Wizard",
    description:
      "Check best-day consistency, extra profit required, payout-rule thresholds and daily P&L using a custom prop firm consistency rule.",
    type: "website",
    url: "https://forexwizard.online/tools/prop-firm-consistency-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-prop-firm-consistency-calculator.jpg", width: 1200, height: 630, alt: "Prop Firm Consistency Rule Calculator showing best-day percentage, threshold and additional profit needed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prop Firm Consistency Rule Calculator | Forex Wizard",
    description:
      "Check best-day consistency, extra profit required, payout-rule thresholds and daily P&L using a custom prop firm consistency rule.",
    images: ["/og-prop-firm-consistency-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard Prop Firm Consistency Rule Calculator",
  description:
    "Free prop firm consistency calculator for best-day percentage, custom consistency thresholds, additional profit required and daily P&L analysis.",
  url: "https://forexwizard.online/tools/prop-firm-consistency-calculator/",
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
    { "@type": "ListItem", position: 3, name: "Prop Firm Consistency Calculator", item: "https://forexwizard.online/tools/prop-firm-consistency-calculator/" },
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

const formulaItems = [
  { label: "Consistency %", formula: "Best Day ÷ Relevant Profit Base × 100", note: "The profit base depends on your rule: net profit, profitable days, or profit target." },
  { label: "Maximum Allowed Best Day", formula: "Relevant Profit Base × Threshold", note: "The largest single day that stays within the threshold at your current base." },
  { label: "Required Profit Base", formula: "Best Day ÷ Threshold", note: "The total base needed for your current best day to fit the rule." },
  { label: "Additional Profit Needed", formula: "Required Profit Base − Current Profit Base", note: "Only for variable-denominator bases (net profit, profitable days). Not applicable to profit-target rules." },
];

const denominatorExample = [
  { day: "Day 1", result: "+$1,000" },
  { day: "Day 2", result: "−$500" },
  { day: "Day 3", result: "+$700" },
];

const commonMistakes = [
  { title: "Using total account balance instead of profit", desc: "Consistency rules typically measure profit, not your full account balance. Check whether your firm uses total net profit, profitable days, or a profit target." },
  { title: "Using one trade instead of one trading day", desc: "Most consistency rules apply to the best single trading day, not the best single trade. A day with multiple trades is one day for consistency purposes." },
  { title: "Ignoring losing days under a net-profit rule", desc: "Under a net-profit basis, losing days reduce the denominator — which can actually increase your consistency percentage. This is why the denominator matters." },
  { title: "Including losing days in a positive-days-only denominator", desc: "If your firm uses sum of profitable days, losing days do not change the denominator. Do not subtract losses from the positive-day sum." },
  { title: "Assuming every firm uses net profit", desc: "Some firms use sum of profitable days. Some use a fixed profit target. The three can produce very different consistency scores from the same daily results." },
  { title: "Assuming any consistency rule causes account failure", desc: "A consistency breach may affect payout, evaluation, or both — the consequences depend on your firm's full rulebook. This calculator does not confirm payout eligibility." },
  { title: "Confusing evaluation rules with payout rules", desc: "Some firms have different consistency requirements for passing an evaluation versus receiving a payout. Check which stage your rule applies to." },
  { title: "Assuming a fixed profit target dilutes", desc: "If the rule uses a fixed profit target as the denominator, earning more profit does not dilute the ratio. The percentage only changes if the target itself changes." },
  { title: "Not checking whether equality is allowed", desc: "Some rules say 'at or below' the threshold; others say 'strictly below.' A consistency of exactly 40% may pass one rule and fail another." },
  { title: "Mixing payout windows", desc: "If your firm measures consistency over a specific payout period, make sure all your daily results come from that same period. Mixing windows produces misleading numbers." },
];

const faqs = [
  { q: "What is a prop firm consistency rule?", a: "A consistency rule limits how concentrated your profit may be. It typically compares your best single trading day to a profit base — total net profit, sum of profitable days, or a fixed profit target — and requires the ratio to stay at or below a threshold (such as 30%, 40% or 50%). The goal is to show that your gains are spread across multiple days rather than coming from one large day." },
  { q: "How is prop firm consistency calculated?", a: "Consistency percentage = best day ÷ relevant profit base × 100. The profit base depends on your firm's rule: total net profit (includes winning and losing days), sum of profitable days (only positive days), or a fixed profit target. The rule is satisfied when the consistency percentage is at or below the threshold your firm specifies." },
  { q: "What is a 30% consistency rule?", a: "A 30% consistency rule means your best single trading day must account for no more than 30% of the relevant profit base. For example, if your total net profit is $5,000, your best day must be no more than $1,500. The exact denominator depends on your firm's rule definition." },
  { q: "What is a 40% consistency rule?", a: "A 40% consistency rule means your best day must account for no more than 40% of the profit base. For example, with a total net profit of $3,000 and a best day of $1,500, your consistency is 50% — above the 40% threshold. You would need a total of $3,750 (at the same best day) to meet the rule." },
  { q: "What is a 50% consistency rule?", a: "A 50% consistency rule means your best day may account for up to half of the profit base. With a best day of $1,500 and total net profit of $3,000, your consistency is exactly 50% — within the threshold if equality is allowed (at-or-below). If the rule requires strictly below, 50% does not pass." },
  { q: "How much more profit do I need to meet the consistency rule?", a: "For variable-denominator rules (net profit or profitable days), the additional profit needed = (best day ÷ threshold) − current profit base. For example, with a best day of $1,500, a 40% threshold, and $3,000 current net profit, you need $750 more (to reach $3,750). This assumes your best day stays unchanged. For profit-target rules, additional profit does not change the ratio." },
  { q: "What is the best-day rule?", a: "The best-day rule is another name for the consistency rule. It compares your single best trading day to your total profit (or another denominator) and requires the ratio to stay below a threshold. The idea is that a trader who makes most of their money in one day may be relying on luck rather than consistent skill." },
  { q: "Do losing days affect consistency?", a: "It depends on the rule basis. Under a total-net-profit rule, losing days reduce the denominator, which can increase your consistency percentage (making it harder to pass). Under a profitable-days rule, losing days do not change the denominator. Under a profit-target rule, daily losses do not change the denominator directly." },
  { q: "Does one large day fail a prop firm account?", a: "Not necessarily. It depends on whether the large day pushes your consistency percentage above the threshold, and what the consequences of a breach are under your firm's rulebook. Some firms block payout; others require a new evaluation. This calculator tells you the percentage and whether it is within the threshold you entered — it does not predict account outcomes." },
  { q: "Is a consistency rule the same as drawdown?", a: "No. A consistency rule controls how concentrated profit may be. A drawdown rule controls how much loss the account may experience. They are separate concepts and are not interchangeable." },
  { q: "Does every prop firm use the same consistency formula?", a: "No. Different firms can define the denominator differently — total net profit, sum of profitable days, or a fixed profit target. Thresholds also vary (30%, 40%, 50% or custom). Always check your firm's current rulebook. Rules change frequently." },
  { q: "What if my firm uses profit target instead of total profit?", a: "If the rule uses a fixed profit target as the denominator, your consistency percentage = best day ÷ profit target × 100. Earning more profit does not dilute this ratio because the target is fixed. The only way to improve the percentage is to reduce your best day or have the target itself change under your firm's rules." },
  { q: "Can I paste my daily P&L into the calculator?", a: "Yes. In Daily P&L mode, paste your daily results into the text area — one number per line, comma separated, or space separated. The parser handles negative numbers, decimals, and strips common currency symbols. Click Parse & Add to List to populate the individual day rows." },
  { q: "Does this calculator confirm payout eligibility?", a: "No. This calculator performs consistency-rule arithmetic only. It tells you whether your best-day percentage is within the threshold you entered. It does not account for other payout requirements, drawdown rules, minimum trading days, or any other term in your firm's full rulebook. Always verify your firm's current rules." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PropFirmConsistencyCalculatorPage() {
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
              <span className="text-foreground/80">Prop Firm Consistency Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Prop Firm Consistency Rule </span>
              <span className="text-trading-gold text-glow-gold">Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Calculate your best-day consistency percentage, see how much additional profit you need, and plan your remaining trading days. Supports net-profit, profitable-days and profit-target rule bases with custom thresholds.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              This calculator performs consistency-rule arithmetic only. It does not confirm payout eligibility or predict account outcomes. Always verify your firm&apos;s current rules.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <PropFirmConsistencyCalculator />
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the Prop Firm </span>
              <span className="text-trading-gold text-glow-gold">Consistency Calculator</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground/90">Mode 1 — Quick Check:</strong> Enter your best single-day profit, your consistency threshold, and the profit base your firm uses (total net profit, sum of profitable days, or profit target). The calculator shows your consistency percentage, whether you are within the threshold, the maximum allowed best day, the required profit base, and the additional profit needed.</p>
              <p><strong className="text-foreground/90">Mode 2 — Daily P&L:</strong> Enter or paste your daily trading results. The calculator summarizes your trading days, winning/losing days, total net profit, sum of profitable days, best winning day, and worst day — then applies the selected rule basis automatically.</p>
              <p><strong className="text-foreground/90">Mode 3 — Repair / Planning:</strong> Shows the current status plus planning outputs: the maximum separate positive day you can take without breaching the rule, and (if you enter a planned profit per future day) the minimum number of future days needed to satisfy the rule. The solver re-evaluates the best day if your planned day exceeds the current best.</p>
            </div>
          </div>
        </FadeSection>

        {/* WHAT IS A CONSISTENCY RULE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Is a Prop Firm </span>
                <span className="text-trading-gold text-glow-gold">Consistency Rule?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>A consistency rule limits how concentrated your profit may be. It compares your best single trading day to a profit base and requires the ratio to stay at or below a threshold — typically 30%, 40% or 50%.</p>
                <p>The goal is to demonstrate that your gains are spread across multiple days rather than coming from one large day. A trader who makes $5,000 in one day and nothing else may be relying on luck; a trader who makes $500 over ten days shows more consistent performance.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">This calculator does not confirm payout eligibility. Other requirements — drawdown limits, minimum trading days, profit targets — may also apply. Always verify your firm&apos;s current rulebook.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FORMULA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How the Consistency Percentage Is </span>
                <span className="text-trading-gold text-glow-gold">Calculated</span>
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
            </div>
          </div>
        </FadeSection>

        {/* WHY THE DENOMINATOR MATTERS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Why the </span>
                <span className="text-trading-gold text-glow-gold">Denominator Matters</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Different firms can define the denominator differently — and the same daily results can produce very different consistency scores depending on which basis you use.</p>
                <div className="glass rounded-xl p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-muted-foreground">
                        <th className="text-left p-2 font-bold">Day</th>
                        <th className="text-left p-2 font-bold">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {denominatorExample.map((d) => (
                        <tr key={d.day} className="border-b border-white/5 last:border-0">
                          <td className="p-2 text-muted-foreground">{d.day}</td>
                          <td className={`p-2 font-bold ${d.result.startsWith("+") ? "text-trading-green" : "text-trading-red"}`}>{d.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>From this data: Best Day = $1,000, Net Profit = $1,200, Positive-Day Sum = $1,700.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Net Profit basis</p>
                    <p className="text-lg font-bold text-trading-gold">83.33%</p>
                    <p className="text-xs text-muted-foreground/70">1000 ÷ 1200</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Profitable Days basis</p>
                    <p className="text-lg font-bold text-trading-gold">58.82%</p>
                    <p className="text-xs text-muted-foreground/70">1000 ÷ 1700</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Profit Target basis ($2,000)</p>
                    <p className="text-lg font-bold text-trading-gold">50.00%</p>
                    <p className="text-xs text-muted-foreground/70">1000 ÷ 2000</p>
                  </div>
                </div>
                <p>This is why you must match your rulebook. Using the wrong denominator gives a misleading percentage.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 30/40/50 EXAMPLES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">30%, 40% and 50% Consistency Rule </span>
              <span className="text-trading-gold text-glow-gold">Examples</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <p className="text-xs text-muted-foreground mb-1">30% Rule</p>
                <p className="text-sm text-muted-foreground">Best Day $1,500, Net Profit $4,000</p>
                <p className="text-2xl font-bold text-trading-gold mt-2">37.5%</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Required total: $5,000 · Additional: $1,000</p>
              </div>
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <p className="text-xs text-muted-foreground mb-1">40% Rule</p>
                <p className="text-sm text-muted-foreground">Best Day $1,500, Net Profit $3,000</p>
                <p className="text-2xl font-bold text-trading-gold mt-2">50%</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Required total: $3,750 · Additional: $750</p>
              </div>
              <div className="glass-strong rounded-2xl p-5 gradient-border">
                <p className="text-xs text-muted-foreground mb-1">50% Rule</p>
                <p className="text-sm text-muted-foreground">Best Day $1,500, Net Profit $3,000</p>
                <p className="text-2xl font-bold text-trading-green mt-2">50%</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Within threshold (at-or-below)</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3">Illustrative only — not a live prop-firm rule. The exact amount changes with your profit base and your firm&apos;s current terms.</p>
          </div>
        </FadeSection>

        {/* HOW MUCH MORE PROFIT */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Much More Profit Do You </span>
                <span className="text-trading-gold text-glow-gold">Need?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>For variable-denominator rules (net profit or profitable days), the additional profit needed is: required profit base minus current profit base. The required base is best day ÷ threshold.</p>
                <p>For example, with a best day of $1,500 and a 40% threshold, the required base is $3,750. If your current net profit is $3,000, you need $750 more — assuming your best day stays unchanged.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">This calculation assumes your existing best day does not change. If a future day exceeds your current best, the math changes — use the Repair mode solver for that scenario.</p>
                <p>For profit-target rules, additional profit does not change the ratio because the target is fixed. The calculator displays this distinction.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LOSING DAYS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Losing Days Affect </span>
                <span className="text-trading-gold text-glow-gold">Consistency</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Under a net-profit rule:</strong> Losing days reduce the denominator. A smaller denominator means a higher consistency percentage — which can make it harder to pass. This is counterintuitive: losing days can worsen your consistency score.</p>
                <p><strong className="text-foreground/90">Under a profitable-days rule:</strong> Losing days do not change the denominator (only positive days are summed). Your consistency percentage is unaffected by losing days.</p>
                <p><strong className="text-foreground/90">Under a profit-target rule:</strong> Daily losses do not change the denominator directly because the target is fixed.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BEST-DAY VS PROFIT TARGET */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Best-Day Rule vs </span>
                <span className="text-trading-gold text-glow-gold">Profit Target</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The key difference: under a net-profit or profitable-days rule, earning more profit dilutes the ratio (the denominator grows). Under a profit-target rule, the denominator is fixed — earning more profit does not change your consistency percentage.</p>
                <p>This means the Repair mode&apos;s additional-profit calculation only applies to variable-denominator bases. For profit-target rules, the calculator displays a note explaining that additional profit does not change the percentage unless the target itself changes.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CONSISTENCY VS DRAWDOWN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Consistency Rules vs </span>
                <span className="text-trading-gold text-glow-gold">Drawdown Rules</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>A consistency rule controls how concentrated profit may be. A drawdown rule controls how much loss the account may experience. They are not interchangeable.</p>
                <p>You can pass a consistency rule and still fail a drawdown rule, or vice versa. Both may apply simultaneously. A dedicated drawdown calculator may be available separately in the future.</p>
                <p>For broader account risk management, see our{" "}
                  <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>
                  . For position sizing, use the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>
                  , for trade payoff geometry, the{" "}
                  <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>
                  , and for collateral requirements, the{" "}
                  <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Margin Calculator</Link>
                  . To time your entries around the most liquid sessions, use the{" "}
                  <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Forex Market Hours Clock</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Consistency Rule </span>
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
                <p>Prop firm rules change frequently. This calculator does not confirm payout eligibility, account pass/fail status, or any specific firm outcome. Always verify your firm&apos;s current rulebook before making trading decisions.</p>
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
