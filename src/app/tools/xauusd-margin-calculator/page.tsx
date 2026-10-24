import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, ArrowRight, MessageCircle, Coins, Gauge,
  Scale, BookOpen, Info, Layers, TrendingUp, CheckCircle2,
  XCircle, Target,
} from "lucide-react";
import {
  FadeSection, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { XauusdMarginCalculator } from "@/components/tools/xauusd-margin-calculator";
import { ILLUSTRATIVE_TABLE, LEVERAGE_PRESETS } from "@/lib/xauusd-margin-calc";

export const metadata: Metadata = {
  title: "XAUUSD Margin Calculator & Gold Leverage | Forex Wizard",
  description:
    "Calculate XAUUSD margin by lot size, gold price and leverage. See required margin, notional exposure, free margin and margin level for gold trades.",
  alternates: { canonical: "https://forexwizard.online/tools/xauusd-margin-calculator/" },
  openGraph: {
    title: "XAUUSD Margin Calculator & Gold Leverage | Forex Wizard",
    description:
      "Calculate required XAUUSD margin from gold price, lot size, contract size and leverage. Compare leverage levels and estimate free margin and margin level.",
    type: "website",
    url: "https://forexwizard.online/tools/xauusd-margin-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-xauusd-margin-calculator.jpg", width: 1200, height: 630, alt: "XAUUSD Margin Calculator showing required gold margin, notional exposure and leverage comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Margin Calculator & Gold Leverage | Forex Wizard",
    description:
      "Calculate required XAUUSD margin from gold price, lot size, contract size and leverage. Compare leverage levels and estimate free margin and margin level.",
    images: ["/og-xauusd-margin-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard XAUUSD Margin & Gold Leverage Calculator",
  description:
    "Free XAUUSD margin calculator for estimating gold margin from price, lot size, contract size and leverage, with free margin and margin-level calculations.",
  url: "https://forexwizard.online/tools/xauusd-margin-calculator/",
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Margin Calculator", item: "https://forexwizard.online/tools/xauusd-margin-calculator/" },
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
  { label: "Exposure Ounces", formula: "Lots × Contract Size", note: "Total troy ounces controlled." },
  { label: "Notional USD", formula: "Gold Price × Contract Size × Lots", note: "Total position value in USD." },
  { label: "Required Margin (Leverage)", formula: "Notional ÷ Leverage", note: "e.g. 1:100 → notional ÷ 100." },
  { label: "Required Margin (Rate)", formula: "Notional × Margin Rate %", note: "e.g. 0.5% → notional × 0.005." },
  { label: "Free Margin After", formula: "Equity − Existing Used Margin − New Required Margin", note: "Available collateral after planned position." },
  { label: "Margin Level", formula: "Equity ÷ Total Used Margin × 100", note: "Account health ratio (not a liquidation predictor)." },
];

const brokerDifferences = [
  { title: "Symbol-specific leverage", desc: "Gold may carry different leverage than the account's headline forex leverage. Check the XAUUSD symbol specification." },
  { title: "Different contract size", desc: "Some brokers use 100 oz per lot; others use 10 oz, 1 oz, or other values. The calculator's contract size field is editable for this reason." },
  { title: "Dynamic / tiered margin", desc: "Some brokers reduce leverage (raise margin) for larger notional positions or at certain times. This calculator uses a single flat rate." },
  { title: "Weekend and news margin", desc: "Brokers may increase margin requirements over weekends or around high-impact news. These rules are not modeled here." },
  { title: "Hedged positions", desc: "Hedged (long + short on same symbol) positions may have special margin rules that differ from the simple model used here." },
  { title: "Account currency conversion", desc: "If your account is not USD-denominated, the conversion rate you enter affects the result. Real rates fluctuate; this tool does not fetch live rates." },
];

const commonMistakes = [
  { title: "Confusing margin capacity with risk-based sizing", desc: "Margin answers how much collateral a position needs. It does not tell you how large a trade should be for your risk tolerance. Use the Lot Size Calculator for risk-based sizing." },
  { title: "Assuming higher leverage reduces risk", desc: "Higher leverage reduces the collateral required for the same position. It does not change the market loss if the stop is hit. Higher leverage can let you open larger exposure with less collateral — which can increase risk." },
  { title: "Treating margin level as a liquidation predictor", desc: "Margin level is a ratio, not a guarantee. Broker margin-call levels, stop-out levels and floating P/L treatment vary. No universal 'safe' margin level exists." },
  { title: "Assuming 100 oz is always one lot", desc: "100 troy ounces is common but not universal. Always check your broker's contract size for the gold symbol." },
  { title: "Using account leverage for gold", desc: "Many accounts advertise a headline forex leverage that does not apply to metals. Use the effective XAUUSD leverage shown in your symbol specification." },
];

const faqs = [
  { q: "What is an XAUUSD margin calculator?", a: "It estimates the collateral required to hold a gold (XAUUSD) position based on gold price, lot size, contract size and effective leverage. It also shows notional exposure and, optionally, free margin and margin level. Results are estimates — your broker's symbol specification is authoritative." },
  { q: "How is XAUUSD margin calculated?", a: "Under the leverage method: required margin = (gold price × contract size × lots) ÷ leverage. Under the margin-rate method: required margin = notional × margin rate %. The two are mathematically equivalent when margin rate % = 100 ÷ leverage." },
  { q: "How much margin is required for 0.01 lot of gold?", a: "It depends on gold price, contract size and leverage. Using an illustrative gold price of $4,000 and a 100-ounce contract: at 1:100 leverage the margin is $40; at 1:500 it is $8; at 1:1000 it is $4. The exact amount changes with the live gold price and your broker's specifications." },
  { q: "How much margin is required for 1 lot of XAUUSD?", a: "Using the same illustrative $4,000 price and 100 oz contract, the notional is $400,000. At 1:100 leverage the margin is $4,000; at 1:500 it is $800. These are illustrative figures — check your broker's symbol specification for the actual requirement." },
  { q: "What is the margin for XAUUSD at 1:100 leverage?", a: "At 1:100, the margin rate is 1%, so the required margin is 1% of the notional exposure. For a $4,000 notional (0.01 lot at $4,000/oz with 100 oz contract), the margin is $40." },
  { q: "What is the margin for XAUUSD at 1:500 leverage?", a: "At 1:500, the margin rate is 0.2%, so the required margin is 0.2% of the notional. For a $4,000 notional, the margin is $8 — one-fifth of the 1:100 requirement." },
  { q: "Does higher leverage reduce the risk of a gold trade?", a: "No. Higher leverage reduces the collateral required for the same position, but it does not change the market exposure or the loss if the stop is hit. Higher leverage can make it possible to open larger exposure with less collateral, and that behavior can increase risk — but it does not directly reduce the loss of an unchanged position." },
  { q: "Does leverage change XAUUSD pip value?", a: "No. Pip value depends on lot size, contract size and the pip/increment convention — not on leverage. Leverage only affects how much margin is required to open the position." },
  { q: "What contract size should I use for gold?", a: "100 troy ounces per 1.00 lot is common, but not universal. Check your broker's XAUUSD symbol specification (in MT4/MT5: right-click the symbol → Specification). The calculator's contract size field is editable so you can match your broker." },
  { q: "Is 100 ounces always one XAUUSD lot?", a: "No. 100 oz is the most common contract size for standard gold lots, but some brokers use 10 oz, 1 oz, or other values. Always verify in your platform's symbol specification." },
  { q: "Why does my broker show a different gold margin?", a: "Common reasons include symbol-specific leverage that differs from account leverage, a different contract size, dynamic or tiered margin, weekend or news margin rules, hedged-position rules, account-currency conversion, and broker rounding. Check your broker's XAUUSD specification for the exact requirement." },
  { q: "What is free margin?", a: "Free margin is the equity in your account that is not currently locked as used margin — the collateral available to open new positions or absorb floating losses. It equals equity minus used margin." },
  { q: "What is margin level?", a: "Margin level is equity divided by used margin, expressed as a percentage. It is an account-health ratio. A margin level percentage does not by itself predict liquidation — broker margin-call levels, stop-out levels and floating P/L treatment vary." },
  { q: "Can margin level predict liquidation?", a: "No. Margin level is a ratio, not a liquidation trigger. Brokers set their own margin-call and stop-out levels, and treat floating P/L differently. No universal 'safe' margin level exists." },
  { q: "What is the difference between margin and lot size?", a: "Margin answers 'how much collateral is required?' Lot sizing answers 'how large should my trade be for a chosen risk amount and stop?' Margin is about collateral capacity; lot sizing is about risk-based position sizing. They are different questions with different answers." },
  { q: "Can I calculate the maximum lot size from available margin?", a: "Yes — the Max Lots From Margin mode does this. It calculates how much volume a given margin amount can mathematically support under your broker assumptions, rounded down to your lot step. This is a collateral calculation, not a risk-management position size." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function XauusdMarginCalculatorPage() {
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
              <span className="text-foreground/80">XAUUSD Margin Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Margin Calculator &amp; </span>
              <span className="text-trading-gold text-glow-gold">Gold Leverage Tool</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Calculate the estimated margin required for an XAUUSD position using gold price, lot size, contract size and effective leverage. Compare leverage levels, estimate notional exposure, and optionally calculate free margin and margin level using your own account figures.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              Broker XAUUSD specifications vary. Use the effective leverage, contract size or margin rate shown for your broker&apos;s gold symbol. Example values on this page are illustrative and are not live market data.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <XauusdMarginCalculator />
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the XAUUSD </span>
              <span className="text-trading-gold text-glow-gold">Margin Calculator</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground/90">Mode 1 — Required Margin:</strong> Enter gold price, lots, contract size and effective XAUUSD leverage. The calculator shows the margin required, notional exposure, and margin per 0.01 / 0.10 / 1.00 lot. Optionally expand the advanced section to enter account equity and existing used margin for free-margin and margin-level figures.</p>
              <p><strong className="text-foreground/90">Mode 2 — Max Lots From Margin:</strong> Enter the margin you have available to allocate. The calculator returns the raw mathematical lots, the broker-step lots (rounded down), the margin used at the rounded size, and any unused allocation. This is a collateral calculation, not a risk-based position size.</p>
              <p><strong className="text-foreground/90">Mode 3 — Leverage Comparison:</strong> Enter gold price, lots and contract size. The calculator generates a table showing the required margin at 1:20, 1:30, 1:50, 1:100, 1:200, 1:500 and 1:1000 leverage. Notional exposure stays identical across all rows — only the required collateral changes.</p>
            </div>
          </div>
        </FadeSection>

        {/* FORMULA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Margin </span>
                <span className="text-trading-gold text-glow-gold">Formula</span>
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
                Example: 0.01 lot × 100 oz × $4,000 = $4,000 notional. At 1:100 leverage, required margin = $4,000 ÷ 100 = $40 (margin rate 1%). At 1:500, required margin = $8 (margin rate 0.2%).
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 0.01 LOT SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Much Margin Is Required for 0.01 Lot of </span>
                <span className="text-trading-gold text-glow-gold">Gold?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The answer depends on four things: the gold price, the contract size, the effective gold leverage, and your account currency. There is no single universal dollar figure.</p>
                <p>Using an illustrative gold price of $4,000 and a 100-ounce contract (1 oz exposure for 0.01 lot, $4,000 notional):</p>
                <div className="glass rounded-xl p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-muted-foreground">
                        <th className="text-left p-2 font-bold">Leverage</th>
                        <th className="text-left p-2 font-bold">Margin Rate</th>
                        <th className="text-left p-2 font-bold">Required Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LEVERAGE_PRESETS.map((l) => (
                        <tr key={l} className="border-b border-white/5 last:border-0">
                          <td className="p-2 text-trading-gold font-bold">1:{l}</td>
                          <td className="p-2 text-muted-foreground">{(100 / l).toFixed(2)}%</td>
                          <td className="p-2 text-trading-green font-bold">${(4000 / l).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground/70">Illustrative price — not live market data. The exact amount changes with gold price and broker specifications.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* 1 LOT SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Margin Required for 1 Lot of </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Using the same hypothetical $4,000 gold price and 100-ounce contract, 1.00 lot controls 100 oz with a notional of $400,000.</p>
                <div className="glass rounded-xl p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div><p className="text-xs text-muted-foreground mb-1">1:100</p><p className="text-xl font-bold text-trading-green">$4,000</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">1:200</p><p className="text-xl font-bold text-trading-green">$2,000</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">1:500</p><p className="text-xl font-bold text-trading-green">$800</p></div>
                </div>
                <p className="text-xs text-muted-foreground/70">Illustrative only. Do not imply today's XAUUSD price is $4,000.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ILLUSTRATIVE TABLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">XAUUSD Margin at 1:100 vs 1:500 </span>
              <span className="text-trading-gold text-glow-gold">Leverage</span>
            </h2>
            <div className="glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-bold text-foreground">Lots</th>
                      <th className="text-left p-4 font-bold text-foreground">Ounces</th>
                      <th className="text-left p-4 font-bold text-foreground">Notional</th>
                      <th className="text-left p-4 font-bold text-foreground">1:100 Margin</th>
                      <th className="text-left p-4 font-bold text-foreground">1:500 Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ILLUSTRATIVE_TABLE.map((row) => (
                      <tr key={row.lots} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-foreground font-bold">{row.lots.toFixed(2)}</td>
                        <td className="p-4 text-muted-foreground">{row.ounces} oz</td>
                        <td className="p-4 text-muted-foreground">${row.notional.toLocaleString()}</td>
                        <td className="p-4 text-trading-green font-bold">${row.margin100}</td>
                        <td className="p-4 text-trading-gold font-bold">${row.margin500}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3">Illustrative only — based on a hypothetical $4,000 gold price and 100 oz contract. At 1:100 the margin rate is 1%; at 1:500 it is 0.2%. For the same position, 1:500 requires one-fifth the collateral of 1:100 under the simple leverage formula. Market exposure is unchanged.</p>
          </div>
        </FadeSection>

        {/* CONTRACT SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Contract Size and </span>
                <span className="text-trading-gold text-glow-gold">Broker Specifications</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The 100-troy-ounce contract size is commonly encountered for XAUUSD, but it is not universal. Some brokers use 10 oz, 1 oz, or other values per 1.00 lot. The calculator&apos;s contract size field is editable so you can match your broker.</p>
                <p>Gold leverage may also differ from the account&apos;s headline forex leverage. Some brokers apply symbol-specific leverage to metals; others use margin percentages rather than leverage ratios. Tiered or dynamic margin can apply to larger positions, and weekend or high-impact-news rules may change requirements. Hedged positions may have special rules.</p>
                <p>For the exact requirement, check your broker&apos;s XAUUSD symbol specification — in MT4/MT5, right-click the symbol and select Specification. This calculator estimates margin using the specifications you supply; it does not override your broker&apos;s rules.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* USED / FREE / LEVEL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">What Are Used Margin, Free Margin and </span>
                <span className="text-trading-gold text-glow-gold">Margin Level?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Used margin</strong> is the collateral currently locked by your open positions. When you plan a new position, the new required margin is added to the existing used margin.</p>
                <p><strong className="text-foreground/90">Free margin</strong> is equity minus used margin — the collateral available to open new positions or absorb floating losses.</p>
                <p><strong className="text-foreground/90">Margin level</strong> is equity divided by used margin, expressed as a percentage. It is an account-health ratio.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">A margin-level percentage does not by itself predict liquidation. Broker margin-call levels, stop-out levels, symbol rules and floating P/L treatment can vary. There is no universal "safe" margin level.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* LEVERAGE VS RISK */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Does Higher Leverage Reduce XAUUSD </span>
                <span className="text-trading-gold text-glow-gold">Trading Risk?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>For a fixed entry, stop-loss, lot size and contract size, changing leverage does <strong className="text-foreground/90">not</strong> directly change the loss caused by the same price movement. Leverage changes required collateral, not market exposure.</p>
                <p>Example: the same 0.10-lot XAUUSD position may require more margin at 1:100 than at 1:500. But both positions still control the same ounces if the lot size and contract size are unchanged. If gold moves $1 against you, the monetary loss is the same at 1:100 and 1:500.</p>
                <p>Higher available leverage can make it possible to open larger exposure with less collateral — and that behavior can increase risk. But it is inaccurate to say "higher leverage = automatically higher loss" for an unchanged position. The risk increase comes from the option to take a larger position, not from the leverage itself on a fixed position.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* MARGIN VS LOT SIZE VS RISK REWARD */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Margin vs Lot Size vs </span>
                <span className="text-trading-gold text-glow-gold">Risk Reward</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>These tools answer different questions and work together:</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><Scale className="w-5 h-5 text-trading-gold shrink-0 mt-1" /><span><strong className="text-foreground/90">Margin</strong> (this page): "How much collateral is required?"</span></li>
                  <li className="flex items-start gap-2"><Layers className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Lot Size</strong> — <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size &amp; Risk Calculator</Link>: "How large should my trade be for a chosen risk amount and stop?"</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk Reward</strong> — <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>: "How far is the target relative to the stop?"</span></li>
                  <li className="flex items-start gap-2"><Gauge className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Pip Value</strong> — <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Pip Value Calculator</Link>: "What is a price increment worth for this position?"</span></li>
                  <li className="flex items-start gap-2"><Target className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Profit</strong> — <Link href="/tools/xauusd-profit-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Profit Calculator</Link>: "What P&amp;L results from this entry, exit and size?"</span></li>
                </ul>
                <p>For the broader exposure-management framework, see our{" "}
                  <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>
                  . For choosing meaningful entry, stop and target levels, see the{" "}
                  <Link href="/xauusd-support-resistance/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">XAUUSD Support and Resistance guide</Link>
                  . And to time entries around the most liquid sessions, use the{" "}
                  <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Forex Market Hours Clock</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BROKER DIFFERENCES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Why Your Broker&apos;s Gold Margin May </span>
              <span className="text-trading-gold text-glow-gold">Differ</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brokerDifferences.map((b) => (
                <div key={b.title} className="glass-strong rounded-2xl p-5 gradient-border">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-trading-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">Check the MT4/MT5 Symbol Specification or your broker&apos;s equivalent contract specification for the exact requirement. Do not recommend a specific broker — this calculator is broker-neutral.</p>
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Margin </span>
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
                <p>Margin estimates depend on the specifications you enter. Real broker requirements may differ due to symbol-specific leverage, tiered margin, weekend or news rules, hedged-position rules and other factors. Always verify requirements in your broker&apos;s symbol specification.</p>
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
