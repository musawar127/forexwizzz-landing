import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, Clock, Percent, TrendingUp, Coins, Calendar, Target, Activity,
  BarChart3, Crosshair, ArrowRight, BookOpen, ShieldCheck, MessageCircle,
} from "lucide-react";
import {
  FadeSection, FadeIn, HeroAnimation, PulsingGlow, StickyTelegramButton,
} from "@/components/fade-section";
import { CandlestickBackground } from "@/components/candlestick-background";
import { SiteFooter } from "@/components/site-footer";

const TOOLS_CANONICAL = "https://forexwizard.online/tools/";
const TOOLS_OG_IMAGE = "https://forexwizard.online/tools-og-image.jpg";
const TOOLS_OG_ALT = "Free XAUUSD and forex trading calculators from Forex Wizard: lot size, pip value, margin, risk-reward and market hours";
const TELEGRAM_LINK = "https://t.me/ForexWizzz";

export const metadata: Metadata = {
  title: "Free XAUUSD & Forex Calculators | Lot Size, Pips, Margin",
  description:
    "Free XAUUSD and forex calculators: lot size, pip value, margin, risk-reward, profit and market hours in your local time. No login or signup.",
  keywords: [
    "free forex calculators",
    "XAUUSD lot size calculator",
    "forex position size calculator",
    "XAUUSD pip value calculator",
    "gold margin calculator",
    "risk reward calculator",
    "XAUUSD profit calculator",
    "forex market hours UK time",
    "forex market hours GMT CET",
    "prop firm consistency calculator",
    "forex compounding calculator",
    "risk of ruin calculator",
  ],
  alternates: { canonical: TOOLS_CANONICAL },
  openGraph: {
    title: "Free XAUUSD & Forex Calculators | Forex Wizard",
    description:
      "Free XAUUSD and forex calculators: lot size, pip value, margin, risk-reward, profit and market hours in your local time. No login or signup.",
    type: "website",
    url: TOOLS_CANONICAL,
    siteName: "Forex Wizard",
    images: [{ url: "/tools-og-image.jpg", width: 1200, height: 630, alt: TOOLS_OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XAUUSD & Forex Calculators | Forex Wizard",
    description:
      "Free XAUUSD and forex calculators: lot size, pip value, margin, risk-reward, profit and market hours in your local time. No login or signup.",
    images: ["/tools-og-image.jpg"],
  },
};

const collectionPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Forex & XAUUSD Trading Calculators",
  description:
    "Free XAUUSD and forex calculators: lot size, pip value, margin, risk-reward, profit and market hours in your local time. No login or signup.",
  url: TOOLS_CANONICAL,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "XAUUSD Lot Size & Risk Calculator", url: "https://forexwizard.online/xauusd-lot-size/" },
      { "@type": "ListItem", position: 2, name: "Forex Market Hours & Live Session Clock", url: "https://forexwizard.online/tools/forex-market-hours/" },
      { "@type": "ListItem", position: 3, name: "XAUUSD & Forex Pip Value Calculator", url: "https://forexwizard.online/xauusd-pip-value/" },
      { "@type": "ListItem", position: 4, name: "Forex & XAUUSD Risk Reward Calculator", url: "https://forexwizard.online/tools/risk-reward-calculator/" },
      { "@type": "ListItem", position: 5, name: "XAUUSD Margin & Leverage Calculator", url: "https://forexwizard.online/tools/xauusd-margin-calculator/" },
      { "@type": "ListItem", position: 6, name: "Prop Firm Consistency Rule Calculator", url: "https://forexwizard.online/tools/prop-firm-consistency-calculator/" },
      { "@type": "ListItem", position: 7, name: "XAUUSD Profit Calculator", url: "https://forexwizard.online/tools/xauusd-profit-calculator/" },
      { "@type": "ListItem", position: 8, name: "Risk of Ruin & Losing Streak Calculator", url: "https://forexwizard.online/tools/risk-of-ruin-calculator/" },
      { "@type": "ListItem", position: 9, name: "Forex Compounding Calculator", url: "https://forexwizard.online/tools/forex-compounding-calculator/" },
      { "@type": "ListItem", position: 10, name: "Forex Position Size Calculator", url: "https://forexwizard.online/tools/forex-position-size-calculator/" },
    ],
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://forexwizard.online/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: TOOLS_CANONICAL },
  ],
};

const faqPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate lot size for XAUUSD?",
      acceptedAnswer: { "@type": "Answer", text: "Divide the amount you are willing to risk by the stop-loss distance in dollars multiplied by the contract size. On most brokers, 1 lot of gold is 100 ounces, so risking $50 with a $10 stop gives $50 ÷ ($10 × 100) = 0.05 lots. Confirm your broker's contract size, then use the XAUUSD Lot Size Calculator." },
    },
    {
      "@type": "Question",
      name: "How much is one pip in XAUUSD?",
      acceptedAnswer: { "@type": "Answer", text: "Conventions differ by broker. Many brokers treat a $0.10 price move as one pip, which is worth about $10 per standard lot of 100 ounces. Others quote in points of $0.01. Check your broker's specification and use the XAUUSD Pip Value Calculator to compare conventions." },
    },
    {
      "@type": "Question",
      name: "How much margin do I need to trade 1 lot of gold?",
      acceptedAnswer: { "@type": "Answer", text: "Required margin equals price × contract size × lots ÷ leverage. With gold at $4,000, one lot of 100 ounces has a notional value of $400,000, so margin is about $4,000 at 1:100 leverage and about $800 at 1:500. Requirements vary by broker, and higher leverage increases risk." },
    },
    {
      "@type": "Question",
      name: "What is a good risk-reward ratio, and what win rate do I need to break even?",
      acceptedAnswer: { "@type": "Answer", text: "No single ratio is right for everyone, but it must be considered alongside your win rate. The break-even win rate is 1 ÷ (1 + reward-to-risk). At 1:1 you need 50%, at 2:1 about 33% and at 3:1 25%, before spreads and commissions. Use the Risk Reward Calculator to test your own numbers." },
    },
    {
      "@type": "Question",
      name: "How much gain do I need to recover from a drawdown?",
      acceptedAnswer: { "@type": "Answer", text: "The gain needed equals drawdown ÷ (1 − drawdown). A 10% loss needs about an 11.1% gain to recover, a 20% loss needs 25% and a 50% loss needs 100%. This is why limiting risk per trade matters. A dedicated Drawdown Calculator is coming soon." },
    },
    {
      "@type": "Question",
      name: "What time does the forex market open and close in my time zone?",
      acceptedAnswer: { "@type": "Answer", text: "Forex trades around the clock from about 5 PM New York time on Sunday to 5 PM on Friday. In winter that is about 22:00 GMT (23:00 CET) on Sunday to 22:00 GMT (23:00 CET) on Friday, and one hour earlier in GMT during US summer time. Use the Forex Market Hours tool to see live session times in your local time." },
    },
    {
      "@type": "Question",
      name: "Are these calculators free, and are the results exact?",
      acceptedAnswer: { "@type": "Answer", text: "All calculators are free to use with no registration. Results are educational estimates. Spreads, slippage, commissions, gaps and broker-specific contract sizes can change real outcomes, so always verify your broker's specifications before trading." },
    },
  ],
};

const activeTools = [
  { href: "/xauusd-lot-size/", title: "XAUUSD Lot Size & Risk Calculator", desc: "Calculate the correct XAUUSD position size based on your account equity, risk percentage, entry price, stop loss and broker specifications. Includes commission and slippage adjustments.", bestFor: "deciding how many lots to trade before you enter.", icon: <Calculator className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/forex-market-hours/", title: "Forex Market Hours & Live Session Clock", desc: "See live forex market hours in your local time. Track Sydney, Tokyo, London and New York sessions with countdowns, overlaps and DST-aware timezone conversion.", bestFor: "planning when to trade from UK, European, UAE, Pakistan or India time.", icon: <Clock className="w-7 h-7 text-trading-green" /> },
  { href: "/xauusd-pip-value/", title: "XAUUSD & Forex Pip Value Calculator", desc: "Calculate pip values for gold and forex pairs. Compare pip conventions, convert to your account currency, and measure price distance between two prices.", bestFor: "knowing what one pip or point is worth in your account currency.", icon: <Percent className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/risk-reward-calculator/", title: "Forex & XAUUSD Risk Reward Calculator", desc: "Calculate risk-to-reward from entry, stop loss and target. See R multiple, break-even win rate, expectancy and advanced multiple take-profit planning.", bestFor: "checking whether a setup is worth taking and what win rate you need.", icon: <TrendingUp className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/xauusd-margin-calculator/", title: "XAUUSD Margin & Leverage Calculator", desc: "Calculate required gold margin from XAUUSD price, lot size, contract size and leverage. Compare leverage levels and estimate free margin and margin level.", bestFor: "checking you have enough free margin at your leverage.", icon: <Coins className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/prop-firm-consistency-calculator/", title: "Prop Firm Consistency Rule Calculator", desc: "Check your best-day percentage, consistency threshold and additional profit needed using net-profit, profitable-days or profit-target rules.", bestFor: "funded-account and prop firm challenge traders checking consistency rules.", icon: <Calendar className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/xauusd-profit-calculator/", title: "XAUUSD Profit Calculator", desc: "Calculate gold profit or loss from entry, exit and lot size, including costs, break-even price, partial closes and required exit price.", bestFor: "working out profit, loss and break-even on a gold trade.", icon: <Target className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/risk-of-ruin-calculator/", title: "Risk of Ruin & Losing Streak Calculator", desc: "Estimate losing-streak probability, compounded drawdown, recovery requirements and finite-horizon threshold risk from your trading statistics.", bestFor: "understanding how likely a losing streak is and how deep a drawdown could get.", icon: <Activity className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/forex-compounding-calculator/", title: "Forex Compounding Calculator", desc: "Model trading account growth with compounding returns, deposits, withdrawals, fees, variable returns and win/loss simulation. View charts and export CSV.", bestFor: "planning account growth with deposits, withdrawals and fees.", icon: <BarChart3 className="w-7 h-7 text-trading-green" /> },
  { href: "/tools/forex-position-size-calculator/", title: "Forex Position Size Calculator", desc: "Calculate lot size, pip value and risk for major forex currency pairs using your balance, stop loss and broker settings.", bestFor: "sizing positions on EUR/USD, GBP/USD and other currency pairs.", icon: <Crosshair className="w-7 h-7 text-trading-green" /> },
];

const upcomingTools = [
  { title: "Drawdown Calculator", desc: "Calculate how much gain is needed to recover from a given percentage drawdown.", icon: <ShieldCheck className="w-6 h-6 text-muted-foreground/50" /> },
];

const whichCalculatorTable = [
  { want: "Decide how many lots of gold to trade", tool: "XAUUSD Lot Size & Risk Calculator", href: "https://forexwizard.online/xauusd-lot-size/" },
  { want: "Decide position size on a currency pair", tool: "Forex Position Size Calculator", href: "https://forexwizard.online/tools/forex-position-size-calculator/" },
  { want: "Know what one pip or point is worth", tool: "XAUUSD & Forex Pip Value Calculator", href: "https://forexwizard.online/xauusd-pip-value/" },
  { want: "Check if a trade offers enough reward for the risk", tool: "Risk Reward Calculator", href: "https://forexwizard.online/tools/risk-reward-calculator/" },
  { want: "Check margin and free margin at your leverage", tool: "XAUUSD Margin & Leverage Calculator", href: "https://forexwizard.online/tools/xauusd-margin-calculator/" },
  { want: "See profit, loss and break-even on a gold trade", tool: "XAUUSD Profit Calculator", href: "https://forexwizard.online/tools/xauusd-profit-calculator/" },
  { want: "See when sessions open in your time zone", tool: "Forex Market Hours & Live Session Clock", href: "https://forexwizard.online/tools/forex-market-hours/" },
  { want: "Check a prop firm best-day or consistency rule", tool: "Prop Firm Consistency Rule Calculator", href: "https://forexwizard.online/tools/prop-firm-consistency-calculator/" },
  { want: "Understand losing streaks and drawdown risk", tool: "Risk of Ruin & Losing Streak Calculator", href: "https://forexwizard.online/tools/risk-of-ruin-calculator/" },
  { want: "Project account growth over time", tool: "Forex Compounding Calculator", href: "https://forexwizard.online/tools/forex-compounding-calculator/" },
];

const relatedGuides = [
  { href: "/blog/forex-risk-management-for-beginners/", title: "Forex Risk Management for Beginners", desc: "How lot size, stop-loss distance, leverage and total exposure work together." },
  { href: "/xauusd-support-resistance/", title: "XAUUSD Support and Resistance", desc: "How to find key gold levels before sizing a trade." },
  { href: "/blog/xauusd-fundamental-analysis/", title: "XAUUSD Fundamental Analysis", desc: "How the Fed, real yields and the dollar drive gold." },
  { href: "/blog/xauusd-volatility-trading-sessions/", title: "XAUUSD Volatility by Trading Session", desc: "When gold moves most." },
  { href: "/blog/", title: "Weekly XAUUSD Forecast", desc: "Key levels and a data calendar in GMT, CET and PKT, updated every week." },
  { href: "/forex-signals/", title: "Forex Signals", desc: "Educational forex signals and market analysis from Forex Wizard." },
];

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageStructuredData) }} />

      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight no-underline hover:text-trading-green transition-colors flex items-center gap-2">
            <img src="/brand/forexwizard-logo.webp" alt="ForexWizard logo" width={44} height={44} loading="eager" decoding="async" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg object-cover" />
            Forex Wizard
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/forex-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Forex Signals</Link>
            <Link href="/gold-signals/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Gold Signals</Link>
            <Link href="/xauusd-analysis/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">XAUUSD Analysis</Link>
            <Link href="/tools/" className="text-sm font-medium text-trading-gold hover:text-trading-gold/80 transition-colors no-underline">Tools</Link>
            <Link href="/blog/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline hidden sm:block">Blog</Link>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-trading-green hover:text-trading-green/80 transition-colors no-underline">Join on Telegram</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-trading-dark text-foreground overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trading-green/5 rounded-full blur-[120px] pointer-events-none" />
          <CandlestickBackground />
          <HeroAnimation className="relative z-10 max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-6 flex-wrap">
              <Link href="/" className="hover:text-trading-green transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-foreground/80">Tools</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-foreground">Free Forex &amp; XAUUSD </span>
              <span className="text-trading-green text-glow-green">Trading Calculators</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              Free forex and gold trading calculators from Forex Wizard. Size your position, check pip value and margin, test risk-to-reward, calculate XAUUSD profit and loss, see forex market hours in your local time, and model drawdown and risk of ruin. Everything runs in your browser, with no registration or login.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
              Built for XAUUSD (gold) and major forex pairs, and usable by traders anywhere, including the UK, Europe, the UAE, Pakistan and India. All results are educational estimates. Actual trading losses can differ due to spreads, slippage, gaps, commissions and execution conditions. Always verify broker specifications before trading.
            </p>
          </HeroAnimation>
        </section>

        {/* FREE FOREX & XAUUSD CALCULATORS */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 id="tools" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center">
              <span className="text-foreground">Free Forex &amp; XAUUSD </span>
              <span className="text-trading-green text-glow-green">Calculators</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeTools.map((tool, i) => (
                <FadeIn key={tool.href} delay={i * 0.05}>
                  <div className="glass-strong rounded-2xl p-6 md:p-8 flex flex-col gap-4 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trading-green/10 to-transparent flex items-center justify-center">
                        {tool.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-trading-green bg-trading-green/10 border border-trading-green/30 rounded-full px-3 py-1">
                        LIVE
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      <Link href={tool.href} className="text-foreground hover:text-trading-green transition-colors no-underline">{tool.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {tool.desc}
                    </p>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      <strong className="text-foreground/90">Best for:</strong> {tool.bestFor}
                    </p>
                    <Link href={tool.href} aria-label={`Open the ${tool.title}`} className="inline-flex items-center gap-2 text-sm font-bold text-trading-green hover:translate-x-1 transition-transform no-underline w-fit">
                      Open Calculator <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* COMING SOON */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 id="coming-soon" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center">
              <span className="text-foreground">Coming </span>
              <span className="text-trading-gold text-glow-gold">Soon</span>
            </h2>
            <p className="text-muted-foreground text-center text-base md:text-lg max-w-2xl mx-auto mb-10">
              More free calculators are being developed. These are shown as previews only and are not yet available.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingTools.map((tool, i) => (
                <FadeIn key={tool.title} delay={i * 0.05}>
                  <div className="glass rounded-2xl p-6 flex flex-col gap-3 opacity-60">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      {tool.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* WHICH CALCULATOR */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="which-calculator" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              <span className="text-foreground">Which Forex or XAUUSD Calculator Should You Use?</span>
            </h2>
            <div className="hidden md:block glass-strong rounded-2xl overflow-hidden gradient-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10">
                    <th className="text-left p-4 font-bold text-foreground">If you want to…</th>
                    <th className="text-left p-4 font-bold text-foreground">Use this calculator</th>
                  </tr></thead>
                  <tbody>
                    {whichCalculatorTable.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-muted-foreground align-top">{row.want}</td>
                        <td className="p-4 align-top"><a href={row.href} className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">{row.tool}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:hidden space-y-3">
              {whichCalculatorTable.map((row, i) => (
                <div key={i} className="glass-strong rounded-xl p-4 gradient-border">
                  <p className="text-sm text-muted-foreground mb-2">{row.want}</p>
                  <a href={row.href} className="text-sm font-bold text-trading-green underline underline-offset-2">{row.tool}</a>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* HOW TO USE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="how-to-use" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">How to Use These Calculators Before a Trade</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Used in order, these tools turn a trade idea into a risk plan:
              </p>
              <ol className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">1</span><span><strong className="text-foreground/90">Set your stop first.</strong> Decide where your trade idea is wrong, based on your analysis, not on the position size you want.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">2</span><span><strong className="text-foreground/90">Size the trade.</strong> Enter your risk percentage and stop distance into the lot size calculator to get a position size.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">3</span><span><strong className="text-foreground/90">Check the reward.</strong> Use the risk reward calculator to see your R multiple and the win rate you need to break even.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">4</span><span><strong className="text-foreground/90">Check margin.</strong> Use the margin and leverage calculator to confirm the trade fits your account with room to spare.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">5</span><span><strong className="text-foreground/90">Check the timing.</strong> Use the market hours clock to see which session you are trading in, in your local time.</span></li>
                <li className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-trading-green/20 flex items-center justify-center text-trading-green font-bold text-sm shrink-0">6</span><span><strong className="text-foreground/90">Review afterwards.</strong> Use the profit calculator and risk of ruin calculator to review results and understand how losing streaks could affect your account.</span></li>
              </ol>
            </div>
          </div>
        </FadeSection>

        {/* EXAMPLE */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border border-l-4 border-l-trading-gold/50">
              <h2 id="example" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">Worked Example: Sizing a Gold Trade</span>
              </h2>
              <p className="text-sm text-muted-foreground/80 mb-5 leading-relaxed">
                This is an educational example, not a trade recommendation. Broker contract sizes and leverage vary.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                Suppose you have a $5,000 account and risk 1%, which is $50. You plan to buy gold at $4,000 with a stop loss at $3,990 and a target at $4,030.
              </p>
              <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                <li className="flex items-start gap-2"><span className="text-trading-gold">•</span><span><strong className="text-foreground/90">Stop distance:</strong> $10 per ounce.</span></li>
                <li className="flex items-start gap-2"><span className="text-trading-gold">•</span><span><strong className="text-foreground/90">Lot size:</strong> $50 ÷ ($10 × 100 ounces) = <strong className="text-foreground/90">0.05 lots</strong> (5 ounces).</span></li>
                <li className="flex items-start gap-2"><span className="text-trading-gold">•</span><span><strong className="text-foreground/90">Margin at 1:100 leverage:</strong> $4,000 × 5 ounces ÷ 100 = <strong className="text-foreground/90">$200</strong>.</span></li>
                <li className="flex items-start gap-2"><span className="text-trading-gold">•</span><span><strong className="text-foreground/90">Risk-to-reward:</strong> $30 reward ÷ $10 risk = <strong className="text-foreground/90">3:1</strong>, so the break-even win rate is 25%, before spreads and commissions.</span></li>
              </ul>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Try the same numbers in the{" "}
                <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Lot Size Calculator</Link>{" "}
                and the{" "}
                <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Risk Reward Calculator</Link>, then replace them with your own.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* TIME ZONES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 gradient-border">
              <h2 id="time-zones" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
                <span className="text-foreground">Forex Market Hours and Time Zones</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  The forex market trades around the clock from Sunday evening to Friday evening New York time. Session times shift when clocks change, and the US and Europe change clocks on different dates, so the gap between London, Central Europe and New York can differ by an hour for a few weeks each spring and autumn.
                </p>
                <p>
                  The{" "}
                  <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Market Hours &amp; Live Session Clock</Link>{" "}
                  shows sessions in your local time with DST-aware conversion, whether you trade from London, Frankfurt, Dubai, Karachi or Mumbai. To see how gold behaves in each session, read{" "}
                  <Link href="/blog/xauusd-volatility-trading-sessions/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">why XAUUSD volatility changes by trading session</Link>{" "}
                  and our guide to the{" "}
                  <Link href="/blog/best-time-to-trade-forex/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">best time to trade forex</Link>.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* FAQ */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="faq" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                <span className="text-foreground">FAQ: </span>
                <span className="text-trading-green text-glow-green">Forex and XAUUSD Calculators</span>
              </h2>
            </div>
            <div className="space-y-4">
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">How do I calculate lot size for XAUUSD?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Divide the amount you are willing to risk by the stop-loss distance in dollars multiplied by the contract size. On most brokers, 1 lot of gold is 100 ounces, so risking $50 with a $10 stop gives $50 ÷ ($10 × 100) = 0.05 lots. Confirm your broker&apos;s contract size, then use the <Link href="/xauusd-lot-size/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Lot Size Calculator</Link>.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">How much is one pip in XAUUSD?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Conventions differ by broker. Many brokers treat a $0.10 price move as one pip, which is worth about $10 per standard lot of 100 ounces. Others quote in points of $0.01. Check your broker&apos;s specification and use the <Link href="/xauusd-pip-value/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">XAUUSD Pip Value Calculator</Link> to compare conventions.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">How much margin do I need to trade 1 lot of gold?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Required margin equals price × contract size × lots ÷ leverage. With gold at $4,000, one lot of 100 ounces has a notional value of $400,000, so margin is about $4,000 at 1:100 leverage and about $800 at 1:500. Requirements vary by broker, and higher leverage increases risk.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What is a good risk-reward ratio, and what win rate do I need to break even?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">No single ratio is right for everyone, but it must be considered alongside your win rate. The break-even win rate is 1 ÷ (1 + reward-to-risk). At 1:1 you need 50%, at 2:1 about 33% and at 3:1 25%, before spreads and commissions. Use the <Link href="/tools/risk-reward-calculator/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Risk Reward Calculator</Link> to test your own numbers.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">How much gain do I need to recover from a drawdown?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">The gain needed equals drawdown ÷ (1 − drawdown). A 10% loss needs about an 11.1% gain to recover, a 20% loss needs 25% and a 50% loss needs 100%. This is why limiting risk per trade matters. A dedicated Drawdown Calculator is coming soon.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">What time does the forex market open and close in my time zone?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">Forex trades around the clock from about 5 PM New York time on Sunday to 5 PM on Friday. In winter that is about 22:00 GMT (23:00 CET) on Sunday to 22:00 GMT (23:00 CET) on Friday, and one hour earlier in GMT during US summer time. Use the <Link href="/tools/forex-market-hours/" className="text-trading-green underline underline-offset-2 hover:text-trading-green/80 transition-colors">Forex Market Hours tool</Link> to see live session times in your local time.</p></div>
              </details>
              <details className="glass-strong rounded-2xl gradient-border group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none"><h3 className="text-base font-bold text-foreground pr-4">Are these calculators free, and are the results exact?</h3><ArrowRight className="w-5 h-5 text-trading-gold shrink-0 transition-transform group-open:rotate-45" /></summary>
                <div className="px-5 pb-5 -mt-2"><p className="text-sm text-muted-foreground leading-relaxed">All calculators are free to use with no registration. Results are educational estimates. Spreads, slippage, commissions, gaps and broker-specific contract sizes can change real outcomes, so always verify your broker&apos;s specifications before trading.</p></div>
              </details>
            </div>
          </div>
        </FadeSection>

        {/* RELATED GUIDES */}
        <FadeSection className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 id="related-guides" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center">
              <span className="text-foreground">Related </span>
              <span className="text-trading-gold text-glow-gold">Guides</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedGuides.map((guide, i) => (
                <FadeIn key={guide.href} delay={i * 0.05}>
                  <Link href={guide.href} className="block h-full no-underline">
                    <div className="glass-strong rounded-2xl p-6 flex flex-col gap-3 gradient-border hover:scale-[1.02] transition-transform duration-300 h-full">
                      <BookOpen className="w-7 h-7 text-trading-gold" />
                      <h3 className="text-base font-bold text-foreground">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* TELEGRAM CTA */}
        <FadeSection className="py-20 md:py-28 px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-gold/5 via-transparent to-trading-green/5 rounded-3xl blur-sm" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-14 text-center gradient-border">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"><span className="text-foreground">JOIN FREE </span><span className="text-trading-green text-glow-green">TELEGRAM</span></h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">Join the Forex Wizard Telegram community for educational XAU/USD market structure, key levels and trading-related education.</p>
              <PulsingGlow className="inline-block rounded-xl">
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-bold text-base md:text-lg rounded-xl px-6 py-3.5 md:px-8 md:py-4 transition-all duration-300 cursor-pointer no-underline select-none bg-trading-green text-trading-dark glow-green hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-95 text-lg md:text-xl px-10 py-5">
                  <MessageCircle className="w-5 h-5" />Join Forex Wizard Telegram<ArrowRight className="w-4 h-4" />
                </a>
              </PulsingGlow>
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
