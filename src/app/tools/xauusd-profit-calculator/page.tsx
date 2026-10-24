import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, ArrowRight, MessageCircle, TrendingUp, TrendingDown,
  Target, Coins, BookOpen, Info, CheckCircle2, XCircle,
} from "lucide-react";
import {
  FadeSection, HeroAnimation, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";
import { XauusdProfitCalculator } from "@/components/tools/xauusd-profit-calculator";
import { STATIC_MOVE_TABLE } from "@/lib/xauusd-profit-calc";

export const metadata: Metadata = {
  title: "XAUUSD Profit Calculator – Gold P&L | Forex Wizard",
  description:
    "Calculate XAUUSD profit or loss from entry, exit and lot size. See gold P&L, price movement, trading costs, break-even price and partial-close results.",
  alternates: { canonical: "https://forexwizard.online/tools/xauusd-profit-calculator/" },
  openGraph: {
    title: "XAUUSD Profit Calculator – Gold P&L | Forex Wizard",
    description:
      "Calculate gold trading profit or loss using XAUUSD entry price, exit price, lot size and contract size, with costs and partial-close support.",
    type: "website",
    url: "https://forexwizard.online/tools/xauusd-profit-calculator/",
    siteName: "Forex Wizard",
    images: [{ url: "/og-xauusd-profit-calculator.jpg", width: 1200, height: 630, alt: "XAUUSD Profit Calculator showing gold profit and loss from entry, exit and lot size" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XAUUSD Profit Calculator – Gold P&L | Forex Wizard",
    description:
      "Calculate gold trading profit or loss using XAUUSD entry price, exit price, lot size and contract size, with costs and partial-close support.",
    images: ["/og-xauusd-profit-calculator.jpg"],
  },
};

const TELEGRAM_LINK = "https://t.me/ForexWizzz";

const webAppStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Forex Wizard XAUUSD Profit Calculator",
  description:
    "Free XAUUSD profit calculator for estimating gold trade profit or loss from entry price, exit price and lot size, with trading costs, break-even price and partial-close calculations.",
  url: "https://forexwizard.online/tools/xauusd-profit-calculator/",
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
    { "@type": "ListItem", position: 3, name: "XAUUSD Profit Calculator", item: "https://forexwizard.online/tools/xauusd-profit-calculator/" },
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
  { label: "BUY Gross P&L", formula: "(Exit − Entry) × Lots × Contract Size", note: "Positive when exit > entry." },
  { label: "SELL Gross P&L", formula: "(Entry − Exit) × Lots × Contract Size", note: "Positive when exit < entry." },
  { label: "Net P&L", formula: "Gross P&L − Total Costs", note: "Costs: commission + swap + other fees." },
  { label: "Value per $1 Move", formula: "Lots × Contract Size", note: "USD value of a $1 gold price move." },
  { label: "Break-Even Exit", formula: "Entry ± (CostsUSD ÷ Exposure)", note: "BUY: entry +; SELL: entry −. Equals entry when costs are zero." },
];

const brokerDifferences = [
  { title: "Contract size", desc: "Some brokers use 100 oz per lot; others use 10 oz, 1 oz, or other values. Check your symbol specification." },
  { title: "Executed bid/ask prices", desc: "If you enter actual filled prices, the spread is already reflected. Using chart/mid prices may produce a different result." },
  { title: "Commission", desc: "Brokers may charge commission per lot, per side, or include it in the spread. Enter your actual commission structure." },
  { title: "Swap / financing", desc: "Overnight financing charges vary by broker and may differ for buy and sell positions." },
  { title: "Account currency conversion", desc: "If your account is not USD-denominated, the conversion rate you enter affects the final P&L. Real rates fluctuate." },
  { title: "Broker rounding", desc: "Some brokers round P&L to specific decimal places or minimum monetary units, which can cause small differences." },
];

const commonMistakes = [
  { title: "Using absolute price distance for P&L sign", desc: "A BUY trade gains only when exit > entry. A SELL trade gains only when exit < entry. Do not use absolute distance alone to determine profit or loss." },
  { title: "Assuming 100 oz is always one lot", desc: "100 troy ounces is common but not universal. Always check your broker's contract size for the gold symbol." },
  { title: "Double-counting spread", desc: "If your entry and exit are actual filled prices, the spread is already reflected. Do not subtract it again." },
  { title: "Confusing P&L with margin", desc: "P&L is the result of price movement. Margin is the collateral required to hold the position. Leverage changes margin, not the P&L of an unchanged position." },
  { title: "Ignoring trading costs", desc: "Commission, swap and other fees reduce net P&L. A trade that looks profitable on a gross basis may be a net loss after costs." },
  { title: "Mixing account currencies", desc: "All cost inputs must use the same currency as your account. Mixing currencies produces incorrect results." },
];

const faqs = [
  { q: "What is an XAUUSD profit calculator?", a: "It estimates the profit or loss of a gold (XAUUSD) trade based on entry price, exit price, lot size, contract size and optional trading costs. It shows gross P&L, net P&L, price movement, break-even price, and supports partial-close and find-exit calculations. Results are estimates — your broker's trade history is authoritative." },
  { q: "How is XAUUSD profit calculated?", a: "For a BUY: gross P&L = (exit − entry) × lots × contract size. For a SELL: gross P&L = (entry − exit) × lots × contract size. Net P&L subtracts commission, swap and other fees. The result is in USD by default; a manual conversion rate converts it to your account currency." },
  { q: "How much profit does 0.01 lot gold make?", a: "There is no single profit amount for 0.01 lot. It depends on how far XAUUSD moves. With an illustrative 100 oz contract, 0.01 lot = 1 oz exposure. A favorable $1 move ≈ $1 gross P&L; a $10 move ≈ $10; a $20 move ≈ $20 — before costs. Actual profit changes with the live gold price and your broker's specifications." },
  { q: "How much is a $1 move on 0.01 lot XAUUSD?", a: "With a 100 oz contract, 0.01 lot controls 1 oz. A $1 gold move therefore produces approximately $1 in gross P&L (favorable or adverse). Before trading costs." },
  { q: "How much is a $10 move on 0.10 lot gold?", a: "With a 100 oz contract, 0.10 lot controls 10 oz. A $10 gold move produces approximately $100 in gross P&L (10 oz × $10). Before trading costs." },
  { q: "How much does 1 lot XAUUSD make per $1 move?", a: "With a 100 oz contract, 1.00 lot controls 100 oz. A $1 gold move produces approximately $100 in gross P&L. A $10 move produces approximately $1,000." },
  { q: "How do I calculate profit on a BUY gold trade?", a: "For a BUY, profit = (exit price − entry price) × lots × contract size. The result is positive (profit) when the exit is above the entry, and negative (loss) when the exit is below the entry. Subtract trading costs to get net P&L." },
  { q: "How do I calculate profit on a SELL gold trade?", a: "For a SELL, profit = (entry price − exit price) × lots × contract size. The result is positive (profit) when the exit is below the entry, and negative (loss) when the exit is above the entry. Subtract trading costs to get net P&L." },
  { q: "What contract size should I use for XAUUSD?", a: "100 troy ounces per 1.00 lot is common, but not universal. Some brokers use 10 oz, 1 oz, or other values. Check your broker's XAUUSD symbol specification (in MT4/MT5: right-click the symbol → Specification). The calculator's contract size field is editable." },
  { q: "Is 100 ounces always one lot of gold?", a: "No. 100 oz is the most common contract size for standard gold lots, but some brokers use different values. Always verify in your platform's symbol specification." },
  { q: "How do commissions affect XAUUSD profit?", a: "Commissions reduce net P&L. The calculator applies commission per 1.00 lot multiplied by your trade size, then subtracts it (along with swap and other fees) from gross P&L to produce net P&L. A trade that is profitable on a gross basis may be a net loss after costs." },
  { q: "Does spread affect a gold profit calculation?", a: "If your entry and exit prices are actual filled prices, the spread is already reflected in those execution prices — do not subtract it again. If you use chart/mid prices, the result may differ from your broker's trade history. Using actual filled prices avoids double-counting." },
  { q: "How do I calculate break-even price?", a: "The break-even exit price is the entry price adjusted for costs. For a BUY: break-even = entry + (costs in USD ÷ exposure in oz). For a SELL: break-even = entry − (costs in USD ÷ exposure). With zero costs, break-even equals the entry price." },
  { q: "Can I calculate partial-close profit?", a: "Yes. Use the Partial Close mode to enter up to 4 exit prices with allocation percentages or lots. The calculator returns the gross and net P&L for the closed portion, the weighted average exit, remaining open lots, and a per-exit breakdown. Remaining open lots are not assigned hypothetical P&L." },
  { q: "Can I calculate multiple take profits?", a: "Yes — the Partial Close mode supports 1 to 4 exits. Each exit has its own price and allocation. The calculator shows the realized P&L for each exit and the total for the closed portion." },
  { q: "Can I calculate the exit price needed for a target profit?", a: "Yes. Use the Find Exit Price mode. Enter your desired net profit, and the calculator returns the required XAUUSD exit price, accounting for your entered costs and exposure." },
  { q: "Why does my broker show a different profit?", a: "Common reasons include a different contract size, executed bid/ask prices vs chart prices, commission, swap, account-currency conversion, broker rounding, partial fills, slippage, and symbol specification differences. Always verify against your broker's trade history." },
  { q: "Does leverage change profit on the same lot size?", a: "No. For the same lot size, contract size, entry and exit, leverage does not change the gross P&L produced by the price movement. Leverage changes the margin required to hold the position, not the P&L. Higher leverage can let you open larger exposure with less collateral — which can increase risk — but it does not change the P&L of an unchanged position. Use the XAUUSD Margin Calculator for collateral calculations." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function XauusdProfitCalculatorPage() {
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
              <span className="text-foreground/80">XAUUSD Profit Calculator</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">XAUUSD Profit Calculator – Calculate </span>
              <span className="text-trading-gold text-glow-gold">Gold Profit &amp; Loss</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Calculate the estimated profit or loss of an XAUUSD trade using entry price, exit price, lot size and contract size. Compare gold price movement, account currency P&amp;L, trading costs, break-even price and partial-close results.
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto">
              XAUUSD contract size, execution prices and trading costs vary by broker. Enter the specifications that match your trading account. Example prices on this page are illustrative and are not live gold prices.
            </p>
          </HeroAnimation>
        </section>

        {/* CALCULATOR */}
        <FadeSection className="px-4 pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <XauusdProfitCalculator />
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">How to Use the XAUUSD </span>
              <span className="text-trading-gold text-glow-gold">Profit Calculator</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground/90">Mode 1 — Profit / Loss:</strong> Enter direction (Buy/Sell), entry price, exit price, lots and contract size. The calculator shows gross P&L, net P&L (after optional costs), price movement, exposure, value per $1 move, and break-even exit price.</p>
              <p><strong className="text-foreground/90">Mode 2 — Find Exit Price:</strong> Enter your desired net profit. The calculator returns the required XAUUSD exit price, accounting for your entered costs and exposure.</p>
              <p><strong className="text-foreground/90">Mode 3 — Partial Close:</strong> Enter up to 4 exit prices with allocation percentages or lots. The calculator shows realized P&L for the closed portion, weighted average exit, remaining open lots, and a per-exit breakdown.</p>
              <p><strong className="text-foreground/90">Mode 4 — Gold Move:</strong> Enter lots and contract size. The calculator generates a table showing the P&L value of $0.50, $1, $2, $5, $10, $20 and $50 gold moves (plus an optional custom move).</p>
            </div>
          </div>
        </FadeSection>

        {/* FORMULA */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Profit and Loss </span>
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
                Example: BUY 0.10 lot at $4,000, exit $4,020, 100 oz contract → (4020 − 4000) × 0.10 × 100 = +$200 gross P&L.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* 0.01 LOT SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Much Profit Does 0.01 Lot </span>
                <span className="text-trading-gold text-glow-gold">Gold Make?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>There is no single profit amount for 0.01 lot. Profit depends on how far XAUUSD moves.</p>
                <p>With an illustrative 100 oz contract, 0.01 lot = 1 oz exposure. Therefore:</p>
                <div className="glass rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div><p className="text-xs text-muted-foreground mb-1">$1 move</p><p className="text-lg font-bold text-trading-green">≈ $1</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">$5 move</p><p className="text-lg font-bold text-trading-green">≈ $5</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">$10 move</p><p className="text-lg font-bold text-trading-green">≈ $10</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">$20 move</p><p className="text-lg font-bold text-trading-green">≈ $20</p></div>
                </div>
                <p className="text-xs text-muted-foreground/70">Illustrative contract size — not all brokers use 100 oz. Before costs.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* $1/$10/$20 MOVE SECTION */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Much Is a $1, $10 or $20 Move in </span>
                <span className="text-trading-gold text-glow-gold">Gold?</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The value of a gold price move depends on your lot size and contract size. With a 100 oz contract:</p>
                <div className="glass rounded-xl p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-muted-foreground">
                        <th className="text-left p-2 font-bold">Lots</th>
                        <th className="text-left p-2 font-bold">Gold Exposure</th>
                        <th className="text-left p-2 font-bold">$1 Move</th>
                        <th className="text-left p-2 font-bold">$10 Move</th>
                        <th className="text-left p-2 font-bold">$20 Move</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STATIC_MOVE_TABLE.map((row) => (
                        <tr key={row.lots} className="border-b border-white/5 last:border-0">
                          <td className="p-2 text-foreground font-bold">{row.lots.toFixed(2)}</td>
                          <td className="p-2 text-muted-foreground">{row.exposure}</td>
                          <td className="p-2 text-trading-green font-bold">${row.move1}</td>
                          <td className="p-2 text-trading-green font-bold">${row.move10}</td>
                          <td className="p-2 text-trading-green font-bold">${row.move20}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground/70">Illustrative contract size — not all brokers use 100 oz. Before costs.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BUY VS SELL */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD BUY vs SELL </span>
                <span className="text-trading-gold text-glow-gold">Profit Calculation</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <p className="text-sm font-bold text-trading-green mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> BUY</p>
                    <p className="text-sm">Gains when exit &gt; entry. Loses when exit &lt; entry.</p>
                    <p className="text-sm text-trading-green font-mono mt-2">(exit − entry) × lots × contract</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-sm font-bold text-trading-red mb-2 flex items-center gap-2"><TrendingDown className="w-4 h-4" /> SELL</p>
                    <p className="text-sm">Gains when exit &lt; entry. Loses when exit &gt; entry.</p>
                    <p className="text-sm text-trading-green font-mono mt-2">(entry − exit) × lots × contract</p>
                  </div>
                </div>
                <p>Do not use absolute price distance alone to determine the P&L sign. A BUY trade with exit below entry is a loss, even though the absolute distance is positive.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* CONTRACT SIZE / LOT SIZE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Gold Contract Size and </span>
                <span className="text-trading-gold text-glow-gold">Lot Size</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>This calculator defaults to 100 troy ounces per 1.00 lot because that is a commonly encountered XAUUSD specification. But contract sizes can differ — some brokers use 10 oz, 1 oz, or other values per lot.</p>
                <p>Check MT4/MT5 Symbol Specification (right-click the symbol → Specification) or your broker's contract specification for the exact value. The calculator's contract size field is editable so you can match your broker.</p>
                <p>For position sizing from account risk and stop distance, use the{" "}
                  <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Lot Size Calculator</Link>
                  . For the monetary value of a single price increment, see the{" "}
                  <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Pip Value Calculator</Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PARTIAL CLOSES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">XAUUSD Profit With </span>
                <span className="text-trading-gold text-glow-gold">Partial Closes</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The Partial Close mode lets you plan up to 4 exits with allocation percentages or lots. The calculator returns the gross and net realized P&L for the closed portion, the weighted average exit price, and the remaining open lots.</p>
                <p>Allocations may total less than 100% — the remainder stays open and is not assigned hypothetical P&L. Commission is applied to the closed lots only; swap and other fees apply once to the realized plan.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">This output describes the CLOSED portion only. Remaining open lots are not assigned hypothetical P&L.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* TRADING COSTS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How Trading Costs Change </span>
                <span className="text-trading-gold text-glow-gold">Gold P&amp;L</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Commission, swap/financing and other fees reduce net P&L. The calculator's advanced section lets you enter these costs in your account currency.</p>
                <p><strong className="text-foreground/90">Commission</strong> is entered per 1.00 lot and multiplied by your trade size. <strong className="text-foreground/90">Swap</strong> and <strong className="text-foreground/90">other fees</strong> are flat amounts. Total costs are subtracted from gross P&L to produce net P&L.</p>
                <p className="text-sm border-l-2 border-trading-gold/40 pl-4">If your entry and exit prices are actual filled prices, the bid/ask spread is already reflected in those execution prices. Do not double-count spread by subtracting it again.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* BREAK-EVEN */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Calculate a Break-Even </span>
                <span className="text-trading-gold text-glow-gold">XAUUSD Price</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>The break-even exit price is the entry price adjusted for costs. With zero costs, break-even equals the entry price.</p>
                <p><strong className="text-foreground/90">BUY:</strong> break-even = entry + (costs in USD ÷ exposure in oz). The break-even is above the entry because you need the price to rise enough to cover the costs.</p>
                <p><strong className="text-foreground/90">SELL:</strong> break-even = entry − (costs in USD ÷ exposure in oz). The break-even is below the entry because you need the price to fall enough to cover the costs.</p>
                <p>If a SELL break-even would result in a non-positive price, the calculator displays a message instead of a misleading negative value.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* PROFIT VS OTHER CALCULATORS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Profit Calculator vs Pip Value, Lot Size, Risk Reward and </span>
                <span className="text-trading-gold text-glow-gold">Margin</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>Each Forex Wizard calculator answers a different question:</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2"><Coins className="w-5 h-5 text-trading-gold shrink-0 mt-1" /><span><strong className="text-foreground/90">Profit Calculator</strong> (this page): "What P&L results from this entry, exit and size?"</span></li>
                  <li className="flex items-start gap-2"><Target className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Pip Value</strong> — <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">XAUUSD Pip Value Calculator</Link>: "What is each price increment worth?"</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Lot Size</strong> — <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Lot Size Calculator</Link>: "What position size corresponds to my chosen account risk?"</span></li>
                  <li className="flex items-start gap-2"><TrendingUp className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Risk Reward</strong> — <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Risk Reward Calculator</Link>: "How does target distance compare with stop distance?"</span></li>
                  <li className="flex items-start gap-2"><Coins className="w-5 h-5 text-trading-green shrink-0 mt-1" /><span><strong className="text-foreground/90">Margin</strong> — <Link href="/tools/xauusd-margin-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80">Margin Calculator</Link>: "How much collateral is required?"</span></li>
                </ul>
                <p>For the broader risk-management framework, see our{" "}
                  <Link href="/blog/forex-risk-management-for-beginners/" className="text-trading-gold underline underline-offset-2 hover:text-trading-gold/80">forex risk management for beginners guide</Link>
                  . To time entries around the most liquid sessions, use the{" "}
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
              <span className="text-foreground">Why Your Broker P&amp;L May Be </span>
              <span className="text-trading-gold text-glow-gold">Different</span>
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
          </div>
        </FadeSection>

        {/* COMMON MISTAKES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Common Profit Calculation </span>
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
                <p>P&L estimates depend on the specifications you enter. Real broker results may differ due to contract size, execution prices, commission, swap, slippage, and other factors. Always verify against your broker's trade history.</p>
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
