import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, MessageCircle, BookOpen, Info, XCircle, TrendingUp } from "lucide-react";
import { FadeSection, HeroAnimation, StickyTelegramButton } from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { ForexPositionSizeCalculator } from "@/components/tools/forex-position-size-calculator";

export const metadata: Metadata = {
  title: "Forex Position Size Calculator — Lot Size & Risk",
  description: "Free forex position size calculator. Calculate lot size, pip value and risk for major currency pairs using your balance, stop loss and broker settings.",
  alternates: { canonical: "https://forexwizard.online/tools/forex-position-size-calculator/" },
  openGraph: {
    title: "Forex Position Size Calculator — Lot Size & Risk",
    description: "Free forex position size calculator. Calculate lot size, pip value and risk for major currency pairs using your balance, stop loss and broker settings.",
    type: "website",
    url: "https://forexwizard.online/tools/forex-position-size-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-forex-position-size-calculator.jpg", width: 1200, height: 630, alt: "Forex Position Size Calculator showing lot size, risk amount and pip value for currency pairs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Position Size Calculator — Lot Size & Risk",
    description: "Free forex position size calculator. Calculate lot size, pip value and risk for major currency pairs using your balance, stop loss and broker settings.",
    images: ["/og-forex-position-size-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Forex Wizard Forex Position Size Calculator",
  description: "Free forex position size calculator for calculating lot size, pip value and risk for major currency pairs using account balance, stop loss and broker settings.",
  url: "https://forexwizard.online/tools/forex-position-size-calculator/",
  applicationCategory: "FinanceApplication", operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Forex Wizard", url: "https://forexwizard.online/", logo: { "@type": "ImageObject", url: "https://forexwizard.online/brand/forexwizard-logo.webp" } },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Trading Tools", item: "https://forexwizard.online/tools/" },
    { "@type": "ListItem", position: 3, name: "Forex Position Size Calculator", item: "https://forexwizard.online/tools/forex-position-size-calculator/" },
  ],
};

function TelegramCTA({ text, variant = "primary", className = "" }: { text: string; variant?: "primary" | "secondary" | "gold"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none";
  const variants: Record<string, string> = {
    primary: "bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95",
    gold: "bg-trading-gold text-trading-dark glow-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,64,0.6)] active:scale-95",
    secondary: "glass-strong text-trading-green border border-trading-green/30 hover:bg-trading-green/10 hover:scale-105 active:scale-95",
  };
  return <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}><MessageCircle className="w-5 h-5" />{text}<ArrowRight className="w-4 h-4" /></a>;
}

const faqs = [
  { q: "What is a forex position size calculator?", a: "A forex position size calculator determines the correct lot size for a trade based on your account equity, risk percentage, stop-loss distance and the pip value of the currency pair. It ensures you risk a defined amount per trade rather than guessing your position size." },
  { q: "How do I calculate forex lot size?", a: "Lot size = Risk Amount / (Stop-Loss Pips × Pip Value per Lot). Risk Amount = Account Equity × Risk Percentage / 100. Pip Value per Lot = Pip Size × Contract Size × Conversion Rate. The calculator handles all these steps and rounds the result down to your broker's lot step." },
  { q: "What is the difference between standard, mini and micro lots?", a: "A standard lot is 100,000 units of the base currency. A mini lot is 10,000 units (0.10 standard lots). A micro lot is 1,000 units (0.01 standard lots). The calculator shows all three equivalents, but actual executable lots must comply with your broker's volume specification." },
  { q: "How does stop-loss distance affect position size?", a: "The further your stop loss is from entry, the smaller your position size must be to keep the same risk amount. Doubling the stop-loss distance halves the lot size for the same risk budget. This is why tight stops allow larger positions while wider stops require smaller ones." },
  { q: "Why do JPY pairs use a different pip size?", a: "JPY-quoted pairs (like USD/JPY and EUR/JPY) are priced to two decimal places instead of four. One pip for JPY pairs is 0.01, while for most other pairs it is 0.0001. The calculator automatically applies the correct pip size when you select a JPY pair." },
  { q: "Why does account currency conversion matter?", a: "Pip values are calculated in the pair's quote currency. If your account currency differs from the quote currency, you need a conversion rate to determine the pip value in your account currency. For example, trading EUR/GBP with a USD account requires the GBP-to-USD rate to convert pip values." },
  { q: "How do spreads and commissions affect planned risk?", a: "If you enter actual executable entry and stop prices, the spread is already reflected. Commission and slippage add to the cost per lot, which reduces the lot size that fits within your risk budget. The calculator includes these costs in the Advanced mode." },
  { q: "What happens if the minimum lot exceeds my risk budget?", a: "The calculator reports 'No valid position within risk limit.' It does not recommend a larger position to satisfy the broker minimum. You would need to increase your risk budget, reduce your stop-loss distance, or use a broker with a smaller minimum lot." },
  { q: "Can I use this with MT4 or MT5?", a: "Yes. Enter the contract size, pip size, minimum lot and lot step from your MT4/MT5 symbol specification (right-click the symbol → Specification). The calculator uses the same math that MT4/MT5 applies to position sizing." },
];

export default function ForexPositionSizeCalculatorPage() {
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
              <span className="text-foreground/80">Forex Position Size Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Forex </span>
              <span className="text-trading-gold text-glow-gold">Position Size Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Calculate the correct lot size for forex currency pairs using your account equity, risk percentage, stop-loss distance and broker specifications. Supports 15+ major and minor pairs with automatic pip-value conversion.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              This calculator handles standard forex pairs. For gold (XAUUSD) position sizing, use the dedicated XAUUSD Lot Size Calculator.
            </p>
          </HeroAnimation>
        </section>

        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto"><ForexPositionSizeCalculator /></div>
        </FadeSection>

        {/* Educational content */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6"><span className="text-foreground">What Is a Forex </span><span className="text-trading-gold text-glow-gold">Position Size Calculator?</span></h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>A forex position size calculator determines how many lots to trade based on how much you are willing to risk and how far your stop loss is from entry. It converts your risk budget into a precise lot size that respects your broker's volume rules.</p>
              <p>The core formula: <span className="text-trading-green font-mono">Lots = Risk Amount / (Stop Pips × Pip Value per Lot + Costs per Lot)</span>. The calculator handles pip-value conversion for cross-currency pairs, JPY pip conventions, broker lot-step rounding and commission/slippage costs.</p>
              <p className="text-sm border-l-2 border-trading-gold/40 pl-4">Proper position sizing limits planned exposure but cannot eliminate gap, slippage or execution risk. A stop-loss order may fill at a worse price than planned during volatile conditions.</p>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6"><span className="text-foreground">How to Calculate </span><span className="text-trading-gold text-glow-gold">Forex Lot Size</span></h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground/90">Step 1:</strong> Determine your risk amount. If risking 1% of a $10,000 account, your risk amount is $100.</p>
                <p><strong className="text-foreground/90">Step 2:</strong> Calculate pip value per standard lot. For EUR/USD: 0.0001 × 100,000 = $10 per pip per lot. For USD/JPY at 150.00: 0.01 × 100,000 = 1,000 JPY per pip = 1,000/150 = $6.67 per pip per lot.</p>
                <p><strong className="text-foreground/90">Step 3:</strong> Calculate risk per lot: Stop pips × Pip value per lot. For 20 pips on EUR/USD: 20 × $10 = $200 per lot.</p>
                <p><strong className="text-foreground/90">Step 4:</strong> Divide risk amount by risk per lot: $100 / $200 = 0.50 lots. The calculator rounds this down to your broker's lot step.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6"><span className="text-foreground">Why JPY Pairs Require </span><span className="text-trading-gold text-glow-gold">Different Pip Conventions</span></h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>Most forex pairs are quoted to four decimal places, making one pip = 0.0001. JPY-quoted pairs (USD/JPY, EUR/JPY, GBP/JPY, etc.) are quoted to two decimal places, making one pip = 0.01.</p>
              <p>This means a 20-pip move on USD/JPY is a 0.20 price move (e.g., 150.00 → 149.80), while a 20-pip move on EUR/USD is a 0.0020 price move (e.g., 1.1000 → 1.0980). The calculator automatically applies the correct pip size when you select a JPY pair.</p>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6"><span className="text-foreground">Common Position-Sizing </span><span className="text-trading-gold text-glow-gold">Mistakes</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Using the same lot size for every trade", d: "Different stop-loss distances require different lot sizes to maintain the same risk. A 10-pip stop and a 50-pip stop should produce very different position sizes." },
                { t: "Ignoring account currency conversion", d: "If your account is in USD and you trade EUR/GBP, pip values must be converted from GBP to USD. Forgetting this step produces incorrect lot sizes." },
                { t: "Not accounting for commission", d: "Commission adds to the cost per lot, which reduces the lot size that fits within your risk budget. The Advanced mode includes this." },
                { t: "Rounding up instead of down", d: "The calculator always rounds down to the broker's lot step. Rounding up would exceed your risk budget." },
                { t: "Assuming all brokers use the same contract size", d: "Standard lots are typically 100,000 units, but some brokers use different contract sizes. Always verify in your platform's symbol specification." },
                { t: "Confusing this with the XAUUSD calculator", d: "This tool is for standard forex pairs. Gold (XAUUSD) has its own contract size, pip conventions and margin rules. Use the dedicated XAUUSD Lot Size Calculator for gold trades." },
              ].map(m => (
                <div key={m.t} className="glass-strong rounded-2xl p-5 gradient-border">
                  <div className="flex items-start gap-3"><XCircle className="w-5 h-5 text-trading-red shrink-0 mt-1" /><div><h3 className="text-base font-bold text-foreground mb-1">{m.t}</h3><p className="text-sm text-muted-foreground leading-relaxed">{m.d}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10"><h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4"><span className="text-foreground">Frequently Asked </span><span className="text-trading-gold text-glow-gold">Questions</span></h2></div>
            <div className="space-y-4">
              {faqs.map(f => (
                <details key={f.q} className="glass-strong rounded-2xl gradient-border group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">{f.q}</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                  <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Risk Disclaimer */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl border border-trading-red/20 p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold text-trading-red mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" />Risk Disclaimer</h2>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>Trading forex involves significant risk and may not be suitable for everyone.</p>
                <p>This calculator is provided for educational purposes only and should not be considered financial advice or a recommendation to trade.</p>
                <p>Position sizing limits planned exposure but cannot eliminate gap, slippage or execution risk. A stop-loss order may fill at a worse price than planned during volatile conditions.</p>
                <p>Always verify broker specifications and use appropriate risk management.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"><span className="text-foreground">Follow XAU/USD on </span><span className="text-trading-green text-glow-green">Telegram</span></h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.</p>
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
